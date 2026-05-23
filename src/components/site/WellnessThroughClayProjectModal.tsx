"use client";

import { useEffect, useRef, useState } from "react";
import type { WellnessThroughClayPreviewData } from "@/lib/wellness-through-clay-preview-data";
import { ProjectModalShell } from "./ProjectModalShell";

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
  "Program operations",
  "Feedback analysis",
  "Outreach strategy",
];

const impacts = [
  "Supported 250+ cumulative attendees",
  "Strengthened creative wellness programming across 18 sessions",
  "Connected attendance and feedback data to future event design",
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
      <KpiStripTight items={kpis} />
      <ProcessRow steps={processSteps} />
      <CumulativeGrowthBars
        label={data.cumulativeGrowth.label}
        items={data.cumulativeGrowth.points}
        caption="Cumulative reach grew across three programming cycles while the model became more consistent."
      />
      <QuoteList items={quotes} />
      <EvidenceReach items={evidenceLinks} />
      <SkillsImpactSummary skills={skills} impacts={impacts} />
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
    <section className="grid gap-x-6 gap-y-5 border-y border-line py-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label}>
          <p
            className="font-display text-[2.15rem] font-medium leading-none text-foreground lg:text-[2.45rem]"
            style={item.highlight ? { color: "var(--sage-deep, #7a8556)" } : undefined}
          >
            {item.value}
          </p>
          <p className="mt-2 text-[0.82rem] font-medium uppercase leading-5 tracking-[0.13em] text-quiet">
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
              <span
                aria-hidden="true"
                className="ml-auto shrink-0 text-base leading-none text-quiet/55 lg:mx-5"
              >
                <span className="lg:hidden">↓</span>
                <span className="hidden lg:inline">→</span>
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
      <p className="text-[0.78rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet">
        {label}
      </p>
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
                  style={isLast ? { color: "var(--sage-deep, #7a8556)" } : undefined}
                >
                  {displayValue}
                </p>
              </div>
              <div className="h-2.5 w-full bg-line/45">
                <div
                  className="h-full transition-[width] duration-500 ease-out motion-reduce:transition-none"
                  style={{
                    width: `${Math.max(8, (item.value / max) * 100)}%`,
                    background: isLast ? "var(--sage)" : "rgba(72, 38, 29, 0.34)",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-5 max-w-3xl text-base leading-7 text-muted">
        {caption}
      </p>
    </section>
  );
}

function QuoteList({ items }: { items: string[] }) {
  return (
    <section>
      <div className="grid gap-7 sm:grid-cols-3 sm:gap-10">
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
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[max-content_1fr] lg:items-baseline lg:gap-7">
        <p className="whitespace-nowrap text-[0.78rem] font-medium uppercase leading-5 tracking-[0.12em] text-quiet">
          Evidence + reach
        </p>
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
      {item.href ? <span aria-hidden="true">↗</span> : null}
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
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="focus-ring inline-flex items-center gap-1.5 whitespace-nowrap text-[0.96rem] leading-7 text-muted transition hover:text-foreground motion-reduce:transition-none xl:text-base"
    >
      {content}
    </a>
  );
}

function SkillsImpactSummary({
  skills,
  impacts,
}: {
  skills: string[];
  impacts: string[];
}) {
  return (
    <section>
      <div className="grid gap-9 lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-12">
        <NumberedColumn heading="Skills used" items={skills} />
        <div
          aria-hidden="true"
          className="hidden self-stretch text-quiet/55 lg:flex lg:items-center"
        >
          →
        </div>
        <NumberedColumn heading="Impact created" items={impacts} />
      </div>
    </section>
  );
}

function NumberedColumn({
  heading,
  items,
}: {
  heading: string;
  items: string[];
}) {
  return (
    <div>
      <p className="text-[0.78rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet">
        {heading}
      </p>
      <ol className="mt-4 space-y-3">
        {items.map((item, index) => (
          <li
            key={item}
            className="grid grid-cols-[1.75rem_1fr] gap-3 border-t border-line pt-3 text-base leading-7 text-foreground"
          >
            <span className="text-sm leading-7 text-quiet">{index + 1}.</span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function LiveSitePreview({ href }: { href: string }) {
  const previewWidth = 1280;
  const previewHeight = 920;
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
    <section className="border-t border-line pt-7">
      <h3 className="font-display text-[1.8rem] font-medium leading-tight text-foreground">
        Live site preview
      </h3>
      <div
        ref={containerRef}
        className="mt-5 w-full overflow-hidden bg-background"
        style={{ height: `${Math.round(previewHeight * scale)}px` }}
      >
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
      {previewBlocked ? (
        <p className="mt-3 text-base leading-7 text-muted">
          Preview blocked by the live site.{" "}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring font-medium text-foreground transition hover:opacity-70 motion-reduce:transition-none"
          >
            Open wellnessthroughclay.com
          </a>
        </p>
      ) : null}
    </section>
  );
}
