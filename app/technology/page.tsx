import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ElectrosurgeryDiagram,
  FluorescenceDiagram,
  FourChipDiagram,
  LightSourceDiagram,
  LoopDiagram,
  ModesDiagram,
  OpticsDiagram,
  UltrasonicDiagram,
  WavelengthScale,
} from "@/components/tech-diagrams";
import {
  Arrow,
  ButtonLink,
  Container,
  CtaBand,
  Eyebrow,
  PageHero,
  StatusTag,
} from "@/components/ui";
import { catalogueItem, type CatalogueParent } from "@/content/catalogue";
import { productBySlug, type Status } from "@/content/products";

/**
 * Adapted from univlabs.in/surgical-vision/technology (live site, 2026).
 * General working principles only: no UnivLabs performance figures. The
 * notes under each topic that limit claims are kept word for word.
 */

export const metadata: Metadata = {
  title: "Surgical technology explained",
  description:
    "How endoscopes, four-chip ICG cameras, fluorescence, insufflators, fluid pumps, electrosurgery and ultrasonic energy work, in plain language.",
};

type Related = { href: string; name: string; status: Status };

const item = (parent: CatalogueParent, slug: string): Related => {
  const c = catalogueItem(parent, slug);
  if (!c) throw new Error(`Unknown catalogue item ${parent}/${slug}`);
  return { href: `/products/${parent}/${slug}`, name: c.name, status: c.status };
};

const product = (slug: string): Related => {
  const p = productBySlug(slug);
  if (!p) throw new Error(`Unknown product ${slug}`);
  return { href: `/products/${slug}`, name: p.name, status: p.status };
};

type Swatch = "white" | "white-dotted" | "fog" | "blue" | "blue-dashed" | "blue-fill" | "green";

type Topic = {
  id: string;
  kicker: string;
  title: string;
  tagline: string;
  body: string;
  terms: [string, string][];
  diagram: ReactNode;
  legend?: { swatch: Swatch; label: string }[];
  /** Kept word for word from the live page. */
  caption?: string;
  notes?: string[];
  related: Related[];
  extra?: ReactNode;
};

const simplified = "Working principle · simplified diagram.";
const sensing =
  "Working principle · simplified diagram. *Sensing and estimation depend on the system design.";

