"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AdminField,
  AdminForm,
  AdminInput,
  AdminSelect,
  AdminTextarea,
  ConfirmButton,
  MediaDropField,
} from "@/components/admin";
import type { Resource } from "@/generated/prisma";

type ResourceFormProps = { resource?: Resource; isNew?: boolean };

export function ResourceForm({ resource, isNew = !resource }: ResourceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      title: form.get("title"),
      slug: form.get("slug"),
      description: form.get("description"),
      category: form.get("category"),
      format: form.get("format"),
      topic: form.get("topic") || null,
      fileUrl: form.get("fileUrl") || null,
      externalUrl: form.get("externalUrl") || null,
      imageUrl: form.get("imageUrl") || null,
      status: form.get("status"),
    };

    try {
      const url = isNew ? "/api/admin/resources" : `/api/admin/resources/${resource!.id}`;
      const res = await fetch(url, {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Save failed");
        return;
      }
      setSuccess("Saved");
      if (isNew) {
        router.push("/admin/resources");
        router.refresh();
      } else {
        router.refresh();
      }
    } catch {
      setError("Unable to save.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!resource) return;
    const res = await fetch(`/api/admin/resources/${resource.id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Delete failed");
  }

  return (
    <div className="max-w-2xl rounded-lg border border-white/10 bg-[#1A2438] p-6">
      <AdminForm onSubmit={handleSubmit} loading={loading} error={error} success={success}>
        <AdminField label="Title" required>
          <AdminInput name="title" defaultValue={resource?.title} required />
        </AdminField>
        <AdminField label="Slug" required>
          <AdminInput name="slug" defaultValue={resource?.slug} required />
        </AdminField>
        <AdminField label="Description" required>
          <AdminTextarea name="description" defaultValue={resource?.description} required />
        </AdminField>
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Category" required>
            <AdminInput name="category" defaultValue={resource?.category ?? "Guides"} required />
          </AdminField>
          <AdminField label="Format" required>
            <AdminInput name="format" defaultValue={resource?.format ?? "PDF"} required />
          </AdminField>
        </div>
        <AdminField label="Topic">
          <AdminInput name="topic" defaultValue={resource?.topic ?? ""} />
        </AdminField>
        <AdminField label="File URL">
          <AdminInput name="fileUrl" type="url" defaultValue={resource?.fileUrl ?? ""} />
        </AdminField>
        <AdminField label="External URL">
          <AdminInput name="externalUrl" type="url" defaultValue={resource?.externalUrl ?? ""} />
        </AdminField>
        <AdminField label="Image">
          <MediaDropField
            name="imageUrl"
            defaultValue={resource?.imageUrl}
            folder="resources"
            hint="Landscape orientation works best."
          />
        </AdminField>
        <AdminField label="Status">
          <AdminSelect name="status" defaultValue={resource?.status ?? "PUBLISHED"}>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </AdminSelect>
        </AdminField>
      </AdminForm>
      {!isNew && resource ? (
        <div className="mt-4 border-t border-white/10 pt-4">
          <ConfirmButton onConfirm={handleDelete} redirectTo="/admin/resources" />
        </div>
      ) : null}
    </div>
  );
}
