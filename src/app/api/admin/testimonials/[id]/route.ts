import { prisma } from "@/lib/db";
import { testimonialUpdateSchema } from "@/lib/admin-schemas";
import {
  handleApiError,
  isAdminResponse,
  jsonError,
  jsonOk,
  requireAdminApi,
} from "@/lib/admin-api";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  try {
    const auth = await requireAdminApi();
    if (isAdminResponse(auth)) return auth;

    const { id } = await context.params;
    const item = await prisma.testimonial.findUnique({ where: { id } });

    if (!item) {
      return jsonError("Testimonial not found", 404);
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
    const existing = await prisma.testimonial.findUnique({ where: { id } });

    if (!existing) {
      return jsonError("Testimonial not found", 404);
    }

    const body = testimonialUpdateSchema.parse(await request.json());

    const item = await prisma.testimonial.update({
      where: { id },
      data: {
        ...(body.quote !== undefined ? { quote: body.quote.trim() } : {}),
        ...(body.author !== undefined ? { author: body.author.trim() } : {}),
        ...(body.role !== undefined ? { role: body.role.trim() } : {}),
        ...(body.organization !== undefined
          ? { organization: body.organization?.trim() || null }
          : {}),
        ...(body.imageUrl !== undefined ? { imageUrl: body.imageUrl } : {}),
        ...(body.programSlug !== undefined
          ? { programSlug: body.programSlug }
          : {}),
        ...(body.featured !== undefined ? { featured: body.featured } : {}),
        ...(body.status !== undefined ? { status: body.status } : {}),
        ...(body.sortOrder !== undefined ? { sortOrder: body.sortOrder } : {}),
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
    const existing = await prisma.testimonial.findUnique({ where: { id } });

    if (!existing) {
      return jsonError("Testimonial not found", 404);
    }

    await prisma.testimonial.delete({ where: { id } });
    return jsonOk({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
