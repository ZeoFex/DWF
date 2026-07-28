import { prisma } from "@/lib/db";
import { galleryAlbumUpdateSchema } from "@/lib/admin-schemas";
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
    const item = await prisma.galleryAlbum.findUnique({
      where: { id },
      include: { items: { orderBy: { sortOrder: "asc" } } },
    });

    if (!item) {
      return jsonError("Gallery album not found", 404);
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
    const existing = await prisma.galleryAlbum.findUnique({ where: { id } });

    if (!existing) {
      return jsonError("Gallery album not found", 404);
    }

    const body = galleryAlbumUpdateSchema.parse(await request.json());

    let slug = body.slug?.trim();
    if (body.slug !== undefined && slug && slug !== existing.slug) {
      slug = await uniqueSlug(slug, async (candidate) => {
        const found = await prisma.galleryAlbum.findUnique({
          where: { slug: candidate },
        });
        return Boolean(found && found.id !== id);
      });
    }

    const item = await prisma.galleryAlbum.update({
      where: { id },
      data: {
        ...(body.title !== undefined ? { title: body.title.trim() } : {}),
        ...(slug !== undefined ? { slug } : {}),
        ...(body.description !== undefined
          ? { description: body.description?.trim() || null }
          : {}),
        ...(body.coverUrl !== undefined ? { coverUrl: body.coverUrl } : {}),
        ...(body.status !== undefined ? { status: body.status } : {}),
        ...(body.sortOrder !== undefined ? { sortOrder: body.sortOrder } : {}),
      },
      include: { items: { orderBy: { sortOrder: "asc" } } },
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
    const existing = await prisma.galleryAlbum.findUnique({ where: { id } });

    if (!existing) {
      return jsonError("Gallery album not found", 404);
    }

    await prisma.galleryAlbum.delete({ where: { id } });
    return jsonOk({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
