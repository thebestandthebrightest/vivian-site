"use client";

import {
  type KeyboardEvent,
  type ReactNode,
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

const modalSections = [
  { id: "summary", label: "Summary" },
  { id: "portfolio-kpis", label: "KPIs" },
  { id: "cycle-comparison", label: "Cycles" },
  { id: "efficiency", label: "Efficiency" },
  { id: "planning", label: "Planning" },
  { id: "built", label: "Built" },
];

function formatNumber(value: number) {
  return Math.round(value).toLocaleString();
}

function formatCurrency(value: number) {
  return `$${Math.round(value).toLocaleString()}`;
}

function formatCurrencyK(value: number) {
  return `$${(value / 1000).toFixed(1)}K`;
}

function SectionBlock({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-line py-10 sm:py-12">
      <p className="text-[0.68rem] font-medium uppercase leading-4 tracking-[0.2em] text-quiet">
        {eyebrow}
      </p>
      <h3 className="mt-3 font-display text-[2.45rem] font-medium leading-[0.95] text-foreground sm:text-5xl lg:text-6xl">
        {title}
      </h3>
      <div className="mt-7">{children}</div>
    </section>
  );
}

function KpiBand({ data }: { data: ScarletWellBriefData }) {
  return (
    <div>
      <div className="grid border-y border-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {data.portfolioKpis.map((kpi) => (
          <div
            key={kpi.label}
            className="border-b border-line py-5 sm:border-r sm:px-5 lg:nth-[3n]:border-r-0 xl:nth-[3n]:border-r xl:nth-[6n]:border-r-0 xl:border-b-0"
          >
            <p className="text-[0.68rem] font-medium uppercase leading-4 tracking-[0.18em] text-quiet">
              {kpi.label}
            </p>
            <p className="mt-3 font-display text-4xl font-medium leading-none text-foreground">
              {kpi.value}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-4 max-w-3xl text-xs leading-6 text-quiet">
        Participant touchpoints reflect reported duplicated attendance where
        session counts were available.
      </p>
    </div>
  );
}

function HorizontalSignal({
  label,
  value,
  max,
  detail,
}: {
  label: string;
  value: number;
  max: number;
  detail: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-sm font-medium leading-6 text-foreground">{label}</p>
        <p className="text-xs leading-5 text-quiet">{detail}</p>
      </div>
      <div className="mt-3 h-2 bg-foreground/[0.06]">
        <div
          className="h-full bg-foreground/45"
          style={{ width: `${Math.max((value / max) * 100, 8)}%` }}
        />
      </div>
    </div>
  );
}

function TwoYearBars({ data }: { data: ScarletWellBriefData }) {
  const maxTouchpoints = Math.max(...data.cycleBars.map((cycle) => cycle.touchpoints));
  const maxBudget = Math.max(...data.cycleBars.map((cycle) => cycle.budget));

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5">
        <p className="text-[0.68rem] font-medium uppercase leading-4 tracking-[0.2em] text-quiet">
          Participant touchpoints
        </p>
        {data.cycleBars.map((cycle) => (
          <HorizontalSignal
            key={`${cycle.label}-touchpoints`}
            label={cycle.label}
            value={cycle.touchpoints}
            max={maxTouchpoints}
            detail={formatNumber(cycle.touchpoints)}
          />
        ))}
      </div>
      <div className="space-y-5">
        <p className="text-[0.68rem] font-medium uppercase leading-4 tracking-[0.2em] text-quiet">
          Documented budget
        </p>
        {data.cycleBars.map((cycle) => (
          <HorizontalSignal
            key={`${cycle.label}-budget`}
            label={cycle.label}
            value={cycle.budget}
            max={maxBudget}
            detail={formatCurrencyK(cycle.budget)}
          />
        ))}
      </div>
    </div>
  );
}

