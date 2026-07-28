import { z } from "zod";
import { prisma } from "@/lib/db";
import { handleApiError, jsonOk } from "@/lib/admin-api";

const volunteerSchema = z.object({
  fullName: z.string().min(1).max(120),
  email: z.string().email(),
  phone: z.string().min(1).max(40),
  location: z.string().min(1).max(120),
  ageRange: z.string().min(1).max(40),
  areaOfInterest: z.string().min(1).max(120),
  availability: z.string().min(1).max(200),
  relevantExperience: z.string().max(5000).optional(),
  motivation: z.string().min(1).max(5000),
});

export async function POST(request: Request) {
  try {
    const body = volunteerSchema.parse(await request.json());

    const application = await prisma.volunteerApplication.create({
      data: {
        fullName: body.fullName.trim(),
        email: body.email.toLowerCase(),
        phone: body.phone.trim(),
        location: body.location.trim(),
        ageRange: body.ageRange.trim(),
        areaOfInterest: body.areaOfInterest.trim(),
        availability: body.availability.trim(),
        relevantExperience: body.relevantExperience?.trim() || null,
        motivation: body.motivation.trim(),
      },
    });

    return jsonOk(
      { id: application.id, message: "Your volunteer application has been received." },
      201
    );
  } catch (error) {
    return handleApiError(error);
  }
}
