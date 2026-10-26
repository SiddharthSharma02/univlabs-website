import type { Metadata } from "next";
import Link from "next/link";
import { Container, CtaBand, PageHero, StatusTag } from "@/components/ui";
import { productBySlug } from "@/content/products";
import { specialties } from "@/content/site";

export const metadata: Metadata = {
  title: "Specialties",
  description:
    "UnivLabs systems for general surgery, urology, gynaecology and orthopaedics.",
};

export default function SpecialtiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Specialties"
        title="Organised the way your department works"
        intro="Choose your specialty to see the UnivLabs systems that support it."
      >
        {specialties.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="rounded-full border border-navy-600 px-4 py-2 text-[15px] text-clinical hover:border-blue-300"
          >
            {s.name}
          </a>
        ))}
      </PageHero>
      {specialties.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          className={`scroll-mt-20 ${i % 2 ? "bg-paper" : "bg-clinical"}`}
        >
          <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="label text-blue">0{i + 1}</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy">
                {s.name}
              </h2>
              <p className="mt-4 text-lg leading-relaxed">{s.summary}</p>
            </div>
            <ul data-stagger className="grid gap-4 sm:grid-cols-2">
              {s.products.map((slug) => {
                const p = productBySlug(slug);
                if (!p) return null;
                return (
                  <li key={slug}>
                    <Link
                      href={`/products/${p.slug}`}
                      className="group flex h-full flex-col rounded-3xl border border-line bg-paper transition-[transform,translate,box-shadow] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(0,26,73,0.2)] p-6 hover:border-navy"
                    >
                      <p className="label text-steel">{p.descriptor}</p>
                      <p className="mt-2 font-display text-lg font-bold text-navy group-hover:text-blue">
                        {p.name}
                      </p>
                      <div className="mt-4">
                        <StatusTag status={p.status} />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Container>
        </section>
      ))}
      <CtaBand
        title="Talk to our clinical applications team"
        body="We will map your case mix to the right configuration."
        primary={{ href: "/contact?topic=demo", label: "Request a demo" }}
      />
    </>
  );
}