const topics: Topic[] = [
  {
    id: "optics-endoscopes",
    kicker: "Optical engineering",
    title: "Optical technology and endoscopes",
    tagline: "Two light paths. One surgical view.",
    body: "A clear surgical image starts with the scope, not only the monitor. Light from the source travels down the scope to the tissue. Reflected light returns through the lens system to the camera. The scope's angle sets where it looks; its field of view sets how much it sees.",
    terms: [
      ["Illumination", "Light travels towards tissue"],
      ["Image relay", "Reflected light returns to the camera"],
      ["Viewing angle", "Direction of view ≠ field of view"],
    ],
    diagram: <OpticsDiagram />,
    legend: [
      { swatch: "white", label: "Illumination" },
      { swatch: "blue-dashed", label: "Image relay" },
      { swatch: "white-dotted", label: "Direction of view" },
      { swatch: "blue-fill", label: "Field of view" },
    ],
    caption: simplified,
    related: [
      item("components", "endoscopes"),
      item("components", "led-light-source"),
      item("components", "cables-and-tubing"),
    ],
  },
  {
    id: "four-chip-icg-camera",
    kicker: "Camera and signal chain",
    title: "Four-chip ICG camera system",
    tagline: "Sensor count is only the beginning.",
    body: "Understand sensor design, image processing and fluorescence compatibility. The four chips are four image sensors. 4K describes the resolution of the image, not the number of sensors. Detecting ICG fluorescence is a separate requirement again.",
    terms: [
      ["4 chips", "Number of image sensors"],
      ["4K", "Image resolution, not sensor count"],
      ["NIR", "A separate spectral requirement"],
    ],
    diagram: <FourChipDiagram />,
    caption: "Simplified signal chain. Sensor arrangement depends on the camera design.",
    related: [
      product("spectra"),
      item("components", "icg-camera"),
      item("components", "4k-camera"),
    ],
  },
  {
    id: "colour-icg-fluorescence",
    kicker: "Multimodal visualisation",
    title: "Colour, ICG and fluorescence",
    tagline: "See anatomy. Then add another signal.",
    body: "Different views answer different questions. White light shows anatomy in colour. The NIR view shows only the detected fluorescence signal. The overlay places that signal over the colour view, so both read on one screen.",
    terms: [
      ["White light", "Anatomical colour context"],
      ["NIR view", "Detected fluorescence signal"],
      ["Overlay", "Signal placed over the colour view"],
    ],
    diagram: <ModesDiagram />,
    legend: [{ swatch: "green", label: "Detected fluorescence signal" }],
    caption: "Illustration, not a surgical image.",
    related: [product("spectra"), item("components", "icg-camera")],
  },
  {
    id: "icg-light-source",
    kicker: "Spectral compatibility",
    title: "ICG light source and wavelengths",
    tagline: "Excite one band. Detect another.",
    body: "Excitation and detection are two different parts of the optical system. The light source excites the agent; the camera detects what it emits. The source, light cable, scope and detector must be matched to the same bands.",
    terms: [
      ["805 nm", "ICG absorption peak*"],
      ["830 nm", "ICG emission peak*"],
      ["Matched optics", "Source + cable + scope + detector"],
    ],
    diagram: (
      <>
        <LightSourceDiagram />
        <div className="mt-6 border-t border-navy-600 pt-5">
          <WavelengthScale />
        </div>
      </>
    ),
    legend: [
      { swatch: "white", label: "White light" },
      { swatch: "blue-dashed", label: "Near-infrared" },
      { swatch: "green", label: "ICG emission" },
    ],
    caption:
      "Optical principle · actual design may vary. Lenses collect and focus light; the dichroic optic combines the spectral bands. IR is invisible; the dashed line represents its path.",
    notes: [
      "*805 nm and 830 nm are protein-bound ICG reference peaks. These are not LED output specifications.",
    ],
    related: [
      item("components", "nir-light-source"),
      item("components", "led-light-source"),
      item("components", "cables-and-tubing"),
    ],
  },
  {
    id: "how-fluorescence-works",
    kicker: "The science of fluorescence",
    title: "How fluorescence works",
    tagline: "Absorb energy. Emit a new signal.",
    body: "Fluorescence makes an otherwise invisible optical signal visible on screen. A molecule absorbs a photon and rises to a higher energy state. It loses some energy without emitting light, then emits a photon of lower energy. Filters separate that emitted light from the light that excited it.",
    terms: [
      ["Excitation", "A photon supplies energy"],
      ["Relaxation", "Some energy is lost without light"],
      ["Emission", "A lower-energy photon is emitted"],
    ],
    diagram: <FluorescenceDiagram />,
    legend: [
      { swatch: "blue", label: "Absorption" },
      { swatch: "fog", label: "Non-radiative relaxation" },
      { swatch: "green", label: "Fluorescence" },
    ],
    caption: "Energy levels, not anatomy.",
    related: [product("spectra")],
    extra: <Agents />,
  },
  {
    id: "insufflation",
    kicker: "Pressure and flow control",
    title: "How an insufflator works",
    tagline: "Maintain working space, not just flow.",
    body: "Controlled gas delivery creates and maintains the laparoscopic working space. The surgeon sets a target pressure. The controller regulates CO₂ flow as conditions in the abdomen change.",
    terms: [
      ["Pressure", "Measured in mmHg"],
      ["Flow", "Delivered volume per minute"],
      ["Feedback", "Regulation as conditions change"],
    ],
    diagram: (
      <LoopDiagram
        id="dg-insufflator"
        title="Insufflator gas pathway and feedback"
        desc="CO2 supply feeds a controller, which drives gas delivery into the working space. Pressure feedback from the working space returns to the controller."
        steps={[["CO₂ SUPPLY"], ["CONTROLLER"], ["GAS", "DELIVERY"], ["WORKING", "SPACE"]]}
      />
    ),
    legend: [
      { swatch: "white", label: "Gas pathway" },
      { swatch: "blue-dashed", label: "Pressure feedback*" },
    ],
    caption: sensing,
    notes: ["Tubing, filters and ports affect delivery."],
    related: [
      item("components", "insufflator"),
      item("components", "smoke-evacuator"),
    ],
  },
  {
    id: "surgical-fluid-pump",
    kicker: "Fluid management",
    title: "Surgical fluid pumps",
    tagline: "The displayed pressure needs context.",
    body: "Manage irrigation and visualisation with the right system for the procedure. The pump supplies fluid to the field; outflow and suction remove fluid and debris. The pressure on the display depends on how and where the system measures it.",
    terms: [
      ["Inflow", "Fluid supplied to the field"],
      ["Outflow", "Fluid and debris removed"],
      ["Site pressure", "Depends on measurement method"],
    ],
    diagram: (
      <LoopDiagram
        id="dg-pump"
        title="Fluid pump pathway and feedback"
        desc="Fluid supply feeds a pump, which drives inflow regulation into the working space. Pressure feedback from the working space returns to the pump."
        steps={[["FLUID", "SUPPLY"], ["PUMP"], ["INFLOW", "REGULATION"], ["WORKING", "SPACE"]]}
      />
    ),
    legend: [
      { swatch: "white", label: "Fluid pathway" },
      { swatch: "blue-dashed", label: "Pressure feedback*" },
    ],
    caption: sensing,
    notes: ["Outflow and suction also affect site conditions."],
    related: [
      item("components", "universal-medical-pump"),
      item("components", "hysteroscopy-pump"),
      item("components", "arthroscopy-pump"),
      item("components", "uro-pump"),
    ],
  },
  {
    id: "electrosurgery",
    kicker: "Radiofrequency energy",
    title: "Electrosurgery and electrocautery",
    tagline: "Understand the complete current path.",
    body: "Know which energy pathway the instrument uses. In monopolar use, current runs from the active electrode through the patient to a separate return electrode. In bipolar use, both electrodes are on the instrument, so the circuit is local to the tissue between them. Electrocautery uses a heated tip and is not the same circuit.",
    terms: [
      ["Monopolar", "Separate patient return electrode"],
      ["Bipolar", "Two electrodes on the instrument"],
      ["Electrocautery", "A heated tip, not the same circuit"],
    ],
    diagram: <ElectrosurgeryDiagram />,
    legend: [{ swatch: "blue-dashed", label: "Current path" }],
    caption: simplified,
    related: [
      item("hand-instruments", "monopolar-electrodes"),
      item("hand-instruments", "bipolar-forceps"),
    ],
  },
  {
    id: "ultrasonic-harmonic",
    kicker: "Mechanical energy",
    title: "Ultrasonic and harmonic technology",
    tagline: "Electrical input. A vibrating blade.",
    body: "Mechanical vibration provides another way to cut and coagulate tissue. A piezoelectric transducer converts electrical energy into vibration, a waveguide carries it along the shaft, and the blade creates the tissue effect.",
    terms: [
      ["Transducer", "Converts electrical energy"],
      ["Waveguide", "Transfers mechanical vibration"],
      ["Blade", "Creates the tissue effect"],
    ],
    diagram: <UltrasonicDiagram />,
    legend: [
      { swatch: "white", label: "Electrical input" },
      { swatch: "blue", label: "Mechanical vibration" },
    ],
    caption: simplified,
    notes: ["Mechanical vibration is not heat-free."],
    related: [],
  },
];

