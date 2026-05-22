"use client";

import type { ReactNode } from "react";
import type { IfnhPreviewData } from "@/lib/ifnh-preview-data";
import {
  KpiStrip,
  ModalSectionLabel,
  ProjectModalShell,
} from "./ProjectModalShell";

type IfnhProjectModalProps = {
  data: IfnhPreviewData;
  isOpen: boolean;
  onClose: () => void;
};

const skills = [
  { label: "Survey analysis", Icon: BarChartIcon },
  { label: "Capacity modeling", Icon: SquareStackIcon },
  { label: "Recommendation design", Icon: ListChecksIcon },
];

const impacts = [
  { label: "Identified the 30-point connection gap", Icon: UsersIcon },
  { label: "Modeled peak seating shortfall", Icon: LayoutGridIcon },
  { label: "Prioritized space and programming changes", Icon: TargetIcon },
];

const scenarios = [
  {
    name: "Current layout",
    seatingFit: { label: "150 / 180", level: 2 },
    interaction: "Low",
    effort: "—",
    recommended: false,
  },
  {
    name: "Flexible seating adjustment",
    seatingFit: { label: "~175 / 180", level: 4 },
    interaction: "Medium",
    effort: "Medium",
    recommended: false,
  },
  {
    name: "Seating + programming test",
    seatingFit: { label: "~180 / 180", level: 5 },
    interaction: "High",
    effort: "Medium",
    recommended: true,
  },
];

