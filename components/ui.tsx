import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { Product, Status } from "@/content/products";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  tone = "blue",
}: {
  children: ReactNode;
  tone?: "blue" | "steel" | "light";
}) {
  const color =
    tone === "blue"
      ? "text-blue"
      : tone === "light"
        ? "text-blue-300"
        : "text-steel";
  return (
    <p data-scramble className={`label ${color}`}>
      {children}
    </p>
  );
}

/**
 * Splits a headline into words that rise out of a soft focus one by one.
 * `delay` is the index of the first word, for lines that follow others.
 */
export function Words({
  text,
  start = 0,
  delay = 120,
}: {
  text: string;
  start?: number;
  delay?: number;
}) {
  return (
    <>
      {text.split(" ").map((w, n) => (
        <span key={n}>
          <span
            className="word"
            style={{ "--w": start + n, "--d": `${delay}ms` } as CSSProperties}
          >
            {w}
          </span>
          {n < text.split(" ").length - 1 && " "}
        </span>
      ))}
    </>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  dark?: boolean;
}) {
  return (
    <div className="max-w-3xl" data-reveal>
      {eyebrow && <Eyebrow tone={dark ? "light" : "blue"}>{eyebrow}</Eyebrow>}
      <h2
        className={`mt-3 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl ${
          dark ? "text-clinical" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-4 text-lg leading-relaxed text-pretty ${
            dark ? "text-fog" : "text-ink"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost-light";
  className?: string;
  /** Show a ↗ arrow that nudges on hover. */
  arrow?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  arrow = false,
}: ButtonProps) {
  const styles = {
    primary:
      "bg-blue text-paper hover:bg-blue-600 hover:shadow-[0_12px_30px_-10px_rgba(8,102,244,0.7)] focus-visible:outline-blue",
    secondary:
      "border border-line bg-paper text-navy hover:border-navy focus-visible:outline-navy",
    "ghost-light":
      "border border-navy-600 text-clinical hover:border-blue-300 focus-visible:outline-blue-300",
  }[variant];
  return (
    <Link
      href={href}
      data-magnetic={variant === "primary" ? "" : undefined}
      className={`group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold transition-[background-color,border-color,color,translate,box-shadow] duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 ${styles} ${className}`}
    >
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

const statusCopy: Record<Status, string> = {
  available: "Available",
  development: "In development",
  research: "Research programme",
};

/**
 * Status is always shown in words and with the solid/dashed bar convention,
 * never by colour alone. Solid = live. Dashed = not yet available.
 */
export function StatusTag({
  status,
  dark = false,
}: {
  status: Status;
  dark?: boolean;
}) {
  const live = status === "available";
  return (
    <span className="inline-flex items-center gap-2">
      <span
        aria-hidden
        className={`h-1.5 w-6 rounded-full ${
          live
            ? dark
              ? "bg-blue-300"
              : "bg-blue"
            : `border border-dashed ${dark ? "border-fog" : "border-steel"}`
        }`}
      />
      <span className={`label ${dark ? "text-fog" : "text-steel"}`}>
        {statusCopy[status]}
      </span>
    </span>
  );
}

/** Navy inner-page hero. */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-clinical">
      <HeroGlow />
      <HeroBars />
      <Container className="relative py-16 sm:py-24">
        <div className="rise">
          <SectionMarker />
        </div>
        <div className="mt-8 max-w-3xl">
          <div className="rise" style={{ "--i": 1 } as CSSProperties}>
            <Eyebrow tone="light">{eyebrow}</Eyebrow>
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            <Words text={title} delay={200} />
          </h1>
          {intro && (
            <p
              className="rise mt-6 text-lg leading-relaxed text-fog text-pretty sm:text-xl"
              style={{ "--i": 3 } as CSSProperties}
            >
              {intro}
            </p>
          )}
          {children && (
            <div
              className="rise mt-8 flex flex-wrap gap-3"
              style={{ "--i": 4 } as CSSProperties}
            >
              {children}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

/** Two short bars and one long bar, echoing the mark's top row. */
export function SectionMarker({ dark = true }: { dark?: boolean }) {
  return (
    <div aria-hidden className="flex items-center gap-1.5">
      <span className={`h-5 w-1.5 rounded-full ${dark ? "bg-blue-300" : "bg-blue"}`} />
      <span className={`h-5 w-1.5 rounded-full ${dark ? "bg-blue-300" : "bg-blue"}`} />
      <span className={`h-1.5 w-14 rounded-full ${dark ? "bg-clinical" : "bg-navy"}`} />
    </div>
  );
}

/** Visible placeholder for content UnivLabs still has to supply. */
export function Todo({ children }: { children: ReactNode }) {
  return (
    <div data-reveal="fade" className="rounded-xl border border-dashed border-steel/60 bg-mist/60 px-4 py-3 text-sm text-steel">
      <span className="label mr-2 text-steel">To confirm</span>
      {children}
    </div>
  );
}

export function CtaBand({
  title,
  body,
  primary,
  secondary,
}: {
  title: string;
  body: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="bg-clinical">
      <Container className="py-16 sm:py-20">
        <div
          data-reveal="scale"
          data-spotlight
          className="relative flex flex-col gap-8 overflow-hidden rounded-3xl bg-navy p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between"
        >
          <HeroBars compact />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-2xl font-bold tracking-tight text-clinical sm:text-3xl">
              {title}
            </h2>
            <p className="mt-3 text-lg text-fog">{body}</p>
          </div>
          <div className="relative flex flex-wrap gap-3">
            <ButtonLink href={primary.href} arrow>
              {primary.label}
            </ButtonLink>
            {secondary && (
              <ButtonLink href={secondary.href} variant="ghost-light">
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

/** ↗ arrow used on links and cards; nudges when its `group` is hovered. */
export function Arrow({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className={`nudge shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 11 11 5M6 5h5v5" />
    </svg>
  );
}

/** Soft light behind navy heroes, like a monitor glowing in a dark OR. */
export function HeroGlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute -right-40 -top-40 size-[640px] rounded-full bg-blue/20 blur-[120px]" />
      <div className="absolute -bottom-60 left-1/4 size-[520px] rounded-full bg-blue-300/10 blur-[120px]" />
    </div>
  );
}

