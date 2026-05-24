import { SmoothImage } from "@/components/site/SmoothImage";
import {
  TravelScrollStrip,
  type TravelItem,
} from "@/components/site/TravelScrollStrip";

type ProfileModalContentProps = {
  travelItems: TravelItem[];
  titleId: string;
};

const intro = [
  "I'm a Public Health student at Rutgers interested in strategy, analytics, operations, and systems that help organizations make clearer decisions.",
  "My work centers on translating messy information into clear tools, decisions, and operating rhythms.",
];

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

const sectionGridClass =
  "grid gap-x-12 gap-y-6 md:grid-cols-[12rem_minmax(0,1fr)] lg:grid-cols-[14rem_minmax(0,1fr)]";

const sectionHeadingClass =
  "font-display text-2xl font-medium leading-[1.05] text-foreground sm:text-[1.75rem]";

const subsectionLabelClass = "system-eyebrow";

export function ProfileModalContent({
  travelItems,
  titleId,
}: ProfileModalContentProps) {
  return (
    <>
      <header className="grid gap-8 pb-10 pt-6 lg:grid-cols-[1fr_0.9fr] lg:items-start lg:gap-10">
        <div className="flex flex-col gap-6">
          <h2
            id={titleId}
            className="font-display text-[clamp(2.6rem,6vw,4.25rem)] font-medium leading-[0.95] text-foreground"
          >
            VIVIAN GLENN
          </h2>
          <div className="space-y-4">
            {intro.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-xl text-[0.98rem] leading-7 text-muted sm:text-[1.05rem]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <SmoothImage
            src="/vivian-headshot.png"
            alt="Vivian Glenn"
            width={420}
            height={420}
            priority
            sizes="(min-width: 1024px) 360px, (min-width: 768px) 36vw, 80vw"
            wrapperClassName="w-full max-w-[22rem] lg:ml-auto"
            className="h-auto w-full object-contain"
          />
        </div>
      </header>

      <section className="border-t border-line pt-10">
        <div className={sectionGridClass}>
          <div>
            <h3 className={sectionHeadingClass}>Education</h3>
          </div>
          <div className="space-y-8">
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
      </section>

      <section className="border-t border-line pt-10">
        <div className={sectionGridClass}>
          <div>
            <h3 className={sectionHeadingClass}>Research &amp; Writing</h3>
          </div>
          <div className="space-y-7">
            {researchRows.map((row) => (
              <article
                key={row.organization}
                className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:gap-10"
              >
                <div>
                  <h4 className="text-sm font-medium leading-7 text-foreground">
                    {row.organization}
                  </h4>
                  <p className="text-sm leading-7 text-quiet">{row.role}</p>
                </div>
                <p className="max-w-xl text-sm leading-7 text-muted">
                  {row.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line pt-10">
        <div className={sectionGridClass}>
          <div>
            <h3 className={sectionHeadingClass}>Capabilities</h3>
          </div>
          <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
            {capabilities.map((group) => (
              <div key={group.title}>
                <h4 className="text-sm font-medium leading-7 text-foreground">
                  {group.title}
                </h4>
                <ul className="mt-2 space-y-1 text-sm leading-7 text-muted">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line pt-10">
        <div className={sectionGridClass}>
          <div>
            <h3 className={sectionHeadingClass}>Travel</h3>
          </div>
        </div>
        <div className="mt-8">
          <TravelScrollStrip items={travelItems} />
        </div>
      </section>
    </>
  );
}
