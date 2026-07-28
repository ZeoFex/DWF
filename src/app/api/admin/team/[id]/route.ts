import { prisma } from "@/lib/db";
import { teamUpdateSchema } from "@/lib/admin-schemas";
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
    const item = await prisma.teamMember.findUnique({ where: { id } });

    if (!item) {
      return jsonError("Team member not found", 404);
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
    const existing = await prisma.teamMember.findUnique({ where: { id } });

    if (!existing) {
      return jsonError("Team member not found", 404);
    }

    const body = teamUpdateSchema.parse(await request.json());

    const item = await prisma.teamMember.update({
      where: { id },
      data: {
        ...(body.name !== undefined ? { name: body.name.trim() } : {}),
        ...(body.role !== undefined ? { role: body.role.trim() } : {}),
        ...(body.bio !== undefined ? { bio: body.bio.trim() } : {}),
        ...(body.imageUrl !== undefined ? { imageUrl: body.imageUrl } : {}),
        ...(body.email !== undefined
          ? { email: body.email?.toLowerCase() ?? null }
          : {}),
        ...(body.isFounder !== undefined ? { isFounder: body.isFounder } : {}),
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
    const existing = await prisma.teamMember.findUnique({ where: { id } });

    if (!existing) {
      return jsonError("Team member not found", 404);
    }

    await prisma.teamMember.delete({ where: { id } });
    return jsonOk({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
