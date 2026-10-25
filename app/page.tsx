import Image from "next/image";
import Link from "next/link";
import { ModeViewer } from "@/components/mode-viewer";
import {
  ButtonLink,
  Container,
  Eyebrow,
  SectionHeader,
  SectionMarker,
  StatusTag,
} from "@/components/ui";
import { families, pipeline } from "@/content/products";
import { proofBar, site, specialties } from "@/content/site";

export default function Home() {
  return (
    <>
      {/* 1. Hero: the surgeon's view comes first. */}
      <section className="bg-navy text-clinical">
        <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
          <div>
            <SectionMarker />
            <p className="label mt-8 text-blue-300">Spectra · 4K 4-chip ICG</p>
            <h1 className="mt-4 font-display text-5xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              See what white light can’t.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fog text-pretty sm:text-xl">
              UnivLabs designs and manufactures 4K ICG surgical vision systems,
              instruments and devices in India, for hospitals that want
              world-class minimally invasive surgery without import-level costs.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/contact?topic=demo">Request a demo</ButtonLink>
              <ButtonLink href="/products/spectra" variant="ghost-light">
                Explore Spectra
              </ButtonLink>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[560px]">
            <ModeViewer />
          </div>
        </Container>
      </section>

      {/* 2. Proof bar, every figure sourced. */}
      <section aria-label="UnivLabs in numbers" className="border-b border-line bg-paper">
        <Container className="grid grid-cols-2 gap-x-6 gap-y-8 py-10 lg:grid-cols-4">
          {proofBar.map((fact) => (
            <div key={fact.label}>
              <p className="font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                {fact.value}
              </p>
              <p className="mt-1 text-[15px] text-ink">{fact.label}</p>
              <p className="label mt-2 text-steel">{fact.source}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* 3. Product families. */}
      <section className="bg-clinical">
        <Container className="py-20 sm:py-24">
          <SectionHeader
            eyebrow="What we make"
            title="Three product families, one masterbrand"
            intro="Every UnivLabs system is designed in-house and built to work with the rest of the operating room."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {families.map((family) => (
              <Link
                key={family.id}
                href={family.href}
                className="group flex flex-col rounded-2xl border border-line border-t-4 border-t-blue bg-paper p-8 transition-shadow hover:shadow-[0_12px_40px_rgba(0,26,73,0.08)]"
              >
                <h3 className="font-display text-xl font-bold text-navy">
                  {family.name}
                </h3>
                <p className="mt-3 flex-1 leading-relaxed">{family.summary}</p>
                <span className="mt-6 text-[15px] font-semibold text-blue group-hover:underline">
                  Explore {family.name}
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Specialties. */}
      <section className="bg-paper">
        <Container className="py-20 sm:py-24">
          <SectionHeader
            eyebrow="By specialty"
            title="Find the system for your department"
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {specialties.map((s) => (
              <Link
                key={s.id}
                href={`/specialties#${s.id}`}
                className="group bg-paper p-8 transition-colors hover:bg-clinical"
              >
                <h3 className="font-display text-lg font-bold text-navy">
                  {s.name}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed">{s.summary}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Ownership. */}
      <section className="bg-clinical">
        <Container className="grid gap-12 py-20 sm:py-24 lg:grid-cols-2 lg:items-center">
          <SectionHeader
            eyebrow="Ownership"
            title="Buy it, or pay for the minutes you use"
            intro="Hospitals can purchase a UnivLabs tower outright, or lease it under Pay Per Minute and pay only for operating time."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-paper p-8">
              <p className="label text-blue">Purchase</p>
              <p className="mt-3 font-display text-xl font-bold text-navy">
                Own the suite
              </p>
              <p className="mt-2 text-[15px] leading-relaxed">
                Configure a full tower or individual components, priced on request.
              </p>
              <Link href="/products/components" className="mt-6 inline-block text-[15px] font-semibold text-blue hover:underline">
                Configure components
              </Link>
            </div>
            <div className="rounded-2xl bg-navy p-8 text-clinical">
              <p className="label text-blue-300">Pay Per Minute</p>
              <p className="mt-3 font-display text-xl font-bold">
                Lease by the minute
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-fog">
                No large upfront cost. Currently closed to new registrations.
              </p>
              <Link href="/pay-per-minute" className="mt-6 inline-block text-[15px] font-semibold text-blue-300 hover:underline">
                How it works
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. Built with surgeons. */}
      <section className="bg-paper">
        <Container className="grid gap-12 py-20 sm:py-24 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-mist">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-steel/40 text-center">
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
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/sufi">Bring us an idea</ButtonLink>
              <ButtonLink href="/products/am-safex" variant="secondary">
                Meet Am-SafeX
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* 7. Quality, regulatory, service. */}
      <section className="bg-clinical">
        <Container className="py-20 sm:py-24">
          <SectionHeader
            eyebrow="Quality and service"
            title="Made, certified and serviced by the same team"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
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
              <div key={item.title} className="rounded-2xl border border-line bg-paper p-8">
                <h3 className="font-display text-lg font-bold text-navy">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed">{item.body}</p>
                <Link href={item.href} className="mt-6 inline-block text-[15px] font-semibold text-blue hover:underline">
                  {item.cta}
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 8. Pipeline, clearly labelled. */}
      <section className="bg-navy text-clinical">
        <Container className="grid gap-12 py-20 sm:py-24 lg:grid-cols-2 lg:items-center">
          <SectionHeader
            dark
            eyebrow="Innovation pipeline"
            title="From capturing surgery to learning from it"
            intro="Solid bars are live today. Dashed bars are research. We say which is which."
          />
          <ol className="space-y-6">
            {pipeline.map((step) => {
              const live = step.status === "available";
              return (
                <li key={step.name} className="flex items-center gap-5">
                  <span
                    aria-hidden
                    className={`h-3 w-28 shrink-0 rounded-full sm:w-40 ${
                      live ? "bg-blue" : "border-2 border-dashed border-fog"
                    }`}
                  />
                  <div>
                    <p className="font-display text-lg font-bold">{step.name}</p>
                    <p className="text-[15px] text-fog">{step.detail}</p>
                    <div className="mt-1">
                      <StatusTag status={step.status} dark />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="lg:col-span-2">
            <Link href="/innovation" className="text-[15px] font-semibold text-blue-300 hover:underline">
              See the full pipeline
            </Link>
          </div>
        </Container>
      </section>

      {/* 9. Doors. */}
      <section className="bg-clinical">
        <Container className="py-20 sm:py-24">
          <div className="grid gap-6 md:grid-cols-3">
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
                className="group rounded-2xl border border-line bg-paper p-8 transition-colors hover:border-navy"
              >
                <Eyebrow tone="steel">{door.who}</Eyebrow>
                <p className="mt-3 font-display text-xl font-bold text-navy group-hover:text-blue">
                  {door.title}
                </p>
                <p className="mt-2 text-[15px] leading-relaxed">{door.body}</p>
              </Link>
            ))}
          </div>
          <div className="mt-16 flex items-center gap-4">
            <Image src="/brand/mark-navy.svg" alt="" width={383} height={367} className="h-6 w-auto" />
            <p className="font-display text-lg font-bold text-navy">{site.brandLine}</p>
          </div>
        </Container>
      </section>
    </>
  );
}
