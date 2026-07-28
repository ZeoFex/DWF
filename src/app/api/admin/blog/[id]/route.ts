import { PublishStatus } from "@/generated/prisma";
import { prisma } from "@/lib/db";
import { blogUpdateSchema } from "@/lib/admin-schemas";
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
    const item = await prisma.blogPost.findUnique({ where: { id } });

    if (!item) {
      return jsonError("Blog post not found", 404);
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
    const existing = await prisma.blogPost.findUnique({ where: { id } });

    if (!existing) {
      return jsonError("Blog post not found", 404);
    }

    const body = blogUpdateSchema.parse(await request.json());

    let slug = body.slug?.trim();
    if (body.slug !== undefined && slug && slug !== existing.slug) {
      slug = await uniqueSlug(slug, async (candidate) => {
        const found = await prisma.blogPost.findUnique({
          where: { slug: candidate },
        });
        return Boolean(found && found.id !== id);
      });
    }

    const status = body.status ?? existing.status;
    let publishedAt = existing.publishedAt;
    if (body.publishedAt !== undefined) {
      publishedAt = body.publishedAt ? new Date(body.publishedAt) : null;
    } else if (
      body.status === PublishStatus.PUBLISHED &&
      existing.status !== PublishStatus.PUBLISHED
    ) {
      publishedAt = new Date();
    }

    const item = await prisma.blogPost.update({
      where: { id },
      data: {
        ...(body.title !== undefined ? { title: body.title.trim() } : {}),
        ...(slug !== undefined ? { slug } : {}),
        ...(body.excerpt !== undefined ? { excerpt: body.excerpt.trim() } : {}),
        ...(body.content !== undefined ? { content: body.content.trim() } : {}),
        ...(body.category !== undefined
          ? { category: body.category.trim() }
          : {}),
        ...(body.author !== undefined ? { author: body.author.trim() } : {}),
        ...(body.imageUrl !== undefined ? { imageUrl: body.imageUrl } : {}),
        ...(body.videoUrl !== undefined ? { videoUrl: body.videoUrl } : {}),
        ...(body.featured !== undefined ? { featured: body.featured } : {}),
        ...(body.status !== undefined ? { status } : {}),
        publishedAt,
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
    const existing = await prisma.blogPost.findUnique({ where: { id } });

    if (!existing) {
      return jsonError("Blog post not found", 404);
    }

    await prisma.blogPost.delete({ where: { id } });
    return jsonOk({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
