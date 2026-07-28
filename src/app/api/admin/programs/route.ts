import { Prisma, PublishStatus } from "@/generated/prisma";
import { prisma } from "@/lib/db";
import {
  programCreateSchema,
} from "@/lib/admin-schemas";
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

    const items = await prisma.program.findMany({
      where: status ? { status: status as PublishStatus } : undefined,
      orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
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

    const body = programCreateSchema.parse(await request.json());
    const slug =
      body.slug?.trim() ||
      (await uniqueSlug(body.title, async (candidate) => {
        const existing = await prisma.program.findUnique({
          where: { slug: candidate },
        });
        return Boolean(existing);
      }));

    const item = await prisma.program.create({
      data: {
        slug,
        title: body.title.trim(),
        shortDescription: body.shortDescription.trim(),
        intro: body.intro.trim(),
        problem: body.problem.trim(),
        activities: body.activities,
        beneficiaries: body.beneficiaries.trim(),
        approach: body.approach.trim(),
        stats: body.stats as Prisma.InputJsonValue,
        heroImageUrl: body.heroImageUrl ?? null,
        galleryUrls: body.galleryUrls ?? [],
        icon: body.icon.trim(),
        status: body.status ?? PublishStatus.PUBLISHED,
        sortOrder: body.sortOrder ?? 0,
      },
    });

    return jsonOk({ item }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
