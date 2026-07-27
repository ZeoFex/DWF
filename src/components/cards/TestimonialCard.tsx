import Image from "next/image";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <blockquote
      className={cn(
        "flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm",
        className
      )}
    >
      <Quote
        className="h-8 w-8 text-[#46A0DC]/30"
        aria-hidden="true"
      />

      <p className="mt-4 flex-1 text-base leading-relaxed text-[#1E1E1E]/80">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <footer className="mt-6 flex items-center gap-3 border-t border-[#46A0DC]/10 pt-4">
        {testimonial.imageUrl && (
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
            <Image
              src={testimonial.imageUrl}
              alt=""
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
        )}
        <div>
          <cite className="not-italic font-semibold text-[#1E1E1E]">
            {testimonial.author}
          </cite>
          <p className="text-sm text-[#1E1E1E]/60">
            {testimonial.role}
            {testimonial.organization && ` · ${testimonial.organization}`}
          </p>
        </div>
      </footer>
    </blockquote>
  );
}
