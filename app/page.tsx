import Link from "next/link";
import type { CSSProperties } from "react";
import { IcgReveal } from "@/components/icg-reveal";
import { Mark } from "@/components/brand";
import { ModeViewer } from "@/components/mode-viewer";
import { CountUp } from "@/components/motion";
import {
  Arrow,
  ButtonLink,
  Container,
  Eyebrow,
  FlowDiagram,
  HeroGlow,
  ProductImage,
  SectionHeader,
  SectionMarker,
  StatusTag,
  Ticker,
} from "@/components/ui";
import { families, pipeline, productBySlug } from "@/content/products";
import { proofBar, site, specialties } from "@/content/site";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/** What a Spectra tower brings together, as listed on univlabs.in. */
const capabilities = [
  "4K imaging",
  "ICG fluorescence",
  "Near-infrared",
  "CO₂ insufflation",
  "Smoke evacuation",
  "Suction and irrigation",
  "4K recording",
  "Designed and made in India",
];

const familyImage = {
  "surgical-vision": productBySlug("spectra")?.image,
  instruments: productBySlug("hand-instruments")?.image,
  cogniaxis: undefined,
} as const;

const suites = ["spectra", "lumina", "surgistart"]
  .map((slug) => productBySlug(slug))
  .filter((p) => p !== undefined);

