# Tathastu Infra Website Handover Notes

Last updated: June 2, 2026

This file summarizes the current Tathastu Infra website so another developer or LLM can continue work without needing the full chat history.

## Project Overview

Tathastu Infra is a premium real estate, construction and interior design website for Lohegaon, Pune.

Primary website:
- `https://www.tathastuinfra.in`
- Vercel project: `tathastu-infra`
- GitHub repo: `https://github.com/furperfect2026/tathastu-visions`

Main goals already implemented:
- Luxury real-estate visual identity using navy, champagne gold and off-white.
- Fully responsive public website.
- Homepage with cinematic hero, service cards, projects, values and contact sections.
- Dedicated service pages for Realty, Construction and Interior.
- Construction detail pages for service cards.
- Contact form connected to backend email/leads.
- Admin panel for client-managed project photos, titles and descriptions.
- Supabase backend for admin auth, project table and project image uploads.
- Google Search Console setup and domain connection.

## Tech Stack

Frontend:
- React
- TanStack Router / TanStack Start
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- shadcn/ui style components
- Lucide React icons

Backend/services:
- Supabase for admin auth, project records and image storage.
- Resend for contact email notifications.
- Vercel for hosting/deployment.
- GoDaddy for domain DNS.

## Important Local Paths

Repo root:
`C:\Users\akank\Downloads\tathastu-vision-main\tathastu-visions-main`

Important folders:
- `src/routes` - route pages.
- `src/components` - shared UI/components.
- `src/lib/site-data.ts` - static fallback site/project data.
- `src/hooks/usePublicProjects.ts` - reads admin projects from Supabase with static fallback.
- `src/integrations/supabase/client.ts` - Supabase client.
- `supabase/project-admin-schema.sql` - SQL setup for admin project table/storage.
- `public` - static public assets.

## Main Routes

Public routes:
- `/`
- `/about`
- `/services`
- `/realty`
- `/construction`
- `/interior`
- `/projects`
- `/projects/construction`
- `/contact`

Admin route:
- `/admin/projects`

Construction detail routes:
- `/construction/commercial-construction`
- `/construction/residential-construction`
- `/construction/structural-work-rcc`
- `/construction/wtg-government-contracts`
- Other construction card slugs may exist through `service-detail-data`.

## Admin Panel

Admin URL:
- Local: `http://127.0.0.1:8080/admin/projects`
- Live: `https://www.tathastuinfra.in/admin/projects`

Purpose:
- Client can login and add/edit/delete project photos.
- Fields include project title, description, category, location, year, sort order, image and published status.
- Published projects appear on public portfolio sections.
- If Supabase data is empty or unavailable, the site falls back to static projects from `site-data.ts`.

Admin files:
- `src/routes/admin.projects.tsx`
- `src/hooks/usePublicProjects.ts`
- `supabase/project-admin-schema.sql`

Supabase table:
- `public.projects`

Supabase storage bucket:
- `project-images`

Auth:
- Supabase email/password auth.
- Current admin email used during setup: `rohit@tathastuinfra.in`
- Password is not stored in code and should be managed in Supabase Authentication.

Important: if login fails, first check that Vercel env vars point to the same Supabase project where the auth user exists.

## Supabase Setup

The correct Supabase project currently used by the latest setup is:
- Project URL: `https://mmwxluyvqdiqzrazjwky.supabase.co`
- Project ID: `mmwxluyvqdiqzrazjwky`

The old/local `.env` may still contain a previous Supabase project URL. If admin login fails locally or on Vercel, update the env vars to the correct project.

Required env vars:
- `VITE_SUPABASE_URL`
- `SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_PUBLISHABLE_KEY`

Use the Supabase anon/publishable key, not the service role key, for these public client env vars.

SQL setup:
Run the contents of `supabase/project-admin-schema.sql` inside Supabase SQL Editor. Do not paste the file path; paste the actual SQL contents.

## Vercel Setup

Production branch:
- `main`

Deployment behavior:
- Pushing to GitHub `main` triggers Vercel deployment.
- If env vars change, redeploy the latest deployment manually from Vercel.

Vercel env vars to keep:
- Supabase URL/key vars listed above.
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

Redeploy does not harm project data. It only rebuilds the app with current code/env vars.

## Domain and SEO

Main domain:
- `www.tathastuinfra.in`

Domain registrar:
- GoDaddy

