import { PageHeader } from "@/components/admin";
import { ProgramForm } from "@/components/admin/ProgramForm";

export default function NewProgramPage() {
  return (
    <div>
      <PageHeader
        title="New program"
        description="Create a foundation program"
      />
      <ProgramForm />
    </div>
  );
}
