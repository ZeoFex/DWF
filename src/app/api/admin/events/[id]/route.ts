import { prisma } from "@/lib/db";
import { eventUpdateSchema } from "@/lib/admin-schemas";
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
    const item = await prisma.event.findUnique({
      where: { id },
      include: { registrations: { orderBy: { createdAt: "desc" } } },
    });

    if (!item) {
      return jsonError("Event not found", 404);
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
    const existing = await prisma.event.findUnique({ where: { id } });

    if (!existing) {
      return jsonError("Event not found", 404);
    }

    const body = eventUpdateSchema.parse(await request.json());

    let slug = body.slug?.trim();
    if (body.slug !== undefined && slug && slug !== existing.slug) {
      slug = await uniqueSlug(slug, async (candidate) => {
        const found = await prisma.event.findUnique({
          where: { slug: candidate },
        });
        return Boolean(found && found.id !== id);
      });
    }

    const item = await prisma.event.update({
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
        ...(body.startsAt !== undefined
          ? { startsAt: new Date(body.startsAt) }
          : {}),
        ...(body.endsAt !== undefined
          ? { endsAt: body.endsAt ? new Date(body.endsAt) : null }
          : {}),
        ...(body.location !== undefined
          ? { location: body.location.trim() }
          : {}),
        ...(body.imageUrl !== undefined ? { imageUrl: body.imageUrl } : {}),
        ...(body.registrationRequired !== undefined
          ? { registrationRequired: body.registrationRequired }
          : {}),
        ...(body.isPast !== undefined ? { isPast: body.isPast } : {}),
        ...(body.galleryUrls !== undefined
          ? { galleryUrls: body.galleryUrls }
          : {}),
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
    const existing = await prisma.event.findUnique({ where: { id } });

    if (!existing) {
      return jsonError("Event not found", 404);
    }

    await prisma.event.delete({ where: { id } });
    return jsonOk({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
