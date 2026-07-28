"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AdminField, AdminForm, AdminInput, AdminSelect } from "@/components/admin";

export function NewGalleryAlbumForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.get("title"),
          slug: form.get("slug"),
          status: form.get("status"),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to create album");
        return;
      }
      router.push(`/admin/gallery/${data.item.id}`);
      router.refresh();
    } catch {
      setError("Unable to create album.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg rounded-lg border border-[#46A0DC]/15 bg-white p-6">
      <h2 className="text-sm font-semibold text-[#1E1E1E]">Create album</h2>
      <AdminForm onSubmit={handleSubmit} loading={loading} error={error} className="mt-4">
        <AdminField label="Title" required>
          <AdminInput name="title" required />
        </AdminField>
        <AdminField label="Slug">
          <AdminInput name="slug" placeholder="auto-generated if empty" />
        </AdminField>
        <AdminField label="Status">
          <AdminSelect name="status" defaultValue="PUBLISHED">
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </AdminSelect>
        </AdminField>
      </AdminForm>
    </div>
  );
}
