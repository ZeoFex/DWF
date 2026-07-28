"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  AdminEditButton,
  DataTable,
  PageHeader,
  StatusBadge,
  publishStatusVariant,
} from "@/components/admin";
import { PartnerForm } from "@/components/admin/PartnerForm";
import type { Partner } from "@/generated/prisma";

function PartnersAdminInner({ partners }: { partners: Partner[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const isNew = searchParams.get("new") === "1";
  const editing = isNew ? undefined : partners.find((p) => p.id === editId);

  return (
    <div>
      <PageHeader
        title="Partners"
        description="Manage partner organizations"
        action={
          <button
            type="button"
            onClick={() => router.push("/admin/partners?new=1")}
            className="inline-flex items-center rounded-md bg-[#E85A28] px-4 py-2 text-sm font-medium text-white hover:bg-[#D14E20]"
          >
            New partner
          </button>
        }
      />
      {(isNew || editing) && (
        <div className="mb-6">
          <PartnerForm partner={editing} isNew={isNew} />
        </div>
      )}
      <DataTable
        data={partners}
        keyExtractor={(p) => p.id}
        columns={[
          {
            key: "name",
            header: "Name",
            cell: (p) => <span className="font-medium text-[#1E1E1E]">{p.name}</span>,
          },
          { key: "featured", header: "Featured", cell: (p) => (p.featured ? "Yes" : "—") },
          {
            key: "status",
            header: "Status",
            cell: (p) => <StatusBadge label={p.status} variant={publishStatusVariant(p.status)} />,
          },
          {
            key: "actions",
            header: "",
            className: "text-right",
            cell: (p) => (
              <AdminEditButton onClick={() => router.push(`/admin/partners?edit=${p.id}`)} />
            ),
          },
        ]}
      />
    </div>
  );
}

export function PartnersAdminClient({ partners }: { partners: Partner[] }) {
  return (
    <Suspense fallback={<div className="text-sm text-[#1E1E1E]/50">Loading...</div>}>
      <PartnersAdminInner partners={partners} />
    </Suspense>
  );
}
