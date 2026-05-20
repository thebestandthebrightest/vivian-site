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

function SectionTitle({ children }: { children: string }) {
  return (
    <h3 className="font-display text-[2.4rem] font-medium leading-[1] text-foreground sm:text-5xl">
      {children}
    </h3>
  );
}

function KpiBand({ data }: { data: ScarletWellBriefData }) {
  return (
    <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {data.portfolioKpis.map((kpi) => (
        <div key={kpi.label}>
          <p className="font-display text-5xl font-medium leading-none text-foreground lg:text-6xl">
            {kpi.value}
          </p>
          <p className="mt-3 text-sm leading-6 text-muted">{kpi.label}</p>
        </div>
      ))}
    </div>
  );
}

function CompareRow({
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
      <p className="text-base font-medium leading-6 text-foreground">{label}</p>
      <div className="grid gap-4">
        <div className="grid grid-cols-[5rem_1fr_auto] items-center gap-4">
          <p className="text-sm leading-5 text-quiet">2024-25</p>
          <div className="h-3 bg-foreground/[0.06]">
            <div
              className="h-full bg-foreground/28"
              style={{ width: `${(previous / max) * 100}%` }}
            />
          </div>
          <p className="text-sm leading-5 text-muted">{previousText}</p>
        </div>
        <div className="grid grid-cols-[5rem_1fr_auto] items-center gap-4">
          <p className="text-sm leading-5 text-quiet">2025-26</p>
          <div className="h-3 bg-foreground/[0.06]">
            <div
              className="h-full bg-foreground/58"
              style={{ width: `${(current / max) * 100}%` }}
            />
          </div>
          <p className="text-sm leading-5 text-foreground">{currentText}</p>
        </div>
      </div>
    </div>
  );
}

function PortfolioEfficiency({ data }: { data: ScarletWellBriefData }) {
  const [previous, current] = data.cycles;

  return (
    <div className="space-y-14">
      <div className="border-y border-line/80">
        <CompareRow
          label="Participants"
          previous={previous.participants}
          current={current.participants}
          previousText={formatNumber(previous.participants)}
          currentText={formatNumber(current.participants)}
        />
        <div className="border-t border-line/60" />
        <CompareRow
          label="Budget"
          previous={previous.budget}
          current={current.budget}
          previousText={formatCurrencyK(previous.budget)}
          currentText={formatCurrencyK(current.budget)}
        />
      </div>

      <div>
        <p className="text-sm font-medium leading-6 text-muted">
          Cost per participant
        </p>
        <div className="mt-5 grid gap-6 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
          <div>
            <p className="font-display text-5xl font-medium leading-none text-foreground sm:text-6xl">
              ${previous.costPerParticipant.toFixed(2)}
            </p>
            <p className="mt-3 text-sm leading-6 text-muted">2024-25</p>
          </div>
          <p className="hidden pb-2 text-sm leading-6 text-quiet sm:block">→</p>
          <div className="sm:text-right">
            <p className="font-display text-6xl font-medium leading-none text-foreground sm:text-7xl">
              ${current.costPerParticipant.toFixed(2)}
            </p>
            <p className="mt-3 text-sm leading-6 text-muted">2025-26</p>
          </div>
        </div>
        <p className="mt-10 max-w-4xl font-display text-2xl font-medium leading-[1.2] text-foreground sm:text-3xl">
          {data.insight}
        </p>
      </div>
    </div>
  );
}

function GrowthProjectionChart({ data }: { data: ScarletWellBriefData }) {
  const points = data.projection.points;
  const maxBudget = Math.max(...points.map((p) => p.budget));
  const maxParticipants = Math.max(...points.map((p) => p.participants));

  const width = 720;
  const height = 320;
  const padL = 72;
  const padR = 24;
  const padT = 24;
  const padB = 56;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;

  const x = (budget: number) => padL + (budget / maxBudget) * innerW;
  const y = (participants: number) =>
    padT + innerH - (participants / maxParticipants) * innerH;

  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${x(p.budget)} ${y(p.participants)}`)
    .join(" ");

  const yTicks = [0, 0.5, 1].map((t) => Math.round(maxParticipants * t));

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
          aria-label="Projected participants by budget"
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
                  {tick.toLocaleString()}
                </text>
              </g>
            );
          })}

          <path
            d={path}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.85"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {points.map((p) => (
            <g key={p.budget}>
              <circle
                cx={x(p.budget)}
                cy={y(p.participants)}
                r="5"
                fill="currentColor"
              />
              <text
                x={x(p.budget)}
                y={y(p.participants) - 14}
                textAnchor="middle"
                fontSize="14"
                fontWeight="500"
                fill="currentColor"
              >
                {p.participants.toLocaleString()}
              </text>
              <text
                x={x(p.budget)}
                y={height - padB + 24}
                textAnchor="middle"
                fontSize="13"
                fill="currentColor"
                fillOpacity="0.65"
              >
                ${(p.budget / 1000).toFixed(p.budget % 1000 === 0 ? 0 : 1)}K
              </text>
            </g>
          ))}

          <text
            x={padL}
            y={height - 8}
            fontSize="12"
            fill="currentColor"
            fillOpacity="0.5"
          >
            Budget
          </text>
          <text
            x={padL - 56}
            y={padT + 6}
            fontSize="12"
            fill="currentColor"
            fillOpacity="0.5"
          >
            Participants
          </text>
        </svg>
      </div>
      <p className="max-w-2xl text-sm leading-6 text-muted">
        Projection based on current attendance and budget assumptions.
      </p>
    </div>
  );
}

function Supports({ data }: { data: ScarletWellBriefData }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

          <header className="grid gap-12 pb-20 pt-12 lg:grid-cols-[1fr_0.85fr] lg:items-end lg:pb-24 lg:pt-16">
            <div>
              <h2
                id="scarletwell-modal-title"
                className="font-display text-[clamp(3.8rem,10vw,7.6rem)] font-medium leading-[0.9] text-foreground"
              >
                {data.title}
              </h2>
              <p className="mt-6 text-sm font-medium leading-6 text-muted">
                {data.subtitle}
              </p>
            </div>
            <p className="max-w-xl font-display text-[1.7rem] font-medium leading-[1.2] text-foreground sm:text-[2rem]">
              {data.summary}
            </p>
          </header>

          <main>
            <section className="py-14 sm:py-20">
              <KpiBand data={data} />
            </section>

            <section className="border-t border-line py-16 sm:py-24">
              <div className="mb-14 max-w-3xl">
                <SectionTitle>Portfolio efficiency</SectionTitle>
              </div>
              <PortfolioEfficiency data={data} />
            </section>

            <section className="border-t border-line py-16 sm:py-24">
              <div className="mb-14 max-w-3xl">
                <SectionTitle>Growth projection</SectionTitle>
              </div>
              <GrowthProjectionChart data={data} />
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