export function IfnhProjectModal({
  data,
  isOpen,
  onClose,
}: IfnhProjectModalProps) {
  const kpis = [
    { label: "Survey responses", value: "105" },
    { label: "Regular visitors", value: "78%" },
    { label: "Open to meeting", value: "67%" },
    { label: "Met someone new", value: "37%" },
  ];

  const funnelSteps = data.funnel.steps;
  const maxValue = 100;
  const usablePct = (data.capacity.usable / data.capacity.demand) * 100;

  return (
    <ProjectModalShell
      isOpen={isOpen}
      onClose={onClose}
      labelledById="ifnh-modal-title"
      title="IFNH InsightOS"
      summary="A campus engagement dashboard using real student participation and survey data to identify patterns, forecast needs, and guide program decisions."
    >
      <section>
        <ModalSectionLabel>Survey snapshot</ModalSectionLabel>
        <div className="mt-4">
          <KpiStrip items={kpis} />
        </div>
      </section>

      <section>
        <ModalSectionLabel>Presence vs. interaction</ModalSectionLabel>
        <div className="mt-5 space-y-2">
          {funnelSteps.map((step, idx) => {
            const width = (step.value / maxValue) * 100;
            const isLast = idx === funnelSteps.length - 1;
            return (
              <div key={step.label}>
                <div
                  className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-4"
                  style={{
                    width: `${Math.max(width, 25)}%`,
                    marginLeft: `${(100 - Math.max(width, 25)) / 2}%`,
                    background: isLast
                      ? "var(--accent-soft)"
                      : "rgba(72,38,29,0.06)",
                    border: isLast
                      ? "1px solid var(--accent)"
                      : "1px solid var(--line)",
                  }}
                >
                  <p className="text-xs font-medium leading-5 text-foreground sm:text-sm">
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
        <p className="mt-5 max-w-2xl text-sm leading-6 text-muted">
          {data.funnel.insight}
        </p>
      </section>

      <section>
        <ModalSectionLabel>Demand exceeds usable seating</ModalSectionLabel>
        <div className="mt-5 space-y-3">
          <CapacityRow
            label="Usable seating"
            value={`${data.capacity.usable}`}
            widthPct={usablePct}
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
            style={{
              background: "var(--accent-soft)",
              padding: "0 0.25em",
            }}
          >
            +{data.capacity.overage}
          </p>
          <p className="text-sm leading-5 text-muted">
            seat shortfall at peak
          </p>
        </div>
      </section>

      <section>
        <ModalSectionLabel>Space scenario model</ModalSectionLabel>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left">
            <thead>
              <tr className="text-[0.65rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
                <th className="border-b border-line pb-3 pr-4 font-medium">
                  Scenario
                </th>
                <th className="border-b border-line pb-3 pr-4 font-medium">
                  Seating fit
                </th>
                <th className="border-b border-line pb-3 pr-4 font-medium">
                  Interaction
                </th>
                <th className="border-b border-line pb-3 font-medium">
                  Effort
                </th>
              </tr>
            </thead>
            <tbody>
              {scenarios.map((s) => (
                <tr
                  key={s.name}
                  className="text-sm leading-5 text-foreground"
                  style={
                    s.recommended
                      ? { background: "var(--sage-soft)" }
                      : undefined
                  }
                >
                  <td className="border-b border-line py-3 pr-4 align-middle">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{s.name}</span>
                      {s.recommended ? (
                        <span
                          className="text-[0.6rem] font-medium uppercase leading-4 tracking-[0.16em]"
                          style={{ color: "rgba(72,38,29,0.7)" }}
                        >
                          Recommended
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td className="border-b border-line py-3 pr-4 align-middle">
                    <div className="flex items-center gap-3">
                      <SeatingDots level={s.seatingFit.level} />
                      <span className="text-xs text-muted">
                        {s.seatingFit.label}
                      </span>
                    </div>
                  </td>
                  <td className="border-b border-line py-3 pr-4 align-middle">
                    <Tag>{s.interaction}</Tag>
                  </td>
                  <td className="border-b border-line py-3 align-middle">
                    <Tag>{s.effort}</Tag>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
              {skills.map(({ label, Icon }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 border-t border-line pt-3 text-sm leading-5 text-foreground"
                >
                  <Icon />
                  <span className="font-medium">{label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div
            aria-hidden="true"
            className="flex items-center justify-center text-quiet lg:px-2"
          >
            <span className="lg:hidden">↓</span>
            <span
              className="hidden lg:inline"
              style={{ color: "var(--accent)" }}
            >
              →
            </span>
          </div>
          <div className="lg:flex-1">
            <p className="text-[0.65rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
              Impact created
            </p>
            <ul className="mt-3 space-y-3">
              {impacts.map(({ label, Icon }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 border-t pt-3 text-sm leading-5 text-foreground"
                  style={{ borderColor: "var(--accent)" }}
                >
                  <Icon color="var(--accent)" />
                  <span className="font-medium">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-6 max-w-2xl text-sm leading-6 text-muted">
          Prioritize flexible seating and low-pressure interaction programming
          during high-traffic periods.
        </p>
      </section>
    </ProjectModalShell>
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
      <p className="text-xs font-medium leading-5 text-foreground">{label}</p>
      <div className="h-3 bg-foreground/[0.05]">
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${widthPct}%`, background: color }}
          aria-hidden="true"
        />
      </div>
      <p className="text-right text-xs font-medium leading-5 text-foreground">
        {value}
      </p>
    </div>
  );
}

function SeatingDots({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className="block h-2 w-2 rounded-full"
          style={{
            background:
              i <= level ? "var(--accent)" : "rgba(72,38,29,0.12)",
          }}
        />
      ))}
    </div>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center border border-line px-2 py-1 text-[0.7rem] font-medium uppercase leading-4 tracking-[0.12em] text-foreground">
      {children}
    </span>
  );
}

type IconProps = { color?: string };

function BarChartIcon({ color = "currentColor" }: IconProps) {
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
      <path d="M3 3v18h18" />
      <path d="M7 16V9" />
      <path d="M12 16V5" />
      <path d="M17 16v-5" />
    </svg>
  );
}

function SquareStackIcon({ color = "currentColor" }: IconProps) {
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
      <rect x="3" y="9" width="12" height="12" rx="1" />
      <path d="M7 9V7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-2" />
    </svg>
  );
}

function ListChecksIcon({ color = "currentColor" }: IconProps) {
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
      <path d="m3 17 2 2 4-4" />
      <path d="m3 7 2 2 4-4" />
      <path d="M13 6h8" />
      <path d="M13 12h8" />
      <path d="M13 18h8" />
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

function LayoutGridIcon({ color = "currentColor" }: IconProps) {
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
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function TargetIcon({ color = "currentColor" }: IconProps) {
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
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
