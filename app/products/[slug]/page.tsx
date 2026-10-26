import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, type CSSProperties } from "react";
import { IcgReveal } from "@/components/icg-reveal";
import { ModeViewer } from "@/components/mode-viewer";
import {
  ButtonLink,
  Container,
  CtaBand,
  Eyebrow,
  HeroGlow,
  ProductImage,
  SectionHeader,
  SectionMarker,
  StatusTag,
  Todo,
} from "@/components/ui";
import { families, productBySlug, products } from "@/content/products";

type Props = { params: Promise<{ slug: string }> };

const i = (n: number) => ({ "--i": n }) as CSSProperties;

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

/**
 * The page reads the URL inside <Suspense> so navigation can show the
 * shell at once (Cache Components). Every listed product is prerendered,
 * so visitors never see the fallback for those. Unknown slugs are turned
 * into a real 404 by proxy.ts before this renders; notFound() below is the
 * backstop.
 */
export default function ProductPage({ params }: Props) {
  return (
    <Suspense fallback={<ProductHeroFallback />}>
      <ProductContent params={params} />
    </Suspense>
  );
}

function ProductHeroFallback() {
  return (
    <section aria-busy className="relative overflow-hidden bg-navy text-clinical">
      <HeroGlow />
      <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionMarker />
          <p className="label mt-8 text-fog">Products</p>
          <span aria-hidden className="mt-4 block h-14 w-2/3 rounded-2xl bg-navy-700" />
          <span aria-hidden className="mt-8 block h-5 w-full rounded-full bg-navy-700" />
          <span aria-hidden className="mt-3 block h-5 w-4/5 rounded-full bg-navy-700" />
        </div>
        <div aria-hidden className="mx-auto aspect-square w-full max-w-[560px] rounded-3xl bg-navy-700" />
      </Container>
    </section>
  );
}

async function ProductContent({ params }: Props) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const family = families.find((f) => f.id === product.family);
  const isSpectra = product.slug === "spectra";

  return (
    <>
      <section className="relative overflow-hidden bg-navy text-clinical">
        <HeroGlow />
        <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="rise" style={i(0)}>
              <SectionMarker />
            </div>
            <nav aria-label="Breadcrumb" className="rise label mt-8 text-fog" style={i(1)}>
              <Link href="/products" className="transition-colors hover:text-clinical">
                Products
              </Link>
              <span aria-hidden> / </span>
              {family && (
                <Link href={family.href} className="transition-colors hover:text-clinical">
                  {family.name}
                </Link>
              )}
            </nav>
            <h1
              className="rise mt-4 font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
              style={i(2)}
            >
              {product.name}
            </h1>
            <p className="rise label mt-3 text-blue-300" style={i(2)}>
              {product.descriptor}
            </p>
            <p
              className="rise mt-8 font-display text-2xl font-semibold text-clinical text-balance"
              style={i(3)}
            >
              {product.headline}
            </p>
            <p
              className="rise mt-4 max-w-xl text-lg leading-relaxed text-fog text-pretty"
              style={i(4)}
            >
              {product.summary}
            </p>
            <div className="rise mt-6" style={i(4)}>
              <StatusTag status={product.status} dark />
            </div>
            <div className="rise mt-10 flex flex-wrap gap-3" style={i(5)}>
              <ButtonLink href={`/contact?topic=demo&product=${product.slug}`} arrow>
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
          <div className="rise mx-auto w-full max-w-[560px]" style={i(3)}>
            {isSpectra ? (
              <ModeViewer />
            ) : product.image ? (
              <ProductImage
                image={product.image}
                sizes="(min-width: 1024px) 560px, 100vw"
                priority
                className="aspect-square rounded-3xl shadow-[0_40px_120px_-40px_rgba(8,102,244,0.55)] ring-1 ring-navy-600"
              />
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
          <Container className="py-16 sm:py-24">
            <div data-reveal>
              <Eyebrow>Highlights</Eyebrow>
            </div>
            <div data-stagger className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {product.highlights.map((h, n) => (
                <div
                  key={h.title}
                  className="group rounded-3xl border border-line bg-paper p-8 transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(0,26,73,0.2)]"
                >
                  <p className="label text-steel">0{n + 1}</p>
                  <span
                    aria-hidden
                    className="draw-bar mt-4 block h-1.5 w-10 rounded-full bg-blue"
                  />
                  <h2 className="mt-5 font-display text-xl font-bold text-navy">
                    {h.title}
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed">{h.body}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {isSpectra && (
        <section className="relative overflow-hidden bg-navy text-clinical">
          <HeroGlow />
          <Container className="relative grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <SectionHeader
              dark
              eyebrow="Try it"
              title="Hover to see the fluorescence"
              intro="The same field, under white light and with the ICG overlay. Real footage from a UnivLabs camera."
            />
            <div data-reveal="scale">
              <IcgReveal dark />
            </div>
          </Container>
        </section>
      )}

      {product.gallery && product.gallery.length > 0 && (
        <section className="bg-paper">
          <Container className="py-16 sm:py-24">
            <SectionHeader
              eyebrow={isSpectra ? "The tower" : "The range"}
              title={isSpectra ? "Every part, designed to work together" : "Studio photographs"}
            />
            <ul
              data-stagger
              className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {product.gallery.map((g) => (
                <li
                  key={g.src}
                  className="group overflow-hidden rounded-3xl border border-line bg-white transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(0,26,73,0.2)]"
                >
                  <ProductImage
                    image={{ src: g.src, alt: g.alt, fit: "contain" }}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="aspect-square"
                  />
                  <p className="label border-t border-line px-6 py-4 text-navy">{g.caption}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <section className="bg-clinical">
        <Container className="py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div data-reveal>
              <Eyebrow>Specifications</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                Technical summary
              </h2>
              <p className="mt-4 leading-relaxed">
                Final configuration is confirmed against compatibility, intended
                use and regulatory availability in your market.
              </p>
            </div>
            {product.specs.length > 0 ? (
              <dl
                data-stagger
                className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-paper"
              >
                {product.specs.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-[1fr_1.4fr] gap-4 px-6 py-5 transition-colors hover:bg-white"
                  >
                    <dt className="label self-center text-steel">{row.label}</dt>
                    <dd className="font-mono text-[15px] text-navy">{row.value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <div
                data-reveal
                className="flex items-center rounded-3xl border border-dashed border-steel/50 bg-paper p-8"
              >
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
