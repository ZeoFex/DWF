import { TestimonialsAdminClient } from "@/components/admin/TestimonialsAdminClient";
import { prisma } from "@/lib/db";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return <TestimonialsAdminClient testimonials={testimonials} />;
}
