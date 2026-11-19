import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog/post-card";
import { BlogArt } from "@/components/visuals/blog-art";
import { JsonLd } from "@/components/layout/json-ld";
import { PageHeader } from "@/components/layout/page-header";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { profile, siteConfig } from "@/data/profile";
import { categorySlug, formatDate, getAllPosts, getPost } from "@/lib/blog";
import { graph, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}/`,
    type: "article",
    image: post.cover ? { url: post.cover, width: 1200, height: 630, alt: post.title } : undefined,
  });
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const all = getAllPosts();
  const related = all.filter((p) => p.slug !== post.slug && (p.category === post.category || p.tags.some((t) => post.tags.includes(t)))).slice(0, 3);
  const more = related.length ? related : all.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article>
      <PageHeader
        crumbs={[
          { name: "Blog", path: "/blog/" },
          { name: post.title, path: `/blog/${post.slug}/` },
        ]}
        eyebrow={post.category}
        title={post.title}
        lead={post.description}
      >
        <p className="text-sm text-subtle">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
        </p>
      </PageHeader>

      <div className="container-page grid gap-12 py-12 sm:py-16 lg:grid-cols-[1fr_15rem]">
        <div className="min-w-0">
          <div className="mb-12 overflow-hidden rounded-3xl border border-border">
            {post.cover ? (
              <Image src={post.cover} alt="" width={1200} height={675} priority className="max-h-[480px] w-full object-cover object-top" />
            ) : (
              <div className="aspect-[16/8]">
                <BlogArt category={post.category} seed={post.slug} />
              </div>
            )}
          </div>
          <div className="article" dangerouslySetInnerHTML={{ __html: post.html }} />

          {post.tags.length > 0 && (
            <ul className="mt-12 flex flex-wrap gap-2" aria-label="Tags">
              {post.tags.map((t) => (
                <li key={t}>
                  <Badge>#{t}</Badge>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-12 rounded-3xl border border-border bg-surface p-7 sm:p-9">
            <p className="text-xl font-semibold text-fg">Have a project where this would help?</p>
            <p className="mt-2 text-muted">Tell us what you are building. You get a straight answer, even if it is &quot;keep it simple&quot;.</p>
            <ButtonLink href="/start-a-project/" className="mt-5">
              Start your project <ArrowRight aria-hidden />
            </ButtonLink>
          </div>
        </div>

        {post.headings.length > 1 && (
          <aside className="hidden lg:block">
            <nav aria-label="On this page" className="sticky top-24">
              <p className="font-mono text-xs uppercase tracking-wider text-subtle">On this page</p>
              <ul className="mt-4 grid gap-2.5 border-l border-border pl-4 text-sm">
                {post.headings.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="text-muted hover:text-fg">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}
      </div>

      <section className="border-t border-border bg-surface/30" aria-labelledby="more-title">
        <div className="container-page py-16">
          <div className="flex items-end justify-between gap-4">
            <h2 id="more-title" className="text-2xl font-semibold text-fg">
              Keep reading
            </h2>
            <Link href="/blog/" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
              <ArrowLeft className="size-4" aria-hidden /> All posts
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {more.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
          <p className="mt-6 text-sm text-subtle">
            More in{" "}
            <Link href={`/blog/category/${categorySlug(post.category)}/`} className="text-muted underline-offset-4 hover:underline">
              {post.category}
            </Link>
            .
          </p>
        </div>
      </section>

      <JsonLd
        data={graph({
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.date,
          url: absoluteUrl(`/blog/${post.slug}/`),
          mainEntityOfPage: absoluteUrl(`/blog/${post.slug}/`),
          image: absoluteUrl(post.cover ?? "/og.png"),
          articleSection: post.category,
          keywords: post.tags.join(", "),
          inLanguage: "en",
          author: { "@type": "Person", name: profile.name, url: siteConfig.url },
          publisher: { "@id": `${siteConfig.url}/#business` },
        })}
      />
    </article>
  );
}
