"use client";

import {
  type KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ScarletWellBriefData } from "@/lib/scarletwell-preview-data";

type ScarletWellProjectModalProps = {
  data: ScarletWellBriefData;
  isOpen: boolean;
  onClose: () => void;
};

function formatNumber(value: number) {
  return Math.round(value).toLocaleString();
}

function formatCurrency(value: number) {
  return `$${Math.round(value).toLocaleString()}`;
}

function formatCurrencyK(value: number) {
  return `$${(value / 1000).toFixed(1)}K`;
}

function SectionTitle({ children }: { children: string }) {
  return (
    <h3 className="font-display text-[2.55rem] font-medium leading-[0.95] text-foreground sm:text-5xl lg:text-6xl">
      {children}
    </h3>
  );
}

function KpiBand({ data }: { data: ScarletWellBriefData }) {
  return (
    <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
      {data.portfolioKpis.map((kpi) => (
        <div key={kpi.label}>
          <p className="font-display text-5xl font-medium leading-none text-foreground lg:text-6xl">
            {kpi.value}
          </p>
          <p className="mt-3 max-w-36 text-sm leading-6 text-muted">{kpi.label}</p>
        </div>
      ))}
    </div>
  );
}

function ComparisonBar({
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
    <div className="grid gap-4 py-5 sm:grid-cols-[10rem_1fr] sm:items-center">
      <p className="text-sm font-medium leading-6 text-foreground">{label}</p>
      <div className="grid gap-3">
        <div className="grid grid-cols-[4.8rem_1fr_auto] items-center gap-3">
          <p className="text-xs leading-5 text-quiet">2024-25</p>
          <div className="h-2 bg-foreground/[0.06]">
            <div
              className="h-full bg-foreground/28"
              style={{ width: `${(previous / max) * 100}%` }}
            />
          </div>
          <p className="text-xs leading-5 text-muted">{previousText}</p>
        </div>
        <div className="grid grid-cols-[4.8rem_1fr_auto] items-center gap-3">
          <p className="text-xs leading-5 text-quiet">2025-26</p>
          <div className="h-2 bg-foreground/[0.06]">
            <div
              className="h-full bg-foreground/58"
              style={{ width: `${(current / max) * 100}%` }}
            />
          </div>
          <p className="text-xs leading-5 text-foreground">{currentText}</p>
        </div>
      </div>
    </div>
  );
}

