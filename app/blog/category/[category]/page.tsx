import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryNav } from "@/components/blog/category-nav";
import { PostCard } from "@/components/blog/post-card";
import { PageHeader } from "@/components/layout/page-header";
import { categories, categorySlug, getAllPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  const used = new Set(getAllPosts().map((p) => p.category));
  return categories.filter((c) => used.has(c)).map((c) => ({ category: categorySlug(c) }));
}

function find(slug: string) {
  return categories.find((c) => categorySlug(c) === slug);
}

export async function generateMetadata({ params }: PageProps<"/blog/category/[category]">): Promise<Metadata> {
  const c = find((await params).category);
  if (!c) return {};
  return pageMetadata({
    title: `${c} posts`,
    description: `Blog posts about ${c.toLowerCase()}: practical notes from building and running real software products.`,
    path: `/blog/category/${categorySlug(c)}/`,
  });
}

export default async function CategoryPage({ params }: PageProps<"/blog/category/[category]">) {
  const c = find((await params).category);
  if (!c) notFound();
  const posts = getAllPosts().filter((p) => p.category === c);
  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Blog", path: "/blog/" },
          { name: c, path: `/blog/category/${categorySlug(c)}/` },
        ]}
        eyebrow="Blog"
        title={c}
      />
      <div className="container-page py-12 sm:py-16">
        <CategoryNav active={c} />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} headingLevel="h2" />
          ))}
        </div>
      </div>
    </>
  );
}
