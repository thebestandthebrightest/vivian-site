"use client";

import { useMemo, useState, type ReactNode, type SVGProps } from "react";
import type { IfnhPreviewData } from "@/lib/ifnh-preview-data";
import {
  ModalIcon,
  ModalSectionLabel,
  ModalTabs,
  ProjectModalShell,
} from "./ProjectModalShell";

type IfnhProjectModalProps = {
  data: IfnhPreviewData;
  isOpen: boolean;
  onClose: () => void;
};

type TabId = "overview" | "scenario" | "insights" | "recommendation";
type Level = "Low" | "Medium" | "High";
type SignalLevel = "High signal" | "Medium signal";
type ScenarioStrategy =
  | "Current layout"
  | "Flexible seating adjustment"
  | "Seating + programming test";
type InsightIconName =
  | "clipboard"
  | "repeat"
  | "user-plus"
  | "handshake"
  | "split"
  | "layout"
  | "lightbulb"
  | "spark"
  | "message-users";

const TABS: Array<{ id: TabId; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "scenario", label: "Scenario Lab" },
  { id: "insights", label: "Student Insights" },
  { id: "recommendation", label: "Recommendation" },
];

const FLOW: Array<{ icon: InsightIconName; label: string }> = [
  { icon: "clipboard", label: "Survey responses" },
  { icon: "split", label: "Conversion gap" },
  { icon: "layout", label: "Capacity scenario" },
  { icon: "spark", label: "Recommended path" },
];

const KPI_ITEMS: Array<{
  label: string;
  value: string;
  icon: InsightIconName;
}> = [
  { label: "Survey responses", value: "105", icon: "clipboard" },
  { label: "Regular visitors", value: "78%", icon: "repeat" },
  { label: "Open to meeting", value: "67%", icon: "user-plus" },
  { label: "Met someone new", value: "37%", icon: "handshake" },
];

const STRATEGY_OPTIONS: Array<{
  name: ScenarioStrategy;
  fit: "Low" | "Moderate" | "Strong";
  interaction: "Low" | "Medium" | "High";
  effort: "Low" | "Medium" | "High" | "—";
}> = [
  {
    name: "Current layout",
    fit: "Strong",
    interaction: "Low",
    effort: "—",
  },
  {
    name: "Flexible seating adjustment",
    fit: "Moderate",
    interaction: "Medium",
    effort: "Medium",
  },
  {
    name: "Seating + programming test",
    fit: "Strong",
    interaction: "High",
    effort: "Medium",
  },
];

const THEMES: Array<{
  title: string;
  body: string;
  signal: SignalLevel;
  icon: InsightIconName;
}> = [
  {
    title: "Low-pressure connection",
    body: "Students were open to meeting others, but needed easier social entry points.",
    signal: "High signal",
    icon: "message-users",
  },
  {
    title: "Intent vs. action gap",
    body: "Many students were open to interaction, but fewer actually met someone new.",
    signal: "High signal",
    icon: "split",
  },
  {
    title: "Space as a constraint",
    body: "Peak demand exceeded usable seating, making layout and flow part of the engagement problem.",
    signal: "Medium signal",
    icon: "layout",
  },
  {
    title: "Programming opportunity",
    body: "Small structured prompts or events could turn passive presence into connection.",
    signal: "Medium signal",
    icon: "lightbulb",
  },
];

const ROADMAP: Array<{ title: string; body: string }> = [
  {
    title: "Adjust the space",
    body: "Use flexible seating during high-traffic periods to reduce peak capacity pressure.",
  },
  {
    title: "Add low-pressure interaction prompts",
    body: "Use simple programming moments to help students move from openness to actual connection.",
  },
  {
    title: "Monitor conversion",
    body: "Track whether meeting-someone-new rates improve after layout and programming changes.",
  },
];

const SKILLS = [
  "Survey analysis",
  "Capacity modeling",
  "Recommendation design",
] as const;

const IMPACTS = [
  "Identified the 30-point connection gap",
  "Modeled a +30 seat peak shortfall",
  "Prioritized space and programming changes",
] as const;

const BLUE_ACCENT = "#5f7f9c";
const BLUE_SOFT = "rgba(95, 127, 156, 0.14)";
const BLUE_LINE = "rgba(95, 127, 156, 0.38)";

