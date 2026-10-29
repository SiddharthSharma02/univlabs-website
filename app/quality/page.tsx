import type { Metadata } from "next";
import Image from "next/image";
import { Arrow, Container, CtaBand, PageHero, SectionHeader, Todo } from "@/components/ui";

export const metadata: Metadata = {
  title: "Quality and regulatory",
  description:
    "UnivLabs quality management, certifications and regulatory approvals by market.",
};

/** Copied from the certificate (MTIC InterCert, MTIC/MD/1129). */
const iso = {
  pdf: "/documents/univlabs-iso-13485-certificate.pdf",
  image: "/images/certificates/iso-13485-mtic.jpg",
  rows: [
    ["Standard", "ISO 13485:2016"],
    ["Certificate", "MTIC/MD/1129"],
    ["Scope", "Design and development, manufacture, sales, supply and service of endoscopy tower systems and accessories"],
    ["Exclusions", "7.5.5 and 7.5.7 (sterile devices and sterilisation), 7.5.9.2 (implantable devices)"],
    ["Issued by", "MTIC InterCert India Pvt. Ltd."],
    ["First issued", "25 June 2024"],
    ["Valid until", "24 June 2027, subject to periodic audits"],
  ],
};

const certificates = [
  { name: "ISO 13485", scope: "Endoscopy tower systems and accessories", body: "MTIC InterCert", expiry: "24 Jun 2027" },
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
              Regulatory to confirm CDSCO licences and whether CE is held, with
              PDFs and expiry dates. Remove any row UnivLabs does not hold.
            </Todo>
          </div>

          {/* The ISO 13485 certificate, readable and downloadable. */}
          <div className="mt-14 grid gap-8 sm:mt-16 md:grid-cols-[minmax(0,18rem)_1fr] md:items-start md:gap-12">
            <a
              href={iso.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-[1105/1430] w-full max-w-72 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_24px_60px_-28px_rgba(0,26,73,0.35)] transition-[box-shadow,border-color] duration-300 hover:border-blue/50"
            >
              <Image
                src={iso.image}
                alt="ISO 13485:2016 certificate MTIC/MD/1129 issued by MTIC InterCert to UnivLabs Technologies Private Limited"
                fill
                sizes="18rem"
                className="focus-in object-contain"
              />
              <span className="sr-only"> (opens the PDF in a new tab)</span>
            </a>
            <div>
              <p className="label text-blue">ISO 13485 certificate</p>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-navy">
                Quality management system for medical devices
              </h3>
              <dl className="mt-6 divide-y divide-line border-y border-line">
                {iso.rows.map(([k, v]) => (
                  <div key={k} className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
                    <dt className="label text-steel">{k}</dt>
                    <dd className="text-[15px] text-navy">{v}</dd>
                  </div>
                ))}
              </dl>
              <a
                href={iso.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue"
              >
                Download the certificate (PDF) <Arrow />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
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
