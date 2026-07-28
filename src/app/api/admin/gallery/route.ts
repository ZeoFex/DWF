import { PublishStatus } from "@/generated/prisma";
import { prisma } from "@/lib/db";
import { galleryAlbumCreateSchema } from "@/lib/admin-schemas";
import {
  handleApiError,
  isAdminResponse,
  jsonOk,
  requireAdminApi,
} from "@/lib/admin-api";
import { uniqueSlug } from "@/lib/admin-utils";

export async function GET(request: Request) {
  try {
    const auth = await requireAdminApi();
    if (isAdminResponse(auth)) return auth;

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const items = await prisma.galleryAlbum.findMany({
      where: status ? { status: status as PublishStatus } : undefined,
      orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
      include: {
        items: { orderBy: { sortOrder: "asc" } },
        _count: { select: { items: true } },
      },
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

    const body = galleryAlbumCreateSchema.parse(await request.json());
    const slug =
      body.slug?.trim() ||
      (await uniqueSlug(body.title, async (candidate) => {
        const existing = await prisma.galleryAlbum.findUnique({
          where: { slug: candidate },
        });
        return Boolean(existing);
      }));

    const item = await prisma.galleryAlbum.create({
      data: {
        slug,
        title: body.title.trim(),
        description: body.description?.trim() || null,
        coverUrl: body.coverUrl ?? null,
        status: body.status ?? PublishStatus.PUBLISHED,
        sortOrder: body.sortOrder ?? 0,
      },
      include: { items: true },
    });

    return jsonOk({ item }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
