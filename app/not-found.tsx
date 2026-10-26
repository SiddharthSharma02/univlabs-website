import Link from "next/link";
import type { CSSProperties } from "react";
import { Arrow, ButtonLink, Container, HeroGlow, SectionMarker, Words } from "@/components/ui";

const quickLinks = [
  { href: "/products/spectra", label: "Spectra 4K ICG" },
  { href: "/products", label: "All products" },
  { href: "/service", label: "Service" },
  { href: "/contact", label: "Contact" },
];

/**
 * A surgical monitor with no signal. Dashed bars are the brand's sign
 * for "not available"; here they stand in for the missing page.
 */
export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-navy text-clinical">
      <HeroGlow />
      <Container className="relative grid items-center gap-14 py-20 sm:py-28 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <div className="rise">
            <SectionMarker />
          </div>
          <p data-scramble className="rise label mt-8 text-blue-300" style={{ "--i": 1 } as CSSProperties}>
            404 · No signal
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-balance sm:text-6xl">
            <Words text="Nothing in the field of view" delay={200} />
          </h1>
          <p className="rise mt-6 max-w-xl text-lg text-fog" style={{ "--i": 4 } as CSSProperties}>
            The page may have moved when we rebuilt the site.
          </p>
          <div className="rise mt-8 flex flex-wrap gap-3" style={{ "--i": 5 } as CSSProperties}>
            <ButtonLink href="/" arrow>
              Go to the homepage
            </ButtonLink>
            <ButtonLink href="/products" variant="ghost-light">
              Browse products
            </ButtonLink>
          </div>
        </div>

        <div className="rise" style={{ "--i": 3 } as CSSProperties}>
          <div aria-hidden className="relative aspect-video overflow-hidden rounded-3xl border border-navy-600 bg-navy-700 p-8 shadow-[0_40px_120px_-40px_rgba(8,102,244,0.5)]">
            <div className="flex items-center justify-between">
              <span className="label text-fog">Input 1 · 4K</span>
              <span className="label flex items-center gap-2 text-fog">
                <span className="size-2 rounded-full bg-blue-300 motion-safe:animate-pulse-dot" />
                Searching
              </span>
            </div>
            <p className="mt-6 font-display text-[clamp(4rem,12vw,9rem)] font-extrabold leading-none tracking-tighter text-blue-300/25">
              404
            </p>
            <div className="absolute inset-x-8 bottom-8 space-y-3">
              {[72, 48, 88].map((w, n) => (
                <span
                  key={n}
                  className="march block h-2 rounded-full text-blue-300/30"
                  style={{ width: `${w}%`, animationDelay: `${n * -0.4}s` }}
                />
              ))}
            </div>
          </div>
          <ul className="mt-6 grid grid-cols-2 gap-2">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group flex items-center justify-between rounded-2xl border border-navy-600 px-4 py-3 text-[15px] font-medium transition-colors hover:border-blue-300"
                >
                  {l.label}
                  <Arrow />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
