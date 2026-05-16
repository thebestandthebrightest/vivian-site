import Image from "next/image";
import { ButtonLink } from "@/components/site/ButtonLink";
import { MotionReveal } from "@/components/site/MotionReveal";
import { PageShell } from "@/components/site/PageShell";
import { ProjectPreview } from "@/components/site/ProjectFeature";
import { Section } from "@/components/site/Section";
import { SectionHeader } from "@/components/site/SectionHeader";
import { projects } from "@/lib/site-data";

export default function Home() {
  return (
    <PageShell>
      <main>
        <Section className="pb-24 pt-20 sm:pb-28 sm:pt-28 lg:pb-36 lg:pt-32">
          <div className="grid gap-14 lg:grid-cols-[1.2fr_0.62fr] lg:items-end lg:gap-20">
            <MotionReveal>
              <div className="max-w-5xl">
                <p className="mb-8 text-sm font-medium leading-6 text-muted">
                  Public Health @ Rutgers
                </p>
                <h1 className="font-display text-[4.5rem] font-medium leading-[0.88] tracking-[0.005em] text-foreground sm:text-[7rem] lg:text-[8.8rem]">
                  Vivian Glenn
                </h1>
                <h2 className="mt-8 font-display text-4xl font-medium leading-tight tracking-[0.005em] text-foreground sm:text-5xl">
                  Strategy. Analytics. Systems.
                </h2>
                <p className="mt-8 max-w-2xl text-base leading-8 text-muted sm:text-lg">
                  Building analytical tools, operational systems, and
                  insight-driven platforms across public health and
                  organizational strategy.
                </p>
              </div>
            </MotionReveal>
            <MotionReveal delay={0.12}>
              <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden border border-line lg:ml-auto">
                <Image
                  src="/vivian-headshot.png"
                  alt="Vivian Glenn"
                  fill
                  priority
                  sizes="(min-width: 1024px) 360px, 85vw"
                  className="object-cover object-center grayscale transition duration-700 ease-out hover:grayscale-0"
                />
              </div>
            </MotionReveal>
          </div>
        </Section>

        <Section className="py-16 sm:py-20 lg:py-24">
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

        <Section className="py-14 sm:py-16 lg:py-20">
          <MotionReveal>
            <div className="flex flex-col items-start gap-5 border-t border-line pt-8 sm:flex-row sm:gap-8">
              <ButtonLink href="mailto:gvivian321@gmail.com">Email</ButtonLink>
              <ButtonLink href="https://www.linkedin.com/">LinkedIn</ButtonLink>
              <ButtonLink href="/resume">Resume</ButtonLink>
            </div>
          </MotionReveal>
        </Section>
      </main>
    </PageShell>
  );
}
