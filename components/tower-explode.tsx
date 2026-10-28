import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { productBySlug } from "@/content/products";
import { Arrow, Container, Eyebrow, StatusTag } from "./ui";

/**
 * The Spectra tower, taken apart as you scroll. The units slide out of the
 * cart to where they are named, each on a leader line, like an exploded
 * drawing. Every unit is a real studio photograph. On desktop each also
 * carries its line from the Spectra spec table, word for word. The cart is a render and says so.
 *
 * CSS only: the stage is pinned while its track scrolls past, and a
 * named view timeline drives each part. Without scroll timelines, or with
 * reduced motion, the drawing shows already taken apart.
 */
const PARTS = [
  { name: "Camera", spec: "Camera", item: "icg-camera", src: "/images/products/icg-camera.jpg", alt: "UnivLabs 4K ICG camera control unit with camera head", x: 16, y: 13 },
  { name: "Light source", spec: "Light source", item: "nir-light-source", src: "/images/products/nir-light-source.jpg", alt: "UnivLabs NIR UL9700 light source with fibre-optic cable", x: 84, y: 27 },
  { name: "Telescope", spec: "Telescope", item: "endoscopes", src: "/images/products/telescope.jpg", alt: "UnivLabs UHD telescope eyepiece and shaft", x: 16, y: 50 },
  { name: "Insufflator", spec: "Insufflator", item: "insufflator", src: "/images/products/insufflator.jpg", alt: "UnivLabs Uniflator UL45-S CO₂ insufflator", x: 84, y: 69 },
  { name: "Pump", spec: "Irrigation / suction", item: "universal-medical-pump", src: "/images/products/universal-pump.jpg", alt: "UnivLabs Universal Medical Pump UMP-1000", x: 16, y: 87 },
] as const;

/** Where each part moves, as a share of the pinned scroll. */
const range = (n: number) => `contain ${16 + n * 11}% contain ${38 + n * 11}%`;

export function TowerExplode() {
  const spectra = productBySlug("spectra");
  if (!spectra?.image) return null;
  const value = (label: string) => spectra.specs.find((s) => s.label === label)?.value;

  return (
    <section aria-labelledby="tower-title" data-hide-cta className="bg-clinical">
      <div className="tower-track">
        <div className="tower-pin">
          <Container className="grid h-full gap-6 py-8 sm:py-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
            <div className="flex flex-col">
              <Eyebrow>Spectra · Inside the tower</Eyebrow>
              <h2
                id="tower-title"
                className="scan-in mt-3 w-fit font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl"
              >
                One tower, taken apart
              </h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed sm:text-lg">
                Camera, light, scope, insufflation and irrigation: the units
                inside a Spectra tower.<span className="tower-hint"> Scroll to take it apart.</span>
              </p>
              {/* One bar per unit, filling as it comes out of the cart. */}
              <ol aria-hidden className="mt-5 flex gap-1.5">
                {PARTS.map((p, n) => (
                  <li key={p.item} className="h-1.5 w-8 overflow-hidden rounded-full bg-line">
                    <span
                      className="tower-fill block h-full rounded-full bg-blue"
                      style={{ animationRange: range(n) } as CSSProperties}
                    />
                  </li>
                ))}
              </ol>
              <div className="mt-5 hidden flex-wrap items-center gap-x-6 gap-y-3 lg:flex">
                <StatusTag status={spectra.status} />
                <Link
                  href="/products/spectra"
                  className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue"
                >
                  Explore Spectra <Arrow />
                </Link>
              </div>
            </div>

            <div className="tower-stage relative">
              {/* Leader lines run from the cart to each unit. */}
              <svg
                aria-hidden
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
              >
                {PARTS.map((p, n) => (
                  <line
                    key={p.item}
                    x1="50"
                    y1="50"
                    x2={p.x}
                    y2={p.y}
                    className="tower-line"
                    stroke="#0866f4"
                    strokeOpacity="0.45"
                    strokeWidth="1.25"
                    vectorEffect="non-scaling-stroke"
                    style={{ animationRange: range(n) } as CSSProperties}
                  />
                ))}
              </svg>

              <div className="tower-cart absolute left-1/2 top-1/2 z-10 h-[64%] -translate-x-1/2 -translate-y-1/2">
                <div className="relative aspect-[1459/1800] h-full overflow-hidden rounded-2xl bg-[#828289] shadow-[0_30px_80px_-30px_rgba(0,26,73,0.45)] ring-1 ring-navy/10">
                  <Image
                    src={spectra.image.src}
                    alt={spectra.image.alt}
                    fill
                    sizes="(min-width: 1024px) 320px, 45vw"
                    className="object-cover"
                  />
                  <span className="label absolute bottom-2 left-2 rounded-full bg-navy/80 px-2 py-0.5 text-[10px] text-clinical">
                    Render
                  </span>
                </div>
              </div>

              <ul className="absolute inset-0 z-20">
                {PARTS.map((p, n) => (
                  <li
                    key={p.item}
                    className="tower-part absolute w-[26%] max-w-40"
                    style={
                      {
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        "--x": p.x,
                        "--y": p.y,
                        animationRange: range(n),
                      } as CSSProperties
                    }
                  >
                    <Link
                      href={`/products/surgicore/${p.item}`}
                      className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue"
                    >
                      <span className="relative block aspect-[4/3] overflow-hidden rounded-xl bg-white shadow-[0_12px_30px_-14px_rgba(0,26,73,0.35)] ring-1 ring-line transition-[box-shadow] duration-300 group-hover:ring-blue">
                        <Image
                          src={p.src}
                          alt={p.alt}
                          fill
                          sizes="(min-width: 1024px) 160px, 27vw"
                          className="object-contain p-1.5"
                        />
                      </span>
                      {/* Phones: the name only. Desktop: the spec line too. */}
                      <span className="label mt-1.5 block text-[11px] leading-tight text-blue">
                        {p.name}
                      </span>
                      <span className="mt-0.5 hidden text-[13px] leading-snug text-navy lg:block">
                        {value(p.spec)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between gap-4 lg:hidden">
              <StatusTag status={spectra.status} />
              <Link
                href="/products/spectra"
                className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue"
              >
                Explore Spectra <Arrow />
              </Link>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
