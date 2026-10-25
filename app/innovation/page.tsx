import type { Metadata } from "next";
import {
  Container,
  CtaBand,
  PageHero,
  SectionHeader,
  StatusTag,
} from "@/components/ui";
import { pipeline, type Status } from "@/content/products";
import { facts } from "@/content/site";

export const metadata: Metadata = {
  title: "Innovation pipeline",
  description:
    "What UnivLabs has deployed, and what it is researching: from 4K ICG vision to surgical data and robotics.",
};

const programmes: {
  name: string;
  status: Status;
  body: string;
  partner?: string;
}[] = [
  {
    name: "SurgiBot",
    status: "research",
    body: "A research programme studying how recorded surgical data, simulation and clinical expertise could support robotic surgical assistance. Not available for clinical use.",
  },
  {
    name: "Biodegradable ureteral stent",
    status: "development",
    body: "A ureteral stent designed to degrade after use, in development with IIT Roorkee.",
    partner: "IIT Roorkee",
  },
];

export default function InnovationPage() {
  return (
    <>
      <PageHero
        eyebrow="Innovation pipeline"
        title="What is live, and what we are working on"
        intro={`${facts.patents.value} patents filed and an R&D team across three countries. We label every programme by its real status.`}
      />
      <section className="bg-clinical">
        <Container className="py-16 sm:py-20">
          <SectionHeader
            eyebrow="The roadmap"
            title="Capture, store and teach, then assist"
            intro="Solid bars are live today. Dashed bars are not yet available."
          />
          <ol className="mt-10 space-y-6">
            {pipeline.map((step) => {
              const live = step.status === "available";
              return (
                <li key={step.name} className="flex flex-col gap-4 rounded-2xl border border-line bg-paper p-6 sm:flex-row sm:items-center sm:gap-8">
                  <span
                    aria-hidden
                    className={`h-3 w-40 shrink-0 rounded-full ${
                      live ? "bg-blue" : "border-2 border-dashed border-steel"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="font-display text-lg font-bold text-navy">{step.name}</p>
                    <p className="text-[15px]">{step.detail}</p>
                  </div>
                  <StatusTag status={step.status} />
                </li>
              );
            })}
          </ol>
        </Container>
      </section>
      <section className="bg-paper">
        <Container className="py-16 sm:py-20">
          <SectionHeader eyebrow="Programmes" title="In development and research" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {programmes.map((p) => (
              <div
                key={p.name}
                className="rounded-2xl border border-dashed border-steel/60 bg-clinical p-8"
              >
                <StatusTag status={p.status} />
                <h3 className="mt-4 font-display text-xl font-bold text-navy">{p.name}</h3>
                <p className="mt-3 leading-relaxed">{p.body}</p>
                {p.partner && (
                  <p className="label mt-4 text-steel">With {p.partner}</p>
                )}
              </div>
            ))}
          </div>
          <p className="mt-8 text-[15px] text-steel">
            Visuals of products in development are labelled as concept renders.
          </p>
        </Container>
      </section>
      <CtaBand
        title="Research with us"
        body="We work with hospitals and institutes on clinical research and validation."
        primary={{ href: "/contact?topic=research", label: "Start a conversation" }}
        secondary={{ href: "/sufi", label: "SUFI for surgeons" }}
      />
    </>
  );
}
