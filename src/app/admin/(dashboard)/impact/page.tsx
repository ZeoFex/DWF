import { ImpactAdminClient } from "@/components/admin/ImpactAdminClient";
import { prisma } from "@/lib/db";

export default async function AdminImpactPage() {
  const stats = await prisma.impactStat.findMany({ orderBy: { sortOrder: "asc" } });

  return <ImpactAdminClient stats={stats} />;
}
