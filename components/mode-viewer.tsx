"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { NOTE } from "./nir-lens";

/**
 * The hero of the brand: one surgical scene in the three Spectra imaging
 * modes. Each new mode wipes in from the left, like a light being switched.
 * The active mode is the solid bar (brand book, graphic device), and it
 * fills as a timer while the viewer auto-advances. Interaction pauses it;
 * reduced motion stops it.
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

export function ModeViewer({ interval = 4200 }: { interval?: number }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [still, setStill] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Reading a browser preference after mount is the point of this effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStill(reduce);
    if (paused || reduce) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % modes.length),
      interval,
    );
    return () => window.clearInterval(id);
  }, [paused, interval]);

  const running = !paused && !still;

  return (
    <figure className="w-full">
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-navy-700 shadow-[0_40px_120px_-40px_rgba(8,102,244,0.55)] ring-1 ring-navy-600">
        {modes.map((mode, i) => {
          const isActive = i === active;
          return (
            <div
              key={mode.id}
              aria-hidden={!isActive}
              className="absolute inset-0"
              style={{
                zIndex: isActive ? 2 : 1,
                clipPath: isActive ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
                // Entering: wipe in. Leaving: stay put until covered, then hide.
                transition: isActive
                  ? "clip-path 0.9s cubic-bezier(0.2, 0.7, 0.2, 1)"
                  : "clip-path 0s linear 0.9s",
              }}
            >
              <Image
                src={mode.src}
                alt={mode.alt}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                priority={i === 0}
                className="object-cover motion-safe:animate-[drift_14s_ease-in-out_infinite_alternate]"
              />
            </div>
          );
        })}
        {/* The light edge that travels with each wipe. */}
        <span
          key={active}
          aria-hidden
          className="pointer-events-none absolute inset-y-0 z-[3] w-px bg-clinical/80 shadow-[0_0_24px_4px_rgba(244,246,249,0.5)] motion-safe:animate-[travel_0.9s_cubic-bezier(0.2,0.7,0.2,1)_both] motion-reduce:hidden"
        />
        <p className="label absolute left-4 top-4 z-[4] rounded-full bg-navy/70 px-3 py-1.5 text-clinical backdrop-blur">
          Real footage ·{" "}
          <span className={active === 0 ? "" : "text-icg"}>{modes[active].label}</span>
        </p>
      </div>
      <figcaption className="mt-4">
        <span className="sr-only">Imaging mode: </span>
        <div role="group" aria-label="Imaging mode" className="grid grid-cols-3 gap-2">
          {modes.map((mode, i) => {
            const isActive = i === active;
            const fill = mode.id === "white" ? "bg-clinical" : "bg-icg";
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
                  className="relative h-2 overflow-hidden rounded-full bg-navy-600 transition-colors group-hover:bg-navy-700"
                >
                  {isActive && (
                    <span
                      key={`${active}-${running}`}
                      className={`absolute inset-0 origin-left rounded-full ${fill}`}
                      style={
                        running
                          ? { animation: `fill-bar ${interval}ms linear both` }
                          : undefined
                      }
                    />
                  )}
                </span>
                <span
                  className={`label transition-colors ${isActive ? "text-clinical" : "text-fog group-hover:text-clinical"}`}
                >
                  {mode.label}
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-[13px] leading-relaxed text-fog">{NOTE}</p>
      </figcaption>
    </figure>
  );
}
