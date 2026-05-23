"use client";

import {
  useState,
  type ReactNode,
  type SVGProps,
} from "react";
import type {
  SjmsFlowStep,
  SjmsKpi,
  SjmsPreviewData,
  SjmsScoringRow,
} from "@/lib/sjms-preview-data";
import {
  ModalArrow,
  ModalSectionLabel,
  ModalTabs,
  ProjectModalShell,
  SkillsImpactColumns,
} from "./ProjectModalShell";

type SjmsProjectModalProps = {
  data: SjmsPreviewData;
  isOpen: boolean;
  onClose: () => void;
};

type TabId = "overview" | "scoring" | "trail";
type SjmsIconName =
  | "arrow-right"
  | "clipboard-check"
  | "check-circle"
  | "file"
  | "list-check"
  | "target-dollar"
  | "wallet"
  | "workflow"
  | "zap-check";

const TAB_ITEMS: Array<{ id: TabId; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "scoring", label: "Scoring Logic" },
  { id: "trail", label: "Decision Trail" },
];

const KPI_ICONS: Record<string, SjmsIconName> = {
  "Awards supported": "wallet",
  "Review stages": "list-check",
  "Scoring logic": "zap-check",
  "Reviewer workflow": "workflow",
};

const FLOW_ICONS: SjmsIconName[] = [
  "file",
  "clipboard-check",
  "check-circle",
  "target-dollar",
];

const USAGE_ICONS: SjmsIconName[] = [
  "file",
  "clipboard-check",
  "target-dollar",
  "list-check",
];

