"use client";

import { type KeyboardEvent, useEffect, useRef } from "react";
import type { IfnhPreviewData } from "@/lib/ifnh-preview-data";

type IfnhProjectModalProps = {
  data: IfnhPreviewData;
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

function KpiBand({ data }: { data: IfnhPreviewData }) {
  return (
    <div className="space-y-8">
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
      <p className="text-xs leading-6 text-quiet">{data.kpiFootnote}</p>
    </div>
  );
}

function ConnectionGap({ data }: { data: IfnhPreviewData }) {
  const { headline, insight, steps } = data.connectionGap;
  const max = Math.max(...steps.map((s) => s.value));

  return (
    <div className="space-y-12">
      <p className="max-w-3xl font-display text-[1.7rem] font-medium leading-[1.2] text-foreground sm:text-[2rem]">
        {headline}
      </p>

      <div className="border-y border-line/80">
        {steps.map((step, index) => (
          <div
            key={step.label}
            className={`grid gap-5 py-7 sm:grid-cols-[12rem_1fr] sm:items-center ${
              index > 0 ? "border-t border-line/60" : ""
            }`}
          >
            <p className="text-base font-medium leading-6 text-foreground">
              {step.label}
            </p>
            <div className="grid grid-cols-[1fr_auto] items-center gap-4">
              <div className="h-3 bg-foreground/[0.06]">
                <div
                  className="h-full bg-foreground/45"
                  style={{ width: `${(step.value / max) * 100}%` }}
                />
              </div>
              <p className="font-display text-2xl font-medium leading-none text-foreground">
                {step.value}%
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="max-w-3xl text-sm leading-7 text-muted">{insight}</p>
    </div>
  );
}

function CapacityModel({ data }: { data: IfnhPreviewData }) {
  const { layouts, insight, assumptions } = data.capacity;
  const max = Math.max(
    ...layouts.flatMap((l) => [l.usable, l.demand]),
  );

  return (
    <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
      <div className="space-y-10">
        {layouts.map((layout) => {
          const overCapacity = layout.demand > layout.usable;
          return (
            <div key={layout.label} className="space-y-5">
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-display text-2xl font-medium leading-tight text-foreground">
                  {layout.label}
                </p>
                <p className="text-xs font-medium uppercase leading-5 tracking-[0.18em] text-muted">
                  {layout.status}
                </p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-[7rem_1fr_auto] items-center gap-4">
                  <p className="text-sm leading-5 text-quiet">Usable</p>
                  <div className="h-3 bg-foreground/[0.06]">
                    <div
                      className="h-full bg-foreground/30"
                      style={{ width: `${(layout.usable / max) * 100}%` }}
                    />
                  </div>
                  <p className="text-sm leading-5 text-muted">
                    {layout.usable}
                  </p>
                </div>
                <div className="grid grid-cols-[7rem_1fr_auto] items-center gap-4">
                  <p className="text-sm leading-5 text-quiet">Peak demand</p>
                  <div className="h-3 bg-foreground/[0.06]">
                    <div
                      className={`h-full ${
                        overCapacity ? "bg-foreground/65" : "bg-foreground/50"
                      }`}
                      style={{ width: `${(layout.demand / max) * 100}%` }}
                    />
                  </div>
                  <p className="text-sm leading-5 text-foreground">
                    {layout.demand}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <p className="max-w-2xl text-sm leading-7 text-muted">{insight}</p>
      </div>

      <div className="border-t border-line pt-6">
        <p className="text-xs font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
          Model assumptions
        </p>
        <ul className="mt-5 space-y-3 text-sm leading-6 text-muted">
          {assumptions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function RecommendationPriorities({ data }: { data: IfnhPreviewData }) {
  return (
    <div className="border-t border-line">
      {data.recommendations.map((rec, index) => (
        <div
          key={rec.title}
          className="grid gap-4 border-b border-line py-7 sm:grid-cols-[3rem_1fr_auto] sm:items-start sm:gap-10"
        >
          <p className="text-xs font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
            {String(index + 1).padStart(2, "0")}
          </p>
          <div className="max-w-2xl">
            <p className="font-display text-2xl font-medium leading-tight text-foreground">
              {rec.title}
            </p>
            <p className="mt-3 text-sm leading-6 text-muted">{rec.signal}</p>
          </div>
          <div className="text-xs leading-5 text-quiet sm:text-right">
            <p>
              <span className="text-muted">Priority</span> · {rec.priority}
            </p>
            <p className="mt-1">
              <span className="text-muted">Effort</span> · {rec.effort}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function OpportunityGap({ data }: { data: IfnhPreviewData }) {
  const { open, met, gap, insight } = data.opportunityGap;

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
      <div className="grid gap-10 sm:grid-cols-3 lg:grid-cols-1">
        <div>
          <p className="font-display text-6xl font-medium leading-none text-foreground">
            {open}%
          </p>
          <p className="mt-3 text-sm leading-6 text-muted">
            Open to meeting someone
          </p>
        </div>
        <div>
          <p className="font-display text-5xl font-medium leading-none text-foreground">
            {met}%
          </p>
          <p className="mt-3 text-sm leading-6 text-muted">
            Have met someone new
          </p>
        </div>
        <div>
          <p className="font-display text-5xl font-medium leading-none text-foreground">
            {gap}-pt
          </p>
          <p className="mt-3 text-sm leading-6 text-muted">Connection gap</p>
        </div>
      </div>
      <p className="max-w-xl font-display text-2xl font-medium leading-[1.25] text-foreground sm:text-3xl">
        {insight}
      </p>
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

          <header className="grid gap-12 pb-20 pt-12 lg:grid-cols-[1fr_0.85fr] lg:items-end lg:pb-24 lg:pt-16">
            <div>
              <h2
                id="ifnh-modal-title"
                className="font-display text-[clamp(3.8rem,10vw,7.6rem)] font-medium leading-[0.9] text-foreground"
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
                <SectionTitle>Space + connection</SectionTitle>
              </div>
              <ConnectionGap data={data} />
            </section>

            <section className="border-t border-line py-16 sm:py-24">
              <div className="mb-14 max-w-3xl">
                <SectionTitle>Capacity pressure</SectionTitle>
              </div>
              <CapacityModel data={data} />
            </section>

            <section className="border-t border-line py-16 sm:py-24">
              <div className="mb-14 max-w-3xl">
                <SectionTitle>Priority actions</SectionTitle>
              </div>
              <RecommendationPriorities data={data} />
            </section>

            <section className="border-t border-line py-16 sm:py-24">
              <div className="mb-14 max-w-3xl">
                <SectionTitle>Opportunity gap</SectionTitle>
              </div>
              <OpportunityGap data={data} />
            </section>

            <section className="border-t border-line py-16 sm:py-20">
              <div className="mb-12 max-w-3xl">
                <SectionTitle>What this supports</SectionTitle>
              </div>
              <Supports data={data} />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