const agents = [
  {
    label: "NIR / ICG",
    title: "A signal beyond visible light.",
    body: "Near-infrared describes a wavelength range. ICG is a fluorescent agent that can be excited and detected within that range. Depending on the authorised application, it can support visualisation of perfusion or anatomical structures.",
    chain: ["NIR excitation", "ICG fluorescence", "Filtered camera", "Display overlay"],
    note: "Protein-bound ICG has reference absorption and emission peaks near 805 and 830 nm. These are not universal camera or LED specifications.",
    source: {
      label: "IC-GREEN prescribing information",
      href: "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=IC-GREEN",
    },
  },
  {
    label: "Blue-light fluorescence",
    title: "Visible excitation. A different signal.",
    body: "In blue-light cystoscopy, hexaminolevulinate supports the formation of fluorescent porphyrins in tissue. With suitable blue-light illumination and filters, fluorescence appears red against the blue background.",
    chain: ["Blue excitation", "Porphyrin fluorescence", "Filtered view", "White-light review"],
    note: "This is used alongside—not instead of—white-light examination. False signals and missed lesions remain possible. Other blue-light applications require their own agent and system assessment.",
    source: {
      label: "CYSVIEW mechanism and precautions",
      href: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2018/022555s005lbl.pdf",
    },
  },
  {
    label: "CYTALUX® / pafolacianine",
    title: "Targeted molecular fluorescence.",
    body: "CYTALUX is a folate-receptor-targeted optical imaging agent, not a light colour or camera mode. A compatible NIR system detects its fluorescence during specified surgical applications.",
    chain: ["Targeted agent", "NIR excitation", "Compatible detector", "Surgeon interpretation"],
    note: "Its US label covers adjunctive identification of malignant ovarian lesions and malignant or non-malignant pulmonary lesions in adults with known or suspected lung cancer. Fluorescence alone does not establish malignancy.",
    source: {
      label: "CYTALUX prescribing information",
      href: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d21952b9-7c4e-3a56-e053-2a95a90a0ab0",
    },
  },
];

