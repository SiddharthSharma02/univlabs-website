import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact-form";
import { Container, PageHero } from "@/components/ui";
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
              <p className="mt-2 text-navy">{site.legalName}</p>
              <p className="text-navy">{site.city}</p>
              <p className="label mt-3 text-steel">[Full address to confirm]</p>
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
