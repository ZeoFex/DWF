import { PublishStatus } from "@/generated/prisma";
import { prisma } from "@/lib/db";
import { resourceCreateSchema } from "@/lib/admin-schemas";
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

    const items = await prisma.resource.findMany({
      where: status ? { status: status as PublishStatus } : undefined,
      orderBy: [{ category: "asc" }, { title: "asc" }],
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

    const body = resourceCreateSchema.parse(await request.json());
    const slug =
      body.slug?.trim() ||
      (await uniqueSlug(body.title, async (candidate) => {
        const existing = await prisma.resource.findUnique({
          where: { slug: candidate },
        });
        return Boolean(existing);
      }));

    const item = await prisma.resource.create({
      data: {
        slug,
        title: body.title.trim(),
        description: body.description.trim(),
        category: body.category.trim(),
        format: body.format.trim(),
        topic: body.topic ?? null,
        fileUrl: body.fileUrl ?? null,
        externalUrl: body.externalUrl ?? null,
        imageUrl: body.imageUrl ?? null,
        status: body.status ?? PublishStatus.PUBLISHED,
      },
    });

    return jsonOk({ item }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
