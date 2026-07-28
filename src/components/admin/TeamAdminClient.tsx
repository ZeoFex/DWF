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
import { TeamMemberForm } from "@/components/admin/TeamMemberForm";
import type { TeamMember } from "@/generated/prisma";

function TeamAdminInner({ members }: { members: TeamMember[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const isNew = searchParams.get("new") === "1";
  const editing = isNew ? undefined : members.find((m) => m.id === editId);

  return (
    <div>
      <PageHeader
        title="Team"
        description="Manage team members"
        action={
          <button
            type="button"
            onClick={() => router.push("/admin/team?new=1")}
            className="inline-flex items-center rounded-md bg-[#2563EB] px-4 py-2 text-sm font-medium text-white hover:bg-[#1D4ED8]"
          >
            New member
          </button>
        }
      />
      {(isNew || editing) && (
        <div className="mb-6">
          <TeamMemberForm member={editing} isNew={isNew} />
        </div>
      )}
      <DataTable
        data={members}
        keyExtractor={(m) => m.id}
        columns={[
          {
            key: "name",
            header: "Name",
            cell: (m) => <span className="font-medium text-white">{m.name}</span>,
          },
          { key: "role", header: "Role", cell: (m) => m.role },
          { key: "founder", header: "Founder", cell: (m) => (m.isFounder ? "Yes" : "—") },
          {
            key: "status",
            header: "Status",
            cell: (m) => <StatusBadge label={m.status} variant={publishStatusVariant(m.status)} />,
          },
          {
            key: "actions",
            header: "",
            className: "text-right",
            cell: (m) => (
              <AdminEditButton onClick={() => router.push(`/admin/team?edit=${m.id}`)} />
            ),
          },
        ]}
      />
    </div>
  );
}

export function TeamAdminClient({ members }: { members: TeamMember[] }) {
  return (
    <Suspense fallback={<div className="text-sm text-white/50">Loading...</div>}>
      <TeamAdminInner members={members} />
    </Suspense>
  );
}
