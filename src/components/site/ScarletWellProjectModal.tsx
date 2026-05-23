"use client";

import { type ReactNode, type SVGProps, useState } from "react";
import type { ScarletWellBriefData } from "@/lib/scarletwell-preview-data";
import { wellnessThroughClayPreviewData } from "@/lib/wellness-through-clay-preview-data";
import {
  KpiStrip,
  ModalArrow,
  ModalIcon,
  type ModalIconName,
  ModalSectionLabel,
  ModalTabs,
  ProjectModalShell,
  SkillsImpactColumns,
} from "./ProjectModalShell";

type ScarletWellProjectModalProps = {
  data: ScarletWellBriefData;
  isOpen: boolean;
  onClose: () => void;
};

type TabKey = "insights" | "pulse" | "portfolio" | "sample";

const tabs: Array<{ id: TabKey; label: string }> = [
  { id: "insights", label: "Program Insights" },
  { id: "pulse", label: "Pulse" },
  { id: "portfolio", label: "Portfolio" },
  { id: "sample", label: "Sample Program" },
];

const studioFlow = [
  { icon: "bar-chart" as const, label: "Program metrics" },
  { icon: "clipboard" as const, label: "Reporting status" },
  { icon: "layers" as const, label: "Portfolio review" },
  { icon: "target" as const, label: "Planning actions" },
];

const skills = [
  {
    title: "Program evaluation",
    icon: "layers" as const,
    detail:
      "Structured portfolio review around reach, funding, reporting status, and repeat-cycle performance.",
  },
  {
    title: "Data modeling",
    icon: "bar-chart" as const,
    detail:
      "Connected activity, participant, and budget records so cross-cycle comparisons stayed usable.",
  },
  {
    title: "Strategic planning",
    icon: "target" as const,
    detail:
      "Turned dashboard signals into funding, planning, and follow-up decisions for the next cycle.",
  },
];

const impacts = [
  {
    title: "Compared 41 wellness programs in one system",
    icon: "monitor" as const,
    detail:
      "Made the full portfolio easier to scan without jumping across scattered reports.",
  },
  {
    title: "Made funding and participation patterns easier to evaluate",
    icon: "wallet" as const,
    detail:
      "Surfaced where spend, reach, and program activity were moving together or drifting apart.",
  },
  {
    title: "Helped identify efficiency gains across grant cycles",
    icon: "target" as const,
    detail:
      "Showed higher reach with lower documented spend, including a large drop in cost per participant.",
  },
];

type ScarletWellIconName =
  | ModalIconName
  | "activity"
  | "alert-circle"
  | "calculator"
  | "file-check";

const EXTRA_ICON_PATHS: Record<
  Exclude<ScarletWellIconName, ModalIconName>,
  ReactNode
> = {
  activity: (
    <>
      <path d="M3 12h4l2.5-5 5 10 2.5-5H21" />
      <path d="M4.5 18.5h15" />
    </>
  ),
  "alert-circle": (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8v4.5" />
      <circle cx="12" cy="16.75" r="0.75" fill="currentColor" stroke="none" />
    </>
  ),
  calculator: (
    <>
      <rect x="5" y="3.5" width="14" height="17" rx="1.5" />
      <path d="M8 7.5h8" />
      <path d="M8 11.5h2M12 11.5h2M16 11.5h0.01" />
      <path d="M8 15.5h2M12 15.5h2M16 15.5h0.01" />
    </>
  ),
  "file-check": (
    <>
      <path d="M7 3.5h7l4 4v13H7z" />
      <path d="M14 3.5v4h4" />
      <path d="m9 14 2 2 4-4" />
    </>
  ),
};

