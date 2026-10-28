import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";
import {
  Arrow,
  Container,
  CtaBand,
  PageHero,
  ProductImage,
  SectionHeader,
  StatusTag,
} from "@/components/ui";
import { buyersGuide, FaqList } from "@/components/suite-sections";
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
      className="group flex items-center gap-4 border-b border-line py-4 transition-[transform,translate,box-shadow,border-color] duration-500 ease-[var(--ease-out-soft)] sm:flex-col sm:items-stretch sm:gap-0 sm:overflow-hidden sm:rounded-3xl sm:border sm:bg-paper sm:py-0 sm:hover:-translate-y-1.5 sm:hover:border-blue/40 sm:hover:shadow-[0_24px_60px_-20px_rgba(0,26,73,0.25)]"
    >
      {product.image ? (
        <ViewTransition name={`product-${product.slug}`} share="morph" default="none">
          <ProductImage
            image={product.image}
            sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 112px"
            className="aspect-square w-28 shrink-0 rounded-2xl border border-line sm:aspect-[4/3] sm:w-auto sm:rounded-none sm:border-0"
            pad="p-2 sm:p-6"
            labelClassName="max-sm:bottom-1.5 max-sm:left-1.5 max-sm:px-1.5 max-sm:py-0.5 max-sm:text-[9px]"
          />
        </ViewTransition>
      ) : (
        <div className="relative aspect-square w-28 shrink-0 rounded-2xl bg-mist sm:aspect-[4/3] sm:w-auto sm:rounded-none">
          <div className="absolute inset-3 flex items-center justify-center rounded-xl border-2 border-dashed border-steel/40">
            <p className="label text-steel">Product photo to commission</p>
          </div>
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col sm:border-t sm:border-line sm:p-6">
        <p className="label order-2 mt-1 text-[11px] text-steel sm:order-none sm:mt-0 sm:text-[13px]">{product.descriptor}</p>
        <h3 className="flex items-center justify-between gap-3 font-display text-lg font-bold text-navy transition-colors group-hover:text-blue sm:mt-2 sm:text-xl">
          {product.name}
          <Arrow className="size-5 text-blue" />
        </h3>
        <div className="order-3 mt-3 sm:mt-4">
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
                <div data-stagger className="mt-8 grid border-t border-line sm:mt-10 sm:grid-cols-2 sm:gap-6 sm:border-t-0 lg:grid-cols-3">
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
      <section className="bg-paper">
        <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeader
            eyebrow="Buyer’s guide"
            title="Choose for the clinical workflow"
            intro="Compare imaging, configuration, service, training and regulatory status."
          />
          <FaqList faqs={buyersGuide} />
        </Container>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: buyersGuide.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      </section>
      <CtaBand
        title="Not sure which configuration fits?"
        body="Tell us your specialty and case volume. We will recommend a configuration and arrange a demonstration."
        primary={{ href: "/contact?topic=demo", label: "Request a demo" }}
        secondary={{ href: "/specialties", label: "Browse by specialty" }}
      />
    </>
  );
}
