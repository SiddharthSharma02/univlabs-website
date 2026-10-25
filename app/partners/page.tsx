import type { Metadata } from "next";
import { Container, CtaBand, PageHero, SectionHeader, Todo } from "@/components/ui";

export const metadata: Metadata = {
  title: "Partner programme",
  description:
    "Become an authorised UnivLabs distributor or clinical partner.",
};

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partner programme"
        title="Carry UnivLabs in your market"
        intro="We work with authorised distributors and clinical partners to bring UnivLabs systems to more hospitals."
      />
      <section className="bg-clinical">
        <Container className="py-16 sm:py-20">
          <SectionHeader eyebrow="What partners get" title="Everything you need to sell and support" />
          <div data-stagger className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              ["Training", "Product and clinical applications training for your sales and service teams."],
              ["Documentation", "Certificates, IFUs, datasheets and brand templates."],
              ["Support", "Direct access to UnivLabs service and regulatory teams."],
            ].map(([t, b]) => (
              <div key={t} className="rounded-3xl border border-line bg-paper transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(0,26,73,0.2)] p-8">
                <h3 className="font-display text-lg font-bold text-navy">{t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Todo>Add the list of authorised partners by region, and partner terms.</Todo>
          </div>
        </Container>
      </section>
      <CtaBand
        title="Apply to become a partner"
        body="Tell us about your company, markets and specialties."
        primary={{ href: "/contact?topic=partner", label: "Apply" }}
      />
    </>
  );
}
