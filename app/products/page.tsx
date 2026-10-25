import type { Metadata } from "next";
import Link from "next/link";
import {
  Arrow,
  Container,
  CtaBand,
  PageHero,
  ProductImage,
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
      className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-paper transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1.5 hover:border-blue/40 hover:shadow-[0_24px_60px_-20px_rgba(0,26,73,0.25)]"
    >
      {product.image ? (
        <ProductImage
          image={product.image}
          sizes="(min-width: 768px) 33vw, 100vw"
          className="aspect-[4/3]"
        />
      ) : (
        <div className="relative aspect-[4/3] bg-mist">
          <div className="absolute inset-3 flex items-center justify-center rounded-xl border-2 border-dashed border-steel/40">
            <p className="label text-steel">Product photo to commission</p>
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col border-t border-line p-6">
        <p className="label text-steel">{product.descriptor}</p>
        <h3 className="mt-2 flex items-center justify-between font-display text-xl font-bold text-navy transition-colors group-hover:text-blue">
          {product.name}
          <Arrow className="size-5 text-blue" />
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
                <div data-stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((p) => (
                    <ProductCard key={p.slug} product={p} />
                  ))}
                </div>
              ) : (
                <Link
                  data-reveal
                  href={family.href}
                  className="group mt-8 inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue"
                >
                  Explore {family.name} <Arrow />
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
