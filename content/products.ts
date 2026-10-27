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
  /**
   * `links` jump to items in the range section on the same page
   * (slugs from content/catalogue.ts).
   */
  highlights: { title: string; body: string; links?: { label: string; slug: string }[] }[];
  /** Spec rows. Leave empty until confirmed specs arrive. */
  specs: { label: string; value: string }[];
  /**
   * Main product image. `render` marks a 3D render rather than a photograph;
   * it is always labelled on the page. `fit: "contain"` is for studio shots
   * on white.
   */
  image?: { src: string; alt: string; render?: boolean; fit?: "contain" | "cover" };
  /** Extra studio shots, shown as a gallery on the product page. */
  gallery?: { src: string; alt: string; caption: string; render?: boolean }[];
  todo?: string;
  /** Who the product suits, in the live site's words. */
  bestFor?: string;
  /** Brochure PDF published on univlabs.in. */
  brochure?: string;
  /** Shown under the spec table. */
  specNote?: string;
  faqs?: { q: string; a: string }[];
  /** Where the specs and copy come from. */
  source?: string;
};

const LIVE_SV = "univlabs.in/surgical-vision, 2026";
const QUOTE_NOTE =
  "Specifications describe the listed product configurations. The signed quotation determines included equipment, options, warranty coverage and final specifications.";
