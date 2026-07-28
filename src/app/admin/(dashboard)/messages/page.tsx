import { MessagesAdminClient } from "@/components/admin/MessagesAdminClient";
import { prisma } from "@/lib/db";

export default async function AdminMessagesPage() {
  const [contact, volunteer, partner] = await Promise.all([
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.volunteerApplication.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.partnerInquiry.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <MessagesAdminClient contact={contact} volunteer={volunteer} partner={partner} />
  );
}
