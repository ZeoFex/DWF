"use client";

import { Loader2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function MediaUploadZone() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      for (const file of Array.from(files)) {
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
      setSuccess(`${files.length} file(s) uploaded successfully`);
      router.refresh();
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  }

  return (
    <div className="rounded-lg border border-dashed border-gray-300 bg-white p-6">
      <label className="flex cursor-pointer flex-col items-center gap-2 text-center">
        <div className="rounded-full bg-[#2563EB]/10 p-3 text-[#2563EB]">
          {loading ? (
            <Loader2 className="h-6 w-6 animate-spin" aria-hidden />
          ) : (
            <Upload className="h-6 w-6" aria-hidden />
          )}
        </div>
        <span className="text-sm font-medium text-[#111827]">
          {loading ? "Uploading..." : "Click to upload files"}
        </span>
        <span className="text-xs text-gray-500">Images, videos, and documents</span>
        <input
          type="file"
          multiple
          className="sr-only"
          disabled={loading}
          onChange={handleUpload}
        />
      </label>
      {error ? <p className="mt-3 text-center text-sm text-red-600">{error}</p> : null}
      {success ? (
        <p className="mt-3 text-center text-sm text-emerald-600">{success}</p>
      ) : null}
    </div>
  );
}
