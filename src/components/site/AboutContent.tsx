import type { ReactNode } from "react";
import { MotionReveal } from "@/components/site/MotionReveal";
import { Section } from "@/components/site/Section";
import { SmoothImage } from "@/components/site/SmoothImage";
import {
  TravelScrollStrip,
  type TravelItem,
} from "@/components/site/TravelScrollStrip";

type AboutContentProps = {
  travelItems: TravelItem[];
  titleId?: string;
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
  coursework: [
    "Statistics",
    "Calculus I",
    "Microeconomics",
    "Biochemistry",
    "Organic Chemistry",
    "Physics",
    "Health Disparities",
    "Public Health Literature",
  ],
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
  "grid items-start gap-y-6 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-x-12 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-x-16";

const sectionHeadingClass =
  "text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-foreground";

const subsectionLabelClass =
  "text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-foreground";

const bodyTextClass = "text-[0.95rem] leading-7 text-muted";
const rowTitleClass = "text-[0.95rem] font-semibold leading-7 text-foreground";
const rowSupportClass = "text-[0.95rem] leading-7 text-quiet";

type ProfileSectionProps = {
  title: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

function ProfileSection({
  title,
  children,
  className = "",
  contentClassName = "",
}: ProfileSectionProps) {
  return (
    <Section className={`modal-rule py-12 sm:py-14 lg:py-16 ${className}`}>
      <MotionReveal>
        <div className={sectionGridClass}>
          <div>
            <h2 className={sectionHeadingClass}>{title}</h2>
          </div>
          <div className={contentClassName}>{children}</div>
        </div>
      </MotionReveal>
    </Section>
  );
}

export function AboutContent({ travelItems, titleId }: AboutContentProps) {
  return (
    <>
      <Section className="pb-12 pt-12 sm:pb-14 sm:pt-16 lg:pb-16 lg:pt-20">
        <MotionReveal>
          <div className="grid items-start gap-8 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-x-12 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-x-16">
            <SmoothImage
              src="/vivian-headshot.png"
              alt="Vivian Glenn"
              width={420}
              height={420}
              priority
              sizes="(min-width: 1024px) 224px, (min-width: 768px) 208px, 220px"
              wrapperClassName="w-full max-w-[12rem] sm:max-w-[13rem]"
              className="h-auto w-full object-contain"
            />
            <div className="max-w-3xl pt-1">
              <h1
                id={titleId}
                className="text-5xl font-semibold tracking-[-0.04em] text-foreground sm:text-6xl lg:text-[4.5rem]"
              >
                About
              </h1>
              <div className="mt-6 space-y-4">
                <p className="max-w-2xl text-base leading-7 text-muted sm:text-[1.02rem]">
                  I&apos;m a Public Health student at Rutgers interested in strategy,
                  analytics, operations, and systems that help organizations make
                  clearer decisions.
                </p>
                <p className="max-w-2xl text-base leading-7 text-muted sm:text-[1.02rem]">
                  My work centers on translating messy information into clear tools,
                  decisions, and operating rhythms.
                </p>
              </div>
            </div>
          </div>
        </MotionReveal>
      </Section>

      <ProfileSection title="Education" contentClassName="space-y-8">
        <div className="space-y-1.5">
          <p className={rowTitleClass}>{education.school.name}</p>
          <p className={bodyTextClass}>{education.school.degree}</p>
          <p className={rowSupportClass}>{education.school.detail}</p>
        </div>

        <div>
          <p className={subsectionLabelClass}>Honors &amp; Awards</p>
          <ul className={`mt-3 space-y-1 ${bodyTextClass}`}>
            {education.honors.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className={subsectionLabelClass}>Relevant coursework</p>
          <ul className={`mt-3 grid gap-x-8 gap-y-1 ${bodyTextClass} sm:grid-cols-2`}>
            {education.coursework.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </ProfileSection>

      <ProfileSection title="Research & Writing" contentClassName="space-y-6">
        {researchRows.map((row) => (
          <article
            key={row.organization}
            className="grid gap-2 border-b border-line/70 pb-6 last:border-b-0 last:pb-0 md:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] md:gap-x-8"
          >
            <div>
              <h3 className={rowTitleClass}>{row.organization}</h3>
              <p className={rowSupportClass}>{row.role}</p>
            </div>
            <p className={`max-w-2xl ${bodyTextClass}`}>{row.description}</p>
          </article>
        ))}
      </ProfileSection>

      <ProfileSection
        title="Capabilities"
        contentClassName="grid gap-x-10 gap-y-7 md:grid-cols-2"
      >
        {capabilities.map((group) => (
          <div key={group.title} className="space-y-2">
            <h3 className={rowTitleClass}>{group.title}</h3>
            <ul className={`space-y-1 ${bodyTextClass}`}>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </ProfileSection>

      <ProfileSection
        title="Travel"
        className="pb-20 sm:pb-24 lg:pb-28"
        contentClassName="space-y-6"
      >
        <TravelScrollStrip items={travelItems} />
      </ProfileSection>
    </>
  );
}
