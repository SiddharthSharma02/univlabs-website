import Link from "next/link";
import type { ReactNode } from "react";
import type { Status } from "@/content/products";

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
  return <p className={`label ${color}`}>{children}</p>;
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
    <div className="max-w-3xl">
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
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const styles = {
    primary:
      "bg-blue text-paper hover:bg-blue-600 focus-visible:outline-blue",
    secondary:
      "border border-line bg-paper text-navy hover:border-navy focus-visible:outline-navy",
    "ghost-light":
      "border border-navy-600 text-clinical hover:border-blue-300 focus-visible:outline-blue-300",
  }[variant];
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${styles} ${className}`}
    >
      {children}
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
    <section className="bg-navy text-clinical">
      <Container className="py-16 sm:py-24">
        <SectionMarker />
        <div className="mt-8 max-w-3xl">
          <Eyebrow tone="light">{eyebrow}</Eyebrow>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-6 text-lg leading-relaxed text-fog text-pretty sm:text-xl">
              {intro}
            </p>
          )}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
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
    <div className="rounded-xl border border-dashed border-steel/60 bg-mist/60 px-4 py-3 text-sm text-steel">
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
        <div className="flex flex-col gap-8 rounded-3xl bg-navy p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-bold tracking-tight text-clinical sm:text-3xl">
              {title}
            </h2>
            <p className="mt-3 text-lg text-fog">{body}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
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
