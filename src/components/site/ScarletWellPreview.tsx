"use client";

import { type KeyboardEvent, useMemo, useState } from "react";
import type { scarletWellPreview } from "@/lib/site-data";

type ScarletWellPreviewData = typeof scarletWellPreview;

type ScarletWellPreviewProps = {
  data: ScarletWellPreviewData;
};

const tabs = ["Overview", "Cohorts", "Planning", "Insights", "Forecasting"] as const;
type PreviewTab = (typeof tabs)[number];

function MetricBand({ metrics }: { metrics: ScarletWellPreviewData["metrics"] }) {
  return (
    <div className="grid border-y border-line sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric) => (
        <div
          key={`${metric.label}-${metric.value}`}
          className="border-b border-line py-4 last:border-b-0 sm:border-r sm:px-5 sm:nth-even:border-r-0 lg:nth-[3n]:border-r-0 lg:nth-last-[-n+3]:border-b-0"
        >
          <p className="text-[0.68rem] font-medium uppercase leading-4 tracking-[0.2em] text-quiet">
            {metric.label}
          </p>
          <p className="mt-2 font-display text-3xl font-medium leading-none text-foreground">
            {metric.value}
          </p>
        </div>
      ))}
    </div>
  );
}

function MiniLineChart() {
  const points = "8,76 58,66 108,72 158,38 208,45 258,24";

  return (
    <svg
      viewBox="0 0 266 96"
      role="img"
      aria-label="Small upward forecast line chart"
      className="h-28 w-full overflow-visible"
    >
      {[24, 48, 72].map((y) => (
        <line
          key={y}
          x1="0"
          x2="266"
          y1={y}
          y2={y}
          stroke="rgba(72, 38, 29, 0.12)"
          strokeWidth="1"
        />
      ))}
      <polyline
        points={points}
        fill="none"
        stroke="rgba(72, 38, 29, 0.74)"
        strokeWidth="1.5"
      />
      {points.split(" ").map((point) => {
        const [cx, cy] = point.split(",");
        return (
          <circle
            key={point}
            cx={cx}
            cy={cy}
            r="2.8"
            fill="#ffffff"
            stroke="rgba(72, 38, 29, 0.72)"
            strokeWidth="1"
          />
        );
      })}
    </svg>
  );
}

function BarComparison({
  rows,
}: {
  rows: ScarletWellPreviewData["cycleBars"];
}) {
  const maxReach = Math.max(...rows.map((row) => row.reach));

  return (
    <div className="space-y-4">
      {rows.map((row) => (
        <div key={row.label} className="grid gap-2 sm:grid-cols-[8rem_1fr_auto] sm:items-center">
          <p className="text-xs font-medium leading-5 text-muted">{row.label}</p>
          <div className="h-2 bg-foreground/[0.06]">
            <div
              className="h-full bg-foreground/45"
              style={{ width: `${Math.max((row.reach / maxReach) * 100, 10)}%` }}
            />
          </div>
          <p className="text-xs leading-5 text-quiet">
            {row.initiatives} initiatives / ${row.budget.toFixed(1)}K
          </p>
        </div>
      ))}
    </div>
  );
}

