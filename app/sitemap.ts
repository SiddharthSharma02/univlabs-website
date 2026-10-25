import type { MetadataRoute } from "next";
import { products } from "@/content/products";
import { site } from "@/content/site";

const routes = [
  "",
  "/products",
  "/specialties",
  "/connected-or",
  "/pay-per-minute",
  "/sufi",
  "/service",
  "/partners",
  "/quality",
  "/innovation",
  "/about",
  "/investors",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...routes.map((r) => ({ url: `${site.url}${r}` })),
    ...products.map((p) => ({ url: `${site.url}/products/${p.slug}` })),
  ];
}
