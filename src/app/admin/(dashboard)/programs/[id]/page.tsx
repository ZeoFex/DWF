import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin";
import { ProgramForm } from "@/components/admin/ProgramForm";
import { prisma } from "@/lib/db";

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminProgramEditPage({ params }: PageProps) {
  const { id } = await params;

  if (id === "new") {
    return (
      <div>
        <PageHeader title="New program" description="Create a program" />
        <ProgramForm isNew />
      </div>
    );
  }

  const program = await prisma.program.findUnique({ where: { id } });
  if (!program) notFound();

  return (
    <div>
      <PageHeader title="Edit program" description={program.title} />
      <ProgramForm program={program} />
    </div>
  );
}
