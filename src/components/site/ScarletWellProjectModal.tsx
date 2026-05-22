"use client";

import { type ReactNode, useState } from "react";
import type { ScarletWellBriefData } from "@/lib/scarletwell-preview-data";
import { wellnessThroughClayPreviewData } from "@/lib/wellness-through-clay-preview-data";
import {
  DeltaCards,
  KpiStrip,
  ModalSectionLabel,
  ProjectModalShell,
} from "./ProjectModalShell";

type ScarletWellProjectModalProps = {
  data: ScarletWellBriefData;
  isOpen: boolean;
  onClose: () => void;
};

type TabKey = "insights" | "pulse" | "portfolio" | "sample";

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: "insights", label: "Program Insights" },
  { key: "pulse", label: "Pulse" },
  { key: "portfolio", label: "Portfolio" },
  { key: "sample", label: "Sample Program" },
];

const skills = ["Program evaluation", "Data modeling", "Strategic planning"];

const impacts = [
  "Compared 41 wellness programs in one system",
  "Made funding and participation patterns easier to evaluate",
  "Helped identify efficiency gains across grant cycles",
];

export function ScarletWellProjectModal({
  data,
  isOpen,
  onClose,
}: ScarletWellProjectModalProps) {
  const [active, setActive] = useState<TabKey>("insights");

  const kpis = [
    { label: "Participants reached", value: "3,003" },
    { label: "Activities analyzed", value: "210" },
    { label: "Budget reviewed", value: "$41K+" },
    { label: "Programs evaluated", value: "41" },
  ];

  return (
    <ProjectModalShell
      isOpen={isOpen}
      onClose={onClose}
      labelledById="scarletwell-modal-title"
      title="ScarletWell Studio"
      summary="Built an analytics and planning system to help Rutgers mental health and wellness programs track reach, funding, and program performance."
    >
      <section>
        <ModalSectionLabel>Impact snapshot</ModalSectionLabel>
        <div className="mt-4">
          <KpiStrip items={kpis} />
        </div>
      </section>

      <section>
        <div
          role="tablist"
          aria-label="ScarletWell Studio views"
          className="-mx-2 flex overflow-x-auto border-b border-line"
        >
          {tabs.map((tab) => {
            const isActive = active === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`sw-panel-${tab.key}`}
                id={`sw-tab-${tab.key}`}
                onClick={() => setActive(tab.key)}
                className="focus-ring relative whitespace-nowrap px-3 py-3 text-sm font-medium leading-5 transition-colors sm:px-4"
                style={{
                  color: isActive ? "var(--foreground)" : "var(--quiet)",
                }}
              >
                {tab.label}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-2 -bottom-px h-0.5 sm:inset-x-3"
                  style={{
                    background: isActive ? "var(--foreground)" : "transparent",
                  }}
                />
              </button>
            );
          })}
        </div>

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

      <section>
        <ModalSectionLabel>Skills used → Impact created</ModalSectionLabel>
        <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-6">
          <div className="lg:flex-1">
            <p className="text-[0.65rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
              Skills used
            </p>
            <ul className="mt-3 space-y-3">
              {skills.map((s) => (
                <li
                  key={s}
                  className="border-t border-line pt-3 text-sm font-medium leading-5 text-foreground"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div
            aria-hidden="true"
            className="flex items-center justify-center text-quiet lg:px-2"
          >
            <span className="lg:hidden">↓</span>
            <span className="hidden lg:inline">→</span>
          </div>
          <div className="lg:flex-1">
            <p className="text-[0.65rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
              Impact created
            </p>
            <ul className="mt-3 space-y-3">
              {impacts.map((i) => (
                <li
                  key={i}
                  className="border-t pt-3 text-sm font-medium leading-5 text-foreground"
                  style={{ borderColor: "var(--sage-line)" }}
                >
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </ProjectModalShell>
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

  const deltas = [
    {
      label: "Participants",
      value: "+14%",
      direction: "up" as const,
      detail: "1,400 → 1,603",
      highlight: true,
    },
    {
      label: "Documented budget",
      value: "−44%",
      direction: "down" as const,
      detail: "$26.4K → $14.8K",
      highlight: true,
    },
    {
      label: "Cost / participant",
      value: "−51%",
      direction: "down" as const,
      detail: "$18.82 → $9.22",
      highlight: true,
    },
  ];

  return (
    <TabPanel id="insights">
      <div>
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-[0.65rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
            Year-over-year change
          </p>
          <p className="text-xs leading-5 text-quiet">2024-25 → 2025-26</p>
        </div>
        <div className="mt-5">
          <DeltaCards items={deltas} />
        </div>
      </div>

      <div className="space-y-5">
        <MiniCompare
          title="Participants"
          previousLabel={`${previous.label}`}
          currentLabel={`${current.label}`}
          previousValue={previous.participants}
          currentValue={current.participants}
          previousDisplay={previous.participants.toLocaleString()}
          currentDisplay={current.participants.toLocaleString()}
          direction="up"
        />
        <MiniCompare
          title="Documented budget"
          previousLabel={`${previous.label}`}
          currentLabel={`${current.label}`}
          previousValue={previous.budget}
          currentValue={current.budget}
          previousDisplay={`$${(previous.budget / 1000).toFixed(1)}K`}
          currentDisplay={`$${(current.budget / 1000).toFixed(1)}K`}
          direction="down"
        />
        <MiniCompare
          title="Cost / participant"
          previousLabel={`${previous.label}`}
          currentLabel={`${current.label}`}
          previousValue={previous.costPerParticipant}
          currentValue={current.costPerParticipant}
          previousDisplay={`$${previous.costPerParticipant.toFixed(2)}`}
          currentDisplay={`$${current.costPerParticipant.toFixed(2)}`}
          direction="down"
        />
      </div>

      <p className="max-w-2xl text-sm leading-6 text-muted">
        Higher reach with lower documented spend — cost per participant dropped
        roughly 51% year over year.
      </p>
    </TabPanel>
  );
}

function MiniCompare({
  title,
  previousLabel,
  currentLabel,
  previousValue,
  currentValue,
  previousDisplay,
  currentDisplay,
  direction,
}: {
  title: string;
  previousLabel: string;
  currentLabel: string;
  previousValue: number;
  currentValue: number;
  previousDisplay: string;
  currentDisplay: string;
  direction: "up" | "down";
}) {
  const max = Math.max(previousValue, currentValue);
  const isWin = direction === "up" ? currentValue > previousValue : currentValue < previousValue;

  return (
    <div>
      <p className="text-xs font-medium leading-5 text-foreground">{title}</p>
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
          color={isWin ? "var(--sage)" : "rgba(72,38,29,0.28)"}
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
      <p className="text-xs leading-5 text-muted">{label}</p>
      <div className="h-3 bg-foreground/[0.05]">
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${widthPct}%`, background: color }}
          aria-hidden="true"
        />
      </div>
      <p className="text-right text-xs font-medium leading-5 text-foreground">
        {display}
      </p>
    </div>
  );
}

function PulsePanel() {
  const stats = [
    { label: "Active programs", value: "12" },
    { label: "Completed", value: "29" },
    { label: "Reports ready", value: "8" },
    { label: "Follow-up needed", value: "4", attention: true },
  ];

  const nextItems = [
    "Review 4 programs awaiting follow-up.",
    "Publish 8 ready reports to funders.",
    "Schedule mid-cycle check-in with active cohort leads.",
  ];

  return (
    <TabPanel id="pulse">
      <div>
        <p className="text-[0.65rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
          Current cycle monitoring
        </p>
        <div className="mt-4 grid gap-x-8 gap-y-6 border-y border-line py-7 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p
                className="font-display text-4xl font-medium leading-none text-foreground lg:text-[2.5rem]"
                style={
                  s.attention
                    ? {
                        background: "var(--sage-soft)",
                        boxShadow: "inset 0 -0.35em 0 var(--sage-soft)",
                        display: "inline-block",
                        padding: "0 0.2em",
                      }
                    : undefined
                }
              >
                {s.value}
              </p>
              <p className="mt-2 text-[0.7rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[0.65rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
          What to do next
        </p>
        <ol className="mt-4 divide-y divide-[color:var(--line)] border-y border-line">
          {nextItems.map((item, idx) => (
            <li
              key={item}
              className="flex items-baseline gap-4 py-3 text-sm leading-6 text-foreground"
            >
              <span className="text-[0.7rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
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
      detail: "Repeat-cycle workshops and recurring outreach.",
      recommended: true,
    },
    {
      title: "High reach · Higher cost",
      detail: "Large one-time events with strong turnout.",
    },
    {
      title: "Lower reach · Low cost",
      detail: "Niche pilots with efficient delivery.",
    },
    {
      title: "Lower reach · Higher cost",
      detail: "Programs to re-scope or sunset.",
    },
  ];

  return (
    <TabPanel id="portfolio">
      <div>
        <p className="text-[0.65rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
          Portfolio comparison · 41 programs
        </p>
        <div className="mt-4 grid grid-cols-2 border border-line">
          {quadrants.map((q, idx) => (
            <div
              key={q.title}
              className="border-line p-4 sm:p-5"
              style={{
                borderRight: idx % 2 === 0 ? "1px solid var(--line)" : undefined,
                borderBottom: idx < 2 ? "1px solid var(--line)" : undefined,
                background: q.recommended ? "var(--sage-soft)" : undefined,
              }}
            >
              <div className="flex items-center gap-2">
                <p className="text-xs font-medium leading-5 text-foreground sm:text-sm">
                  {q.title}
                </p>
                {q.recommended ? (
                  <span
                    className="text-[0.55rem] font-medium uppercase leading-4 tracking-[0.16em]"
                    style={{ color: "rgba(72,38,29,0.7)" }}
                  >
                    Priority
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-xs leading-5 text-muted">{q.detail}</p>
            </div>
          ))}
        </div>
        <p className="mt-1 text-[0.65rem] uppercase leading-5 tracking-[0.16em] text-quiet">
          Reach →
        </p>
      </div>

      <div>
        <p className="text-[0.65rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
          Funding signal
        </p>
        <ul className="mt-4 divide-y divide-[color:var(--line)] border-y border-line">
          <li className="flex items-baseline justify-between gap-4 py-3 text-sm leading-6 text-foreground">
            <span>Repeat recipients across cycles</span>
            <span className="text-xs text-muted">Multi-cycle visibility</span>
          </li>
          <li className="flex items-baseline justify-between gap-4 py-3 text-sm leading-6 text-foreground">
            <span>Cost efficiency leaders</span>
            <span className="text-xs text-muted">Lower $ / participant</span>
          </li>
          <li className="flex items-baseline justify-between gap-4 py-3 text-sm leading-6 text-foreground">
            <span>Programs to re-scope</span>
            <span className="text-xs text-muted">Low reach / high cost</span>
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

  const outcomes = [
    "Mindfulness",
    "Accessibility",
    "Community engagement",
  ];

  return (
    <TabPanel id="sample">
      <div>
        <p className="text-[0.65rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
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
              <p className="mt-2 text-[0.7rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[0.65rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
          Cumulative attendees by cycle
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
                <p className="text-xs leading-5 text-muted">{p.cycle}</p>
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
                <p className="text-right text-xs font-medium leading-5 text-foreground">
                  {p.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-[0.65rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
          Evaluation outcomes
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {outcomes.map((o) => (
            <div
              key={o}
              className="border border-line bg-background px-4 py-4 text-sm font-medium leading-5 text-foreground"
            >
              {o}
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
          {wtc.stability.insight}
        </p>
      </div>
    </TabPanel>
  );
}
