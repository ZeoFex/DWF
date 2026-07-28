"use client";

import { ConfirmButton } from "@/components/admin";
import type { MediaAsset } from "@/generated/prisma";
import Image from "next/image";

type MediaGridProps = {
  assets: MediaAsset[];
};

export function MediaGrid({ assets }: MediaGridProps) {
  async function handleDelete(id: string) {
    const res = await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error ?? "Delete failed");
    }
  }

  if (assets.length === 0) {
    return (
      <p className="rounded-lg border border-gray-200 bg-white px-4 py-8 text-center text-sm text-gray-500">
        No media uploaded yet.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {assets.map((asset) => (
        <div
          key={asset.id}
          className="overflow-hidden rounded-lg border border-gray-200 bg-white"
        >
          <div className="relative aspect-video bg-gray-100">
            {asset.resourceType === "IMAGE" ? (
              <Image
                src={asset.secureUrl}
                alt={asset.alt ?? asset.publicId}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-gray-500">
                {asset.resourceType} · {asset.format ?? "file"}
              </div>
            )}
          </div>
          <div className="space-y-2 p-3">
            <p className="truncate text-xs font-medium text-[#111827]">
              {asset.publicId.split("/").pop()}
            </p>
            <p className="truncate text-xs text-gray-500">{asset.secureUrl}</p>
            <ConfirmButton
              label="Delete"
              onConfirm={() => handleDelete(asset.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
