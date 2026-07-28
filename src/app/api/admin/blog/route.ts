import { PublishStatus } from "@/generated/prisma";
import { prisma } from "@/lib/db";
import { blogCreateSchema } from "@/lib/admin-schemas";
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

    const items = await prisma.blogPost.findMany({
      where: status ? { status: status as PublishStatus } : undefined,
      orderBy: [{ updatedAt: "desc" }],
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

    const body = blogCreateSchema.parse(await request.json());
    const slug =
      body.slug?.trim() ||
      (await uniqueSlug(body.title, async (candidate) => {
        const existing = await prisma.blogPost.findUnique({
          where: { slug: candidate },
        });
        return Boolean(existing);
      }));

    const status = body.status ?? PublishStatus.DRAFT;
    const publishedAt =
      body.publishedAt !== undefined
        ? body.publishedAt
          ? new Date(body.publishedAt)
          : null
        : status === PublishStatus.PUBLISHED
          ? new Date()
          : null;

    const item = await prisma.blogPost.create({
      data: {
        slug,
        title: body.title.trim(),
        excerpt: body.excerpt.trim(),
        content: body.content.trim(),
        category: body.category.trim(),
        author: body.author.trim(),
        imageUrl: body.imageUrl ?? null,
        videoUrl: body.videoUrl ?? null,
        featured: body.featured ?? false,
        status,
        publishedAt,
        authorId: auth.sub,
      },
    });

    return jsonOk({ item }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
