"use client";

import { useState, type ReactNode, type SVGProps } from "react";
import type { PslPreviewData } from "@/lib/psl-preview-data";
import {
  KpiStrip,
  ModalArrow,
  ModalSectionLabel,
  ModalTabs,
  ProjectModalShell,
  SkillsImpactColumns,
} from "./ProjectModalShell";

type PslProjectModalProps = {
  data: PslPreviewData;
  isOpen: boolean;
  onClose: () => void;
};

type IconName =
  | "calendar"
  | "clipboard"
  | "message"
  | "database"
  | "bar-chart"
  | "route"
  | "spark"
  | "users"
  | "briefcase"
  | "arrow-right";

const ICON_PATHS: Record<IconName, ReactNode> = {
  calendar: (
    <>
      <rect x="3" y="4.5" width="18" height="16" rx="1.5" />
      <path d="M8 3v3M16 3v3M3 9.5h18" />
      <path d="m9 14 2 2 4-4" />
    </>
  ),
  clipboard: (
    <>
      <rect x="6" y="4.5" width="12" height="16" rx="1.5" />
      <path d="M9 4.5V3.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <path d="M9 11h6M9 14.5h6M9 18h4" />
    </>
  ),
  message: (
    <path d="M4 5.5h16v11H10.5L7 20v-3.5H4z" />
  ),
  database: (
    <>
      <ellipse cx="12" cy="5.5" rx="8" ry="2.5" />
      <path d="M4 5.5v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-6" />
      <path d="M4 11.5v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-6" />
    </>
  ),
  "bar-chart": (
    <>
      <path d="M3 3v18h18" />
      <path d="M7 16v-4M12 16V8M17 16v-6" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="6" r="2" />
      <path d="M8 18h6a4 4 0 0 0 0-8h-4a4 4 0 0 1 0-8h2" />
    </>
  ),
  spark: (
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2 2M16.4 16.4l2 2M5.6 18.4l2-2M16.4 7.6l2-2" />
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <circle cx="16.5" cy="9" r="2.5" />
      <path d="M16 14.5a4.5 4.5 0 0 1 4.5 4.5" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="1.5" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      <path d="M3 12.5h18" />
    </>
  ),
  "arrow-right": (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
};

function Icon({
  name,
  className = "h-4 w-4",
  ...rest
}: { name: IconName } & SVGProps<SVGSVGElement>) {
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
      {ICON_PATHS[name]}
    </svg>
  );
}

type TabId = "overall" | "competency" | "themes" | "profile";

const TABS: Array<{ id: TabId; label: string }> = [
  { id: "overall", label: "Overall" },
  { id: "competency", label: "Competency" },
  { id: "themes", label: "Qualitative Themes" },
  { id: "profile", label: "Sample Profile" },
];

export function PslProjectModal({
  data,
  isOpen,
  onClose,
}: PslProjectModalProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overall");

  return (
    <ProjectModalShell
      isOpen={isOpen}
      onClose={onClose}
      labelledById="psl-modal-title"
      title="PSL Dashboard"
      summary={data.summary}
    >
      <section>
        <ModalSectionLabel>Impact snapshot</ModalSectionLabel>
        <div className="mt-4">
          <KpiStrip items={data.kpis} />
        </div>
      </section>

      <section>
        <ModalSectionLabel>Data to decisions</ModalSectionLabel>
        <PipelineFlow pipeline={data.pipeline} />
      </section>

      <section>
        <ModalTabs
          items={TABS}
          active={activeTab}
          onChange={setActiveTab}
          ariaLabel="PSL case study sections"
          idPrefix="psl"
        />

        <div
          className="mt-7"
          role="tabpanel"
          id={`psl-panel-${activeTab}`}
          aria-labelledby={`psl-tab-${activeTab}`}
        >
          {activeTab === "overall" ? <OverallTab data={data} /> : null}
          {activeTab === "competency" ? <CompetencyTab data={data} /> : null}
          {activeTab === "themes" ? <ThemesTab data={data} /> : null}
          {activeTab === "profile" ? <ProfileTab data={data} /> : null}
        </div>
      </section>

      <SkillsImpactColumns skills={data.skills} impact={data.impact} />
    </ProjectModalShell>
  );
}

function PipelineFlow({ pipeline }: { pipeline: PslPreviewData["pipeline"] }) {
  return (
    <div className="mt-5 flex flex-col items-stretch gap-3 lg:flex-row lg:items-stretch">
      <div className="flex flex-col gap-2 lg:flex-1">
        {pipeline.inputs.map((input) => (
          <PipelineCell key={input.label} icon={input.icon} label={input.label} />
        ))}
      </div>
      <PipelineArrow />
      <PipelineCell
        icon={pipeline.stages[0].icon}
        label={pipeline.stages[0].label}
        className="lg:flex-1"
      />
      <PipelineArrow />
      <PipelineCell
        icon={pipeline.stages[1].icon}
        label={pipeline.stages[1].label}
        className="lg:flex-1"
      />
      <PipelineArrow emphasized />
      <PipelineCell
        icon={pipeline.stages[2].icon}
        label={pipeline.stages[2].label}
        emphasized
        className="lg:flex-1"
      />
    </div>
  );
}

