"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { DataTable, PageHeader, StatusBadge, publishStatusVariant } from "@/components/admin";
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
            cell: (m) => (
              <button
                type="button"
                onClick={() => router.push(`/admin/team?edit=${m.id}`)}
                className="font-medium text-[#2563EB] hover:underline"
              >
                {m.name}
              </button>
            ),
          },
          { key: "role", header: "Role", cell: (m) => m.role },
          { key: "founder", header: "Founder", cell: (m) => (m.isFounder ? "Yes" : "—") },
          {
            key: "status",
            header: "Status",
            cell: (m) => <StatusBadge label={m.status} variant={publishStatusVariant(m.status)} />,
          },
        ]}
      />
    </div>
  );
}

export function TeamAdminClient({ members }: { members: TeamMember[] }) {
  return (
    <Suspense fallback={<div className="text-sm text-gray-500">Loading...</div>}>
      <TeamAdminInner members={members} />
    </Suspense>
  );
}
