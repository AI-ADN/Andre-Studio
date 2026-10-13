# STATE.md: André Studio

## 2026-10-12: Phase 1 landing page built

### Completed
- Created `PROJECT.md` from `CLIENT.md` and the chat decisions (Phase 1 = WhatsApp booking; mixed real + AI images; local owner cutout; deposit policy shown, bank details private).
- Next.js 16 app with `/es` (default) and `/en`; `src/proxy.ts` redirects `/` by `Accept-Language`.
- Sections: hero (owner cutout in arch frame, torn-paper greeting, sticky note), service ribbon, catalog (15 services, category filters, add/remove), "Why André Studio" notebook + studio polaroid + pigments note, Google review carousel, booking steps + request form, FAQ (native `<details>`), contact + map, footer, floating booking dock.
- Booking: shared selection state (`BookingProvider`), validation and WhatsApp message builder in `src/lib/booking.ts` behind a `BookingChannel` interface.
- SEO: per-locale metadata, canonical + hreflang, OG image (`public/images/og.jpg`), BeautySalon JSON-LD with offer catalog, sitemap, robots, icons.
- Analytics: `track()` events (service_added/removed, booking_submitted, whatsapp_click, language_switched...), GA loads only when `NEXT_PUBLIC_GA_ID` is set. No PII sent.
- Tests (Vitest, `npm test`): booking validation/message/URL, catalog prices vs. published prices, image files exist, ES/EN parity, no em/en dashes in copy. 16 passing.
- Verified: `npm run build`, `npm run typecheck`, `npx eslint .` clean. Browser QA on desktop 1440, tablet 1024 and mobile 390: all sections, catalog → form sync, validation + focus on first error, WhatsApp URL content, mobile menu, dock, `/en`, reduced motion.

### Fixes found in QA
- Header CTA showed on phones (`buttonStyles.primary` has `inline-flex`, which beat `hidden`) and pushed the menu button off-screen. Now `max-md:!hidden`.
- Rotated Studio polaroid widened the mobile layout viewport. `overflow-x-clip` added to `<html>` as well as `<body>` (body overflow alone propagates to the viewport and does not clip on mobile).

### Decisions
- Booking form never claims a confirmed appointment; copy says Andy confirms on WhatsApp and sends deposit details there.
- AI images only for generic treatments/still lifes, never as micropigmentation results; real client photos keep their "André Ch" watermark.
- `agentRules: false` in `next.config.ts` so `next dev` does not rewrite `AGENTS.md`.

### Known issues / notes
- Hero headline animates in from `opacity: 0` (Motion `initial`), so without JS it stays hidden. Acceptable for now; revisit if LCP becomes a concern.
- `next start` inside the agent sandbox fails on `os.networkInterfaces()`; run it unsandboxed.
- Synthetic Tab in the IDE browser tool doesn't move focus; keyboard flow was verified by code review (skip link → `#contenido`, global `:focus-visible`).

### Next
- Client answers to the open questions in `PROJECT.md` §8 (hours, email, photo rights, privacy notice, GA4 ID).
- Add aviso de privacidad page and link it from the form before launch.
- Choose hosting (Vercel recommended), set `NEXT_PUBLIC_SITE_URL` / `NEXT_PUBLIC_GA_ID` (see `.env.example`), verify domain + HTTPS.
- Phase 2 discovery: service durations, working hours, Calendar + WhatsApp provider, LLM provider.