export function ScarletWellProjectModal({
  data,
  isOpen,
  onClose,
}: ScarletWellProjectModalProps) {
  const [active, setActive] = useState<TabKey>("insights");

  const kpis = [
    { label: "Participants reached", value: "3,003", icon: "users" as const },
    { label: "Activities analyzed", value: "210", icon: "calendar-check" as const },
    { label: "Budget reviewed", value: "$41K+", icon: "wallet" as const },
    { label: "Programs evaluated", value: "41", icon: "layers" as const },
  ];

  return (
    <ProjectModalShell
      isOpen={isOpen}
      onClose={onClose}
      labelledById="scarletwell-modal-title"
      title="ScarletWell Studio"
      summary="Built an analytics and planning system to help Rutgers mental health and wellness programs track reach, funding, reporting status, and program performance."
    >
      <section>
        <ModalSectionLabel>Impact snapshot</ModalSectionLabel>
        <div className="mt-4">
          <KpiStrip items={kpis} />
        </div>
      </section>

      <section>
        <ModalSectionLabel>Data to action</ModalSectionLabel>
        <div className="mt-5">
          <StudioFlow />
        </div>
      </section>

      <section>
        <ModalTabs
          items={tabs}
          active={active}
          onChange={setActive}
          ariaLabel="ScarletWell Studio views"
          idPrefix="sw"
        />

        <div className="mt-6">
          {active === "insights" ? (
            <InsightsPanel data={data} />
          ) : active === "pulse" ? (
            <PulsePanel />
          ) : active === "portfolio" ? (
            <PortfolioPanel />
          ) : (
            <SampleProgramPanel />
          )}
        </div>
      </section>

      <SkillsImpactSection />
    </ProjectModalShell>
  );
}

