import Link from "next/link";
import { ViewTransition } from "react";
import {
  catalogueGroups,
  type CatalogueItem,
  type CatalogueParent,
} from "@/content/catalogue";
import { Arrow, ProductImage } from "./ui";

/** An item's photo, or a dashed box while the photo is still to come. */
export function ItemImage({
  item,
  sizes,
  className = "",
  priority = false,
  morph = false,
}: {
  item: CatalogueItem;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Pair the photo with the item page hero for the card-to-page morph. */
  morph?: boolean;
}) {
  if (!item.image) {
    return (
      <div className={`relative bg-mist ${className}`}>
        <div className="absolute inset-4 flex items-center justify-center rounded-2xl border-2 border-dashed border-steel/40 text-center">
          <p className="label px-4 text-steel">Photo to commission</p>
        </div>
      </div>
    );
  }
  const image = (
    <ProductImage image={item.image} sizes={sizes} priority={priority} className={className} />
  );
  return morph ? (
    <ViewTransition name={`item-${item.slug}`} share="morph" default="none">
      {image}
    </ViewTransition>
  ) : (
    image
  );
}

/**
 * Every instrument or device in a family, grouped under small headings.
 * Each card links to the item's own page.
 */
export function CatalogueRange({ parent }: { parent: CatalogueParent }) {
  const groups = catalogueGroups(parent);
  return (
    <div className="space-y-14">
      {groups.map((g) => (
        <div key={g.name}>
          <div data-reveal className="flex items-center gap-4">
            <p data-scramble className="label text-blue">
              {g.name}
            </p>
            <span aria-hidden className="h-px flex-1 bg-line" />
            <span className="label text-steel">{g.items.length}</span>
          </div>
          <ul data-stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {g.items.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/products/${item.parent}/${item.slug}`}
                  data-tilt
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-paper transition-[border-color,box-shadow] duration-500 hover:border-blue/40 hover:shadow-[0_24px_60px_-24px_rgba(0,26,73,0.3)]"
                >
                  <ItemImage
                    item={item}
                    morph
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="aspect-square"
                  />
                  <div className="flex flex-1 items-end justify-between gap-3 border-t border-line p-5">
                    <div>
                      <h3 className="font-display text-lg font-bold leading-snug text-navy transition-colors group-hover:text-blue">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-[14px]">{item.descriptor}</p>
                      {item.variants && (
                        <p className="label mt-3 text-steel">
                          {item.variants.length} variants
                        </p>
                      )}
                    </div>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-navy transition-colors group-hover:border-blue group-hover:bg-blue group-hover:text-paper">
                      <Arrow />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
