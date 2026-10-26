"use client";

import { useMemo, useState } from "react";
import { telescopes } from "@/content/telescopes";

/**
 * The endoscope catalogue as a finder: pick a specialty, then narrow by
 * diameter or direction of view. All rows come from content/telescopes.ts.
 */
export function TelescopeFinder() {
  const [spec, setSpec] = useState(0);
  const [dia, setDia] = useState<string | null>(null);
  const [view, setView] = useState<string | null>(null);

  const rows = telescopes[spec].rows;
  const diameters = useMemo(
    () => [...new Set(rows.map((r) => r.diameter))].sort((a, b) => parseFloat(a) - parseFloat(b)),
    [rows],
  );
  const views = useMemo(
    () => [...new Set(rows.map((r) => r.view))].sort((a, b) => parseFloat(a) - parseFloat(b)),
    [rows],
  );
  const shown = rows.filter((r) => (!dia || r.diameter === dia) && (!view || r.view === view));

  const pickSpec = (n: number) => {
    setSpec(n);
    setDia(null);
    setView(null);
  };

  return (
    <div>
      <div role="tablist" aria-label="Specialty" className="flex flex-wrap gap-2">
        {telescopes.map((t, n) => (
          <button
            key={t.specialty}
            role="tab"
            type="button"
            aria-selected={n === spec}
            onClick={() => pickSpec(n)}
            className={`rounded-full px-4 py-2 text-[15px] font-semibold transition-colors ${
              n === spec ? "bg-navy text-clinical" : "border border-line bg-paper text-navy hover:border-navy"
            }`}
          >
            {t.specialty}
            <span className={`ml-2 font-mono text-[12px] ${n === spec ? "text-blue-300" : "text-steel"}`}>
              {t.rows.length}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Chips label="Diameter" options={diameters} value={dia} onChange={setDia} />
        <Chips label="Direction of view" options={views} value={view} onChange={setView} />
      </div>

      <div className="mt-6 overflow-x-auto rounded-3xl border border-line bg-paper">
        <table className="w-full min-w-[32rem] text-left">
          <caption className="sr-only">
            {telescopes[spec].specialty} endoscopes: {shown.length} of {rows.length} shown
          </caption>
          <thead>
            <tr className="border-b border-line bg-clinical">
              {["Part number", "Diameter", "Direction of view", "Working length"].map((h) => (
                <th key={h} scope="col" className="label px-5 py-3 font-normal text-steel">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody key={`${spec}-${dia}-${view}`}>
            {shown.map((r, n) => (
              <tr
                key={r.part}
                className="rise border-b border-line last:border-0 transition-colors hover:bg-white"
                style={{ animationDelay: `${Math.min(n, 12) * 25}ms`, animationDuration: "0.5s" }}
              >
                <td className="px-5 py-3 font-mono text-[14px] text-navy">{r.part}</td>
                <td className="px-5 py-3 font-mono text-[14px]">{r.diameter}</td>
                <td className="px-5 py-3 font-mono text-[14px]">{r.view}</td>
                <td className="px-5 py-3 font-mono text-[14px]">{r.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p aria-live="polite" className="label mt-3 text-steel">
        {shown.length} of {rows.length} {telescopes[spec].specialty.toLowerCase()} endoscopes
      </p>
    </div>
  );
}

function Chips({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string | null;
  onChange: (v: string | null) => void;
}) {
  return (
    <fieldset>
      <legend className="label text-steel">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {[null, ...options].map((o) => {
          const on = value === o;
          return (
            <button
              key={o ?? "all"}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(o)}
              className={`rounded-full px-3 py-1.5 font-mono text-[13px] transition-colors ${
                on ? "bg-blue text-paper" : "border border-line bg-paper text-navy hover:border-blue"
              }`}
            >
              {o ?? "All"}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
