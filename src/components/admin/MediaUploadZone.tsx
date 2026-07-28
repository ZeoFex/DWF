"use client";

import { ImagePlus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function MediaUploadZone() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  async function uploadFiles(files: FileList | File[]) {
    const list = Array.from(files);
    if (!list.length) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      for (const file of list) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/admin/media", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Upload failed");
          return;
        }
      }
      setSuccess(`${list.length} file(s) uploaded successfully`);
      router.refresh();
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime"
        className="sr-only"
        disabled={loading}
        onChange={(e) => {
          if (e.target.files) void uploadFiles(e.target.files);
        }}
      />
      <div
        role="button"
        tabIndex={0}
        aria-label="Click or drop files to upload"
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
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-8 text-center transition-colors",
          "border-[#46A0DC]/35 bg-white hover:border-[#46A0DC] hover:bg-[#46A0DC]/5",
          dragging && "border-[#E85A28] bg-[#E85A28]/5",
          loading && "pointer-events-none opacity-70"
        )}
      >
        <div className="text-[#46A0DC]">
          {loading ? (
            <Loader2 className="h-8 w-8 animate-spin" aria-hidden />
          ) : (
            <ImagePlus className="h-8 w-8" aria-hidden />
          )}
        </div>
        <p className="text-sm font-medium text-[#1E1E1E]">
          {loading ? "Uploading…" : "Click or drop an image"}
        </p>
        <p className="text-xs text-[#1E1E1E]/45">
          JPEG, PNG, WebP, GIF, or video — max 5MB images / 50MB video
        </p>
      </div>
      {error ? <p className="text-center text-sm text-red-600">{error}</p> : null}
      {success ? (
        <p className="text-center text-sm text-emerald-600">{success}</p>
      ) : null}
    </div>
  );
}
