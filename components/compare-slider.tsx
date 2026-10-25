"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

/**
 * Drag to compare the same surgical frame under white light and with the
 * ICG overlay. Built on a native range input, so it works with a mouse,
 * touch and the arrow keys. On first view it sweeps once to show that it
 * moves, unless the visitor prefers reduced motion.
 */
export function CompareSlider({
  className = "",
  dark = false,
}: {
  className?: string;
  /** Set on navy sections so the caption keeps its contrast. */
  dark?: boolean;
}) {
  const [pos, setPos] = useState(50);
  const [touched, setTouched] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const el = ref.current;
    if (!el || touched) return;
    if (!document.documentElement.classList.contains("motion")) return;

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        // 50 → 78 → 24 → 50, eased, once.
        const keys = [50, 78, 24, 50];
        const seg = 900;
        const start = performance.now();
        const tick = (now: number) => {
          const t = (now - start) / seg;
          const i = Math.floor(t);
          if (i >= keys.length - 1) {
            setPos(50);
            return;
          }
          const f = t - i;
          const e = f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2;
          setPos(keys[i] + (keys[i + 1] - keys[i]) * e);
          raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [touched]);

  return (
    <figure className={className}>
      <div
        ref={ref}
        className="relative aspect-square select-none overflow-hidden rounded-3xl bg-navy-700 has-[input:focus-visible]:ring-4 has-[input:focus-visible]:ring-blue-300"
      >
        <Image
          src="/images/footage/icg-overlay.jpg"
          alt="Laparoscopic view with ICG fluorescence overlaid in green on the gallbladder and cystic duct"
          fill
          sizes="(min-width: 1024px) 600px, 100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src="/images/footage/white-light.jpg"
            alt="The same view under white light"
            fill
            sizes="(min-width: 1024px) 600px, 100vw"
            className="object-cover"
          />
        </div>

        {/* Divider and handle */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-clinical shadow-[0_0_16px_rgba(244,246,249,0.7)]"
          style={{ left: `${pos}%` }}
        >
          <span className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-clinical/60 bg-navy/80 text-clinical backdrop-blur">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6 3 12l6 6M15 6l6 6-6 6" />
            </svg>
          </span>
        </div>

        <p className="label pointer-events-none absolute left-4 top-4 rounded-full bg-navy/75 px-3 py-1.5 text-clinical backdrop-blur">
          White light
        </p>
        <p className="label pointer-events-none absolute right-4 top-4 rounded-full bg-navy/75 px-3 py-1.5 text-icg backdrop-blur">
          ICG overlay
        </p>

        <label htmlFor={id} className="sr-only">
          Compare white light and ICG overlay. Lower values show more of the
          ICG overlay.
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          step={1}
          value={Math.round(pos)}
          onChange={(e) => {
            setTouched(true);
            setPos(Number(e.target.value));
          }}
          onPointerDown={() => setTouched(true)}
          className="absolute inset-0 h-full w-full cursor-ew-resize touch-pan-y opacity-0"
        />
      </div>
      <figcaption className={`label mt-3 ${dark ? "text-fog" : "text-steel"}`}>
        Real footage from a UnivLabs camera · drag to compare
      </figcaption>
    </figure>
  );
}
