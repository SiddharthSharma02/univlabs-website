"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/content/site";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the menu after navigating.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-11 items-center justify-center rounded-full border border-line text-navy"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span aria-hidden className="flex w-5 flex-col gap-1.5">
          <span
            className={`h-0.5 rounded-full bg-navy transition ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 rounded-full bg-navy transition ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 rounded-full bg-navy transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </span>
      </button>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-paper px-4 pb-10 pt-4"
        >
          {nav.map((group) => (
            <div key={group.label} className="border-b border-line py-4">
              <Link
                href={group.href}
                className="font-display text-lg font-bold text-navy"
              >
                {group.label}
              </Link>
              <ul className="mt-2 grid grid-cols-2 gap-x-4">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block py-2 text-[15px] text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Link
            href="/contact?topic=demo"
            className="mt-6 flex min-h-12 items-center justify-center rounded-full bg-blue font-semibold text-paper"
          >
            Request a demo
          </Link>
        </nav>
      )}
    </div>
  );
}