const swatchClass: Record<Swatch, string> = {
  white: "h-0 w-6 border-t-2 border-clinical",
  "white-dotted": "h-0 w-6 border-t-2 border-dotted border-clinical",
  fog: "h-0 w-6 border-t-2 border-fog",
  blue: "h-0 w-6 border-t-2 border-blue-300",
  "blue-dashed": "h-0 w-6 border-t-2 border-dashed border-blue-300",
  "blue-fill": "h-3 w-6 rounded-sm bg-blue-300/40",
  green: "h-0 w-6 border-t-[3px] border-icg",
};

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Surgical vision · Technology"
        title="Surgical technology, clearly explained"
        intro="Understand the science behind the image, the working space and the instrument. Know what to look for before choosing a surgical system."
      >
        <ButtonLink href="#topics" arrow>
          Explore the technology
        </ButtonLink>
      </PageHero>

      <section id="topics" className="scroll-mt-20 border-b border-line bg-paper">
        <Container className="py-10 sm:py-12">
          <ol data-stagger className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((t, i) => (
              <li key={t.id}>
                <Link
                  href={`#${t.id}`}
                  className="group flex items-baseline gap-4 rounded-xl px-3 py-3 text-navy transition-colors hover:bg-clinical"
                >
                  <span className="label text-steel">{pad(i + 1)}</span>
                  <span className="font-display font-bold transition-colors group-hover:text-blue">
                    {t.title}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {topics.map((t, i) => (
        <TopicSection key={t.id} topic={t} index={i} />
      ))}

      <section className="bg-paper">
        <Container className="py-16 sm:py-20">
          <div data-reveal className="max-w-3xl border-l-4 border-navy pl-6">
            <Eyebrow tone="steel">Before you choose</Eyebrow>
            <p className="mt-3 text-lg leading-relaxed text-navy">
              For healthcare professionals. Confirm device compatibility,
              intended use, reprocessing and local approvals. Follow current
              device instructions and appropriate training.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-steel">
              Sources are linked in each guide. Manufacturer examples do not
              establish UnivLabs specifications or imply affiliation.
            </p>
          </div>
        </Container>
      </section>

      <CtaBand
        title="See the imaging modes on a Spectra suite"
        body="Our team can show white light, ICG overlay and NIR views, and answer questions on compatibility."
        primary={{ href: "/contact?topic=demo", label: "Request a demo" }}
        secondary={{ href: "/products", label: "All products" }}
      />
    </>
  );
}

