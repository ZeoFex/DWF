import { prisma } from "@/lib/db";
import { resourceUpdateSchema } from "@/lib/admin-schemas";
import {
  handleApiError,
  isAdminResponse,
  jsonError,
  jsonOk,
  requireAdminApi,
} from "@/lib/admin-api";
import { uniqueSlug } from "@/lib/admin-utils";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  try {
    const auth = await requireAdminApi();
    if (isAdminResponse(auth)) return auth;

    const { id } = await context.params;
    const item = await prisma.resource.findUnique({ where: { id } });

    if (!item) {
      return jsonError("Resource not found", 404);
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
    const existing = await prisma.resource.findUnique({ where: { id } });

    if (!existing) {
      return jsonError("Resource not found", 404);
    }

    const body = resourceUpdateSchema.parse(await request.json());

    let slug = body.slug?.trim();
    if (body.slug !== undefined && slug && slug !== existing.slug) {
      slug = await uniqueSlug(slug, async (candidate) => {
        const found = await prisma.resource.findUnique({
          where: { slug: candidate },
        });
        return Boolean(found && found.id !== id);
      });
    }

    const item = await prisma.resource.update({
      where: { id },
      data: {
        ...(body.title !== undefined ? { title: body.title.trim() } : {}),
        ...(slug !== undefined ? { slug } : {}),
        ...(body.description !== undefined
          ? { description: body.description.trim() }
          : {}),
        ...(body.category !== undefined
          ? { category: body.category.trim() }
          : {}),
        ...(body.format !== undefined ? { format: body.format.trim() } : {}),
        ...(body.topic !== undefined ? { topic: body.topic } : {}),
        ...(body.fileUrl !== undefined ? { fileUrl: body.fileUrl } : {}),
        ...(body.externalUrl !== undefined
          ? { externalUrl: body.externalUrl }
          : {}),
        ...(body.imageUrl !== undefined ? { imageUrl: body.imageUrl } : {}),
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
    const existing = await prisma.resource.findUnique({ where: { id } });

    if (!existing) {
      return jsonError("Resource not found", 404);
    }

    await prisma.resource.delete({ where: { id } });
    return jsonOk({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
