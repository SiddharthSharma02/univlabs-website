import type { Metadata } from "next";
import { Container, CtaBand, PageHero, SectionHeader, Todo } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Service and support",
  description:
    "UnivLabs service: one-button service requests, installation, training and maintenance.",
};

export default function ServicePage() {
  return (
    <>
      <PageHero
        eyebrow="Service"
        title="Service from the team that built it"
        intro="Our one-button service request model is designed for proactive service and maintenance, so your tower stays in the operating room."
      />
      <section className="bg-clinical">
        <Container className="py-16 sm:py-20">
          <SectionHeader eyebrow="What we cover" title="From installation to maintenance" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              ["Installation and training", "Commissioning and hands-on training for surgeons, nurses and biomedical engineers."],
              ["One-button service request", "Raise a service call quickly and track it to resolution."],
              ["Maintenance", "Preventive maintenance to keep every system in service."],
            ].map(([t, b]) => (
              <div key={t} className="rounded-2xl border border-line bg-paper p-8">
                <h3 className="font-display text-lg font-bold text-navy">{t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Todo>Confirm response times, service coverage by region and how OBSR is triggered.</Todo>
          </div>
        </Container>
      </section>
      <section className="bg-paper">
        <Container className="py-16">
          <p className="label text-steel">Raise a service call</p>
          <a
            href={`mailto:${site.contact.serviceEmail}?subject=Service%20call`}
            className="mt-3 inline-block font-display text-2xl font-bold text-navy hover:text-blue sm:text-3xl"
          >
            {site.contact.serviceEmail}
          </a>
        </Container>
      </section>
      <CtaBand
        title="Need training for a new team?"
        body="We run on-site training for new staff and new configurations."
        primary={{ href: "/contact?topic=service", label: "Contact service" }}
      />
    </>
  );
}
