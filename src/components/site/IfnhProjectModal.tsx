"use client";

import { type KeyboardEvent, useEffect, useRef } from "react";
import type { IfnhPreviewData } from "@/lib/ifnh-preview-data";

type IfnhProjectModalProps = {
  data: IfnhPreviewData;
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

function KpiBand({ data }: { data: IfnhPreviewData }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-x-10 gap-y-10 border-y border-line py-10 sm:grid-cols-2 lg:grid-cols-5">
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
      <p className="text-xs leading-6 text-quiet">{data.kpiFootnote}</p>
    </div>
  );
}

function ConnectionFunnel({ data }: { data: IfnhPreviewData }) {
  const steps = data.funnel.steps;
  const maxValue = 100;

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        {steps.map((step, idx) => {
          const width = (step.value / maxValue) * 100;
          const isLast = idx === steps.length - 1;
          const isMid = idx === 1;
          return (
            <div key={step.label}>
              <div
                className="relative flex h-20 items-center px-6 sm:h-24 sm:px-8"
                style={{
                  width: `${Math.max(width, 22)}%`,
                  marginLeft: `${(100 - Math.max(width, 22)) / 2}%`,
                  background: isLast
                    ? "var(--accent)"
                    : isMid
                      ? "rgba(72,38,29,0.32)"
                      : "rgba(72,38,29,0.18)",
                }}
              >
                <div className="flex w-full items-baseline justify-between gap-4">
                  <p className="text-sm font-medium leading-5 text-foreground sm:text-base">
                    {step.label}
                  </p>
                  <p className="font-display text-3xl font-medium leading-none text-foreground sm:text-4xl">
                    {step.value}%
                  </p>
                </div>
              </div>
              <p className="mt-2 px-1 text-center text-xs leading-5 text-quiet">
                {step.sublabel}
              </p>
              {!isLast ? (
                <p
                  aria-hidden="true"
                  className="mt-2 text-center text-base text-quiet"
                >
                  ↓
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      <p className="mx-auto max-w-3xl text-center font-display text-2xl font-medium leading-[1.25] text-foreground sm:text-[1.75rem]">
        {data.funnel.insight}
      </p>
    </div>
  );
}

function CapacityBar({ data }: { data: IfnhPreviewData }) {
  const { usable, demand, insight, assumptions } = data.capacity;
  const max = Math.max(usable, demand);

  return (
    <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-[8rem_1fr_4rem] items-center gap-4">
            <p className="text-[0.7rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
              Usable capacity
            </p>
            <div className="h-5 bg-foreground/[0.05]">
              <div
                className="h-full"
                style={{
                  width: `${(usable / max) * 100}%`,
                  background: "rgba(72,38,29,0.3)",
                }}
              />
            </div>
            <p className="text-right font-display text-2xl font-medium leading-none text-foreground">
              {usable}
            </p>
          </div>
          <div className="grid grid-cols-[8rem_1fr_4rem] items-center gap-4">
            <p className="text-[0.7rem] font-medium uppercase leading-5 tracking-[0.18em] text-foreground">
              Peak demand
            </p>
            <div className="h-5 bg-foreground/[0.05]">
              <div
                className="h-full"
                style={{
                  width: `${(demand / max) * 100}%`,
                  background: "var(--accent)",
                }}
              />
            </div>
            <p className="text-right font-display text-2xl font-medium leading-none text-foreground">
              {demand}
            </p>
          </div>
        </div>
        <p className="font-display text-xl font-medium leading-[1.3] text-foreground sm:text-2xl">
          {insight}
        </p>
      </div>

      <div className="border-t border-line pt-5">
        <SectionLabel>Model assumptions</SectionLabel>
        <ul className="mt-4 space-y-2 text-sm leading-6 text-muted">
          {assumptions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PriorityIcon({ index }: { index: number }) {
  const icons = [
    // seating
    <svg key="0" viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <rect x="4" y="10" width="16" height="6" fill="currentColor" fillOpacity="0.4" />
      <rect x="4" y="16" width="3" height="5" fill="currentColor" fillOpacity="0.6" />
      <rect x="17" y="16" width="3" height="5" fill="currentColor" fillOpacity="0.6" />
      <rect x="6" y="4" width="12" height="6" fill="currentColor" fillOpacity="0.25" />
    </svg>,
    // interaction
    <svg key="1" viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <circle cx="8" cy="9" r="3" fill="currentColor" fillOpacity="0.5" />
      <circle cx="16" cy="9" r="3" fill="currentColor" fillOpacity="0.5" />
      <path d="M3 20c1-3 4-5 5-5M16 15c1 0 4 2 5 5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>,
    // visibility
    <svg key="2" viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.6" />
      <path d="M2 12c2-4 6-6 10-6s8 2 10 6c-2 4-6 6-10 6S4 16 2 12z" stroke="currentColor" strokeWidth="1.4" fill="none" />
    </svg>,
  ];
  return icons[index] ?? icons[0];
}

function Recommendations({ data }: { data: IfnhPreviewData }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {data.recommendations.map((rec, index) => (
        <div
          key={rec.title}
          className="flex flex-col gap-5 border border-line bg-background p-6"
        >
          <div className="flex items-center gap-3 text-foreground">
            <PriorityIcon index={index} />
            <span className="text-[0.7rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
              0{index + 1}
            </span>
          </div>
          <p className="font-display text-2xl font-medium leading-tight text-foreground">
            {rec.title}
          </p>
          <p className="text-sm leading-6 text-muted">{rec.signal}</p>
          <div className="mt-auto flex items-center gap-4 border-t border-line pt-4 text-[0.65rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet">
            <span>Priority · {rec.priority}</span>
            <span>Effort · {rec.effort}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Supports({ data }: { data: IfnhPreviewData }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

export function IfnhProjectModal({
  data,
  isOpen,
  onClose,
}: IfnhProjectModalProps) {
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
        aria-labelledby="ifnh-modal-title"
        onKeyDown={handleKeyDown}
        className="modal-panel-in mx-auto h-screen w-full overflow-y-auto bg-background sm:h-[calc(100vh-2.5rem)] sm:max-w-[88rem] sm:border sm:border-line"
      >
        <div className="mx-auto w-full max-w-7xl px-6 pb-20 pt-5 sm:px-10 lg:px-14">
          <div className="sticky top-0 z-10 -mx-6 flex justify-end bg-background/95 px-6 py-4 sm:-mx-10 sm:px-10 lg:-mx-14 lg:px-14">
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close IFNH InsightOS project brief"
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
                id="ifnh-modal-title"
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
              <SectionLabel>Survey snapshot</SectionLabel>
              <div className="mt-6">
                <KpiBand data={data} />
              </div>
            </section>

            <section className="border-t border-line py-14 sm:py-20">
              <div className="mb-10 max-w-3xl">
                <SectionLabel>Connection funnel</SectionLabel>
                <SectionTitle>Presence vs. interaction</SectionTitle>
              </div>
              <ConnectionFunnel data={data} />
            </section>

            <section className="border-t border-line py-14 sm:py-20">
              <div className="mb-10 max-w-3xl">
                <SectionLabel>Capacity pressure</SectionLabel>
                <SectionTitle>Demand exceeds usable seating</SectionTitle>
              </div>
              <CapacityBar data={data} />
            </section>

            <section className="border-t border-line py-14 sm:py-20">
              <div className="mb-10 max-w-3xl">
                <SectionLabel>Priorities</SectionLabel>
                <SectionTitle>Three actions</SectionTitle>
              </div>
              <Recommendations data={data} />
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
