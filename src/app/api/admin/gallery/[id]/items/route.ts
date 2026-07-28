import { prisma } from "@/lib/db";
import { galleryItemCreateSchema } from "@/lib/admin-schemas";
import {
  handleApiError,
  isAdminResponse,
  jsonError,
  jsonOk,
  requireAdminApi,
} from "@/lib/admin-api";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: RouteContext) {
  try {
    const auth = await requireAdminApi();
    if (isAdminResponse(auth)) return auth;

    const { id: albumId } = await context.params;
    const album = await prisma.galleryAlbum.findUnique({ where: { id: albumId } });

    if (!album) {
      return jsonError("Gallery album not found", 404);
    }

    const body = galleryItemCreateSchema.parse(await request.json());

    const maxSort = await prisma.galleryItem.aggregate({
      where: { albumId },
      _max: { sortOrder: true },
    });

    const item = await prisma.galleryItem.create({
      data: {
        albumId,
        url: body.url,
        ...(body.mediaType !== undefined ? { mediaType: body.mediaType } : {}),
        alt: body.alt ?? null,
        caption: body.caption ?? null,
        sortOrder: body.sortOrder ?? (maxSort._max.sortOrder ?? -1) + 1,
      },
    });

    return jsonOk({ item }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
