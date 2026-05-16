import Image from "next/image";
import { ButtonLink } from "@/components/site/ButtonLink";
import { MotionReveal } from "@/components/site/MotionReveal";
import { PageShell } from "@/components/site/PageShell";
import { ProjectPreview } from "@/components/site/ProjectFeature";
import { Section } from "@/components/site/Section";
import { SectionHeader } from "@/components/site/SectionHeader";
import { projects } from "@/lib/site-data";

const selectedExperience = [
  {
    organization: "CDC Lewis Scholars Program",
    role: "Incoming Scholar, Summer 2026",
    description: "Selected for a national health equity research program.",
  },
  {
    organization: "ScarletWell",
    role: "Program Strategy & Analytics",
    description:
      "Built analytics and planning systems across wellness initiatives, participation data, and program strategy.",
  },
  {
    organization: "Brown University School of Public Health",
    role: "Research Assistant",
    description:
      "Synthesized opioid use disorder and criminal justice policy research; analyzed stakeholder interviews to identify treatment access gaps.",
  },
  {
    organization: "Deloitte Rutgers Case Competition",
    role: "2nd Place",
    description:
      "Delivered a 3-phase go-to-market strategy and data-driven growth model for a telehealth platform.",
  },
];

export default function Home() {
  return (
    <PageShell hideBrand>
      <main>
        <Section className="pb-12 pt-10 sm:pb-14 sm:pt-14 lg:pb-16 lg:pt-16">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.68fr] lg:items-start lg:gap-16">
            <MotionReveal>
              <div className="max-w-5xl">
                <h1 className="font-display text-[clamp(4.3rem,11vw,8.1rem)] font-medium leading-[0.88] text-foreground sm:whitespace-nowrap">
                  Vivian Glenn
                </h1>
                <p className="mt-7 text-sm font-medium leading-6 text-muted">
                  Public Health @ Rutgers
                </p>
                <h2 className="mt-6 font-display text-4xl font-medium leading-tight text-foreground sm:text-5xl">
                  Strategy. Analytics. Systems.
                </h2>
                <p className="mt-7 max-w-2xl text-base leading-8 text-muted sm:text-lg">
                  Building analytical tools, operational systems, and
                  insight-driven platforms across public health and
                  organizational strategy.
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
            copy="Systems, dashboards, and operating models built to make program data easier to understand and act on."
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

        <Section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            title="Selected Experience"
            titleClassName="lg:whitespace-nowrap"
          />
          <div>
            {selectedExperience.map((item, index) => (
              <MotionReveal key={item.organization} delay={index * 0.05}>
                <article className="grid gap-3 border-t border-line py-6 sm:grid-cols-[0.9fr_0.9fr_1.2fr] sm:gap-8">
                  <h3 className="font-display text-3xl font-medium leading-none text-foreground">
                    {item.organization}
                  </h3>
                  <p className="text-sm font-medium leading-7 text-foreground">
                    {item.role}
                  </p>
                  <p className="text-sm leading-7 text-muted">
                    {item.description}
                  </p>
                </article>
              </MotionReveal>
            ))}
          </div>
        </Section>
      </main>
    </PageShell>
  );
}
