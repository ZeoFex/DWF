"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AdminField,
  AdminForm,
  AdminInput,
  AdminTextarea,
  ConfirmButton,
} from "@/components/admin";
import type { ImpactStat } from "@/generated/prisma";

type ImpactStatFormProps = { stat?: ImpactStat; isNew?: boolean };

export function ImpactStatForm({ stat, isNew = !stat }: ImpactStatFormProps) {
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
      label: form.get("label"),
      value: Number(form.get("value")),
      prefix: form.get("prefix") || null,
      suffix: form.get("suffix") || null,
      note: form.get("note") || null,
      sortOrder: Number(form.get("sortOrder") ?? 0),
    };

    try {
      const url = isNew ? "/api/admin/impact/stats" : `/api/admin/impact/stats/${stat!.id}`;
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
      router.push("/admin/impact");
      router.refresh();
    } catch {
      setError("Unable to save.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!stat) return;
    const res = await fetch(`/api/admin/impact/stats/${stat.id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Delete failed");
  }

  return (
    <div className="max-w-lg rounded-lg border border-gray-200 bg-white p-6">
      <AdminForm onSubmit={handleSubmit} loading={loading} error={error} success={success}>
        <AdminField label="Label" required>
          <AdminInput name="label" defaultValue={stat?.label} required />
        </AdminField>
        <AdminField label="Value" required>
          <AdminInput name="value" type="number" step="any" defaultValue={stat?.value ?? 0} required />
        </AdminField>
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Prefix">
            <AdminInput name="prefix" defaultValue={stat?.prefix ?? ""} />
          </AdminField>
          <AdminField label="Suffix">
            <AdminInput name="suffix" defaultValue={stat?.suffix ?? ""} />
          </AdminField>
        </div>
        <AdminField label="Note">
          <AdminTextarea name="note" defaultValue={stat?.note ?? ""} />
        </AdminField>
        <AdminField label="Sort order">
          <AdminInput name="sortOrder" type="number" defaultValue={stat?.sortOrder ?? 0} />
        </AdminField>
      </AdminForm>
      {!isNew && stat ? (
        <div className="mt-4 border-t border-gray-200 pt-4">
          <ConfirmButton onConfirm={handleDelete} redirectTo="/admin/impact" />
        </div>
      ) : null}
    </div>
  );
}
