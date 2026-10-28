import type { Metadata } from "next";
import {
  Container,
  CtaBand,
  PageHero,
  SectionHeader,
  Todo,
  Steps,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Pay Per Minute",
  description:
    "Lease a UnivLabs laparoscopy tower and pay only for the operating minutes you use.",
};

export default function PayPerMinutePage() {
  return (
    <>
      <PageHero
        eyebrow="Pay Per Minute"
        title="Pay for the minutes you operate"
        intro="Pay Per Minute lets hospitals lease a UnivLabs laparoscopy tower and pay for use, instead of a large upfront purchase."
      >
        <p className="label rounded-full border border-dashed border-fog px-4 py-2 text-fog">
          Status · Closed to new registrations
        </p>
      </PageHero>
      <section className="bg-clinical">
        <Container className="py-16 sm:py-20">
          <SectionHeader eyebrow="How it works" title="Three steps to a working tower" />
          <Steps
            className="md:grid-cols-3"
            pad="md:p-8"
            steps={[
              ["01", "Choose the suite", "Select the vision suite and components for your specialty."],
              ["02", "We install it", "UnivLabs installs, commissions and trains your team."],
              ["03", "Pay for use", "You are billed for operating minutes, not for the equipment."],
            ]}
          />
          <div className="mt-8">
            <Todo>
              Confirm the programme terms: minimum usage, contract length,
              what is included in service, and when registrations reopen.
              Add the operating-economics calculator from univlabs.in.
            </Todo>
          </div>
        </Container>
      </section>
      <section className="bg-paper">
        <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
          <SectionHeader
            eyebrow="Compare"
            title="Purchase or Pay Per Minute"
            intro="Both options use the same equipment and the same service team. The difference is how you pay."
          />
          <div data-reveal className="overflow-hidden rounded-3xl border border-line">
            <table className="w-full text-left text-[15px]">
              <thead className="bg-mist">
                <tr>
                  <th className="label px-5 py-3 text-navy"> </th>
                  <th className="label px-5 py-3 text-navy">Purchase</th>
                  <th className="label px-5 py-3 text-navy">Pay Per Minute</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line bg-paper">
                <tr>
                  <th className="px-5 py-4 font-medium text-navy">Upfront cost</th>
                  <td className="px-5 py-4">Full price</td>
                  <td className="px-5 py-4">[To confirm]</td>
                </tr>
                <tr>
                  <th className="px-5 py-4 font-medium text-navy">You pay for</th>
                  <td className="px-5 py-4">The equipment</td>
                  <td className="px-5 py-4">Operating minutes</td>
                </tr>
                <tr>
                  <th className="px-5 py-4 font-medium text-navy">Ownership</th>
                  <td className="px-5 py-4">Hospital</td>
                  <td className="px-5 py-4">UnivLabs (leased)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </section>
      <CtaBand
        title="Join the waiting list"
        body="Pay Per Minute is closed to new registrations. Leave your details and we will contact you when it reopens."
        primary={{ href: "/contact?topic=ppm", label: "Register interest" }}
        secondary={{ href: "/products", label: "Purchase options" }}
      />
    </>
  );
}