function TopicSection({ topic: t, index }: { topic: Topic; index: number }) {
  const n = pad(index + 1);
  const flip = index % 2 === 1;
  return (
    <section
      id={t.id}
      className={`scroll-mt-20 ${flip ? "bg-paper" : "bg-clinical"}`}
      aria-labelledby={`${t.id}-title`}
    >
      <Container className="py-16 sm:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className={flip ? "lg:order-2" : undefined}>
            <div data-reveal>
              <Eyebrow>
                {n} · {t.kicker}
              </Eyebrow>
              <h2
                id={`${t.id}-title`}
                className="mt-3 font-display text-3xl font-bold tracking-tight text-balance text-navy sm:text-4xl"
              >
                {t.title}
              </h2>
              <p className="mt-3 font-display text-xl font-semibold text-blue">
                {t.tagline}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-pretty">{t.body}</p>
            </div>
            <dl data-stagger className="mt-8 grid gap-3 sm:grid-cols-3">
              {t.terms.map(([term, def]) => (
                <div key={term} className="rounded-2xl border border-line bg-paper p-4">
                  <dt className="font-display text-lg font-bold text-navy">{term}</dt>
                  <dd className="mt-1 text-[14px] leading-snug text-ink">{def}</dd>
                </div>
              ))}
            </dl>
            {t.notes && (
              <div data-reveal="fade" className="mt-6 space-y-2">
                {t.notes.map((note) => (
                  <p key={note} className="text-[14px] leading-relaxed text-steel">
                    <span className="label mr-2 text-steel">Note</span>
                    {note}
                  </p>
                ))}
              </div>
            )}
            {t.related.length > 0 && (
              <div data-reveal="fade" className="mt-8">
                <p className="label text-steel">Related products</p>
                <ul className="mt-3 divide-y divide-line border-y border-line">
                  {t.related.map((r) => (
                    <li key={r.href}>
                      <Link
                        href={r.href}
                        className="group flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-3 text-navy"
                      >
                        <span className="inline-flex items-center gap-2 font-semibold transition-colors group-hover:text-blue">
                          {r.name}
                          <Arrow />
                        </span>
                        <StatusTag status={r.status} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <figure
            data-reveal="scale"
            data-spotlight
            className={`relative overflow-hidden rounded-3xl bg-navy p-5 sm:p-8 lg:sticky lg:top-24 ${
              flip ? "lg:order-1" : ""
            }`}
          >
            <p className="label text-blue-300">
              {n} · {t.kicker}
            </p>
            <div className="mt-5">{t.diagram}</div>
            {t.legend && (
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                {t.legend.map((l) => (
                  <li key={l.label} className="inline-flex items-center gap-2 text-[13px] text-fog">
                    <span aria-hidden className={`block ${swatchClass[l.swatch]}`} />
                    {l.label}
                  </li>
                ))}
              </ul>
            )}
            {t.caption && (
              <figcaption className="mt-4 text-[13px] leading-relaxed text-fog">
                {t.caption}
              </figcaption>
            )}
          </figure>
        </div>
        {t.extra}
      </Container>
    </section>
  );
}

function Agents() {
  return (
    <div className="mt-16">
      <div data-reveal className="max-w-3xl">
        <Eyebrow>Agents and light</Eyebrow>
        <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
          Three fluorescence combinations, not one feature
        </h3>
      </div>
      <div data-stagger className="mt-8 grid gap-6 lg:grid-cols-3">
        {agents.map((a) => (
          <article key={a.label} className="flex flex-col rounded-3xl border border-line bg-paper p-6 sm:p-8">
            <p className="label text-steel">{a.label}</p>
            <h4 className="mt-3 font-display text-xl font-bold text-navy">{a.title}</h4>
            <p className="mt-3 text-[15px] leading-relaxed">{a.body}</p>
            <ol className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2">
              {a.chain.map((step, i) => (
                <li key={step} className="inline-flex items-center gap-2">
                  <span className="rounded-full bg-mist px-3 py-1 text-[13px] text-navy">{step}</span>
                  {i < a.chain.length - 1 && (
                    <span aria-hidden className="text-steel">→</span>
                  )}
                </li>
              ))}
            </ol>
            <p className="mt-5 border-t border-line pt-4 text-[14px] leading-relaxed text-steel">
              {a.note}
            </p>
            <a
              href={a.source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-auto inline-flex items-center gap-2 pt-5 text-[14px] font-semibold text-blue hover:text-blue-600"
            >
              {a.source.label}
              <Arrow />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </article>
        ))}
      </div>
      <p
        data-reveal
        className="mt-8 max-w-4xl rounded-2xl border border-dashed border-steel/60 bg-paper p-6 text-[15px] leading-relaxed text-navy"
      >
        These are different agent–illumination–detector combinations, not
        interchangeable features. Spectra’s ICG capability does not establish
        support for blue-light agents or CYTALUX. Confirm the exact device,
        agent, intended use and local approvals. Fluorescence supplements
        clinical assessment; it does not replace it.
      </p>
    </div>
  );
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}