function PortfolioTable({
  rows,
}: {
  rows: ScarletWellPreviewData["programPortfolio"];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line text-[0.68rem] uppercase tracking-[0.18em] text-quiet">
            <th className="py-3 pr-4 font-medium">Program</th>
            <th className="py-3 pr-4 font-medium">Cycle</th>
            <th className="py-3 pr-4 font-medium">Reach</th>
            <th className="py-3 pr-4 font-medium">Budget</th>
            <th className="py-3 font-medium">Signal</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.name}-${row.cycle}`} className="border-b border-line/80 last:border-b-0">
              <td className="py-4 pr-4 font-medium text-foreground">{row.name}</td>
              <td className="py-4 pr-4 text-muted">{row.cycle}</td>
              <td className="py-4 pr-4 text-muted">{row.reach}</td>
              <td className="py-4 pr-4 text-muted">{row.budget}</td>
              <td className="py-4 text-muted">{row.signal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CohortTable({ rows }: { rows: ScarletWellPreviewData["cohortRows"] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[620px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line text-[0.68rem] uppercase tracking-[0.18em] text-quiet">
            {["Program", "Profile", "Cycle entry", "Reach", "Budget", "Efficiency"].map((heading) => (
              <th key={heading} className="py-3 pr-4 font-medium">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.program}-${row.cycleEntry}`} className="border-b border-line/80 last:border-b-0">
              <td className="py-4 pr-4 font-medium text-foreground">{row.program}</td>
              <td className="py-4 pr-4 text-muted">{row.profile}</td>
              <td className="py-4 pr-4 text-muted">{row.cycleEntry}</td>
              <td className="py-4 pr-4 text-muted">{row.reach}</td>
              <td className="py-4 pr-4 text-muted">{row.budget}</td>
              <td className="py-4 pr-4 text-muted">{row.efficiency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InsightRail({ children }: { children: React.ReactNode }) {
  return (
    <aside className="border-t border-line pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
      <p className="text-[0.68rem] font-medium uppercase leading-4 tracking-[0.2em] text-quiet">
        Operating signal
      </p>
      <div className="mt-4 text-sm leading-7 text-muted">{children}</div>
    </aside>
  );
}

function SectionTitle({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div>
      <p className="text-[0.68rem] font-medium uppercase leading-4 tracking-[0.2em] text-quiet">
        {eyebrow}
      </p>
      <h4 className="mt-2 font-display text-3xl font-medium leading-none text-foreground">
        {title}
      </h4>
    </div>
  );
}

function OverviewTab({ data }: ScarletWellPreviewProps) {
  return (
    <div className="grid gap-7 lg:grid-cols-[1.36fr_0.64fr]">
      <div className="space-y-8">
        <section>
          <SectionTitle eyebrow="Portfolio snapshot" title="All available cycles" />
          <div className="mt-5 grid border-y border-line sm:grid-cols-3">
            {data.portfolioSignals.map((signal) => (
              <div key={signal.label} className="border-b border-line py-4 sm:border-b-0 sm:border-r sm:px-4 sm:last:border-r-0">
                <p className="font-display text-3xl font-medium leading-none text-foreground">
                  {signal.value}
                </p>
                <p className="mt-2 text-xs font-medium leading-5 text-muted">
                  {signal.label}
                </p>
                <p className="text-xs leading-5 text-quiet">{signal.detail}</p>
              </div>
            ))}
          </div>
        </section>
        <section>
          <SectionTitle eyebrow="Grant cycle view" title="Initiatives, budget, and reach" />
          <div className="mt-5">
            <BarComparison rows={data.cycleBars} />
          </div>
        </section>
        <section>
          <SectionTitle eyebrow="Program portfolio" title="Selected comparison rows" />
          <div className="mt-3">
            <PortfolioTable rows={data.programPortfolio} />
          </div>
        </section>
      </div>
      <InsightRail>
        <p>
          Portfolio views connect participation, budget, and planning status so
          program performance can be compared across cycles.
        </p>
        <ul className="mt-5 space-y-3">
          {["Cycle/year breakdowns", "Program profile snapshots", "Final report readiness"].map((item) => (
            <li key={item} className="border-t border-line pt-3">
              {item}
            </li>
          ))}
        </ul>
      </InsightRail>
    </div>
  );
}

function CohortsTab({ data }: ScarletWellPreviewProps) {
  return (
    <div className="grid gap-7 lg:grid-cols-[1.36fr_0.64fr]">
      <div>
        <SectionTitle eyebrow="Cohort analytics" title="Repeat-recipient logic" />
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
          Repeat programs can be analyzed as cycle-specific entries while still
          appearing as unified program profiles.
        </p>
        <div className="mt-6">
          <CohortTable rows={data.cohortRows} />
        </div>
      </div>
      <InsightRail>
        <div className="grid grid-cols-2 gap-px border border-line bg-line">
          {["R1", "R2", "Profile", "Cycle"].map((item, index) => (
            <div key={item} className="bg-background p-4">
              <p className="font-display text-3xl font-medium leading-none text-foreground">
                {item}
              </p>
              <p className="mt-2 text-xs leading-5 text-muted">
                {index < 2 ? "analytics label" : "user-facing view"}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-5">
          Identity-linked profiles preserve continuity, while R1/R2 labels keep
          analytics honest at the cycle level.
        </p>
      </InsightRail>
    </div>
  );
}

function PlanningTab() {
  const [participants, setParticipants] = useState(120);
  const [budget, setBudget] = useState(3000);
  const [sessions, setSessions] = useState(8);

  const costPerParticipant = budget / Math.max(participants, 1);
  const participantsPerSession = participants / Math.max(sessions, 1);

  const recommendation = useMemo(() => {
    if (participantsPerSession > 18 && sessions < 10) {
      return "Capacity pressure: consider additional sessions or a smaller target cohort.";
    }

    if (costPerParticipant <= 25 && participantsPerSession <= 16) {
      return "Efficient reach: assumptions are balanced for a lean planning cycle.";
    }

    if (costPerParticipant > 35) {
      return "Watch budget: clarify direct participant costs before final approval.";
    }

    return "Planning rhythm looks viable; confirm staffing and attendance tracking.";
  }, [costPerParticipant, participantsPerSession, sessions]);

  const controls = [
    {
      label: "Projected participants",
      value: participants,
      min: 40,
      max: 220,
      step: 5,
      onChange: setParticipants,
    },
    {
      label: "Budget",
      value: budget,
      min: 1000,
      max: 6000,
      step: 100,
      onChange: setBudget,
    },
    {
      label: "Sessions",
      value: sessions,
      min: 3,
      max: 16,
      step: 1,
      onChange: setSessions,
    },
  ];

  return (
    <div className="grid gap-7 lg:grid-cols-[1.1fr_0.9fr]">
      <section>
        <SectionTitle eyebrow="Scenario Lab" title="Planning assumptions" />
        <div className="mt-6 space-y-6">
          {controls.map((control) => (
            <label key={control.label} className="block">
              <span className="flex items-baseline justify-between gap-4">
                <span className="text-sm font-medium leading-6 text-foreground">
                  {control.label}
                </span>
                <span className="font-display text-2xl font-medium leading-none text-foreground">
                  {control.label === "Budget"
                    ? `$${control.value.toLocaleString()}`
                    : control.value}
                </span>
              </span>
              <input
                type="range"
                min={control.min}
                max={control.max}
                step={control.step}
                value={control.value}
                onChange={(event) => control.onChange(Number(event.target.value))}
                className="mt-3 h-1.5 w-full cursor-pointer accent-foreground"
              />
            </label>
          ))}
        </div>
      </section>
      <section className="border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
        <SectionTitle eyebrow="Calculated outputs" title="Operating fit" />
        <div className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-2">
          <div className="bg-background p-5">
            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-quiet">
              Cost / participant
            </p>
            <p className="mt-3 font-display text-4xl font-medium leading-none text-foreground">
              ${costPerParticipant.toFixed(2)}
            </p>
          </div>
          <div className="bg-background p-5">
            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-quiet">
              Participants / session
            </p>
            <p className="mt-3 font-display text-4xl font-medium leading-none text-foreground">
              {participantsPerSession.toFixed(1)}
            </p>
          </div>
        </div>
        <p className="mt-6 border-t border-line pt-5 text-sm leading-7 text-muted">
          {recommendation}
        </p>
      </section>
    </div>
  );
}

function InsightsTab({ data }: ScarletWellPreviewProps) {
  return (
    <div className="grid gap-7 lg:grid-cols-[1.15fr_0.85fr]">
      <section>
        <SectionTitle eyebrow="AI synthesis workflows" title="From reports to next steps" />
        <div className="mt-6 space-y-3">
          {data.insights.map((insight) => (
            <p key={insight} className="border-t border-line pt-4 text-sm leading-7 text-muted">
              {insight}
            </p>
          ))}
        </div>
      </section>
      <section className="border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
        <SectionTitle eyebrow="Recommendation checklist" title="Reporting readiness" />
        <ul className="mt-6 space-y-4">
          {data.recommendations.map((recommendation) => (
            <li key={recommendation} className="flex gap-3 border-t border-line pt-4 text-sm leading-7 text-muted">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-foreground/45" aria-hidden="true" />
              <span>{recommendation}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function ForecastingTab({ data }: ScarletWellPreviewProps) {
  return (
    <div className="grid gap-7 lg:grid-cols-[1.15fr_0.85fr]">
      <section>
        <SectionTitle eyebrow="Forecasting view" title="Historic participation to planned capacity" />
        <div className="mt-6 border-y border-line py-5">
          <MiniLineChart />
        </div>
        <p className="mt-5 text-sm leading-7 text-muted">
          Forecasting views help translate historic participation and planned
          capacity into clearer expectations for future cycles.
        </p>
      </section>
      <section className="border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
        <SectionTitle eyebrow="Scenario comparison" title="Planning range" />
        <div className="mt-6 space-y-4">
          {data.forecastScenarios.map((scenario) => (
            <div key={scenario.label} className="border-t border-line pt-4">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-sm font-medium text-foreground">{scenario.label}</p>
                <p className="text-xs leading-5 text-quiet">
                  {scenario.sessions} sessions
                </p>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted">
                {scenario.participants} participants / ${scenario.budget.toLocaleString()} budget
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 border-t border-line pt-5 text-sm leading-7 text-muted">
          Preserve conservative and stretch views so planning decisions can be
          discussed before budgets and staffing are locked.
        </p>
      </section>
    </div>
  );
}

function TabPanel({ activeTab, data }: { activeTab: PreviewTab; data: ScarletWellPreviewData }) {
  if (activeTab === "Cohorts") return <CohortsTab data={data} />;
  if (activeTab === "Planning") return <PlanningTab />;
  if (activeTab === "Insights") return <InsightsTab data={data} />;
  if (activeTab === "Forecasting") return <ForecastingTab data={data} />;
  return <OverviewTab data={data} />;
}

export function ScarletWellPreview({ data }: ScarletWellPreviewProps) {
  const [activeTab, setActiveTab] = useState<PreviewTab>("Overview");
  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const currentIndex = tabs.indexOf(activeTab);
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    const nextTab = tabs[nextIndex];
    setActiveTab(nextTab);
    document.getElementById(`scarletwell-tab-${nextTab.toLowerCase()}`)?.focus();
  };

  return (
    <div className="border-t border-line bg-background px-0 pb-10 pt-8 sm:pt-10">
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
        <div>
          <p className="text-[0.68rem] font-medium uppercase leading-4 tracking-[0.2em] text-quiet">
            {data.eyebrow}
          </p>
          <h3 className="mt-3 max-w-[8.6em] font-display text-[2.75rem] font-medium leading-[0.95] text-foreground sm:max-w-none sm:text-6xl">
            {data.title}
          </h3>
          <p className="mt-4 text-sm font-medium leading-6 text-muted">
            {data.descriptor}
          </p>
          <p className="mt-6 max-w-xl text-sm leading-7 text-muted">
            {data.description}
          </p>
        </div>
        <MetricBand metrics={data.metrics} />
      </div>

      <div className="mt-9 grid border-y border-line md:grid-cols-3">
        {data.brief.map((item) => (
          <div key={item.label} className="border-b border-line py-5 md:border-b-0 md:border-r md:px-5 md:last:border-r-0">
            <p className="text-[0.68rem] font-medium uppercase leading-4 tracking-[0.2em] text-quiet">
              {item.label}
            </p>
            <p className="mt-3 text-sm leading-7 text-muted">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-9">
        <div
          role="tablist"
          aria-label="ScarletWell Studio preview sections"
          className="flex gap-6 overflow-x-auto border-b border-line"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls={`scarletwell-panel-${tab.toLowerCase()}`}
              id={`scarletwell-tab-${tab.toLowerCase()}`}
              onClick={() => setActiveTab(tab)}
              onKeyDown={handleTabKeyDown}
              className="focus-ring -mb-px shrink-0 border-b py-3 text-left text-xs font-medium uppercase leading-5 tracking-[0.18em] transition duration-300 ease-out aria-selected:border-foreground aria-selected:text-foreground border-transparent text-quiet hover:text-foreground motion-reduce:transition-none"
            >
              {tab}
            </button>
          ))}
        </div>
        <div
          role="tabpanel"
          id={`scarletwell-panel-${activeTab.toLowerCase()}`}
          aria-labelledby={`scarletwell-tab-${activeTab.toLowerCase()}`}
          className="pt-8"
        >
          <TabPanel activeTab={activeTab} data={data} />
        </div>
      </div>
    </div>
  );
}
