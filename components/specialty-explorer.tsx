"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { productBySlug } from "@/content/products";
import { specialties } from "@/content/site";
import { Arrow } from "./ui";

/**
 * Specialties as a list you point at. Hovering or focusing a row shows
 * what UnivLabs supplies for it in the panel alongside. On small screens
 * the panel is hidden and each row shows its summary inline.
 */
export function SpecialtyExplorer() {
  const [active, setActive] = useState(0);
  const s = specialties[active];

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
      <ul className="border-t border-line">
        {specialties.map((sp, n) => {
          const on = n === active;
          return (
            <li key={sp.id} className="border-b border-line">
              <Link
                href={`/specialties#${sp.id}`}
                onPointerEnter={() => setActive(n)}
                onFocus={() => setActive(n)}
                className="group relative flex items-center gap-6 py-6 outline-none focus-visible:bg-clinical"
              >
                <span
                  aria-hidden
                  className={`absolute -left-px top-0 h-full w-1 origin-top rounded-full bg-blue transition-transform duration-500 ease-[var(--ease-out-soft)] scale-y-0 ${
                    on ? "lg:scale-y-100" : ""
                  }`}
                />
                <span className="label w-8 text-steel">0{n + 1}</span>
                <span className="flex-1">
                  <span
                    className={`block font-display text-2xl font-bold tracking-tight transition-[color,translate] duration-500 ease-[var(--ease-out-soft)] sm:text-4xl ${
                      on ? "text-navy lg:translate-x-2" : "text-navy lg:text-steel/70"
                    }`}
                  >
                    {sp.name}
                  </span>
                  <span className="mt-2 block text-[15px] leading-relaxed lg:hidden">
                    {sp.summary}
                  </span>
                </span>
                <span
                  className={`flex size-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                    on
                      ? "border-blue bg-blue text-paper"
                      : "border-line text-navy"
                  }`}
                >
                  <Arrow />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div
        aria-live="polite"
        className="relative hidden overflow-hidden rounded-3xl bg-navy p-8 text-clinical lg:block"
        data-spotlight
      >
        <div key={s.id}>
          <p className="rise label text-blue-300" style={{ "--i": 0 } as CSSProperties}>
            {s.name}
          </p>
          <p
            className="rise mt-4 text-lg leading-relaxed text-fog"
            style={{ "--i": 1 } as CSSProperties}
          >
            {s.summary}
          </p>
          <p
            className="rise label mt-8 text-fog"
            style={{ "--i": 2 } as CSSProperties}
          >
            What we supply
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-3">
            {s.products.map((slug, n) => {
              const p = productBySlug(slug);
              if (!p) return null;
              return (
                <li
                  key={slug}
                  className="rise"
                  style={{ "--i": n + 3 } as CSSProperties}
                >
                  <Link
                    href={`/products/${p.slug}`}
                    className="group flex items-center gap-3 rounded-2xl border border-navy-600 bg-navy-700 p-3 transition-colors hover:border-blue-300"
                  >
                    <span className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-white">
                      {p.image && (
                        <Image
                          src={p.image.src}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-contain p-1"
                        />
                      )}
                    </span>
                    <span className="font-display font-bold">{p.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
