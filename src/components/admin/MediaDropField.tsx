"use client";

import { cn } from "@/lib/utils";
import type { UploadFolder } from "@/lib/cloudinary";
import { ImagePlus, Loader2, Video, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useId, useRef, useState } from "react";

const IMAGE_ACCEPT = "image/jpeg,image/png,image/webp,image/gif";
const VIDEO_ACCEPT = "video/mp4,video/webm,video/quicktime";
const IMAGE_MAX_BYTES = 5 * 1024 * 1024;
const VIDEO_MAX_BYTES = 50 * 1024 * 1024;

type MediaDropFieldProps = {
  name: string;
  defaultValue?: string | null;
  kind?: "image" | "video";
  folder?: UploadFolder;
  hint?: string;
  required?: boolean;
  className?: string;
};

export function MediaDropField({
  name,
  defaultValue = "",
  kind = "image",
  folder = "general",
  hint,
  required = false,
  className,
}: MediaDropFieldProps) {
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState(defaultValue ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const isVideo = kind === "video";
  const accept = isVideo ? VIDEO_ACCEPT : IMAGE_ACCEPT;
  const maxBytes = isVideo ? VIDEO_MAX_BYTES : IMAGE_MAX_BYTES;
  const maxLabel = isVideo ? "50MB" : "5MB";
  const formats = isVideo
    ? "MP4, WebM or MOV"
    : "JPEG, PNG, WebP or GIF";
  const prompt = isVideo ? "Click or drop a video" : "Click or drop an image";

  const uploadFile = useCallback(
    async (file: File) => {
      setError(null);

      if (isVideo) {
        if (!file.type.startsWith("video/")) {
          setError("Please choose a video file.");
          return;
        }
      } else if (!file.type.startsWith("image/")) {
        setError("Please choose an image file.");
        return;
      }

      if (file.size > maxBytes) {
        setError(`File is too large. Max ${maxLabel}.`);
        return;
      }

      setLoading(true);
      try {
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
          return;
        }
        const nextUrl = data.item?.secureUrl as string | undefined;
        if (!nextUrl) {
          setError("Upload succeeded but no URL was returned.");
          return;
        }
        setUrl(nextUrl);
      } catch {
        setError("Upload failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [folder, isVideo, maxBytes, maxLabel]
  );

  function onFiles(files: FileList | null) {
    const file = files?.[0];
    if (file) void uploadFile(file);
  }

  function clear() {
    setUrl("");
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div className={cn("space-y-2", className)}>
      <input type="hidden" name={name} value={url} required={required && !url} />
      <input
        ref={fileInputRef}
        id={inputId}
        type="file"
        accept={accept}
        className="sr-only"
        disabled={loading}
        onChange={(e) => {
          onFiles(e.target.files);
          e.target.value = "";
        }}
      />

      <div
        role="button"
        tabIndex={0}
        aria-label={prompt}
        onClick={() => !loading && fileInputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!loading) fileInputRef.current?.click();
          }
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragging(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragging(false);
          if (!loading) onFiles(e.dataTransfer.files);
        }}
        className={cn(
          "flex cursor-pointer items-center gap-4 rounded-xl border border-dashed px-4 py-5 transition-colors",
          "border-white/20 bg-[#0F1729]/80 hover:border-[#2563EB]/50 hover:bg-[#0F1729]",
          dragging && "border-[#2563EB] bg-[#2563EB]/10",
          loading && "pointer-events-none opacity-70"
        )}
      >
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center text-[#3B82F6]">
            {loading ? (
              <Loader2 className="h-7 w-7 animate-spin" aria-hidden />
            ) : isVideo ? (
              <Video className="h-7 w-7" aria-hidden />
            ) : (
              <ImagePlus className="h-7 w-7" aria-hidden />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white">
              {loading ? "Uploading…" : prompt}
            </p>
            <p className="mt-0.5 text-xs text-white/45">
              {formats} — max {maxLabel}
            </p>
          </div>
        </div>

        {url ? (
          <div
            className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-[#121A2B]"
            onClick={(e) => e.stopPropagation()}
          >
            {isVideo ? (
              <video
                src={url}
                className="h-full w-full object-cover"
                muted
                playsInline
              />
            ) : (
              <Image
                src={url}
                alt="Upload preview"
                fill
                className="object-cover"
                sizes="96px"
                unoptimized
              />
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clear();
              }}
              className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#0B1220] text-white shadow ring-1 ring-white/20 hover:bg-red-600"
              aria-label="Remove upload"
            >
              <X className="h-3 w-3" aria-hidden />
            </button>
          </div>
        ) : null}
      </div>

      {hint ? <p className="text-xs text-white/45">{hint}</p> : null}
      {error ? <p className="text-xs text-red-300">{error}</p> : null}
    </div>
  );
}
