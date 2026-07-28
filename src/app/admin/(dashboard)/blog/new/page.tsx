import { PageHeader } from "@/components/admin";
import { BlogPostForm } from "@/components/admin/BlogPostForm";

export default function AdminBlogNewPage() {
  return (
    <div>
      <PageHeader title="New blog post" description="Create a new blog post" />
      <BlogPostForm />
    </div>
  );
}
