"use client";

import { type KeyboardEvent, useEffect, useRef } from "react";
import type { PslPreviewData } from "@/lib/psl-preview-data";

type PslProjectModalProps = {
  data: PslPreviewData;
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

function KpiBand({ data }: { data: PslPreviewData }) {
  return (
    <div className="grid gap-x-10 gap-y-8 border-y border-line py-10 sm:grid-cols-2 lg:grid-cols-4">
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

function CohortEngagement({ data }: { data: PslPreviewData }) {
  const max = Math.max(...data.engagement.bars.map((b) => b.value));

  return (
    <div className="space-y-12">
      <div className="border-y border-line/80">
        {data.engagement.bars.map((bar, index) => (
          <div
            key={bar.label}
            className={`grid gap-5 py-7 sm:grid-cols-[12rem_1fr_4rem] sm:items-center ${
              index > 0 ? "border-t border-line/60" : ""
            }`}
          >
            <p className="text-base font-medium leading-6 text-foreground">
              {bar.label}
            </p>
            <div className="h-3 bg-foreground/[0.05]">
              <div
                className="h-full"
                style={{
                  width: `${(bar.value / max) * 100}%`,
                  background: "var(--accent)",
                }}
              />
            </div>
            <p className="text-sm leading-5 text-foreground sm:text-right">
              {bar.display}
            </p>
          </div>
        ))}
      </div>
      <p className="max-w-3xl font-display text-2xl font-medium leading-[1.2] text-foreground sm:text-3xl">
        {data.engagement.insight}
      </p>
    </div>
  );
}

function CompetencyChart({ data }: { data: PslPreviewData }) {
  const items = data.competency.items;
  const scale = 5;

  return (
    <div className="space-y-14">
      <div className="grid gap-10">
        {items.map((item) => {
          const prePct = (item.pre / scale) * 100;
          const postPct = (item.post / scale) * 100;
          const delta = item.post - item.pre;

          return (
            <div
              key={item.label}
              className="grid gap-3 sm:grid-cols-[14rem_1fr] sm:items-center sm:gap-10"
            >
              <p className="text-base font-medium leading-6 text-foreground">
                {item.label}
              </p>
              <div className="relative">
                <div className="grid grid-cols-[3.5rem_1fr_3rem] items-center gap-4">
                  <p className="text-xs uppercase leading-5 tracking-[0.16em] text-quiet">
                    Pre
                  </p>
                  <div className="h-2 bg-foreground/[0.06]">
                    <div
                      className="h-full bg-foreground/25"
                      style={{ width: `${prePct}%` }}
                    />
                  </div>
                  <p className="text-sm leading-5 text-muted sm:text-right">
                    {item.pre.toFixed(2)}
                  </p>
                </div>
                <div className="mt-2 grid grid-cols-[3.5rem_1fr_3rem] items-center gap-4">
                  <p className="text-xs uppercase leading-5 tracking-[0.16em] text-quiet">
                    Post
                  </p>
                  <div className="h-2 bg-foreground/[0.06]">
                    <div
                      className="h-full"
                      style={{
                        width: `${postPct}%`,
                        background: "var(--accent)",
                      }}
                    />
                  </div>
                  <p className="text-sm leading-5 text-foreground sm:text-right">
                    {item.post.toFixed(2)}
                  </p>
                </div>
                <p className="mt-2 text-xs leading-5 text-quiet sm:absolute sm:-right-2 sm:top-1/2 sm:mt-0 sm:hidden sm:-translate-y-1/2">
                  +{delta.toFixed(2)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <p className="max-w-3xl font-display text-2xl font-medium leading-[1.2] text-foreground sm:text-3xl">
        {data.competency.insight}
      </p>

      <p className="text-xs uppercase leading-5 tracking-[0.18em] text-quiet">
        Scale 1–5 · aligned pre/post participants
      </p>
    </div>
  );
}

function Qualitative({ data }: { data: PslPreviewData }) {
  return (
    <div className="grid gap-10 sm:grid-cols-3 sm:gap-12">
      {data.qualitative.columns.map((col) => (
        <div key={col.label} className="space-y-5 border-t border-line pt-6">
          <p className="text-xs font-medium uppercase leading-5 tracking-[0.2em] text-quiet">
            {col.label}
          </p>
          <p className="font-display text-xl font-medium leading-[1.3] text-foreground sm:text-2xl">
            {col.insight}
          </p>
        </div>
      ))}
    </div>
  );
}

function Outcomes({ data }: { data: PslPreviewData }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.outcomes.map((item) => (
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

export function PslProjectModal({
  data,
  isOpen,
  onClose,
}: PslProjectModalProps) {
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
        aria-labelledby="psl-modal-title"
        onKeyDown={handleKeyDown}
        className="modal-panel-in mx-auto h-screen w-full overflow-y-auto bg-background sm:h-[calc(100vh-2.5rem)] sm:max-w-[88rem] sm:border sm:border-line"
      >
        <div className="mx-auto w-full max-w-7xl px-6 pb-20 pt-5 sm:px-10 lg:px-14">
          <div className="sticky top-0 z-10 -mx-6 flex justify-end bg-background/95 px-6 py-4 sm:-mx-10 sm:px-10 lg:-mx-14 lg:px-14">
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close PSL Dashboard project brief"
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
                id="psl-modal-title"
                className="mt-4 font-display text-[clamp(3.4rem,9vw,6.5rem)] font-medium leading-[0.92] text-foreground"
              >
                {data.title}
              </h2>
            </div>
            <div className="max-w-xl space-y-5">
              <p className="font-display text-[1.55rem] font-medium leading-[1.2] text-foreground sm:text-[1.85rem]">
                {data.summary}
              </p>
              <p className="text-sm leading-6 text-muted">{data.context}</p>
            </div>
          </header>

          <main>
            <section className="pb-10">
              <SectionLabel>Cohort snapshot</SectionLabel>
              <div className="mt-6">
                <KpiBand data={data} />
              </div>
            </section>

            <section className="border-t border-line py-14 sm:py-20">
              <div className="mb-10 max-w-3xl">
                <SectionLabel>Cohort engagement</SectionLabel>
                <SectionTitle>Participation through the cycle</SectionTitle>
              </div>
              <CohortEngagement data={data} />
            </section>

            <section className="border-t border-line py-14 sm:py-20">
              <div className="mb-10 max-w-3xl">
                <SectionLabel>Competency growth</SectionLabel>
                <SectionTitle>Pre / post competency lift</SectionTitle>
              </div>
              <CompetencyChart data={data} />
            </section>

            <section className="border-t border-line py-14 sm:py-20">
              <div className="mb-10 max-w-3xl">
                <SectionLabel>Qualitative themes</SectionLabel>
                <SectionTitle>What participants reported</SectionTitle>
              </div>
              <Qualitative data={data} />
            </section>

            <section className="border-t border-line py-14 sm:py-18">
              <div className="mb-10 max-w-3xl">
                <SectionLabel>Program evaluation</SectionLabel>
                <SectionTitle>Where this gets applied</SectionTitle>
              </div>
              <Outcomes data={data} />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
