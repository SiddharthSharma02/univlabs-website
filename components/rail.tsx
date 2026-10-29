"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * On phones, a row of cards you swipe through, with a pager drawn from the
 * mark's bars: the current card is the long solid bar. From `md` up the
 * rail steps aside and the cards lay out as `className` says, usually a
 * grid, or `md:contents` to join a parent grid such as the home bento.
 */
export function Rail({
  children,
  label,
  className = "",
  dark = false,
}: {
  children: ReactNode;
  /** Names the region for screen readers, e.g. "Products". */
  label: string;
  /** Layout from `md` up. */
  className?: string;
  dark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const count = Children.count(children);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const items = Array.from(el.children) as HTMLElement[];
      if (!items.length) return;
      // At the end of the rail the last card may never reach the start.
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) {
        setActive(items.length - 1);
        return;
      }
      const left = el.getBoundingClientRect().left;
      let best = 0;
      let bestDist = Infinity;
      items.forEach((item, n) => {
        const d = Math.abs(item.getBoundingClientRect().left - left - 16);
        if (d < bestDist) {
          bestDist = d;
          best = n;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    el.addEventListener("scroll", onScroll, { passive: true });

    // With `md:contents` the rail has no box of its own, so the site's
    // scroll reveal can never see it. Watch its first card instead.
    let io: IntersectionObserver | undefined;
    if (
      getComputedStyle(el).display === "contents" &&
      document.documentElement.classList.contains("motion") &&
      el.firstElementChild
    ) {
      io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            el.classList.add("is-revealed");
            io?.disconnect();
          }
        },
        { rootMargin: "0px 0px -10% 0px" },
      );
      io.observe(el.firstElementChild);
    }

    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      io?.disconnect();
    };
  }, []);

  const go = (n: number) => {
    const el = ref.current;
    const item = el?.children[n] as HTMLElement | undefined;
    if (!el || !item) return;
    el.scrollTo({
      left: item.offsetLeft - el.offsetLeft - parseFloat(getComputedStyle(el).scrollPaddingLeft || "0"),
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  return (
    <div className="min-w-0 md:contents">
      <div
        ref={ref}
        role="region"
        aria-label={label}
        tabIndex={0}
        data-stagger
        className={`-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto overscroll-x-contain px-4 pb-2 outline-none [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 [&::-webkit-scrollbar]:hidden max-md:[&>*]:w-[82%] max-md:[&>*]:max-w-sm max-md:[&>*]:shrink-0 max-md:[&>*]:snap-start md:mx-0 md:overflow-visible md:px-0 md:pb-0 ${className}`}
      >
        {children}
      </div>
      {count > 1 && (
        <div className="mt-4 flex items-center justify-between gap-4 md:hidden">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: count }, (_, n) => (
              <button
                key={n}
                type="button"
                onClick={() => go(n)}
                aria-label={`Show ${n + 1} of ${count}`}
                aria-current={n === active || undefined}
                className="flex h-6 items-center"
              >
                <span
                  aria-hidden
                  className={`block h-1.5 rounded-full transition-[width,background-color] duration-[var(--dur-base)] ease-[var(--ease-out-soft)] ${
                    n === active
                      ? `w-8 ${dark ? "bg-blue-300" : "bg-blue"}`
                      : `w-2 ${dark ? "bg-navy-600" : "bg-line"}`
                  }`}
                />
              </button>
            ))}
          </div>
          <p aria-hidden className={`label ${dark ? "text-fog" : "text-steel"}`}>
            {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </p>
        </div>
      )}
    </div>
  );
}
