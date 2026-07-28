import type { Metadata } from "next";
import { BlogExplorer } from "@/components/blog/BlogExplorer";
import { PageHero } from "@/components/ui/PageHero";
import { blogPosts as staticPosts, images } from "@/content";
import { getPublishedBlogPosts } from "@/lib/cms";
import { getSiteUrl } from "@/lib/site-url";
import type { BlogCategory, BlogPost } from "@/types";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Blog & News",
  description:
    "Read stories, program updates, impact highlights, and news from Dr. Winnie's Foundation — empowering girls through health, wellness, and opportunity in Ghana.",
  openGraph: {
    title: "Blog & News | Dr. Winnie's Foundation",
    description:
      "Featured articles, program updates, and impact stories from Dr. Winnie's Foundation.",
    url: `${siteUrl}/blog`,
    images: [{ url: images.blog.default, width: 1200, height: 630 }],
  },
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
};

function mapDbPosts(
  posts: Awaited<ReturnType<typeof getPublishedBlogPosts>>
): BlogPost[] {
  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content.split("\n\n").filter(Boolean),
    category: post.category as BlogCategory,
    publishedAt: (post.publishedAt ?? post.createdAt).toISOString().slice(0, 10),
    author: post.author,
    imageUrl: post.imageUrl ?? images.blog.default,
    featured: post.featured,
    isIllustrative: true as const,
  }));
}

export default async function BlogPage() {
  const dbPosts = await getPublishedBlogPosts();
  const posts = dbPosts.length > 0 ? mapDbPosts(dbPosts) : staticPosts;

  return (
    <>
      <PageHero
        title="Blog & News"
        description="Stories from the field, program updates, and insights on girls' health, wellness, and opportunity in Ghana."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        backgroundImage={images.blog.default}
      />
      <BlogExplorer posts={posts} />
    </>
  );
}
