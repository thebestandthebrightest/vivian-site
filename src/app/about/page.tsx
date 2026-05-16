import type { Metadata } from "next";
import { readdirSync } from "node:fs";
import { extname, join, parse } from "node:path";
import { MotionReveal } from "@/components/site/MotionReveal";
import { PageIntro } from "@/components/site/PageIntro";
import { PageShell } from "@/components/site/PageShell";
import { Section } from "@/components/site/Section";
import {
  TravelScrollStrip,
  type TravelItem,
} from "@/components/site/TravelScrollStrip";

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
    title: "AI Workflows",
    items: [
      "AI-assisted synthesis",
      "Prompt systems",
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
  "antigua.png": "Antigua, Guatemala",
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
  "malmo.png": "Malmo, Sweden",
  "mexico.png": "Mexico City, Mexico",
  "morocco-2.png": "Sahara Desert, Morocco",
  "morroco-1.JPG": "Marrakesh, Morocco",
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
    .sort((first, second) =>
      first.localeCompare(second, undefined, { sensitivity: "base" }),
    )
    .map((filename) => {
      const extension = extname(filename).toLowerCase();
      const kind = extension === ".mp4" || extension === ".mov" ? "video" : "image";

      return {
        filename,
        kind,
        label: travelLabels[filename] ?? formatTravelLabel(filename),
        src: `/travel/${encodeURIComponent(filename)}`,
      };
    });
}

function TravelStrip() {
  const travelItems = getTravelItems();

  return <TravelScrollStrip items={travelItems} />;
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
                Approach
              </h2>
              <ul className="grid gap-x-8 gap-y-4 text-sm leading-7 text-muted sm:grid-cols-2">
                {currentFocus.map((focus) => (
                  <li key={focus}>{focus}</li>
                ))}
              </ul>
            </div>
          </MotionReveal>
        </Section>

        <Section className="pb-16 lg:pb-20">
          <MotionReveal>
            <div className="grid gap-10 border-t border-line pt-9 md:grid-cols-[0.75fr_1.45fr] md:gap-16">
              <h2 className="font-display text-4xl font-medium leading-none text-foreground sm:text-5xl">
                Capabilities
              </h2>
              <div className="grid gap-x-12 sm:grid-cols-2">
                {capabilities.map((group) => (
                  <div
                    key={group.title}
                    className="border-t border-line py-5 lg:py-6"
                  >
                    <h3 className="text-sm font-medium leading-7 text-foreground">
                      {group.title}
                    </h3>
                    <ul className="mt-3 grid gap-2 text-sm leading-7 text-muted">
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
            <div className="grid gap-8 border-t border-line pt-9">
              <div className="grid gap-5 md:grid-cols-[0.75fr_1.45fr] md:gap-16">
                <h2 className="font-display text-4xl font-medium leading-none text-foreground sm:text-5xl">
                  Travel
                </h2>
              </div>
              <TravelStrip />
            </div>
          </MotionReveal>
        </Section>
      </main>
    </PageShell>
  );
}
