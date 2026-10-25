import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Container,
  CtaBand,
  PageHero,
  SectionHeader,
  StatusTag,
} from "@/components/ui";
import { families, productsInFamily, type Product } from "@/content/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "UnivLabs surgical vision suites, components, laparoscopic hand instruments and the Am-SafeX catheter.",
};

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-paper transition-shadow hover:shadow-[0_12px_40px_rgba(0,26,73,0.08)]"
    >
      <div className="relative aspect-[4/3] bg-mist">
        {product.image ? (
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-3 flex items-center justify-center rounded-xl border-2 border-dashed border-steel/40">
            <p className="label text-steel">Product photo to commission</p>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="label text-steel">{product.descriptor}</p>
        <h3 className="mt-2 font-display text-xl font-bold text-navy group-hover:text-blue">
          {product.name}
        </h3>
        <div className="mt-4">
          <StatusTag status={product.status} />
        </div>
      </div>
    </Link>
  );
}

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Surgical systems, designed and made in India"
        intro="Vision suites, standalone components, instruments and devices for minimally invasive surgery."
      />
      {families.map((family, i) => {
        const items = productsInFamily(family.id);
        const anchor = family.id === "instruments" ? "instruments" : family.id;
        return (
          <section
            key={family.id}
            id={anchor}
            className={`scroll-mt-20 ${i % 2 ? "bg-paper" : "bg-clinical"}`}
          >
            <Container className="py-16 sm:py-20">
              <SectionHeader
                eyebrow={`0${i + 1} · Family`}
                title={family.name}
                intro={family.summary}
              />
              {items.length > 0 ? (
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((p) => (
                    <ProductCard key={p.slug} product={p} />
                  ))}
                </div>
              ) : (
                <Link
                  href={family.href}
                  className="mt-8 inline-block text-[15px] font-semibold text-blue hover:underline"
                >
                  Explore {family.name}
                </Link>
              )}
            </Container>
          </section>
        );
      })}
      <CtaBand
        title="Not sure which configuration fits?"
        body="Tell us your specialty and case volume. We will recommend a configuration and arrange a demonstration."
        primary={{ href: "/contact?topic=demo", label: "Request a demo" }}
        secondary={{ href: "/specialties", label: "Browse by specialty" }}
      />
    </>
  );
}
