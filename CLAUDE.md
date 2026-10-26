@AGENTS.md

# UnivLabs website

Marketing website for **UnivLabs Technologies Pvt. Ltd.**, a Gurugram medical device manufacturer (founded 2015 by Sunil Kumar Singh) that designs and makes 4K ICG laparoscopy suites, hand instruments and the patented Am-SafeX catheter. Siddharth is the agency/designer; UnivLabs is the client.

The full brand book is in `brand/brand-book.md`. The presentation version lives in Claude Design: https://claude.ai/artifact/Ju91mCDUkGMGpH2R15FYzz. Read the brand book before writing copy or adding pages.

## Stack

- Next.js 16.4 (App Router, Turbopack), React 19.3, TypeScript, Tailwind CSS 4 via `@tailwindcss/turbopack` (no PostCSS config).
- Next 16 differs from older versions. Check `node_modules/next/dist/docs/` before using an API you are unsure of (see AGENTS.md). Route `params` are Promises: `await params`.
- Cache Components and Partial Prefetching are on (`next.config.ts`). No `dynamicParams` export (call `notFound()` instead); values that change per render, like `new Date()`, go in a `"use cache"` component or behind `<Suspense>`.
- `npm run dev` · `npm run build` · `npm run lint`.

## Where things live

- `app/` — routes. Home is `app/page.tsx`. Products are data-driven from `content/products.ts` via `app/products/[slug]/page.tsx`.
- `proxy.ts` — returns a real 404 for unknown `/products/<slug>` URLs, using the slugs in `content/products.ts`. The product page reads its slug inside `<Suspense>`, where `notFound()` alone can only send status 200.
- `content/site.ts` — nav, specialties, leadership, and **every public number with its source** (`facts`). Change figures here only.
- `content/products.ts` — product catalogue, status per product, pipeline.
- `components/ui.tsx` — Container, SectionHeader, ButtonLink, StatusTag, PageHero, SectionMarker, CtaBand, Todo.
- `components/brand.tsx` — `Mark` (SVG rebuilt from the logo) and `Logo` lockup.
- `components/mode-viewer.tsx` — the hero: one surgical scene in white light / ICG overlay / NIR.
- `components/motion.tsx` — the motion system: `MotionRoot` (scroll reveal + card spotlight), `ScrollProgress`, `CountUp`. Add `data-reveal` (or `="fade" | "scale" | "left"`) to fade an element in on scroll, `data-stagger` to a list or grid to reveal its children one by one, `data-spotlight` to a dark card. Above-the-fold text uses the CSS `rise` class with `--i` for order. Nothing is hidden without JavaScript or with reduced motion.
- `components/desktop-nav.tsx` — desktop nav with a sliding hover pill and the Products mega menu. `components/specialty-explorer.tsx` — the home page specialty hover list.
- Also in `components/motion.tsx`: `data-scramble` (mono labels resolve on reveal), `data-tilt` (cards lean toward the pointer), `data-magnetic` (primary buttons). `Words` in `ui.tsx` splits a headline into rising words. Page changes use React `<ViewTransition>` (layout), and product images morph between card and hero via `name="product-<slug>"`; a name must appear once per page.
- `brand/web-direction.md` — how the brand plays out on screen: motion tokens and rules, layout patterns, what was not adopted.
- `components/nir-lens.tsx` — white light, with a 160 px-radius NIR lens that follows the cursor (touch: tap or drag; keyboard: Enter, then arrow keys).
- `public/images/products/` — studio shots from the client's product library. Renders are flagged `render: true` and always labelled on the page.
- `app/globals.css` — brand tokens as Tailwind theme colours and fonts, plus the `label` utility.
- `brand/` — brand book and source assets (logo variants, original footage). `public/` holds web copies.

## Brand rules that affect code and copy

**Positioning.** An Indian designer and manufacturer of surgical systems. Lead with what is deployed today. AI, robotics and autonomy are never the headline; they live on `/innovation`, labelled.

