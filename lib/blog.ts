import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";

/**
 * Blog posts are Markdown files in /content/blog. The file name is the URL:
 * content/blog/my-post.md -> /blog/my-post/
 *
 * Front matter:
 *   title: "…"            (required)
 *   description: "…"      (required, one or two sentences)
 *   date: 2026-11-19      (required)
 *   category: Architecture | Tools | Cloud & DevOps | AI | Product | News
 *   tags: [kubernetes, gitops]
 *   cover: /images/blog/…  (optional)
 *   draft: true            (optional, hides the post)
 */

export const categories = ["Architecture", "Tools", "Cloud & DevOps", "AI", "Product", "News"] as const;
export type Category = (typeof categories)[number];

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: Category;
  tags: string[];
  cover?: string;
  readingMinutes: number;
};

export type Post = PostMeta & { html: string; headings: { id: string; text: string }[] };

const DIR = path.join(process.cwd(), "content", "blog");

export function categorySlug(c: string) {
  return c.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function read(file: string): Post | null {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  if (data.draft) return null;
  if (!data.title || !data.description || !data.date) throw new Error(`Missing front matter in ${file}`);
  const category = (categories as readonly string[]).includes(data.category) ? (data.category as Category) : "News";

  const headings: Post["headings"] = [];
  const marked = new Marked({
    gfm: true,
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        const id = slugify(text);
        if (depth === 2) headings.push({ id, text: text.replace(/<[^>]+>/g, "") });
        return `<h${depth} id="${id}">${text}</h${depth}>\n`;
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const external = /^https?:\/\//.test(href);
        return `<a href="${href}"${title ? ` title="${title}"` : ""}${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${text}</a>`;
      },
    },
  });
  const html = marked.parse(content, { async: false }) as string;
  const words = content.split(/\s+/).filter(Boolean).length;

  return {
    slug: file.replace(/\.md$/, ""),
    title: String(data.title),
    description: String(data.description),
    date: new Date(data.date).toISOString().slice(0, 10),
    category,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    cover: data.cover ? String(data.cover) : undefined,
    readingMinutes: Math.max(1, Math.ceil(words / 200)),
    html,
    headings,
  };
}

let cache: Post[] | null = null;

export function getAllPosts(): Post[] {
  if (!cache) {
    cache = fs
      .readdirSync(DIR)
      .filter((f) => f.endsWith(".md"))
      .map(read)
      .filter((p): p is Post => p !== null)
      .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));
  }
  return cache;
}

export function getPost(slug: string) {
  return getAllPosts().find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
