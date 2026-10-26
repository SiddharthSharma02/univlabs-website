import { NextResponse, type NextRequest } from "next/server";
import { catalogue } from "@/content/catalogue";
import { products } from "@/content/products";

const slugs = new Set(products.map((p) => p.slug));
const items = new Set(catalogue.map((c) => `${c.parent}/${c.slug}`));

/**
 * Unknown product and item URLs get a real 404 status. The product page reads its
 * slug inside <Suspense>, and a notFound() there can only stream a 404 page
 * with status 200, so the check happens here, before rendering.
 */
export function proxy(request: NextRequest) {
  const [, , slug, item, extra] = request.nextUrl.pathname.split("/");
  const unknown =
    (slug && !slugs.has(slug)) || (item && !items.has(`${slug}/${item}`)) || extra;
  if (unknown) {
    // No route matches this path, so Next.js renders app/not-found.tsx with 404.
    return NextResponse.rewrite(new URL("/__not-found", request.url));
  }
}

export const config = {
  matcher: ["/products/:slug", "/products/:slug/:item"],
};