**Lines.** Brand line: "Engineered for clarity." Descriptor: "Surgical systems, designed and made in India." Purpose (About page only): "Care for all." Retired as headlines: "Better surgery. Everywhere." and "In service of humanity".

**Names.** Text always says `UnivLabs` (never Univlabs/UNIVLABS). `Am-SafeX` exactly. `CogniAxis` in copy ("CogniAxis.AI" only in a logo lockup). `AxisEdge+`, `SurgiVault`, `SurgiBot`, `Dr Mentor`, `SUFI`, `Pay Per Minute`. Indian English spelling: programme, colour, gynaecology, orthopaedics, fibre. Units with a space: `10 mm`, `CO₂`, `4K`.

**Families.** Surgical Vision (Spectra, Lumina, SurgiStart, Components) · Instruments & Devices (hand instruments, Am-SafeX) · CogniAxis (AxisEdge+ hardware, SurgiVault storage, Dr Mentor teaching) · Programmes (Pay Per Minute leasing, SUFI surgeon co-innovation, OBSR service) · Research (SurgiBot, biodegradable ureteral stent with IIT Roorkee).

**Claims policy.** Medical device promotion is regulated.
- Every product has a `status`: `available`, `development` or `research`. Always render it with `StatusTag` (words plus solid/dashed bar, never colour alone).
- Available: claim only within approved intended use. No clinical outcome claims unless Regulatory supplied the wording.
- Development/research: label every mention, no performance figures, no dates. Concept visuals carry "Concept render".
- Banned words: revolutionary, world's best, autonomous, AI-powered, guaranteed, zero risk, painless, cutting-edge.
- Never invent specs, figures, quotes, certificates or addresses. Use a bracketed placeholder and a `<Todo>` instead.

**Voice.** Precise, candid, grounded, generous. Fact first. Short sentences, active verbs. Sentence-case headlines, no exclamation marks, no emoji.

**Colour.** Deep Navy `#001A49` (headlines, dark sections) · UnivLabs Blue `#0866F4` (links, buttons) · ICG Green `#4BE779` (signal only: imaging modes and one key figure; never buttons, backgrounds or text on white) · Clinical White `#F4F6F9` · Paper `#FCFDFE` · Steel `#5B6782` · Line `#D9DEE7` · Blue 300 `#6FA3FF` (accent on navy). Balance roughly 60 white / 25 navy / 10 blue / ≤5 green.

**Type.** Plus Jakarta Sans for headlines and numbers (`font-display`, bold, tight tracking). Inter for body (`font-sans`). IBM Plex Mono uppercase for labels, specs, mode names and sources (`label` utility).

**Graphic device.** Rounded bars from the mark. Solid bar = live, dashed bar = not yet available. `SectionMarker` (two short bars and one long bar) opens navy heroes.

**Imagery.** Real only, in this order of priority: surgical footage from UnivLabs cameras (de-identified, consent on file), product studio shots, documentary photos of surgeons and engineers. Grey dashed boxes mark photos still to commission. Never stock photos of smiling patients.

**AI policy.** AI is fine for retouching, background extension, checked translations and first-draft copy. Never AI-generated people, tissue, surgery or devices presented as real.

**Accessibility.** Text contrast 4.5:1 minimum. Alt text on every image. Respect `prefers-reduced-motion` (the mode viewer stops auto-advancing).

## Open items from the client

Search the code for `TODO` and `[` placeholders. Main gaps:
- Logo vector masters (current mark is rebuilt as SVG; the wordmark is a PNG extracted from the supplied file).
- Lumina, SurgiStart and hand instrument details and specs; full Spectra spec sheet.
- Am-SafeX intended use, sizes, patent number and regulatory status.
- What SUFI stands for, and how the programme works.
- Certificates by market (ISO 13485, CDSCO, CE?) with scope and expiry.
- Pay Per Minute terms and reopening date; the operating-economics calculator.
- Sales/demo email (currently falls back to customersupport@univlabs.in), full address.
- Contact form backend (currently opens a pre-filled email).
- Product and people photography (three shoot days planned).
- Refresh the patent count (16 filed / 4 granted, from a 2025 article).
