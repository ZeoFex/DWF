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
} from "@/components/admin";
import type { GalleryAlbum, GalleryItem } from "@/generated/prisma";

type GalleryAlbumFormProps = {
  album: GalleryAlbum;
  items: GalleryItem[];
};

export function GalleryAlbumDetail({ album, items }: GalleryAlbumFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [itemLoading, setItemLoading] = useState(false);

  async function handleAlbumSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      title: form.get("title"),
      slug: form.get("slug"),
      description: form.get("description") || null,
      coverUrl: form.get("coverUrl") || null,
      status: form.get("status"),
      sortOrder: Number(form.get("sortOrder") ?? 0),
    };

    try {
      const res = await fetch(`/api/admin/gallery/${album.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Save failed");
        return;
      }
      setSuccess("Album saved");
      router.refresh();
    } catch {
      setError("Unable to save.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setItemLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch(`/api/admin/gallery/${album.id}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: form.get("url"),
          alt: form.get("alt") || null,
          caption: form.get("caption") || null,
          sortOrder: Number(form.get("sortOrder") ?? items.length),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Failed to add item");
        return;
      }
      e.currentTarget.reset();
      router.refresh();
    } finally {
      setItemLoading(false);
    }
  }

  async function handleDeleteAlbum() {
    const res = await fetch(`/api/admin/gallery/${album.id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Delete failed");
  }

  async function handleDeleteItem(itemId: string) {
    const res = await fetch(`/api/admin/gallery/items/${itemId}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Delete failed");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="max-w-3xl rounded-lg border border-gray-200 bg-white p-6">
        <AdminForm onSubmit={handleAlbumSubmit} loading={loading} error={error} success={success}>
          <AdminField label="Title" required>
            <AdminInput name="title" defaultValue={album.title} required />
          </AdminField>
          <AdminField label="Slug" required>
            <AdminInput name="slug" defaultValue={album.slug} required />
          </AdminField>
          <AdminField label="Description">
            <AdminTextarea name="description" defaultValue={album.description ?? ""} />
          </AdminField>
          <AdminField label="Cover URL">
            <AdminInput name="coverUrl" type="url" defaultValue={album.coverUrl ?? ""} />
          </AdminField>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Status">
              <AdminSelect name="status" defaultValue={album.status}>
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </AdminSelect>
            </AdminField>
            <AdminField label="Sort order">
              <AdminInput name="sortOrder" type="number" defaultValue={album.sortOrder} />
            </AdminField>
          </div>
        </AdminForm>
        <div className="mt-4 border-t border-gray-200 pt-4">
          <ConfirmButton onConfirm={handleDeleteAlbum} redirectTo="/admin/gallery" />
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-[#111827]">Gallery items ({items.length})</h2>
        <AdminForm onSubmit={handleAddItem} loading={itemLoading} className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Image URL" required>
              <AdminInput name="url" type="url" required />
            </AdminField>
            <AdminField label="Sort order">
              <AdminInput name="sortOrder" type="number" defaultValue={items.length} />
            </AdminField>
          </div>
          <AdminField label="Alt text">
            <AdminInput name="alt" />
          </AdminField>
          <AdminField label="Caption">
            <AdminInput name="caption" />
          </AdminField>
        </AdminForm>

        <ul className="mt-4 divide-y divide-gray-100">
          {items.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm text-[#111827]">{item.url}</p>
                <p className="text-xs text-gray-500">{item.alt ?? item.caption ?? "—"}</p>
              </div>
              <ConfirmButton label="Remove" onConfirm={() => handleDeleteItem(item.id)} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
