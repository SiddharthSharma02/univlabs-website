"use client";

import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";

/**
 * The same surgical frame under white light, with the ICG overlay revealed
 * on hover. The overlay grows as a circle from where the cursor enters and
 * closes towards where it leaves. Touch: tap to toggle. Keyboard: the frame
 * is a toggle button (Enter or Space).
 */
export function IcgReveal({
  className = "",
  dark = false,
}: {
  className?: string;
  /** Set on navy sections so the caption keeps its contrast. */
  dark?: boolean;
}) {
  const [on, setOn] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const lastPointer = useRef<string>("mouse");

  const at = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    // Clamp to the frame: a fast exit can report a point well outside it.
    const pct = (v: number) => Math.min(100, Math.max(0, v * 100));
    setOrigin({
      x: pct((e.clientX - r.left) / r.width),
      y: pct((e.clientY - r.top) / r.height),
    });
  };

  return (
    <figure className={className}>
      <div className="relative aspect-square select-none overflow-hidden rounded-3xl bg-navy-700 has-[button:focus-visible]:ring-4 has-[button:focus-visible]:ring-blue-300">
        <Image
          src="/images/footage/white-light.jpg"
          alt=""
          fill
          sizes="(min-width: 1024px) 600px, 100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 transition-[clip-path] duration-700 ease-[var(--ease-out-soft)]"
          style={{
            clipPath: `circle(${on ? 150 : 0}% at ${origin.x}% ${origin.y}%)`,
          }}
        >
          <Image
            src="/images/footage/icg-overlay.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 600px, 100vw"
            className="object-cover"
          />
        </div>

        <p className="label pointer-events-none absolute left-4 top-4 rounded-full bg-navy/75 px-3 py-1.5 text-clinical backdrop-blur">
          Real footage ·{" "}
          <span className={on ? "text-icg" : ""}>{on ? "ICG overlay" : "White light"}</span>
        </p>
        <p
          aria-hidden
          className={`label pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-navy/75 px-3 py-1.5 text-clinical backdrop-blur transition-opacity duration-300 ${
            on ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className="hidden [@media(hover:hover)]:inline">Hover to reveal ICG</span>
          <span className="[@media(hover:hover)]:hidden">Tap to reveal ICG</span>
        </p>

        <button
          type="button"
          aria-pressed={on}
          aria-label="Show the ICG overlay on this laparoscopic view of the gallbladder and cystic duct"
          onPointerDown={(e) => {
            lastPointer.current = e.pointerType;
            // A tap reveals from where the finger lands.
            if (e.pointerType === "touch") at(e);
          }}
          onPointerEnter={(e) => {
            lastPointer.current = e.pointerType;
            if (e.pointerType === "touch") return;
            at(e);
            setOn(true);
          }}
          onPointerLeave={(e) => {
            if (e.pointerType === "touch") return;
            at(e);
            setOn(false);
          }}
          onClick={(e) => {
            // Mouse users already see the reveal on hover; a click changes nothing.
            const keyboard = e.detail === 0;
            if (!keyboard && lastPointer.current !== "touch") return;
            if (keyboard) setOrigin({ x: 50, y: 50 });
            setOn((v) => !v);
          }}
          className="absolute inset-0 h-full w-full cursor-crosshair outline-none"
        />
      </div>
      <figcaption className={`label mt-3 ${dark ? "text-fog" : "text-steel"}`}>
        The same frame under white light and with the ICG overlay
      </figcaption>
    </figure>
  );
}
