import { format } from "date-fns";
import {
  DataTable,
  PageHeader,
  StatusBadge,
  paymentStatusVariant,
} from "@/components/admin";
import { prisma } from "@/lib/db";

export default async function AdminDonationsPage() {
  const donations = await prisma.donation.findMany({
    orderBy: { createdAt: "desc" },
    include: { project: { select: { title: true } } },
  });

  return (
    <div>
      <PageHeader
        title="Donations"
        description="Read-only list of donations"
      />
      <DataTable
        data={donations}
        keyExtractor={(d) => d.id}
        columns={[
          {
            key: "reference",
            header: "Reference",
            cell: (d) => <span className="font-mono text-xs">{d.reference}</span>,
          },
          {
            key: "donor",
            header: "Donor",
            cell: (d) => (d.isAnonymous ? "Anonymous" : d.donorName ?? "—"),
          },
          {
            key: "amount",
            header: "Amount",
            cell: (d) => `${d.currency} ${d.amount.toLocaleString()}`,
          },
          { key: "type", header: "Type", cell: (d) => d.donationType.replace(/_/g, " ") },
          {
            key: "status",
            header: "Status",
            cell: (d) => (
              <StatusBadge label={d.status} variant={paymentStatusVariant(d.status)} />
            ),
          },
          {
            key: "project",
            header: "Project",
            cell: (d) => d.project?.title ?? "—",
          },
          {
            key: "date",
            header: "Date",
            cell: (d) => format(d.createdAt, "MMM d, yyyy HH:mm"),
          },
        ]}
      />
    </div>
  );
}
