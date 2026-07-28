import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { prisma } from "@/lib/db";

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminProjectEditPage({ params }: PageProps) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  return (
    <div>
      <PageHeader title="Edit project" description={project.title} />
      <ProjectForm project={project} />
    </div>
  );
}
