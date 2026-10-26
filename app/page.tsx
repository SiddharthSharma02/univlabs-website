import Image from "next/image";
import Link from "next/link";
import { ViewTransition, type CSSProperties } from "react";
import { SpecialtyExplorer } from "@/components/specialty-explorer";
import { NirLens } from "@/components/nir-lens";
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
  Words,
} from "@/components/ui";
import { pipeline, productBySlug } from "@/content/products";
import { facts, proofBar, site } from "@/content/site";

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
            <p data-scramble className="rise label mt-8 text-blue-300" style={i(1)}>
              Spectra · 4K 4-chip ICG
            </p>
            <h1 className="mt-4 font-display text-5xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              <span className="block">
                <Words text="See what" delay={260} />
              </span>
              <span className="block">
                <Words text="white light" start={2} delay={260} />{" "}
                <span className="relative whitespace-nowrap">
                  <Words text="can’t." start={4} delay={260} />
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-1.5 w-full origin-left rounded-full bg-blue-300 motion-safe:animate-[fill-bar_1.2s_var(--ease-out-soft)_1s_both]"
                  />
                </span>
              </span>
            </h1>
            <p
              className="rise mt-8 max-w-xl text-lg leading-relaxed text-fog text-pretty sm:text-xl"
              style={i(4)}
            >
              UnivLabs designs and makes 4K ICG laparoscopy suites,
              instruments and devices in Gurugram, and the same team installs
              and services them.
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

      {/* 3. What we make: one bento, every family. */}
      <section className="bg-clinical">
        <Container className="py-20 sm:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              eyebrow="What we make"
              title="From the 4K camera to the catheter"
              intro="Every UnivLabs system is designed in-house and built to work with the rest of the operating room."
            />
            <div data-reveal>
              <ButtonLink href="/products" variant="secondary" arrow>
                All products
              </ButtonLink>
            </div>
          </div>

          <div
            data-stagger
            className="mt-12 grid auto-rows-[minmax(15rem,auto)] gap-4 md:grid-cols-6"
          >
            {/* Spectra, the lead product. */}
            <div className="md:col-span-6 lg:col-span-4 lg:row-span-2">
              <Link
                href="/products/spectra"
                data-tilt
                className="group relative grid h-full overflow-hidden rounded-3xl bg-navy text-clinical sm:grid-cols-2"
                data-spotlight
              >
                <div className="relative flex flex-col p-8 sm:p-10">
                  <p data-scramble className="label text-blue-300">
                    Surgical Vision · Lead suite
                  </p>
                  <h3 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                    Spectra
                  </h3>
                  <p className="mt-2 text-lg text-fog">4K ICG surgical vision suite</p>
                  <ul className="mt-8 space-y-3">
                    {[
                      ["White light", "bg-clinical"],
                      ["ICG overlay", "bg-icg"],
                      ["NIR", "bg-icg"],
                    ].map(([mode, bar]) => (
                      <li key={mode} className="flex items-center gap-3">
                        <span aria-hidden className={`h-1.5 w-8 rounded-full ${bar}`} />
                        <span className="label text-clinical">{mode}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-center justify-between gap-4 pt-10">
                    <StatusTag status="available" dark />
                    <span className="flex size-11 items-center justify-center rounded-full bg-blue text-paper transition-transform duration-500 group-hover:rotate-45">
                      <Arrow />
                    </span>
                  </div>
                </div>
                <div className="relative min-h-72 overflow-hidden">
                  <Image
                    src="/images/footage/icg-overlay.jpg"
                    alt="ICG fluorescence overlay on a laparoscopic view, from a UnivLabs camera"
                    fill
                    sizes="(min-width: 1024px) 400px, 100vw"
                    className="object-cover transition-[scale] duration-1000 ease-[var(--ease-out-soft)] group-hover:scale-105"
                  />
                  <span aria-hidden className="absolute inset-0 bg-linear-to-r from-navy via-navy/10 to-transparent max-sm:bg-linear-to-b" />
                  <span className="label absolute bottom-4 right-4 rounded-full bg-navy/75 px-3 py-1.5 text-clinical backdrop-blur">
                    Real footage
                  </span>
                </div>
              </Link>
            </div>

            {(["lumina", "surgistart"] as const).map((slug) => (
              <div key={slug} className="md:col-span-3 lg:col-span-2">
                <ProductTile slug={slug} />
              </div>
            ))}
            {(["components", "hand-instruments", "am-safex"] as const).map((slug) => (
              <div key={slug} className="md:col-span-2">
                <ProductTile slug={slug} />
              </div>
            ))}

            {/* CogniAxis: connects the operating room. */}
            <div className="md:col-span-6 lg:col-span-4">
              <Link
                href="/connected-or"
                data-tilt
                className="group grid h-full overflow-hidden rounded-3xl bg-navy text-clinical sm:grid-cols-[1fr_1.1fr]"
              >
                <div className="flex flex-col p-8">
                  <p data-scramble className="label text-blue-300">CogniAxis · Connected OR</p>
                  <p className="mt-6 font-display text-5xl font-bold tracking-tight text-icg">
                    <CountUp value={facts.cogniaxis.value} />
                  </p>
                  <p className="mt-2 text-fog">{facts.cogniaxis.label}</p>
                  <p className="label mt-2 text-fog/80">{facts.cogniaxis.source}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-8 text-[15px] font-semibold text-blue-300">
                    Stream, record and teach <Arrow />
                  </span>
                </div>
                <ConnectedGraphic />
              </Link>
            </div>

            {/* Help choosing. */}
            <div className="md:col-span-6 lg:col-span-2">
              <Link
                href="/contact?topic=demo"
                className="group flex h-full flex-col justify-between rounded-3xl border-2 border-dashed border-line bg-paper p-8 transition-colors duration-300 hover:border-blue"
              >
                <p className="label text-steel">Not sure what fits?</p>
                <div>
                  <p className="font-display text-2xl font-bold text-navy">
                    We will configure the tower with you
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue">
                    Request a demo <Arrow />
                  </span>
                </div>
              </Link>
            </div>
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
              title="One field, seen in near-infrared"
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
            <NirLens dark />
          </div>
        </Container>
      </section>

      {/* 5. Specialties. */}
      <section className="bg-paper">
        <Container className="py-20 sm:py-28">
          <SectionHeader
            eyebrow="By specialty"
            title="Find the system for your department"
          />
          <div className="mt-12">
            <SpecialtyExplorer />
          </div>
        </Container>
      </section>

      {/* 6. Ownership. */}
      <section className="bg-clinical">
        <Container className="grid gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:items-center">
          <SectionHeader
            eyebrow="Ownership"
            title="Buy it, or pay for the minutes you use"
            intro="Hospitals can purchase a UnivLabs tower outright, or lease it under Pay Per Minute and pay for the minutes you operate."
          />
          <div data-stagger className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/products/components"
              className="group rounded-3xl border border-line bg-paper p-8 transition-[transform,translate,box-shadow] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(0,26,73,0.25)]"
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
                Lease instead of a large upfront purchase. Closed to new registrations.
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue-300">
                How it works <Arrow />
              </span>
            </Link>
          </div>
        </Container>
      </section>

      {/* 7. Built with surgeons. */}
      <section className="bg-paper">
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
      <section className="border-y border-line bg-clinical">
        <Container className="py-20 sm:py-24">
          <SectionHeader
            eyebrow="Quality and service"
            title="Made, certified and serviced by the same team"
          />
          <div
            data-stagger
            className="mt-12 grid divide-y divide-line border-y border-line md:grid-cols-3 md:divide-x md:divide-y-0"
          >
            {[
              {
                k: "ISO 13485",
                title: "Certified manufacturing",
                body: "Medical device quality management across design and production.",
                href: "/quality",
                cta: "Quality and regulatory",
              },
              {
                k: "One button",
                title: "Service requests",
                body: "Raise a service call in one step and track it to resolution.",
                href: "/service",
                cta: "Service",
              },
              {
                k: site.rdSites.length + " R&D sites",
                title: "Designed in India",
                body: `Headquartered in Gurugram, with R&D in ${site.rdSites.join(", ")}.`,
                href: "/about",
                cta: "About UnivLabs",
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group relative py-8 transition-colors duration-300 hover:bg-paper md:px-8 md:first:pl-0 md:hover:first:pl-8 md:first:transition-[padding,background-color]"
              >
                <p className="font-display text-3xl font-bold tracking-tight text-navy">{item.k}</p>
                <h3 className="label mt-3 text-steel">{item.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed">{item.body}</p>
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
              intro="Solid bars are live today. Dashed bars are not yet available. We always say which is which."
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
      <section className="bg-paper">
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
                className="group rounded-3xl border border-line bg-clinical p-8 transition-[transform,translate,border-color,box-shadow] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-navy hover:shadow-[0_20px_50px_-20px_rgba(0,26,73,0.2)]"
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
        </Container>
      </section>
    </>
  );
}

/** A product in the bento: photo on white, name, descriptor, status. */
function ProductTile({ slug }: { slug: string }) {
  const p = productBySlug(slug);
  if (!p) return null;
  return (
    <Link
      href={`/products/${p.slug}`}
      data-tilt
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-paper transition-[border-color,box-shadow] duration-500 hover:border-blue/40 hover:shadow-[0_24px_60px_-24px_rgba(0,26,73,0.3)]"
    >
      {p.image ? (
        <ViewTransition name={`product-${p.slug}`} share="morph" default="none">
          <ProductImage
            image={p.image}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="aspect-[4/3] flex-1"
          />
        </ViewTransition>
      ) : (
        <div className="relative aspect-[4/3] flex-1 bg-mist">
          <div className="absolute inset-5 flex items-center justify-center rounded-2xl border-2 border-dashed border-steel/40">
            <p className="label text-steel">Photo to commission</p>
          </div>
        </div>
      )}
      <div className="flex items-end justify-between gap-4 border-t border-line p-6">
        <div>
          <h3 className="font-display text-xl font-bold text-navy transition-colors group-hover:text-blue">
            {p.name}
          </h3>
          <p className="mt-1 text-[14px]">{p.descriptor}</p>
          <div className="mt-3">
            <StatusTag status={p.status} />
          </div>
        </div>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-navy transition-colors group-hover:border-blue group-hover:bg-blue group-hover:text-paper">
          <Arrow />
        </span>
      </div>
    </Link>
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
    <div aria-hidden className="relative min-h-56 overflow-hidden bg-navy">
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
    </div>
  );
}
