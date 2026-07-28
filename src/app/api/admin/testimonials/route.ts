import { PublishStatus } from "@/generated/prisma";
import { prisma } from "@/lib/db";
import { testimonialCreateSchema } from "@/lib/admin-schemas";
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

    const items = await prisma.testimonial.findMany({
      where: status ? { status: status as PublishStatus } : undefined,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
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

    const body = testimonialCreateSchema.parse(await request.json());

    const item = await prisma.testimonial.create({
      data: {
        quote: body.quote.trim(),
        author: body.author.trim(),
        role: body.role.trim(),
        organization: body.organization?.trim() || null,
        imageUrl: body.imageUrl ?? null,
        programSlug: body.programSlug ?? null,
        featured: body.featured ?? false,
        status: body.status ?? PublishStatus.PUBLISHED,
        sortOrder: body.sortOrder ?? 0,
      },
    });

    return jsonOk({ item }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
