/**
 * Individual instruments and devices, each with its own page at
 * /products/<parent>/<slug>.
 *
 * Sources, in order of authority:
 * - Device one-liners: univlabs.in/accessories (live site, 2026).
 * - Variant names and sizes: file names in the client's product image
 *   library ("Product Images", 2024), written as supplied.
 * - Endoscope part numbers: content/telescopes.ts (client spreadsheet).
 *
 * Claims policy (brand book, Part 4): describe what each item is. No
 * performance, safety or outcome claims. Where the source leaves a gap,
 * use `todo`.
 */

import type { Status } from "./products";

export type CatalogueParent = "hand-instruments" | "components";

export type CatalogueImage = {
  src: string;
  alt: string;
  fit?: "contain" | "cover";
};

export type CatalogueItem = {
  slug: string;
  parent: CatalogueParent;
  /** Heading the item is grouped under on its family page. */
  group: string;
  name: string;
  descriptor: string;
  summary: string;
  status: Status;
  /** Omit when the photo is still to be supplied. */
  image?: CatalogueImage;
  gallery?: (CatalogueImage & { caption: string })[];
  /** Variants as named in the source, with an optional photo each. */
  variants?: { name: string; size?: string; image?: string }[];
  /** What a variant's size figure measures, when the source says so. */
  sizeLabel?: string;
  specs?: { label: string; value: string }[];
  /** Specialty ids from content/site.ts. */
  specialties?: string[];
  source: string;
  todo?: string;
  /** Shows the full endoscope part-number catalogue. */
  telescopeTable?: boolean;
};

const LIBRARY = "UnivLabs product library, 2024";
const LIVE = "univlabs.in, 2026";
const img = (path: string) => `/images/catalogue/${path}`;

/** The forceps sizes in the library are not labelled; ask before stating. */
const SIZE_TODO =
  "Confirm what the size on each variant measures (jaw length or diameter), and the shaft diameters and working lengths offered.";

