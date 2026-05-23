import type { Metadata } from "next";
import { readdirSync } from "node:fs";
import { extname, join, parse } from "node:path";
import { MotionReveal } from "@/components/site/MotionReveal";
import { PageShell } from "@/components/site/PageShell";
import { Section } from "@/components/site/Section";
import { SmoothImage } from "@/components/site/SmoothImage";
import {
  TravelScrollStrip,
  type TravelItem,
} from "@/components/site/TravelScrollStrip";

export const metadata: Metadata = {
  title: "About | Vivian Glenn",
  description:
    "About Vivian Glenn, a Public Health student at Rutgers interested in strategy, analytics, operations, and systems.",
};

const education = {
  school: {
    name: "Rutgers University",
    degree: "Bachelor of Science, Public Health",
    detail: "Class of 2027 / GPA: 3.97/4.0",
  },
  honors: [
    "School of Arts & Sciences Excellence Award (2025)",
    "Dean’s List, all semesters",
    "ScarletWell Grant Recipient ($3,600+)",
    "LSAMP Research Stipend ($3,000)",
  ],
  coursework:
    "Statistics / Calculus I / Microeconomics / Biochemistry / Organic Chemistry / Physics / Health Disparities / Public Health Literature",
};

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

const capabilities = [
  {
    title: "Strategy & Operations",
    items: [
      "Operational strategy",
      "Program evaluation",
      "Workflow design",
      "Scenario modeling",
    ],
  },
  {
    title: "Analytics & Systems",
    items: [
      "Dashboard systems",
      "Data synthesis",
      "Reporting infrastructure",
      "Decision-support tools",
    ],
  },
  {
    title: "AI + Execution",
    items: [
      "AI-assisted synthesis",
      "Research acceleration",
      "Prototyping workflows",
      "Operational automation",
    ],
  },
  {
    title: "Technical",
    items: ["Next.js", "TypeScript", "Recharts", "Supabase", "Vercel", "Figma"],
  },
];

const supportedTravelExtensions = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".mp4",
  ".mov",
]);

const travelLabels: Record<string, string> = {
  "6.png": "Dublin, Ireland",
  "amsterdam.png": "Amsterdam, Netherlands",
  "antigua.png": "St. John's, Antigua",
  "barcelona-1.JPG": "Barcelona, Spain",
  "barcelona-2.JPG": "Barcelona, Spain",
  "bath.JPG": "Bath, United Kingdom",
  "boston.png": "Boston, Massachusetts",
  "brussels.png": "Brussels, Belgium",
  "budapest.png": "Budapest, Hungary",
  "chicago.png": "Chicago, Illinois",
  "copenhagen.JPG": "Copenhagen, Denmark",
  "hawaii-1.mp4": "Honolulu, Hawaii",
  "hawaii-2.mp4": "Big Island, Hawaii",
  "london-1.JPG": "London, United Kingdom",
  "london-2.JPG": "London, United Kingdom",
  "london-3.JPG": "London, United Kingdom",
  "malmo.png": "Malmö, Sweden",
  "mexico.png": "Mexico City, Mexico",
  "morocco-2.png": "Sahara Desert, Morocco",
  "morroco-1.JPG": "Marrakech, Morocco",
  "munich.JPG": "Munich, Germany",
  "nyc.png": "New York, New York",
  "paris.JPG": "Paris, France",
  "prague.png": "Prague, Czech Republic",
  "providence.png": "Providence, Rhode Island",
  "seattle.png": "Seattle, Washington",
  "seven sisters.JPG": "Seven Sisters, United Kingdom",
  "slovakia.JPG": "Bratislava, Slovakia",
  "vienna.png": "Vienna, Austria",
};

