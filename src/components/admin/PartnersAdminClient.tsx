"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { DataTable, PageHeader, StatusBadge, publishStatusVariant } from "@/components/admin";
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
            className="inline-flex items-center rounded-md bg-[#2563EB] px-4 py-2 text-sm font-medium text-white hover:bg-[#1D4ED8]"
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
            cell: (p) => (
              <button
                type="button"
                onClick={() => router.push(`/admin/partners?edit=${p.id}`)}
                className="font-medium text-[#2563EB] hover:underline"
              >
                {p.name}
              </button>
            ),
          },
          { key: "featured", header: "Featured", cell: (p) => (p.featured ? "Yes" : "—") },
          {
            key: "status",
            header: "Status",
            cell: (p) => <StatusBadge label={p.status} variant={publishStatusVariant(p.status)} />,
          },
        ]}
      />
    </div>
  );
}

export function PartnersAdminClient({ partners }: { partners: Partner[] }) {
  return (
    <Suspense fallback={<div className="text-sm text-gray-500">Loading...</div>}>
      <PartnersAdminInner partners={partners} />
    </Suspense>
  );
}
