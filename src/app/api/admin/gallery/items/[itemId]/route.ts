import { prisma } from "@/lib/db";
import {
  handleApiError,
  isAdminResponse,
  jsonError,
  jsonOk,
  requireAdminApi,
} from "@/lib/admin-api";

type RouteContext = { params: Promise<{ itemId: string }> };

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const auth = await requireAdminApi();
    if (isAdminResponse(auth)) return auth;

    const { itemId } = await context.params;
    const existing = await prisma.galleryItem.findUnique({ where: { id: itemId } });

    if (!existing) {
      return jsonError("Gallery item not found", 404);
    }

    await prisma.galleryItem.delete({ where: { id: itemId } });
    return jsonOk({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
