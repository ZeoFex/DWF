import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface CtaSectionProps {
  title?: string;
  description?: string;
  className?: string;
}

export function CtaSection({
  title = "Join Us in Empowering Girls",
  description = "Your support helps us deliver health education, mentorship, and opportunity to girls across Ghana. Donate, volunteer, or partner with us today.",
  className,
}: CtaSectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-[#46A0DC] py-16 sm:py-20",
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-10"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, #F0A070 0%, transparent 50%), radial-gradient(circle at 80% 50%, #782882 0%, transparent 50%)",
        }}
      />
      <Container className="relative text-center">
        <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
          {description}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/donate" variant="coral" size="lg">
            Donate Now
          </Button>
          <Button
            href="/volunteer"
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white/10"
          >
            Become a Volunteer
          </Button>
          <Button
            href="/partner"
            variant="ghost"
            size="lg"
            className="text-white hover:bg-white/10"
          >
            Partner With Us
          </Button>
        </div>
      </Container>
    </section>
  );
}
