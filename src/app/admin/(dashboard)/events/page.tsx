import { format } from "date-fns";
import { AdminEditLink, DataTable, PageHeader, StatusBadge, publishStatusVariant } from "@/components/admin";
import { prisma } from "@/lib/db";

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({ orderBy: { startsAt: "desc" } });

  return (
    <div>
      <PageHeader title="Events" description="Manage events" actionHref="/admin/events/new" />
      <DataTable
        data={events}
        keyExtractor={(e) => e.id}
        columns={[
          {
            key: "title",
            header: "Title",
            cell: (e) => <span className="font-medium text-white">{e.title}</span>,
          },
          { key: "category", header: "Category", cell: (e) => e.category },
          {
            key: "starts",
            header: "Starts",
            cell: (e) => format(e.startsAt, "MMM d, yyyy HH:mm"),
          },
          {
            key: "status",
            header: "Status",
            cell: (e) => <StatusBadge label={e.status} variant={publishStatusVariant(e.status)} />,
          },
          {
            key: "actions",
            header: "",
            className: "text-right",
            cell: (e) => <AdminEditLink href={`/admin/events/${e.id}`} />,
          },
        ]}
      />
    </div>
  );
}
