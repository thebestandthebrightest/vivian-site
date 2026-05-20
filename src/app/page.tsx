import Image from "next/image";
import { ButtonLink } from "@/components/site/ButtonLink";
import { MotionReveal } from "@/components/site/MotionReveal";
import { PageShell } from "@/components/site/PageShell";
import { Section } from "@/components/site/Section";
import { SectionHeader } from "@/components/site/SectionHeader";
import { SelectedWorkProjects } from "@/components/site/SelectedWorkProjects";
import { projects, scarletWellPreview } from "@/lib/site-data";

const recognitionItems = [
  "Incoming CDC Lewis Scholar",
  "Deloitte Rutgers Case Competition — 2nd Place",
  "Brown University School of Public Health",
  "ScarletWell Strategy & Analytics",
  "Rutgers Learning Assistant Mentor",
  "Wellness Through Clay — 250+ participants",
];

export default function Home() {
  return (
    <PageShell hideBrand>
      <main>
        <Section className="pb-16 pt-10 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-14">
          <div className="grid gap-10 lg:grid-cols-[1.12fr_0.68fr] lg:items-start lg:gap-16">
            <MotionReveal>
              <div className="max-w-4xl">
                <h1 className="font-display text-[clamp(4.3rem,11vw,8.1rem)] font-medium leading-[0.88] text-foreground sm:whitespace-nowrap">
                  Vivian Glenn
                </h1>
                <p className="mt-8 max-w-3xl font-display text-[2rem] font-medium leading-[1.04] text-foreground sm:text-[2.45rem] lg:text-[2.9rem]">
                  “Turning complex information into clearer strategy and
                  action.”
                </p>
                <p className="mt-8 text-[0.78rem] font-medium uppercase leading-5 tracking-[0.24em] text-muted">
                  Public Health @ Rutgers
                </p>
              </div>
            </MotionReveal>
            <MotionReveal delay={0.12}>
              <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden lg:ml-auto">
                <Image
                  src="/vivian-headshot.png"
                  alt="Vivian Glenn"
                  fill
                  priority
                  sizes="(min-width: 1024px) 360px, 85vw"
                  className="object-cover object-center transition duration-700 ease-out hover:scale-[1.015]"
                />
              </div>
            </MotionReveal>
          </div>
        </Section>

        <Section className="py-14 sm:py-16 lg:py-20">
          <SectionHeader
            title="Selected Work"
            copy="Selected projects spanning analytics, operations, and organizational strategy."
            titleClassName="text-4xl sm:text-5xl lg:text-6xl"
          />
          <SelectedWorkProjects
            projects={projects.slice(0, 3)}
            scarletWellData={scarletWellPreview}
          />
          <div className="pt-8 sm:pt-9">
            <ButtonLink href="/work">View all work</ButtonLink>
          </div>
        </Section>

        <Section className="pb-24 pt-14 sm:pb-28 sm:pt-18 lg:pb-32 lg:pt-20">
          <MotionReveal>
            <div className="grid gap-8 border-t border-line pt-10 md:grid-cols-[0.62fr_1.38fr] md:gap-14">
              <h2 className="font-display text-4xl font-medium leading-[0.96] text-foreground sm:text-5xl lg:text-6xl">
                Impact
              </h2>
              <div className="grid border-t border-line sm:grid-cols-2 sm:border-t-0">
                {recognitionItems.map((item) => (
                  <p
                    key={item}
                    className="border-b border-line py-4 text-sm font-medium leading-6 text-muted sm:odd:pr-8 sm:even:pl-8"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </MotionReveal>
        </Section>
      </main>
    </PageShell>
  );
}
