import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { categorySlug, formatDate, type PostMeta } from "@/lib/blog";
import { cn } from "@/lib/utils";

export function PostCard({ post, featured, headingLevel = "h3" }: { post: PostMeta; featured?: boolean; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-border-strong",
        featured && post.cover && "md:grid md:grid-cols-[1.1fr_1fr]",
      )}
    >
      {post.cover && (
        <div className={cn("relative overflow-hidden bg-surface-2", featured ? "aspect-[16/9] md:aspect-auto md:min-h-80" : "aspect-[16/9]")}>
          <Image
            src={post.cover}
            alt=""
            fill
            sizes={featured ? "(min-width: 768px) 55vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <Link href={`/blog/category/${categorySlug(post.category)}/`} className="relative z-10 font-mono uppercase tracking-wider text-accent hover:underline">
            {post.category}
          </Link>
          <span className="text-subtle">
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
          </span>
        </div>
        <H className={cn("mt-3 font-semibold text-fg", featured ? "text-2xl sm:text-3xl" : "text-lg")}>
          <Link href={`/blog/${post.slug}/`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {post.title}
          </Link>
        </H>
        <p className="mt-3 flex-1 leading-relaxed text-muted">{post.description}</p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-fg">
          Read the post
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </span>
      </div>
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl ring-ring group-has-[a:focus-visible]:ring-2" />
    </article>
  );
}
