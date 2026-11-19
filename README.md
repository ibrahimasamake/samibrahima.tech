# samibrahima.tech

Business website of Ibrahima Samake: founder-led software development (web, mobile,
custom software, e-commerce, cloud & DevOps, AI). Built with Next.js 16 (App Router),
TypeScript, Tailwind CSS 4, Motion and Lucide.

## Run locally

```bash
npm install
cp .env.example .env.local   # optional: without email keys, form submissions are printed to the terminal
npm run dev                  # http://localhost:3000
```

Checks before deploying:

```bash
npx tsc --noEmit
npm run lint
npm run build && npm start
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
| Email sending (Resend HTTP API) | `lib/email.ts` |
| Spam protection (honeypot, timing, rate limit) | `lib/spam.ts` |
| Server actions for both forms | `app/actions.ts` |
| SEO helpers and JSON-LD | `lib/seo.ts` |
| Old URLs (French pages, 404 for unknown slugs) | `proxy.ts`, `next.config.ts` |
| Design tokens (colours, dark/light) | `app/globals.css` |

To add a case study, add an object to `projects` in `data/projects.ts` and put its
screenshots in `public/images/projects/<slug>/`. The page, card, sitemap entry and
structured data are generated from it.

Pages from the previous static site are kept in `public/` so old links keep working:
`/rastescan.html`, `/blog/gitops-solo-developer.html`, `/fr/…`, `/cv/…`.
`/sougba.html` redirects to `/projects/sougba`.

## Environment variables

| Name | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | recommended | Canonical origin, default `https://www.samibrahima.tech` |
| `RESEND_API_KEY` | yes, in production | Sends form submissions. Server-only. |
| `CONTACT_TO_EMAIL` | yes, in production | Inbox that receives enquiries |
| `CONTACT_FROM_EMAIL` | yes, in production | Sender on a domain verified in Resend |

Without the three email variables in production, the forms show a clear error with
the email address to write to instead. Nothing is stored on the server.

## Deploy (Vercel)

The site needs a Node.js host for the form server actions, so GitHub Pages (static
only) can no longer serve it.

1. Push this repository to GitHub and import it at <https://vercel.com/new>
   (framework preset: Next.js, no build settings to change).
2. In Project → Settings → Environment Variables, add the four variables above for
   Production (and Preview if you want forms to work on preview URLs).
3. In Resend, add the domain `samibrahima.tech`, create the DNS records it shows
   (SPF/DKIM) in Cloudflare, and wait until it reads "Verified".
4. In Vercel → Settings → Domains, add `www.samibrahima.tech` (primary) and
   `samibrahima.tech`, and set the apex to redirect (308) to `www`.
5. In Cloudflare DNS, replace the GitHub Pages records with the values Vercel shows
   (typically `www` → CNAME `cname.vercel-dns.com`, `@` → A `76.76.21.21`),
   set to "DNS only" (grey cloud).
6. In the GitHub repository settings, turn off GitHub Pages so the two hosts don't
   compete for the domain.
7. Verify: `https://samibrahima.tech` redirects to `https://www.samibrahima.tech`,
   HTTPS is valid, `/sitemap.xml` and `/robots.txt` load, and a test enquiry arrives.
8. In Google Search Console, add the `www` property and submit `/sitemap.xml`.