const BROCHURES = "https://www.univlabs.in/uploads/media/surgical-vision/documents";
const ACCESSORIES_FAQ = {
  q: "Are all accessories and software included?",
  a: "Only items identified in your quotation are included. Confirm scope models, display size, recording, connectivity, software licences and any recurring charges.",
};
const CHOOSE_FAQ = {
  q: "How do I choose between the three suites?",
  a: "Spectra adds NIR/ICG imaging; Lumina focuses on native 4K white light; SurgiStart offers a compact mobile format with HD and 4K configurations. Match the configuration to your procedures and infrastructure.",
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
    headline: "4K clarity. Fluorescence when it matters.",
    summary:
      "A surgical vision suite combining native 4K white-light imaging with NIR/ICG fluorescence and operating-room equipment.",
    bestFor:
      "Hospitals seeking both white-light and ICG imaging within one configured surgical suite.",
    highlights: [
      {
        title: "Two imaging perspectives",
        body: "Review the anatomical white-light view alongside supported fluorescence modes.",
      },
      {
        title: "One coordinated suite",
        body: "Configure the camera, light source, scope, recording and supporting equipment together.",
      },
      {
        title: "Connected case records",
        body: "Discuss recording and authorised sharing through CogniAxis as part of the proposed configuration.",
      },
    ],
    specs: [
      { label: "Camera", value: "4-chip CMOS · native 4K · NIR/ICG imaging" },
      { label: "ICG display modes", value: "Overlay · Monochromatic · Intensity map" },
      { label: "Telescope", value: "UHD 10 mm · 0° or 30° options" },
      { label: "Light source", value: "LED + NIR illumination" },
      { label: "Recording", value: "4K digital recording" },
      { label: "Zoom coupler", value: "14–32 mm" },
      { label: "NIR fibre-optic cable", value: "4.8 mm × 3 m" },
      { label: "Insufflator", value: "UL 45-S with integrated smoke evacuation" },
      { label: "Monitor", value: "4K medical display · 32–55 inch configurations" },
      { label: "Irrigation / suction", value: "UMP-1000 pressure-controlled pump" },
      { label: "Warranty", value: "5-year programme; scope and terms in the quotation" },
    ],
    specNote: QUOTE_NOTE,
    brochure: `${BROCHURES}/spectra-brochure.pdf`,
    faqs: [
      {
        q: "What should I confirm about compatibility?",
        a: "ICG capability does not establish compatibility with blue-light agents or CYTALUX. Confirm the exact agent, optical chain, intended use and local authorisation.",
      },
      ACCESSORIES_FAQ,
      CHOOSE_FAQ,
    ],
    source: LIVE_SV,
    image: {
      src: "/images/products/spectra-render.jpg",
      alt: "Render of the UnivLabs Spectra ICG Suite cart, marked 4K Spectra ICG Suite on its side, with a monitor showing an ICG fluorescence overlay",
      render: true,
      fit: "contain",
    },
    gallery: [
      {
        src: "/images/products/spectra-render-front.jpg",
        alt: "Render of the UnivLabs Spectra ICG Suite from the front, showing the touchscreen and connector panel",
        caption: "Spectra ICG Suite, front",
        render: true,
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
    todo: "Replace the renders with studio photographs of the Spectra ICG Suite, and add the approved intended-use statement from the product team.",
  },
  {
    slug: "lumina",
    name: "Lumina",
    family: "surgical-vision",
    status: "available",
    descriptor: "Native 4K surgical vision suite",
    headline: "A complete view. A coordinated workflow.",
    summary:
      "A native 4K white-light surgical suite bringing imaging, recording and supporting operating-room equipment together.",
    bestFor:
      "Hospitals prioritising a configured 4K white-light platform for compatible endoscopic workflows.",
    image: {
      src: "/images/products/lumina-render.jpg",
      alt: "Render of the UnivLabs Lumina 4K surgical suite cart with monitor",
      render: true,
      fit: "contain",
    },
    highlights: [
      {
        title: "Focus on white-light imaging",
        body: "Choose a platform around anatomical colour imaging without assuming fluorescence capability.",
      },
      {
        title: "Build the whole workflow",
        body: "Review recording, insufflation, smoke evacuation and fluid management as one proposed package.",
      },
      {
        title: "Choose the right configuration",
        body: "Select the monitor, scope and accessories around the hospital’s procedures and working space.",
      },
    ],
    specs: [
      { label: "Camera", value: "4-chip CMOS · native 4K white-light imaging" },
      { label: "Telescope", value: "UHD 10 mm · 0° or 30° options" },
      { label: "Light source", value: "LED illumination" },
      { label: "Recording", value: "4K digital recording" },
      { label: "Zoom coupler", value: "14–32 mm" },
      { label: "Fibre-optic cable", value: "4.8 mm × 3 m" },
      { label: "Insufflator", value: "UL 45-S with integrated smoke evacuation" },
      { label: "Monitor", value: "4K medical display · 32–55 inch configurations" },
      { label: "Irrigation / suction", value: "UMP-1000 pressure-controlled pump" },
      { label: "Warranty", value: "5-year programme; scope and terms in the quotation" },
    ],
    specNote: QUOTE_NOTE,
    brochure: `${BROCHURES}/lumina-brochure.pdf`,
    faqs: [
      {
        q: "What should I confirm about compatibility?",
        a: "Lumina is presented here as a white-light platform. Do not assume NIR/ICG capability or compatibility with fluorescence agents.",
      },
      ACCESSORIES_FAQ,
      CHOOSE_FAQ,
    ],
    source: LIVE_SV,
    todo: "Replace the render with a studio photograph of Lumina, and add the approved intended-use statement.",
  },
  {
    slug: "surgistart",
    name: "SurgiStart",
    family: "surgical-vision",
    status: "available",
    descriptor: "Portable all-in-one surgical visualisation",
    headline: "A compact suite. Room to move.",
    summary:
      "A compact, mobile visualisation platform with an integrated monitor, illumination and recording for compatible diagnostic and surgical workflows.",
    bestFor:
      "Teams seeking a compact configuration where available space and movement between suitable clinical locations matter.",
    highlights: [
      {
        title: "Compact format",
        body: "Bring the monitor and core visualisation functions into one mobile platform.",
      },
      {
        title: "A choice of camera configuration",
        body: "Review the available HD and 4K options against your actual imaging requirement.",
      },
      {
        title: "Record the case",
        body: "Use onboard recording and discuss any additional display or connectivity requirements before ordering.",
      },
    ],
    specs: [
      { label: "Platform", value: "Compact mobile system" },
      { label: "Integrated monitor", value: "21 inch" },
      { label: "Camera", value: "HD and 4K configurations" },
      { label: "Light source", value: "Integrated surgical illumination" },
      { label: "Recording", value: "Onboard digital recording" },
      { label: "Secondary display", value: "Output for an additional display up to 32 inch" },
      { label: "Fibre-optic cable", value: "Included in the configured system" },
      { label: "Connectivity", value: "Confirm selected interfaces and CogniAxis compatibility in the quotation" },
    ],
    specNote: QUOTE_NOTE,
    brochure: `${BROCHURES}/surgistart-brochure.pdf`,
    faqs: [
      {
        q: "What should I confirm about compatibility?",
        a: "Confirm the exact camera resolution, supported procedures, included components and site requirements. A compact format does not remove the need for appropriate theatre equipment and clinical training.",
      },
      ACCESSORIES_FAQ,
      CHOOSE_FAQ,
    ],
    source: LIVE_SV,
    todo: "Need a product photograph of SurgiStart. Confirm whether “Gynostart Portable Suite” in the image library is the same product.",
  },
  {
    slug: "surgicore",
    name: "SurgiCore",
    family: "surgical-vision",
    status: "available",
    descriptor: "Modular surgical equipment and device components",
    headline: "Build the operating room one system at a time.",
    summary:
      "Every part of the UnivLabs tower is also available on its own. Our team confirms compatibility, configuration and regulatory availability before supply.",
    image: {
      src: "/images/products/icg-camera.jpg",
      alt: "UnivLabs 4K ICG camera control unit with camera head, on top of the NIR light source",
      fit: "contain",
    },
    highlights: [
      {
        title: "Imaging",
        body: "4K camera, 4K ICG camera, medical recorder.",
        links: [
          { label: "4K camera", slug: "4k-camera" },
          { label: "4K ICG camera", slug: "icg-camera" },
          { label: "Medical recorder", slug: "medical-recorder" },
        ],
      },
      {
        title: "Illumination and optics",
        body: "ICG light source, LED light source, fibre-optic cable, endoscopes in 2.9, 4, 5 and 10 mm.",
        links: [
          { label: "ICG light source", slug: "nir-light-source" },
          { label: "LED light source", slug: "led-light-source" },
          { label: "Fibre-optic cable", slug: "cables-and-tubing" },
          { label: "Endoscopes, 2.9 to 10 mm", slug: "endoscopes" },
        ],
      },
      {
        title: "Insufflation and air",
        body: "CO₂ insufflator and smoke evacuator.",
        links: [
          { label: "CO₂ insufflator", slug: "insufflator" },
          { label: "Smoke evacuator", slug: "smoke-evacuator" },
        ],
      },
      {
        title: "Fluid management",
        body: "Universal Medical Pump, hysteroscopy pump, arthroscopy pump, Uro Pump, irrigation and suction tubing.",
        links: [
          { label: "Universal Medical Pump", slug: "universal-medical-pump" },
          { label: "Hysteroscopy pump", slug: "hysteroscopy-pump" },
          { label: "Arthroscopy pump", slug: "arthroscopy-pump" },
          { label: "Uro Pump", slug: "uro-pump" },
          { label: "Irrigation and suction tubing", slug: "cables-and-tubing" },
        ],
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
    headline: "Laparoscopic hand instruments, made in India.",
    image: {
      src: "/images/products/grasper.jpg",
      alt: "UnivLabs laparoscopic traumatic grasping forceps, jaw and shaft",
      fit: "contain",
    },
    summary:
      "Fifteen instrument types for laparoscopic surgery: access, graspers and dissectors, bipolar and monopolar energy, scissors, clips and clamps, retraction and retrieval, and suction and irrigation.",
    highlights: [],
    specs: [],
    todo: "Confirm intended-use wording for each instrument type, and what the size on each forceps variant measures.",
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
