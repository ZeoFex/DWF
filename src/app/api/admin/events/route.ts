import { PublishStatus } from "@/generated/prisma";
import { prisma } from "@/lib/db";
import { eventCreateSchema } from "@/lib/admin-schemas";
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

    const items = await prisma.event.findMany({
      where: status ? { status: status as PublishStatus } : undefined,
      orderBy: { startsAt: "desc" },
      include: { _count: { select: { registrations: true } } },
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

    const body = eventCreateSchema.parse(await request.json());
    const slug =
      body.slug?.trim() ||
      (await uniqueSlug(body.title, async (candidate) => {
        const existing = await prisma.event.findUnique({
          where: { slug: candidate },
        });
        return Boolean(existing);
      }));

    const item = await prisma.event.create({
      data: {
        slug,
        title: body.title.trim(),
        description: body.description.trim(),
        category: body.category.trim(),
        startsAt: new Date(body.startsAt),
        endsAt: body.endsAt ? new Date(body.endsAt) : null,
        location: body.location.trim(),
        imageUrl: body.imageUrl ?? null,
        registrationRequired: body.registrationRequired ?? false,
        isPast: body.isPast ?? false,
        galleryUrls: body.galleryUrls ?? [],
        status: body.status ?? PublishStatus.PUBLISHED,
      },
    });

    return jsonOk({ item }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
