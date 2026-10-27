/**
 * Site-wide content. Every public number lives here, with its source, so the
 * quarterly fact review (brand book, Part 2) touches one file.
 *
 * Items marked TODO need confirmation from UnivLabs before launch.
 */

export const site = {
  name: "UnivLabs",
  legalName: "UnivLabs Technologies Pvt. Ltd.",
  brandLine: "Engineered for clarity.",
  descriptor: "Surgical systems, designed and made in India.",
  purpose: "Care for all.",
  url: "https://www.univlabs.in",
  city: "Gurugram, India",
  rdSites: ["Gurugram", "Bengaluru", "Lille, France"],
  contact: {
    // Published on univlabs.in for service calls.
    serviceEmail: "customersupport@univlabs.in",
    // General enquiries inbox published on univlabs.in (structured data).
    // TODO: confirm whether sales and demo requests should go elsewhere.
    salesEmail: "info@univlabs.in",
  },
} as const;

export type Fact = {
  value: string;
  label: string;
  source: string;
  /** Set when the figure must be re-checked before publishing. */
  verify?: string;
};

export const facts = {
  suites: {
    value: "250+",
    label: "Reported installations",
    source: "univlabs.in, 2026",
  },
  hospitals: {
    value: "200+",
    label: "Hospitals served",
    source: "univlabs.in, 2026",
  },
  countries: {
    value: "9+",
    label: "Countries reached",
    source: "univlabs.in, 2026",
  },
  warranty: {
    value: "5 years",
    label: "Warranty programme on surgical vision suites",
    source: "univlabs.in, 2026",
  },
  devices: {
    value: "2,000+",
    label: "Devices supplied to hospitals",
    source: "UnivLabs, 2026",
  },
  patents: {
    value: "16",
    label: "Patents filed, 4 granted",
    source: "Electronics For You, 2025",
    verify: "Refresh the count with the IP team.",
  },
  cogniaxis: {
    value: "19",
    label: "Operating rooms on CogniAxis",
    source: "univlabs.in, 2026",
  },
  iso: {
    value: "ISO 13485",
    label: "Certified medical device manufacturing",
    source: "univlabs.in",
    verify: "Attach certificate, scope and expiry.",
  },
  founded: {
    value: "2015",
    label: "Founded in Gurugram",
    source: "Electronics For You, 2025",
  },
  first4k: {
    value: "1st",
    label: "Indigenously made full 4K endoscope tower in India",
    source: "BioSpectrum India, May 2021",
  },
  team: {
    value: "~127",
    label: "Clinicians, engineers and operators",
    source: "univlabs.in, 2026",
  },
} satisfies Record<string, Fact>;

export const proofBar: Fact[] = [
  facts.suites,
  facts.hospitals,
  facts.countries,
  facts.iso,
];

export type NavGroup = {
  label: string;
  href: string;
  items: { label: string; href: string; note?: string }[];
};

export const nav: NavGroup[] = [
  {
    label: "Products",
    href: "/products",
    items: [
      { label: "Surgical Vision", href: "/products#surgical-vision" },
      { label: "Spectra", href: "/products/spectra", note: "4K ICG" },
      { label: "Lumina", href: "/products/lumina" },
      { label: "SurgiStart", href: "/products/surgistart" },
      { label: "Instruments & Devices", href: "/products#instruments" },
      { label: "Hand instruments", href: "/products/hand-instruments" },
      { label: "Am-SafeX", href: "/products/am-safex", note: "Catheter" },
      { label: "Components", href: "/products/components" },
      { label: "Technology explained", href: "/technology" },
    ],
  },
  {
    label: "Specialties",
    href: "/specialties",
    items: [
      { label: "General surgery", href: "/specialties#general-surgery" },
      { label: "Urology", href: "/specialties#urology" },
      { label: "Gynaecology", href: "/specialties#gynaecology" },
      { label: "Orthopaedics", href: "/specialties#orthopaedics" },
    ],
  },
  {
    label: "Connected OR",
    href: "/connected-or",
    items: [
      { label: "CogniAxis", href: "/connected-or" },
      { label: "AxisEdge+", href: "/connected-or#axisedge" },
      { label: "SurgiVault", href: "/connected-or#surgivault" },
      { label: "Dr Mentor", href: "/connected-or#dr-mentor" },
    ],
  },
  {
    label: "Work with us",
    href: "/pay-per-minute",
    items: [
      { label: "Pay Per Minute", href: "/pay-per-minute" },
      { label: "SUFI", href: "/sufi", note: "For surgeons" },
      { label: "Partner programme", href: "/partners" },
      { label: "Service", href: "/service" },
    ],
  },
  {
    label: "Company",
    href: "/about",
    items: [
      { label: "About", href: "/about" },
      { label: "Quality and regulatory", href: "/quality" },
      { label: "Innovation pipeline", href: "/innovation" },
      { label: "Investors", href: "/investors" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const specialties = [
  {
    id: "general-surgery",
    name: "General surgery",
    summary:
      "Laparoscopic general surgery with 4K white light and ICG fluorescence imaging, and the full tower of insufflation, pumps and recording.",
    products: ["spectra", "components", "hand-instruments"],
  },
  {
    id: "urology",
    name: "Urology",
    summary:
      "Endourology and laparoscopic urology, from vision systems to Am-SafeX, a catheter developed with urologists.",
    products: ["spectra", "am-safex", "components"],
  },
  {
    id: "gynaecology",
    name: "Gynaecology",
    summary:
      "Laparoscopic gynaecology and hysteroscopy, with a dedicated hysteroscopy pump for fluid management.",
    products: ["spectra", "components"],
  },
  {
    id: "orthopaedics",
    name: "Orthopaedics",
    summary:
      "Arthroscopy workflows with a dedicated arthroscopy pump for joint distension and fluid management.",
    products: ["components"],
  },
] as const;

export const leadership = [
  {
    name: "Sunil Kumar Singh",
    role: "Founder and CEO",
    bio: "B.Tech, Electronics. 20+ years in medical technology. Formerly Stryker and ZF.",
  },
  {
    name: "Prof. Dr Anil Mandhani",
    role: "Co-founder and CTO, Urology",
    bio: "MBBS, MS, MCh. 30+ years in urology. Chairman, Urology, Fortis.",
  },
  {
    name: "Suresh Alla",
    role: "Co-founder and CTO, Surgical Vision",
    bio: "PhD, Biomedical Electronics. MS, Optics. Formerly Johnson & Johnson.",
  },
  {
    name: "Sridhar Anjanappa",
    role: "CTO, AI and Enterprise",
    bio: "20+ years across surgical data, SaaS and security. Formerly Baxter.",
  },
  {
    name: "Dr Walter Vogel",
    role: "CTO, Optical Design",
    bio: "16+ years in optical engineering. Formerly Karl Storz.",
  },
  {
    name: "Rupinder Singh",
    role: "President, Sales",
    bio: "Gold medallist, Biotechnology. 25+ years. Formerly Kerry Bio.",
  },
  {
    name: "Venkat Bhagwati",
    role: "Director, Regulatory",
    bio: "12+ years across medical device quality and regulatory systems.",
  },
] as const;
