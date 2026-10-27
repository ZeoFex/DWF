"use client";

import { ImagePlus, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { UploadFolder } from "@/lib/cloudinary";
import { adminInputClass } from "@/components/admin/AdminForm";

function isDriveOrAlbumLink(url: string): boolean {
  return /drive\.google\.com|docs\.google\.com|dropbox\.com|onedrive|sharepoint|flickr|photos\.app\.goo\.gl/i.test(
    url
  );
}

type GalleryUrlsFieldProps = {
  name?: string;
  defaultUrls?: string[];
  folder?: UploadFolder;
};

export function GalleryUrlsField({
  name = "galleryUrls",
  defaultUrls = [],
  folder = "projects",
}: GalleryUrlsFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const initialImages = defaultUrls.filter((u) => u && !isDriveOrAlbumLink(u));
  const initialAlbum =
    defaultUrls.find((u) => u && isDriveOrAlbumLink(u)) ?? "";

  const [images, setImages] = useState<string[]>(initialImages);
  const [albumLink, setAlbumLink] = useState(initialAlbum);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const combined = [...images, albumLink.trim()].filter(Boolean).join("\n");

  const uploadFiles = useCallback(
    async (files: FileList | File[]) => {
      const list = Array.from(files).filter((f) => f.type.startsWith("image/"));
      if (!list.length) {
        setError("Please choose image files.");
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const uploaded: string[] = [];
        for (const file of list) {
          if (file.size > 5 * 1024 * 1024) {
            setError(`${file.name} is larger than 5MB.`);
            continue;
          }
          const formData = new FormData();
          formData.append("file", file);
          formData.append("folder", folder);
          const res = await fetch("/api/admin/media", {
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          if (!res.ok) {
            setError(data.error ?? "Upload failed");
            continue;
          }
          const url = data.item?.secureUrl as string | undefined;
          if (url) uploaded.push(url);
        }
        if (uploaded.length) {
          setImages((prev) => [...prev, ...uploaded]);
        }
      } catch {
        setError("Upload failed. Please try again.");
      } finally {
        setLoading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    },
    [folder]
  );

  return (
    <div className="space-y-4">
      <input type="hidden" name={name} value={combined} />

      <div
        role="button"
        tabIndex={0}
        onClick={() => !loading && fileInputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!loading) fileInputRef.current?.click();
          }
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (!loading && e.dataTransfer.files.length) {
            void uploadFiles(e.dataTransfer.files);
          }
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-6 text-center transition-colors",
          "border-[#46A0DC]/35 bg-[#F5FAFE] hover:border-[#46A0DC] hover:bg-[#46A0DC]/5",
          dragging && "border-[#E85A28] bg-[#E85A28]/5",
          loading && "pointer-events-none opacity-70"
        )}
      >
        <div className="text-[#46A0DC]">
          {loading ? (
            <Loader2 className="h-7 w-7 animate-spin" aria-hidden />
          ) : (
            <ImagePlus className="h-7 w-7" aria-hidden />
          )}
        </div>
        <p className="text-sm font-medium text-[#1E1E1E]">
          {loading ? "Uploading…" : "Click or drop photos for the slideshow"}
        </p>
        <p className="text-xs text-[#1E1E1E]/45">
          JPEG, PNG, WebP or GIF — max 5MB each. These show on the public page.
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          className="sr-only"
          disabled={loading}
          onChange={(e) => {
            if (e.target.files?.length) void uploadFiles(e.target.files);
          }}
        />
      </div>

      {images.length > 0 && (
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {images.map((url) => (
            <li
              key={url}
              className="relative aspect-square overflow-hidden rounded-lg border border-[#46A0DC]/15 bg-white"
            >
              <Image
                src={url}
                alt=""
                fill
                className="object-cover"
                sizes="120px"
                unoptimized
              />
              <button
                type="button"
                onClick={() => setImages((prev) => prev.filter((u) => u !== url))}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/95 text-[#1E1E1E] shadow hover:bg-[#E85A28] hover:text-white"
                aria-label="Remove photo"
              >
                <X className="h-3.5 w-3.5" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div>
        <label className="mb-1 block text-xs font-medium text-[#1E1E1E]/70">
          Optional full album link (Google Drive, etc.)
        </label>
        <input
          type="url"
          value={albumLink}
          onChange={(e) => setAlbumLink(e.target.value)}
          placeholder="https://drive.google.com/drive/folders/..."
          className={adminInputClass}
        />
        <p className="mt-1 text-xs text-[#1E1E1E]/45">
          Shown as a “View Photo Gallery” button for visitors who want to see more.
        </p>
      </div>

      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