function StudioFlow() {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
      {studioFlow.map((step, index) => (
        <div key={step.label} className="flex flex-1 items-stretch gap-3">
          <div
            className="flex flex-1 items-center gap-3 border border-line px-4 py-4"
            style={
              index === studioFlow.length - 1
                ? { borderColor: "var(--sage-line)", background: "var(--sage-soft)" }
                : { background: "var(--background)" }
            }
          >
            <ScarletWellIcon
              name={step.icon}
              className="h-4 w-4 shrink-0 text-quiet"
            />
            <p className="text-[0.95rem] font-medium leading-6 text-foreground">
              {step.label}
            </p>
          </div>
          {index < studioFlow.length - 1 ? (
            <div aria-hidden="true" className="hidden items-center text-quiet lg:flex">
              <ModalArrow />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function TabPanel({
  id,
  children,
}: {
  id: TabKey;
  children: ReactNode;
}) {
  return (
    <div
      role="tabpanel"
      id={`sw-panel-${id}`}
      aria-labelledby={`sw-tab-${id}`}
      className="space-y-8"
    >
      {children}
    </div>
  );
}

function InsightsPanel({ data }: { data: ScarletWellBriefData }) {
  const [previous, current] = data.cycles;
  const cardMetrics = [
    {
      label: "Participants",
      value: "+14%",
      detail: "1,400 → 1,603",
      icon: "users" as const,
      direction: "up" as const,
    },
    {
      label: "Documented budget",
      value: "-44%",
      detail: "$26.4K → $14.8K",
      icon: "wallet" as const,
      direction: "down" as const,
    },
    {
      label: "Cost / participant",
      value: "-51%",
      detail: "$18.82 → $9.22",
      icon: "calculator" as const,
      direction: "down" as const,
    },
  ];

  return (
    <TabPanel id="insights">
      <div>
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-[0.75rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
            Year-over-year efficiency
          </p>
          <p className="text-sm leading-5 text-quiet">2024-2025 → 2025-2026</p>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {cardMetrics.map((metric) => (
            <article key={metric.label} className="border border-line bg-background px-4 py-4">
              <div className="flex items-center gap-2">
                <ScarletWellIcon
                  name={metric.icon}
                  className="h-4 w-4 shrink-0 text-quiet"
                />
                <p className="text-[0.72rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
                  {metric.label}
                </p>
              </div>
              <p className="mt-3 font-display text-[2.1rem] font-medium leading-none text-foreground">
                {metric.value}
                <span aria-hidden="true" className="ml-1 text-sm text-quiet">
                  {metric.direction === "up" ? "↑" : "↓"}
                </span>
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">{metric.detail}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        <MiniCompare
          title="Participants"
          icon="users"
          previousLabel="2024-2025"
          currentLabel="2025-2026"
          previousValue={previous.participants}
          currentValue={current.participants}
          previousDisplay={previous.participants.toLocaleString()}
          currentDisplay={current.participants.toLocaleString()}
        />
        <MiniCompare
          title="Documented budget"
          icon="wallet"
          previousLabel="2024-2025"
          currentLabel="2025-2026"
          previousValue={previous.budget}
          currentValue={current.budget}
          previousDisplay={`$${(previous.budget / 1000).toFixed(1)}K`}
          currentDisplay={`$${(current.budget / 1000).toFixed(1)}K`}
        />
        <MiniCompare
          title="Cost / participant"
          icon="calculator"
          previousLabel="2024-2025"
          currentLabel="2025-2026"
          previousValue={previous.costPerParticipant}
          currentValue={current.costPerParticipant}
          previousDisplay={`$${previous.costPerParticipant.toFixed(2)}`}
          currentDisplay={`$${current.costPerParticipant.toFixed(2)}`}
        />
      </div>

      <p className="max-w-2xl text-[0.95rem] leading-7 text-muted">
        Reach increased while documented spend decreased, lowering cost per
        participant by roughly 51%.
      </p>
    </TabPanel>
  );
}

function MiniCompare({
  title,
  icon,
  previousLabel,
  currentLabel,
  previousValue,
  currentValue,
  previousDisplay,
  currentDisplay,
}: {
  title: string;
  icon: ScarletWellIconName;
  previousLabel: string;
  currentLabel: string;
  previousValue: number;
  currentValue: number;
  previousDisplay: string;
  currentDisplay: string;
}) {
  const max = Math.max(previousValue, currentValue);

  return (
    <div>
      <div className="flex items-center gap-2">
        <ScarletWellIcon name={icon} className="h-4 w-4 shrink-0 text-quiet" />
        <p className="text-sm font-medium leading-6 text-foreground">{title}</p>
      </div>
      <div className="mt-2 space-y-2">
        <Bar
          label={previousLabel}
          widthPct={(previousValue / max) * 100}
          display={previousDisplay}
          color="rgba(72,38,29,0.28)"
        />
        <Bar
          label={currentLabel}
          widthPct={(currentValue / max) * 100}
          display={currentDisplay}
          color="var(--accent)"
        />
      </div>
    </div>
  );
}

function Bar({
  label,
  widthPct,
  display,
  color,
}: {
  label: string;
  widthPct: number;
  display: string;
  color: string;
}) {
  return (
    <div className="grid grid-cols-[minmax(7rem,9rem)_1fr_4.5rem] items-center gap-4">
      <p className="text-sm leading-6 text-muted">{label}</p>
      <div className="h-3 bg-foreground/[0.05]">
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${widthPct}%`, background: color }}
          aria-hidden="true"
        />
      </div>
      <p className="text-right text-sm font-medium leading-5 text-foreground">
        {display}
      </p>
    </div>
  );
}

function PulsePanel() {
  const stats = [
    {
      label: "Active programs",
      value: "12",
      icon: "activity" as const,
      description: "Live portfolio tracking",
    },
    {
      label: "Completed",
      value: "29",
      icon: "check-circle" as const,
      description: "Closed cycle reviews",
    },
    {
      label: "Reports ready",
      value: "8",
      icon: "file-check" as const,
      description: "Prepared for funders",
    },
    {
      label: "Follow-up needed",
      value: "4",
      icon: "alert-circle" as const,
      description: "Coordinator action needed",
    },
  ];

  const nextItems = [
    "Review 4 programs awaiting follow-up.",
    "Publish 8 ready reports to funders.",
    "Schedule mid-cycle check-in with active cohort leads.",
  ];

  return (
    <TabPanel id="pulse">
      <div>
        <p className="text-[0.75rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
          Current cycle monitoring
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => (
            <article key={s.label} className="border border-line bg-background px-4 py-4">
              <div className="flex items-center gap-2">
                <ScarletWellIcon
                  name={s.icon}
                  className="h-4 w-4 shrink-0 text-quiet"
                />
                <p className="text-[0.72rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
                  {s.label}
                </p>
              </div>
              <p className="mt-3 font-display text-[2.2rem] font-medium leading-none text-foreground">
                {s.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">{s.description}</p>
            </article>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[0.75rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
          What to do next
        </p>
        <ol className="mt-4 divide-y divide-[color:var(--line)] border border-line">
          {nextItems.map((item, idx) => (
            <li
              key={item}
              className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 px-4 py-4 text-[0.95rem] leading-6 text-foreground"
            >
              <span className="text-[0.75rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
              <span aria-hidden="true" className="modal-arrow">→</span>
            </li>
          ))}
        </ol>
      </div>
    </TabPanel>
  );
}

function PortfolioPanel() {
  const quadrants = [
    {
      title: "High reach · Low cost",
      badge: "Priority",
      detail: "Repeat-cycle workshops and recurring outreach.",
      icon: "target" as const,
    },
    {
      title: "High reach · Higher cost",
      detail: "Large one-time events with strong turnout.",
      icon: "wallet" as const,
    },
    {
      title: "Lower reach · Low cost",
      detail: "Niche pilots with efficient delivery.",
      icon: "layers" as const,
    },
    {
      title: "Lower reach · Higher cost",
      detail: "Programs to re-scope or sunset.",
      icon: "alert-circle" as const,
    },
  ];

  return (
    <TabPanel id="portfolio">
      <div>
        <p className="text-[0.75rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
          Portfolio comparison · 41 programs
        </p>
        <div className="mt-4">
          <div className="mb-3 flex items-center justify-between gap-4 text-[0.72rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet">
            <span>Y-axis: Cost →</span>
            <span>X-axis: Reach →</span>
          </div>
          <div className="grid border border-line md:grid-cols-2">
          {quadrants.map((q, idx) => (
            <div
              key={q.title}
              className="border-line p-4 sm:p-5"
              style={{
                borderRight: idx % 2 === 0 ? "1px solid var(--line)" : undefined,
                borderBottom: idx < 2 ? "1px solid var(--line)" : undefined,
              }}
            >
              <div className="flex items-center gap-2">
                <ScarletWellIcon
                  name={q.icon}
                  className="h-4 w-4 shrink-0 text-quiet"
                />
                <p className="text-sm font-medium leading-6 text-foreground">
                  {q.title}
                </p>
                {q.badge ? (
                  <span
                    className="text-[0.72rem] font-medium uppercase leading-4 tracking-[0.14em]"
                    style={{ color: "rgba(72,38,29,0.7)" }}
                  >
                    {q.badge}
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-sm leading-6 text-muted">{q.detail}</p>
            </div>
          ))}
          </div>
        </div>
      </div>

      <div>
        <p className="text-[0.75rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
          Funding signals
        </p>
        <ul className="mt-4 divide-y divide-[color:var(--line)] border border-line">
          <li className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-4 text-sm leading-6 text-foreground">
            <ScarletWellIcon name="target" className="h-4 w-4 shrink-0 text-quiet" />
            <span>Repeat recipients across cycles</span>
            <span className="text-sm text-muted">Multi-cycle visibility</span>
          </li>
          <li className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-4 text-sm leading-6 text-foreground">
            <ScarletWellIcon name="wallet" className="h-4 w-4 shrink-0 text-quiet" />
            <span>Cost efficiency leaders</span>
            <span className="text-sm text-muted">Lower $ / participant</span>
          </li>
          <li className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-4 text-sm leading-6 text-foreground">
            <ScarletWellIcon
              name="alert-circle"
              className="h-4 w-4 shrink-0 text-quiet"
            />
            <span>Programs to re-scope</span>
            <span className="text-sm text-muted">Low reach / high cost</span>
          </li>
        </ul>
      </div>
    </TabPanel>
  );
}

function SampleProgramPanel() {
  const wtc = wellnessThroughClayPreviewData;
  const stats = [
    { label: "Cumulative attendees", value: "250+" },
    { label: "Sessions", value: "18" },
    { label: "Cycles", value: "3" },
    { label: "Avg / session", value: "14–16" },
  ];
  const surfacedInsights = [
    {
      label: "Repeat demand",
      detail: "Attendance remained stable across cycles.",
    },
    {
      label: "Expansion signal",
      detail: "Program reached student and faculty/staff audiences.",
    },
    {
      label: "Planning value",
      detail: "Attendance data helped guide future session design.",
    },
  ];

  return (
    <TabPanel id="sample">
      <div>
        <p className="text-[0.75rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
          Program profile
        </p>
        <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
          <h3 className="font-display text-2xl font-medium leading-tight text-foreground sm:text-3xl">
            {wtc.title}
          </h3>
          <p className="text-sm leading-6 text-muted">
            Founder-led ceramics workshops · grant-funded operations
          </p>
        </div>
        <div className="mt-5 grid gap-x-8 gap-y-6 border-y border-line py-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl font-medium leading-none text-foreground">
                {s.value}
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-[0.75rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet">
                <ScarletWellIcon name="calendar-check" className="h-4 w-4" />
                <span>{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[0.75rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
          Cumulative attendance by cycle
        </p>
        <div className="mt-4 space-y-2">
          {wtc.cumulativeGrowth.points.map((p, idx, arr) => {
            const max = Math.max(...arr.map((x) => x.value));
            const widthPct = (p.value / max) * 100;
            const isLast = idx === arr.length - 1;
            return (
              <div
                key={p.cycle}
                className="grid grid-cols-[minmax(8rem,10rem)_1fr_3rem] items-center gap-4"
              >
                <p className="text-sm leading-6 text-muted">{p.cycle}</p>
                <div className="h-3 bg-foreground/[0.05]">
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${widthPct}%`,
                      background: isLast
                        ? "var(--sage)"
                        : "rgba(72,38,29,0.28)",
                    }}
                    aria-hidden="true"
                  />
                </div>
                <p className="text-right text-sm font-medium leading-5 text-foreground">
                  {p.displayValue}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-[0.75rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
          What the dashboard surfaced
        </p>
        <div className="mt-4 divide-y divide-[color:var(--line)] border border-line">
          {surfacedInsights.map((item) => (
            <div
              key={item.label}
              className="grid gap-2 px-4 py-4 md:grid-cols-[12rem_1fr] md:items-center md:gap-4"
            >
              <p className="text-sm font-medium leading-6 text-foreground">
                {item.label}
              </p>
              <p className="text-sm leading-6 text-muted">{item.detail}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
          Participation remained stable across repeat programming cycles while
          the model expanded beyond its original student audience.
        </p>
      </div>
    </TabPanel>
  );
}

function SkillsImpactSection() {
  return <SkillsImpactColumns skills={skills} impact={impacts} />;
}

function ScarletWellIcon({
  name,
  className = "h-4 w-4",
  ...rest
}: { name: ScarletWellIconName } & SVGProps<SVGSVGElement>) {
  if (name in EXTRA_ICON_PATHS) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.45}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={className}
        {...rest}
      >
        {EXTRA_ICON_PATHS[name as keyof typeof EXTRA_ICON_PATHS]}
      </svg>
    );
  }

  return <ModalIcon name={name as ModalIconName} className={className} {...rest} />;
}
