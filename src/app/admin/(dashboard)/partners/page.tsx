import { PartnersAdminClient } from "@/components/admin/PartnersAdminClient";
import { prisma } from "@/lib/db";

export default async function AdminPartnersPage() {
  const partners = await prisma.partner.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });

  return <PartnersAdminClient partners={partners} />;
}