function YearOverYear({ data }: { data: ScarletWellBriefData }) {
  const [previous, current] = data.cycleBars;

  return (
    <div className="space-y-9">
      <div className="grid gap-8 lg:grid-cols-2">
        {[previous, current].map((cycle) => (
          <div key={cycle.label} className="pt-2">
            <p className="font-display text-4xl font-medium leading-none text-foreground sm:text-5xl">
              {cycle.label}
            </p>
            <div className="mt-8 grid gap-7 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div>
                <p className="font-display text-4xl font-medium leading-none text-foreground">
                  {formatNumber(cycle.touchpoints)}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">participant touchpoints</p>
              </div>
              <div>
                <p className="font-display text-4xl font-medium leading-none text-foreground">
                  {formatCurrencyK(cycle.budget)}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">budget</p>
              </div>
              <div>
                <p className="font-display text-4xl font-medium leading-none text-foreground">
                  {cycle.touchpointsPerThousand}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">touchpoints / $1K</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-y border-line/80 py-3">
        <ComparisonBar
          label="Participant touchpoints"
          previous={previous.touchpoints}
          current={current.touchpoints}
          previousText={formatNumber(previous.touchpoints)}
          currentText={formatNumber(current.touchpoints)}
        />
        <ComparisonBar
          label="Budget"
          previous={previous.budget}
          current={current.budget}
          previousText={formatCurrencyK(previous.budget)}
          currentText={formatCurrencyK(current.budget)}
        />
      </div>

      <div>
        <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
          <div>
            <p className="font-display text-5xl font-medium leading-none text-foreground">
              {previous.touchpointsPerThousand}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">touchpoints / $1K, 2024-25</p>
          </div>
          <p className="hidden pb-2 text-sm leading-6 text-quiet sm:block">to</p>
          <div className="sm:text-right">
            <p className="font-display text-6xl font-medium leading-none text-foreground">
              {current.touchpointsPerThousand}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">touchpoints / $1K, 2025-26</p>
          </div>
        </div>
        <p className="mt-8 max-w-5xl font-display text-3xl font-medium leading-[1.06] text-foreground sm:text-4xl">
          {data.insight}
        </p>
      </div>
    </div>
  );
}

function PlanningModel({ data }: { data: ScarletWellBriefData }) {
  const [budget, setBudget] = useState(data.planningDefaults.budget);
  const [efficiency, setEfficiency] = useState(data.planningDefaults.efficiency);
  const [activities, setActivities] = useState(data.planningDefaults.activities);

  const projectedTouchpoints = Math.round((budget / 1000) * efficiency);
  const touchpointsPerActivity = projectedTouchpoints / Math.max(activities, 1);

  const planningSignal = useMemo(() => {
    if (efficiency < 70) {
      return "Review program mix and outreach strategy.";
    }

    if (budget > data.planningDefaults.budget && activities <= data.planningDefaults.activities) {
      return "Budget growth without additional sessions may reduce efficiency.";
    }

    if (touchpointsPerActivity > 25) {
      return "Higher activity volume may require operational support.";
    }

    return "Current assumptions indicate strong reach efficiency.";
  }, [
    activities,
    budget,
    data.planningDefaults.activities,
    data.planningDefaults.budget,
    efficiency,
    touchpointsPerActivity,
  ]);

  return (
    <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
      <div className="space-y-8">
        <label className="block">
          <span className="flex items-baseline justify-between gap-5">
            <span className="text-sm font-medium leading-6 text-foreground">
              Budget scenario
            </span>
            <span className="font-display text-3xl font-medium leading-none text-foreground">
              {formatCurrency(budget)}
            </span>
          </span>
          <input
            type="range"
            min="10000"
            max="30000"
            step="500"
            value={budget}
            onChange={(event) => setBudget(Number(event.target.value))}
            className="mt-4 h-1.5 w-full cursor-pointer accent-foreground"
          />
        </label>
        <label className="block">
          <span className="flex items-baseline justify-between gap-5">
            <span className="text-sm font-medium leading-6 text-foreground">
              Efficiency assumption
            </span>
            <span className="font-display text-3xl font-medium leading-none text-foreground">
              {efficiency} / $1K
            </span>
          </span>
          <input
            type="range"
            min="45"
            max="140"
            step="1"
            value={efficiency}
            onChange={(event) => setEfficiency(Number(event.target.value))}
            className="mt-4 h-1.5 w-full cursor-pointer accent-foreground"
          />
        </label>
        <label className="block">
          <span className="flex items-baseline justify-between gap-5">
            <span className="text-sm font-medium leading-6 text-foreground">
              Activities / sessions
            </span>
            <span className="font-display text-3xl font-medium leading-none text-foreground">
              {activities}
            </span>
          </span>
          <input
            type="range"
            min="50"
            max="140"
            step="1"
            value={activities}
            onChange={(event) => setActivities(Number(event.target.value))}
            className="mt-4 h-1.5 w-full cursor-pointer accent-foreground"
          />
        </label>
      </div>

      <div className="space-y-8">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="font-display text-6xl font-medium leading-none text-foreground">
              {formatNumber(projectedTouchpoints)}
            </p>
            <p className="mt-3 text-sm leading-6 text-muted">
              projected participant touchpoints
            </p>
          </div>
          <div>
            <p className="font-display text-6xl font-medium leading-none text-foreground">
              {touchpointsPerActivity.toFixed(1)}
            </p>
            <p className="mt-3 text-sm leading-6 text-muted">
              touchpoints per activity
            </p>
          </div>
        </div>
        <p className="max-w-2xl font-display text-3xl font-medium leading-[1.08] text-foreground">
          {planningSignal}
        </p>
      </div>
    </div>
  );
}

function Supports({ data }: { data: ScarletWellBriefData }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {data.supports.map((item) => (
        <p
          key={item}
          className="border-t border-line pt-4 font-display text-2xl font-medium leading-none text-foreground"
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
        <div className="mx-auto w-full max-w-7xl px-6 pb-16 pt-5 sm:px-10 lg:px-14">
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

          <header className="grid gap-10 pb-16 pt-10 lg:grid-cols-[1fr_0.72fr] lg:items-end lg:pb-20 lg:pt-16">
            <div>
              <h2
                id="scarletwell-modal-title"
                className="font-display text-[clamp(4.2rem,11vw,8.4rem)] font-medium leading-[0.86] text-foreground"
              >
                {data.title}
              </h2>
              <p className="mt-8 text-sm font-medium leading-6 text-muted">
                {data.subtitle}
              </p>
            </div>
            <p className="max-w-xl font-display text-[2.05rem] font-medium leading-[1.05] text-foreground sm:text-[2.45rem]">
              {data.summary}
            </p>
          </header>

          <main>
            <section className="py-12 sm:py-16">
              <KpiBand data={data} />
            </section>

            <section className="border-t border-line py-16 sm:py-20">
              <div className="mb-12 max-w-3xl">
                <SectionTitle>Year-over-year signal</SectionTitle>
              </div>
              <YearOverYear data={data} />
            </section>

            <section className="border-t border-line py-16 sm:py-20">
              <div className="mb-12 max-w-3xl">
                <SectionTitle>Planning model</SectionTitle>
              </div>
              <PlanningModel data={data} />
            </section>

            <section className="border-t border-line py-16 sm:py-20">
              <div className="mb-10 max-w-3xl">
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
