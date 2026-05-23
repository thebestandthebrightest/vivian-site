"use client";

import { useEffect, useRef, useState } from "react";
import type { WellnessThroughClayPreviewData } from "@/lib/wellness-through-clay-preview-data";
import {
  ModalArrow,
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
  "Insights",
  "Outreach + event design",
];

const quotes = [
  "This gave me a reason to slow down during a stressful week.",
  "I met people here I wouldn’t have talked to otherwise.",
  "It was nice creating something without pressure.",
];

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
        <CumulativeGrowthBars
          label={data.cumulativeGrowth.label}
          items={data.cumulativeGrowth.points}
          caption="Cumulative reach grew across three programming cycles while the model became more consistent."
        />
      </section>
      <section>
        <QuoteList items={quotes} />
      </section>
      <section>
        <EvidenceReach items={evidenceLinks} />
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
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-0">
        {steps.map((step, index) => (
          <div
            key={step}
            className="flex flex-1 items-center gap-3 lg:min-w-0"
          >
            <p className="min-w-0 text-base font-medium leading-6 text-foreground sm:text-[1.05rem]">
              {step}
            </p>
            {index < steps.length - 1 ? (
              <span aria-hidden="true" className="ml-auto hidden shrink-0 lg:mx-5 lg:inline-flex">
                <ModalArrow />
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function CumulativeGrowthBars({
  label,
  items,
  caption,
}: {
  label: string;
  items: Array<{
    cycle: string;
    value: number;
    displayValue?: string;
  }>;
  caption: string;
}) {
  const max = Math.max(...items.map((item) => item.value));

  return (
    <section>
      <ModalSectionLabel>{label}</ModalSectionLabel>
      <div className="mt-5 space-y-5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const displayValue = item.displayValue ?? String(item.value);
          return (
            <div key={item.cycle}>
              <div className="mb-2 flex items-baseline justify-between gap-4">
                <p className="text-base font-medium leading-6 text-foreground sm:text-[1.05rem]">
                  {item.cycle.replace("-", "–")}
                </p>
                <p
                  className="font-display text-[1.45rem] font-medium leading-none text-foreground"
                  style={isLast ? { color: "var(--sage-deep)" } : undefined}
                >
                  {displayValue}
                </p>
              </div>
              <div className="h-2.5 w-full bg-line/45">
                <div
                  className="h-full transition-[width] duration-500 ease-out motion-reduce:transition-none"
                  style={{
                    width: `${Math.max(8, (item.value / max) * 100)}%`,
                    background: isLast ? "var(--accent)" : "rgba(72, 38, 29, 0.34)",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-5 max-w-3xl text-[0.98rem] leading-7 text-muted">{caption}</p>
    </section>
  );
}

function QuoteList({ items }: { items: string[] }) {
  return (
    <section>
      <ModalSectionLabel>Participant signal</ModalSectionLabel>
      <div className="mt-5 grid gap-7 sm:grid-cols-3 sm:gap-10">
        {items.map((quote) => (
          <figure key={quote} className="border-t border-line pt-5">
            <blockquote className="font-display text-[1.18rem] italic leading-8 text-foreground sm:text-[1.24rem]">
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

function EvidenceReach({ items }: { items: EvidenceLinkItem[] }) {
  return (
    <section>
      <ModalSectionLabel>Evidence + reach</ModalSectionLabel>
      <div className="mt-5">
        <ul className="flex flex-wrap gap-x-5 gap-y-3 lg:flex-nowrap">
          {items.map((item) => (
            <li key={item.label}>
              <EvidenceLink item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function EvidenceLink({ item }: { item: EvidenceLinkItem }) {
  const content = (
    <>
      <span className="font-medium text-foreground">{item.label}</span>
      <span className="text-muted">—</span>
      <span>{item.display}</span>
    </>
  );

  if (!item.href) {
    return (
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-[0.96rem] leading-7 text-muted xl:text-base">
        {content}
      </span>
    );
  }

  return (
    <ModalInlineLink
      href={item.href}
      className="whitespace-nowrap text-[0.96rem] leading-7 text-muted xl:text-base"
    >
      {content}
    </ModalInlineLink>
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
    <section className="border-t border-line pt-10">
      <ModalSectionLabel>Live site preview</ModalSectionLabel>
      <div
        ref={containerRef}
        className="mt-5 w-full max-w-[72rem] overflow-hidden border border-line bg-background p-3 sm:p-4"
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
