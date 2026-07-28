import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/db";
import { programUpdateSchema } from "@/lib/admin-schemas";
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
    const item = await prisma.program.findUnique({ where: { id } });

    if (!item) {
      return jsonError("Program not found", 404);
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
    const existing = await prisma.program.findUnique({ where: { id } });

    if (!existing) {
      return jsonError("Program not found", 404);
    }

    const body = programUpdateSchema.parse(await request.json());

    let slug = body.slug?.trim();
    if (body.slug !== undefined && slug && slug !== existing.slug) {
      slug = await uniqueSlug(slug, async (candidate) => {
        const found = await prisma.program.findUnique({
          where: { slug: candidate },
        });
        return Boolean(found && found.id !== id);
      });
    }

    const item = await prisma.program.update({
      where: { id },
      data: {
        ...(body.title !== undefined ? { title: body.title.trim() } : {}),
        ...(slug !== undefined ? { slug } : {}),
        ...(body.shortDescription !== undefined
          ? { shortDescription: body.shortDescription.trim() }
          : {}),
        ...(body.intro !== undefined ? { intro: body.intro.trim() } : {}),
        ...(body.problem !== undefined ? { problem: body.problem.trim() } : {}),
        ...(body.activities !== undefined ? { activities: body.activities } : {}),
        ...(body.beneficiaries !== undefined
          ? { beneficiaries: body.beneficiaries.trim() }
          : {}),
        ...(body.approach !== undefined
          ? { approach: body.approach.trim() }
          : {}),
        ...(body.stats !== undefined
          ? { stats: body.stats as Prisma.InputJsonValue }
          : {}),
        ...(body.heroImageUrl !== undefined
          ? { heroImageUrl: body.heroImageUrl }
          : {}),
        ...(body.galleryUrls !== undefined
          ? { galleryUrls: body.galleryUrls }
          : {}),
        ...(body.icon !== undefined ? { icon: body.icon.trim() } : {}),
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
    const existing = await prisma.program.findUnique({ where: { id } });

    if (!existing) {
      return jsonError("Program not found", 404);
    }

    await prisma.program.delete({ where: { id } });
    return jsonOk({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
