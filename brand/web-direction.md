# Web direction: motion, layout and brand

How the website applies the brand book, and what was taken from the reference galleries (October 2026). The brand book still governs. This file covers only how it plays out on screen.

## The idea

UnivLabs sells clarity of vision, so the site should behave like a good surgical monitor: calm, precise, and responsive the moment you touch it. Motion confirms an action or reveals information. It never decorates for its own sake.

## Motion rules

**No fade-ins.** Fading every card and paragraph in on scroll is the most common sign of a template or AI-built site, and it can hide content from someone scrolling fast. Text is always on the page. Below the fold, motion is linked to the scroll position (CSS scroll-driven animations): it follows the visitor's finger, stops when they stop, and runs backwards when they scroll up. Each effect comes from what UnivLabs makes: light, focus, the mark's bars, an instrument readout, a tower of units. Browsers without scroll timelines and visitors who prefer reduced motion get the finished state.

**One signature moment per page.** On the home and Spectra pages it is the tower coming apart: the stage pins while its track scrolls past, and each unit slides out of the cart on a leader line to its label. The units are the client's studio photographs and the labels are the Spectra spec table, word for word. Jack Roberts builds this "composed, then exploded" moment from AI video; the brand's AI policy rules that out for devices, so it is built from real photographs. Elsewhere, interaction is the motion: the mode viewer, the NIR lens, swipe rails.

From Jack Roberts' web rules: UI transitions 150–300 ms, ease-out on entry; animate transform and opacity (filter only for the focus pull); honour reduced motion; one primary action per screen.

From transitions.dev, motion-primitives and 60fps.

- **Tokens, not one-off values.** `--dur-fast` 160 ms (exits), `--dur-base` 280 ms, `--dur-slow` 480 ms, `--dur-reveal` 750 ms. One easing (`--ease-out-soft`), plus `--ease-spring` for the magnetic pull only. Defined in `app/globals.css`.
- **Exits are quick, entrances are calm.** Page changes fade the old page in 160 ms, then bring the new one up from 12 px.
- **Name the property.** Never `transition: all`. Animate `transform`, `translate`, `opacity` and `filter` only.
- **Every effect has a still version.** With reduced motion, or without JavaScript, all content shows at once and nothing moves.

| Effect | Where | Source idea |
|---|---|---|
| A light edge sweeps across the title (`scan-load`, `scan-in`) | Page titles on load; section titles with scroll | The hero's mode wipe |
| A photo comes into focus as it reaches the reading line (`focus-in`) | Product and catalogue photos | The brand line, "Engineered for clarity" |
| The mark's bars draw themselves with scroll (`draw-bar`) | Status and highlight bars | Graphic device |
| Mono labels read out like an instrument display (`data-scramble`) | Eyebrows, mode labels | Motion Primitives "Text Scramble" |
| The Spectra tower comes apart into its units (`TowerExplode`) | Home, Spectra page | Jack Roberts' composed-to-exploded hero |
| Cards lean a few degrees toward the pointer (`data-tilt`) | Product bento | transitions.dev "3D tilt" |
| Primary buttons pulled toward the pointer (`data-magnetic`) | Blue buttons | Common magnetic-button pattern |
| Product photo morphs from card to product hero | Products → product page | React `<ViewTransition>` shared element |
| Sliding hover pill in the nav | Desktop header | transitions.dev "tabs sliding" |
| Counters roll up once | Proof bar, CogniAxis figure | transitions.dev "number pop-in" |

## Layout patterns

- **Navbar** (navbar.gallery, mega-menu category). Products opens a mega menu with product photos, both families, and a footage tile for Spectra. Other groups stay as short lists.
- **Bento** (bentogrids.com). The home page "What we make" is one bento instead of three repeated three-card rows. Spectra is the large tile, with real ICG footage. Each family appears once. One dashed tile handles "not sure what fits".
- **Hover list** (Savee, Refero). Specialties are a list of large names. Pointing at one shows what UnivLabs supplies for it. On phones it becomes a plain list with summaries.
- **Footer** (footer.design, "Large type"). The brand line runs edge to edge at display size, with the mark's bars drawing in above it. Demo and service actions sit in the footer, so every page ends with a next step.
- **404** (404s.design). A surgical monitor with no signal. The dashed bars reuse the brand's "not available" sign.

## Phones

Most visitors arrive on a phone. A stack of identical rounded cards, one per screen, reads as a template, so below the `sm` or `md` breakpoint the same content changes form. Desktop layouts are unchanged.

- **Swipe rails** (`Rail`). Rows of product, highlight, gallery and related cards scroll sideways with the next card peeking in. The pager is the mark's bars: the current card is the long solid bar, with a `01 / 05` readout.
- **Rows, not cards.** The product index, the instrument catalogue, leadership, ownership options and the audience links become divided rows with a thumbnail on a white plate. The instrument range drops from about 7,000 px to under 2,000 px.
- **Timelines.** The pipeline and numbered steps (`Steps`) run down a rail: solid between live stages, dashed toward anything not yet available, with the status still written in words.
- **Tap to open.** Specialties are an accordion that shows what UnivLabs supplies for each one as swipeable chips. Footer link groups fold away.
- **Touch gestures.** Swipe across the hero footage to change imaging mode. The NIR lens already follows a finger. The comparison table keeps its label column pinned while it scrolls.
- **One floating action.** After the hero, a navy "Request a demo" pill stays in reach of the thumb. It hides over the footer and on the contact and service pages.

## Brand discipline

- ICG Green appears in three places only: imaging-mode labels and bars, the NIR lens, and one key figure per view (the CogniAxis count).
- Section titles are sentence case with no full stop. Only taglines take a full stop: the hero line, product headlines and the brand line.
- One phrasing per idea, everywhere:
  - Pay Per Minute: "pay for the minutes you operate".
  - Status legend: "Solid bars are live today. Dashed bars are not yet available."
- No puffery ("world-class") and no outcome claims (for example, "prevents injury") without Regulatory wording.

## Fonts

The brand book sets Plus Jakarta Sans, Inter and IBM Plex Mono, and the site keeps them. Fontshare (General Sans, Switzer) and Typewolf were reviewed. If the client ever reopens the type system, Switzer would make a sharper body face than Inter. Until then, no change.

## Not adopted, and why

- **Lottie animations (LottieFiles).** Worth it later for a short "how Pay Per Minute works" or "how SUFI works" explainer, once the client confirms how those programmes work. No placeholder animations before then.
- **Confetti, gooey menus, playful bounce (60fps, transitions.dev).** These are wrong for a regulated medical brand.
- **Stock motion backgrounds.** Brand imagery is real footage and studio shots only.
