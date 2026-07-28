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
import type { Partner } from "@/generated/prisma";

type PartnerFormProps = { partner?: Partner; isNew?: boolean };

export function PartnerForm({ partner, isNew = !partner }: PartnerFormProps) {
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
      name: form.get("name"),
      logoUrl: form.get("logoUrl") || null,
      websiteUrl: form.get("websiteUrl") || null,
      description: form.get("description") || null,
      featured: form.get("featured") === "on",
      sortOrder: Number(form.get("sortOrder") ?? 0),
      status: form.get("status"),
    };

    try {
      const url = isNew ? "/api/admin/partners" : `/api/admin/partners/${partner!.id}`;
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
      router.push("/admin/partners");
      router.refresh();
    } catch {
      setError("Unable to save.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!partner) return;
    const res = await fetch(`/api/admin/partners/${partner.id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Delete failed");
  }

  return (
    <div className="max-w-2xl rounded-lg border border-white/10 bg-[#1A2438] p-6">
      <AdminForm onSubmit={handleSubmit} loading={loading} error={error} success={success}>
        <AdminField label="Name" required>
          <AdminInput name="name" defaultValue={partner?.name} required />
        </AdminField>
        <AdminField label="Logo">
          <MediaDropField
            name="logoUrl"
            defaultValue={partner?.logoUrl}
            folder="general"
            hint="Transparent PNG or SVG-as-PNG works well."
          />
        </AdminField>
        <AdminField label="Website URL">
          <AdminInput name="websiteUrl" type="url" defaultValue={partner?.websiteUrl ?? ""} />
        </AdminField>
        <AdminField label="Description">
          <AdminTextarea name="description" defaultValue={partner?.description ?? ""} />
        </AdminField>
        <AdminCheckbox name="featured" label="Featured" defaultChecked={partner?.featured} />
        <AdminField label="Sort order">
          <AdminInput name="sortOrder" type="number" defaultValue={partner?.sortOrder ?? 0} />
        </AdminField>
        <AdminField label="Status">
          <AdminSelect name="status" defaultValue={partner?.status ?? "PUBLISHED"}>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </AdminSelect>
        </AdminField>
      </AdminForm>
      {!isNew && partner ? (
        <div className="mt-4 border-t border-white/10 pt-4">
          <ConfirmButton onConfirm={handleDelete} redirectTo="/admin/partners" />
        </div>
      ) : null}
    </div>
  );
}
