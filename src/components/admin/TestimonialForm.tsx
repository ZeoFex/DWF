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
import type { Testimonial } from "@/generated/prisma";

type TestimonialFormProps = { testimonial?: Testimonial; isNew?: boolean };

export function TestimonialForm({ testimonial, isNew = !testimonial }: TestimonialFormProps) {
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
      quote: form.get("quote"),
      author: form.get("author"),
      role: form.get("role"),
      organization: form.get("organization") || null,
      imageUrl: form.get("imageUrl") || null,
      programSlug: form.get("programSlug") || null,
      featured: form.get("featured") === "on",
      sortOrder: Number(form.get("sortOrder") ?? 0),
      status: form.get("status"),
    };

    try {
      const url = isNew ? "/api/admin/testimonials" : `/api/admin/testimonials/${testimonial!.id}`;
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
      router.push("/admin/testimonials");
      router.refresh();
    } catch {
      setError("Unable to save.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!testimonial) return;
    const res = await fetch(`/api/admin/testimonials/${testimonial.id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Delete failed");
  }

  return (
    <div className="max-w-2xl rounded-lg border border-[#46A0DC]/15 bg-white p-6">
      <AdminForm onSubmit={handleSubmit} loading={loading} error={error} success={success}>
        <AdminField label="Quote" required>
          <AdminTextarea name="quote" defaultValue={testimonial?.quote} required rows={4} />
        </AdminField>
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Author" required>
            <AdminInput name="author" defaultValue={testimonial?.author} required />
          </AdminField>
          <AdminField label="Role" required>
            <AdminInput name="role" defaultValue={testimonial?.role} required />
          </AdminField>
        </div>
        <AdminField label="Organization">
          <AdminInput name="organization" defaultValue={testimonial?.organization ?? ""} />
        </AdminField>
        <AdminField label="Photo">
          <MediaDropField
            name="imageUrl"
            defaultValue={testimonial?.imageUrl}
            folder="general"
            hint="Square or portrait crops work best."
          />
        </AdminField>
        <AdminField label="Program slug">
          <AdminInput name="programSlug" defaultValue={testimonial?.programSlug ?? ""} />
        </AdminField>
        <AdminCheckbox name="featured" label="Featured" defaultChecked={testimonial?.featured} />
        <AdminField label="Sort order">
          <AdminInput name="sortOrder" type="number" defaultValue={testimonial?.sortOrder ?? 0} />
        </AdminField>
        <AdminField label="Status">
          <AdminSelect name="status" defaultValue={testimonial?.status ?? "PUBLISHED"}>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </AdminSelect>
        </AdminField>
      </AdminForm>
      {!isNew && testimonial ? (
        <div className="mt-4 border-t border-[#46A0DC]/15 pt-4">
          <ConfirmButton onConfirm={handleDelete} redirectTo="/admin/testimonials" />
        </div>
      ) : null}
    </div>
  );
}
