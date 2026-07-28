import { z } from "zod";
import { prisma } from "@/lib/db";
import { handleApiError, jsonOk } from "@/lib/admin-api";

const partnerSchema = z.object({
  organizationName: z.string().min(1).max(200),
  contactPerson: z.string().min(1).max(120),
  email: z.string().email(),
  phone: z.string().min(1).max(40),
  partnershipType: z.string().min(1).max(120),
  proposedSupport: z.string().min(1).max(5000),
  message: z.string().max(5000).optional(),
});

export async function POST(request: Request) {
  try {
    const body = partnerSchema.parse(await request.json());

    const inquiry = await prisma.partnerInquiry.create({
      data: {
        organizationName: body.organizationName.trim(),
        contactPerson: body.contactPerson.trim(),
        email: body.email.toLowerCase(),
        phone: body.phone.trim(),
        partnershipType: body.partnershipType.trim(),
        proposedSupport: body.proposedSupport.trim(),
        message: body.message?.trim() || null,
      },
    });

    return jsonOk(
      { id: inquiry.id, message: "Your partnership inquiry has been received." },
      201
    );
  } catch (error) {
    return handleApiError(error);
  }
}
