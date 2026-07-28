import { PublishStatus } from "@/generated/prisma";
import { prisma } from "@/lib/db";
import { teamCreateSchema } from "@/lib/admin-schemas";
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

    const items = await prisma.teamMember.findMany({
      where: status ? { status: status as PublishStatus } : undefined,
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
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

    const body = teamCreateSchema.parse(await request.json());

    const item = await prisma.teamMember.create({
      data: {
        name: body.name.trim(),
        role: body.role.trim(),
        bio: body.bio.trim(),
        imageUrl: body.imageUrl ?? null,
        email: body.email?.toLowerCase() ?? null,
        isFounder: body.isFounder ?? false,
        sortOrder: body.sortOrder ?? 0,
        status: body.status ?? PublishStatus.PUBLISHED,
      },
    });

    return jsonOk({ item }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