const ICON_PATHS: Record<SjmsIconName, ReactNode> = {
  "arrow-right": (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  "clipboard-check": (
    <>
      <rect x="6" y="4.5" width="12" height="16" rx="1.5" />
      <path d="M9 4.5V3.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <path d="M9 11h6" />
      <path d="m9.5 15 1.75 1.75L15 13" />
    </>
  ),
  "check-circle": (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.5 12.5 2.25 2.25 4.75-5" />
    </>
  ),
  file: (
    <>
      <path d="M8 3.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 7 19V5a1.5 1.5 0 0 1 1-1.4Z" />
      <path d="M14 3.5V8h4" />
      <path d="M9.5 12h5M9.5 15.5h5" />
    </>
  ),
  "list-check": (
    <>
      <path d="M10 7h8M10 12h8M10 17h8" />
      <path d="m4.5 7 1.5 1.5L8.5 6" />
      <path d="m4.5 12 1.5 1.5L8.5 11" />
      <path d="m4.5 17 1.5 1.5L8.5 16" />
    </>
  ),
  "target-dollar": (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 6.8v10.4" />
      <path d="M14.5 8.9c-.7-.7-1.7-1.1-2.8-1.1-1.7 0-2.9.9-2.9 2.3 0 3.4 5.8 1.7 5.8 4.8 0 1.3-1.1 2.3-2.8 2.3-1.1 0-2.2-.4-3-1.2" />
    </>
  ),
  wallet: (
    <>
      <path d="M4 7.5h15a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 19 19.5H5.5A2.5 2.5 0 0 1 3 17V7a2.5 2.5 0 0 1 2.5-2.5H18" />
      <path d="M16.5 13.5h4" />
      <path d="M7 9.5h4" />
    </>
  ),
  workflow: (
    <>
      <rect x="4" y="5" width="5" height="5" rx="1" />
      <rect x="15" y="5" width="5" height="5" rx="1" />
      <rect x="9.5" y="14" width="5" height="5" rx="1" />
      <path d="M9 7.5h6" />
      <path d="M17.5 10v1.5a2.5 2.5 0 0 1-2.5 2.5H12" />
      <path d="M6.5 10v1.5A2.5 2.5 0 0 0 9 14h3" />
    </>
  ),
  "zap-check": (
    <>
      <path d="M13 3.5 6.5 12H11l-1 8.5 6.5-8H12l1-9Z" />
      <path d="m15.25 16.25 1.5 1.5 3-3" />
    </>
  ),
};

export function SjmsProjectModal({
  data,
  isOpen,
  onClose,
}: SjmsProjectModalProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const handleClose = () => {
    setActiveTab("overview");
    onClose();
  };

  return (
    <ProjectModalShell
      isOpen={isOpen}
      onClose={handleClose}
      labelledById="sjms-modal-title"
      title={data.title}
      summary={data.summary}
      eyebrow={data.eyebrow}
    >
      <section>
        <ModalSectionLabel>Impact snapshot</ModalSectionLabel>
        <div className="mt-4">
          <SjmsKpiStrip items={data.kpis} />
        </div>
      </section>

      <section>
        <ModalTabs
          items={TAB_ITEMS}
          active={activeTab}
          onChange={setActiveTab}
          ariaLabel="SJMS case study sections"
          idPrefix="sjms"
        />

        <div className="mt-7">
          {activeTab === "overview" ? (
            <TabPanel id="overview">
              <OverviewTab steps={data.flow} insight={data.overviewInsight} />
            </TabPanel>
          ) : null}
          {activeTab === "scoring" ? (
            <TabPanel id="scoring">
              <ScoringTab
                title={data.scoring.title}
                columns={data.scoring.columns}
                rows={data.scoring.rows}
                insight={data.scoring.insight}
              />
            </TabPanel>
          ) : null}
          {activeTab === "trail" ? (
            <TabPanel id="trail">
              <DecisionTrailTab
                before={data.before}
                after={data.after}
                usage={data.usage}
                usageNote={data.usageNote}
              />
            </TabPanel>
          ) : null}
        </div>
      </section>

      <SkillsImpactColumns skills={data.skills} impact={data.impact} />
    </ProjectModalShell>
  );
}

function TabPanel({
  id,
  children,
}: {
  id: TabId;
  children: ReactNode;
}) {
  return (
    <div
      id={`sjms-panel-${id}`}
      role="tabpanel"
      aria-labelledby={`sjms-tab-${id}`}
    >
      {children}
    </div>
  );
}

function SjmsKpiStrip({ items }: { items: SjmsKpi[] }) {
  return (
    <div className="grid gap-x-6 gap-y-5 border-y border-line py-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label}>
          <p
            className={
              item.numeric
                ? "font-display text-[2.35rem] font-medium leading-none text-foreground lg:text-[2.7rem]"
                : "font-display text-[1.55rem] font-medium leading-tight tracking-[0.01em] text-foreground lg:text-[1.75rem]"
            }
          >
            {item.value}
          </p>
          <div className="mt-2 flex items-center gap-2 text-[0.72rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet">
            <SjmsIcon
              name={KPI_ICONS[item.label] ?? "list-check"}
              className="h-3.5 w-3.5"
            />
            <span>{item.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function OverviewTab({
  steps,
  insight,
}: {
  steps: SjmsFlowStep[];
  insight: string;
}) {
  return (
    <div className="space-y-6">
      <div className="hidden flex-wrap items-center gap-3 border-b border-line pb-4 text-[0.72rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet sm:flex">
        {steps.map((step, index) => (
            <div key={step.label} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <SjmsIcon
                name={FLOW_ICONS[index] ?? "list-check"}
                className="h-3.5 w-3.5"
              />
              <span>{step.label}</span>
            </div>
            {index < steps.length - 1 ? (
              <ModalArrow className="text-[0.95rem]" />
            ) : null}
          </div>
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-4">
        {steps.map((step, index) => {
          const emphasized = Boolean(step.emphasized);
          return (
            <article
              key={step.label}
              className="border px-4 py-4 sm:px-5"
              style={
                emphasized
                  ? {
                      borderColor: "var(--sage-line)",
                      background: "var(--sage-soft)",
                    }
                  : undefined
              }
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <SjmsIcon
                    name={FLOW_ICONS[index] ?? "list-check"}
                    className="h-4 w-4 text-quiet"
                  />
                  <p className="text-[0.92rem] font-medium leading-6 text-foreground">
                    {step.label}
                  </p>
                </div>
                <span className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-quiet">
                  {index + 1}
                </span>
              </div>
              {step.sublabel ? (
                <p className="mt-2 text-sm leading-6 text-muted">{step.sublabel}</p>
              ) : null}
            </article>
          );
        })}
      </div>

      <p className="max-w-3xl text-sm leading-6 text-muted">{insight}</p>
    </div>
  );
}

function ScoringTab({
  title,
  columns,
  rows,
  insight,
}: {
  title: string;
  columns: string[];
  rows: SjmsScoringRow[];
  insight: string;
}) {
  return (
    <div className="space-y-5">
      <div>
        <ModalSectionLabel>{title}</ModalSectionLabel>
      </div>
      <ScoringTable columns={columns} rows={rows} />
      <p className="max-w-3xl text-sm leading-6 text-muted">{insight}</p>
    </div>
  );
}

function DecisionTrailTab({
  before,
  after,
  usage,
  usageNote,
}: {
  before: string[];
  after: string[];
  usage: string[];
  usageNote: string;
}) {
  return (
    <div className="space-y-7">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-10">
        <CompactList heading="Before" items={before} />
        <div
          aria-hidden="true"
          className="hidden self-stretch text-quiet lg:flex lg:items-center lg:justify-center"
        >
          <ModalArrow />
        </div>
        <CompactList heading="After" items={after} accent />
      </div>

      <div>
        <ModalSectionLabel>How it was used</ModalSectionLabel>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {usage.map((item, index) => (
            <div
              key={item}
              className="border-t border-line pt-3 text-sm font-medium leading-6 text-foreground"
            >
              <div className="flex items-center gap-2">
                <SjmsIcon
                  name={USAGE_ICONS[index] ?? "list-check"}
                  className="h-3.5 w-3.5 text-quiet"
                />
                <span>{item}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 max-w-3xl text-sm leading-6 text-muted">{usageNote}</p>
      </div>
    </div>
  );
}

function ScoringTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: SjmsScoringRow[];
}) {
  return (
    <div className="overflow-x-auto border-y border-line">
      <table className="w-full min-w-[34rem] border-collapse text-left">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                scope="col"
                className="border-b border-line px-4 py-3 text-[0.72rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const isLast = index === rows.length - 1;
            return (
              <tr key={row.applicant}>
                <ScoringCell isLast={isLast} className="font-medium text-foreground">
                  {row.applicant}
                </ScoringCell>
                <ScoringCell isLast={isLast}>
                  <span
                    className="text-sm font-medium leading-5"
                    style={{
                      color:
                        row.eligibility === "Complete"
                          ? "var(--foreground)"
                          : "var(--quiet)",
                    }}
                  >
                    {row.eligibility}
                  </span>
                </ScoringCell>
                <ScoringCell
                  isLast={isLast}
                  className="font-display text-[1.15rem] text-foreground"
                >
                  {row.reviewerAvg}
                </ScoringCell>
                <ScoringCell isLast={isLast}>
                  <ValidationPill value={row.validation} />
                </ScoringCell>
                <ScoringCell isLast={isLast} className="text-foreground">
                  {row.decision}
                </ScoringCell>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ScoringCell({
  children,
  isLast,
  className = "",
}: {
  children: ReactNode;
  isLast: boolean;
  className?: string;
}) {
  return (
    <td
      className={`px-4 py-4 align-middle text-sm leading-6 text-muted ${
        isLast ? "" : "border-b border-line"
      } ${className}`}
    >
      {children}
    </td>
  );
}

function ValidationPill({ value }: { value: "Pass" | "Flag" }) {
  const isFlag = value === "Flag";

  return (
    <span
      className="inline-flex items-center gap-1.5 border px-2.5 py-1 text-[0.72rem] font-medium uppercase leading-4 tracking-[0.14em]"
      style={
        isFlag
          ? {
              borderColor: "var(--sage-line)",
              background: "var(--sage-soft)",
              color: "var(--foreground)",
            }
          : {
              borderColor: "var(--line)",
              color: "var(--quiet)",
            }
      }
    >
      <SjmsIcon
        name={isFlag ? "list-check" : "check-circle"}
        className="h-3.5 w-3.5"
      />
      <span>{value}</span>
    </span>
  );
}

function CompactList({
  heading,
  items,
  accent = false,
}: {
  heading: string;
  items: string[];
  accent?: boolean;
}) {
  return (
    <div>
      <ModalSectionLabel>{heading}</ModalSectionLabel>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="border-t pt-3 text-sm leading-6 text-foreground"
            style={{
              borderColor: accent ? "var(--sage-line)" : "var(--line)",
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SjmsIcon({
  name,
  className = "h-4 w-4",
  ...rest
}: { name: SjmsIconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.35}
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
