import { prisma } from "@/lib/db";
import { deleteFromCloudinary } from "@/lib/cloudinary";
import {
  handleApiError,
  isAdminResponse,
  jsonError,
  jsonOk,
  requireAdminApi,
} from "@/lib/admin-api";

function cloudinaryResourceType(
  mediaType: "IMAGE" | "VIDEO" | "FILE"
): "image" | "video" | "raw" {
  if (mediaType === "VIDEO") return "video";
  if (mediaType === "FILE") return "raw";
  return "image";
}

type RouteContext = { params: Promise<{ id: string }> };

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const auth = await requireAdminApi();
    if (isAdminResponse(auth)) return auth;

    const { id } = await context.params;
    const asset = await prisma.mediaAsset.findUnique({ where: { id } });

    if (!asset) {
      return jsonError("Media asset not found", 404);
    }

    try {
      await deleteFromCloudinary(
        asset.publicId,
        cloudinaryResourceType(asset.resourceType)
      );
    } catch (cloudinaryError) {
      console.error("[media delete cloudinary]", cloudinaryError);
    }

    await prisma.mediaAsset.delete({ where: { id } });
    return jsonOk({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
