import { PublishStatus } from "@/generated/prisma";
import { prisma } from "@/lib/db";
import { partnerCreateSchema } from "@/lib/admin-schemas";
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

    const items = await prisma.partner.findMany({
      where: status ? { status: status as PublishStatus } : undefined,
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    });

    return jsonOk({ items });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const auth = await requireAdminApi();
    if (isAdminResponse(auth)) return auth;

    const body = partnerCreateSchema.parse(await request.json());

    const item = await prisma.partner.create({
      data: {
        name: body.name.trim(),
        logoUrl: body.logoUrl ?? null,
        websiteUrl: body.websiteUrl ?? null,
        description: body.description?.trim() || null,
        featured: body.featured ?? false,
        sortOrder: body.sortOrder ?? 0,
        status: body.status ?? PublishStatus.PUBLISHED,
      },
    });

    return jsonOk({ item }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
