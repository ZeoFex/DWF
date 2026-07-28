import { prisma } from "@/lib/db";
import { impactStatUpdateSchema } from "@/lib/admin-schemas";
import {
  handleApiError,
  isAdminResponse,
  jsonError,
  jsonOk,
  requireAdminApi,
} from "@/lib/admin-api";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const auth = await requireAdminApi();
    if (isAdminResponse(auth)) return auth;

    const { id } = await context.params;
    const existing = await prisma.impactStat.findUnique({ where: { id } });

    if (!existing) {
      return jsonError("Impact stat not found", 404);
    }

    const body = impactStatUpdateSchema.parse(await request.json());

    const item = await prisma.impactStat.update({
      where: { id },
      data: {
        ...(body.label !== undefined ? { label: body.label.trim() } : {}),
        ...(body.value !== undefined ? { value: body.value } : {}),
        ...(body.suffix !== undefined ? { suffix: body.suffix } : {}),
        ...(body.prefix !== undefined ? { prefix: body.prefix } : {}),
        ...(body.note !== undefined ? { note: body.note } : {}),
        ...(body.sortOrder !== undefined ? { sortOrder: body.sortOrder } : {}),
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
    const existing = await prisma.impactStat.findUnique({ where: { id } });

    if (!existing) {
      return jsonError("Impact stat not found", 404);
    }

    await prisma.impactStat.delete({ where: { id } });
    return jsonOk({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
