"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Arrow } from "./ui";

/**
 * Phones only: once the hero has scrolled away, a demo request stays one
 * tap from the thumb. It steps aside over the footer, which carries the
 * same actions, and on pages that are already the next step.
 */
export function MobileCta() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const hidden = pathname.startsWith("/contact") || pathname.startsWith("/service");

  useEffect(() => {
    if (hidden) return;
    let pastHero = false;
    let atFooter = false;
    const sync = () => setShow(pastHero && !atFooter);
    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.8;
      sync();
    };
    const footer = document.querySelector("footer");
    const io = new IntersectionObserver(([e]) => {
      atFooter = e.isIntersecting;
      sync();
    });
    if (footer) io.observe(footer);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, [hidden, pathname]);

  if (hidden) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] transition-[opacity,translate] duration-[var(--dur-slow)] ease-[var(--ease-out-soft)] sm:hidden ${
        show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <Link
        href="/contact?topic=demo"
        tabIndex={show ? 0 : -1}
        aria-hidden={!show}
        className={`group flex min-h-12 items-center gap-3 rounded-full bg-navy py-1.5 pl-5 pr-1.5 text-[15px] font-semibold text-clinical shadow-[0_16px_40px_-12px_rgba(0,26,73,0.6)] ring-1 ring-navy-600 active:scale-[0.98] ${
          show ? "pointer-events-auto" : ""
        }`}
      >
        <span aria-hidden className="flex items-center gap-1">
          <span className="h-3 w-1 rounded-full bg-blue-300" />
          <span className="h-3 w-1 rounded-full bg-blue-300" />
        </span>
        Request a demo
        <span className="flex size-9 items-center justify-center rounded-full bg-blue text-paper">
          <Arrow />
        </span>
      </Link>
    </div>
  );
}
