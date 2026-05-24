"use client";

import { useEffect, useRef, useState } from "react";
import type { WellnessThroughClayPreviewData } from "@/lib/wellness-through-clay-preview-data";
import {
  ModalInlineLink,
  ModalSectionLabel,
  ProjectModalShell,
  SkillsImpactColumns,
} from "./ProjectModalShell";

type WellnessThroughClayProjectModalProps = {
  data: WellnessThroughClayPreviewData;
  isOpen: boolean;
  onClose: () => void;
};

const processSteps = [
  "Workshops",
  "Attendance + feedback",
  "Insight",
  "Outreach + event design",
];

const quotes = [
  "This gave me a reason to slow down during a stressful week.",
  "I met people here I wouldn’t have talked to otherwise.",
  "It was nice creating something without pressure.",
];

const cycleNotes: Record<string, string> = {
  "Spring 2025": "Hosted at The Yard",
  "Summer 2025": "Faculty/staff summer series",
  "2025-2026": "Moved into IFNH collaboration space",
};

const skills = [
  {
    title: "Program operations",
    detail:
      "Ran recurring workshop cycles across planning, facilitation, attendance tracking, and follow-up logistics.",
  },
  {
    title: "Feedback analysis",
    detail:
      "Used attendance and participant feedback to understand what kept the program steady over time.",
  },
  {
    title: "Outreach strategy",
    detail:
      "Adjusted event framing and promotion based on what drew students back across multiple cycles.",
  },
];

const impacts = [
  {
    title: "Supported 250+ cumulative attendees",
    detail:
      "Built a repeatable format that kept participation strong across three programming cycles.",
  },
  {
    title: "Strengthened creative wellness programming across 18 sessions",
    detail:
      "Showed that the initiative could keep a calm, low-pressure format without losing engagement.",
  },
  {
    title: "Connected attendance and feedback data to future event design",
    detail:
      "Made future outreach and event planning more evidence-based instead of intuitive only.",
  },
];

const kpis = [
  { label: "Cumulative attendees", value: "250+", highlight: true },
  { label: "Sessions", value: "18" },
  { label: "Cycles", value: "3" },
  { label: "Avg / session", value: "14–16" },
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
  const evidenceLinks = [
    {
      label: "Website",
      href: websiteHref,
      display: "wellnessthroughclay.com",
    },
    {
      label: "Rutgers CAS",
      href: linkMap["Rutgers CAS"] ?? null,
      display: "Rutgers CAS",
    },
    {
      label: "Daily Targum",
      href: linkMap["Daily Targum"] ?? null,
      display: "Daily Targum",
    },
    {
      label: "Instagram",
      href: linkMap["Instagram"] ?? null,
      display: "@ru_wellness_clay",
    },
  ];

  return (
    <ProjectModalShell
      isOpen={isOpen}
      onClose={onClose}
      labelledById="wtc-modal-title"
      title="Wellness Through Clay"
      summary="Student wellness initiative built through iterative programming, attendance insights, and community feedback."
    >
      <section>
        <ModalSectionLabel>Impact snapshot</ModalSectionLabel>
        <div className="mt-4">
          <KpiStripTight items={kpis} />
        </div>
      </section>
      <section>
        <ModalSectionLabel>Data to action</ModalSectionLabel>
        <div className="mt-5">
          <ProcessRow steps={processSteps} />
        </div>
      </section>
      <section>
        <CumulativeReachLine
          label="Cumulative reach"
          items={data.cumulativeGrowth.points}
        />
      </section>
      <section>
        <QuoteList items={quotes} />
      </section>
      <section>
        <ProofPoints items={evidenceLinks} />
      </section>
      <SkillsImpactColumns skills={skills} impact={impacts} />
      <LiveSitePreview href={websiteHref} />
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
  }>;
}) {
  return (
    <section className="grid gap-x-8 gap-y-6 border-y border-line py-7 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label}>
          <p
            className="font-display text-4xl font-medium leading-none text-foreground lg:text-[2.75rem]"
            style={item.highlight ? { color: "var(--sage-deep)" } : undefined}
          >
            {item.value}
          </p>
          <p className="mt-2 text-[0.72rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
            {item.label}
          </p>
        </div>
      ))}
    </section>
  );
}

