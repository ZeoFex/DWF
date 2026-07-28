import { PublishStatus } from "@/generated/prisma";
import { prisma } from "@/lib/db";
import { successStoryCreateSchema } from "@/lib/admin-schemas";
import {
  handleApiError,
  isAdminResponse,
  jsonOk,
  requireAdminApi,
} from "@/lib/admin-api";

export async function GET(request: Request) {
  try {
    const auth = await requireAdminApi();
    if (isAdminResponse(auth)) return auth;

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const items = await prisma.successStory.findMany({
      where: status ? { status: status as PublishStatus } : undefined,
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
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

    const body = successStoryCreateSchema.parse(await request.json());

    const item = await prisma.successStory.create({
      data: {
        title: body.title.trim(),
        summary: body.summary.trim(),
        quote: body.quote?.trim() || null,
        imageUrl: body.imageUrl ?? null,
        href: body.href ?? null,
        featured: body.featured ?? false,
        status: body.status ?? PublishStatus.PUBLISHED,
      },
    });

    return jsonOk({ item }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
