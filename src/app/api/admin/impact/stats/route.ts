import { prisma } from "@/lib/db";
import { impactStatCreateSchema } from "@/lib/admin-schemas";
import {
  handleApiError,
  isAdminResponse,
  jsonOk,
  requireAdminApi,
} from "@/lib/admin-api";

export async function GET() {
  try {
    const auth = await requireAdminApi();
    if (isAdminResponse(auth)) return auth;

    const items = await prisma.impactStat.findMany({
      orderBy: { sortOrder: "asc" },
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

    const body = impactStatCreateSchema.parse(await request.json());

    const item = await prisma.impactStat.create({
      data: {
        label: body.label.trim(),
        value: body.value,
        suffix: body.suffix ?? null,
        prefix: body.prefix ?? null,
        note: body.note ?? null,
        sortOrder: body.sortOrder ?? 0,
      },
    });

    return jsonOk({ item }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
