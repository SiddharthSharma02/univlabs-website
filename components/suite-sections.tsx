import Link from "next/link";
import type { Product } from "@/content/products";
import { productBySlug } from "@/content/products";
import { Arrow, Container, SectionHeader } from "./ui";

const SUITES = ["spectra", "lumina", "surgistart"] as const;

export const isSuite = (slug: string) => (SUITES as readonly string[]).includes(slug);

/** Rows compared across the three suites, by spec label (first match wins). */
const ROWS: { label: string; from: string[] }[] = [
  { label: "Camera", from: ["Camera"] },
  { label: "Light source", from: ["Light source"] },
  { label: "Monitor", from: ["Monitor", "Integrated monitor"] },
  { label: "Recording", from: ["Recording"] },
  { label: "Insufflation", from: ["Insufflator"] },
  { label: "Fluid management", from: ["Irrigation / suction"] },
];

const value = (p: Product, from: string[]) =>
  p.specs.find((s) => from.includes(s.label))?.value;

/**
 * The three surgical vision suites side by side, from each product's own
 * spec rows. The current suite is highlighted; the others link to theirs.
 */
export function SuiteCompare({ current }: { current: string }) {
  const suites = SUITES.map((s) => productBySlug(s)).filter((p) => p !== undefined);
  return (
    <section className="bg-paper">
      <Container className="py-16 sm:py-24">
        <SectionHeader
          eyebrow="Compare the suites"
          title="Spectra, Lumina or SurgiStart"
          intro="Spectra adds NIR/ICG imaging; Lumina focuses on native 4K white light; SurgiStart offers a compact mobile format with HD and 4K configurations."
        />
        <div data-reveal className="mt-10 overflow-x-auto rounded-3xl border border-line">
          <table className="w-full min-w-[40rem] border-separate border-spacing-0 text-left sm:min-w-[44rem]">
            <caption className="sr-only">Comparison of UnivLabs surgical vision suites</caption>
            <thead>
              <tr>
                <td className="sticky left-0 z-10 w-28 border-b border-r border-line bg-clinical sm:static sm:w-40 sm:border-r-0" />
                {suites.map((p) => {
                  const on = p.slug === current;
                  return (
                    <th
                      key={p.slug}
                      scope="col"
                      className={`border-b border-line px-5 py-5 align-bottom ${on ? "bg-navy text-clinical" : "bg-clinical"}`}
                    >
                      <span className={`label block ${on ? "text-blue-300" : "text-steel"}`}>
                        {on ? "You are viewing" : p.descriptor}
                      </span>
                      {on ? (
                        <span className="mt-1 block font-display text-xl font-bold">{p.name}</span>
                      ) : (
                        <Link
                          href={`/products/${p.slug}`}
                          className="group mt-1 inline-flex items-center gap-1.5 font-display text-xl font-bold text-navy hover:text-blue"
                        >
                          {p.name} <Arrow />
                        </Link>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {ROWS.filter((r) => suites.some((p) => value(p, r.from))).map((r) => (
                <tr key={r.label} className="group/row">
                  <th scope="row" className="label sticky left-0 z-10 w-28 border-b border-r border-line bg-clinical px-3 py-4 text-[11px] font-normal text-steel sm:static sm:w-40 sm:border-r-0 sm:px-5 sm:text-[13px]">
                    {r.label}
                  </th>
                  {suites.map((p) => {
                    const v = value(p, r.from);
                    const on = p.slug === current;
                    return (
                      <td
                        key={p.slug}
                        className={`border-b border-line px-4 py-4 font-mono text-[13px] transition-colors sm:px-5 sm:text-[14px] ${
                          on ? "bg-navy/[0.04] text-navy" : "text-ink group-hover/row:bg-clinical"
                        }`}
                      >
                        {v ?? <span className="text-steel">Not in the listed configuration</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="label mt-3 text-steel">
          <span className="sm:hidden">Swipe the table to compare · </span>
          Source · univlabs.in, 2026. The signed quotation governs.
        </p>
      </Container>
    </section>
  );
}

const STEPS = [
  {
    title: "Demonstration",
    body: "Evaluate the imaging modes and recording output using the exact configuration proposed for your institution.",
  },
  {
    title: "Installation and service",
    body: "Confirm power, space, compatible accessories, training, service coverage and warranty terms before purchase.",
  },
  {
    title: "Commercial options",
    body: "Request a purchase quotation. Pay Per Minute availability is subject to the programme’s current offer status.",
  },
];

/** "Before you buy" steps and the product's FAQs. */
export function BeforeYouBuy({ product }: { product: Product }) {
  return (
    <section className="bg-clinical">
      <Container className="grid gap-14 py-16 sm:py-24 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div>
          <SectionHeader eyebrow="Before you buy" title="See it. Confirm it. Configure it." />
          <ol data-stagger className="mt-10 space-y-3">
            {STEPS.map((s, n) => (
              <li key={s.title} className="relative flex gap-5 rounded-3xl border border-line bg-paper p-6">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-navy font-display font-bold text-clinical">
                  {n + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-navy">{s.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        {product.faqs && product.faqs.length > 0 && (
          <div>
            <SectionHeader eyebrow="Questions" title="What to confirm" />
            <FaqList faqs={product.faqs} className="mt-10" />
          </div>
        )}
      </Container>
    </section>
  );
}

/** Questions that open in place. Works without JavaScript (<details>). */
export function FaqList({
  faqs,
  className = "",
}: {
  faqs: { q: string; a: string }[];
  className?: string;
}) {
  return (
    <div data-stagger className={`divide-y divide-line border-y border-line ${className}`}>
      {faqs.map((f) => (
        <details key={f.q} className="group/faq">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg font-bold text-navy transition-colors hover:text-blue [&::-webkit-details-marker]:hidden">
            {f.q}
            <span
              aria-hidden
              className="relative size-5 shrink-0 before:absolute before:inset-x-0 before:top-1/2 before:h-0.5 before:-translate-y-1/2 before:rounded-full before:bg-current after:absolute after:inset-y-0 after:left-1/2 after:w-0.5 after:-translate-x-1/2 after:rounded-full after:bg-current after:transition-transform after:duration-300 group-open/faq:after:scale-y-0"
            />
          </summary>
          <p className="pb-6 pr-10 text-[15px] leading-relaxed">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/** Buyer's guide from univlabs.in/surgical-vision (2026). */
export const buyersGuide = [
  {
    q: "What equipment is included in a laparoscopy system?",
    a: "A complete laparoscopy system can include a surgical camera and camera head, light source, medical monitor, laparoscope, CO₂ insufflator, suction and irrigation pump, recorder and equipment cart. The final configuration depends on the procedure mix and hospital workflow.",
  },
  {
    q: "Does UnivLabs offer a 4K ICG surgical camera system?",
    a: "Yes. Spectra combines native 4K surgical imaging with real-time NIR and ICG fluorescence modes for eligible fluorescence-guided procedures.",
  },
  {
    q: "Which UnivLabs system is designed for portable deployment?",
    a: "SurgiStart is a compact, all-in-one visualisation suite designed for diagnostic and selected surgical workflows where mobility and rapid setup matter.",
  },
  {
    q: "How should hospitals compare UnivLabs with German, American or Japanese systems?",
    a: "Compare the clinical imaging requirement, 4K and fluorescence modes, system configuration, interoperability, service coverage, training, commercial model and applicable regulatory status, whichever country the system comes from.",
  },
  {
    q: "Can I request laparoscopy equipment pricing or a demonstration?",
    a: "Yes. Hospitals, surgeons and distributors can use the enquiry form to request a configuration review, product demonstration and institution-specific commercial proposal.",
  },
];
