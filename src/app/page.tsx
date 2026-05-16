import Image from "next/image";
import { ButtonLink } from "@/components/site/ButtonLink";
import { MotionReveal } from "@/components/site/MotionReveal";
import { PageShell } from "@/components/site/PageShell";
import { ProjectPreview } from "@/components/site/ProjectFeature";
import { Section } from "@/components/site/Section";
import { SectionHeader } from "@/components/site/SectionHeader";
import { projects } from "@/lib/site-data";

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
        <Section className="pb-12 pt-10 sm:pb-14 sm:pt-14 lg:pb-16 lg:pt-14">
          <div className="grid gap-10 lg:grid-cols-[1.12fr_0.68fr] lg:items-start lg:gap-16">
            <MotionReveal>
              <div className="max-w-4xl">
                <h1 className="font-display text-[clamp(4.3rem,11vw,8.1rem)] font-medium leading-[0.88] text-foreground sm:whitespace-nowrap">
                  Vivian Glenn
                </h1>
                <p className="mt-7 max-w-4xl font-display text-3xl font-medium leading-tight text-foreground sm:text-4xl lg:text-[3.2rem]">
                  Designing analytical tools, operational systems, and
                  insight-driven platforms across public health and
                  organizational strategy, leveraging AI to accelerate
                  synthesis, prototyping, and execution.
                </p>
                <p className="mt-7 text-[0.68rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
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

        <Section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            title="Featured Systems"
            copy="Operational systems, dashboards, and infrastructure for public health and organizational strategy."
          />
          <div>
            {projects.slice(0, 3).map((project, index) => (
              <ProjectPreview
                key={project.title}
                project={project}
                delay={index * 0.05}
              />
            ))}
          </div>
          <div className="border-t border-line pt-8">
            <ButtonLink href="/work">View all work</ButtonLink>
          </div>
        </Section>

        <Section className="pb-6 pt-10 sm:pb-8 sm:pt-12 lg:pb-10 lg:pt-14">
          <MotionReveal>
            <div className="grid gap-7 border-t border-line pt-8 md:grid-cols-[0.62fr_1.38fr] md:gap-14">
              <h2 className="font-display text-5xl font-medium leading-[0.96] text-foreground sm:text-6xl lg:text-7xl">
                Impact / Recognition
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

        <Section className="pb-20 pt-4 sm:pb-24 sm:pt-5 lg:pb-28 lg:pt-6">
          <MotionReveal>
            <p className="max-w-3xl text-base leading-8 text-muted sm:text-lg sm:leading-9">
              “I design systems that make public health programs easier to
              understand, operate, and improve. My work focuses on operational
              clarity, participation analytics, and organizational
              infrastructure.”
            </p>
          </MotionReveal>
        </Section>
      </main>
    </PageShell>
  );
}
