import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ModeViewer } from "@/components/mode-viewer";
import {
  ButtonLink,
  Container,
  CtaBand,
  Eyebrow,
  SectionMarker,
  StatusTag,
  Todo,
} from "@/components/ui";
import { families, productBySlug, products } from "@/content/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} · ${product.descriptor}`,
    description: product.summary.includes("[") ? undefined : product.summary,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const family = families.find((f) => f.id === product.family);
  const isSpectra = product.slug === "spectra";

  return (
    <>
      <section className="bg-navy text-clinical">
        <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionMarker />
            <nav aria-label="Breadcrumb" className="label mt-8 text-fog">
              <Link href="/products" className="hover:text-clinical">
                Products
              </Link>
              <span aria-hidden> / </span>
              {family && (
                <Link href={family.href} className="hover:text-clinical">
                  {family.name}
                </Link>
              )}
            </nav>
            <h1 className="mt-4 font-display text-5xl font-bold tracking-tight sm:text-6xl">
              {product.name}
            </h1>
            <p className="label mt-3 text-blue-300">{product.descriptor}</p>
            <p className="mt-8 font-display text-2xl font-semibold text-clinical text-balance">
              {product.headline}
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-fog text-pretty">
              {product.summary}
            </p>
            <div className="mt-6">
              <StatusTag status={product.status} dark />
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={`/contact?topic=demo&product=${product.slug}`}>
                Request a demo
              </ButtonLink>
              <ButtonLink
                href={`/contact?topic=brochure&product=${product.slug}`}
                variant="ghost-light"
              >
                Request a brochure
              </ButtonLink>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[560px]">
            {isSpectra ? (
              <ModeViewer />
            ) : product.image ? (
              <div className="relative aspect-square overflow-hidden rounded-3xl">
                <Image
                  src={product.image.src}
                  alt={product.image.alt}
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="flex aspect-square items-center justify-center rounded-3xl border-2 border-dashed border-navy-600 bg-navy-700">
                <p className="label text-fog">Product photo to commission</p>
              </div>
            )}
          </div>
        </Container>
      </section>

      {product.todo && (
        <Container className="pt-8">
          <Todo>{product.todo}</Todo>
        </Container>
      )}

      {product.highlights.length > 0 && (
        <section className="bg-clinical">
          <Container className="py-16 sm:py-20">
            <Eyebrow>Highlights</Eyebrow>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {product.highlights.map((h) => (
                <div
                  key={h.title}
                  className="rounded-2xl border border-line border-t-4 border-t-blue bg-paper p-8"
                >
                  <h2 className="font-display text-lg font-bold text-navy">
                    {h.title}
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed">{h.body}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="bg-paper">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <Eyebrow>Specifications</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy">
                Technical summary
              </h2>
              <p className="mt-4 leading-relaxed">
                Final configuration is confirmed against compatibility, intended
                use and regulatory availability in your market.
              </p>
            </div>
            {product.specs.length > 0 ? (
              <dl className="divide-y divide-line rounded-2xl border border-line">
                {product.specs.map((row) => (
                  <div key={row.label} className="grid grid-cols-[1fr_1.4fr] gap-4 px-6 py-4">
                    <dt className="label self-center text-steel">{row.label}</dt>
                    <dd className="font-mono text-[15px] text-navy">{row.value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <div className="flex items-center rounded-2xl border border-dashed border-steel/50 bg-clinical p-8">
                <p className="text-[15px] text-steel">
                  Full specifications are available on request.
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>

      <CtaBand
        title={`See ${product.name} in your operating room`}
        body="Our team will arrange a demonstration and confirm the right configuration for your specialty."
        primary={{ href: `/contact?topic=demo&product=${product.slug}`, label: "Request a demo" }}
        secondary={{ href: "/pay-per-minute", label: "Ownership options" }}
      />
    </>
  );
}
