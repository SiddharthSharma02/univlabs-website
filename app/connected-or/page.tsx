import type { Metadata } from "next";
import {
  Container,
  CtaBand,
  PageHero,
  SectionHeader,
  StatusTag,
  Todo,
} from "@/components/ui";
import { facts } from "@/content/site";

export const metadata: Metadata = {
  title: "CogniAxis · Connected OR",
  description:
    "CogniAxis connects the operating room: stream live surgery to authorised colleagues, record and store cases, and teach from them.",
};

const parts = [
  {
    id: "cogniaxis",
    name: "CogniAxis",
    role: "Platform",
    body: "Software that connects the operating room to authorised colleagues outside it, for live viewing, recording and case review.",
  },
  {
    id: "axisedge",
    name: "AxisEdge+",
    role: "Hardware",
    body: "The in-OR unit that takes video from UnivLabs cameras and connects it to CogniAxis.",
  },
  {
    id: "surgivault",
    name: "SurgiVault",
    role: "Storage",
    body: "Where recorded cases are stored and organised for review and teaching.",
  },
  {
    id: "dr-mentor",
    name: "Dr Mentor",
    role: "Teaching",
    body: "Case review and mentoring workflow for surgical training and collaboration.",
  },
];

export default function ConnectedOrPage() {
  return (
    <>
      <PageHero
        eyebrow="Connected OR · CogniAxis"
        title="Stream, record and teach from every case"
        intro={`CogniAxis connects the operating room to authorised colleagues outside it. It is running today in ${facts.cogniaxis.value} operating rooms.`}
      />
      <section className="bg-clinical">
        <Container className="py-16 sm:py-20">
          <SectionHeader
            eyebrow="What it does today"
            title="Three jobs, all live"
          />
          <ol data-stagger className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              ["01", "Record and organise", "Capture surgical cases and keep them organised."],
              ["02", "Stream live", "Share live video with authorised colleagues outside the OR."],
              ["03", "Teach and review", "Review procedures with your team and trainees."],
            ].map(([n, t, b]) => (
              <li key={n} className="rounded-3xl border border-line bg-paper transition-[transform,translate,box-shadow] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(0,26,73,0.2)] p-8">
                <p className="label text-blue">{n}</p>
                <h3 className="mt-3 font-display text-lg font-bold text-navy">{t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed">{b}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <section className="bg-paper">
        <Container className="py-16 sm:py-20">
          <SectionHeader eyebrow="The platform" title="How the parts fit together" />
          <div data-stagger className="mt-10 grid gap-6 md:grid-cols-2">
            {parts.map((p) => (
              <div
                key={p.id}
                id={p.id}
                className="scroll-mt-24 rounded-2xl border border-line border-t-4 border-t-blue bg-paper p-8"
              >
                <p className="label text-steel">{p.role}</p>
                <h3 className="mt-2 font-display text-xl font-bold text-navy">{p.name}</h3>
                <p className="mt-3 leading-relaxed">{p.body}</p>
                <div className="mt-4">
                  <StatusTag status="available" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Todo>
              Security wording: confirm access control, encryption and data
              residency with the CogniAxis team before launch.
            </Todo>
          </div>
        </Container>
      </section>
      <CtaBand
        title="Connect your operating room"
        body="CogniAxis works with UnivLabs vision suites through AxisEdge+."
        primary={{ href: "/contact?topic=cogniaxis", label: "Talk to the CogniAxis team" }}
        secondary={{ href: "/innovation", label: "See what comes next" }}
      />
    </>
  );
}