function formatTravelLabel(filename: string) {
  return parse(filename)
    .name.replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function getTravelItems(): TravelItem[] {
  const travelDirectory = join(process.cwd(), "public", "travel");

  return readdirSync(travelDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((filename) =>
      supportedTravelExtensions.has(extname(filename).toLowerCase()),
    )
    .map((filename) => {
      const extension = extname(filename).toLowerCase();
      const kind: TravelItem["kind"] =
        extension === ".mp4" || extension === ".mov" ? "video" : "image";

      return {
        filename,
        kind,
        label: travelLabels[filename] ?? formatTravelLabel(filename),
        src: `/travel/${encodeURIComponent(filename)}`,
      };
    })
    .sort((first, second) =>
      first.label.localeCompare(second.label, undefined, {
        sensitivity: "base",
      }),
    );
}

function TravelStrip() {
  const travelItems = getTravelItems();

  return <TravelScrollStrip items={travelItems} />;
}

const sectionGridClass =
  "grid gap-x-16 gap-y-8 md:grid-cols-[14rem_minmax(0,1fr)] lg:grid-cols-[16rem_minmax(0,1fr)]";

const sectionHeadingClass =
  "font-display text-3xl font-medium leading-[1.05] text-foreground sm:text-[2.5rem]";

const subsectionLabelClass =
  "text-[0.7rem] font-medium uppercase tracking-[0.18em] text-foreground";

export default function AboutPage() {
  return (
    <PageShell>
      <main>
        <Section className="pb-20 pt-16 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24">
          <MotionReveal>
            <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] md:items-center md:gap-16 lg:gap-20">
              <SmoothImage
                src="/vivian-headshot.png"
                alt="Vivian Glenn"
                width={420}
                height={420}
                priority
                sizes="(min-width: 1024px) 384px, (min-width: 768px) 36vw, 100vw"
                wrapperClassName="w-full max-w-[24rem] md:order-2 md:ml-auto"
                className="h-auto w-full object-contain"
              />
              <div className="max-w-3xl md:order-1">
                <h1 className="font-display text-6xl font-medium leading-[0.92] text-foreground sm:text-7xl lg:text-8xl">
                  About
                </h1>
                <div className="mt-10 space-y-5">
                  <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
                    I&apos;m a Public Health student at Rutgers interested in strategy,
                    analytics, operations, and systems that help organizations make
                    clearer decisions.
                  </p>
                  <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
                    My work centers on translating messy information into clear tools,
                    decisions, and operating rhythms.
                  </p>
                </div>
              </div>
            </div>
          </MotionReveal>
        </Section>

        <Section className="pb-20 lg:pb-24">
          <MotionReveal>
            <div className={sectionGridClass}>
              <div>
                <h2 className={sectionHeadingClass}>Education</h2>
              </div>
              <div className="space-y-10">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-7 text-foreground">
                    {education.school.name}
                  </p>
                  <p className="text-sm leading-7 text-muted">
                    {education.school.degree}
                  </p>
                  <p className="text-sm leading-7 text-quiet">
                    {education.school.detail}
                  </p>
                </div>

                <div>
                  <p className={subsectionLabelClass}>Honors &amp; Awards</p>
                  <ul className="mt-3 space-y-1 text-sm leading-7 text-muted">
                    {education.honors.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className={subsectionLabelClass}>Relevant coursework</p>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                    {education.coursework}
                  </p>
                </div>
              </div>
            </div>
          </MotionReveal>
        </Section>

        <Section className="pb-20 lg:pb-24">
          <MotionReveal>
            <div className={sectionGridClass}>
              <div>
                <h2 className={sectionHeadingClass}>
                  Research &amp; Writing
                </h2>
              </div>
              <div className="space-y-9">
                {researchRows.map((row) => (
                  <article
                    key={row.organization}
                    className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:gap-10"
                  >
                    <div>
                      <h3 className="text-sm font-medium leading-7 text-foreground">
                        {row.organization}
                      </h3>
                      <p className="text-sm leading-7 text-quiet">{row.role}</p>
                    </div>
                    <p className="max-w-xl text-sm leading-7 text-muted">
                      {row.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </MotionReveal>
        </Section>

        <Section className="pb-20 lg:pb-24">
          <MotionReveal>
            <div className={sectionGridClass}>
              <div>
                <h2 className={sectionHeadingClass}>Capabilities</h2>
              </div>
              <div className="grid gap-x-12 gap-y-9 sm:grid-cols-2">
                {capabilities.map((group) => (
                  <div key={group.title}>
                    <h3 className="text-sm font-medium leading-7 text-foreground">
                      {group.title}
                    </h3>
                    <ul className="mt-2 space-y-1 text-sm leading-7 text-muted">
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </MotionReveal>
        </Section>

        <Section className="pb-24 lg:pb-28">
          <MotionReveal>
            <div className={sectionGridClass}>
              <div>
                <h2 className={sectionHeadingClass}>Travel</h2>
              </div>
            </div>
            <div className="mt-10 lg:mt-12">
              <TravelStrip />
            </div>
          </MotionReveal>
        </Section>
      </main>
    </PageShell>
  );
}
