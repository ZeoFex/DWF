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
      <p className="rounded-lg border border-white/10 bg-[#1A2438] px-4 py-8 text-center text-sm text-white/50">
        No media uploaded yet.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {assets.map((asset) => (
        <div
          key={asset.id}
          className="overflow-hidden rounded-lg border border-white/10 bg-[#1A2438]"
        >
          <div className="relative aspect-video bg-[#0F1729]">
            {asset.resourceType === "IMAGE" ? (
              <Image
                src={asset.secureUrl}
                alt={asset.alt ?? asset.publicId}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-white/50">
                {asset.resourceType} · {asset.format ?? "file"}
              </div>
            )}
          </div>
          <div className="space-y-2 p-3">
            <p className="truncate text-xs font-medium text-white">
              {asset.publicId.split("/").pop()}
            </p>
            <p className="truncate text-xs text-white/50">{asset.secureUrl}</p>
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