function CycleComparison({ data }: { data: ScarletWellBriefData }) {
  return (
    <div className="space-y-8">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line text-[0.68rem] uppercase tracking-[0.18em] text-quiet">
              <th className="py-3 pr-4 font-medium">Measure</th>
              <th className="py-3 pr-4 font-medium">2024-2025</th>
              <th className="py-3 pr-4 font-medium">2025-2026</th>
              <th className="py-3 font-medium">Change / signal</th>
            </tr>
          </thead>
          <tbody>
            {data.cycleComparison.map((row) => (
              <tr key={row.label} className="border-b border-line/80 last:border-b-0">
                <td className="py-4 pr-4 font-medium text-foreground">{row.label}</td>
                <td className="py-4 pr-4 text-muted">{row.previous}</td>
                <td className="py-4 pr-4 text-muted">{row.current}</td>
                <td className="py-4 text-muted">{row.signal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TwoYearBars data={data} />
      <p className="max-w-3xl border-l border-line pl-5 text-sm leading-7 text-muted">
        Reach increased while documented budget decreased, producing a stronger
        efficiency signal in the newer cycle.
      </p>
    </div>
  );
}

function FamilyEfficiencyRows({ data }: { data: ScarletWellBriefData }) {
  const max = Math.max(...data.familyRows.map((row) => row.touchpointsPerThousand));

  return (
    <div className="space-y-4">
      {data.familyRows.map((row) => (
        <div
          key={row.label}
          className="grid gap-4 border-t border-line pt-5 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div>
            <p className="font-display text-2xl font-medium leading-none text-foreground">
              {row.label}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 text-sm leading-6 text-muted sm:grid-cols-4">
              <p>{row.grants} grants</p>
              <p>{row.activities} activities</p>
              <p>{formatNumber(row.touchpoints)} touchpoints</p>
              <p>{row.units} units</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex flex-wrap items-baseline justify-between gap-3 text-sm leading-6">
              <span className="text-muted">{row.budget} budget</span>
              <span className="font-medium text-foreground">
                {row.costPerTouchpoint} / touchpoint
              </span>
              <span className="text-muted">{row.touchpointsPerThousand} per $1K</span>
            </div>
            <div className="h-2 bg-foreground/[0.06]">
              <div
                className="h-full bg-foreground/45"
                style={{ width: `${Math.max((row.touchpointsPerThousand / max) * 100, 8)}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PlanningModel({ data }: { data: ScarletWellBriefData }) {
  const [budget, setBudget] = useState(data.planningDefaults.budget);
  const [efficiency, setEfficiency] = useState(data.planningDefaults.efficiency);
  const [activities, setActivities] = useState(data.planningDefaults.activities);

  const projectedTouchpoints = Math.round((budget / 1000) * efficiency);
  const costPerTouchpoint = budget / Math.max(projectedTouchpoints, 1);
  const touchpointsPerActivity = projectedTouchpoints / Math.max(activities, 1);

  const planningSignal = useMemo(() => {
    if (efficiency < 70) {
      return "Review program mix and outreach strategy.";
    }

    if (budget > data.planningDefaults.budget && activities <= data.planningDefaults.activities) {
      return "Consider additional sessions or larger-format programs.";
    }

    if (touchpointsPerActivity > 25) {
      return "Monitor capacity and experience quality.";
    }

    if (costPerTouchpoint < 10) {
      return "Strong reach efficiency.";
    }

    return "Directional scenario is within the observed planning range.";
  }, [
    activities,
    budget,
    costPerTouchpoint,
    data.planningDefaults.activities,
    data.planningDefaults.budget,
    efficiency,
    touchpointsPerActivity,
  ]);

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <div>
        <div className="space-y-6">
          <label className="block">
            <span className="flex items-baseline justify-between gap-4">
              <span className="text-sm font-medium leading-6 text-foreground">
                Budget scenario
              </span>
              <span className="font-display text-2xl font-medium leading-none text-foreground">
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
              className="mt-3 h-1.5 w-full cursor-pointer accent-foreground"
            />
          </label>
          <label className="block">
            <span className="flex items-baseline justify-between gap-4">
              <span className="text-sm font-medium leading-6 text-foreground">
                Efficiency assumption
              </span>
              <span className="font-display text-2xl font-medium leading-none text-foreground">
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
              className="mt-3 h-1.5 w-full cursor-pointer accent-foreground"
            />
          </label>
          <label className="block">
            <span className="flex items-baseline justify-between gap-4">
              <span className="text-sm font-medium leading-6 text-foreground">
                Activities / sessions
              </span>
              <span className="font-display text-2xl font-medium leading-none text-foreground">
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
              className="mt-3 h-1.5 w-full cursor-pointer accent-foreground"
            />
          </label>
        </div>
        <div className="mt-7 flex flex-wrap gap-2">
          {data.planningPresets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => {
                setBudget(preset.budget);
                setEfficiency(preset.efficiency);
                setActivities(preset.activities);
              }}
              className="focus-ring border border-line px-3 py-2 text-xs font-medium leading-5 text-muted transition duration-300 hover:border-foreground/35 hover:text-foreground motion-reduce:transition-none"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
        <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
          <div className="bg-background p-5">
            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-quiet">
              Projected touchpoints
            </p>
            <p className="mt-3 font-display text-4xl font-medium leading-none text-foreground">
              {formatNumber(projectedTouchpoints)}
            </p>
          </div>
          <div className="bg-background p-5">
            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-quiet">
              Cost / touchpoint
            </p>
            <p className="mt-3 font-display text-4xl font-medium leading-none text-foreground">
              ${costPerTouchpoint.toFixed(2)}
            </p>
          </div>
          <div className="bg-background p-5 sm:col-span-2">
            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-quiet">
              Touchpoints / activity
            </p>
            <p className="mt-3 font-display text-4xl font-medium leading-none text-foreground">
              {touchpointsPerActivity.toFixed(1)}
            </p>
          </div>
        </div>
        <p className="mt-6 border-t border-line pt-5 text-sm leading-7 text-muted">
          {planningSignal}
        </p>
        <p className="mt-5 text-xs leading-6 text-quiet">
          These are directional planning scenarios based on observed 2025-2026
          efficiency, not forecasts.
        </p>
      </div>
    </div>
  );
}

function BuiltLayer({ data }: { data: ScarletWellBriefData }) {
  return (
    <div className="grid gap-7 md:grid-cols-2">
      {data.buildLayers.map((layer) => (
        <div key={layer.title} className="border-t border-line pt-5">
          <h4 className="font-display text-3xl font-medium leading-none text-foreground">
            {layer.title}
          </h4>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-muted">
            {layer.items.map((item) => (
              <li key={item} className="border-t border-line/80 pt-3">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function ExecutiveSummary({ data }: { data: ScarletWellBriefData }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr]">
      <p className="max-w-2xl text-lg leading-8 text-muted">{data.executiveSummary}</p>
      <div className="grid gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-1">
        {data.capabilities.map((capability) => (
          <div key={capability.title} className="bg-background p-5">
            <h4 className="font-display text-3xl font-medium leading-none text-foreground">
              {capability.title}
            </h4>
            <p className="mt-3 text-sm leading-7 text-muted">{capability.text}</p>
          </div>
        ))}
      </div>
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
    ).filter((element) => !element.hasAttribute("aria-hidden"));

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
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="scarletwell-modal-title"
      onKeyDown={handleKeyDown}
      className="fixed inset-0 z-50 overflow-y-auto bg-background text-foreground"
    >
      <div className="mx-auto min-h-screen w-full max-w-[92rem] px-6 pb-16 pt-5 sm:px-10 lg:px-14">
        <div className="sticky top-0 z-10 -mx-6 border-b border-line bg-background/95 px-6 py-4 sm:-mx-10 sm:px-10 lg:-mx-14 lg:px-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <a
              href="#summary"
              className="focus-ring text-xs font-medium uppercase leading-5 tracking-[0.2em] text-quiet transition hover:text-foreground motion-reduce:transition-none"
            >
              Project brief
            </a>
            <nav
              aria-label="ScarletWell brief sections"
              className="hidden flex-wrap gap-5 md:flex"
            >
              {modalSections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="focus-ring text-xs font-medium uppercase leading-5 tracking-[0.18em] text-quiet transition hover:text-foreground motion-reduce:transition-none"
                >
                  {section.label}
                </a>
              ))}
            </nav>
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
        </div>

        <header className="grid gap-8 py-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:py-16">
          <div>
            <p className="text-[0.68rem] font-medium uppercase leading-4 tracking-[0.2em] text-quiet">
              {data.label}
            </p>
            <h2
              id="scarletwell-modal-title"
              className="mt-4 font-display text-[clamp(3.25rem,9vw,7.6rem)] font-medium leading-[0.88] text-foreground"
            >
              {data.title}
            </h2>
            <p className="mt-6 text-sm font-medium leading-6 text-muted">
              {data.subtitle}
            </p>
          </div>
          <p className="max-w-xl text-lg leading-8 text-muted lg:ml-auto">
            An executive analytics brief for portfolio intelligence, evaluation
            clarity, and operational planning.
          </p>
        </header>

        <SectionBlock
          id="summary"
          eyebrow="Executive summary"
          title="Portfolio intelligence for wellness programming."
        >
          <ExecutiveSummary data={data} />
        </SectionBlock>

        <SectionBlock
          id="portfolio-kpis"
          eyebrow={data.label}
          title="A clearer view of the analyzed portfolio."
        >
          <div className="space-y-8">
            <KpiBand data={data} />
            <div className="grid gap-7 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="space-y-5">
                <HorizontalSignal
                  label="Documented v4 budget"
                  value={data.portfolioTotals.budget}
                  max={data.portfolioTotals.budget}
                  detail={formatCurrency(data.portfolioTotals.budget)}
                />
                <HorizontalSignal
                  label="Reported participant touchpoints"
                  value={data.portfolioTotals.touchpoints}
                  max={data.portfolioTotals.touchpoints}
                  detail={formatNumber(data.portfolioTotals.touchpoints)}
                />
              </div>
              <div className="border-t border-line pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
                <p className="text-[0.68rem] font-medium uppercase leading-4 tracking-[0.2em] text-quiet">
                  Efficiency read
                </p>
                <p className="mt-3 font-display text-5xl font-medium leading-none text-foreground">
                  {data.portfolioTotals.touchpointsPerThousand}
                </p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  participant touchpoints per $1K across the documented v4
                  source package.
                </p>
              </div>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock
          id="cycle-comparison"
          eyebrow="Cycle comparison"
          title="Reach increased as documented budget decreased."
        >
          <CycleComparison data={data} />
        </SectionBlock>

        <SectionBlock
          id="efficiency"
          eyebrow="Efficiency view"
          title="Grant-family comparisons make tradeoffs visible."
        >
          <div className="grid gap-8 lg:grid-cols-[1.24fr_0.76fr]">
            <FamilyEfficiencyRows data={data} />
            <aside className="border-t border-line pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
              <p className="text-[0.68rem] font-medium uppercase leading-4 tracking-[0.2em] text-quiet">
                Analytical signals
              </p>
              <ul className="mt-5 space-y-4 text-sm leading-7 text-muted">
                {data.efficiencyInsights.map((insight) => (
                  <li key={insight} className="border-t border-line pt-4">
                    {insight}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </SectionBlock>

        <SectionBlock
          id="planning"
          eyebrow="Forward planning"
          title="Directional scenarios for operating decisions."
        >
          <PlanningModel data={data} />
        </SectionBlock>

        <SectionBlock
          id="built"
          eyebrow="What I built"
          title="Decision-support infrastructure, not a static report."
        >
          <BuiltLayer data={data} />
        </SectionBlock>
      </div>
    </div>
  );
}