function ProcessRow({ steps }: { steps: string[] }) {
  return (
    <section aria-label="Wellness Through Clay process">
      <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li
            key={step}
            className="flex h-full flex-col justify-between border border-line bg-background px-5 py-5"
          >
            <p className="text-[0.7rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
              Step {String(index + 1).padStart(2, "0")}
            </p>
            <p className="mt-3 text-[1.02rem] font-medium leading-6 text-foreground sm:text-[1.05rem]">
              {step}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function CumulativeReachLine({
  label,
  items,
}: {
  label: string;
  items: Array<{
    cycle: string;
    value: number;
    displayValue?: string;
  }>;
}) {
  const [activeCycle, setActiveCycle] = useState<string | null>(null);
  const width = 720;
  const height = 220;
  const padX = 56;
  const padTop = 32;
  const padBottom = 44;
  const innerW = width - padX * 2;
  const innerH = height - padTop - padBottom;

  const max = Math.max(...items.map((i) => i.value));
  const min = Math.min(...items.map((i) => i.value));
  const range = Math.max(1, max - min);
  const pad = range * 0.25;
  const yMax = max + pad;
  const yMin = Math.max(0, min - pad);
  const yRange = Math.max(1, yMax - yMin);

  const points = items.map((item, idx) => {
    const x =
      items.length === 1
        ? padX + innerW / 2
        : padX + (innerW * idx) / (items.length - 1);
    const y = padTop + innerH - ((item.value - yMin) / yRange) * innerH;
    return { ...item, x, y, isLast: idx === items.length - 1 };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");

  const baselineY = padTop + innerH;
  const activePoint = points.find((point) => point.cycle === activeCycle) ?? null;
  const activeNote = activePoint ? cycleNotes[activePoint.cycle] : null;

  return (
    <section>
      <ModalSectionLabel>{label}</ModalSectionLabel>
      <div className="relative mt-4 w-full">
        {activePoint && activeNote ? (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 rounded-full border border-line bg-background/95 px-3 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-quiet shadow-[0_8px_24px_rgba(32,27,24,0.08)]"
            style={{
              left: `${(activePoint.x / width) * 100}%`,
              top: `calc(${(activePoint.y / height) * 100}% - 2.5rem)`,
            }}
          >
            {activeNote}
          </div>
        ) : null}
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`${label}: ${points
            .map((p) => `${p.cycle.replace("-", "–")} ${p.displayValue ?? p.value}`)
            .join(", ")}`}
          className="block h-auto w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <line
            x1={padX}
            x2={width - padX}
            y1={baselineY}
            y2={baselineY}
            stroke="var(--line)"
            strokeWidth={1}
          />
          <path
            d={linePath}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {points.map((p) => (
            <g key={p.cycle}>
              <circle
                cx={p.x}
                cy={p.y}
                r={14}
                fill="transparent"
                className="cursor-default"
                onMouseEnter={() => setActiveCycle(p.cycle)}
                onMouseLeave={() => setActiveCycle((current) => (current === p.cycle ? null : current))}
                onFocus={() => setActiveCycle(p.cycle)}
                onBlur={() => setActiveCycle((current) => (current === p.cycle ? null : current))}
                tabIndex={0}
                aria-label={`${p.cycle.replace("-", "–")}: ${cycleNotes[p.cycle] ?? p.displayValue ?? p.value}`}
              />
              <circle
                cx={p.x}
                cy={p.y}
                r={p.isLast ? 5 : 3.25}
                fill={p.isLast ? "var(--accent)" : "var(--background)"}
                stroke="var(--accent)"
                strokeWidth={1.6}
              />
              <text
                x={p.x}
                y={p.y - 14}
                textAnchor="middle"
                fontSize={13}
                fontWeight={500}
                fill={p.isLast ? "var(--sage-deep)" : "var(--foreground)"}
              >
                {p.displayValue ?? String(p.value)}
              </text>
              <text
                x={p.x}
                y={baselineY + 22}
                textAnchor="middle"
                fontSize={11}
                fill="var(--quiet)"
                letterSpacing={1.4}
              >
                {p.cycle.replace("-", "–").toUpperCase()}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}

function QuoteList({ items }: { items: string[] }) {
  return (
    <section>
      <ModalSectionLabel>Quotes</ModalSectionLabel>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {items.map((quote) => (
          <figure
            key={quote}
            className="h-full border border-line bg-background px-5 py-5"
          >
            <blockquote className="font-display text-[1.1rem] italic leading-7 text-foreground sm:text-[1.16rem]">
              “{quote}”
            </blockquote>
          </figure>
        ))}
      </div>
    </section>
  );
}

type EvidenceLinkItem = {
  label: string;
  href: string | null;
  display: string;
};

function ProofPoints({ items }: { items: EvidenceLinkItem[] }) {
  return (
    <section>
      <ModalSectionLabel>Proof points</ModalSectionLabel>
      <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.label}>
            <ProofPointCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProofPointCard({ item }: { item: EvidenceLinkItem }) {
  const body = (
    <>
      <p className="text-[0.7rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
        {item.label}
      </p>
      <p className="mt-2 text-[0.98rem] font-medium leading-6 text-foreground">
        {item.display}
      </p>
    </>
  );

  if (!item.href) {
    return (
      <div className="block h-full border border-line bg-background px-4 py-4">
        {body}
      </div>
    );
  }

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="focus-ring proof-point-card group block h-full border border-line bg-background px-4 py-4 transition-colors duration-200 hover:border-foreground/40 motion-reduce:transition-none"
    >
      {body}
    </a>
  );
}

function LiveSitePreview({ href }: { href: string }) {
  const previewWidth = 1440;
  const previewHeight = 900;
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [previewBlocked, setPreviewBlocked] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScale = () => {
      setScale(Math.min(1, container.clientWidth / previewWidth));
    };

    updateScale();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateScale);
      return () => window.removeEventListener("resize", updateScale);
    }

    const resizeObserver = new ResizeObserver(updateScale);
    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <section className="border-t border-line pt-8">
      <ModalSectionLabel>Live site preview</ModalSectionLabel>
      <div
        ref={containerRef}
        className="mt-4 w-full overflow-hidden border border-line bg-background p-2.5 sm:p-3"
        style={{ height: `${Math.round(previewHeight * scale) + 24}px` }}
      >
        <div className="overflow-hidden bg-background" style={{ height: `${Math.round(previewHeight * scale)}px` }}>
          <iframe
            title="Wellness Through Clay live site preview"
            src={href}
            width={previewWidth}
            height={previewHeight}
            loading="lazy"
            onError={() => setPreviewBlocked(true)}
            className="block border-0"
            style={{
              height: `${previewHeight}px`,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              width: `${previewWidth}px`,
            }}
          />
        </div>
      </div>
      {previewBlocked ? (
        <p className="mt-3 text-[0.98rem] leading-7 text-muted">
          Preview blocked by the live site.{" "}
          <ModalInlineLink href={href} className="font-medium">
            Open wellnessthroughclay.com
          </ModalInlineLink>
        </p>
      ) : null}
    </section>
  );
}
