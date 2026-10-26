import type { Metadata } from "next";
import { CountUp } from "@/components/motion";
import { Container, CtaBand, PageHero } from "@/components/ui";
import { facts } from "@/content/site";

export const metadata: Metadata = {
  title: "Investors",
  description: "Investor information for UnivLabs Technologies.",
};

export default function InvestorsPage() {
  const highlights = [facts.suites, facts.devices, facts.patents, facts.cogniaxis];
  return (
    <>
      <PageHero
        eyebrow="Investors"
        title="A manufacturer with deployed products and a research pipeline"
        intro="Detailed financials, deployment plans and our model are shared with approved investors on request."
      />
      <section className="bg-clinical">
        <Container className="py-16">
          <div data-stagger className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {highlights.map((f) => (
            <div key={f.label} className="rounded-3xl border border-line bg-paper transition-[transform,translate,box-shadow] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(0,26,73,0.2)] p-6">
              <p className="font-display text-3xl font-bold text-navy sm:text-4xl">
                <CountUp value={f.value} />
              </p>
              <p className="mt-1 text-[15px]">{f.label}</p>
              <p className="label mt-3 text-steel">{f.source}</p>
            </div>
          ))}
          </div>
        </Container>
      </section>
      <CtaBand
        title="Request the investor briefing"
        body="Our team will share materials after a short introduction."
        primary={{ href: "/contact?topic=investor", label: "Contact the founders’ office" }}
      />
    </>
  );
}
