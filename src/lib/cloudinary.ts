import { v2 as cloudinary } from "cloudinary";

function configureCloudinary() {
  const cloudName =
    process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_NAME;
  const apiKey =
    process.env.CLOUDINARY_API_KEY || process.env.CLOUDINARY_KEY;
  const apiSecret =
    process.env.CLOUDINARY_API_SECRET || process.env.CLOUDINARY_SECRET;

  if (process.env.CLOUDINARY_URL) {
    cloudinary.config({
      cloudinary_url: process.env.CLOUDINARY_URL,
      secure: true,
    });
    return cloudinary;
  }

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET."
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  return cloudinary;
}

export function getCloudinary() {
  return configureCloudinary();
}

export type UploadFolder =
  | "general"
  | "blog"
  | "projects"
  | "programs"
  | "events"
  | "gallery"
  | "team"
  | "resources";

export async function uploadToCloudinary(
  buffer: Buffer,
  options: {
    folder?: UploadFolder;
    resourceType?: "image" | "video" | "raw" | "auto";
    filename?: string;
  } = {}
) {
  const client = getCloudinary();
  const folder = `dwf/${options.folder ?? "general"}`;

  return new Promise<{
    public_id: string;
    secure_url: string;
    url: string;
    resource_type: string;
    format?: string;
    width?: number;
    height?: number;
    bytes?: number;
    duration?: number;
  }>((resolve, reject) => {
    const stream = client.uploader.upload_stream(
      {
        folder,
        resource_type: options.resourceType ?? "auto",
        public_id: options.filename
          ? options.filename.replace(/\.[^.]+$/, "")
          : undefined,
        overwrite: false,
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed"));
          return;
        }
        resolve({
          public_id: result.public_id,
          secure_url: result.secure_url,
          url: result.url,
          resource_type: result.resource_type,
          format: result.format,
          width: result.width,
          height: result.height,
          bytes: result.bytes,
          duration: result.duration,
        });
      }
    );
    stream.end(buffer);
  });
}

export async function deleteFromCloudinary(
  publicId: string,
  resourceType: "image" | "video" | "raw" = "image"
) {
  const client = getCloudinary();
  return client.uploader.destroy(publicId, { resource_type: resourceType });
}
