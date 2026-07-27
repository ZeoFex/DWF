"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getFeaturedTestimonials } from "@/content";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

interface TestimonialsSectionProps {
  title?: string;
  description?: string;
  className?: string;
  enableCarousel?: boolean;
}

export function TestimonialsSection({
  title = "Stories From Our Community",
  description = "Hear from students, educators, volunteers, and partners who are part of our mission.",
  className,
  enableCarousel = false,
}: TestimonialsSectionProps) {
  const testimonials = getFeaturedTestimonials(6);
  const [activeIndex, setActiveIndex] = useState(0);

  const goPrev = () =>
    setActiveIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const goNext = () =>
    setActiveIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  return (
    <section className={cn("bg-[#F5FAFE] py-16 sm:py-20", className)}>
      <Container>
        <SectionHeading
          title={title}
          description={description}
          align="center"
          className="mb-12"
        />

        {enableCarousel ? (
          <div className="relative">
            <div
              className="overflow-hidden"
              aria-live="polite"
              aria-atomic="true"
            >
              <TestimonialCard testimonial={testimonials[activeIndex]} />
            </div>
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={goPrev}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-sm text-[#1E1E1E]/60">
                {activeIndex + 1} of {testimonials.length}
              </span>
              <button
                type="button"
                onClick={goNext}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <li key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
