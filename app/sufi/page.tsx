import type { Metadata } from "next";
import Link from "next/link";
import {
  Container,
  CtaBand,
  PageHero,
  SectionHeader,
  Todo,
  Steps,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "SUFI · Built with surgeons",
  description:
    "SUFI is the UnivLabs programme for surgeons: bring a clinical problem and our engineers develop the device with you.",
};

export default function SufiPage() {
  return (
    <>
      <PageHero
        eyebrow="SUFI · For surgeons"
        title="Bring us the problem, and we will build the device with you"
        intro="SUFI is our co-innovation programme for surgeons. You bring an idea from the operating room, and UnivLabs engineers develop it into a product with you."
      />
      <Container className="pt-8">
        <Todo>What SUFI stands for, eligibility, and how IP and credit are shared.</Todo>
      </Container>
      <section className="bg-clinical">
        <Container className="py-16 sm:py-20">
          <SectionHeader eyebrow="How it works" title="From idea to device" />
          <Steps
            className="md:grid-cols-4"
            pad="md:p-6"
            steps={[
              ["01", "Pitch", "Describe the clinical problem and your idea."],
              ["02", "Assess", "Our engineers and clinical team review feasibility."],
              ["03", "Prototype", "We design, build and test with you."],
              ["04", "Bring to market", "Regulatory, manufacturing and launch by UnivLabs."],
            ]}
          />
        </Container>
      </section>
      <section className="bg-paper">
        <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
          <SectionHeader
            eyebrow="Proof"
            title="Am-SafeX started as a urologist’s problem"
            intro="Our patented Am-SafeX catheter was developed with practising urologists, starting from a problem they raised in the operating room. It is the model for every SUFI project."
          />
          <div data-reveal="scale" className="rounded-3xl border border-line bg-clinical p-8">
            <p className="font-display text-xl font-semibold leading-snug text-navy">
              “[Approved quote from the surgeon behind Am-SafeX.]”
            </p>
            <p className="label mt-4 text-steel">[Name, role, hospital]</p>
            <Link href="/products/am-safex" className="mt-6 inline-block text-[15px] font-semibold text-blue hover:underline">
              Meet Am-SafeX
            </Link>
          </div>
        </Container>
      </section>
      <CtaBand
        title="Have an idea from your OR?"
        body="Tell us about the problem. Our team will get back to you."
        primary={{ href: "/contact?topic=sufi", label: "Pitch an idea" }}
      />
    </>
  );
}
