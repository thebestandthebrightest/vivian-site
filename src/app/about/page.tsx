import type { Metadata } from "next";
import Image from "next/image";
import { MotionReveal } from "@/components/site/MotionReveal";
import { PageIntro } from "@/components/site/PageIntro";
import { PageShell } from "@/components/site/PageShell";
import { Section } from "@/components/site/Section";

export const metadata: Metadata = {
  title: "About | Vivian Glenn",
  description:
    "About Vivian Glenn, a Public Health student at Rutgers interested in strategy, analytics, operations, and systems.",
};

const educationRows = [
  {
    label: "Rutgers University",
    value: "Bachelor of Science, Public Health",
    note: "Class of 2027 / GPA: 3.96/4.0",
  },
  {
    label: "Honors",
    value: "School of Arts & Sciences Excellence Award",
    note: "Dean's List, all semesters",
  },
  {
    label: "Relevant coursework",
    value: "Statistics / Calculus I / Microeconomics / Biochemistry",
    note: "Physics / Health Disparities / Public Health Literacy",
  },
];

const researchRows = [
  {
    organization: "Brown University School of Public Health",
    role: "Research Assistant",
    description:
      "Synthesized 50+ studies on opioid use disorder and criminal justice policy; analyzed 30+ stakeholder interviews to identify treatment access gaps.",
  },
  {
    organization: "Center for Alcohol and Substance Use Studies",
    role: "Research Assistant",
    description:
      "Led qualitative research across interviews and focus groups to identify behavioral barriers and translate findings into program design recommendations.",
  },
  {
    organization: "APHA 2025",
    role: "Research presentation",
    description: "Co-authored research presented at APHA 2025.",
  },
];

const currentFocus = [
  "Organizational strategy",
  "Operational analytics",
  "Program evaluation",
  "Forecasting and decision support",
  "Public health systems",
];

const travelImages = [
  { src: "/travel/paris.JPG", label: "Paris, France" },
  { src: "/travel/copenhagen.JPG", label: "Copenhagen, Denmark" },
  { src: "/travel/barcelona-1.JPG", label: "Barcelona, Spain" },
  { src: "/travel/london-1.JPG", label: "London, United Kingdom" },
];

function TravelStrip() {
  return (
    <div
      className="flex gap-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      aria-label="Travel image strip"
    >
      {travelImages.map((image) => (
        <figure key={image.src} className="min-w-[14rem] sm:min-w-0 sm:flex-1">
          <div className="group relative aspect-[4/5] overflow-hidden bg-background">
            <Image
              src={image.src}
              alt={image.label}
              fill
              sizes="(min-width: 1024px) 280px, (min-width: 640px) 25vw, 224px"
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div>
          <figcaption className="mt-3 text-xs font-medium leading-6 text-quiet">
            {image.label}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function AboutPage() {
  return (
    <PageShell>
      <main>
        <PageIntro title="About">
          <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
            I&apos;m a Public Health student at Rutgers interested in strategy,
            analytics, operations, and systems that help organizations make
            clearer decisions.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            My work centers on translating messy information into clear tools,
            decisions, and operating rhythms.
          </p>
        </PageIntro>

        <Section className="pb-16 lg:pb-20">
          <MotionReveal>
            <div className="grid gap-10 border-t border-line pt-9 md:grid-cols-[0.75fr_1.45fr] md:gap-16">
              <h2 className="font-display text-4xl font-medium leading-none text-foreground sm:text-5xl">
                Education
              </h2>
              <div>
                {educationRows.map((row) => (
                  <div
                    key={row.label}
                    className="grid gap-2 border-t border-line py-5 first:border-t-0 first:pt-0 sm:grid-cols-[0.65fr_1.35fr]"
                  >
                    <p className="text-sm font-medium leading-7 text-foreground">
                      {row.label}
                    </p>
                    <div>
                      <p className="text-sm leading-7 text-muted">
                        {row.value}
                      </p>
                      <p className="text-sm leading-7 text-quiet">{row.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </MotionReveal>
        </Section>

        <Section className="pb-16 lg:pb-20">
          <MotionReveal>
            <div className="grid gap-10 border-t border-line pt-9 md:grid-cols-[0.75fr_1.45fr] md:gap-16">
              <h2 className="font-display text-4xl font-medium leading-none text-foreground sm:text-5xl">
                Research & Writing
              </h2>
              <div>
                {researchRows.map((row) => (
                  <article
                    key={row.organization}
                    className="grid gap-2 border-t border-line py-5 first:border-t-0 first:pt-0 sm:grid-cols-[0.75fr_1.25fr]"
                  >
                    <div>
                      <h3 className="text-sm font-medium leading-7 text-foreground">
                        {row.organization}
                      </h3>
                      <p className="text-sm leading-7 text-quiet">
                        {row.role}
                      </p>
                    </div>
                    <p className="text-sm leading-7 text-muted">
                      {row.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </MotionReveal>
        </Section>

        <Section className="pb-16 lg:pb-20">
          <MotionReveal>
            <div className="grid gap-10 border-t border-line pt-9 md:grid-cols-[0.75fr_1.45fr] md:gap-16">
              <h2 className="font-display text-4xl font-medium leading-none text-foreground sm:text-5xl">
                Current Focus
              </h2>
              <ul className="grid gap-x-8 gap-y-4 text-sm leading-7 text-muted sm:grid-cols-2">
                {currentFocus.map((focus) => (
                  <li key={focus}>{focus}</li>
                ))}
              </ul>
            </div>
          </MotionReveal>
        </Section>

        <Section className="pb-24 lg:pb-28">
          <MotionReveal>
            <div className="grid gap-8 border-t border-line pt-9">
              <div className="grid gap-5 md:grid-cols-[0.75fr_1.45fr] md:gap-16">
                <h2 className="font-display text-4xl font-medium leading-none text-foreground sm:text-5xl">
                  Travel
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-muted">
                  Travel shapes how I think about systems, cities, behavior,
                  and public space.
                </p>
              </div>
              <TravelStrip />
            </div>
          </MotionReveal>
        </Section>
      </main>
    </PageShell>
  );
}
