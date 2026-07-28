import { prisma } from "@/lib/db";
import { messageStatusSchema } from "@/lib/admin-schemas";
import {
  handleApiError,
  isAdminResponse,
  jsonError,
  jsonOk,
  requireAdminApi,
} from "@/lib/admin-api";

type RouteContext = { params: Promise<{ type: string; id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const auth = await requireAdminApi();
    if (isAdminResponse(auth)) return auth;

    const { type, id } = await context.params;
    const body = messageStatusSchema.parse(await request.json());

    if (type === "contact") {
      const existing = await prisma.contactMessage.findUnique({ where: { id } });
      if (!existing) return jsonError("Contact message not found", 404);

      const item = await prisma.contactMessage.update({
        where: { id },
        data: { status: body.status },
      });
      return jsonOk({ item, type: "contact" });
    }

    if (type === "volunteer") {
      const existing = await prisma.volunteerApplication.findUnique({
        where: { id },
      });
      if (!existing) return jsonError("Volunteer application not found", 404);

      const item = await prisma.volunteerApplication.update({
        where: { id },
        data: { status: body.status },
      });
      return jsonOk({ item, type: "volunteer" });
    }

    if (type === "partner") {
      const existing = await prisma.partnerInquiry.findUnique({ where: { id } });
      if (!existing) return jsonError("Partner inquiry not found", 404);

      const item = await prisma.partnerInquiry.update({
        where: { id },
        data: { status: body.status },
      });
      return jsonOk({ item, type: "partner" });
    }

    return jsonError("Invalid message type", 400);
  } catch (error) {
    return handleApiError(error);
  }
}
