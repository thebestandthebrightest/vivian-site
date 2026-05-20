"use client";

import { type KeyboardEvent, useEffect, useRef } from "react";
import type { WellnessThroughClayPreviewData } from "@/lib/wellness-through-clay-preview-data";

type WellnessThroughClayProjectModalProps = {
  data: WellnessThroughClayPreviewData;
  isOpen: boolean;
  onClose: () => void;
};

function SectionTitle({ children }: { children: string }) {
  return (
    <h3 className="font-display text-[2.4rem] font-medium leading-[1] text-foreground sm:text-5xl">
      {children}
    </h3>
  );
}

function KpiBand({ data }: { data: WellnessThroughClayPreviewData }) {
  return (
    <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
      {data.kpis.map((kpi) => (
        <div key={kpi.label}>
          <p className="font-display text-5xl font-medium leading-none text-foreground lg:text-6xl">
            {kpi.value}
          </p>
          <p className="mt-3 max-w-40 text-sm leading-6 text-muted">
            {kpi.label}
          </p>
        </div>
      ))}
    </div>
  );
}

function GrowthTimeline({ data }: { data: WellnessThroughClayPreviewData }) {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {data.timeline.map((item, index) => (
        <div key={item.cycle} className="border-t border-line pt-5">
          <p className="text-xs font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
            Step {index + 1}
          </p>
          <h4 className="mt-4 font-display text-3xl font-medium leading-tight text-foreground">
            {item.cycle}
          </h4>
          <p className="mt-4 font-display text-2xl font-medium leading-tight text-muted">
            {item.metric}
          </p>
        </div>
      ))}
    </div>
  );
}

