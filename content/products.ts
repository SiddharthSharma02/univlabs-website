/**
 * Product catalogue. Claims policy (brand book, Part 4):
 * - "available": claim only within approved intended use.
 * - "development": label every mention; no performance figures or dates.
 * - "research": describe the question being studied.
 *
 * Fields marked TODO are placeholders. Never invent specifications here;
 * get them from the product team and Regulatory.
 */

export type Status = "available" | "development" | "research";

export type Family = "surgical-vision" | "instruments" | "cogniaxis";

export type Product = {
  slug: string;
  name: string;
  family: Family;
  status: Status;
  descriptor: string;
  headline: string;
  summary: string;
  highlights: { title: string; body: string }[];
  /** Spec rows. Leave empty until confirmed specs arrive. */
  specs: { label: string; value: string }[];
  image?: { src: string; alt: string };
  todo?: string;
};

export const families: {
  id: Family;
  name: string;
  summary: string;
  href: string;
}[] = [
  {
    id: "surgical-vision",
    name: "Surgical Vision",
    summary:
      "4K laparoscopy suites with ICG fluorescence, and the cameras, light sources, pumps and insufflators that complete the tower.",
    href: "/products#surgical-vision",
  },
  {
    id: "instruments",
    name: "Instruments & Devices",
    summary:
      "Hand instruments for minimally invasive surgery and Am-SafeX, a patented catheter developed with urologists.",
    href: "/products#instruments",
  },
  {
    id: "cogniaxis",
    name: "CogniAxis",
    summary:
      "Connects the operating room: stream live surgery to authorised colleagues, record and store cases, and teach from them.",
    href: "/connected-or",
  },
];

export const products: Product[] = [
  {
    slug: "spectra",
    name: "Spectra",
    family: "surgical-vision",
    status: "available",
    descriptor: "4K ICG surgical vision suite",
    headline: "See what white light can’t.",
    summary:
      "Spectra pairs a 4K 4-chip camera with ICG fluorescence imaging, so surgeons can switch between white light, a fluorescence overlay and near-infrared views of the same field.",
    highlights: [
      {
        title: "Three views, one camera",
        body: "White light, ICG overlay and NIR monochrome from a single 4-chip camera head.",
      },
      {
        title: "Complete tower",
        body: "Camera, ICG light source, insufflator, pumps and recorder, designed to work together.",
      },
      {
        title: "Connected",
        body: "Ready for CogniAxis streaming, recording and case review.",
      },
    ],
    specs: [
      { label: "Resolution", value: "4K" },
      { label: "Sensor", value: "4-chip" },
      { label: "Imaging modes", value: "White light · ICG overlay · NIR" },
    ],
    image: {
      src: "/images/footage/icg-overlay.jpg",
      alt: "Laparoscopic view of the gallbladder with ICG fluorescence shown in green",
    },
    todo: "Add the full spec sheet and intended-use statement from the product team.",
  },
  {
    slug: "lumina",
    name: "Lumina",
    family: "surgical-vision",
    status: "available",
    descriptor: "Surgical vision suite",
    headline: "[Lumina headline to confirm]",
    summary:
      "[Lumina positioning to confirm: who it is for and how it differs from Spectra and SurgiStart.]",
    highlights: [],
    specs: [],
    todo: "Need Lumina positioning, configuration and specs.",
  },
  {
    slug: "surgistart",
    name: "SurgiStart",
    family: "surgical-vision",
    status: "available",
    descriptor: "Surgical vision suite",
    headline: "[SurgiStart headline to confirm]",
    summary:
      "[SurgiStart positioning to confirm: the intended hospital profile and configuration.]",
    highlights: [],
    specs: [],
    todo: "Need SurgiStart positioning, configuration and specs.",
  },
  {
    slug: "components",
    name: "Components",
    family: "surgical-vision",
    status: "available",
    descriptor: "Standalone equipment and accessories",
    headline: "Build the operating room one system at a time.",
    summary:
      "Every part of the UnivLabs tower is also available on its own. Our team confirms compatibility, configuration and regulatory availability before supply.",
    highlights: [
      { title: "Imaging", body: "4K camera, 4K ICG camera, medical recorder." },
      {
        title: "Illumination and optics",
        body: "ICG light source, fibre-optic cable, endoscopes in 2.9, 4, 5 and 10 mm.",
      },
      {
        title: "Insufflation and air",
        body: "CO₂ insufflator and smoke evacuator.",
      },
      {
        title: "Fluid management",
        body: "Medical pump, Universal Medical Pump, hysteroscopy pump, arthroscopy pump, irrigation and suction tubing.",
      },
    ],
    specs: [],
  },
  {
    slug: "hand-instruments",
    name: "Hand instruments",
    family: "instruments",
    status: "available",
    descriptor: "Laparoscopic hand instruments",
    headline: "[Hand instruments headline to confirm]",
    summary:
      "[Range overview to confirm: graspers, scissors, needle holders, trocars and so on, with sizes.]",
    highlights: [],
    specs: [],
    todo: "Need the hand instrument catalogue.",
  },
  {
    slug: "am-safex",
    name: "Am-SafeX",
    family: "instruments",
    status: "available",
    descriptor: "Patented catheter",
    headline: "A catheter that began as a urologist’s problem.",
    summary:
      "Am-SafeX is a patented catheter developed at UnivLabs with practising urologists. [Intended use, in approved wording.]",
    highlights: [
      {
        title: "Visible markers",
        body: "[Describe how the markers guide placement, in approved wording.]",
      },
      {
        title: "Developed with urologists",
        body: "Built from a clinical problem raised in the operating room.",
      },
      {
        title: "Patented design",
        body: "[Add patent number and jurisdiction.]",
      },
    ],
    specs: [],
    todo: "Need approved intended use, sizes, patent number and regulatory status by market.",
  },
];

export const productBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const productsInFamily = (family: Family) =>
  products.filter((p) => p.family === family);

export const pipeline = [
  {
    name: "Capture",
    detail: "4K ICG surgical vision",
    status: "available" as Status,
  },
  {
    name: "Store and teach",
    detail: "CogniAxis, SurgiVault, Dr Mentor",
    status: "available" as Status,
  },
  {
    name: "Assist",
    detail: "SurgiBot research programme",
    status: "research" as Status,
  },
];
