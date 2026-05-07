
# Tathastu — Visually Stunning Real Estate Website

A cinematic, light-palette site for Tathastu Realty, Construction & Interior Design with a hybrid 3D experience: a real React Three Fiber building scene in the hero, plus rich Framer Motion scroll/parallax/tilt effects throughout.

## Design direction

**Ivory + Gold + Charcoal** (matches your reference).

- Background: warm ivory `#FBF8F1`
- Primary (gold): `#C9A24B`
- Primary glow: `#E6C46A`
- Foreground: deep charcoal `#1A1A1A`
- Muted: warm stone `#F0EAD9`
- Subtle radial gold glow + grain texture on hero sections

Typography:
- Display: **Fraunces** (editorial serif)
- Body: **Manrope**
- Eyebrow labels: tracked-uppercase Manrope `0.18em`

Motion language:
- Framer Motion scroll-linked parallax, scale-on-enter, mask reveals
- Magnetic buttons + cursor-follow gold halo
- Letter-by-letter hero reveal
- Lenis smooth scroll
- Honor `prefers-reduced-motion`

## Pages (TanStack file routes)

```
src/routes/
  __root.tsx     -> shell + nav + footer + Lenis
  index.tsx      -> Home
  about.tsx      -> About
  services.tsx   -> Services (3 pillars detailed)
  projects.tsx   -> Projects gallery
  contact.tsx    -> Contact (form -> Lovable Cloud)
```

Each route gets unique `head()` meta (title, description, og:*).

## Home page sections

1. **Hero** — full-bleed split: oversized serif headline "Building Dreams. Creating Reality." with letter-stagger reveal + gold underline draw; right side a **React Three Fiber** scene rendering a stylized modern apartment building on a turntable with sunset lighting. Drag to rotate, autoRotate when idle. Magnetic "Get In Touch" CTA.
2. **Three Pillars cards (Realty / Construction / Interior Design)** — each card has an **auto-rotating image slideshow** behind the content:
   - 4–5 images per pillar, cross-fade every ~3.5s with subtle Ken Burns zoom/pan
   - Pauses on hover (so users can read), resumes on leave
   - Tiny progress dots at the bottom of each card; clicking a dot jumps to that image
   - Card itself tilts on hover (3D perspective), gold icon lifts
   - All slideshows desync (different start indexes) so the row feels alive, not synchronized
   - Respects `prefers-reduced-motion` → static first image only
3. **Stats strip** — animated count-up on scroll: 10+ Years, 50+ Projects, 30+ Clients, 5 Awards.
4. **Featured Projects marquee** — scroll-linked horizontal gallery with parallax captions.
5. **Vision quote** — masked gradient reveal editorial pull-quote.
6. **CTA band** — gold gradient with moving noise, "Let's design your next space."

## About page

- Founder section (Rohit) with parallax portrait frame
- Origin story timeline with scroll-progress gold line
- Leadership grid (incl. Maan Singh — Sales Mgmt, Interior)
- Values trio: Trust, Luxury, Craftsmanship

## Services page

Three deep sections (Realty, Construction, Interior Design), each:
- Sticky left title, scrolling right content
- Same auto-rotating image slideshow component as the home cards (larger, 6 images each)
- Capability list with staggered reveal

## Projects page

- Filter chips (All / Realty / Construction / Interior)
- Masonry grid with `layout` animations on filter change
- Click card → modal with image carousel + project details

## Contact page

- Two-column: form left, info right (Lohegaon HQ, social, email)
- Fields: name, email, phone, interest (select), message
- Submits to `createServerFn` → inserts into `contact_inquiries`
- Toast success, Zod inline validation

## Backend (Lovable Cloud)

Enable Lovable Cloud, then create:

Table `contact_inquiries`
- `id uuid pk default gen_random_uuid()`
- `name text not null`
- `email text not null`
- `phone text`
- `interest text`
- `message text not null`
- `created_at timestamptz default now()`

RLS enabled. Public `INSERT` only; no public SELECT. Owner reviews via Cloud dashboard.

Server function `submitInquiry` in `src/lib/contact.functions.ts` validates with Zod and inserts via `supabaseAdmin`.

## Technical details

- Deps: `three`, `@react-three/fiber`, `@react-three/drei`, `framer-motion`, `lenis`, `zod`
- Fonts via Google Fonts in `__root.tsx` head: Fraunces, Manrope
- Tokens added to `src/styles.css` (oklch): ivory/gold/charcoal + `--gradient-gold`, `--shadow-luxe`, `--shadow-gold-glow`
- Reusable `<AutoSlideshow images={[]} interval={3500} />` component used by pillar cards and Services page; uses Framer `AnimatePresence` cross-fade + Ken Burns transform; pauses on hover and when tab hidden (`document.visibilitychange`)
- 3D scene built from primitives (no external GLB needed); `<Suspense>` skeleton; replaced with static image when reduced-motion
- All shadcn components themed via tokens
- Images: generate via Lovable AI — hero building, ~5 per pillar (15 total), 6 project images, founder portrait
- SEO: per-route head meta, semantic landmarks, alt text, `Organization` JSON-LD on home

## Out of scope this pass

- Auth / admin dashboard for inquiries (use Cloud table editor)
- Real GLB apartment models (procedural geometry; can swap later)
- Blog / multilingual

Ready to build when you approve.
