import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact-form";
import { Arrow, Container, PageHero } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a demo, a brochure or service from UnivLabs.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to UnivLabs"
        intro="Demonstrations, quotations, service, partnerships and research. Tell us what you need and the right team will reply."
      />
      <section className="bg-clinical">
        <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-3xl border border-line bg-paper p-6 sm:p-10">
            <Suspense fallback={<p className="text-steel">Loading form…</p>}>
              <ContactForm />
            </Suspense>
          </div>
          <aside className="space-y-8">
            <div>
              <p className="label text-steel">Service calls</p>
              <a
                href={`mailto:${site.contact.serviceEmail}`}
                className="mt-2 block font-display text-lg font-bold text-navy hover:text-blue"
              >
                {site.contact.serviceEmail}
              </a>
            </div>
            <div>
              <p className="label text-steel">Headquarters</p>
              <address className="mt-2 not-italic leading-relaxed text-navy">
                {site.legalName}
                <br />
                {site.contact.address.street}
                <br />
                {site.contact.address.locality}, {site.contact.address.region}{" "}
                {site.contact.address.postcode}
                <br />
                {site.contact.address.country}
              </address>
              <a
                href={site.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-3 inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue"
              >
                Open in Google Maps <Arrow />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
            <div>
              <p className="label text-steel">R&amp;D</p>
              <p className="mt-2 text-navy">{site.rdSites.join(" · ")}</p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
