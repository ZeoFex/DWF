"use client";

import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import {
  DataTable,
  PageHeader,
  StatusBadge,
  inquiryStatusVariant,
} from "@/components/admin";
import { cn } from "@/lib/utils";
import type {
  ContactMessage,
  PartnerInquiry,
  VolunteerApplication,
} from "@/generated/prisma";

type Tab = "contact" | "volunteer" | "partner";

type MessagesAdminProps = {
  contact: ContactMessage[];
  volunteer: VolunteerApplication[];
  partner: PartnerInquiry[];
};

function MessagesAdminInner({ contact, volunteer, partner }: MessagesAdminProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = (searchParams.get("tab") as Tab) || "contact";
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function setTab(next: Tab) {
    router.push(`/admin/messages?tab=${next}`);
  }

  async function markReviewed(type: Tab, id: string) {
    setLoadingId(id);
    setError(null);
    try {
      const res = await fetch(`/api/admin/messages/${type}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "REVIEWED" }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Update failed");
        return;
      }
      router.refresh();
    } catch {
      setError("Update failed");
    } finally {
      setLoadingId(null);
    }
  }

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "contact", label: "Contact", count: contact.length },
    { id: "volunteer", label: "Volunteer", count: volunteer.length },
    { id: "partner", label: "Partner", count: partner.length },
  ];

  return (
    <div>
      <PageHeader title="Messages" description="Review inquiries and applications" />
      {error ? (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="mb-4 flex gap-1 border-b border-[#46A0DC]/15">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium",
              tab === t.id
                ? "border-b-2 border-[#46A0DC] text-[#46A0DC]"
                : "text-[#1E1E1E]/50 hover:text-[#1E1E1E]/80"
            )}
          >
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      {tab === "contact" && (
        <DataTable
          data={contact}
          keyExtractor={(m) => m.id}
          columns={[
            { key: "name", header: "Name", cell: (m) => m.fullName },
            { key: "email", header: "Email", cell: (m) => m.email },
            { key: "subject", header: "Subject", cell: (m) => m.subject },
            {
              key: "status",
              header: "Status",
              cell: (m) => (
                <StatusBadge label={m.status} variant={inquiryStatusVariant(m.status)} />
              ),
            },
            {
              key: "date",
              header: "Received",
              cell: (m) => format(m.createdAt, "MMM d, yyyy"),
            },
            {
              key: "actions",
              header: "",
              cell: (m) =>
                m.status === "NEW" ? (
                  <button
                    type="button"
                    disabled={loadingId === m.id}
                    onClick={() => markReviewed("contact", m.id)}
                    className="text-xs text-[#46A0DC] hover:underline disabled:opacity-50"
                  >
                    Mark reviewed
                  </button>
                ) : null,
            },
          ]}
        />
      )}

      {tab === "volunteer" && (
        <DataTable
          data={volunteer}
          keyExtractor={(m) => m.id}
          columns={[
            { key: "name", header: "Name", cell: (m) => m.fullName },
            { key: "email", header: "Email", cell: (m) => m.email },
            { key: "interest", header: "Interest", cell: (m) => m.areaOfInterest },
            {
              key: "status",
              header: "Status",
              cell: (m) => (
                <StatusBadge label={m.status} variant={inquiryStatusVariant(m.status)} />
              ),
            },
            {
              key: "date",
              header: "Received",
              cell: (m) => format(m.createdAt, "MMM d, yyyy"),
            },
            {
              key: "actions",
              header: "",
              cell: (m) =>
                m.status === "NEW" ? (
                  <button
                    type="button"
                    disabled={loadingId === m.id}
                    onClick={() => markReviewed("volunteer", m.id)}
                    className="text-xs text-[#46A0DC] hover:underline disabled:opacity-50"
                  >
                    Mark reviewed
                  </button>
                ) : null,
            },
          ]}
        />
      )}

      {tab === "partner" && (
        <DataTable
          data={partner}
          keyExtractor={(m) => m.id}
          columns={[
            { key: "org", header: "Organization", cell: (m) => m.organizationName },
            { key: "contact", header: "Contact", cell: (m) => m.contactPerson },
            { key: "email", header: "Email", cell: (m) => m.email },
            { key: "type", header: "Type", cell: (m) => m.partnershipType },
            {
              key: "status",
              header: "Status",
              cell: (m) => (
                <StatusBadge label={m.status} variant={inquiryStatusVariant(m.status)} />
              ),
            },
            {
              key: "date",
              header: "Received",
              cell: (m) => format(m.createdAt, "MMM d, yyyy"),
            },
            {
              key: "actions",
              header: "",
              cell: (m) =>
                m.status === "NEW" ? (
                  <button
                    type="button"
                    disabled={loadingId === m.id}
                    onClick={() => markReviewed("partner", m.id)}
                    className="text-xs text-[#46A0DC] hover:underline disabled:opacity-50"
                  >
                    Mark reviewed
                  </button>
                ) : null,
            },
          ]}
        />
      )}
    </div>
  );
}

export function MessagesAdminClient(props: MessagesAdminProps) {
  return (
    <Suspense fallback={<div className="text-sm text-[#1E1E1E]/50">Loading...</div>}>
      <MessagesAdminInner {...props} />
    </Suspense>
  );
}
