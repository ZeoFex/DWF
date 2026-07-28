import { prisma } from "@/lib/db";
import { successStoryUpdateSchema } from "@/lib/admin-schemas";
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
    const existing = await prisma.successStory.findUnique({ where: { id } });

    if (!existing) {
      return jsonError("Success story not found", 404);
    }

    const body = successStoryUpdateSchema.parse(await request.json());

    const item = await prisma.successStory.update({
      where: { id },
      data: {
        ...(body.title !== undefined ? { title: body.title.trim() } : {}),
        ...(body.summary !== undefined ? { summary: body.summary.trim() } : {}),
        ...(body.quote !== undefined
          ? { quote: body.quote?.trim() || null }
          : {}),
        ...(body.imageUrl !== undefined ? { imageUrl: body.imageUrl } : {}),
        ...(body.href !== undefined ? { href: body.href } : {}),
        ...(body.featured !== undefined ? { featured: body.featured } : {}),
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
    const existing = await prisma.successStory.findUnique({ where: { id } });

    if (!existing) {
      return jsonError("Success story not found", 404);
    }

    await prisma.successStory.delete({ where: { id } });
    return jsonOk({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