function AttendanceSummary({ data }: { data: WellnessThroughClayPreviewData }) {
  const { total, sessions, averagePerSession, comparisons } =
    data.attendanceSummary;
  const max = Math.max(...comparisons.map((c) => c.value));

  return (
    <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
      <div className="grid gap-10 sm:grid-cols-3 lg:grid-cols-1">
        <div>
          <p className="font-display text-6xl font-medium leading-none text-foreground">
            {total}
          </p>
          <p className="mt-3 text-sm leading-6 text-muted">
            total 2025-2026 attendance
          </p>
        </div>
        <div>
          <p className="font-display text-5xl font-medium leading-none text-foreground">
            {averagePerSession}
          </p>
          <p className="mt-3 text-sm leading-6 text-muted">average/session</p>
        </div>
        <div>
          <p className="font-display text-5xl font-medium leading-none text-foreground">
            {sessions}
          </p>
          <p className="mt-3 text-sm leading-6 text-muted">sessions</p>
        </div>
      </div>

      <div className="space-y-6">
        {comparisons.map((c) => (
          <div key={c.label} className="grid gap-3">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-sm leading-6 text-muted">{c.label}</p>
              <p className="font-display text-2xl font-medium leading-none text-foreground">
                {c.value}
                {c.suffix}
              </p>
            </div>
            <div className="h-3 bg-foreground/[0.06]">
              <div
                className="h-full bg-foreground/45"
                style={{ width: `${(c.value / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GrowthOutlookChart({
  data,
}: {
  data: WellnessThroughClayPreviewData;
}) {
  const { sessions, scenarios } = data.projection;
  const allPoints = scenarios.flatMap((s) => s.points);
  const maxAttendance = Math.max(...allPoints) * 1.08;
  const maxSessions = sessions[sessions.length - 1];
  const minSessions = sessions[0];

  const width = 720;
  const height = 340;
  const padL = 64;
  const padR = 24;
  const padT = 28;
  const padB = 60;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;

  const x = (s: number) =>
    padL + ((s - minSessions) / (maxSessions - minSessions)) * innerW;
  const y = (a: number) => padT + innerH - (a / maxAttendance) * innerH;

  const yTicks = [0, 50, 100, 150, 200].filter((t) => t <= maxAttendance);

  return (
    <div className="space-y-6">
      <p className="text-sm font-medium leading-6 text-muted">
        {data.projection.label}
      </p>
      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full min-w-[34rem]"
          role="img"
          aria-label="Projected attendance by session count"
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
                  strokeOpacity="0.12"
                  strokeWidth="1"
                />
                <text
                  x={padL - 12}
                  y={yy + 4}
                  textAnchor="end"
                  fontSize="13"
                  fill="currentColor"
                  fillOpacity="0.55"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {scenarios.map((scenario, idx) => {
            const opacity = idx === 0 ? 0.9 : 0.4;
            const dash = idx === 0 ? undefined : "6 6";
            const path = scenario.points
              .map(
                (a, i) => `${i === 0 ? "M" : "L"} ${x(sessions[i])} ${y(a)}`,
              )
              .join(" ");
            return (
              <g key={scenario.label}>
                <path
                  d={path}
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity={opacity}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={dash}
                />
                {scenario.points.map((a, i) => (
                  <g key={`${scenario.label}-${sessions[i]}`}>
                    <circle
                      cx={x(sessions[i])}
                      cy={y(a)}
                      r="4.5"
                      fill="currentColor"
                      fillOpacity={opacity}
                    />
                    <text
                      x={x(sessions[i])}
                      y={y(a) - 12}
                      textAnchor="middle"
                      fontSize="13"
                      fontWeight="500"
                      fill="currentColor"
                      fillOpacity={idx === 0 ? 1 : 0.7}
                    >
                      {a}
                    </text>
                  </g>
                ))}
              </g>
            );
          })}

          {sessions.map((s) => (
            <text
              key={s}
              x={x(s)}
              y={height - padB + 24}
              textAnchor="middle"
              fontSize="13"
              fill="currentColor"
              fillOpacity="0.65"
            >
              {s} sessions
            </text>
          ))}

          <text
            x={padL}
            y={height - 8}
            fontSize="12"
            fill="currentColor"
            fillOpacity="0.5"
          >
            Sessions
          </text>
          <text
            x={padL - 48}
            y={padT + 6}
            fontSize="12"
            fill="currentColor"
            fillOpacity="0.5"
          >
            Attendance
          </text>
        </svg>
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm leading-6 text-muted">
        {scenarios.map((scenario, idx) => (
          <div key={scenario.label} className="flex items-center gap-2">
            <span
              className="inline-block h-[2px] w-7"
              style={{
                background: "currentColor",
                opacity: idx === 0 ? 0.9 : 0.4,
                borderTop: idx === 1 ? "2px dashed currentColor" : undefined,
              }}
              aria-hidden="true"
            />
            <span>{scenario.label}</span>
          </div>
        ))}
      </div>
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

  const hasLinks = data.projectLinks.some((link) => link.href);

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

          <header className="grid gap-12 pb-20 pt-12 lg:grid-cols-[1fr_0.85fr] lg:items-end lg:pb-24 lg:pt-16">
            <div>
              <h2
                id="wtc-modal-title"
                className="font-display text-[clamp(3.6rem,9.5vw,7rem)] font-medium leading-[0.92] text-foreground"
              >
                {data.title}
              </h2>
              <p className="mt-6 text-sm font-medium leading-6 text-muted">
                {data.subtitle}
              </p>
            </div>
            <div className="space-y-5">
              <p className="max-w-xl font-display text-[1.7rem] font-medium leading-[1.2] text-foreground sm:text-[2rem]">
                {data.summary}
              </p>
              <p className="max-w-xl text-sm leading-7 text-muted">
                {data.context}
              </p>
            </div>
          </header>

          <main>
            <section className="py-14 sm:py-20">
              <KpiBand data={data} />
            </section>

            <section className="border-t border-line py-16 sm:py-24">
              <div className="mb-14 max-w-3xl">
                <SectionTitle>Growth timeline</SectionTitle>
              </div>
              <GrowthTimeline data={data} />
            </section>

            <section className="border-t border-line py-16 sm:py-24">
              <div className="mb-14 max-w-3xl">
                <SectionTitle>Attendance</SectionTitle>
              </div>
              <AttendanceSummary data={data} />
            </section>

            <section className="border-t border-line py-16 sm:py-24">
              <div className="mb-14 max-w-3xl">
                <SectionTitle>Growth outlook</SectionTitle>
              </div>
              <GrowthOutlookChart data={data} />
            </section>

            {hasLinks ? (
              <section className="border-t border-line py-16 sm:py-20">
                <div className="mb-10 max-w-3xl">
                  <SectionTitle>Press + links</SectionTitle>
                </div>
                <div className="border-t border-line">
                  {data.projectLinks
                    .filter(
                      (link): link is { label: string; href: string } =>
                        link.href !== null,
                    )
                    .map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="focus-ring group flex items-center justify-between gap-6 border-b border-line py-5 text-sm leading-6 transition duration-300 hover:text-foreground motion-reduce:transition-none"
                      >
                        <span className="font-medium text-foreground">
                          {link.label}
                        </span>
                        <span className="text-quiet group-hover:text-foreground">
                          Open
                        </span>
                      </a>
                    ))}
                </div>
              </section>
            ) : null}

            <section className="border-t border-line py-16 sm:py-20">
              <div className="mb-12 max-w-3xl">
                <SectionTitle>What this shows</SectionTitle>
              </div>
              <Supports data={data} />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
