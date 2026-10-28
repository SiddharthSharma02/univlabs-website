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
  pad,
  labelClassName,
}: {
  item: CatalogueItem;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Pair the photo with the item page hero for the card-to-page morph. */
  morph?: boolean;
  pad?: string;
  labelClassName?: string;
}) {
  if (!item.image) {
    return (
      <div className={`relative bg-mist ${className}`}>
        <div className="absolute inset-2 flex items-center justify-center rounded-xl border-2 border-dashed border-steel/40 text-center sm:inset-4 sm:rounded-2xl">
          <p className="label px-2 text-[10px] text-steel sm:px-4 sm:text-[13px]">Photo to commission</p>
        </div>
      </div>
    );
  }
  const image = (
    <ProductImage
      image={item.image}
      sizes={sizes}
      priority={priority}
      className={className}
      pad={pad}
      labelClassName={labelClassName}
    />
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
          <ul data-stagger className="mt-4 grid sm:mt-6 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {g.items.map((item) => (
              <li
                key={item.slug}
                id={`item-${item.slug}`}
                className="scroll-mt-24 sm:rounded-3xl max-sm:[&:target>a]:bg-blue-100/60 [&:target>a]:border-blue sm:[&:target>a]:shadow-[0_0_0_3px_rgba(8,102,244,0.25)]"
              >
                <Link
                  href={`/products/${item.parent}/${item.slug}`}
                  data-tilt
                  className="group flex h-full items-center gap-4 border-b border-line py-3 transition-[border-color,box-shadow] duration-500 sm:flex-col sm:items-stretch sm:gap-0 sm:overflow-hidden sm:rounded-3xl sm:border sm:bg-paper sm:py-0 sm:hover:border-blue/40 sm:hover:shadow-[0_24px_60px_-24px_rgba(0,26,73,0.3)]"
                >
                  <ItemImage
                    item={item}
                    morph
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 96px"
                    className="aspect-square w-24 shrink-0 rounded-2xl border border-line sm:w-auto sm:rounded-none sm:border-0"
                    pad="p-1.5 sm:p-6"
                    labelClassName="max-sm:bottom-1 max-sm:left-1 max-sm:px-1.5 max-sm:py-0.5 max-sm:text-[9px]"
                  />
                  <div className="flex min-w-0 flex-1 items-center justify-between gap-3 sm:items-end sm:border-t sm:border-line sm:p-5">
                    <div className="min-w-0">
                      <h3 className="font-display text-base font-bold leading-snug text-navy transition-colors group-hover:text-blue sm:text-lg">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-[14px]">{item.descriptor}</p>
                      {item.variants && (
                        <p className="label mt-2 text-[11px] text-steel sm:mt-3 sm:text-[13px]">
                          {item.variants.length} variants
                        </p>
                      )}
                    </div>
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line text-navy sm:size-9 transition-colors group-hover:border-blue group-hover:bg-blue group-hover:text-paper">
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
