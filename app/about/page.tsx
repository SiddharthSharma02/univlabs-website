import type { Metadata } from "next";
import { Container, CtaBand, PageHero, SectionHeader } from "@/components/ui";
import { facts, leadership, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "UnivLabs was founded in Gurugram in 2015 to design and build surgical technology in India.",
};

function initials(name: string) {
  return name
    .replace(/^(Prof\.|Dr)\s+/g, "")
    .replace(/^(Dr)\s+/g, "")
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

export default function AboutPage() {
  const allFacts = Object.values(facts);
  return (
    <>
      <PageHero
        eyebrow="About UnivLabs"
        title="Surgical technology, designed and built in India"
        intro="In 2015, Sunil Kumar Singh asked whether India could design and build surgical technology that competes globally. UnivLabs is the answer he set out to build."
      />
      <section className="bg-clinical">
        <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-2">
          <SectionHeader
            eyebrow="Our purpose"
            title={site.purpose}
            intro="Surgery is one of medicine’s most consequential interventions, and access to it is limited by cost and geography. We build equipment that more hospitals can afford, without compromising what surgeons can see."
          />
          <ol data-stagger className="space-y-6 border-l-2 border-line pl-8">
            {[
              ["2015", "Founded in Gurugram by Sunil Kumar Singh, with urologist Prof. Dr Anil Mandhani as co-founder."],
              ["2021", "Launched India’s first indigenously designed and manufactured full 4K endoscope tower."],
              ["Today", `${facts.suites.value} reported installations at ${facts.hospitals.value} hospitals in ${facts.countries.value} countries, ${facts.devices.value} devices supplied, and R&D in ${site.rdSites.join(", ")}.`],
            ].map(([year, text]) => (
              <li key={year} className="relative">
                <span aria-hidden className="absolute -left-[41px] top-2 h-1.5 w-4 rounded-full bg-blue" />
                <p className="label text-blue">{year}</p>
                <p className="mt-1 leading-relaxed text-navy">{text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <section className="bg-paper">
        <Container className="py-16 sm:py-20">
          <SectionHeader
            eyebrow="Leadership"
            title="Clinicians, engineers and operators"
            intro={`${facts.team.value} people across surgical vision, devices, connected data and regulatory.`}
          />
          <ul data-stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((person) => (
              <li key={person.name} className="flex gap-5 rounded-3xl border border-line bg-paper transition-[transform,translate,box-shadow] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(0,26,73,0.2)] p-6">
                <span
                  aria-hidden
                  className="flex size-14 shrink-0 items-center justify-center rounded-full bg-navy font-display font-bold text-clinical"
                >
                  {initials(person.name)}
                </span>
                <div>
                  <p className="font-display text-lg font-bold text-navy">{person.name}</p>
                  <p className="label mt-1 text-blue">{person.role}</p>
                  <p className="mt-2 text-[15px] leading-relaxed">{person.bio}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <section id="facts" className="scroll-mt-20 bg-clinical">
        <Container className="py-16 sm:py-20">
          <SectionHeader
            eyebrow="Facts and sources"
            title="Every number, with where it comes from"
          />
          <div data-reveal className="mt-10 overflow-x-auto rounded-2xl border border-line bg-paper">
            <table className="w-full min-w-[560px] text-left text-[15px]">
              <thead className="bg-mist">
                <tr>
                  <th className="label px-5 py-3 text-navy">Figure</th>
                  <th className="label px-5 py-3 text-navy">What it measures</th>
                  <th className="label px-5 py-3 text-navy">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {allFacts.map((f) => (
                  <tr key={f.label}>
                    <td className="px-5 py-4 font-display font-bold text-navy">{f.value}</td>
                    <td className="px-5 py-4">{f.label}</td>
                    <td className="px-5 py-4 font-mono text-[13px] text-steel">{f.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>
      <CtaBand
        title="Work at UnivLabs"
        body="We hire biomedical, optical, electronics and software engineers in Gurugram and Bengaluru."
        primary={{ href: "/contact?topic=careers", label: "Get in touch" }}
      />
    </>
  );
}
