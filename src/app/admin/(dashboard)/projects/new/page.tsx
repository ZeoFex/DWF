import { PageHeader } from "@/components/admin";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default function AdminProjectNewPage() {
  return (
    <div>
      <PageHeader title="New project" description="Create a project" />
      <ProjectForm />
    </div>
  );
}
