import { siteConfig } from "@/data/profile";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
  const items = getAllPosts()
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${siteConfig.url}/blog/${p.slug}/</link>
      <guid>${siteConfig.url}/blog/${p.slug}/</guid>
      <pubDate>${new Date(`${p.date}T09:00:00Z`).toUTCString()}</pubDate>
      <category>${esc(p.category)}</category>
      <description>${esc(p.description)}</description>
    </item>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>samibrahima.tech blog</title>
    <link>${siteConfig.url}/blog/</link>
    <atom:link href="${siteConfig.url}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>Architecture, tools, cloud, AI and notes from building real products.</description>
    <language>en</language>
${items}
  </channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
