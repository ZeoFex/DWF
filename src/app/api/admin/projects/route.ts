import { PublishStatus } from "@/generated/prisma";
import { prisma } from "@/lib/db";
import { projectCreateSchema } from "@/lib/admin-schemas";
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
    const publishStatus = searchParams.get("publishStatus");

    const items = await prisma.project.findMany({
      where: publishStatus
        ? { publishStatus: publishStatus as PublishStatus }
        : undefined,
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

    const body = projectCreateSchema.parse(await request.json());
    const slug =
      body.slug?.trim() ||
      (await uniqueSlug(body.title, async (candidate) => {
        const existing = await prisma.project.findUnique({
          where: { slug: candidate },
        });
        return Boolean(existing);
      }));

    const item = await prisma.project.create({
      data: {
        slug,
        title: body.title.trim(),
        shortDescription: body.shortDescription.trim(),
        ...(body.status !== undefined ? { status: body.status } : {}),
        featured: body.featured ?? false,
        goal: body.goal ?? null,
        raised: body.raised ?? null,
        currency: body.currency ?? "GHS",
        girlsSupported: body.girlsSupported ?? null,
        timelineStart: body.timelineStart ? new Date(body.timelineStart) : null,
        timelineEnd: body.timelineEnd ? new Date(body.timelineEnd) : null,
        milestones: body.milestones ?? undefined,
        location: body.location ?? null,
        activities: body.activities ?? [],
        impact: body.impact ?? [],
        sponsors: body.sponsors ?? undefined,
        updates: body.updates ?? undefined,
        galleryUrls: body.galleryUrls ?? [],
        heroImageUrl: body.heroImageUrl ?? null,
        videoUrl: body.videoUrl ?? null,
        publishStatus: body.publishStatus ?? PublishStatus.PUBLISHED,
      },
    });

    return jsonOk({ item }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
