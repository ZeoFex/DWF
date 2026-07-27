import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, User } from "lucide-react";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { BlogCard } from "@/components/cards/BlogCard";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  blogPosts,
  getBlogPostBySlug,
  getRelatedPosts,
} from "@/content";
import { getArticleSchema } from "@/lib/seo-schemas";
import { getSiteUrl } from "@/lib/site-url";
import type { BlogCategory } from "@/types";

const categoryLabels: Record<BlogCategory, string> = {
  news: "News",
  programs: "Programs",
  impact: "Impact",
  events: "Events",
  resources: "Resources",
};

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function renderParagraph(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Article Not Found" };
  }

  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [{ url: post.imageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/blog/${post.slug}`;
  const relatedPosts = getRelatedPosts(post.slug, 3);

  return (
    <>
      <JsonLd data={getArticleSchema(post, url)} />
      <PageHero
        title={post.title}
        description={post.excerpt}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
        backgroundImage={post.imageUrl}
      />

      <article className="py-12 sm:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#1E1E1E]/70">
              <span className="rounded-full bg-[#46A0DC] px-3 py-1 text-xs font-semibold text-white">
                {categoryLabels[post.category]}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-[#46A0DC]" aria-hidden="true" />
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4 text-[#46A0DC]" aria-hidden="true" />
                {post.author}
              </span>
            </div>

            {post.isIllustrative && (
              <p className="mt-6 rounded-xl bg-[#F0A070]/15 px-4 py-3 text-sm text-[#1E1E1E]/80">
                This article contains illustrative placeholder content for
                website development. Verified facts and figures will be published
                before public launch.
              </p>
            )}

            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
              <Image
                src={post.imageUrl}
                alt=""
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>

            <div className="prose-custom mt-10 space-y-6 text-base leading-relaxed text-[#1E1E1E]/85">
              {post.content.map((paragraph, index) => (
                <p key={index}>{renderParagraph(paragraph)}</p>
              ))}
            </div>

            <div className="mt-10 border-t border-[#46A0DC]/10 pt-10">
              <ShareButtons url={url} title={post.title} />
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href="/blog" variant="outline">
                Back to all articles
              </Button>
              <Button href="/donate" variant="coral">
                Support our work
              </Button>
            </div>
          </div>

          {relatedPosts.length > 0 && (
            <div className="mt-16 border-t border-[#46A0DC]/10 pt-16">
              <SectionHeading
                title="Related Articles"
                description="More stories from the same topic area."
              />
              <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((related) => (
                  <li key={related.slug}>
                    <BlogCard post={related} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </article>

      <NewsletterSection
        title="Never Miss an Update"
        description="Subscribe for new articles, program news, and event invitations from Dr. Winnie's Foundation."
      />
    </>
  );
}
