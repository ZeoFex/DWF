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
import type { TeamMember } from "@/generated/prisma";

type TeamMemberFormProps = { member?: TeamMember; isNew?: boolean };

export function TeamMemberForm({ member, isNew = !member }: TeamMemberFormProps) {
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
      role: form.get("role"),
      bio: form.get("bio"),
      imageUrl: form.get("imageUrl") || null,
      email: form.get("email") || null,
      isFounder: form.get("isFounder") === "on",
      sortOrder: Number(form.get("sortOrder") ?? 0),
      status: form.get("status"),
    };

    try {
      const url = isNew ? "/api/admin/team" : `/api/admin/team/${member!.id}`;
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
      router.push("/admin/team");
      router.refresh();
    } catch {
      setError("Unable to save.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!member) return;
    const res = await fetch(`/api/admin/team/${member.id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Delete failed");
  }

  return (
    <div className="max-w-2xl rounded-lg border border-[#46A0DC]/15 bg-white p-6">
      <AdminForm onSubmit={handleSubmit} loading={loading} error={error} success={success}>
        <AdminField label="Name" required>
          <AdminInput name="name" defaultValue={member?.name} required />
        </AdminField>
        <AdminField label="Role" required>
          <AdminInput name="role" defaultValue={member?.role} required />
        </AdminField>
        <AdminField label="Bio" required>
          <AdminTextarea name="bio" defaultValue={member?.bio} required rows={4} />
        </AdminField>
        <AdminField label="Photo">
          <MediaDropField
            name="imageUrl"
            defaultValue={member?.imageUrl}
            folder="team"
            hint="Square or portrait crops work best."
          />
        </AdminField>
        <AdminField label="Email">
          <AdminInput name="email" type="email" defaultValue={member?.email ?? ""} />
        </AdminField>
        <AdminCheckbox name="isFounder" label="Founder" defaultChecked={member?.isFounder} />
        <AdminField label="Sort order">
          <AdminInput name="sortOrder" type="number" defaultValue={member?.sortOrder ?? 0} />
        </AdminField>
        <AdminField label="Status">
          <AdminSelect name="status" defaultValue={member?.status ?? "PUBLISHED"}>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </AdminSelect>
        </AdminField>
      </AdminForm>
      {!isNew && member ? (
        <div className="mt-4 border-t border-[#46A0DC]/15 pt-4">
          <ConfirmButton onConfirm={handleDelete} redirectTo="/admin/team" />
        </div>
      ) : null}
    </div>
  );
}
