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
  /**
   * Main product image. `render` marks a 3D render rather than a photograph;
   * it is always labelled on the page. `fit: "contain"` is for studio shots
   * on white.
   */
  image?: { src: string; alt: string; render?: boolean; fit?: "contain" | "cover" };
  /** Extra studio shots, shown as a gallery on the product page. */
  gallery?: { src: string; alt: string; caption: string }[];
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
      src: "/images/products/spectra-tower.jpg",
      alt: "UnivLabs 4K ICG tower with camera control unit, light source, insufflator and pump stacked on a cart, monitor showing ICG fluorescence",
      fit: "contain",
    },
    gallery: [
      {
        src: "/images/products/spectra-tower-studio.jpg",
        alt: "UnivLabs 4K ICG tower on a grey studio background",
        caption: "Complete tower",
      },
      {
        src: "/images/products/icg-camera.jpg",
        alt: "UnivLabs 4K ICG camera control unit with camera head, on top of the NIR light source",
        caption: "4K ICG 4 CMOS camera system",
      },
      {
        src: "/images/products/nir-light-source.jpg",
        alt: "UnivLabs NIR UL9700 light source with fibre-optic cable",
        caption: "NIR UL9700 light source",
      },
    ],
    todo: "Add the full spec sheet and intended-use statement from the product team.",
  },
  {
    slug: "lumina",
    name: "Lumina",
    family: "surgical-vision",
    status: "available",
    descriptor: "Surgical vision suite",
    headline: "[Lumina headline to confirm]",
    image: {
      src: "/images/products/lumina-render.jpg",
      alt: "Render of the UnivLabs Lumina 4K surgical suite cart with monitor",
      render: true,
      fit: "contain",
    },
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
    image: {
      src: "/images/products/icg-camera.jpg",
      alt: "UnivLabs 4K ICG camera control unit with camera head, on top of the NIR light source",
      fit: "contain",
    },
    gallery: [
      {
        src: "/images/products/icg-camera.jpg",
        alt: "UnivLabs 4K ICG camera control unit with camera head",
        caption: "4K ICG 4 CMOS camera system",
      },
      {
        src: "/images/products/nir-light-source.jpg",
        alt: "UnivLabs NIR UL9700 light source with fibre-optic cable",
        caption: "NIR UL9700 light source",
      },
      {
        src: "/images/products/insufflator.jpg",
        alt: "UnivLabs Uniflator UL45-S CO₂ insufflator",
        caption: "Uniflator UL45-S insufflator",
      },
      {
        src: "/images/products/universal-pump.jpg",
        alt: "UnivLabs Universal Medical Pump with touchscreen",
        caption: "Universal Medical Pump UMP-1000",
      },
      {
        src: "/images/products/telescope.jpg",
        alt: "UnivLabs laparoscope telescope",
        caption: "Telescope",
      },
    ],
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
    image: {
      src: "/images/products/grasper.jpg",
      alt: "UnivLabs laparoscopic traumatic grasping forceps, jaw and shaft",
      fit: "contain",
    },
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
    image: {
      src: "/images/products/catheter.jpg",
      alt: "UnivLabs catheter with balloon tip and coloured valve",
      fit: "contain",
    },
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
    todo: "Need approved intended use, sizes, patent number and regulatory status by market. Confirm the product photo shows Am-SafeX.",
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