export const catalogue: CatalogueItem[] = [
  // ------------------------------------------------------------------
  // Hand instruments
  // ------------------------------------------------------------------
  {
    slug: "trocars-and-cannulas",
    parent: "hand-instruments",
    group: "Access",
    name: "Trocars and cannulas",
    descriptor: "Laparoscopic access",
    summary:
      "Trocars and cannulas create and hold the ports through which laparoscopic instruments and the telescope enter.",
    status: "available",
    image: { src: img("trocar/plain-10.png"), alt: "UnivLabs plain pyramidal trocar with cannula", fit: "contain" },
    sizeLabel: "Diameter × length",
    variants: [
      { name: "Plain pyramidal", size: "10 mm × 10 cm", image: img("trocar/plain-10.png") },
      { name: "Plain pyramidal", size: "7 mm × 9 cm", image: img("trocar/plain-7.png") },
      { name: "Spiral pyramidal", size: "5 mm × 9 cm", image: img("trocar/spiral-5.png") },
      { name: "Spiral plain pyramidal", size: "5 mm × 9 cm", image: img("trocar/spiral-plain-5.png") },
      { name: "Trocar cannula, magnetic", size: "10 mm × 10 cm", image: img("trocar/magnetic-10.png") },
      { name: "Endoview cannula", size: "10 mm × 10 cm", image: img("trocar/endoview-10.png") },
      { name: "Hydatid cyst trocar cannula", size: "10 mm × 15 cm", image: img("trocar/hydatid-10.png") },
      { name: "Hasson rod and cone", size: "For 10 cm cannula", image: img("trocar/hassan.png") },
    ],
    specialties: ["general-surgery", "urology", "gynaecology"],
    source: LIBRARY,
  },
  {
    slug: "veress-needles",
    parent: "hand-instruments",
    group: "Access",
    name: "Veress needles",
    descriptor: "Laparoscopic access",
    summary: "Veress needles are used to establish pneumoperitoneum at the start of a laparoscopic procedure.",
    status: "available",
    image: { src: img("veress/2-1-12.png"), alt: "UnivLabs Veress needle", fit: "contain" },
    sizeLabel: "Diameter × length",
    variants: [
      { name: "Veress needle", size: "2.1 mm × 12 cm", image: img("veress/2-1-12.png") },
      { name: "Veress needle", size: "2.1 mm × 14 cm", image: img("veress/2-1-14.png") },
      { name: "Veress needle", size: "2.9 mm × 12 cm", image: img("veress/2-9-12.png") },
    ],
    specialties: ["general-surgery", "urology", "gynaecology"],
    source: LIBRARY,
  },
  {
    slug: "traumatic-graspers",
    parent: "hand-instruments",
    group: "Graspers and dissectors",
    name: "Traumatic graspers",
    descriptor: "Grasping forceps, 2 × 3 teeth",
    summary: "Grasping forceps with 2 × 3 toothed jaws for holding tissue firmly, in three jaw sizes.",
    status: "available",
    image: { src: img("graspers/medium.png"), alt: "UnivLabs 2 × 3 traumatic grasping forceps", fit: "contain" },
    sizeLabel: "Size as listed",
    variants: [
      { name: "2 × 3 small", size: "18 mm", image: img("graspers/small.jpg") },
      { name: "2 × 3 medium", size: "28 mm", image: img("graspers/medium.png") },
      { name: "2 × 3 long", size: "45 mm", image: img("graspers/long.png") },
    ],
    specialties: ["general-surgery", "gynaecology"],
    source: LIBRARY,
    todo: SIZE_TODO,
  },
  {
    slug: "dissecting-forceps",
    parent: "hand-instruments",
    group: "Graspers and dissectors",
    name: "Dissecting and grasping forceps",
    descriptor: "Maryland and straight jaws",
    summary: "Dissecting and grasping forceps in Maryland and straight jaw patterns.",
    status: "available",
    image: { src: img("dissecting/maryland-medium.png"), alt: "UnivLabs Maryland dissecting and grasping forceps", fit: "contain" },
    sizeLabel: "Size as listed",
    variants: [
      { name: "Maryland, small", size: "17 mm", image: img("dissecting/maryland-small.png") },
      { name: "Maryland, medium", size: "19 mm", image: img("dissecting/maryland-medium.png") },
      { name: "Maryland, medium, diamond", size: "17 mm", image: img("dissecting/maryland-medium-diamond.png") },
      { name: "Maryland, long", size: "21 mm", image: img("dissecting/maryland-long.png") },
      { name: "Straight", size: "15 mm", image: img("dissecting/straight.png") },
      { name: "90°", size: "18 mm" },
    ],
    specialties: ["general-surgery", "urology", "gynaecology"],
    source: LIBRARY,
    todo: SIZE_TODO,
  },
  {
    slug: "bipolar-forceps",
    parent: "hand-instruments",
    group: "Energy",
    name: "Bipolar forceps",
    descriptor: "Bipolar instruments",
    summary: "Bipolar forceps and tweezers in grasping, dissecting and Maryland patterns.",
    status: "available",
    image: { src: img("bipolar/maryland.png"), alt: "UnivLabs bipolar Maryland forceps", fit: "contain" },
    sizeLabel: "Size as listed",
    variants: [
      { name: "Maryland", size: "14.7 mm", image: img("bipolar/maryland.png") },
      { name: "Fine Maryland", size: "13 mm", image: img("bipolar/fine-maryland.png") },
      { name: "Straight dissection", size: "12.7 mm", image: img("bipolar/straight-dissection.png") },
      { name: "Fenestrated small grasping", size: "17 mm", image: img("bipolar/fenestrated.png") },
      { name: "2 × 3 small traumatic grasping", size: "14 mm", image: img("bipolar/traumatic-small.jpg") },
      { name: "Tweezers", size: "17.2 mm", image: img("bipolar/tweezers.png") },
    ],
    specialties: ["general-surgery", "urology", "gynaecology"],
    source: LIBRARY,
    todo: SIZE_TODO,
  },
  {
    slug: "monopolar-electrodes",
    parent: "hand-instruments",
    group: "Energy",
    name: "Monopolar electrodes",
    descriptor: "Hook and spatula electrodes",
    summary: "Monopolar electrodes in L-hook and spatula forms.",
    status: "available",
    image: { src: img("monopolar/l-hook.png"), alt: "UnivLabs L-hook monopolar electrode", fit: "contain" },
    variants: [
      { name: "L-hook electrode", image: img("monopolar/l-hook.png") },
      { name: "L-hook electrode, Teflon", image: img("monopolar/l-hook-teflon.png") },
      { name: "Spatula electrode", image: img("monopolar/spatula.png") },
    ],
    specialties: ["general-surgery", "gynaecology"],
    source: LIBRARY,
  },
  {
    slug: "scissors",
    parent: "hand-instruments",
    group: "Cutting",
    name: "Scissors",
    descriptor: "Laparoscopic scissors",
    summary: "Laparoscopic scissors in hook, Metzenbaum and straight patterns.",
    status: "available",
    image: { src: img("scissors/metzenbaum-16.png"), alt: "UnivLabs laparoscopic Metzenbaum scissors", fit: "contain" },
    sizeLabel: "Size as listed",
    variants: [
      { name: "Metzenbaum", size: "16 mm", image: img("scissors/metzenbaum-16.png") },
      { name: "Metzenbaum", size: "19 mm", image: img("scissors/metzenbaum-19.png") },
      { name: "Straight", size: "19 mm", image: img("scissors/straight.png") },
      { name: "Hook", size: "12 mm", image: img("scissors/hook.png") },
    ],
    specialties: ["general-surgery", "urology", "gynaecology"],
    source: LIBRARY,
    todo: SIZE_TODO,
  },
  {
    slug: "biopsy-forceps",
    parent: "hand-instruments",
    group: "Cutting",
    name: "Biopsy forceps",
    descriptor: "Severing and spike jaws",
    summary: "Biopsy forceps with severing or spike jaws.",
    status: "available",
    image: { src: img("biopsy/spike.png"), alt: "UnivLabs biopsy spike forceps", fit: "contain" },
    sizeLabel: "Size as listed",
    variants: [
      { name: "Severing", size: "12 mm", image: img("biopsy/severing.png") },
      { name: "Spike", size: "14 mm", image: img("biopsy/spike.png") },
    ],
    specialties: ["general-surgery", "gynaecology"],
    source: LIBRARY,
    todo: SIZE_TODO,
  },
  {
    slug: "clip-applicators",
    parent: "hand-instruments",
    group: "Clips and clamps",
    name: "Clip applicators",
    descriptor: "Ligation clip applicators",
    summary: "Laparoscopic clip applicators, including an applicator for polymer clips.",
    status: "available",
    image: { src: img("clip/applicator.png"), alt: "UnivLabs laparoscopic clip applicator", fit: "contain" },
    variants: [
      { name: "Clip applicator", image: img("clip/applicator.png") },
      { name: "Clip applicator, alternative view", image: img("clip/applicator-2.png") },
      { name: "Applicator for polymer clips", image: img("clip/polymer.png") },
    ],
    specialties: ["general-surgery", "urology", "gynaecology"],
    source: LIBRARY,
    todo: "Confirm clip sizes and compatible clip types.",
  },
  {
    slug: "bulldog-clamps",
    parent: "hand-instruments",
    group: "Clips and clamps",
    name: "Vascular bulldog clamps and applier",
    descriptor: "DeBakey jaw clamps",
    summary: "Vascular bulldog clamps with DeBakey jaws, curved or straight, with an applier.",
    status: "available",
    image: { src: img("bulldog/curved.png"), alt: "UnivLabs curved vascular bulldog clamp with DeBakey jaw", fit: "contain" },
    variants: [
      { name: "Bulldog clamp, curved DeBakey jaw", image: img("bulldog/curved.png") },
      { name: "Bulldog clamp, straight DeBakey jaw", image: img("bulldog/straight.png") },
    ],
    specialties: ["urology", "general-surgery"],
    source: LIBRARY,
  },
  {
    slug: "intestinal-clamps",
    parent: "hand-instruments",
    group: "Clips and clamps",
    name: "Intestinal clamps",
    descriptor: "Curved and straight",
    summary: "Laparoscopic intestinal clamps, curved or straight.",
    status: "available",
    image: { src: img("clamp/curved.png"), alt: "UnivLabs curved laparoscopic intestinal clamp", fit: "contain" },
    sizeLabel: "Diameter × length",
    variants: [
      { name: "Curved", size: "5 mm × 30 cm", image: img("clamp/curved.png") },
      { name: "Straight", size: "5 mm × 30 cm", image: img("clamp/straight.png") },
    ],
    specialties: ["general-surgery"],
    source: LIBRARY,
  },
  {
    slug: "retractors",
    parent: "hand-instruments",
    group: "Retraction and retrieval",
    name: "Retractors",
    descriptor: "Fan and standard retractors",
    summary: "Laparoscopic retractors, including a take-apart fan retractor.",
    status: "available",
    image: { src: img("retractor/fan.png"), alt: "UnivLabs take-apart fan retractor", fit: "contain" },
    variants: [
      { name: "Fan retractor, take-apart", image: img("retractor/fan.png") },
      { name: "Retractor", image: img("retractor/retractor.png") },
    ],
    specialties: ["general-surgery"],
    source: LIBRARY,
  },
  {
    slug: "gallbladder-extractor",
    parent: "hand-instruments",
    group: "Retraction and retrieval",
    name: "Gallbladder extractor",
    descriptor: "Specimen retrieval",
    summary: "An extractor for gallbladder retrieval in laparoscopic surgery.",
    status: "available",
    image: { src: img("gallbladder/extractor.png"), alt: "UnivLabs gallbladder extractor", fit: "contain" },
    specialties: ["general-surgery"],
    source: LIBRARY,
  },
  {
    slug: "stone-removal-forceps",
    parent: "hand-instruments",
    group: "Retraction and retrieval",
    name: "Stone removal forceps",
    descriptor: "Stone retrieval",
    summary: "Forceps for retrieving stones.",
    status: "available",
    image: { src: img("stone/forceps.jpg"), alt: "UnivLabs stone removal forceps", fit: "contain" },
    specialties: ["urology", "general-surgery"],
    source: LIBRARY,
    todo: "Confirm the procedures and sizes this forceps is offered for.",
  },
  {
    slug: "suction-irrigation-cannulas",
    parent: "hand-instruments",
    group: "Suction and irrigation",
    name: "Suction irrigation cannulas",
    descriptor: "Valve-controlled cannulas",
    summary: "Suction and irrigation cannulas with a two-way sliding valve or a trumpet valve.",
    status: "available",
    image: { src: img("suction/trumpet-valve.png"), alt: "UnivLabs trumpet valve suction irrigation cannula", fit: "contain" },
    variants: [
      { name: "Two-way sliding valve", image: img("suction/sliding-valve.png") },
      { name: "Trumpet valve, with cannula", image: img("suction/trumpet-valve.png") },
    ],
    specialties: ["general-surgery", "gynaecology"],
    source: LIBRARY,
  },

  // ------------------------------------------------------------------
  // Devices (Components)
  // ------------------------------------------------------------------
  {
    slug: "icg-camera",
    parent: "components",
    group: "Imaging",
    name: "4K ICG camera system",
    descriptor: "4 CMOS camera",
    summary:
      "4K ICG camera system for compatible white-light and near-infrared fluorescence imaging. The camera in the Spectra suite.",
    status: "available",
    image: { src: img("icg-camera/main.png"), alt: "UnivLabs 4K ICG 4 CMOS camera control unit with camera head", fit: "contain" },
    gallery: [
      { src: img("icg-camera/head.jpg"), alt: "UnivLabs 4K ICG camera head", caption: "Camera head", fit: "contain" },
    ],
    specs: [
      { label: "Resolution", value: "4K" },
      { label: "Sensor", value: "4 CMOS" },
      { label: "Imaging modes", value: "White light · ICG overlay · NIR" },
    ],
    specialties: ["general-surgery", "urology", "gynaecology"],
    source: LIVE,
  },
  {
    slug: "4k-camera",
    parent: "components",
    group: "Imaging",
    name: "4K camera system",
    descriptor: "3 CMOS camera",
    summary: "Standalone 4K camera system for compatible white-light endoscopic imaging.",
    status: "available",
    image: { src: img("camera-3cmos/main.png"), alt: "UnivLabs 4K 3 CMOS camera control unit with camera head", fit: "contain" },
    gallery: [
      { src: img("camera-3cmos/head.png"), alt: "UnivLabs 4K 3 CMOS camera head", caption: "Camera head", fit: "contain" },
    ],
    specs: [
      { label: "Resolution", value: "4K" },
      { label: "Sensor", value: "3 CMOS" },
      { label: "Imaging", value: "White light" },
    ],
    specialties: ["general-surgery", "urology", "gynaecology", "orthopaedics"],
    source: LIVE,
  },
  {
    slug: "nir-light-source",
    parent: "components",
    group: "Illumination",
    name: "NIR UL9700 light source",
    descriptor: "ICG light source",
    summary: "Surgical illumination for compatible white-light and ICG imaging systems.",
    status: "available",
    image: { src: img("nir-light/main.png"), alt: "UnivLabs NIR UL9700 light source", fit: "contain" },
    gallery: [
      { src: img("nir-light/alt.png"), alt: "UnivLabs NIR UL9700 light source, another angle", caption: "Front panel", fit: "contain" },
    ],
    specialties: ["general-surgery", "urology", "gynaecology"],
    source: LIVE,
  },
  {
    slug: "led-light-source",
    parent: "components",
    group: "Illumination",
    name: "UL-9000S LED light source",
    descriptor: "White-light source",
    summary: "LED light source with a display, for compatible endoscopes.",
    status: "available",
    image: { src: img("ul9000/main.png"), alt: "UnivLabs UL-9000S LED light source with display", fit: "contain" },
    gallery: [
      { src: img("ul9000/alt.png"), alt: "UnivLabs UL-9000S LED light source, another angle", caption: "Another angle", fit: "contain" },
    ],
    specialties: ["general-surgery", "urology", "gynaecology", "orthopaedics"],
    source: LIBRARY,
    todo: "Not listed on univlabs.in yet. Confirm it is offered, and add specifications.",
  },
  {
    slug: "endoscopes",
    parent: "components",
    group: "Optics",
    name: "Endoscopes",
    descriptor: "Rigid telescopes",
    summary:
      "Rigid telescopes for laparoscopy, arthroscopy, gynaecology, cystoscopy and paediatrics. Our team confirms the exact model and compatible configuration before supply.",
    status: "available",
    image: { src: img("telescope/main.jpg"), alt: "UnivLabs rigid endoscope eyepiece and light post", fit: "cover" },
    gallery: [
      { src: img("telescope/alt.jpg"), alt: "UnivLabs endoscope, another view", caption: "Telescope", fit: "cover" },
      { src: img("telescope/coupler.jpg"), alt: "UnivLabs endoscope coupler", caption: "Coupler", fit: "cover" },
      { src: img("telescope/arthroscopy.png"), alt: "UnivLabs arthroscopy telescope", caption: "Arthroscopy telescope", fit: "contain" },
    ],
    specs: [
      { label: "Diameters", value: "1.9 mm to 10 mm" },
      { label: "Directions of view", value: "0° · 12° / 15° · 25° · 30° · 45° · 70°" },
    ],
    specialties: ["general-surgery", "urology", "gynaecology", "orthopaedics"],
    source: "UnivLabs endoscope catalogue, product library (2024)",
    telescopeTable: true,
    todo: "Confirm part number UL-0560.30.310: the catalogue lists it at 6.5 mm.",
  },
  {
    slug: "insufflator",
    parent: "components",
    group: "Insufflation and air",
    name: "Uniflator UL45-S",
    descriptor: "CO₂ insufflator",
    summary: "Controlled pneumoperitoneum management for laparoscopic procedures.",
    status: "available",
    image: { src: img("insufflator/main.png"), alt: "UnivLabs Uniflator UL45-S CO₂ insufflator", fit: "contain" },
    gallery: [
      { src: img("insufflator/alt.png"), alt: "UnivLabs Uniflator UL45-S, another angle", caption: "Another angle", fit: "contain" },
    ],
    specialties: ["general-surgery", "urology", "gynaecology"],
    source: LIVE,
  },
  {
    slug: "smoke-evacuator",
    parent: "components",
    group: "Insufflation and air",
    name: "UL-SE16 smoke evacuator",
    descriptor: "Surgical smoke management",
    summary: "Surgical smoke capture and filtration for compatible operating-room setups.",
    status: "available",
    image: { src: img("smoke/main.png"), alt: "UnivLabs UL-SE16 smoke evacuator", fit: "contain" },
    gallery: [
      { src: img("smoke/alt.png"), alt: "UnivLabs UL-SE16 smoke evacuator, another angle", caption: "Another angle", fit: "contain" },
    ],
    specialties: ["general-surgery", "gynaecology"],
    source: LIVE,
  },
  {
    slug: "universal-medical-pump",
    parent: "components",
    group: "Fluid management",
    name: "Universal Medical Pump",
    descriptor: "UMP-1000",
    summary: "A versatile pump platform for selected minimally invasive procedures.",
    status: "available",
    image: { src: img("ump/main.png"), alt: "UnivLabs Universal Medical Pump with touchscreen", fit: "contain" },
    gallery: [
      { src: img("ump/alt.jpg"), alt: "UnivLabs Universal Medical Pump, another angle", caption: "Another angle", fit: "contain" },
    ],
    specialties: ["general-surgery", "urology", "gynaecology", "orthopaedics"],
    source: LIVE,
  },
  {
    slug: "hysteroscopy-pump",
    parent: "components",
    group: "Fluid management",
    name: "Hysteroscopy pump",
    descriptor: "Gynaecology",
    summary: "Fluid management designed for compatible hysteroscopic procedures.",
    status: "available",
    image: { src: img("hysteroscopy-pump/main.png"), alt: "UnivLabs hysteroscopy pump", fit: "contain" },
    gallery: [
      { src: img("hysteroscopy-pump/alt.png"), alt: "UnivLabs hysteroscopy pump, another angle", caption: "Another angle", fit: "contain" },
    ],
    specialties: ["gynaecology"],
    source: LIVE,
  },
  {
    slug: "arthroscopy-pump",
    parent: "components",
    group: "Fluid management",
    name: "Arthroscopy pump",
    descriptor: "Orthopaedics",
    summary: "Joint distension and fluid management for compatible arthroscopy workflows.",
    status: "available",
    image: { src: img("arthroscopy-pump/main.png"), alt: "UnivLabs arthroscopy pump", fit: "contain" },
    gallery: [
      { src: img("arthroscopy-pump/alt.jpg"), alt: "UnivLabs arthroscopy pump, another angle", caption: "Another angle", fit: "contain" },
    ],
    specialties: ["orthopaedics"],
    source: LIVE,
  },
  {
    slug: "uro-pump",
    parent: "components",
    group: "Fluid management",
    name: "Uro Pump",
    descriptor: "Urology",
    summary: "Irrigation and suction pump with pressure and flow-rate control, for urology.",
    status: "available",
    image: { src: img("uro-pump/main.png"), alt: "UnivLabs Uro Pump with touchscreen showing pressure and flow rate", fit: "contain" },
    gallery: [
      { src: img("uro-pump/alt.png"), alt: "UnivLabs Uro Pump, another angle", caption: "Another angle", fit: "contain" },
    ],
    specialties: ["urology"],
    source: LIBRARY,
    todo: "Not listed on univlabs.in yet. Confirm it is offered, and add approved intended use and specifications.",
  },
  {
    slug: "medical-recorder",
    parent: "components",
    group: "Documentation",
    name: "Medical recorder",
    descriptor: "4K recording",
    summary: "Medical-grade video and image recording for approved surgical documentation.",
    status: "available",
    specialties: ["general-surgery", "urology", "gynaecology", "orthopaedics"],
    source: LIVE,
    todo: "Need a product photo of the medical recorder (the supplied folder is empty).",
  },
  {
    slug: "cables-and-tubing",
    parent: "components",
    group: "Accessories",
    name: "Light cables and tubing",
    descriptor: "Accessories",
    summary:
      "Fibre-optic light cables for compatible endoscopes and light sources, and irrigation and suction tubing for compatible fluid-management systems. Tell us the connector, pump and connection you use when you request a quotation.",
    status: "available",
    variants: [
      { name: "Fibre-optic light cable" },
      { name: "Irrigation tubing" },
      { name: "Suction tubing" },
    ],
    source: LIVE,
    todo: "Need product photos of the cable and tubing.",
  },
];

export const catalogueFor = (parent: CatalogueParent) =>
  catalogue.filter((c) => c.parent === parent);

export const catalogueItem = (parent: string, slug: string) =>
  catalogue.find((c) => c.parent === parent && c.slug === slug);

/** Items grouped by heading, in catalogue order. */
export const catalogueGroups = (parent: CatalogueParent) => {
  const groups: { name: string; items: CatalogueItem[] }[] = [];
  for (const item of catalogueFor(parent)) {
    let g = groups.find((x) => x.name === item.group);
    if (!g) groups.push((g = { name: item.group, items: [] }));
    g.items.push(item);
  }
  return groups;
};
