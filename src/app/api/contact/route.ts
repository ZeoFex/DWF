import { z } from "zod";
import { prisma } from "@/lib/db";
import { handleApiError, jsonOk } from "@/lib/admin-api";

const contactSchema = z.object({
  fullName: z.string().min(1).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  subject: z.string().min(1).max(200),
  message: z.string().min(1).max(5000),
});

export async function POST(request: Request) {
  try {
    const body = contactSchema.parse(await request.json());

    const message = await prisma.contactMessage.create({
      data: {
        fullName: body.fullName.trim(),
        email: body.email.toLowerCase(),
        phone: body.phone?.trim() || null,
        subject: body.subject.trim(),
        message: body.message.trim(),
      },
    });

    return jsonOk({ id: message.id, message: "Thank you for contacting us." }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
