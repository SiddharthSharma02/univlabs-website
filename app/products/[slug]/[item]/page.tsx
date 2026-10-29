import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Rail } from "@/components/rail";
import { notFound } from "next/navigation";
import { Suspense, type CSSProperties } from "react";
import { ItemImage } from "@/components/catalogue";
import { TelescopeFinder } from "@/components/telescope-finder";
import {
  Arrow,
  ButtonLink,
  Container,
  CtaBand,
  Eyebrow,
  HeroGlow,
  SectionHeader,
  SectionMarker,
  StatusTag,
  Todo,
  Words,
} from "@/components/ui";
import { catalogue, catalogueFor, catalogueItem } from "@/content/catalogue";
import { productBySlug } from "@/content/products";
import { specialties } from "@/content/site";

type Props = { params: Promise<{ slug: string; item: string }> };

const i = (n: number) => ({ "--i": n }) as CSSProperties;

export function generateStaticParams() {
  return catalogue.map((c) => ({ slug: c.parent, item: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, item } = await params;
  const it = catalogueItem(slug, item);
  if (!it) return {};
  return { title: `${it.name} · ${it.descriptor}`, description: it.summary };
}

/**
 * One instrument or device. Reads the URL inside <Suspense> (Cache
 * Components); unknown items get a real 404 from proxy.ts first.
 */
export default function ItemPage({ params }: Props) {
  return (
    <Suspense fallback={<section aria-busy className="min-h-[70vh] bg-navy" />}>
      <ItemContent params={params} />
    </Suspense>
  );
}

async function ItemContent({ params }: Props) {
  const { slug, item: itemSlug } = await params;
  const item = catalogueItem(slug, itemSlug);
  const parent = productBySlug(slug);
  // Product names keep their capitals (SurgiCore); plain names read in lower case.
  const familyName = /[A-Z]/.test(parent?.name.slice(1) ?? "") ? parent?.name : parent?.name.toLowerCase();
  if (!item || !parent) notFound();

  const siblings = catalogueFor(item.parent).filter((c) => c.slug !== item.slug);
  const sameGroup = siblings.filter((c) => c.group === item.group);
  const related = [...sameGroup, ...siblings.filter((c) => c.group !== item.group)].slice(0, 4);
  const itemSpecialties = specialties.filter((s) => item.specialties?.includes(s.id));
  const quoteHref = `/contact?topic=brochure&product=${parent.slug}&item=${item.slug}`;

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
              <Link href={`/products/${parent.slug}`} className="transition-colors hover:text-clinical">
                {parent.name}
              </Link>
              <span aria-hidden> / </span>
              <span className="text-blue-300">{item.group}</span>
            </nav>
            <h1 className="scan-load mt-4 w-fit font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              <Words text={item.name} delay={180} />
            </h1>
            <p data-scramble className="rise label mt-3 text-blue-300" style={i(2)}>
              {item.descriptor}
            </p>
            <p className="rise mt-8 max-w-xl text-lg leading-relaxed text-fog text-pretty" style={i(3)}>
              {item.summary}
            </p>
            <div className="rise mt-6 flex flex-wrap items-center gap-x-6 gap-y-3" style={i(4)}>
              <StatusTag status={item.status} dark />
              {item.variants && (
                <span className="label text-fog">{item.variants.length} variants</span>
              )}
            </div>
            <div className="rise mt-10 flex flex-wrap gap-3" style={i(5)}>
              <ButtonLink href={quoteHref} arrow>
                Request a quotation
              </ButtonLink>
              <ButtonLink href={`/products/${parent.slug}`} variant="ghost-light">
                All {familyName}
              </ButtonLink>
            </div>
          </div>
          <div className="rise mx-auto w-full max-w-[520px]" style={i(3)}>
            <ItemImage
              item={item}
              morph
              priority
              sizes="(min-width: 1024px) 520px, 100vw"
              className="aspect-square rounded-3xl shadow-[0_40px_120px_-40px_rgba(8,102,244,0.55)] ring-1 ring-navy-600"
            />
          </div>
        </Container>
      </section>

      {item.todo && (
        <Container className="pt-8">
          <Todo>{item.todo}</Todo>
        </Container>
      )}

      {item.variants && item.variants.length > 0 && (
        <section className="bg-clinical">
          <Container className="py-16 sm:py-24">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeader
                eyebrow="The range"
                title={`${item.variants.length} variants`}
                intro={
                  item.sizeLabel === "Size as listed"
                    ? "Sizes are as listed in our product library."
                    : item.sizeLabel
                      ? `Sizes are ${item.sizeLabel.toLowerCase()}, as listed in our product library.`
                      : undefined
                }
              />
            </div>
            <ul data-stagger className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-3">
              {item.variants.map((v, n) => (
                <li
                  key={`${v.name}-${v.size ?? n}`}
                  className="group overflow-hidden rounded-2xl border border-line bg-paper sm:rounded-3xl"
                >
                  {v.image ? (
                    <div className="relative aspect-[4/3] bg-white">
                      <Image
                        src={v.image}
                        alt={`UnivLabs ${item.name}: ${v.name}${v.size ? `, ${v.size}` : ""}`}
                        fill
                        sizes="(min-width: 1024px) 33vw, 50vw"
                        className="object-contain p-3 transition-[scale] sm:p-6 duration-700 ease-[var(--ease-out-soft)] group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="relative aspect-[4/3] bg-mist">
                      <div className="absolute inset-2 flex items-center justify-center rounded-xl border-2 border-dashed border-steel/40 text-center sm:inset-4 sm:rounded-2xl">
                        <p className="label px-2 text-[10px] text-steel sm:text-[13px]">Photo to commission</p>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col gap-1 border-t border-line px-3 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 sm:px-5 sm:py-4">
                    <p className="font-display text-[15px] font-bold leading-snug text-navy sm:text-base">{v.name}</p>
                    {v.size && <p className="font-mono text-[12px] text-ink sm:text-[14px]">{v.size}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {item.telescopeTable && (
        <section className="bg-clinical">
          <Container className="py-16 sm:py-24">
            <SectionHeader
              eyebrow="Find an endoscope"
              title="Every part number, by specialty"
              intro="Choose a specialty, then narrow the list by diameter or direction of view."
            />
            <div data-reveal className="mt-10">
              <TelescopeFinder />
            </div>
          </Container>
        </section>
      )}

      {item.gallery && item.gallery.length > 0 && (
        <section className="bg-paper">
          <Container className="py-16 sm:py-24">
            <div data-reveal>
              <Eyebrow>Photographs</Eyebrow>
            </div>
            <div className="mt-8">
            <Rail label="Photographs" className="md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3">
              {item.gallery.map((g) => (
                <figure key={g.src} className="group overflow-hidden rounded-3xl border border-line bg-white">
                  <div className="relative aspect-square">
                    <Image
                      src={g.src}
                      alt={g.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className={`transition-[scale] duration-700 ease-[var(--ease-out-soft)] group-hover:scale-105 ${
                        g.fit === "cover" ? "object-cover" : "object-contain p-6"
                      }`}
                    />
                  </div>
                  <figcaption className="label border-t border-line px-5 py-4 text-navy">{g.caption}</figcaption>
                </figure>
              ))}
            </Rail>
            </div>
          </Container>
        </section>
      )}

      <section className="bg-paper">
        <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_1.4fr]">
          <div data-reveal>
            <Eyebrow>Specifications</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Technical summary
            </h2>
            <p className="mt-4 leading-relaxed">
              Our team confirms the exact model, compatibility and regulatory availability in
              your market before supply.
            </p>
            <p className="label mt-6 text-steel">Source · {item.source}</p>
          </div>
          <dl data-stagger className="divide-y divide-line self-start overflow-hidden rounded-3xl border border-line bg-clinical">
            {[
              { label: "Family", value: parent.name },
              { label: "Type", value: item.group },
              ...(item.specs ?? []),
              ...(itemSpecialties.length
                ? [{ label: "Specialties", value: itemSpecialties.map((s) => s.name).join(" · ") }]
                : []),
            ].map((row) => (
              <div key={row.label} className="grid grid-cols-[1fr_1.4fr] gap-4 px-6 py-5 transition-colors hover:bg-white">
                <dt className="label self-center text-steel">{row.label}</dt>
                <dd className="font-mono text-[15px] text-navy">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="bg-clinical">
          <Container className="py-16 sm:py-24">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeader eyebrow={parent.name} title={`More ${familyName}`} />
              <Link
                data-reveal
                href={`/products/${parent.slug}`}
                className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue"
              >
                See the full range <Arrow />
              </Link>
            </div>
            <div className="mt-8 sm:mt-10">
            <Rail label={`More ${familyName}`} className="md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-4">
              {related.map((r) => (
                <div key={r.slug}>
                  <Link
                    href={`/products/${r.parent}/${r.slug}`}
                    data-tilt
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-paper transition-[border-color,box-shadow] duration-500 hover:border-blue/40 hover:shadow-[0_24px_60px_-24px_rgba(0,26,73,0.3)]"
                  >
                    <ItemImage item={r} morph sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-square" />
                    <div className="border-t border-line p-5">
                      <p className="label text-steel">{r.group}</p>
                      <p className="mt-1 font-display text-lg font-bold text-navy transition-colors group-hover:text-blue">
                        {r.name}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </Rail>
            </div>
          </Container>
        </section>
      )}

      <CtaBand
        title="Need sizes or a quotation?"
        body={`Tell us the specialty and what you need. Our team will confirm the configuration of the ${item.name} and send a quotation.`}
        primary={{ href: quoteHref, label: "Request a quotation" }}
        secondary={{ href: `/products/${parent.slug}`, label: `All ${familyName}` }}
      />
    </>
  );
}
