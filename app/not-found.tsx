import { ButtonLink, Container, SectionMarker } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="bg-navy text-clinical">
      <Container className="py-24 sm:py-32">
        <SectionMarker />
        <p className="label mt-8 text-blue-300">404</p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          This page isn’t in view.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-fog">
          The page may have moved when we rebuilt the site.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">Go to the homepage</ButtonLink>
          <ButtonLink href="/products" variant="ghost-light">
            Browse products
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
