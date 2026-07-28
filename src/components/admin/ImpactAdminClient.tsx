"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { AdminEditButton, DataTable, PageHeader } from "@/components/admin";
import { ImpactStatForm } from "@/components/admin/ImpactStatForm";
import type { ImpactStat } from "@/generated/prisma";

function ImpactAdminInner({ stats }: { stats: ImpactStat[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const isNew = searchParams.get("new") === "1";
  const editing = isNew ? undefined : stats.find((s) => s.id === editId);

  return (
    <div>
      <PageHeader
        title="Impact stats"
        description="Manage homepage impact counters"
        action={
          <button
            type="button"
            onClick={() => router.push("/admin/impact?new=1")}
            className="inline-flex items-center rounded-md bg-[#2563EB] px-4 py-2 text-sm font-medium text-white hover:bg-[#1D4ED8]"
          >
            New stat
          </button>
        }
      />
      {(isNew || editing) && (
        <div className="mb-6">
          <ImpactStatForm stat={editing} isNew={isNew} />
        </div>
      )}
      <DataTable
        data={stats}
        keyExtractor={(s) => s.id}
        columns={[
          {
            key: "label",
            header: "Label",
            cell: (s) => <span className="font-medium text-white">{s.label}</span>,
          },
          {
            key: "value",
            header: "Value",
            cell: (s) => `${s.prefix ?? ""}${s.value}${s.suffix ?? ""}`,
          },
          { key: "order", header: "Order", cell: (s) => s.sortOrder },
          {
            key: "actions",
            header: "",
            className: "text-right",
            cell: (s) => (
              <AdminEditButton onClick={() => router.push(`/admin/impact?edit=${s.id}`)} />
            ),
          },
        ]}
      />
    </div>
  );
}

export function ImpactAdminClient({ stats }: { stats: ImpactStat[] }) {
  return (
    <Suspense fallback={<div className="text-sm text-white/50">Loading...</div>}>
      <ImpactAdminInner stats={stats} />
    </Suspense>
  );
}