function PipelineCell({
  icon,
  label,
  emphasized = false,
  className = "",
}: {
  icon: IconName;
  label: string;
  emphasized?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 border px-4 py-3 text-sm font-medium leading-5 text-foreground ${className}`}
      style={
        emphasized
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
      <Icon name={icon} className="h-4 w-4 shrink-0 text-quiet" />
      <span>{label}</span>
    </div>
  );
}

function PipelineArrow({ emphasized = false }: { emphasized?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="hidden items-center justify-center self-stretch text-quiet lg:flex"
      style={emphasized ? { color: "var(--foreground)" } : undefined}
    >
      <ModalArrow />
    </div>
  );
}

function OverallTab({ data }: { data: PslPreviewData }) {
  const max = Math.max(...data.cohortPathway.map((s) => s.value));

  return (
    <div className="space-y-9">
      <div>
        <ModalSectionLabel>Cohort pathway</ModalSectionLabel>
        <div className="mt-4 space-y-2">
          {data.cohortPathway.map((step, idx) => {
            const widthPct = (step.value / max) * 100;
            const isLast = idx === data.cohortPathway.length - 1;
            return (
              <div
                key={step.label}
                className="grid grid-cols-[minmax(9rem,12rem)_1fr_3rem] items-center gap-4"
              >
                <p className="text-xs font-medium leading-5 text-foreground">
                  {step.label}
                </p>
                <div className="h-7 bg-foreground/[0.04]">
                  <div
                    className="flex h-full items-center px-3 text-[0.7rem] font-medium uppercase leading-none tracking-[0.16em] text-foreground"
                    style={{
                      width: `${widthPct}%`,
                      background: isLast
                        ? "var(--sage-soft)"
                        : "rgba(72,38,29,0.08)",
                      borderRight: `1px solid ${
                        isLast ? "var(--sage-line)" : "var(--line)"
                      }`,
                    }}
                    aria-hidden="true"
                  />
                </div>
                <p className="text-right font-display text-2xl font-medium leading-none text-foreground">
                  {step.display}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <ModalSectionLabel>Data sources used</ModalSectionLabel>
        <div className="mt-4 flex flex-wrap gap-2">
          {data.dataSources.map((source) => (
            <span
              key={source.label}
              className="inline-flex items-center gap-2 border border-line px-3 py-1.5 text-xs font-medium leading-5 text-foreground"
              style={{ background: "var(--background)" }}
            >
              <Icon name={source.icon} className="h-3.5 w-3.5 text-quiet" />
              {source.label}
            </span>
          ))}
        </div>
      </div>

      <p className="max-w-2xl text-sm leading-6 text-muted">
        {data.overallInsight}
      </p>
    </div>
  );
}

function CompetencyTab({ data }: { data: PslPreviewData }) {
  const allValues = data.competency.items.flatMap((i) => [i.pre, i.post]);
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  const range = max - min || 1;

  const pct = (v: number) => ((v - min) / range) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <ModalSectionLabel>Pre/post competency growth</ModalSectionLabel>
        <span
          className="inline-flex items-center gap-1.5 border px-2.5 py-1 text-[0.65rem] font-medium uppercase leading-4 tracking-[0.16em] text-foreground"
          style={{
            borderColor: "var(--sage-line)",
            background: "var(--sage-soft)",
          }}
        >
          {data.competency.alignedQuestions} aligned questions
        </span>
      </div>

      <div className="space-y-3.5">
        {data.competency.items.map((item) => {
          const left = pct(item.pre);
          const right = pct(item.post);
          const delta = (item.post - item.pre).toFixed(1);
          return (
            <div
              key={item.label}
              className="grid grid-cols-[minmax(10rem,13rem)_1fr_5.5rem] items-center gap-4"
            >
              <p className="text-xs font-medium leading-5 text-foreground">
                {item.label}
              </p>
              <div className="relative h-5">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-foreground/[0.1]"
                />
                <div
                  aria-hidden="true"
                  className="absolute top-1/2 h-[2px] -translate-y-1/2"
                  style={{
                    left: `${left}%`,
                    width: `${right - left}%`,
                    background: "var(--accent)",
                  }}
                />
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                  style={{
                    left: `${left}%`,
                    background: "var(--background)",
                    borderColor: "rgba(72,38,29,0.4)",
                  }}
                />
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    left: `${right}%`,
                    background: "var(--foreground)",
                  }}
                />
              </div>
              <div className="text-right">
                <p className="text-xs font-medium leading-5 text-foreground">
                  {item.pre.toFixed(1)} → {item.post.toFixed(1)}
                </p>
                <p className="text-[0.65rem] font-medium uppercase leading-4 tracking-[0.14em] text-quiet">
                  +{delta}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-5 text-[0.7rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet">
        <span className="inline-flex items-center gap-2">
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 rounded-full border"
            style={{
              background: "var(--background)",
              borderColor: "rgba(72,38,29,0.4)",
            }}
          />
          Pre
        </span>
        <span className="inline-flex items-center gap-2">
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ background: "var(--foreground)" }}
          />
          Post
        </span>
      </div>

      <p className="max-w-2xl text-sm leading-6 text-muted">
        {data.competency.insight}
      </p>
    </div>
  );
}

function ThemesTab({ data }: { data: PslPreviewData }) {
  return (
    <div className="space-y-8">
      <div className="grid gap-3 sm:grid-cols-2">
        {data.themes.map((theme) => (
          <div
            key={theme.title}
            className="border border-line bg-background p-5"
          >
            <div className="flex items-center gap-2.5">
              <Icon name={theme.icon} className="h-4 w-4 text-quiet" />
              <p className="text-sm font-medium leading-5 text-foreground">
                {theme.title}
              </p>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">
              {theme.insight}
            </p>
          </div>
        ))}
      </div>

      <div>
        <ModalSectionLabel>Qualitative signal strength</ModalSectionLabel>
        <div className="mt-4 space-y-2.5">
          {data.themes.map((theme) => (
            <div
              key={theme.title}
              className="grid grid-cols-[minmax(8rem,11rem)_1fr_4.5rem] items-center gap-4"
            >
              <p className="text-xs font-medium leading-5 text-foreground">
                {theme.title}
              </p>
              <SignalBar level={theme.signal} />
              <p className="text-right text-[0.65rem] font-medium uppercase leading-4 tracking-[0.14em] text-quiet">
                {theme.signal} signal
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="max-w-2xl text-sm leading-6 text-muted">
        {data.themesInsight}
      </p>
    </div>
  );
}

function SignalBar({ level }: { level: "high" | "medium" | "low" }) {
  const filled = level === "high" ? 4 : level === "medium" ? 3 : 2;
  return (
    <div aria-hidden="true" className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="h-2 flex-1"
          style={{
            background:
              i < filled
                ? level === "high"
                  ? "var(--foreground)"
                  : "var(--sage-line)"
                : "rgba(72,38,29,0.08)",
          }}
        />
      ))}
    </div>
  );
}

function ProfileTab({ data }: { data: PslPreviewData }) {
  const { sampleProfile } = data;
  const max = 5;
  const pre = sampleProfile.competencyMovement[0];
  const post = sampleProfile.competencyMovement[1];

  return (
    <div className="space-y-6">
      <div className="border border-line bg-background p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <p className="font-display text-2xl font-medium leading-tight text-foreground sm:text-[1.75rem]">
              {sampleProfile.title}
            </p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
              {sampleProfile.subtext}
            </p>
          </div>
          <span
            className="inline-flex items-center border px-2.5 py-1 text-[0.65rem] font-medium uppercase leading-4 tracking-[0.16em] text-foreground"
            style={{
              borderColor: "var(--sage-line)",
              background: "var(--sage-soft)",
            }}
          >
            {sampleProfile.programSignal}
          </span>
        </div>

        <dl className="mt-7 grid gap-x-8 gap-y-5 border-t border-line pt-6 sm:grid-cols-2">
          {sampleProfile.fields.map((field) => (
            <div key={field.label}>
              <dt className="text-[0.65rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet">
                {field.label}
              </dt>
              <dd className="mt-1 text-sm font-medium leading-5 text-foreground">
                {field.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-7 grid gap-8 border-t border-line pt-6 sm:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-[0.65rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet">
              Competency movement
            </p>
            <div className="mt-3 space-y-2">
              {[pre, post].map((row, idx) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[2.5rem_1fr_2rem] items-center gap-3"
                >
                  <p className="text-[0.65rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet">
                    {row.label}
                  </p>
                  <div className="h-2 bg-foreground/[0.05]">
                    <div
                      aria-hidden="true"
                      className="h-full"
                      style={{
                        width: `${(row.value / max) * 100}%`,
                        background:
                          idx === 1 ? "var(--foreground)" : "rgba(72,38,29,0.3)",
                      }}
                    />
                  </div>
                  <p className="text-right text-xs font-medium leading-5 text-foreground">
                    {row.value.toFixed(1)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[0.65rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet">
              Theme tags
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {sampleProfile.themeTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center border border-line px-2.5 py-1 text-[0.7rem] font-medium uppercase leading-4 tracking-[0.14em] text-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="max-w-2xl text-sm leading-6 text-muted">
        {sampleProfile.insight}
      </p>
    </div>
  );
}