const INSIGHT_ICON_PATHS: Record<InsightIconName, ReactNode> = {
  clipboard: (
    <>
      <rect x="6" y="4.5" width="12" height="16" rx="1.5" />
      <path d="M9 4.5V3.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <path d="M9 11h6M9 14.5h6M9 18h4" />
    </>
  ),
  repeat: (
    <>
      <path d="M17 7h3V4" />
      <path d="M20 7a7 7 0 0 0-12-3" />
      <path d="M7 17H4v3" />
      <path d="M4 17a7 7 0 0 0 12 3" />
    </>
  ),
  "user-plus": (
    <>
      <circle cx="10" cy="8" r="3" />
      <path d="M4.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M18 8v6M15 11h6" />
    </>
  ),
  handshake: (
    <>
      <path d="M8 12.5 5.5 15a2 2 0 1 1-2.8-2.8l4.1-4.1a3 3 0 0 1 2.1-.9H12" />
      <path d="m10.5 13.5 2 2a2 2 0 0 0 2.8 0l5-5a2 2 0 0 0-2.8-2.8L15.8 9.4a3 3 0 0 1-2.1.9H12" />
      <path d="m9 10 2 2a2 2 0 0 0 2.8 0l1.2-1.2" />
    </>
  ),
  split: (
    <>
      <path d="M12 4v16" />
      <path d="m8 8 4-4 4 4" />
      <path d="m16 16-4 4-4-4" />
    </>
  ),
  layout: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="1.5" />
      <path d="M3 10h18" />
      <path d="M9 20V10" />
      <path d="M14 14h4" />
    </>
  ),
  lightbulb: (
    <>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6.5 6.5 0 0 0-4 11.63V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.37A6.5 6.5 0 0 0 12 3Z" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2 2M16.4 16.4l2 2M5.6 18.4l2-2M16.4 7.6l2-2" />
    </>
  ),
  "message-users": (
    <>
      <path d="M4.5 6.5H18v8H9.5L6 18v-3.5H4.5z" />
      <circle cx="10" cy="9.5" r="1.5" />
      <path d="M7.5 13a2.5 2.5 0 0 1 5 0" />
      <circle cx="15.5" cy="10.5" r="1.25" />
    </>
  ),
};

export function IfnhProjectModal({
  data,
  isOpen,
  onClose,
}: IfnhProjectModalProps) {
  const [tab, setTab] = useState<TabId>("overview");

  return (
    <ProjectModalShell
      isOpen={isOpen}
      onClose={onClose}
      labelledById="ifnh-modal-title"
      title="IFNH InsightOS"
      summary="A campus engagement dashboard using student participation and survey data to identify patterns, forecast needs, and guide program decisions."
    >
      <section>
        <ModalSectionLabel>Impact snapshot</ModalSectionLabel>
        <div className="mt-4">
          <IfnhKpiStrip items={KPI_ITEMS} />
        </div>
      </section>

      <section>
        <ModalSectionLabel>Data to decision</ModalSectionLabel>
        <div className="mt-5">
          <InsightFlow />
        </div>
      </section>

      <section>
        <ModalTabs
          items={TABS}
          active={tab}
          onChange={setTab}
          ariaLabel="IFNH InsightOS sections"
          idPrefix="ifnh"
        />

        <div
          className="mt-7"
          role="tabpanel"
          id={`ifnh-panel-${tab}`}
          aria-labelledby={`ifnh-tab-${tab}`}
        >
          {tab === "overview" ? <OverviewTab data={data} /> : null}
          {tab === "scenario" ? <ScenarioLabTab data={data} /> : null}
          {tab === "insights" ? <StudentInsightsTab /> : null}
          {tab === "recommendation" ? <RecommendationTab /> : null}
        </div>
      </section>

      <SkillsImpactSection />
    </ProjectModalShell>
  );
}

function ThinIcon({
  name,
  className = "h-4 w-4",
  ...rest
}: { name: InsightIconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      {INSIGHT_ICON_PATHS[name]}
    </svg>
  );
}

