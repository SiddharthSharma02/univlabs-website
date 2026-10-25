"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * The hero of the brand: one surgical scene in the three Spectra imaging
 * modes. Auto-advances unless the visitor interacts or prefers reduced motion.
 * The active mode is the solid bar (brand book, graphic device).
 */
const modes = [
  {
    id: "white",
    label: "White light",
    src: "/images/footage/white-light.jpg",
    alt: "Laparoscopic view of the gallbladder and liver under white light",
  },
  {
    id: "overlay",
    label: "ICG overlay",
    src: "/images/footage/icg-overlay.jpg",
    alt: "The same view with ICG fluorescence overlaid in green on the gallbladder and cystic duct",
  },
  {
    id: "nir",
    label: "NIR",
    src: "/images/footage/nir.jpg",
    alt: "The same view in near-infrared monochrome with ICG fluorescence in green",
  },
] as const;

export function ModeViewer({ interval = 3500 }: { interval?: number }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduce) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % modes.length),
      interval,
    );
    return () => window.clearInterval(id);
  }, [paused, interval]);

  return (
    <figure className="w-full">
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-navy-700">
        {modes.map((mode, i) => (
          <Image
            key={mode.id}
            src={mode.src}
            alt={mode.alt}
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            priority={i === 0}
            aria-hidden={i !== active}
            className={`object-cover transition-opacity duration-700 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <p className="label absolute left-4 top-4 rounded-full bg-navy/70 px-3 py-1.5 text-clinical backdrop-blur">
          Real footage · {modes[active].label}
        </p>
      </div>
      <figcaption className="mt-4">
        <span className="sr-only">Imaging mode: </span>
        <div role="group" aria-label="Imaging mode" className="grid grid-cols-3 gap-2">
          {modes.map((mode, i) => {
            const isActive = i === active;
            return (
              <button
                key={mode.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => {
                  setActive(i);
                  setPaused(true);
                }}
                className="group flex flex-col gap-2 rounded-lg p-1 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
              >
                <span
                  aria-hidden
                  className={`h-2 rounded-full transition-colors ${
                    isActive
                      ? mode.id === "white"
                        ? "bg-clinical"
                        : "bg-icg"
                      : "bg-navy-600 group-hover:bg-navy-700"
                  }`}
                />
                <span
                  className={`label ${isActive ? "text-clinical" : "text-fog"}`}
                >
                  {mode.label}
                </span>
              </button>
            );
          })}
        </div>
      </figcaption>
    </figure>
  );
}
