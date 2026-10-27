"use client";

import Image from "next/image";
import {
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

/** univlabs.in wording for imaging demonstrations. */
export const NOTE =
  "For educational presentation only. Clinical use depends on applicable regulatory indications, approved labelling and professional judgement.";

/** Lens radius in CSS pixels. */
const RADIUS = 160;
const STEP = 24;

/**
 * The surgical frame under white light, with a small near-infrared lens that
 * follows the cursor. Only the area under the lens shows NIR.
 * - Mouse: hover to show, move to explore.
 * - Touch: tap or drag a finger across the frame.
 * - Keyboard: Enter or Space shows the lens at the centre; arrow keys move it.
 *
 * Position is written straight to CSS variables, so moving the lens never
 * re-renders React.
 */
export function NirLens({
  className = "",
  dark = false,
}: {
  className?: string;
  /** Set on navy sections so the caption keeps its contrast. */
  dark?: boolean;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const place = (x: number, y: number) => {
    const el = frame.current;
    if (!el) return;
    const w = el.clientWidth;
    const h = el.clientHeight;
    pos.current = { x: Math.min(w, Math.max(0, x)), y: Math.min(h, Math.max(0, y)) };
    el.style.setProperty("--x", `${pos.current.x}px`);
    el.style.setProperty("--y", `${pos.current.y}px`);
  };

  const fromPointer = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    place(e.clientX - r.left, e.clientY - r.top);
  };

  const show = (on: boolean) => {
    const el = frame.current;
    if (!el) return;
    // Never more than 30% of the frame width, so small screens keep context.
    const r = Math.min(RADIUS, el.clientWidth * 0.3);
    el.style.setProperty("--r", on ? `${r}px` : "0px");
    setActive(on);
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const el = frame.current;
    if (!el) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!active) place(el.clientWidth / 2, el.clientHeight / 2);
      show(!active);
      return;
    }
    const move: Record<string, [number, number]> = {
      ArrowLeft: [-STEP, 0],
      ArrowRight: [STEP, 0],
      ArrowUp: [0, -STEP],
      ArrowDown: [0, STEP],
    };
    const d = move[e.key];
    if (!d || !active) return;
    e.preventDefault();
    place(pos.current.x + d[0], pos.current.y + d[1]);
  };

  return (
    <figure className={className}>
      <div
        ref={frame}
        className="relative aspect-square select-none overflow-hidden rounded-3xl bg-navy-700 has-[button:focus-visible]:ring-4 has-[button:focus-visible]:ring-blue-300"
        style={{ "--r": "0px", "--x": "50%", "--y": "50%" } as CSSProperties}
      >
        <Image
          src="/images/footage/white-light.jpg"
          alt=""
          fill
          sizes="(min-width: 1024px) 600px, 100vw"
          className="object-cover"
        />
        {/* NIR, visible only inside the lens. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            clipPath: "circle(var(--r) at var(--x) var(--y))",
            transition: "clip-path 120ms ease-out",
          }}
        >
          <Image
            src="/images/footage/nir.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 600px, 100vw"
            className="object-cover"
          />
        </div>
        {/* Lens rim. */}
        <span
          aria-hidden
          className="pointer-events-none absolute rounded-full border border-clinical/80 shadow-[0_0_0_1px_rgba(0,26,73,0.35),0_0_18px_rgba(244,246,249,0.35)]"
          style={{
            left: "var(--x)",
            top: "var(--y)",
            width: "calc(var(--r) * 2)",
            height: "calc(var(--r) * 2)",
            transform: "translate(-50%, -50%)",
            opacity: active ? 1 : 0,
            transition:
              "left 120ms ease-out, top 120ms ease-out, width 120ms ease-out, height 120ms ease-out, opacity 150ms",
          }}
        />

        <p className="label pointer-events-none absolute left-4 top-4 rounded-full bg-navy/75 px-3 py-1.5 text-clinical backdrop-blur">
          Real footage · White light
          {active && <span className="text-icg"> · NIR lens</span>}
        </p>
        <p
          aria-hidden
          className={`label pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-navy/75 px-3 py-1.5 text-clinical backdrop-blur transition-opacity duration-300 ${
            active ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className="hidden [@media(hover:hover)]:inline">Hover to see NIR</span>
          <span className="[@media(hover:hover)]:hidden">Touch to see NIR</span>
        </p>

        <button
          type="button"
          aria-pressed={active}
          aria-label="Near-infrared lens over a laparoscopic view of the gallbladder. Press Enter to show it, then use the arrow keys to move it."
          onPointerEnter={(e) => {
            if (e.pointerType === "touch") return;
            fromPointer(e);
            show(true);
          }}
          onPointerMove={(e) => {
            if (e.pointerType === "touch" && !active) return;
            fromPointer(e);
          }}
          onPointerLeave={(e) => {
            if (e.pointerType === "touch") return;
            show(false);
          }}
          onPointerDown={(e) => {
            if (e.pointerType !== "touch") return;
            fromPointer(e);
            show(true);
          }}
          onKeyDown={onKey}
          onBlur={() => show(false)}
          className="absolute inset-0 h-full w-full cursor-crosshair touch-pan-y outline-none"
        />
      </div>
      <figcaption className="mt-3">
        <span className={`label block ${dark ? "text-fog" : "text-steel"}`}>
          White light, with a near-infrared view under the cursor
        </span>
        <span className={`mt-2 block text-[13px] leading-relaxed ${dark ? "text-fog" : "text-steel"}`}>
          {NOTE}
        </span>
      </figcaption>
    </figure>
  );
}
