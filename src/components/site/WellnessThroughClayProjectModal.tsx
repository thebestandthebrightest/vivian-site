"use client";

import type { WellnessThroughClayPreviewData } from "@/lib/wellness-through-clay-preview-data";
import {
  ModalIcon,
  type ModalIconName,
  ProjectModalShell,
  SkillsImpactColumns,
} from "./ProjectModalShell";

type WellnessThroughClayProjectModalProps = {
  data: WellnessThroughClayPreviewData;
  isOpen: boolean;
  onClose: () => void;
};

const processSteps = [
  { label: "Workshops", icon: "calendar-check" as const },
  { label: "Attendance + feedback", icon: "clipboard" as const },
  { label: "Planning insights", icon: "bar-chart" as const },
  { label: "Outreach + event design", icon: "target" as const },
];

const quotes = [
  "This gave me a reason to slow down during a stressful week.",
  "I met people here I wouldn't have talked to otherwise.",
  "It was nice creating something without pressure.",
];

const skills = [
  {
    title: "Program operations",
    detail: "Planned recurring ceramics workshops, attendance tracking, and session logistics.",
    icon: "calendar-check" as const,
  },
  {
    title: "Feedback analysis",
    detail: "Used attendance and reflection signals to understand workshop demand and student experience.",
    icon: "clipboard" as const,
  },
  {
    title: "Outreach strategy",
    detail: "Connected cycle-level learning to event design and campus visibility.",
    icon: "target" as const,
  },
];

const impacts = [
  {
    title: "Improved workshop planning",
    detail: "Used attendance and feedback data to adjust programming across three cycles.",
    icon: "bar-chart" as const,
  },
  {
    title: "Supported low-pressure wellness experiences",
    detail: "Created recurring sessions where students could participate without performance pressure.",
    icon: "message-square" as const,
  },
  {
    title: "Connected creative programming to evidence",
    detail: "Made reach, session count, and external proof visible for future planning.",
    icon: "monitor" as const,
  },
];

const kpis = [
  { label: "Cumulative attendees", value: "250+", highlight: true, icon: "users" as const },
  { label: "Sessions", value: "18", icon: "calendar-check" as const },
  { label: "Cycles", value: "3", icon: "layers" as const },
  { label: "Avg / session", value: "14–16", icon: "bar-chart" as const },
];

