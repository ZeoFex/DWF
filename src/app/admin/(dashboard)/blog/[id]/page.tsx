import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin";
import { BlogPostForm } from "@/components/admin/BlogPostForm";
import { prisma } from "@/lib/db";

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminBlogEditPage({ params }: PageProps) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div>
      <PageHeader title="Edit blog post" description={post.title} />
      <BlogPostForm post={post} />
    </div>
  );
}
