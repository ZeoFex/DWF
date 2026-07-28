import { PaymentStatus } from "@/generated/prisma";
import { prisma } from "@/lib/db";
import {
  handleApiError,
  isAdminResponse,
  jsonOk,
  requireAdminApi,
} from "@/lib/admin-api";

export async function GET(request: Request) {
  try {
    const auth = await requireAdminApi();
    if (isAdminResponse(auth)) return auth;

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const limit = Math.min(Number(searchParams.get("limit") ?? 50), 200);
    const offset = Number(searchParams.get("offset") ?? 0);

    const where = status ? { status: status as PaymentStatus } : undefined;

    const [items, total] = await Promise.all([
      prisma.donation.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
        include: {
          project: { select: { id: true, title: true, slug: true } },
        },
      }),
      prisma.donation.count({ where }),
    ]);

    return jsonOk({ items, total, limit, offset });
  } catch (error) {
    return handleApiError(error);
  }
}
