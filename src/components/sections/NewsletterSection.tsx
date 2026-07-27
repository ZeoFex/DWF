import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface NewsletterSectionProps {
  title?: string;
  description?: string;
  className?: string;
}

export function NewsletterSection({
  title = "Stay in the Loop",
  description = "Subscribe for program updates, event invitations, and impact stories delivered to your inbox.",
  className,
}: NewsletterSectionProps) {
  return (
    <section className={cn("py-16 sm:py-20", className)}>
      <Container>
        <div className="mx-auto max-w-2xl rounded-2xl bg-[#46A0DC]/5 px-6 py-12 text-center sm:px-12">
          <h2 className="font-serif text-3xl font-bold text-[#1E1E1E]">
            {title}
          </h2>
          <p className="mt-3 text-[#1E1E1E]/70">{description}</p>
          <NewsletterForm className="mt-8" />
        </div>
      </Container>
    </section>
  );
}
