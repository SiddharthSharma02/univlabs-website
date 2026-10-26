"use client";

import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { catalogueItem } from "@/content/catalogue";
import { products } from "@/content/products";
import { site } from "@/content/site";

export const topics = [
  { id: "demo", label: "Request a demo" },
  { id: "brochure", label: "Request a brochure or quotation" },
  { id: "service", label: "Service and support" },
  { id: "cogniaxis", label: "CogniAxis and the connected OR" },
  { id: "ppm", label: "Pay Per Minute waiting list" },
  { id: "sufi", label: "SUFI: pitch an idea" },
  { id: "partner", label: "Become a partner" },
  { id: "regulatory", label: "Regulatory documents" },
  { id: "research", label: "Research collaboration" },
  { id: "investor", label: "Investor enquiry" },
  { id: "careers", label: "Careers" },
] as const;

const field =
  "mt-2 block w-full rounded-xl border border-line bg-paper px-4 py-3 text-[15px] text-navy placeholder:text-steel focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/20";

/**
 * TODO: connect to a real form backend (CRM, email API or Supabase).
 * Until then it opens the visitor's email client with the details filled in.
 */
export function ContactForm() {
  const params = useSearchParams();
  const initialTopic = topics.some((t) => t.id === params.get("topic"))
    ? (params.get("topic") as string)
    : "demo";
  const initialProduct = products.some((p) => p.slug === params.get("product"))
    ? (params.get("product") as string)
    : "";
  // Coming from an instrument or device page: name it in the message.
  const item = catalogueItem(initialProduct, params.get("item") ?? "");
  const initialMessage = item ? `I would like details and a quotation for: ${item.name}.` : "";
  const [sent, setSent] = useState(false);

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
      <label className="sm:col-span-2">
        <span className="label text-navy">What can we help with?</span>
        <select name="topic" defaultValue={initialTopic} className={field}>
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
        <select name="product" defaultValue={initialProduct} className={field}>
          <option value="">Not sure yet</option>
          {products.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>
      </label>
      <label className="sm:col-span-2">
        <span className="label text-navy">Message</span>
        <textarea
          name="message"
          rows={5}
          defaultValue={initialMessage}
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
