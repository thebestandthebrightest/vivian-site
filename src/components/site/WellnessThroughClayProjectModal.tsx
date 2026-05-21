"use client";

import { type KeyboardEvent, useEffect, useRef } from "react";
import type { WellnessThroughClayPreviewData } from "@/lib/wellness-through-clay-preview-data";

type WellnessThroughClayProjectModalProps = {
  data: WellnessThroughClayPreviewData;
  isOpen: boolean;
  onClose: () => void;
};

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-[0.7rem] font-medium uppercase leading-5 tracking-[0.22em] text-quiet">
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: string }) {
  return (
    <h3 className="mt-3 font-display text-[2.2rem] font-medium leading-[1] text-foreground sm:text-[2.6rem]">
      {children}
    </h3>
  );
}

function KpiBand({ data }: { data: WellnessThroughClayPreviewData }) {
  return (
    <div className="grid gap-x-10 gap-y-8 border-y border-line py-10 sm:grid-cols-2 lg:grid-cols-5">
      {data.kpis.map((kpi) => (
        <div key={kpi.label}>
          <p className="font-display text-5xl font-medium leading-none text-foreground lg:text-6xl">
            {kpi.value}
          </p>
          <p className="mt-3 text-[0.7rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
            {kpi.label}
          </p>
        </div>
      ))}
    </div>
  );
}