export default function Home() {
  return (
    <>
      {/* 1. Hero: the surgeon's view comes first. */}
      <section className="relative overflow-hidden bg-navy text-clinical">
        <HeroGlow />
        <Container className="relative grid items-center gap-12 pb-12 pt-16 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-16 lg:pt-24">
          <div>
            <div className="rise" style={i(0)}>
              <SectionMarker />
            </div>
            <p className="rise label mt-8 text-blue-300" style={i(1)}>
              Spectra · 4K 4-chip ICG
            </p>
            <h1 className="mt-4 font-display text-5xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              <span className="rise block" style={i(2)}>
                See what
              </span>
              <span className="rise block" style={i(3)}>
                white light{" "}
                <span className="relative whitespace-nowrap">
                  can’t.
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-1.5 w-full origin-left rounded-full bg-blue-300 motion-safe:animate-[fill-bar_1.2s_var(--ease-out-soft)_1.1s_both]"
                  />
                </span>
              </span>
            </h1>
            <p
              className="rise mt-8 max-w-xl text-lg leading-relaxed text-fog text-pretty sm:text-xl"
              style={i(4)}
            >
              UnivLabs designs and manufactures 4K ICG surgical vision systems,
              instruments and devices in India, for hospitals that want
              world-class minimally invasive surgery without import-level costs.
            </p>
            <div className="rise mt-10 flex flex-wrap gap-3" style={i(5)}>
              <ButtonLink href="/contact?topic=demo" arrow>
                Request a demo
              </ButtonLink>
              <ButtonLink href="/products/spectra" variant="ghost-light">
                Explore Spectra
              </ButtonLink>
            </div>
          </div>
          <div className="rise mx-auto w-full max-w-[560px]" style={i(3)}>
            <ModeViewer />
          </div>
        </Container>
        <div className="relative border-t border-navy-600 py-5">
          <Ticker items={capabilities} dark />
        </div>
      </section>

      {/* 2. Proof bar, every figure sourced. */}
      <section aria-label="UnivLabs in numbers" className="border-b border-line bg-paper">
        <Container className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 lg:grid-cols-4">
          {proofBar.map((fact, n) => (
            <div key={fact.label} data-reveal style={i(n)} className="relative pl-5">
              <span aria-hidden className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-1 rounded-full bg-blue" />
              <p className="font-display text-3xl font-bold tracking-tight text-navy sm:text-5xl">
                <CountUp value={fact.value} />
              </p>
              <p className="mt-2 text-[15px] text-ink">{fact.label}</p>
              <p className="label mt-2 text-steel">{fact.source}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* 3. Product families. */}
      <section className="bg-clinical">
        <Container className="py-20 sm:py-28">
          <SectionHeader
            eyebrow="What we make"
            title="Three product families, one masterbrand"
            intro="Every UnivLabs system is designed in-house and built to work with the rest of the operating room."
          />
          <div data-stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {families.map((family, n) => {
              const image = familyImage[family.id];
              return (
                <Link
                  key={family.id}
                  href={family.href}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-paper transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-20px_rgba(0,26,73,0.25)]"
                >
                  {image ? (
                    <ProductImage
                      image={image}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="aspect-[4/3]"
                    />
                  ) : (
                    <ConnectedGraphic />
                  )}
                  <div className="flex flex-1 flex-col border-t border-line p-8">
                    <p className="label text-steel">0{n + 1}</p>
                    <h3 className="mt-2 font-display text-2xl font-bold text-navy">
                      {family.name}
                    </h3>
                    <p className="mt-3 flex-1 leading-relaxed">{family.summary}</p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue">
                      Explore {family.name}
                      <Arrow />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 3b. Vision suites, numbered like the current site. */}
      <section className="bg-paper">
        <Container className="py-20 sm:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              eyebrow="Surgical vision suites"
              title="Choose the suite for your operating room"
            />
            <div data-reveal>
              <ButtonLink href="/products#surgical-vision" variant="secondary" arrow>
                All surgical vision
              </ButtonLink>
            </div>
          </div>
          <div data-stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {suites.map((p, n) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-white transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1.5 hover:border-blue/40 hover:shadow-[0_24px_60px_-20px_rgba(0,26,73,0.25)]"
              >
                <div className="flex items-center justify-between px-6 pt-6">
                  <span className="label text-steel">0{n + 1}</span>
                  <span className="flex size-9 items-center justify-center rounded-full border border-line text-navy transition-colors group-hover:border-blue group-hover:bg-blue group-hover:text-paper">
                    <Arrow />
                  </span>
                </div>
                {p.image ? (
                  <ProductImage
                    image={p.image}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="aspect-[4/5]"
                  />
                ) : (
                  <div className="relative aspect-[4/5]">
                    <div className="absolute inset-6 flex items-center justify-center rounded-2xl border-2 border-dashed border-steel/40 bg-mist">
                      <p className="label text-steel">Product photo to commission</p>
                    </div>
                  </div>
                )}
                <div className="border-t border-line p-6">
                  <h3 className="font-display text-2xl font-bold text-navy transition-colors group-hover:text-blue">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-[15px]">{p.descriptor}</p>
                  <div className="mt-4">
                    <StatusTag status={p.status} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Interactive: the same frame, two ways. */}
      <section className="relative overflow-hidden bg-navy text-clinical">
        <HeroGlow />
        <Container className="relative grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeader
              dark
              eyebrow="One camera, three views"
              title="Hover over the frame. The anatomy is the same."
              intro="Spectra’s 4-chip camera adds a dedicated near-infrared sensor to red, green and blue, so ICG fluorescence can be laid over the 4K white-light image of the same field."
            />
            <ul data-stagger className="mt-10 space-y-4">
              {[
                ["White light", "The 4K colour image", "bg-clinical"],
                ["ICG overlay", "Fluorescence over the colour image", "bg-icg"],
                ["NIR", "Near-infrared monochrome with fluorescence", "bg-icg"],
              ].map(([mode, body, bar]) => (
                <li key={mode} className="flex items-center gap-4">
                  <span aria-hidden className={`h-2 w-10 shrink-0 rounded-full ${bar}`} />
                  <span className="label text-clinical">{mode}</span>
                  <span className="text-[15px] text-fog">{body}</span>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal="scale">
            <IcgReveal dark />
          </div>
        </Container>
      </section>

      {/* 5. Specialties. */}
      <section className="bg-clinical">
        <Container className="py-20 sm:py-28">
          <SectionHeader
            eyebrow="By specialty"
            title="Find the system for your department"
          />
          <div
            data-stagger
            className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
          >
            {specialties.map((s, n) => (
              <Link
                key={s.id}
                href={`/specialties#${s.id}`}
                className="group relative bg-paper p-8 transition-colors duration-300 hover:bg-white"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-blue transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-x-100"
                />
                <p className="label text-steel">0{n + 1}</p>
                <h3 className="mt-3 flex items-center justify-between font-display text-xl font-bold text-navy">
                  {s.name}
                  <Arrow className="size-4 text-blue" />
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed">{s.summary}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. Ownership. */}
      <section className="bg-paper">
        <Container className="grid gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:items-center">
          <SectionHeader
            eyebrow="Ownership"
            title="Buy it, or pay for the minutes you use"
            intro="Hospitals can purchase a UnivLabs tower outright, or lease it under Pay Per Minute and pay only for operating time."
          />
          <div data-stagger className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/products/components"
              className="group rounded-3xl border border-line bg-clinical p-8 transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(0,26,73,0.25)]"
            >
              <p className="label text-blue">Purchase</p>
              <p className="mt-3 font-display text-2xl font-bold text-navy">
                Own the suite
              </p>
              <p className="mt-2 text-[15px] leading-relaxed">
                Configure a full tower or individual components, priced on request.
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue">
                Configure components <Arrow />
              </span>
            </Link>
            <Link
              href="/pay-per-minute"
              data-spotlight
              className="group overflow-hidden rounded-3xl bg-navy p-8 text-clinical transition-transform duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1"
            >
              <p className="label text-blue-300">Pay Per Minute</p>
              <p className="mt-3 font-display text-2xl font-bold">
                Lease by the minute
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-fog">
                No large upfront cost. Currently closed to new registrations.
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue-300">
                How it works <Arrow />
              </span>
            </Link>
          </div>
        </Container>
      </section>

      {/* 7. Built with surgeons. */}
      <section className="bg-clinical">
        <Container className="grid gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div data-reveal="left" className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-mist">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-steel/40 text-center">
              <p className="label text-steel">Photo to commission</p>
              <p className="max-w-xs text-[15px] text-steel">
                A urologist and a UnivLabs engineer reviewing an Am-SafeX prototype.
              </p>
            </div>
          </div>
          <div>
            <SectionHeader
              eyebrow="Built with surgeons"
              title="Ideas from the operating room become products"
              intro="Through SUFI, surgeons bring us a clinical problem and our engineers build the device. Am-SafeX, our patented catheter, began exactly this way."
            />
            <div data-reveal className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/sufi" arrow>
                Bring us an idea
              </ButtonLink>
              <ButtonLink href="/products/am-safex" variant="secondary">
                Meet Am-SafeX
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* 8. Quality, regulatory, service. */}
      <section className="bg-paper">
        <Container className="py-20 sm:py-28">
          <SectionHeader
            eyebrow="Quality and service"
            title="Made, certified and serviced by the same team"
          />
          <div data-stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "ISO 13485 manufacturing",
                body: "Medical device quality management across design and production.",
                href: "/quality",
                cta: "Quality and regulatory",
              },
              {
                title: "One-button service request",
                body: "Our one-button service request model is built for proactive service and maintenance.",
                href: "/service",
                cta: "Service",
              },
              {
                title: "Designed in India",
                body: `Headquartered in Gurugram, with R&D in ${site.rdSites.join(", ")}.`,
                href: "/about",
                cta: "About UnivLabs",
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-3xl border border-line bg-clinical p-8 transition-[transform,box-shadow,background-color] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:bg-white hover:shadow-[0_20px_50px_-20px_rgba(0,26,73,0.2)]"
              >
                <span aria-hidden className="block h-1.5 w-10 rounded-full bg-blue transition-[width] duration-500 group-hover:w-16" />
                <h3 className="mt-6 font-display text-xl font-bold text-navy">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed">{item.body}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue">
                  {item.cta} <Arrow />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 9. Pipeline, clearly labelled. */}
      <section className="relative overflow-hidden bg-navy text-clinical">
        <HeroGlow />
        <Container className="relative py-20 sm:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              dark
              eyebrow="Innovation pipeline"
              title="From capturing surgery to learning from it"
              intro="Solid bars are live today. Dashed bars are research. We say which is which."
            />
            <Link
              data-reveal
              href="/innovation"
              className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue-300"
            >
              See the full pipeline <Arrow />
            </Link>
          </div>
          <div className="mt-12">
            <FlowDiagram steps={pipeline} dark />
          </div>
        </Container>
      </section>

      {/* 10. Doors. */}
      <section className="bg-clinical">
        <Container className="py-20 sm:py-28">
          <div data-stagger className="grid gap-6 md:grid-cols-3">
            {[
              {
                who: "Hospitals and surgeons",
                title: "Find your system",
                body: "Discuss equipment, integration and a demonstration.",
                href: "/contact?topic=demo",
              },
              {
                who: "Distributors and partners",
                title: "Carry UnivLabs",
                body: "Training, support and export-ready documentation.",
                href: "/partners",
              },
              {
                who: "Investors",
                title: "Explore the opportunity",
                body: "Our business, deployments and plans, on request.",
                href: "/investors",
              },
            ].map((door) => (
              <Link
                key={door.who}
                href={door.href}
                className="group rounded-3xl border border-line bg-paper p-8 transition-[transform,border-color,box-shadow] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-navy hover:shadow-[0_20px_50px_-20px_rgba(0,26,73,0.2)]"
              >
                <Eyebrow tone="steel">{door.who}</Eyebrow>
                <p className="mt-3 flex items-center justify-between font-display text-2xl font-bold text-navy transition-colors group-hover:text-blue">
                  {door.title}
                  <Arrow className="size-5" />
                </p>
                <p className="mt-2 text-[15px] leading-relaxed">{door.body}</p>
              </Link>
            ))}
          </div>
          <div data-reveal className="mt-20 flex items-center gap-4">
            <Mark className="h-7 w-auto text-navy" />
            <p className="font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              {site.brandLine}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}

/**
 * CogniAxis card art: operating rooms as nodes, linked by moving signals.
 * Illustrative, not a product image; decorative only.
 */
function ConnectedGraphic() {
  const nodes = [
    { x: 18, y: 30 },
    { x: 50, y: 18 },
    { x: 82, y: 32 },
    { x: 30, y: 72 },
    { x: 70, y: 74 },
  ];
  const hub = { x: 50, y: 50 };
  return (
    <div aria-hidden className="relative aspect-[4/3] overflow-hidden bg-navy">
      <svg viewBox="0 0 100 75" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        {nodes.map((n, k) => (
          <line
            key={k}
            x1={hub.x}
            y1={hub.y * 0.75}
            x2={n.x}
            y2={n.y * 0.75}
            stroke="#6fa3ff"
            strokeOpacity="0.45"
            strokeWidth="0.4"
            strokeDasharray="1.5 1.5"
            className="motion-safe:animate-[dash_1.6s_linear_infinite]"
          />
        ))}
        {nodes.map((n, k) => (
          <g key={`n${k}`}>
            <circle cx={n.x} cy={n.y * 0.75} r="3.2" fill="#0b2558" stroke="#22396a" strokeWidth="0.5" />
            <circle
              cx={n.x}
              cy={n.y * 0.75}
              r="1.1"
              fill="#6fa3ff"
              className="motion-safe:animate-[pulse-dot_2.4s_ease-in-out_infinite]"
              style={{ animationDelay: `${k * 0.4}s`, transformOrigin: `${n.x}px ${n.y * 0.75}px` }}
            />
          </g>
        ))}
        <circle cx={hub.x} cy={hub.y * 0.75} r="7" fill="#0866f4" fillOpacity="0.15" />
        <circle cx={hub.x} cy={hub.y * 0.75} r="4.2" fill="#0866f4" />
      </svg>
      <span className="label absolute bottom-4 left-4 text-blue-300">
        CogniAxis · connected OR
      </span>
    </div>
  );
}