/**
 * The mark's rounded bars, sliding in and drifting slowly at the right of
 * navy panels. Decorative only. One solid accent bar; the rest are quiet.
 */
export function HeroBars({ compact = false }: { compact?: boolean }) {
  const bars = [
    { w: 34, top: 8, tone: "bg-navy-600", float: 10 },
    { w: 22, top: 24, tone: "bg-navy-600", float: -8 },
    { w: 56, top: 40, tone: "bg-blue", float: 14, solid: true },
    { w: 30, top: 56, tone: "bg-navy-600", float: -12 },
    { w: 44, top: 72, tone: "bg-navy-700", float: 9 },
  ];
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-y-0 right-0 hidden md:block ${
        compact ? "w-1/3 opacity-60" : "w-[44%]"
      }`}
    >
      {bars.map((b, i) => (
        <span
          key={i}
          className="absolute right-[-4%] block"
          style={{ top: `${b.top}%`, width: `${b.w}%` }}
        >
          <span
            className={`rise block rounded-full ${compact ? "h-3" : "h-5 lg:h-6"} ${b.tone} ${
              b.solid ? "opacity-80" : "opacity-70"
            }`}
            style={
              {
                "--i": i + 2,
                "--float": `${b.float}px`,
                animation: `rise 1s var(--ease-out-soft) ${i * 110 + 200}ms both, float-bar ${9 + i * 1.7}s ease-in-out ${1.2 + i * 0.3}s infinite`,
              } as CSSProperties
            }
          />
        </span>
      ))}
    </div>
  );
}

/**
 * Product image on a card or hero. Studio shots on white are contained on
 * a white plate; renders always carry a visible "Render" label (brand
 * book, imagery: never pass a render off as a photograph).
 */
export function ProductImage({
  image,
  sizes,
  priority = false,
  className = "",
}: {
  image: NonNullable<Product["image"]>;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const contain = image.fit === "contain";
  return (
    <div
      className={`relative overflow-hidden ${contain ? "bg-white" : "bg-mist"} ${className}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.04] ${
          contain ? "object-contain p-6" : "object-cover"
        }`}
      />
      {image.render && (
        <span className="label absolute bottom-3 left-3 rounded-full bg-navy/80 px-2.5 py-1 text-[11px] text-clinical">
          Render
        </span>
      )}
    </div>
  );
}

/** A slow ticker of plain facts. Pauses on hover; still with reduced motion. */
export function Ticker({ items, dark = false }: { items: string[]; dark?: boolean }) {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-10 pr-10"
    >
      {items.map((t) => (
        <li key={t} className="flex items-center gap-10 whitespace-nowrap">
          <span className={`label ${dark ? "text-fog" : "text-steel"}`}>{t}</span>
          <span
            aria-hidden
            className={`h-1.5 w-6 rounded-full ${dark ? "bg-navy-600" : "bg-line"}`}
          />
        </li>
      ))}
    </ul>
  );
  return (
    <div
      className="group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
    >
      <div className="flex animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/**
 * The pipeline as a flow: live stages are solid and connected by moving
 * signals; research stages are dashed and their bar "marches". Status is
 * always also written in words.
 */
export function FlowDiagram({
  steps,
  dark = false,
}: {
  steps: { name: string; detail: string; status: Status }[];
  dark?: boolean;
}) {
  return (
    <ol
      data-stagger
      className={`grid gap-4 lg:gap-0 ${
        steps.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
      }`}
    >
      {steps.map((step, i) => {
        const live = step.status === "available";
        const nextLive = steps[i + 1]?.status === "available";
        const last = i === steps.length - 1;
        return (
          <li key={step.name} className="relative flex flex-col lg:flex-row lg:items-stretch">
            <div
              data-spotlight={dark || undefined}
              className={`relative flex-1 overflow-hidden rounded-2xl border p-6 ${
                dark
                  ? live
                    ? "border-navy-600 bg-navy-700"
                    : "border-dashed border-navy-600 bg-navy"
                  : live
                    ? "border-line bg-paper"
                    : "border-dashed border-steel/50 bg-clinical"
              }`}
            >
              <p className={`label ${dark ? "text-fog" : "text-steel"}`}>
                0{i + 1}
              </p>
              <span
                aria-hidden
                className={`mt-4 block h-2.5 rounded-full ${
                  live
                    ? `draw-bar ${dark ? "bg-blue-300" : "bg-blue"}`
                    : `march ${dark ? "text-fog/60" : "text-steel/60"}`
                }`}
              />
              <p
                className={`mt-5 font-display text-xl font-bold ${
                  dark ? "text-clinical" : "text-navy"
                }`}
              >
                {step.name}
              </p>
              <p className={`mt-1 text-[15px] ${dark ? "text-fog" : "text-ink"}`}>
                {step.detail}
              </p>
              <div className="mt-4">
                <StatusTag status={step.status} dark={dark} />
              </div>
            </div>
            {!last && (
              <Connector live={live && nextLive} dark={dark} />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Connector({ live, dark }: { live: boolean; dark: boolean }) {
  const dot = `absolute size-2 rounded-full shadow-[0_0_12px_2px_rgba(111,163,255,0.6)] ${
    dark ? "bg-blue-300" : "bg-blue"
  }`;
  return (
    <div
      aria-hidden
      className="relative flex h-10 items-center justify-center lg:h-auto lg:w-12"
    >
      {live ? (
        <span
          className={`relative block h-full w-0.5 lg:h-0.5 lg:w-full ${
            dark ? "bg-blue-300/50" : "bg-blue/40"
          }`}
        >
          {/* vertical signal on small screens, horizontal on large */}
          <span
            className={`${dot} left-1/2 -translate-x-1/2 animate-[travel-down_2.2s_ease-in-out_infinite] motion-reduce:hidden lg:hidden`}
          />
          <span
            className={`${dot} top-1/2 hidden -translate-x-1/2 -translate-y-1/2 animate-[travel_2.2s_ease-in-out_infinite] lg:block motion-reduce:lg:hidden`}
          />
        </span>
      ) : (
        <span
          className={`block h-full w-0 border-l-2 border-dashed lg:h-0 lg:w-full lg:border-l-0 lg:border-t-2 ${
            dark ? "border-fog/50" : "border-steel/50"
          }`}
        />
      )}
    </div>
  );
}
