import { InquiryStatus } from "@/generated/prisma";
import { prisma } from "@/lib/db";
import {
  handleApiError,
  isAdminResponse,
  jsonError,
  jsonOk,
  requireAdminApi,
} from "@/lib/admin-api";

type MessageType = "contact" | "volunteer" | "partner";

function normalizeType(type: string | null): MessageType | "all" | null {
  if (!type || type === "all") return "all";
  if (type === "contact" || type === "volunteer" || type === "partner") {
    return type;
  }
  return null;
}

export async function GET(request: Request) {
  try {
    const auth = await requireAdminApi();
    if (isAdminResponse(auth)) return auth;

    const { searchParams } = new URL(request.url);
    const type = normalizeType(searchParams.get("type"));
    const status = searchParams.get("status") as InquiryStatus | null;

    if (!type) {
      return jsonError(
        "Invalid type. Use contact, volunteer, partner, or all.",
        400
      );
    }

    const statusFilter = status ? { status } : {};

    if (type === "contact" || type === "all") {
      const contact = await prisma.contactMessage.findMany({
        where: statusFilter,
        orderBy: { createdAt: "desc" },
      });

      if (type === "contact") {
        return jsonOk({
          items: contact.map((item) => ({ ...item, type: "contact" as const })),
        });
      }

      const [volunteer, partner] = await Promise.all([
        prisma.volunteerApplication.findMany({
          where: statusFilter,
          orderBy: { createdAt: "desc" },
        }),
        prisma.partnerInquiry.findMany({
          where: statusFilter,
          orderBy: { createdAt: "desc" },
        }),
      ]);

      const items = [
        ...contact.map((item) => ({ ...item, type: "contact" as const })),
        ...volunteer.map((item) => ({ ...item, type: "volunteer" as const })),
        ...partner.map((item) => ({ ...item, type: "partner" as const })),
      ].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      return jsonOk({ items });
    }

    if (type === "volunteer") {
      const items = await prisma.volunteerApplication.findMany({
        where: statusFilter,
        orderBy: { createdAt: "desc" },
      });
      return jsonOk({
        items: items.map((item) => ({ ...item, type: "volunteer" as const })),
      });
    }

    const items = await prisma.partnerInquiry.findMany({
      where: statusFilter,
      orderBy: { createdAt: "desc" },
    });

    return jsonOk({
      items: items.map((item) => ({ ...item, type: "partner" as const })),
    });
  } catch (error) {
    return handleApiError(error);
  }
}