function IfnhKpiStrip({
  items,
}: {
  items: Array<{ label: string; value: string; icon: InsightIconName }>;
}) {
  return (
    <div className="grid gap-x-8 gap-y-6 border-y border-line py-7 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label}>
          <p className="font-display text-4xl font-medium leading-none text-foreground lg:text-[2.75rem]">
            {item.value}
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-[0.75rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet">
            <ThinIcon name={item.icon} className="h-4 w-4" />
            <span>{item.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function InsightFlow() {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
      {FLOW.map((step, index) => (
        <div key={step.label} className="flex flex-1 items-stretch gap-3">
          <div
            className="flex flex-1 items-center gap-3 border px-4 py-4"
            style={
              index === FLOW.length - 1
                ? {
                    borderColor: "var(--sage-line)",
                    background: "var(--sage-soft)",
                  }
                : {
                    borderColor: "var(--line)",
                    background: "var(--background)",
                  }
            }
          >
            <ThinIcon
              name={step.icon}
              className="h-4 w-4 shrink-0 text-quiet"
            />
            <p className="text-[0.95rem] font-medium leading-6 text-foreground">
              {step.label}
            </p>
          </div>
          {index < FLOW.length - 1 ? (
            <div aria-hidden="true" className="flex items-center text-quiet">
              <span className="lg:hidden">↓</span>
              <ModalIcon
                name="arrow-right"
                className="hidden h-4 w-4 lg:block"
              />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function OverviewTab({ data }: { data: IfnhPreviewData }) {
  const connectionGap = data.funnel.steps[1].value - data.funnel.steps[2].value;
  const seatingWidth = (data.capacity.usable / data.capacity.demand) * 100;

  return (
    <div className="space-y-10">
      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.88fr]">
        <div>
          <ModalSectionLabel>Engagement conversion gap</ModalSectionLabel>
          <div className="mt-5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center">
            <ConversionStep step={data.funnel.steps[0]} stepNumber={1} />
            <SequenceConnector />
            <ConversionStep step={data.funnel.steps[1]} stepNumber={2} />
            <SequenceConnector badge={`-${connectionGap} pts`} />
            <ConversionStep
              step={data.funnel.steps[2]}
              stepNumber={3}
              emphasized
            />
          </div>
        </div>

        <aside className="border border-line bg-background p-5 sm:p-6">
          <p className="text-[0.72rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
            30-point connection gap
          </p>
          <p className="mt-3 font-display text-[2.4rem] font-medium leading-[0.95] text-foreground sm:text-[2.9rem]">
            {connectionGap}-point
          </p>
          <p className="mt-1 text-sm font-medium uppercase leading-5 tracking-[0.14em] text-quiet">
            connection gap
          </p>
          <p className="mt-5 text-[0.95rem] leading-7 text-muted">
            Interest was present, but the environment did not consistently
            convert openness into interaction.
          </p>
        </aside>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.18fr_0.82fr]">
        <div className="border border-line bg-background p-5 sm:p-6">
          <ModalSectionLabel>Capacity pressure</ModalSectionLabel>
          <div className="mt-6 space-y-5">
            <CapacityComparison
              label="Usable seating"
              value={data.capacity.usable}
              widthPct={seatingWidth}
              tone="neutral"
            />
            <CapacityComparison
              label="Modeled peak demand"
              value={data.capacity.demand}
              widthPct={100}
              tone="accent"
            />
          </div>
        </div>

        <aside className="border border-line bg-background p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="inline-flex items-center border px-3 py-1 text-[0.72rem] font-medium uppercase leading-4 tracking-[0.14em]"
              style={{
                borderColor: BLUE_LINE,
                background: BLUE_SOFT,
                color: BLUE_ACCENT,
              }}
            >
              +{data.capacity.overage} seat shortfall
            </span>
          </div>
          <p className="mt-5 text-[0.95rem] leading-7 text-muted">
            Peak demand exceeded usable seating, making space layout part of the
            engagement problem.
          </p>
        </aside>
      </section>
    </div>
  );
}

function ConversionStep({
  step,
  stepNumber,
  emphasized = false,
}: {
  step: IfnhPreviewData["funnel"]["steps"][number];
  stepNumber: number;
  emphasized?: boolean;
}) {
  return (
    <div
      className="border p-5"
      style={
        emphasized
          ? {
              borderColor: BLUE_LINE,
              background: BLUE_SOFT,
            }
          : {
              borderColor: "var(--line)",
              background: "var(--background)",
            }
      }
    >
      <p className="text-[0.65rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet">
        Step {String(stepNumber).padStart(2, "0")}
      </p>
      <p className="mt-3 font-display text-[2.5rem] font-medium leading-none text-foreground">
        {step.value}%
      </p>
      <p className="mt-3 text-sm font-medium leading-5 text-foreground">
        {step.label}
      </p>
      <p className="mt-1 text-sm leading-6 text-muted">{step.sublabel}</p>
      <div className="mt-4 h-2 bg-foreground/[0.05]">
        <div
          aria-hidden="true"
          className="h-full"
          style={{
            width: `${step.value}%`,
            background: emphasized ? BLUE_ACCENT : "rgba(72, 38, 29, 0.22)",
          }}
        />
      </div>
    </div>
  );
}

function SequenceConnector({ badge }: { badge?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 text-quiet lg:flex-col">
      {badge ? (
        <span
          className="inline-flex items-center border px-2 py-1 text-[0.65rem] font-medium uppercase leading-4 tracking-[0.14em]"
          style={{
            borderColor: BLUE_LINE,
            background: BLUE_SOFT,
            color: BLUE_ACCENT,
          }}
        >
          {badge}
        </span>
      ) : null}
      <span aria-hidden="true" className="lg:hidden">
        ↓
      </span>
      <ModalIcon name="arrow-right" className="hidden h-4 w-4 lg:block" />
    </div>
  );
}

function CapacityComparison({
  label,
  value,
  widthPct,
  tone,
}: {
  label: string;
  value: number;
  widthPct: number;
  tone: "neutral" | "accent";
}) {
  const isAccent = tone === "accent";

  return (
    <div className="space-y-2">
      <div className="flex items-end justify-between gap-4">
        <p className="text-sm font-medium leading-5 text-foreground">{label}</p>
        <p className="font-display text-2xl font-medium leading-none text-foreground">
          {value}
        </p>
      </div>
      <div className="h-3 bg-foreground/[0.05]">
        <div
          aria-hidden="true"
          className="h-full transition-all duration-500"
          style={{
            width: `${widthPct}%`,
            background: isAccent ? BLUE_ACCENT : "rgba(72, 38, 29, 0.2)",
          }}
        />
      </div>
    </div>
  );
}

function ScenarioLabTab({ data }: { data: IfnhPreviewData }) {
  const [usableSeats, setUsableSeats] = useState<number>(data.capacity.usable);
  const [expected, setExpected] = useState<number>(data.capacity.demand);
  const [interactionGoal, setInteractionGoal] = useState<Level>("Medium");
  const [effort, setEffort] = useState<Level>("Medium");

  const { gap, seatingFit, recommendation, rationale } = useMemo(() => {
    const gap = expected - usableSeats;
    let seatingFit: "Low" | "Moderate" | "Strong";
    if (gap >= 20) seatingFit = "Low";
    else if (gap > 0) seatingFit = "Moderate";
    else seatingFit = "Strong";

    let recommendation: ScenarioStrategy;
    if (gap >= 20 || interactionGoal === "High") {
      recommendation = "Seating + programming test";
    } else if (gap > 0 || interactionGoal === "Medium") {
      recommendation = "Flexible seating adjustment";
    } else {
      recommendation = "Current layout";
    }

    let rationale: string;
    if (recommendation === "Seating + programming test") {
      rationale =
        "Peak demand exceeds usable seating, so the strongest option pairs layout adjustments with low-pressure interaction programming.";
    } else if (recommendation === "Flexible seating adjustment") {
      rationale =
        "Capacity is close to demand. Reconfigurable seating should be tested before adding a larger programming intervention.";
    } else {
      rationale =
        "Current layout meets modeled demand with room to spare. Maintain the setup and monitor whether interaction improves.";
    }

    return { gap, seatingFit, recommendation, rationale };
  }, [usableSeats, expected, interactionGoal]);

  const gapLabel =
    gap > 0
      ? `${gap} seat shortfall`
      : gap < 0
        ? `${Math.abs(gap)} seat surplus`
        : "At capacity";

  return (
    <section>
      <ModalSectionLabel>Scenario lab</ModalSectionLabel>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
        Adjust seating, expected demand, and goals to test how the recommended
        strategy changes.
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
        <div className="space-y-6 border border-line bg-background p-5 sm:p-6">
          <SliderControl
            label="Usable seats"
            min={100}
            max={220}
            value={usableSeats}
            onChange={setUsableSeats}
          />
          <SliderControl
            label="Expected students"
            min={100}
            max={240}
            value={expected}
            onChange={setExpected}
          />
          <SegmentedControl
            label="Interaction goal"
            value={interactionGoal}
            onChange={setInteractionGoal}
          />
          <SegmentedControl
            label="Programming effort"
            value={effort}
            onChange={setEffort}
          />
        </div>

        <div className="space-y-5 border border-line bg-background p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center border border-line text-foreground">
              <ThinIcon name="spark" className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[0.72rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
                Scenario result
              </p>
              <p className="mt-2 font-display text-2xl font-medium leading-tight text-foreground sm:text-[1.7rem]">
                {gapLabel}
              </p>
            </div>
          </div>

          <dl className="divide-y divide-line border-y border-line">
            <ScenarioStatusRow label="Seat gap / surplus" value={gapLabel} />
            <ScenarioStatusRow label="Seating fit" value={seatingFit} />
            <ScenarioStatusRow
              label="Recommended strategy"
              value={recommendation}
            />
          </dl>

          <div
            className="border px-4 py-4 sm:px-5"
            style={{
              borderColor: "var(--sage-line)",
              background: "var(--sage-soft)",
            }}
          >
            <div className="flex items-center gap-2 text-foreground">
              <ThinIcon name="spark" className="h-4 w-4" />
              <p className="text-[0.72rem] font-medium uppercase leading-5 tracking-[0.18em]">
                Recommended strategy
              </p>
            </div>
            <p className="mt-2 font-display text-2xl font-medium leading-tight text-foreground">
              {recommendation}
            </p>
            <p className="mt-3 text-[0.95rem] leading-7 text-muted">
              {rationale}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-3">
        {STRATEGY_OPTIONS.map((option) => {
          const isRecommended = option.name === recommendation;
          return (
            <article
              key={option.name}
              className="border p-5"
              style={
                isRecommended
                  ? {
                      borderColor: "var(--sage-line)",
                      background: "var(--sage-soft)",
                    }
                  : {
                      borderColor: "var(--line)",
                      background: "var(--background)",
                    }
              }
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium leading-5 text-foreground">
                  {option.name}
                </p>
                {isRecommended ? (
                  <span className="text-[0.65rem] font-medium uppercase leading-4 tracking-[0.14em] text-quiet">
                    Recommended
                  </span>
                ) : null}
              </div>
              <div className="mt-4 space-y-3">
                <ScenarioCardRow label="Seating fit" value={option.fit} />
                <ScenarioCardRow
                  label="Interaction goal"
                  value={option.interaction}
                />
                <ScenarioCardRow
                  label="Programming effort"
                  value={option.effort}
                />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function SliderControl({
  label,
  min,
  max,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label className="inline-flex items-center gap-1.5 text-[0.75rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet">
          <ModalIcon name="sliders" className="h-4 w-4" />
          <span>{label}</span>
        </label>
        <span className="font-display text-2xl font-medium leading-none text-foreground">
          {value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="ifnh-slider mt-3 w-full"
        style={{ accentColor: BLUE_ACCENT }}
        aria-label={label}
      />
      <div className="mt-1 flex justify-between text-[0.75rem] uppercase leading-5 tracking-[0.14em] text-quiet">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

function SegmentedControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: Level;
  onChange: (value: Level) => void;
}) {
  const options: Level[] = ["Low", "Medium", "High"];

  return (
    <div>
      <p className="inline-flex items-center gap-1.5 text-[0.75rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet">
        <ModalIcon name="target" className="h-4 w-4" />
        <span>{label}</span>
      </p>
      <div
        role="radiogroup"
        aria-label={label}
        className="mt-2 inline-flex border border-line"
      >
        {options.map((option) => {
          const active = option === value;
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(option)}
              className="focus-ring px-3 py-1.5 text-sm font-medium leading-5 transition motion-reduce:transition-none sm:px-4"
              style={{
                background: active ? "var(--foreground)" : "transparent",
                color: active ? "var(--background)" : "var(--foreground)",
                borderRight:
                  option !== "High" ? "1px solid var(--line)" : undefined,
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ScenarioStatusRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <dt className="text-[0.72rem] font-medium uppercase leading-5 tracking-[0.14em] text-quiet">
        {label}
      </dt>
      <dd className="text-right text-sm font-medium leading-5 text-foreground">
        {value}
      </dd>
    </div>
  );
}

function ScenarioCardRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-line pt-3">
      <span className="text-[0.72rem] font-medium uppercase leading-4 tracking-[0.14em] text-quiet">
        {label}
      </span>
      <span className="text-sm font-medium leading-5 text-foreground">
        {value}
      </span>
    </div>
  );
}

function StudentInsightsTab() {
  return (
    <section>
      <ModalSectionLabel>Student insights</ModalSectionLabel>
      <p className="mt-3 max-w-2xl text-[0.95rem] leading-7 text-muted">
        Themes from the survey point to where space and programming can better
        convert openness into actual interaction.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {THEMES.map((theme) => (
          <article
            key={theme.title}
            className="border border-line bg-background p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5 text-foreground">
                <ThinIcon name={theme.icon} className="h-4 w-4 text-quiet" />
                <h3 className="font-display text-lg font-medium leading-tight">
                  {theme.title}
                </h3>
              </div>
              <span className="text-[0.65rem] font-medium uppercase leading-4 tracking-[0.14em] text-quiet">
                {theme.signal}
              </span>
            </div>
            <p className="mt-3 text-[0.95rem] leading-7 text-muted">
              {theme.body}
            </p>
            <div className="mt-5">
              <SignalBar level={theme.signal} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SignalBar({ level }: { level: SignalLevel }) {
  const filled = level === "High signal" ? 4 : 3;

  return (
    <div aria-hidden="true" className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className="h-2 flex-1"
          style={{
            background: index < filled ? BLUE_ACCENT : "rgba(72, 38, 29, 0.08)",
          }}
        />
      ))}
    </div>
  );
}

function RecommendationTab() {
  return (
    <section>
      <div className="grid gap-8 xl:grid-cols-[1.12fr_0.88fr]">
        <div>
          <ModalSectionLabel>Recommended path</ModalSectionLabel>
          <ol className="mt-6 space-y-5">
            {ROADMAP.map((step, index) => (
              <li
                key={step.title}
                className="grid grid-cols-[2.25rem_1fr] items-start gap-4 border-t border-line pt-5"
              >
                <span
                  className="font-display text-2xl font-medium leading-none text-quiet"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl font-medium leading-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-7 text-muted">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <aside className="border border-line bg-background p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center border border-line text-foreground">
              <ThinIcon name="spark" className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[0.72rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
                Recommended scenario
              </p>
              <p className="mt-2 font-display text-2xl font-medium leading-tight text-foreground sm:text-[1.7rem]">
                Seating + programming test
              </p>
            </div>
          </div>
          <div className="mt-5 border-t border-line pt-5">
            <p className="text-[0.72rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
              Why
            </p>
            <p className="mt-2 text-[0.95rem] leading-7 text-muted">
              This option addresses both the +30 seat shortfall and the 30-point
              connection gap.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function SkillsImpactSection() {
  return (
    <section className="border-t border-line pt-10">
      <div className="grid gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-12">
        <NumberedListColumn heading="Skills used:" items={SKILLS} />
        <div
          aria-hidden="true"
          className="hidden self-stretch text-quiet lg:flex lg:items-center"
        >
          <ModalIcon name="arrow-right" className="h-5 w-5" />
        </div>
        <NumberedListColumn heading="Impact created:" items={IMPACTS} />
      </div>
    </section>
  );
}

function NumberedListColumn({
  heading,
  items,
}: {
  heading: string;
  items: readonly string[];
}) {
  return (
    <div>
      <p className="text-[0.75rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
        {heading}
      </p>
      <ol className="mt-5 space-y-5">
        {items.map((item, index) => (
          <li
            key={item}
            className="grid grid-cols-[2.1rem_1fr] items-start gap-3 border-t border-line pt-4"
          >
            <span
              className="font-display text-2xl font-medium leading-none text-quiet"
              aria-hidden="true"
            >
              {index + 1}.
            </span>
            <p className="text-[0.95rem] font-medium leading-6 text-foreground">
              {item}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
