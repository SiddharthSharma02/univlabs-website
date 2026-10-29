import Link from "next/link";
import { addressLine, nav, site } from "@/content/site";
import { Logo } from "./brand";
import { ButtonLink, Container } from "./ui";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-navy text-fog">
      <Container className="pt-16 sm:pt-20">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div data-reveal>
            <Logo reversed />
            <p className="mt-6 max-w-sm">{site.descriptor}</p>
            <a
              href={site.contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block max-w-sm text-[15px] leading-relaxed text-fog underline-offset-4 transition-colors hover:text-clinical hover:underline"
            >
              <address className="not-italic">{addressLine}</address>
              <span className="sr-only"> (opens Google Maps in a new tab)</span>
            </a>
            <p className="label mt-4 text-fog">
              R&amp;D · {site.rdSites.join(" · ")}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              <ButtonLink href="/contact?topic=demo" arrow className="max-sm:px-3">
                Request a demo
              </ButtonLink>
              <ButtonLink href="/service" variant="ghost-light" className="max-sm:px-3">
                Service request
              </ButtonLink>
            </div>
          </div>
          {/* Phones: each group folds away, so the footer stays short. */}
          <div className="border-t border-navy-600 sm:hidden">
            {nav.map((group) => (
              <details key={group.label} className="group/f border-b border-navy-600">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                  <span className="label text-blue-300">{group.label}</span>
                  <span aria-hidden className="relative flex size-5 items-center justify-center text-fog">
                    <span className="absolute h-0.5 w-3 rounded-full bg-current" />
                    <span className="absolute h-3 w-0.5 rounded-full bg-current transition-transform duration-300 group-open/f:scale-y-0" />
                  </span>
                </summary>
                <ul className="grid grid-cols-2 gap-x-4 pb-5">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="block py-2 text-[15px] text-fog active:text-clinical">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
          <div data-stagger className="hidden gap-8 sm:grid sm:grid-cols-3 lg:grid-cols-5">
            {nav.map((group) => (
              <div key={group.label}>
                <p className="label text-blue-300">{group.label}</p>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="inline-block text-[15px] text-fog transition-[color,translate] duration-300 hover:translate-x-1 hover:text-clinical"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 max-sm:border-t-0 max-sm:pt-0 border-t sm:mt-16 border-navy-600 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {site.legalName}
          </p>
          <p>
            Service:{" "}
            <a
              href={`mailto:${site.contact.serviceEmail}`}
              className="text-clinical underline-offset-4 hover:underline"
            >
              {site.contact.serviceEmail}
            </a>
          </p>
        </div>
      </Container>

      {/* The brand line at display scale, with the mark's bars drawing in. */}
      <div data-reveal="fade" className="relative mt-12 select-none" aria-hidden>
        <Container>
          <div className="flex items-center gap-[1.2vw] pb-3">
            <span className="draw-bar block h-[0.9vw] min-h-1.5 w-[3vw] rounded-full bg-blue-300" />
            <span className="draw-bar block h-[0.9vw] min-h-1.5 w-[3vw] rounded-full bg-blue-300 [transition-delay:0.35s]" />
            <span className="draw-bar block h-[0.9vw] min-h-1.5 w-[14vw] rounded-full bg-clinical [transition-delay:0.45s]" />
          </div>
        </Container>
        <p className="whitespace-nowrap px-4 pb-2 text-center font-display text-[calc((100vw-2rem)/10.3)] sm:text-[calc((100vw-3rem)/10.3)] lg:text-[calc((100vw-4rem)/10.3)] font-extrabold leading-[0.85] tracking-[-0.045em] text-clinical/95 sm:px-6 lg:px-8">
          {site.brandLine}
        </p>
      </div>
      <p className="sr-only">{site.brandLine}</p>
    </footer>
  );
}

/** Cached so the year is fixed at build time, as Cache Components requires. */
async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}
