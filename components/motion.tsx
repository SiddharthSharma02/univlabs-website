"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Runs before first paint (see layout). Marks the page as motion-capable
 * unless the visitor prefers reduced motion. Content is only ever hidden
 * for reveal when this class is present.
 */
export const motionBootScript = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')}catch(e){}`;

const REVEAL = "[data-reveal],[data-stagger],[data-scramble]";
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·/";

/**
 * Mono labels resolve like a readout settling: each character cycles
 * briefly, left to right, then locks. Screen readers get the real text.
 */
function scramble(el: HTMLElement) {
  if (el.dataset.scrambled || el.childNodes.length !== 1) return;
  const node = el.firstChild;
  if (!node || node.nodeType !== Node.TEXT_NODE) return;
  el.dataset.scrambled = "1";
  const final = node.textContent ?? "";
  el.setAttribute("aria-label", final);
  const start = performance.now();
  const span = 520;
  const tick = (now: number) => {
    const t = (now - start) / span;
    const locked = Math.floor(t * final.length);
    let out = "";
    for (let k = 0; k < final.length; k++) {
      const c = final[k];
      out +=
        k < locked || c === " "
          ? c
          : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    }
    node.textContent = out;
    if (t < 1) requestAnimationFrame(tick);
    else {
      node.textContent = final;
      el.removeAttribute("aria-label");
    }
  };
  requestAnimationFrame(tick);
}

/**
 * Site-wide motion behaviour, mounted once in the layout:
 * - reveals [data-reveal] and [data-stagger] elements as they scroll in
 * - resolves [data-scramble] labels as they scroll in
 * - feeds the pointer position to [data-spotlight] cards
 * - tilts [data-tilt] cards and pulls [data-magnetic] buttons toward the
 *   pointer (mouse and pen only)
 */
export function MotionRoot() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("motion")) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.classList.add("is-revealed");
            io.unobserve(el);
            if (el.matches("[data-scramble]")) scramble(el);
            el.querySelectorAll<HTMLElement>("[data-scramble]").forEach(scramble);
          }
        }
      },
      // threshold 0: tall elements must still reveal on small screens.
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );

    const watch = (scope: ParentNode) => {
      scope.querySelectorAll<HTMLElement>(REVEAL).forEach((el) => {
        if (!el.classList.contains("is-revealed")) io.observe(el);
      });
    };
    watch(document);

    // New routes mount new nodes: watch those too.
    const mo = new MutationObserver((records) => {
      for (const r of records) {
        r.addedNodes.forEach((n) => {
          if (n instanceof HTMLElement) {
            if (n.matches(REVEAL)) io.observe(n);
            watch(n);
          }
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    let tilted: HTMLElement | null = null;
    let pulled: HTMLElement | null = null;
    const release = (el: HTMLElement | null) => {
      if (!el) return;
      el.style.removeProperty("--rx");
      el.style.removeProperty("--ry");
      el.style.removeProperty("--px");
      el.style.removeProperty("--py");
    };

    const onMove = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const card = target?.closest?.<HTMLElement>("[data-spotlight]");
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
      if (e.pointerType === "touch") return;

      const tilt = target?.closest?.<HTMLElement>("[data-tilt]") ?? null;
      if (tilt !== tilted) {
        release(tilted);
        tilted = tilt;
      }
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.setProperty("--rx", `${(-y * 5).toFixed(2)}deg`);
        tilt.style.setProperty("--ry", `${(x * 6).toFixed(2)}deg`);
      }

      const mag = target?.closest?.<HTMLElement>("[data-magnetic]") ?? null;
      if (mag !== pulled) {
        release(pulled);
        pulled = mag;
      }
      if (mag) {
        const r = mag.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        mag.style.setProperty("--px", `${(x * 0.22).toFixed(1)}px`);
        mag.style.setProperty("--py", `${(y * 0.3).toFixed(1)}px`);
      }
    };
    const onLeave = () => {
      release(tilted);
      release(pulled);
      tilted = pulled = null;
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return null;
}

/** Thin bar under the header showing how far down the page you are. */
export function ScrollProgress() {
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <span
      ref={bar}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-0.5 origin-left scale-x-0 bg-linear-to-r from-blue to-blue-300"
    />
  );
}

/**
 * Counts a figure up from zero the first time it scrolls into view.
 * Renders the final value on the server, so the real number is always
 * in the HTML. Only plain counts animate ("2,000+", "~127"); anything
 * else, like "ISO 13485", is shown as written.
 */
export function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const match = /^(~?)([\d,]+)(\+?)$/.exec(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!match || !el) return;
    if (!document.documentElement.classList.contains("motion")) return;
    const target = Number(match[2].replace(/,/g, ""));
    const format = (n: number) =>
      `${match[1]}${n.toLocaleString("en-IN")}${match[3]}`;

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(format(Math.round(target * eased)));
          if (t < 1) raf = requestAnimationFrame(tick);
          else setDisplay(value);
        };
        setDisplay(format(0));
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // match is derived from value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      <span aria-hidden>{display}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
