import Image from "next/image";
import Link from "next/link";

/**
 * The UnivLabs mark, rebuilt as SVG from the supplied logo (nine rounded bars).
 * Replace with the official vector master when UnivLabs sends it.
 */
export function Mark({
  className = "h-6 w-auto",
  color = "currentColor",
  title,
}: {
  className?: string;
  color?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 383 367"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <g fill={color}>
        <rect x="0" y="0" width="35" height="114" rx="9" />
        <rect x="78" y="0" width="35" height="114" rx="9" />
        <rect x="160" y="0" width="223" height="35" rx="9" />
        <rect x="160" y="82" width="223" height="35" rx="9" />
        <rect x="0" y="162" width="383" height="35" rx="9" />
        <rect x="0" y="244" width="223" height="35" rx="9" />
        <rect x="269" y="248" width="35" height="114" rx="9" />
        <rect x="348" y="248" width="35" height="114" rx="9" />
        <rect x="0" y="332" width="223" height="35" rx="9" />
      </g>
    </svg>
  );
}

/** Primary lockup: navy mark + blue wordmark, or all-white when reversed. */
export function Logo({
  reversed = false,
  className = "",
}: {
  reversed?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="UnivLabs home"
      className={`inline-flex items-center gap-2.5 ${className}`}
    >
      <Mark
        className="h-7 w-auto"
        color={reversed ? "var(--color-paper)" : "var(--color-navy)"}
      />
      <Image
        src={reversed ? "/brand/wordmark-white.png" : "/brand/wordmark-blue.png"}
        alt=""
        width={1301}
        height={258}
        className="h-7 w-auto"
        priority
      />
    </Link>
  );
}
