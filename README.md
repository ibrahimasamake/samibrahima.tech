# samibrahima.tech

Business website of Ibrahima Samake: founder-led software development (web, mobile,
custom software, e-commerce, cloud & DevOps, AI). Built with Next.js 16 (App Router),
TypeScript, Tailwind CSS 4, Motion and Lucide.

## Run locally

```bash
npm install
cp .env.example .env.local   # optional
npm run dev                  # http://localhost:3000
```

Checks before deploying:

```bash
npx tsc --noEmit
npm run lint
npm run build && npx serve out   # preview the static site
```

## Where things live

| What | Where |
| --- | --- |
| Name, email, socials, availability badge, nav | `data/profile.ts` |
| Services and their pages | `data/services.ts` |
| Case studies | `data/projects.ts` (images in `public/images/projects/`) |
| Experience, education, certificates | `data/experience.ts` |
| Skills (production vs project) | `data/skills.ts` |
| Process steps and "why work with us" | `data/process.ts` |
| Enquiry form options (types, budget ranges, timelines) | `data/enquiry.ts` |
| Form validation | `lib/validation.ts` |
| Form delivery (Web3Forms, or email app fallback) | `lib/submit-form.ts` |
| Blog loader (Markdown) and posts | `lib/blog.ts`, `content/blog/` |
| "What we're working on" board | `data/now.ts` |
| SEO helpers and JSON-LD | `lib/seo.ts` |
| Old URLs (redirect pages) | `public/sougba.html`, `public/blog/*.html`, `public/work/` … |
| Design tokens (colours, dark/light) | `app/globals.css` |

To add a case study, add an object to `projects` in `data/projects.ts` and put its
screenshots in `public/images/projects/<slug>/`. The page, card, sitemap entry and
structured data are generated from it.

Pages from the previous static site are kept in `public/` so old links keep working:
`/rastescan.html`, `/blog/gitops-solo-developer.html`, `/fr/…`, `/cv/…`.
`/sougba.html` and the old blog URL redirect to their new pages.

## Blog

Posts are Markdown files in `content/blog/`. The file name is the URL
(`content/blog/my-post.md` becomes `/blog/my-post/`). Front matter:

```yaml
---
title: "Post title"
description: "One or two sentences for cards and search results."
date: 2026-11-19
category: Architecture   # Architecture | Tools | Cloud & DevOps | AI | Product | News
tags: [kubernetes, gitops]
cover: /images/blog/my-cover.jpg   # optional
draft: true                        # optional, hides the post
---
```

Commit and push to `main`: the post, its category page, the RSS feed (`/blog/rss.xml`)
and the sitemap update automatically.

## Environment variables

| Name | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | no | Canonical origin, default `https://www.samibrahima.tech` |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | recommended | Sends form submissions by email through Web3Forms |

Without the Web3Forms key, submitting a form opens the visitor's email app with the
message ready to send. The site stores nothing.

To enable direct form delivery:
1. Go to <https://web3forms.com>, enter the inbox that should receive enquiries, and
   copy the access key from the email you receive.
2. In GitHub: repository Settings → Secrets and variables → Actions → Variables →
   New repository variable `WEB3FORMS_KEY` with that key.
3. Re-run the "Deploy to GitHub Pages" workflow (Actions tab), or push any commit.

## Deploy

The site is a static export (`out/`), built and published to GitHub Pages by
`.github/workflows/deploy.yml` on every push to `main`. Pages is set to
"GitHub Actions" as its source, with custom domain `www.samibrahima.tech`
(`samibrahima.tech` redirects to it).
