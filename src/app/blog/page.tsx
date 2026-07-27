import type { Metadata } from "next";
import { BlogExplorer } from "@/components/blog/BlogExplorer";
import { PageHero } from "@/components/ui/PageHero";
import { images } from "@/content/images";
import { getSiteUrl } from "@/lib/site-url";

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

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Blog & News"
        description="Stories from the field, program updates, and insights on girls' health, wellness, and opportunity in Ghana."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        backgroundImage={images.blog.default}
      />
      <BlogExplorer />
    </>
  );
}
