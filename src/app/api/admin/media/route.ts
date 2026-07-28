import { MediaType } from "@/generated/prisma";
import { prisma } from "@/lib/db";
import {
  uploadToCloudinary,
  type UploadFolder,
} from "@/lib/cloudinary";
import {
  handleApiError,
  isAdminResponse,
  jsonError,
  jsonOk,
  requireAdminApi,
} from "@/lib/admin-api";

function mapResourceType(resourceType: string): MediaType {
  if (resourceType === "video") return MediaType.VIDEO;
  if (resourceType === "raw") return MediaType.FILE;
  return MediaType.IMAGE;
}

const validFolders = new Set([
  "general",
  "blog",
  "projects",
  "programs",
  "events",
  "gallery",
  "team",
  "resources",
]);

export async function GET() {
  try {
    const auth = await requireAdminApi();
    if (isAdminResponse(auth)) return auth;

    const items = await prisma.mediaAsset.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        uploadedBy: { select: { id: true, name: true, email: true } },
      },
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

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return jsonError("File is required", 400);
    }

    const folderRaw = formData.get("folder");
    const folder =
      typeof folderRaw === "string" && validFolders.has(folderRaw)
        ? (folderRaw as UploadFolder)
        : "general";

    const alt =
      typeof formData.get("alt") === "string"
        ? String(formData.get("alt"))
        : undefined;
    const caption =
      typeof formData.get("caption") === "string"
        ? String(formData.get("caption"))
        : undefined;

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploaded = await uploadToCloudinary(buffer, {
      folder,
      filename: file.name,
    });

    const item = await prisma.mediaAsset.create({
      data: {
        publicId: uploaded.public_id,
        url: uploaded.url,
        secureUrl: uploaded.secure_url,
        resourceType: mapResourceType(uploaded.resource_type),
        format: uploaded.format ?? null,
        width: uploaded.width ?? null,
        height: uploaded.height ?? null,
        bytes: uploaded.bytes ?? null,
        duration: uploaded.duration ?? null,
        folder,
        alt: alt?.trim() || null,
        caption: caption?.trim() || null,
        uploadedById: auth.sub,
      },
    });

    return jsonOk({ item }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
