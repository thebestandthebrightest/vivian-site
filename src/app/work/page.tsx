import type { Metadata } from "next";
import { PageIntro } from "@/components/site/PageIntro";
import { PageShell } from "@/components/site/PageShell";
import { Section } from "@/components/site/Section";
import { WorkProjectIndex } from "@/components/site/WorkProjectIndex";
import { projects } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Work | Vivian Glenn",
  description:
    "Editorial project index for Vivian Glenn across public health strategy, analytics, and operational systems.",
};

export default function WorkPage() {
  return (
    <PageShell>
      <main>
        <PageIntro
          title="Work"
          copy="A concise index of analytical tools, planning systems, dashboards, and founder-led operations work."
        />
        <Section className="pb-24 lg:pb-32">
          <WorkProjectIndex projects={projects} />
        </Section>
      </main>
    </PageShell>
  );
}
