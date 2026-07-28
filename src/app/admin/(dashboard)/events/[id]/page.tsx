import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin";
import { EventForm } from "@/components/admin/EventForm";
import { prisma } from "@/lib/db";

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminEventEditPage({ params }: PageProps) {
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) notFound();

  return (
    <div>
      <PageHeader title="Edit event" description={event.title} />
      <EventForm event={event} />
    </div>
  );
}
