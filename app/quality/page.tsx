import type { Metadata } from "next";
import { Container, CtaBand, PageHero, SectionHeader, Todo } from "@/components/ui";

export const metadata: Metadata = {
  title: "Quality and regulatory",
  description:
    "UnivLabs quality management, certifications and regulatory approvals by market.",
};

const certificates = [
  { name: "ISO 13485", scope: "[Scope to confirm]", body: "[Certifying body]", expiry: "[Expiry]" },
  { name: "CDSCO", scope: "[Device classes and licences]", body: "CDSCO, India", expiry: "[Expiry]" },
  { name: "CE", scope: "[If held: devices covered]", body: "[Notified body]", expiry: "[Expiry]" },
];

export default function QualityPage() {
  return (
    <>
      <PageHero
        eyebrow="Quality and regulatory"
        title="Certified design and manufacturing"
        intro="UnivLabs designs and manufactures medical devices under an ISO 13485 quality management system."
      />
      <section className="bg-clinical">
        <Container className="py-16 sm:py-20">
          <SectionHeader
            eyebrow="Certificates"
            title="Approvals by market"
            intro="Tender committees and distributors can download every certificate here."
          />
          <div data-reveal className="mt-10 overflow-x-auto rounded-2xl border border-line bg-paper">
            <table className="w-full min-w-[640px] text-left text-[15px]">
              <thead className="bg-mist">
                <tr>
                  {["Certificate", "Scope", "Issued by", "Valid until"].map((h) => (
                    <th key={h} className="label px-5 py-3 text-navy">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {certificates.map((c) => (
                  <tr key={c.name}>
                    <th className="px-5 py-4 font-semibold text-navy">{c.name}</th>
                    <td className="px-5 py-4">{c.scope}</td>
                    <td className="px-5 py-4">{c.body}</td>
                    <td className="px-5 py-4 font-mono">{c.expiry}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8">
            <Todo>
              Regulatory to supply the certificate list, PDFs and expiry dates.
              Remove any row UnivLabs does not hold.
            </Todo>
          </div>
        </Container>
      </section>
      <section className="bg-paper">
        <Container className="py-16 sm:py-20">
          <SectionHeader
            eyebrow="How we make claims"
            title="Every claim within approved intended use"
            intro="Products are described within their approved intended use. Products in development or research are always labelled as such, and every public claim is reviewed by our Regulatory team."
          />
        </Container>
      </section>
      <CtaBand
        title="Need documents for a tender?"
        body="Our Regulatory team can provide certificates, declarations and IFUs."
        primary={{ href: "/contact?topic=regulatory", label: "Request documents" }}
      />
    </>
  );
}
