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
import { joinJsonArray, parseJsonArray } from "@/lib/admin-utils";
import type { Program } from "@/generated/prisma";

type ProgramFormProps = {
  program?: Program;
  isNew?: boolean;
};

export function ProgramForm({ program, isNew = !program }: ProgramFormProps) {
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
      shortDescription: form.get("shortDescription"),
      intro: form.get("intro"),
      problem: form.get("problem"),
      activities: parseJsonArray(String(form.get("activities") ?? "")),
      beneficiaries: form.get("beneficiaries"),
      approach: form.get("approach"),
      icon: form.get("icon"),
      heroImageUrl: form.get("heroImageUrl") || null,
      galleryUrls: parseJsonArray(String(form.get("galleryUrls") ?? "")),
      status: form.get("status"),
      sortOrder: Number(form.get("sortOrder") ?? 0),
    };

    try {
      const url = isNew ? "/api/admin/programs" : `/api/admin/programs/${program!.id}`;
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
        router.push(`/admin/programs/${data.item.id}`);
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
    if (!program) return;
    const res = await fetch(`/api/admin/programs/${program.id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Delete failed");
  }

  return (
    <div className="max-w-3xl rounded-lg border border-gray-200 bg-white p-6">
      <AdminForm onSubmit={handleSubmit} loading={loading} error={error} success={success}>
        <AdminField label="Title" required>
          <AdminInput name="title" defaultValue={program?.title} required />
        </AdminField>
        <AdminField label="Slug" required>
          <AdminInput name="slug" defaultValue={program?.slug} required />
        </AdminField>
        <AdminField label="Short description" required>
          <AdminTextarea name="shortDescription" defaultValue={program?.shortDescription} required />
        </AdminField>
        <AdminField label="Intro" required>
          <AdminTextarea name="intro" defaultValue={program?.intro} required rows={4} />
        </AdminField>
        <AdminField label="Problem" required>
          <AdminTextarea name="problem" defaultValue={program?.problem} required rows={4} />
        </AdminField>
        <AdminField label="Activities" hint="One per line">
          <AdminTextarea name="activities" defaultValue={joinJsonArray(program?.activities ?? [])} rows={4} />
        </AdminField>
        <AdminField label="Beneficiaries" required>
          <AdminTextarea name="beneficiaries" defaultValue={program?.beneficiaries} required />
        </AdminField>
        <AdminField label="Approach" required>
          <AdminTextarea name="approach" defaultValue={program?.approach} required rows={4} />
        </AdminField>
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Icon" required>
            <AdminInput name="icon" defaultValue={program?.icon ?? "heart"} required />
          </AdminField>
          <AdminField label="Sort order">
            <AdminInput name="sortOrder" type="number" defaultValue={program?.sortOrder ?? 0} />
          </AdminField>
        </div>
        <AdminField label="Hero image URL">
          <AdminInput name="heroImageUrl" type="url" defaultValue={program?.heroImageUrl ?? ""} />
        </AdminField>
        <AdminField label="Gallery URLs" hint="One per line">
          <AdminTextarea name="galleryUrls" defaultValue={joinJsonArray(program?.galleryUrls ?? [])} rows={3} />
        </AdminField>
        <AdminField label="Status">
          <AdminSelect name="status" defaultValue={program?.status ?? "PUBLISHED"}>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </AdminSelect>
        </AdminField>
      </AdminForm>
      {!isNew && program ? (
        <div className="mt-4 border-t border-gray-200 pt-4">
          <ConfirmButton onConfirm={handleDelete} redirectTo="/admin/programs" />
        </div>
      ) : null}
    </div>
  );
}
