import Link from "next/link";
import { nav, site } from "@/content/site";
import { Logo } from "./brand";
import { ButtonLink, Container } from "./ui";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-navy text-fog">
      <Container className="pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div data-reveal>
            <Logo reversed />
            <p className="mt-6 max-w-sm">{site.descriptor}</p>
            <p className="label mt-6 text-fog">
              R&amp;D · {site.rdSites.join(" · ")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact?topic=demo" arrow>
                Request a demo
              </ButtonLink>
              <ButtonLink href="/service" variant="ghost-light">
                Service request
              </ButtonLink>
            </div>
          </div>
          <div data-stagger className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
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

        <div className="mt-16 flex flex-col gap-4 border-t border-navy-600 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
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