function CumulativeGrowthChart({
  data,
}: {
  data: WellnessThroughClayPreviewData;
}) {
  const points = data.cumulativeGrowth.points;
  const max = Math.max(...points.map((p) => p.value)) * 1.1;

  const width = 760;
  const height = 320;
  const padL = 64;
  const padR = 32;
  const padT = 32;
  const padB = 64;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;

  const x = (i: number) => padL + (i / (points.length - 1)) * innerW;
  const y = (v: number) => padT + innerH - (v / max) * innerH;

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(p.value)}`)
    .join(" ");

  const areaPath =
    `M ${x(0)} ${padT + innerH} ` +
    points.map((p, i) => `L ${x(i)} ${y(p.value)}`).join(" ") +
    ` L ${x(points.length - 1)} ${padT + innerH} Z`;

  const yTicks = [0, max / 2, max].map((v) => Math.round(v / 10) * 10);

  return (
    <div className="space-y-6">
      <SectionLabel>{data.cumulativeGrowth.label}</SectionLabel>
      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full min-w-[34rem]"
          role="img"
          aria-label="Cumulative attendees by cycle"
        >
          {yTicks.map((tick) => {
            const yy = y(tick);
            return (
              <g key={tick}>
                <line
                  x1={padL}
                  x2={width - padR}
                  y1={yy}
                  y2={yy}
                  stroke="currentColor"
                  strokeOpacity="0.1"
                  strokeWidth="1"
                />
                <text
                  x={padL - 12}
                  y={yy + 4}
                  textAnchor="end"
                  fontSize="12"
                  fill="currentColor"
                  fillOpacity="0.55"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          <path d={areaPath} fill="var(--accent-soft)" />
          <path
            d={linePath}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {points.map((p, i) => (
            <g key={p.cycle}>
              <circle
                cx={x(i)}
                cy={y(p.value)}
                r="6"
                fill="var(--accent)"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <text
                x={x(i)}
                y={y(p.value) - 16}
                textAnchor="middle"
                fontSize="16"
                fontWeight="500"
                fill="currentColor"
              >
                {p.value}
              </text>
              <text
                x={x(i)}
                y={height - padB + 26}
                textAnchor="middle"
                fontSize="13"
                fill="currentColor"
                fillOpacity="0.7"
              >
                {p.cycle}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <p className="max-w-3xl font-display text-2xl font-medium leading-[1.25] text-foreground sm:text-[1.75rem]">
        250+ cumulative attendees across three cycles.
      </p>
    </div>
  );
}

function StabilityCompare({
  data,
}: {
  data: WellnessThroughClayPreviewData;
}) {
  const comparisons = data.stability.comparisons;
  const max = Math.max(...comparisons.map((c) => c.value));

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
      <div className="space-y-5">
        {comparisons.map((c, idx) => (
          <div key={c.label} className="space-y-2">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-[0.7rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
                {c.label}
              </p>
              <p className="font-display text-3xl font-medium leading-none text-foreground">
                {c.value}
              </p>
            </div>
            <div className="h-4 bg-foreground/[0.05]">
              <div
                className="h-full"
                style={{
                  width: `${(c.value / max) * 100}%`,
                  background: idx === 0 ? "rgba(72,38,29,0.3)" : "var(--accent)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="max-w-xl font-display text-2xl font-medium leading-[1.25] text-foreground sm:text-[1.75rem]">
        {data.stability.insight}
      </p>
    </div>
  );
}

function PressStrip({ data }: { data: WellnessThroughClayPreviewData }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {data.projectLinks.map((link) => (
        <div
          key={link.label}
          className="flex items-center justify-between border border-line bg-foreground/[0.02] px-5 py-4"
        >
          <span className="text-[0.7rem] font-medium uppercase leading-5 tracking-[0.18em] text-foreground">
            {link.label}
          </span>
          {link.href ? (
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-[0.65rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet hover:text-foreground"
            >
              Open
            </a>
          ) : (
            <span className="text-[0.65rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet">
              Featured
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function Supports({ data }: { data: WellnessThroughClayPreviewData }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {data.supports.map((item) => (
        <p
          key={item}
          className="border-t border-line pt-4 font-display text-2xl font-medium leading-tight text-foreground"
        >
          {item}
        </p>
      ))}
    </div>
  );
}

export function WellnessThroughClayProjectModal({
  data,
  isOpen,
  onClose,
}: WellnessThroughClayProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== "Tab" || !dialogRef.current) return;

    const focusable = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-foreground/18 p-0 text-foreground sm:p-5">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="wtc-modal-title"
        onKeyDown={handleKeyDown}
        className="modal-panel-in mx-auto h-screen w-full overflow-y-auto bg-background sm:h-[calc(100vh-2.5rem)] sm:max-w-[88rem] sm:border sm:border-line"
      >
        <div className="mx-auto w-full max-w-7xl px-6 pb-20 pt-5 sm:px-10 lg:px-14">
          <div className="sticky top-0 z-10 -mx-6 flex justify-end bg-background/95 px-6 py-4 sm:-mx-10 sm:px-10 lg:-mx-14 lg:px-14">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="focus-ring text-xs font-medium uppercase leading-5 tracking-[0.2em] text-quiet transition hover:text-foreground motion-reduce:transition-none"
            >
              Close
            </button>
          </div>

          <header className="grid gap-10 pb-14 pt-10 lg:grid-cols-[1fr_0.85fr] lg:items-end lg:pb-16 lg:pt-14">
            <div>
              <SectionLabel>{data.subtitle}</SectionLabel>
              <h2
                id="wtc-modal-title"
                className="mt-4 font-display text-[clamp(3.4rem,9vw,6.5rem)] font-medium leading-[0.92] text-foreground"
              >
                {data.title}
              </h2>
            </div>
            <div className="space-y-4">
              <p className="max-w-xl font-display text-[1.55rem] font-medium leading-[1.2] text-foreground sm:text-[1.85rem]">
                {data.summary}
              </p>
              <p className="max-w-xl text-sm leading-7 text-muted">
                {data.context}
              </p>
            </div>
          </header>

          <main>
            <section className="pb-10">
              <SectionLabel>Program snapshot</SectionLabel>
              <div className="mt-6">
                <KpiBand data={data} />
              </div>
            </section>

            <section className="border-t border-line py-14 sm:py-20">
              <div className="mb-10 max-w-3xl">
                <SectionLabel>Cumulative growth</SectionLabel>
                <SectionTitle>Scaled across three cycles</SectionTitle>
              </div>
              <CumulativeGrowthChart data={data} />
            </section>

            <section className="border-t border-line py-14 sm:py-20">
              <div className="mb-10 max-w-3xl">
                <SectionLabel>Participation stability</SectionLabel>
                <SectionTitle>Repeatable engagement</SectionTitle>
              </div>
              <StabilityCompare data={data} />
            </section>

            <section className="border-t border-line py-14 sm:py-18">
              <div className="mb-10 max-w-3xl">
                <SectionLabel>Press + presence</SectionLabel>
                <SectionTitle>Where the program shows up</SectionTitle>
              </div>
              <PressStrip data={data} />
            </section>

            <section className="border-t border-line py-14 sm:py-18">
              <div className="mb-10 max-w-3xl">
                <SectionLabel>Strategic use</SectionLabel>
                <SectionTitle>Where this gets applied</SectionTitle>
              </div>
              <Supports data={data} />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
