import { PageHeader } from "@/components/admin";
import { EventForm } from "@/components/admin/EventForm";

export default function AdminEventNewPage() {
  return (
    <div>
      <PageHeader title="New event" description="Create an event" />
      <EventForm />
    </div>
  );
}