export function WellnessThroughClayProjectModal({
  data,
  isOpen,
  onClose,
}: WellnessThroughClayProjectModalProps) {
  const linkMap = Object.fromEntries(
    data.projectLinks.map((link) => [link.label, link.href]),
  ) as Record<string, string | null>;

  const websiteHref = linkMap["Website"] ?? "https://wellnessthroughclay.com";
  const instagramHref = linkMap["Instagram"] ?? null;
  const rutgersCasHref = linkMap["Rutgers CAS"] ?? null;
  const dailyTargumHref = linkMap["Daily Targum"] ?? null;
  const cumulativeGrowthPoints = data.cumulativeGrowth.points.map((point) => ({
    ...point,
    cycleLabel: point.cycle.replace("-", "–"),
    displayValue:
      "displayValue" in point && typeof point.displayValue === "string"
        ? point.displayValue
        : `${point.value}`,
  }));
  const externalProofItems = [
    {
      label: "Website",
      href: websiteHref,
      display: "wellnessthroughclay.com",
    },
    {
      label: "Rutgers CAS",
      href: rutgersCasHref,
      display: "Rutgers CAS",
    },
    {
      label: "Daily Targum",
      href: dailyTargumHref,
      display: "Daily Targum",
    },
    {
      label: "Instagram",
      href: instagramHref,
      display: "@ru_wellness_clay",
    },
  ];

  return (
    <ProjectModalShell
      isOpen={isOpen}
      onClose={onClose}
      labelledById="wtc-modal-title"
      title="Wellness Through Clay"
      summary="Student wellness initiative built through iterative programming and attendance insights."
    >
      <section>
        <KpiStripTight items={kpis} />
      </section>

      <section>
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-2">
          {processSteps.map((step, idx) => (
            <div
              key={step.label}
              className="flex flex-1 items-center gap-2"
            >
              <p className="flex flex-1 items-center gap-2.5 text-sm font-medium leading-6 text-foreground sm:text-[0.96rem]">
                <ModalIcon name={step.icon} className="h-4 w-4 shrink-0 text-quiet" />
                <span>{step.label}</span>
              </p>
              {idx < processSteps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="text-[0.82rem] text-quiet/70"
                >
                  <span className="sm:hidden">↓</span>
                  <ModalIcon name="arrow-right" className="hidden h-4 w-4 sm:block" />
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section>
        <CumulativeGrowthChart
          label={data.cumulativeGrowth.label}
          items={cumulativeGrowthPoints}
          caption="Cumulative reach grew across three programming cycles while the model became more consistent."
        />
      </section>

      <section>
        <div className="grid gap-8 sm:grid-cols-3 sm:gap-10">
          {quotes.map((quote, idx) => (
            <figure
              key={idx}
              className="border-t border-line pt-5"
            >
              <blockquote className="font-display text-[1.02rem] italic leading-7 text-foreground sm:text-[1.12rem]">
                <span aria-hidden="true" className="text-quiet/60">
                  &ldquo;
                </span>
                {quote}
                <span aria-hidden="true" className="text-quiet/60">
                  &rdquo;
                </span>
              </blockquote>
            </figure>
          ))}
        </div>
      </section>

      <section>
        <ExternalProofRow items={externalProofItems} />
      </section>

      <SkillsImpactColumns skills={skills} impact={impacts} />

      <section>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-muted sm:text-[0.96rem]">
          Supported 250+ cumulative participants across 18 sessions while
          iterating programming through attendance and feedback insights.
        </p>
      </section>

      <section className="border-t border-line pt-4">
        <a
          href={websiteHref}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring inline-flex items-center gap-2 text-sm font-medium leading-6 text-foreground transition hover:opacity-70 sm:text-[0.96rem]"
        >
          <ModalIcon name="monitor" className="h-4 w-4 text-quiet" />
          <span>Open public project site</span>
          <span aria-hidden="true">↗</span>
        </a>
      </section>
    </ProjectModalShell>
  );
}

function KpiStripTight({
  items,
}: {
  items: Array<{
    label: string;
    value: string;
    highlight?: boolean;
    icon?: ModalIconName;
  }>;
}) {
  return (
    <div className="grid gap-x-6 gap-y-4 border-y border-line py-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label}>
          <p
            className="font-display text-[2rem] font-medium leading-none text-foreground lg:text-[2.25rem]"
            style={
              item.highlight
                ? {
                    background: "var(--sage-soft)",
                    boxShadow: "inset 0 -0.35em 0 var(--sage-soft)",
                    display: "inline-block",
                    padding: "0 0.2em",
                  }
                : undefined
            }
          >
            {item.value}
          </p>
          <div className="mt-1.5 flex items-center gap-1.5 text-[0.76rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet">
            {item.icon ? <ModalIcon name={item.icon} className="h-4 w-4" /> : null}
            <span>{item.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function CumulativeGrowthChart({
  label,
  items,
  caption,
}: {
  label: string;
  items: Array<{
    cycle: string;
    cycleLabel: string;
    value: number;
    displayValue: string;
  }>;
  caption: string;
}) {
  const width = 760;
  const height = 240;
  const paddingX = 36;
  const top = 30;
  const bottom = 56;
  const chartHeight = height - top - bottom;
  const max = Math.max(...items.map((item) => item.value));

  const points = items.map((item, index) => {
    const x =
      items.length === 1
        ? width / 2
        : paddingX + (index * (width - paddingX * 2)) / (items.length - 1);
    const y = top + chartHeight - (item.value / max) * chartHeight;
    return { ...item, x, y };
  });

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
  const areaPath = [
    `M ${points[0]?.x ?? 0} ${height - bottom + 4}`,
    ...points.map((point) => `L ${point.x} ${point.y}`),
    `L ${points[points.length - 1]?.x ?? width} ${height - bottom + 4}`,
    "Z",
  ].join(" ");

  return (
    <div>
      <p className="text-[0.75rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
        {label}
      </p>
      <div className="mt-4">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full overflow-visible"
          role="img"
          aria-label="Cumulative attendee growth across three Wellness Through Clay programming cycles"
        >
          <defs>
            <linearGradient id="wtc-growth-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(151, 164, 127, 0.22)" />
              <stop offset="100%" stopColor="rgba(151, 164, 127, 0)" />
            </linearGradient>
          </defs>
          <line
            x1={paddingX}
            x2={width - paddingX}
            y1={height - bottom + 4}
            y2={height - bottom + 4}
            stroke="rgba(72, 38, 29, 0.14)"
            strokeWidth="1"
          />
          <path d={areaPath} fill="url(#wtc-growth-fill)" />
          <path
            d={linePath}
            fill="none"
            stroke="rgba(72, 38, 29, 0.58)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {points.map((point, index) => {
            const isLast = index === points.length - 1;
            return (
              <g key={point.cycle}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={isLast ? 5 : 4}
                  fill={isLast ? "var(--sage)" : "rgba(72, 38, 29, 0.5)"}
                />
                <text
                  x={point.x}
                  y={point.y - 14}
                  fill="rgba(72, 38, 29, 0.86)"
                  fontSize="16"
                  fontFamily="var(--font-sans, sans-serif)"
                  textAnchor="middle"
                >
                  {point.displayValue}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="mt-3 grid gap-3 sm:grid-cols-3 sm:gap-4">
          {items.map((item, index) => (
            <div key={item.cycle} className="border-t border-line pt-3">
              <p className="text-sm leading-6 text-muted sm:text-[0.96rem]">
                {item.cycleLabel}
              </p>
              <p
                className="mt-1 font-display text-[1.35rem] font-medium leading-none text-foreground"
                style={index === items.length - 1 ? { color: "var(--sage-deep)" } : undefined}
              >
                {item.displayValue}
              </p>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-muted sm:text-[0.96rem]">
        {caption}
      </p>
    </div>
  );
}

type ExternalLinkItem = {
  label: string;
  href: string | null;
  display: string;
};

function ExternalProofRow({ items }: { items: ExternalLinkItem[] }) {
  return (
    <div className="border-y border-line py-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-8">
        <p className="text-[0.75rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet lg:min-w-[8.5rem]">
          External proof
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-3">
          {items.map((item) => (
            <li key={item.label}>
              <ExternalProofLink item={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ExternalProofLink({ item }: { item: ExternalLinkItem }) {
  const iconByLabel: Record<string, ModalIconName> = {
    Website: "monitor",
    "Rutgers CAS": "layers",
    "Daily Targum": "clipboard",
    Instagram: "message-square",
  };
  const content = (
    <>
      <ModalIcon
        name={iconByLabel[item.label] ?? "monitor"}
        className="h-4 w-4 text-quiet"
      />
      <span className="font-medium text-foreground">{item.label}</span>
      <span className="text-muted">-</span>
      <span>{item.display}</span>
      {item.href ? <span aria-hidden="true">↗</span> : null}
    </>
  );

  if (!item.href) {
    return (
      <span className="inline-flex items-center gap-1 text-sm leading-6 text-muted sm:text-[0.96rem]">
        {content}
      </span>
    );
  }

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="focus-ring inline-flex items-center gap-1 text-sm leading-6 text-muted transition hover:text-foreground sm:text-[0.96rem]"
    >
      {content}
    </a>
  );
}
