import type { Metadata } from "next";
import Link from "next/link";
import {
  Arrow,
  ButtonLink,
  Container,
  CtaBand,
  PageHero,
  ProductImage,
  SectionHeader,
  StatusTag,
  Steps,
  Todo,
} from "@/components/ui";
import { productBySlug } from "@/content/products";

export const metadata: Metadata = {
  title: "Pay Per Minute",
  description:
    "Bring Spectra or Lumina to your hospital with an advance instead of the full purchase price, then pay in line with the minutes you operate.",
};

/*
  Source: univlabs.in/pay-per-minute (October 2026). Plan figures are not
  public: UnivLabs shares them after a meeting, through a staff-issued
  access code. This page explains the model and sends the visitor to sales.
*/
const PLAN = "https://www.univlabs.in/pay-per-minute/details";
const CUSTOMERS = "https://www.univlabs.in/pay-per-minute/status";
const MEETING = "/contact?topic=ppm";

/** What a hospital needs to start. Figures stay with the sales team. */
const minimum = [
  {
    k: "An advance",
    v: "Paid at the start, in place of the full equipment purchase price. The amount is set in your written offer.",
  },
  {
    k: "A usage-linked plan",
    v: "Billing follows the minutes you operate, sized to your surgical workload.",
  },
  {
    k: "A written agreement",
    v: "Availability, eligibility, charges and ownership are set in a written offer and agreement.",
  },
];

export default function PayPerMinutePage() {
  const systems = (["spectra", "lumina"] as const)
    .map((slug) => productBySlug(slug))
    .filter((p) => p !== undefined);

  return (
    <>
      <PageHero
        eyebrow="Pay Per Minute"
        title="Pay for the minutes you operate"
        intro="Bring a UnivLabs surgical vision suite to your hospital with an advance instead of the full purchase price. Then pay in line with how much you operate, on a path to owning the system."
      >
        <ButtonLink href={MEETING} arrow>
          Request a meeting
        </ButtonLink>
        <ButtonLink href="#how-it-works" variant="ghost-light">
          How it works
        </ButtonLink>
      </PageHero>

      {/* The model in three lines. */}
      <section id="how-it-works" className="scroll-mt-20 bg-clinical">
        <Container className="py-16 sm:py-20">
          <SectionHeader
            eyebrow="The model"
            title="Less upfront, billed by use, owned over time"
          />
          <dl className="mt-8 grid border-t border-line sm:mt-10 md:grid-cols-3 md:gap-8 md:border-t-0">
            {[
              ["Less upfront", "Start with an advance instead of paying the full equipment purchase price."],
              ["Billed by use", "Usage-linked billing follows the minutes you operate, so cost tracks your surgical workload."],
              ["A path to ownership", "Eligible payments count toward owning your system. Our team explains how in your meeting."],
            ].map(([k, v]) => (
              <div key={k} className="border-b border-line py-5 md:border-b-0 md:border-t-2 md:border-t-blue md:pt-6">
                <dt className="font-display text-xl font-bold text-navy">{k}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed">{v}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Only the minimum. The full plan is shared after the meeting. */}
      <section className="bg-paper">
        <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <SectionHeader
            eyebrow="Minimum to start"
            title="What your hospital needs"
            intro="The full plan, with charges and terms, is shared privately after you meet our team."
          />
          <div>
            <ul className="divide-y divide-line border-y border-line">
              {minimum.map((m) => (
                <li key={m.k} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <p className="label text-blue">{m.k}</p>
                  <p className="text-[15px] leading-relaxed text-navy">{m.v}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Todo>
                Sales to confirm the minimum figures to publish, if any (advance
                amount or share, and minimum minutes or cases a month). Until
                then this section names the requirements without numbers.
              </Todo>
            </div>
          </div>
        </Container>
      </section>

      {/* Which systems. */}
      <section className="bg-clinical">
        <Container className="py-16 sm:py-20">
          <SectionHeader
            eyebrow="Systems on the plan"
            title="Spectra or Lumina"
            intro="Not sure which fits? Our team will help you choose in the meeting."
          />
          <ul className="mt-8 grid border-t border-line sm:mt-10 sm:grid-cols-2 sm:gap-6 sm:border-t-0">
            {systems.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="group flex items-center gap-4 border-b border-line py-4 sm:rounded-3xl sm:border sm:bg-paper sm:p-5"
                >
                  {p.image && (
                    <ProductImage
                      image={p.image}
                      sizes="112px"
                      pad="p-2"
                      className="aspect-square w-24 shrink-0 rounded-2xl border border-line sm:w-28"
                      labelClassName="bottom-1.5 left-1.5 px-1.5 py-0.5 text-[9px]"
                    />
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-3 font-display text-xl font-bold text-navy group-hover:text-blue">
                      {p.name}
                      <Arrow className="size-5 text-blue" />
                    </span>
                    <span className="mt-1 block text-[14px]">{p.descriptor}</span>
                    <span className="mt-3 block">
                      <StatusTag status={p.status} />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* From enquiry to registration. */}
      <section className="bg-paper">
        <Container className="py-16 sm:py-20">
          <SectionHeader
            eyebrow="How to start"
            title="Start with a conversation"
            intro="Understand the plan first. Decide when you are ready."
          />
          <Steps
            className="md:grid-cols-4"
            pad="md:p-6"
            steps={[
              ["01", "Request a meeting", "Tell us about your hospital and a time that suits you."],
              ["02", "Meet our team", "We walk you through the equipment, suitability, commercials and next steps."],
              ["03", "Review your plan", "Use the access code our team issues to view your plan privately."],
              ["04", "Register when ready", "Accept the written offer and agreement. Then we install and train your team."],
            ]}
          />
          <div className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-2">
            <div>
              <p className="label text-steel">Already met our team?</p>
              <a
                href={PLAN}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-2 inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue"
              >
                Enter your plan access code <Arrow />
                <span className="sr-only"> (opens univlabs.in in a new tab)</span>
              </a>
            </div>
            <div>
              <p className="label text-steel">Already registered?</p>
              <a
                href={CUSTOMERS}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-2 inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue"
              >
                Existing customer login <Arrow />
                <span className="sr-only"> (opens univlabs.in in a new tab)</span>
              </a>
              <p className="mt-1 text-[14px] text-steel">
                Your records and agreed terms stay as they are. Please don’t register or pay again.
              </p>
            </div>
          </div>
          <p className="label mt-8 text-steel">
            Availability, eligibility, charges and ownership are subject to a written offer and agreement.
          </p>
        </Container>
      </section>

      <CtaBand
        title="Talk to us about Pay Per Minute"
        body="No payment now and no obligation to proceed. Our team will confirm a time and explain the plan."
        primary={{ href: MEETING, label: "Request a meeting" }}
        secondary={{ href: "/products", label: "Purchase options" }}
      />
    </>
  );
}
