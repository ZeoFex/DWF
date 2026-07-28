import { z } from "zod";
import { prisma } from "@/lib/db";
import { handleApiError, jsonOk } from "@/lib/admin-api";

const newsletterSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body = newsletterSchema.parse(await request.json());
    const email = body.email.toLowerCase();

    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email },
      create: { email, isActive: true },
      update: { isActive: true },
    });

    return jsonOk(
      {
        id: subscriber.id,
        message: "You have been subscribed to our newsletter.",
      },
      201
    );
  } catch (error) {
    return handleApiError(error);
  }
}
