"use client";

import { useMemo, useState } from "react";
import type { IfnhPreviewData } from "@/lib/ifnh-preview-data";
import {
  ModalArrow,
  ModalSectionLabel,
  ModalTabs,
  ProjectModalShell,
  SkillsImpactColumns,
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

const TABS: Array<{ id: TabId; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "scenario", label: "Scenario Lab" },
  { id: "insights", label: "Student Insights" },
  { id: "recommendation", label: "Recommendation" },
];

const FLOW: string[] = [
  "Survey responses",
  "Conversion gap",
  "Capacity scenario",
  "Recommended path",
];

const KPI_ITEMS: Array<{ label: string; value: string }> = [
  { label: "Survey responses", value: "105" },
  { label: "Regular visitors", value: "78%" },
  { label: "Open to meeting", value: "67%" },
  { label: "Met someone new", value: "37%" },
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
}> = [
  {
    title: "Low-pressure connection",
    body: "Students were open to meeting others, but needed easier social entry points.",
    signal: "High signal",
  },
  {
    title: "Intent vs. action gap",
    body: "Many students were open to interaction, but fewer actually met someone new.",
    signal: "High signal",
  },
  {
    title: "Space as a constraint",
    body: "Peak demand exceeded usable seating, making layout and flow part of the engagement problem.",
    signal: "Medium signal",
  },
  {
    title: "Programming opportunity",
    body: "Small structured prompts or events could turn passive presence into connection.",
    signal: "Medium signal",
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
  {
    title: "Survey analysis",
    detail:
      "Read student response patterns across behavior, openness, and environmental constraints.",
  },
  {
    title: "Capacity modeling",
    detail:
      "Compared usable seating against modeled peak demand to clarify where space pressure showed up.",
  },
  {
    title: "Recommendation design",
    detail:
      "Translated signal patterns into layout and programming actions the team could test next.",
  },
] as const;

const IMPACTS = [
  {
    title: "Identified the 30-point connection gap",
    detail:
      "Showed where social openness existed without converting into actual interaction.",
  },
  {
    title: "Modeled a +30 seat peak shortfall",
    detail:
      "Made layout capacity part of the decision instead of treating it as background context.",
  },
  {
    title: "Prioritized space and programming changes",
    detail:
      "Focused the next steps on the changes most likely to improve connection and comfort.",
  },
] as const;

const ACCENT = "var(--accent)";
const ACCENT_SOFT = "var(--accent-soft)";
const ACCENT_LINE = "var(--sage-line)";

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
          className="mt-6"
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

function IfnhKpiStrip({
  items,
}: {
  items: Array<{ label: string; value: string }>;
}) {
  return (
    <div className="grid gap-x-8 gap-y-6 border-y border-line py-7 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label}>
          <p className="font-display text-4xl font-medium leading-none text-foreground lg:text-[2.75rem]">
            {item.value}
          </p>
          <p className="mt-2 text-[0.75rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}

function InsightFlow() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3 text-foreground">
      {FLOW.map((label, index) => (
        <span key={label} className="inline-flex items-center gap-4">
          <span
            className="text-[0.95rem] font-medium leading-6"
            style={
              index === FLOW.length - 1
                ? { color: "var(--sage-deep)" }
                : undefined
            }
          >
            {label}
          </span>
          {index < FLOW.length - 1 ? <ModalArrow /> : null}
        </span>
      ))}
    </div>
  );
}

function OverviewTab({ data }: { data: IfnhPreviewData }) {
  const connectionGap = data.funnel.steps[1].value - data.funnel.steps[2].value;
  const seatingWidth = (data.capacity.usable / data.capacity.demand) * 100;

  return (
    <div className="space-y-8">
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
          <p className="font-display text-[2.4rem] font-medium leading-[0.95] text-foreground sm:text-[2.9rem]">
            {connectionGap}-point gap
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
          <p
            className="font-display text-[2.4rem] font-medium leading-[0.95] sm:text-[2.9rem]"
            style={{ color: "var(--sage-deep)" }}
          >
            +{data.capacity.overage} seats
          </p>
          <p className="mt-2 text-sm font-medium uppercase leading-5 tracking-[0.14em] text-quiet">
            Peak shortfall
          </p>
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
              borderColor: ACCENT_LINE,
              background: ACCENT_SOFT,
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
            background: emphasized ? ACCENT : "rgba(72, 38, 29, 0.22)",
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
            borderColor: ACCENT_LINE,
            background: ACCENT_SOFT,
            color: "var(--sage-deep)",
          }}
        >
          {badge}
        </span>
      ) : null}
      <span aria-hidden="true" className="hidden lg:inline-flex">
        <ModalArrow />
      </span>
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
            background: isAccent ? ACCENT : "rgba(72, 38, 29, 0.2)",
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
    <section className="space-y-6">
      <p className="max-w-2xl text-sm leading-6 text-muted">
        Adjust seating, expected demand, and goals to test how the recommended
        strategy changes.
      </p>

      <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
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

        <div className="space-y-6 border border-line bg-background p-5 sm:p-6">
          <div>
            <p className="font-display text-[2rem] font-medium leading-tight text-foreground sm:text-[2.4rem]">
              {gapLabel}
            </p>
            <p className="mt-3 text-[0.95rem] leading-7 text-muted">
              {rationale}
            </p>
          </div>

          <dl className="divide-y divide-line border-y border-line">
            <ScenarioStatusRow label="Seating fit" value={seatingFit} />
            <ScenarioStatusRow
              label="Recommended strategy"
              value={recommendation}
            />
          </dl>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
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
        <label className="text-[0.75rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet">
          {label}
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
        style={{ accentColor: ACCENT }}
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
      <p className="text-[0.75rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet">
        {label}
      </p>
      <div
        role="radiogroup"
        aria-label={label}
        className="mt-2 inline-flex gap-1"
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
      <p className="max-w-2xl text-[0.95rem] leading-7 text-muted">
        Themes from the survey point to where space and programming can better
        convert openness into actual interaction.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {THEMES.map((theme) => (
          <article
            key={theme.title}
            className="border border-line bg-background p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-lg font-medium leading-tight text-foreground">
                {theme.title}
              </h3>
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
            background: index < filled ? ACCENT : "rgba(72, 38, 29, 0.08)",
          }}
        />
      ))}
    </div>
  );
}

function RecommendationTab() {
  return (
    <section className="grid items-start gap-6 xl:grid-cols-[1.08fr_0.92fr] xl:gap-8">
      <ol className="border-y border-line">
        {ROADMAP.map((step, index) => (
          <li
            key={step.title}
            className={`grid grid-cols-[2.25rem_1fr] items-start gap-4 py-5 ${
              index === 0 ? "" : "border-t border-line"
            }`}
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

      <aside
        className="self-start border px-5 py-5 sm:px-6 sm:py-6"
        style={{
          borderColor: ACCENT_LINE,
          background: ACCENT_SOFT,
        }}
      >
        <p className="text-[0.72rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet">
          Recommended path
        </p>
        <p
          className="mt-4 font-display text-[1.8rem] font-medium leading-tight sm:text-[2rem]"
          style={{ color: "var(--sage-deep)" }}
        >
          Seating + programming test
        </p>
        <p className="mt-4 text-[0.95rem] leading-7 text-muted">
          Addresses both the +30 seat shortfall and the 30-point connection
          gap in one paired intervention.
        </p>
      </aside>
    </section>
  );
}

function SkillsImpactSection() {
  return <SkillsImpactColumns skills={[...SKILLS]} impact={[...IMPACTS]} />;
}
