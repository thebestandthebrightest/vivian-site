"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { IfnhPreviewData } from "@/lib/ifnh-preview-data";
import {
  KpiStrip,
  ModalIcon,
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

const TABS: Array<{ id: TabId; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "scenario", label: "Scenario Lab" },
  { id: "insights", label: "Student Insights" },
  { id: "recommendation", label: "Recommendation" },
];

const FLOW = [
  { icon: "clipboard" as const, label: "Survey responses" },
  { icon: "bar-chart" as const, label: "Engagement gap" },
  { icon: "sliders" as const, label: "Scenario model" },
  { icon: "target" as const, label: "Recommended action" },
];

export function IfnhProjectModal({
  data,
  isOpen,
  onClose,
}: IfnhProjectModalProps) {
  const [tab, setTab] = useState<TabId>("overview");

  const kpis = [
    { label: "Survey responses", value: "105", icon: "clipboard" as const },
    { label: "Regular visitors", value: "78%", icon: "calendar-check" as const },
    { label: "Open to meeting", value: "67%", icon: "users" as const },
    { label: "Met someone new", value: "37%", icon: "message-square" as const },
  ];

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
          <KpiStrip items={kpis} />
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

function InsightFlow() {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
      {FLOW.map((step, index) => (
        <div key={step.label} className="flex flex-1 items-stretch gap-3">
          <div
            className="flex flex-1 items-center gap-3 border border-line px-4 py-4"
            style={
              index === FLOW.length - 1
                ? { borderColor: "var(--sage-line)", background: "var(--sage-soft)" }
                : { background: "var(--background)" }
            }
          >
            <ModalIcon name={step.icon} className="h-4 w-4 shrink-0 text-quiet" />
            <p className="text-[0.95rem] font-medium leading-6 text-foreground">
              {step.label}
            </p>
          </div>
          {index < FLOW.length - 1 ? (
            <div aria-hidden="true" className="flex items-center text-quiet">
              <span className="lg:hidden">↓</span>
              <ModalIcon name="arrow-right" className="hidden h-4 w-4 lg:block" />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

// ── Overview ──────────────────────────────────────────────────────────────────

function OverviewTab({ data }: { data: IfnhPreviewData }) {
  return (
    <>
      <section>
        <ModalSectionLabel>Engagement conversion gap</ModalSectionLabel>
        <div className="mt-5 space-y-2">
          {data.funnel.steps.map((step, idx) => {
            const isLast = idx === data.funnel.steps.length - 1;
            const width = Math.max(step.value, 25);
            return (
              <div key={step.label}>
                <div
                  className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-4"
                  style={{
                    width: `${width}%`,
                    background: isLast
                      ? "var(--accent-soft)"
                      : "rgba(72,38,29,0.06)",
                    border: isLast
                      ? "1px solid var(--accent)"
                      : "1px solid var(--line)",
                  }}
                >
                  <p className="text-sm font-medium leading-5 text-foreground">
                    {step.label}
                  </p>
                  <p className="font-display text-2xl font-medium leading-none text-foreground sm:text-3xl">
                    {step.value}%
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-5 flex flex-wrap items-baseline gap-3">
          <p
            className="font-display text-3xl font-medium leading-none text-foreground"
            style={{ background: "var(--accent-soft)", padding: "0 0.25em" }}
          >
            30-point
          </p>
          <p className="text-[0.95rem] leading-6 text-muted">connection gap</p>
        </div>
        <p className="mt-3 max-w-2xl text-[0.95rem] leading-7 text-muted">
          Interest was present, but the environment did not consistently
          convert openness into interaction.
        </p>
      </section>

      <section>
        <ModalSectionLabel>Capacity pressure</ModalSectionLabel>
        <div className="mt-5 space-y-3">
          <CapacityRow
            label="Usable seating"
            value={`${data.capacity.usable}`}
            widthPct={(data.capacity.usable / data.capacity.demand) * 100}
            color="rgba(72,38,29,0.3)"
          />
          <CapacityRow
            label="Modeled peak demand"
            value={`${data.capacity.demand}`}
            widthPct={100}
            color="var(--accent)"
          />
        </div>
        <div className="mt-4 flex items-baseline gap-3">
          <p
            className="font-display text-3xl font-medium leading-none text-foreground"
            style={{ background: "var(--accent-soft)", padding: "0 0.25em" }}
          >
            +{data.capacity.overage}
          </p>
          <p className="text-[0.95rem] leading-6 text-muted">
            seat shortfall at peak
          </p>
        </div>
      </section>
    </>
  );
}

function CapacityRow({
  label,
  value,
  widthPct,
  color,
}: {
  label: string;
  value: string;
  widthPct: number;
  color: string;
}) {
  return (
    <div className="grid grid-cols-[minmax(9rem,12rem)_1fr_3rem] items-center gap-4">
      <p className="text-sm font-medium leading-6 text-foreground">{label}</p>
      <div className="h-3 bg-foreground/[0.05]">
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${widthPct}%`, background: color }}
          aria-hidden="true"
        />
      </div>
      <p className="text-right text-sm font-medium leading-5 text-foreground">
        {value}
      </p>
    </div>
  );
}

// ── Scenario Lab ──────────────────────────────────────────────────────────────

type ScenarioStrategy =
  | "Current layout"
  | "Flexible seating adjustment"
  | "Seating + programming test";

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
        "Peak demand exceeds usable seating, so the strongest option pairs flexible layout changes with low-pressure interaction programming.";
    } else if (recommendation === "Flexible seating adjustment") {
      rationale =
        "Capacity is close to demand. Reconfigurable seating absorbs peak pressure without committing to new programming.";
    } else {
      rationale =
        "Current layout meets modeled demand with room to spare. Hold steady and monitor before investing further.";
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
        Adjust seating, expected demand, and goals to see how the recommended
        strategy shifts.
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div className="space-y-6">
          <SliderControl
            label="Usable seats"
            min={100}
            max={220}
            value={usableSeats}
            onChange={setUsableSeats}
          />
          <SliderControl
            label="Expected students at peak"
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

        <div
          className="flex flex-col gap-5 border border-line p-5 sm:p-6"
          style={{ background: "var(--sage-soft)" }}
        >
          <div>
            <p className="text-[0.75rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
              Recommended strategy
            </p>
            <p className="mt-2 font-display text-2xl font-medium leading-tight text-foreground sm:text-[1.65rem]">
              {recommendation}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 border-t border-line pt-4">
            <ScenarioStat label="Seat gap" value={gapLabel} />
            <ScenarioStat label="Seating fit" value={seatingFit} />
            <ScenarioStat label="Effort" value={effort} />
          </div>
          <p className="text-[0.95rem] leading-7 text-muted">{rationale}</p>
        </div>
      </div>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-left">
          <thead>
            <tr className="text-[0.75rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet">
              <th className="border-b border-line pb-3 pr-4 font-medium">
                Scenario
              </th>
              <th className="border-b border-line pb-3 pr-4 font-medium">
                Seating fit
              </th>
              <th className="border-b border-line pb-3 pr-4 font-medium">
                Interaction
              </th>
              <th className="border-b border-line pb-3 font-medium">Effort</th>
            </tr>
          </thead>
          <tbody>
            {([
              {
                name: "Current layout",
                fit: "Low",
                interaction: "Low",
                effortLabel: "—",
              },
              {
                name: "Flexible seating adjustment",
                fit: "Moderate",
                interaction: "Medium",
                effortLabel: "Medium",
              },
              {
                name: "Seating + programming test",
                fit: "Strong",
                interaction: "High",
                effortLabel: "Medium",
              },
            ] as const).map((s) => {
              const isRecommended = s.name === recommendation;
              return (
                <tr
                  key={s.name}
                  className="text-[0.95rem] leading-6 text-foreground"
                  style={
                    isRecommended
                      ? { background: "var(--sage-soft)" }
                      : undefined
                  }
                >
                  <td className="border-b border-line py-3 pr-4 align-middle">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{s.name}</span>
                      {isRecommended ? (
                        <span
                          className="text-[0.72rem] font-medium uppercase leading-4 tracking-[0.14em]"
                          style={{ color: "rgba(72,38,29,0.7)" }}
                        >
                          Recommended
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td className="border-b border-line py-3 pr-4 align-middle">
                    <Tag>{s.fit}</Tag>
                  </td>
                  <td className="border-b border-line py-3 pr-4 align-middle">
                    <Tag>{s.interaction}</Tag>
                  </td>
                  <td className="border-b border-line py-3 align-middle">
                    <Tag>{s.effortLabel}</Tag>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
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
        onChange={(e) => onChange(Number(e.target.value))}
        className="ifnh-slider mt-3 w-full"
        style={{ accentColor: "var(--accent)" }}
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
  onChange: (v: Level) => void;
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
        {options.map((opt) => {
          const active = opt === value;
          return (
            <button
              key={opt}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(opt)}
              className="focus-ring px-3 py-1.5 text-sm font-medium leading-5 transition motion-reduce:transition-none sm:px-4"
              style={{
                background: active ? "var(--foreground)" : "transparent",
                color: active ? "var(--background)" : "var(--foreground)",
                borderRight:
                  opt !== "High" ? "1px solid var(--line)" : undefined,
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ScenarioStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[0.72rem] font-medium uppercase leading-5 tracking-[0.14em] text-quiet">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium leading-5 text-foreground">
        {value}
      </p>
    </div>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center border border-line px-2 py-1 text-[0.75rem] font-medium uppercase leading-4 tracking-[0.12em] text-foreground">
      {children}
    </span>
  );
}

// ── Student Insights ──────────────────────────────────────────────────────────

const THEMES: Array<{
  title: string;
  body: string;
  signal: "High signal" | "Medium signal";
  Icon: (props: IconProps) => ReactNode;
}> = [
  {
    title: "Low-pressure connection",
    body: "Students were open to meeting others, but needed easier social entry points.",
    signal: "High signal",
    Icon: MessageSquareIcon,
  },
  {
    title: "Intent vs. action gap",
    body: "Many students were open to interaction, but fewer actually met someone new.",
    signal: "High signal",
    Icon: UsersIcon,
  },
  {
    title: "Space as a constraint",
    body: "Peak demand exceeded usable seating, making layout and flow part of the engagement problem.",
    signal: "Medium signal",
    Icon: LayoutIcon,
  },
  {
    title: "Programming opportunity",
    body: "Small structured prompts or events could turn passive presence into connection.",
    signal: "Medium signal",
    Icon: LightbulbIcon,
  },
];

function StudentInsightsTab() {
  return (
    <section>
      <ModalSectionLabel>Student insights</ModalSectionLabel>
      <p className="mt-3 max-w-2xl text-[0.95rem] leading-7 text-muted">
        Qualitative themes synthesized from open-text responses and behavior
        patterns in the survey.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {THEMES.map((theme) => (
          <article
            key={theme.title}
            className="flex flex-col gap-3 border-t border-line pt-5"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-foreground">
                <theme.Icon />
                <h3 className="font-display text-lg font-medium leading-tight">
                  {theme.title}
                </h3>
              </div>
              <SignalMeter level={theme.signal} />
            </div>
            <p className="text-[0.95rem] leading-7 text-muted">{theme.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SignalMeter({ level }: { level: "High signal" | "Medium signal" }) {
  const filled = level === "High signal" ? 3 : 2;
  return (
    <div className="flex items-center gap-2">
      <span className="text-[0.72rem] font-medium uppercase leading-4 tracking-[0.14em] text-quiet">
        {level}
      </span>
      <div className="flex items-center gap-1" aria-hidden="true">
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className="block h-2 w-2 rounded-full"
            style={{
              background:
                i <= filled ? "var(--accent)" : "rgba(72,38,29,0.12)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Recommendation ────────────────────────────────────────────────────────────

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

function RecommendationTab() {
  return (
    <section>
      <ModalSectionLabel>From insight to action</ModalSectionLabel>
      <ol className="mt-6 space-y-5">
        {ROADMAP.map((step, idx) => (
          <li
            key={step.title}
            className="grid grid-cols-[2.25rem_1fr] items-start gap-4 border-t border-line pt-5"
          >
            <span
              className="font-display text-2xl font-medium leading-none text-quiet"
              aria-hidden="true"
            >
              {String(idx + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-display text-xl font-medium leading-tight text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-7 text-muted">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div
        className="mt-10 border border-line p-5 sm:p-6"
        style={{ background: "var(--sage-soft)" }}
      >
        <p className="text-[0.75rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
          Recommended scenario
        </p>
        <p className="mt-2 font-display text-2xl font-medium leading-tight text-foreground sm:text-[1.65rem]">
          Seating + programming test
        </p>
        <p className="mt-3 max-w-2xl text-[0.95rem] leading-7 text-muted">
          This option addresses both the +30 seat shortfall and the 30-point
          connection gap.
        </p>
      </div>
    </section>
  );
}

// ── Skills + Impact (single header) ──────────────────────────────────────────

const SKILLS: Array<{ title: string; body: string }> = [
  {
    title: "Survey analysis",
    body: "Interpreted student behavior patterns from 105 responses.",
  },
  {
    title: "Capacity modeling",
    body: "Compared usable seating against modeled peak demand.",
  },
  {
    title: "Recommendation design",
    body: "Turned survey and space constraints into program decisions.",
  },
];

const IMPACTS: Array<{ title: string; body: string }> = [
  {
    title: "Identified the 30-point connection gap",
    body: "Showed where student interest was not converting into actual interaction.",
  },
  {
    title: "Modeled peak seating shortfall",
    body: "Clarified when current space capacity may limit engagement.",
  },
  {
    title: "Prioritized space and programming changes",
    body: "Recommended flexible seating and low-pressure interaction prompts.",
  },
];

function SkillsImpactSection() {
  return (
    <SkillsImpactColumns
      accent="accent"
      skills={SKILLS.map((item, index) => ({
        title: item.title,
        detail: item.body,
        icon: (["clipboard", "sliders", "target"] as const)[index],
      }))}
      impact={IMPACTS.map((item, index) => ({
        title: item.title,
        detail: item.body,
        icon: (["bar-chart", "monitor", "check-circle"] as const)[index],
      }))}
    />
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────

type IconProps = { color?: string };

function MessageSquareIcon({ color = "currentColor" }: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function UsersIcon({ color = "currentColor" }: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function LayoutIcon({ color = "currentColor" }: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  );
}

function LightbulbIcon({ color = "currentColor" }: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-4 12.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26A7 7 0 0 0 12 2z" />
    </svg>
  );
}
