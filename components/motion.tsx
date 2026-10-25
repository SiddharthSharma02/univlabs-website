"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Runs before first paint (see layout). Marks the page as motion-capable
 * unless the visitor prefers reduced motion. Content is only ever hidden
 * for reveal when this class is present.
 */
export const motionBootScript = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')}catch(e){}`;

const REVEAL = "[data-reveal],[data-stagger]";

/**
 * Site-wide motion behaviour, mounted once in the layout:
 * - reveals [data-reveal] and [data-stagger] elements as they scroll in
 * - feeds the pointer position to [data-spotlight] cards
 */
export function MotionRoot() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("motion")) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-revealed");
            io.unobserve(e.target);
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

    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.<HTMLElement>(
        "[data-spotlight]",
      );
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("pointermove", onMove);
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
