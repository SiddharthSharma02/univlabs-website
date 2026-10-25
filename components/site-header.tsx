import Link from "next/link";
import { nav } from "@/content/site";
import { Logo } from "./brand";
import { Container } from "./ui";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((group) => (
              <li key={group.label} className="group relative">
                <Link
                  href={group.href}
                  className="inline-flex h-16 items-center px-3 text-[15px] font-medium text-navy transition-colors hover:text-blue"
                >
                  {group.label}
                </Link>
                <div className="invisible absolute left-0 top-full w-64 translate-y-1 opacity-0 transition group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <ul className="rounded-2xl border border-line bg-paper p-2 shadow-[0_12px_40px_rgba(0,26,73,0.10)]">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="flex items-baseline justify-between gap-3 rounded-lg px-3 py-2 text-[15px] text-navy hover:bg-clinical"
                        >
                          {item.label}
                          {item.note && (
                            <span className="label text-steel">{item.note}</span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/contact?topic=demo"
            className="hidden min-h-10 items-center rounded-full bg-blue px-5 text-[15px] font-semibold text-paper transition-colors hover:bg-blue-600 sm:inline-flex"
          >
            Request a demo
          </Link>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
