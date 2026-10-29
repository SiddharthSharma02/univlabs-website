"use client";

import { useSearchParams } from "next/navigation";
import { useState, type CSSProperties, type FormEvent } from "react";
import { catalogueItem } from "@/content/catalogue";
import { products } from "@/content/products";
import { site } from "@/content/site";

export const topics = [
  { id: "demo", label: "Request a demo" },
  { id: "brochure", label: "Request a brochure or quotation" },
  { id: "service", label: "Service and support" },
  { id: "cogniaxis", label: "CogniAxis and the connected OR" },
  { id: "ppm", label: "Pay Per Minute: request a meeting" },
  { id: "sufi", label: "SUFI: pitch an idea" },
  { id: "partner", label: "Become a partner" },
  { id: "regulatory", label: "Regulatory documents" },
  { id: "research", label: "Research collaboration" },
  { id: "investor", label: "Investor enquiry" },
  { id: "careers", label: "Careers" },
] as const;

const field =
  "mt-2 block w-full rounded-xl border border-line bg-paper px-4 py-3 text-[15px] text-navy placeholder:text-steel focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/20";

/** What the form panel says for each topic. */
const intros: Record<(typeof topics)[number]["id"], string> = {
  demo: "Tell us your specialty and case volume, and we will arrange a demonstration.",
  brochure: "Tell us what you need, and we will send details and a quotation.",
  service: "Tell us the product and the problem, and our service team will respond.",
  cogniaxis: "Tell us about your operating rooms, and our CogniAxis team will get in touch.",
  ppm: "Tell us about your hospital. Our team will walk you through the equipment, suitability, commercials and next steps. No payment now, and no obligation to proceed.",
  sufi: "Tell us about the clinical problem you want to solve. Our engineers will get back to you.",
  partner: "Tell us about your company, markets and specialties.",
  regulatory: "Tell us which documents you need and for which market.",
  research: "Tell us about your institution and the question you want to study.",
  investor: "Tell us about yourself, and our team will share materials after a short introduction.",
  careers: "Tell us about the role you are interested in and your experience.",
};

type Prefill = { topic: string; product: string; message: string };

/** Reads topic, product and item from the URL. */
function prefillFrom(params: URLSearchParams): Prefill {
  const topic = topics.some((t) => t.id === params.get("topic"))
    ? (params.get("topic") as string)
    : "demo";
  const product = products.some((p) => p.slug === params.get("product"))
    ? (params.get("product") as string)
    : "";
  // Coming from an instrument or device page: name it in the message.
  const item = catalogueItem(product, params.get("item") ?? "");
  const message = item ? `I would like details and a quotation for: ${item.name}.` : "";
  return { topic, product, message };
}

/**
 * TODO: connect to a real form backend (CRM, email API or Supabase).
 * Until then it opens the visitor's email client with the details filled in.
 *
 * Topic, product and message follow the URL. A link to /contact from the
 * contact page itself (the header's "Request a demo", say) keeps the same
 * form mounted, so they are reset whenever the query changes. What the
 * visitor typed in the other fields is kept. A message they wrote
 * themselves is never replaced.
 */
export function ContactForm() {
  const params = useSearchParams();
  const query = params.toString();
  const [lastQuery, setLastQuery] = useState(query);
  const [values, setValues] = useState<Prefill>(() => prefillFrom(params));
  const [prefilledMessage, setPrefilledMessage] = useState(values.message);
  const [sent, setSent] = useState(false);

  // Adjust state while rendering when the URL changes (React's recommended
  // pattern for state derived from props, no effect needed).
  if (query !== lastQuery) {
    const next = prefillFrom(params);
    const keepMessage = values.message !== "" && values.message !== prefilledMessage;
    setLastQuery(query);
    setValues({ ...next, message: keepMessage ? values.message : next.message });
    setPrefilledMessage(next.message);
    setSent(false);
  }

  const set = (key: keyof Prefill) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));
  const topic = topics.find((t) => t.id === values.topic) ?? topics[0];

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const topic = topics.find((t) => t.id === data.get("topic"))?.label ?? "Enquiry";
    const to =
      data.get("topic") === "service"
        ? site.contact.serviceEmail
        : site.contact.salesEmail;
    const lines = [
      `Name: ${data.get("name")}`,
      `Role: ${data.get("role")}`,
      `Institution: ${data.get("institution")}`,
      `City / country: ${data.get("location")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone")}`,
      `Product: ${products.find((p) => p.slug === data.get("product"))?.name ?? "Not specified"}`,
      ...(data.get("topic") === "ppm"
        ? [
            `Laparoscopic cases a month (approx.): ${data.get("cases") || "Not given"}`,
            `Preferred meeting time (IST): ${data.get("meeting") || "Not given"}`,
          ]
        : []),
      "",
      String(data.get("message") ?? ""),
    ];
    const url = `mailto:${to}?subject=${encodeURIComponent(
      `${topic} · ${data.get("institution")}`,
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = url;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <div aria-live="polite" className="sm:col-span-2">
        <p className="label text-blue">You are contacting us about</p>
        <h2 key={topic.id} className="rise mt-2 font-display text-2xl font-bold tracking-tight text-navy">
          {topic.label}
        </h2>
        <p key={`${topic.id}-intro`} className="rise mt-2 text-[15px] leading-relaxed" style={{ "--i": 1 } as CSSProperties}>
          {intros[topic.id]}
        </p>
      </div>
      <label className="sm:col-span-2">
        <span className="label text-navy">What can we help with?</span>
        <select name="topic" value={values.topic} onChange={set("topic")} className={field}>
          {topics.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span className="label text-navy">Name</span>
        <input name="name" required autoComplete="name" className={field} />
      </label>
      <label>
        <span className="label text-navy">Role</span>
        <input name="role" placeholder="Surgeon, procurement, distributor…" className={field} />
      </label>
      <label>
        <span className="label text-navy">Institution</span>
        <input name="institution" required autoComplete="organization" className={field} />
      </label>
      <label>
        <span className="label text-navy">City and country</span>
        <input name="location" className={field} />
      </label>
      <label>
        <span className="label text-navy">Email</span>
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>
      <label>
        <span className="label text-navy">Phone</span>
        <input name="phone" type="tel" autoComplete="tel" className={field} />
      </label>
      <label className="sm:col-span-2">
        <span className="label text-navy">Product (optional)</span>
        <select name="product" value={values.product} onChange={set("product")} className={field}>
          <option value="">Not sure yet</option>
          {products.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>
      </label>
      {values.topic === "ppm" && (
        <>
          <label>
            <span className="label text-navy">Laparoscopic cases a month</span>
            <input name="cases" inputMode="numeric" placeholder="Approximate" className={field} />
          </label>
          <label>
            <span className="label text-navy">Preferred meeting time (IST)</span>
            <input name="meeting" type="datetime-local" className={field} />
          </label>
        </>
      )}
      <label className="sm:col-span-2">
        <span className="label text-navy">Message</span>
        <textarea
          name="message"
          rows={5}
          value={values.message}
          onChange={set("message")}
          placeholder="Your specialty, case volume and what you would like to see."
          className={field}
        />
      </label>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-blue px-8 font-semibold text-paper transition-colors hover:bg-blue-600"
        >
          Send enquiry
        </button>
        <p aria-live="polite" className="text-[15px] text-steel">
          {sent
            ? "Your email app should open with the details filled in."
            : "The right team will reply to you directly."}
        </p>
      </div>
    </form>
  );
}
