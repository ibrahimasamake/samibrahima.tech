import { Rss } from "lucide-react";
import { CategoryNav } from "@/components/blog/category-nav";
import { PostCard } from "@/components/blog/post-card";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { getAllPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog: architecture, tools and notes from the field",
  description:
    "Practical posts on software architecture, cloud & DevOps, AI, tools and product building, from real projects like Sougba and RasteScan.",
  path: "/blog/",
});

export default function BlogPage() {
  const [first, ...rest] = getAllPosts();
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Blog", path: "/blog/" }]}
        eyebrow="Blog"
        title="Notes from the workshop."
        lead="Architecture ideas, tools worth knowing, things that broke (and how they got fixed), and news from what we are building. Short, practical, no buzzword soup."
      >
        <a href="/blog/rss.xml" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
          <Rss className="size-4" aria-hidden /> Follow with RSS
        </a>
      </PageHeader>
      <div className="container-page py-12 sm:py-16">
        <CategoryNav />
        <div className="mt-10 grid gap-6">
          {first && <PostCard post={first} featured headingLevel="h2" />}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <PostCard key={p.slug} post={p} headingLevel="h2" />
            ))}
          </div>
        </div>
      </div>
      <CtaBand title="Reading about it is fun. Building it is better." />
    </>
  );
}
