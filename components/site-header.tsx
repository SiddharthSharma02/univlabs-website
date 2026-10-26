import Link from "next/link";
import { DesktopNav } from "./desktop-nav";
import { nav } from "@/content/site";
import { Logo } from "./brand";
import { Container } from "./ui";
import { MobileMenu } from "./mobile-menu";
import { ScrollProgress } from "./motion";

export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur"
      style={{ viewTransitionName: "site-header" }}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <Logo />
        <DesktopNav nav={nav} />
        <div className="flex items-center gap-2">
          <Link
            href="/contact?topic=demo"
            data-magnetic
            className="hidden min-h-10 items-center whitespace-nowrap rounded-full bg-blue px-5 text-[15px] font-semibold text-paper transition-[background-color,translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-[0_10px_24px_-10px_rgba(8,102,244,0.7)] sm:inline-flex"
          >
            Request a demo
          </Link>
          <MobileMenu />
        </div>
      </Container>
      <ScrollProgress />
    </header>
  );
}
