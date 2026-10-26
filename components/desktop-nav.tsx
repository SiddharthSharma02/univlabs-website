"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { products } from "@/content/products";
import type { NavGroup } from "@/content/site";

/**
 * Desktop navigation.
 * - A soft pill slides to whichever item is hovered or focused.
 * - Products opens a mega menu with product photos and status.
 * - Other groups open a compact list.
 * Menus open on hover and on keyboard focus (focus-within), so they work
 * without JavaScript; the script only moves the pill.
 */
export function DesktopNav({ nav }: { nav: NavGroup[] }) {
  const track = useRef<HTMLUListElement>(null);
  const pill = useRef<HTMLSpanElement>(null);

  const moveTo = (el: HTMLElement | null) => {
    const p = pill.current;
    if (!p) return;
    if (!el) {
      p.style.opacity = "0";
      return;
    }
    p.style.opacity = "1";
    p.style.width = `${el.offsetWidth}px`;
    p.style.transform = `translateX(${el.offsetLeft}px)`;
  };

  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul
        ref={track}
        className="relative flex items-center gap-1"
        onPointerLeave={() => moveTo(null)}
      >
        <span
          ref={pill}
          aria-hidden
          className="pointer-events-none absolute left-0 top-1/2 h-9 -translate-y-1/2 rounded-full bg-clinical opacity-0 ring-1 ring-line transition-[transform,width,opacity] duration-300 ease-[var(--ease-out-soft)]"
        />
        {nav.map((group) => {
          const mega = group.href === "/products";
          return (
            <li
              key={group.label}
              className={`group/nav ${mega ? "" : "relative"}`}
              onPointerEnter={(e) => moveTo(e.currentTarget)}
              onFocus={(e) => moveTo(e.currentTarget)}
            >
              <Link
                href={group.href}
                className="relative inline-flex h-16 items-center gap-1 whitespace-nowrap px-2.5 text-[15px] xl:px-3.5 font-medium text-navy transition-colors hover:text-blue"
              >
                {group.label}
                <svg
                  aria-hidden
                  viewBox="0 0 12 12"
                  className="size-3 text-steel transition-transform duration-300 group-hover/nav:rotate-180 group-focus-within/nav:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <path d="m3 4.5 3 3 3-3" />
                </svg>
              </Link>
              <div
                className={`invisible absolute top-full pt-1 opacity-0 transition-[opacity,translate,visibility] duration-300 ease-[var(--ease-out-soft)] -translate-y-1 group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100 group-focus-within/nav:visible group-focus-within/nav:translate-y-0 group-focus-within/nav:opacity-100 ${
                  mega ? "left-1/2 w-[840px] -translate-x-1/2" : "left-0 w-64"
                }`}
              >
                {mega ? <ProductsMenu /> : <ListMenu group={group} />}
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function ListMenu({ group }: { group: NavGroup }) {
  return (
    <ul className="rounded-2xl border border-line bg-paper p-2 shadow-[0_24px_60px_-24px_rgba(0,26,73,0.3)]">
      {group.items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="flex items-baseline justify-between gap-3 rounded-lg px-3 py-2 text-[15px] text-navy transition-[background-color,padding] duration-200 hover:bg-clinical hover:pl-4"
          >
            {item.label}
            {item.note && <span className="label text-steel">{item.note}</span>}
          </Link>
        </li>
      ))}
    </ul>
  );
}

const familyLabel = {
  "surgical-vision": "Surgical Vision",
  instruments: "Instruments & Devices",
} as const;

function ProductsMenu() {
  const groups = (["surgical-vision", "instruments"] as const).map((id) => ({
    id,
    items: products.filter((p) => p.family === id),
  }));
  return (
    <div className="grid grid-cols-[1fr_15rem] overflow-hidden rounded-3xl border border-line bg-paper shadow-[0_30px_80px_-30px_rgba(0,26,73,0.35)]">
      <div className="grid grid-cols-2 gap-x-2 gap-y-5 p-4">
        {groups.map((g) => (
          <div key={g.id}>
            <p className="label px-2 text-steel">{familyLabel[g.id]}</p>
            <ul className="mt-2 space-y-1">
              {g.items.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="group/item flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-clinical"
                  >
                    <span className="relative size-12 shrink-0 overflow-hidden rounded-lg border border-line bg-white">
                      {p.image ? (
                        <Image
                          src={p.image.src}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-contain p-1 transition-transform duration-500 group-hover/item:scale-110"
                        />
                      ) : (
                        <span className="absolute inset-1 rounded-md border border-dashed border-steel/50" />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-[15px] font-bold text-navy transition-colors group-hover/item:text-blue">
                        {p.name}
                      </span>
                      <span className="block truncate text-[13px] text-steel">
                        {p.descriptor}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Link
        href="/products/spectra"
        data-spotlight
        className="group/feat relative flex flex-col justify-end overflow-hidden bg-navy p-5 text-clinical"
      >
        <Image
          src="/images/footage/icg-overlay.jpg"
          alt=""
          fill
          sizes="240px"
          className="object-cover opacity-60 transition-[opacity,scale] duration-700 group-hover/feat:scale-105 group-hover/feat:opacity-80"
        />
        <span aria-hidden className="absolute inset-0 bg-linear-to-t from-navy via-navy/60 to-transparent" />
        <span className="relative label text-icg">ICG overlay</span>
        <span className="relative mt-2 font-display text-xl font-bold leading-tight">
          Spectra 4K ICG
        </span>
        <span className="relative mt-1 text-[13px] text-fog">
          White light, ICG overlay and NIR from one camera.
        </span>
        <span className="relative mt-4 text-[13px] font-semibold text-blue-300">
          See it in action →
        </span>
      </Link>
      <Link
        href="/products"
        className="col-span-2 flex items-center justify-between border-t border-line bg-clinical px-6 py-3 text-[14px] font-semibold text-navy transition-colors hover:text-blue"
      >
        All products, by family
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
