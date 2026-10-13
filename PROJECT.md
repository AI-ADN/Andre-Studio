# PROJECT.md: André Studio

Working specification derived from `CLIENT.md` (user-owned brief), the client's current Canva site (https://andrestudiomx.com/info, approved copy source) and decisions confirmed in chat. `CLIENT.md` wins on business/brand facts.

## 1. Business

- **Name:** André Studio (owner: Andrea Carolina Chávez, clients call her "Andy" / "Andre").
- **Category:** Beauty studio (micropigmentation, brows & lashes, facials, facial waxing, pigment/tattoo removal).
- **Location:** Blvd. Puerta del Sol 504, Colinas de San Jerónimo, 64630 Monterrey, N.L.
- **Phone / WhatsApp:** +52 81 2353 1945. **Instagram:** https://www.instagram.com/andre.studiomx/
- **Email:** pending. **Opening hours:** not published; approved copy only says "Horarios flexibles" and appointments are required.
- **Audience:** Women in Monterrey looking for a beauty studio; want to find prices, services and book easily.

## 2. Goals and conversion

- **Primary goal:** Get quotes/booking requests and messages from clients.
- **Primary CTA:** "Haz tu reservación" / "Book your appointment".
- **CTA destination (Phase 1):** Booking form that composes a prefilled WhatsApp message to +52 81 2353 1945, plus direct WhatsApp links.
- **Journey:** discover services → check details/prices → select services → send booking request.
- **Success criteria (client):** receive client messages, bookings in Google Calendar, bot answering messages (Calendar + bot are Phase 2).

## 3. Scope and phases (confirmed 2026-10-12)

### Phase 1 (current)
- Bilingual (ES default, EN) single landing page.
- Service catalog with category filters and animations; services can be added to the booking request.
- Booking request form: name, phone, email, services (+ optional preferred date/time and notes). Submitting opens WhatsApp with the request prefilled. It does **not** claim a confirmed appointment.
- Deposit policy shown ($400 MXN advance, rest paid on appointment day in cash or transfer). **Bank details are NOT published**; they are sent via WhatsApp when the appointment is confirmed.
- Testimonials from real Google reviews (references/comments_1.png, comments_2.png and reviews already published on the current site).
- SEO (metadata, hreflang, sitemap, robots, BeautySalon JSON-LD), analytics event hooks (GA optional via env).

### Phase 2 (pending, not started)
- AI chatbot that answers FAQs and books automatically, creates the event in the owner's Google Calendar, and sends confirmation + next steps to client and owner.
- Requires: backend (Next.js route handlers or Node service), Google Calendar API (OAuth or service account on the owner's calendar), WhatsApp Business API or Twilio, LLM provider key, hosting, authoritative availability rules (service durations, working hours, buffers). None of these exist yet.
- `src/lib/booking` exposes a `BookingChannel` interface so the WhatsApp channel can be swapped for a Calendar-backed one without touching UI.

## 4. Brand and visual direction

- **Personality:** girly, minimal, feminine, happy, self-care. Light theme only. Avoid darkness and generic commercial templates.
- **References:**
  - `references/template.webp`: overall page rhythm (editorial, cream paper texture, arch frames, sparkles, rounded pill nav).
  - `references/main_hero.webp`: hero composition (split: copy left, portrait right, soft shadows).
  - `references/art_style.png`, `art_style_2.png`: the studio's Instagram language: spiral notebook, polaroids, binder clips, torn notebook paper, grid paper notes, washi tape, handwritten notes, italic serif.
  - `references/service_#.png`: all services and prices (must all be present).
- **Design read:** premium local beauty studio landing for women in Monterrey, girly-minimal scrapbook/paper language on cream + blush, Next.js + Tailwind v4 + Motion with natural scroll reveals. Dials: variance 7, motion 6, density 3.

### Colors (client-mandated, adjusted only for contrast)
| Token | Hex | Use |
| --- | --- | --- |
| `cream` | #FEFAED | Page background |
| `blush` | #F0DFE9 | Secondary surfaces, CTA fill |
| `ink` | #191919 | Titles, CTA text |
| `slate` | #4B5358 | Body text |
| `rose` (proposed primary) | #8F4766 | Prices, links, accents, focus rings (8:1 on cream) |
| `paper` | #FFFDF7 | Cards / notebook paper |

### Typography (free fonts, self-hosted via `next/font`)
- **Cormorant Garamond** (display, italic emphasis): matches the italic serif used in the studio's own Instagram posts (art_style_2).
- **Figtree** (body/UI): friendly geometric sans, good Spanish legibility.
- **Nanum Pen Script** (short handwritten notes only): echoes the handwritten notes in art_style.png. Decorative, never for essential info.

## 5. Content rules

- Prices and service descriptions come from `references/service_#.png` and the current site. Never invent prices, durations or claims.
- Approved claims (from current site): organic FDA-approved pigments free of lead and heavy metals; single-use disposable material; COFEPRIS permit and health card; 7+ years experience; "+300 testimonios reales"; personalized attention; flexible schedule; post-treatment follow-up.
- Testimonials: real Google reviews only, trimmed to ≤3 lines, attributed by name + "Reseña de Google".
- English copy is a faithful translation of approved Spanish copy.

## 6. Assets

- `public/images/owner-cutout.webp`: owner_picture.jpg with background removed locally (macOS Vision); face untouched.
- Real photos from the current site (client work with "André Ch" watermark, studio interior) in `public/images/real/`.
- AI-generated (Higgsfield, GPT Image 2.5 low quality) for treatments/still lifes that on the current site used Canva stock: `public/images/gen/`. Never used to depict micropigmentation "results".
- **Usage rights: pending client confirmation** for all photos, including whether the real photos may be reused.

## 7. Technical

- Next.js 16 (App Router, Cache Components on), React 19, TypeScript, Tailwind v4 (turbopack loader), Motion (`motion/react`), Phosphor icons, Vitest.
- Routes: `/es`, `/en` under `app/[lang]`; `proxy.ts` redirects `/` by `Accept-Language` (default `es`).
- Business data in `src/config/business.ts`; services in `src/content/services.ts`; UI strings in `src/content/dictionaries/`.
- `agentRules: false` in `next.config.ts` so `next dev` never rewrites the studio's `AGENTS.md`. Next 16 docs live in `node_modules/next/dist/docs/`; read them before using unfamiliar APIs.
- Environment: `NEXT_PUBLIC_SITE_URL` (defaults to https://andrestudiomx.com) and optional `NEXT_PUBLIC_GA_ID`; see `.env.example`.
- Scripts: `npm run dev`, `npm run build`, `npm test`, `npm run typecheck`, `npm run lint`.
- Hosting/domain: undecided (Vercel recommended because Phase 2 needs server routes).

## 8. Open questions

- Opening hours to publish (or keep "con cita / horarios flexibles").
- Public email address.
- Usage rights for real photos and confirmation of AI images.
- Service durations (needed for Phase 2 calendar availability).
- Is the photo with red hair on the current site also the owner? (could be used in the About section).
- Analytics: create GA4 property and provide `NEXT_PUBLIC_GA_ID`.
- Privacy notice text (aviso de privacidad) required by Mexican law for forms collecting personal data.
- Phase 2 providers (WhatsApp Business API vs Twilio, LLM provider) and hosting.
