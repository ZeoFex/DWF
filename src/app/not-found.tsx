import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#782882]">
            404
          </p>
          <h1 className="mt-2 font-serif text-4xl font-bold text-[#1E1E1E] sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-4 text-lg text-[#1E1E1E]/70">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
            have moved, or the link might be outdated.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/" size="lg">
              Back to Home
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Contact Us
            </Button>
          </div>
          <p className="mt-8 text-sm text-[#1E1E1E]/60">
            Looking for something specific? Try our{" "}
            <Link
              href="/programs"
              className="font-medium text-[#46A0DC] underline-offset-2 hover:underline"
            >
              programs
            </Link>
            ,{" "}
            <Link
              href="/blog"
              className="font-medium text-[#46A0DC] underline-offset-2 hover:underline"
            >
              blog
            </Link>
            , or{" "}
            <Link
              href="/donate"
              className="font-medium text-[#46A0DC] underline-offset-2 hover:underline"
            >
              donate
            </Link>{" "}
            page.
          </p>
        </div>
      </Container>
    </section>
  );
}
