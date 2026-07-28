import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/db";
import { projectUpdateSchema } from "@/lib/admin-schemas";
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
    const item = await prisma.project.findUnique({ where: { id } });

    if (!item) {
      return jsonError("Project not found", 404);
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
    const existing = await prisma.project.findUnique({ where: { id } });

    if (!existing) {
      return jsonError("Project not found", 404);
    }

    const body = projectUpdateSchema.parse(await request.json());

    let slug = body.slug?.trim();
    if (body.slug !== undefined && slug && slug !== existing.slug) {
      slug = await uniqueSlug(slug, async (candidate) => {
        const found = await prisma.project.findUnique({
          where: { slug: candidate },
        });
        return Boolean(found && found.id !== id);
      });
    }

    const item = await prisma.project.update({
      where: { id },
      data: {
        ...(body.title !== undefined ? { title: body.title.trim() } : {}),
        ...(slug !== undefined ? { slug } : {}),
        ...(body.shortDescription !== undefined
          ? { shortDescription: body.shortDescription.trim() }
          : {}),
        ...(body.status !== undefined ? { status: body.status } : {}),
        ...(body.featured !== undefined ? { featured: body.featured } : {}),
        ...(body.goal !== undefined ? { goal: body.goal } : {}),
        ...(body.raised !== undefined ? { raised: body.raised } : {}),
        ...(body.currency !== undefined ? { currency: body.currency } : {}),
        ...(body.girlsSupported !== undefined
          ? { girlsSupported: body.girlsSupported }
          : {}),
        ...(body.timelineStart !== undefined
          ? {
              timelineStart: body.timelineStart
                ? new Date(body.timelineStart)
                : null,
            }
          : {}),
        ...(body.timelineEnd !== undefined
          ? {
              timelineEnd: body.timelineEnd ? new Date(body.timelineEnd) : null,
            }
          : {}),
        ...(body.milestones !== undefined
          ? { milestones: body.milestones as Prisma.InputJsonValue }
          : {}),
        ...(body.location !== undefined ? { location: body.location } : {}),
        ...(body.activities !== undefined ? { activities: body.activities } : {}),
        ...(body.impact !== undefined ? { impact: body.impact } : {}),
        ...(body.sponsors !== undefined
          ? { sponsors: body.sponsors as Prisma.InputJsonValue }
          : {}),
        ...(body.updates !== undefined
          ? { updates: body.updates as Prisma.InputJsonValue }
          : {}),
        ...(body.galleryUrls !== undefined
          ? { galleryUrls: body.galleryUrls }
          : {}),
        ...(body.heroImageUrl !== undefined
          ? { heroImageUrl: body.heroImageUrl }
          : {}),
        ...(body.videoUrl !== undefined ? { videoUrl: body.videoUrl } : {}),
        ...(body.publishStatus !== undefined
          ? { publishStatus: body.publishStatus }
          : {}),
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
    const existing = await prisma.project.findUnique({ where: { id } });

    if (!existing) {
      return jsonError("Project not found", 404);
    }

    await prisma.project.delete({ where: { id } });
    return jsonOk({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
