import { z } from "zod";
import { prisma } from "@/lib/db";
import { handleApiError, jsonError, jsonOk } from "@/lib/admin-api";

const registrationSchema = z.object({
  fullName: z.string().min(1).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  message: z.string().max(2000).optional(),
});

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = registrationSchema.parse(await request.json());

    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) {
      return jsonError("Event not found", 404);
    }

    if (event.status !== "PUBLISHED") {
      return jsonError("Event is not open for registration", 403);
    }

    if (!event.registrationRequired) {
      return jsonError("This event does not require registration", 400);
    }

    const registration = await prisma.eventRegistration.create({
      data: {
        eventId: event.id,
        fullName: body.fullName.trim(),
        email: body.email.toLowerCase(),
        phone: body.phone?.trim() || null,
        message: body.message?.trim() || null,
      },
    });

    return jsonOk(
      {
        id: registration.id,
        message: "You have been registered for this event.",
      },
      201
    );
  } catch (error) {
    return handleApiError(error);
  }
}
