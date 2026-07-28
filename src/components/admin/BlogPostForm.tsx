"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AdminCheckbox,
  AdminField,
  AdminForm,
  AdminInput,
  AdminSelect,
  AdminTextarea,
  ConfirmButton,
  MediaDropField,
} from "@/components/admin";
import type { BlogPost } from "@/generated/prisma";

type BlogPostFormProps = {
  post?: BlogPost;
};

export function BlogPostForm({ post }: BlogPostFormProps) {
  const router = useRouter();
  const isNew = !post;
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
      excerpt: form.get("excerpt"),
      content: form.get("content"),
      category: form.get("category"),
      author: form.get("author"),
      imageUrl: form.get("imageUrl") || null,
      videoUrl: form.get("videoUrl") || null,
      featured: form.get("featured") === "on",
      status: form.get("status"),
    };

    try {
      const url = isNew ? "/api/admin/blog" : `/api/admin/blog/${post.id}`;
      const method = isNew ? "POST" : "PATCH";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Save failed");
        return;
      }
      setSuccess("Saved successfully");
      if (isNew && data.item?.id) {
        router.push(`/admin/blog/${data.item.id}`);
      } else {
        router.refresh();
      }
    } catch {
      setError("Unable to save. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!post) return;
    const res = await fetch(`/api/admin/blog/${post.id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error ?? "Delete failed");
    }
  }

  return (
    <div className="max-w-3xl rounded-lg border border-[#46A0DC]/15 bg-white p-6">
      <AdminForm onSubmit={handleSubmit} loading={loading} error={error} success={success}>
        <AdminField label="Title" required>
          <AdminInput name="title" defaultValue={post?.title} required />
        </AdminField>
        <AdminField label="Slug" required>
          <AdminInput name="slug" defaultValue={post?.slug} required />
        </AdminField>
        <AdminField label="Excerpt" required>
          <AdminTextarea name="excerpt" defaultValue={post?.excerpt} required />
        </AdminField>
        <AdminField label="Content" required>
          <AdminTextarea name="content" defaultValue={post?.content} required rows={12} />
        </AdminField>
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Category" required>
            <AdminInput name="category" defaultValue={post?.category ?? "News"} required />
          </AdminField>
          <AdminField label="Author" required>
            <AdminInput name="author" defaultValue={post?.author ?? "DWF Team"} required />
          </AdminField>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Image">
            <MediaDropField
              name="imageUrl"
              defaultValue={post?.imageUrl}
              folder="blog"
              hint="Landscape orientation works best."
            />
          </AdminField>
          <AdminField label="Video">
            <MediaDropField
              name="videoUrl"
              defaultValue={post?.videoUrl}
              kind="video"
              folder="blog"
            />
          </AdminField>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Status">
            <AdminSelect name="status" defaultValue={post?.status ?? "DRAFT"}>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </AdminSelect>
          </AdminField>
          <div className="flex items-end pb-2">
            <AdminCheckbox name="featured" label="Featured post" defaultChecked={post?.featured} />
          </div>
        </div>
      </AdminForm>
      {!isNew ? (
        <div className="mt-4 border-t border-[#46A0DC]/15 pt-4">
          <ConfirmButton
            onConfirm={handleDelete}
            redirectTo="/admin/blog"
          />
        </div>
      ) : null}
    </div>
  );
}
