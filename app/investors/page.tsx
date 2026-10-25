import type { Metadata } from "next";
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
        <Container className="grid grid-cols-2 gap-6 py-16 lg:grid-cols-4">
          {highlights.map((f) => (
            <div key={f.label} className="rounded-2xl border border-line bg-paper p-6">
              <p className="font-display text-3xl font-bold text-navy">{f.value}</p>
              <p className="mt-1 text-[15px]">{f.label}</p>
              <p className="label mt-3 text-steel">{f.source}</p>
            </div>
          ))}
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
