import { prisma } from "@/lib/db";
import { partnerUpdateSchema } from "@/lib/admin-schemas";
import {
  handleApiError,
  isAdminResponse,
  jsonError,
  jsonOk,
  requireAdminApi,
} from "@/lib/admin-api";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  try {
    const auth = await requireAdminApi();
    if (isAdminResponse(auth)) return auth;

    const { id } = await context.params;
    const item = await prisma.partner.findUnique({ where: { id } });

    if (!item) {
      return jsonError("Partner not found", 404);
    }

    return jsonOk({ item });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const auth = await requireAdminApi();
    if (isAdminResponse(auth)) return auth;

    const { id } = await context.params;
    const existing = await prisma.partner.findUnique({ where: { id } });

    if (!existing) {
      return jsonError("Partner not found", 404);
    }

    const body = partnerUpdateSchema.parse(await request.json());

    const item = await prisma.partner.update({
      where: { id },
      data: {
        ...(body.name !== undefined ? { name: body.name.trim() } : {}),
        ...(body.logoUrl !== undefined ? { logoUrl: body.logoUrl } : {}),
        ...(body.websiteUrl !== undefined ? { websiteUrl: body.websiteUrl } : {}),
        ...(body.description !== undefined
          ? { description: body.description?.trim() || null }
          : {}),
        ...(body.featured !== undefined ? { featured: body.featured } : {}),
        ...(body.sortOrder !== undefined ? { sortOrder: body.sortOrder } : {}),
        ...(body.status !== undefined ? { status: body.status } : {}),
      },
    });

    return jsonOk({ item });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const auth = await requireAdminApi();
    if (isAdminResponse(auth)) return auth;

    const { id } = await context.params;
    const existing = await prisma.partner.findUnique({ where: { id } });

    if (!existing) {
      return jsonError("Partner not found", 404);
    }

    await prisma.partner.delete({ where: { id } });
    return jsonOk({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
