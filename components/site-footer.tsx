import Link from "next/link";
import { nav, site } from "@/content/site";
import { Logo } from "./brand";
import { Container } from "./ui";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-fog">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo reversed />
            <p className="mt-6 font-display text-2xl font-bold tracking-tight text-clinical">
              {site.brandLine}
            </p>
            <p className="mt-2 max-w-sm">{site.descriptor}</p>
            <p className="label mt-6 text-fog">
              R&amp;D · {site.rdSites.join(" · ")}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {nav.map((group) => (
              <div key={group.label}>
                <p className="label text-blue-300">{group.label}</p>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-[15px] text-fog transition-colors hover:text-clinical"
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
    </footer>
  );
}

/** Cached so the year is fixed at build time, as Cache Components requires. */
async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}
