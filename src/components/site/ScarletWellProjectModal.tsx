"use client";

import { type KeyboardEvent, useEffect, useRef } from "react";
import type { ScarletWellBriefData } from "@/lib/scarletwell-preview-data";

type ScarletWellProjectModalProps = {
  data: ScarletWellBriefData;
  isOpen: boolean;
  onClose: () => void;
};

function formatNumber(value: number) {
  return Math.round(value).toLocaleString();
}

function formatCurrencyK(value: number) {
  return `$${(value / 1000).toFixed(1)}K`;
}

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

function KpiBand({ data }: { data: ScarletWellBriefData }) {
  return (
    <div className="grid gap-x-10 gap-y-8 border-y border-line py-10 sm:grid-cols-2 lg:grid-cols-4">
      {data.portfolioKpis.map((kpi) => (
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

function ComparisonBar({
  label,
  cycleLabel,
  value,
  display,
  ratio,
  emphasized = false,
}: {
  label: string;
  cycleLabel: string;
  value: number;
  display: string;
  ratio: number;
  emphasized?: boolean;
}) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr_auto] items-center gap-4">
      <p className="text-[0.7rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet">
        {cycleLabel}
      </p>
      <div className="relative h-4 bg-foreground/[0.05]">
        <div
          className="h-full transition-all duration-700"
          style={{
            width: `${ratio * 100}%`,
            background: emphasized ? "var(--accent)" : "rgba(72,38,29,0.32)",
          }}
          aria-hidden="true"
        />
      </div>
      <p className="text-sm leading-5 text-foreground">
        <span className="sr-only">{label}: </span>
        {display}
        <span className="ml-2 text-quiet">({value.toLocaleString()})</span>
      </p>
    </div>
  );
}

function ComparisonGroup({
  label,
  previous,
  current,
  previousText,
  currentText,
}: {
  label: string;
  previous: number;
  current: number;
  previousText: string;
  currentText: string;
}) {
  const max = Math.max(previous, current);
  return (
    <div className="grid gap-5 py-7 sm:grid-cols-[10rem_1fr] sm:items-center">
      <p className="font-display text-2xl font-medium leading-none text-foreground">
        {label}
      </p>
      <div className="space-y-3">
        <ComparisonBar
          label={label}
          cycleLabel="2024-25"
          value={previous}
          display={previousText}
          ratio={previous / max}
        />
        <ComparisonBar
          label={label}
          cycleLabel="2025-26"
          value={current}
          display={currentText}
          ratio={current / max}
          emphasized
        />
      </div>
    </div>
  );
}

function EfficiencyHero({ data }: { data: ScarletWellBriefData }) {
  const [previous, current] = data.cycles;

  return (
    <div className="space-y-10">
      <div className="border-y border-line/80">
        <ComparisonGroup
          label="Participants"
          previous={previous.participants}
          current={current.participants}
          previousText={formatNumber(previous.participants)}
          currentText={formatNumber(current.participants)}
        />
        <div className="border-t border-line/60" />
        <ComparisonGroup
          label="Budget"
          previous={previous.budget}
          current={current.budget}
          previousText={formatCurrencyK(previous.budget)}
          currentText={formatCurrencyK(current.budget)}
        />
      </div>

      <div className="grid gap-8 border border-line bg-foreground/[0.02] p-8 sm:grid-cols-[1fr_auto_1fr] sm:items-end sm:p-10">
        <div>
          <SectionLabel>Cost / participant · 2024-25</SectionLabel>
          <p className="mt-3 font-display text-5xl font-medium leading-none text-foreground sm:text-6xl">
            ${previous.costPerParticipant.toFixed(2)}
          </p>
        </div>
        <div className="hidden text-quiet sm:block">
          <svg viewBox="0 0 60 24" className="h-6 w-16" aria-hidden="true">
            <line
              x1="2"
              x2="50"
              y1="12"
              y2="12"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <polyline
              points="44,4 56,12 44,20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="sm:text-right">
          <SectionLabel>Cost / participant · 2025-26</SectionLabel>
          <p
            className="mt-3 font-display text-6xl font-medium leading-none sm:text-7xl"
            style={{ color: "var(--foreground)" }}
          >
            <span
              className="inline-block bg-accent/0 px-1"
              style={{ background: "var(--accent-soft)" }}
            >
              ${current.costPerParticipant.toFixed(2)}
            </span>
          </p>
          <p className="mt-4 text-[0.7rem] font-medium uppercase leading-5 tracking-[0.18em] text-foreground">
            −51% cost / participant
          </p>
        </div>
      </div>
    </div>
  );
}

function EfficiencySignals({ data }: { data: ScarletWellBriefData }) {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {data.efficiencyDeltas.map((item) => {
        const isUp = item.direction === "up";
        return (
          <div
            key={item.label}
            className="border border-line bg-background p-6"
          >
            <SectionLabel>{item.label}</SectionLabel>
            <div className="mt-4 flex items-baseline gap-3">
              <p
                className="font-display text-5xl font-medium leading-none"
                style={{
                  color: isUp ? "var(--foreground)" : "var(--foreground)",
                }}
              >
                {item.delta}
              </p>
              <span
                aria-hidden="true"
                className="text-base text-quiet"
              >
                {isUp ? "↑" : "↓"}
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted">{item.detail}</p>
          </div>
        );
      })}
    </div>
  );
}

function StrategicUses({ data }: { data: ScarletWellBriefData }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {data.strategicUses.map((item) => (
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

export function ScarletWellProjectModal({
  data,
  isOpen,
  onClose,
}: ScarletWellProjectModalProps) {
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
        aria-labelledby="scarletwell-modal-title"
        onKeyDown={handleKeyDown}
        className="modal-panel-in mx-auto h-screen w-full overflow-y-auto bg-background sm:h-[calc(100vh-2.5rem)] sm:max-w-[88rem] sm:border sm:border-line"
      >
        <div className="mx-auto w-full max-w-7xl px-6 pb-20 pt-5 sm:px-10 lg:px-14">
          <div className="sticky top-0 z-10 -mx-6 flex justify-end bg-background/95 px-6 py-4 sm:-mx-10 sm:px-10 lg:-mx-14 lg:px-14">
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close ScarletWell Studio project brief"
              onClick={onClose}
              className="focus-ring text-xs font-medium uppercase leading-5 tracking-[0.18em] text-muted transition hover:text-foreground motion-reduce:transition-none"
            >
              Close
            </button>
          </div>

          <header className="grid gap-10 pb-14 pt-10 lg:grid-cols-[1fr_0.85fr] lg:items-end lg:pb-16 lg:pt-14">
            <div>
              <SectionLabel>{data.subtitle}</SectionLabel>
              <h2
                id="scarletwell-modal-title"
                className="mt-4 font-display text-[clamp(3.4rem,9vw,6.5rem)] font-medium leading-[0.92] text-foreground"
              >
                {data.title}
              </h2>
            </div>
            <p className="max-w-xl font-display text-[1.55rem] font-medium leading-[1.2] text-foreground sm:text-[1.85rem]">
              {data.summary}
            </p>
          </header>

          <main>
            <section className="pb-10">
              <SectionLabel>Portfolio snapshot</SectionLabel>
              <div className="mt-6">
                <KpiBand data={data} />
              </div>
            </section>

            <section className="border-t border-line py-14 sm:py-20">
              <div className="mb-10 max-w-3xl">
                <SectionLabel>Operational impact</SectionLabel>
                <SectionTitle>Higher reach, lower spend</SectionTitle>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-muted">
                  Comparing 2024-25 against 2025-26 across the same portfolio:
                  participation up, documented budget down, cost per participant
                  cut roughly in half.
                </p>
              </div>
              <EfficiencyHero data={data} />
            </section>

            <section className="border-t border-line py-14 sm:py-20">
              <div className="mb-10 max-w-3xl">
                <SectionLabel>Efficiency signals</SectionLabel>
                <SectionTitle>Year-over-year deltas</SectionTitle>
              </div>
              <EfficiencySignals data={data} />
              <p className="mt-10 max-w-3xl font-display text-2xl font-medium leading-[1.25] text-foreground sm:text-[1.75rem]">
                {data.insight}
              </p>
            </section>

            <section className="border-t border-line py-14 sm:py-18">
              <div className="mb-10 max-w-3xl">
                <SectionLabel>Strategic use</SectionLabel>
                <SectionTitle>Where this gets applied</SectionTitle>
              </div>
              <StrategicUses data={data} />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