Vercel DNS guidance used:
- Apex A record points to Vercel IP.
- `www` CNAME points to the Vercel DNS target.

Google Search Console:
- Site has been verified and indexed.
- Sitemap should be resubmitted after final deployments if routes change.

SEO already improved with:
- Tathastu Infra naming across site.
- Pune / Lohegaon keywords.
- Realty, construction and interior pages.
- FAQ/SEO style content sections.
- Service-focused internal linking.

For future SEO:
- Add real project images and descriptions.
- Add Google Business Profile posts.
- Request more Google reviews.
- Add useful localized content such as Lohegaon flats, 2BHK, rental support, plot guidance, home construction, RCC work, interior design in Pune.
- Avoid creating thin/duplicate pages only for keywords.

## Contact Form

Contact form behavior:
- Leads are saved/sent through existing backend contact logic.
- Email notification uses Resend.
- Recipient can be changed through env var `CONTACT_TO_EMAIL`.
- The contact email shown publicly is `tathastu.infra.info@gmail.com`.

Contact requirements adjusted:
- Email, enquiry type and message have been made optional in contact flow.
- Name and phone are the main lead fields.

## Design Decisions Already Made

Branding:
- Name should be `Tathastu Infra` where SEO or brand clarity matters.
- Logo includes TATHASTU with small `INFRA`.
- Palette: dark navy, champagne gold, off-white.

Navbar:
- Transparent/white text on homepage hero.
- Off-white background and dark text after scroll.
- Other pages start in scrolled state.
- Mobile navigation exists.

Homepage:
- Hero uses video/visual assets on desktop.
- Video disabled on mobile for performance.
- Hero buttons simplified to:
  - Get Free Quote
  - Explore Projects
- Social icons include YouTube, Instagram, LinkedIn.

Services:
- Three pillars: Realty, Construction, Interior.
- Cards are clickable.
- A simple row/strip after Three Pillars links to Realty, Construction and Interior.

Construction page:
- Packages moved to Construction page.
- Cost estimator added.
- Guarantee cards added/changed to vertical card carousel style.
- Cards route to separate construction detail pages.

Interior page:
- Packages moved to Interior page.
- Service cards/images are arranged for interior categories.

Projects:
- Static fallback projects exist.
- Admin-created projects can override/extend display.

Popup:
- Lead popup appears after a delay.
- If dismissed, it can reappear later.
- If submitted, it should not reappear.
- Mobile popup was fixed to fit within viewport.

## Recent Git Commits

Recent important commits:
- `b9123a9 Fix service card detail routing`
- `39a367a Add project admin panel`
- `654dde5 Add admin login footer link`
- `9824650 Show Supabase admin login errors`

If changes are made:
1. Run build.
2. Commit.
3. Push to `main`.
4. Vercel should deploy automatically.

## Build Notes

Normal build command:
```bash
npm run build
```

On Windows/Codex sandbox, this often fails with:
`Error: spawn EPERM`

If that happens, rerun build with elevated permission because esbuild needs to spawn correctly.

## Recommended Final QA Checklist

Before client handover:
- Test homepage on desktop and mobile.
- Test `/services`, `/realty`, `/construction`, `/interior`, `/projects`, `/contact`.
- Test construction detail card routes.
- Test admin login.
- Add one project from admin with image/title/description.
- Confirm that project appears publicly.
- Submit contact form and confirm email/lead arrives.
- Check Google Search Console after deployment.
- Confirm Vercel production URL and domain are working.

## Future Development Ideas

Useful next features:
- Better admin dashboard for homepage slides/images.
- Admin editable service content.
- Cost estimator lead capture.
- Chatbot or guided enquiry assistant.
- Blog/articles for SEO.
- Project filtering by category/location.
- Before/after galleries.
- Testimonials/reviews section connected to admin.
- Real client photo library replacing generated/placeholder images.

## Notes for Future LLM/Developer

Be careful with:
- Do not overwrite `.env` with secrets in Git.
- Do not expose Supabase service role key to frontend.
- Keep static fallback data so the website still works if Supabase is unavailable.
- Keep mobile layout priority high; client specifically cared about mobile.
- Prefer editing existing components and patterns rather than redesigning from scratch.
- Use `Tathastu Infra` for SEO and brand clarity.
- Keep luxury visual tone: minimal, premium, navy/champagne/off-white.
- After route additions, run build so TanStack route tree regenerates.

