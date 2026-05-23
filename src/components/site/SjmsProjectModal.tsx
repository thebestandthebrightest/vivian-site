"use client";

import type { ReactNode, SVGProps } from "react";
import type {
  SjmsFlowStep,
  SjmsKpi,
  SjmsPreviewData,
  SjmsScoringRow,
} from "@/lib/sjms-preview-data";
import { ModalSectionLabel, ProjectModalShell } from "./ProjectModalShell";

type SjmsProjectModalProps = {
  data: SjmsPreviewData;
  isOpen: boolean;
  onClose: () => void;
};

export function SjmsProjectModal({
  data,
  isOpen,
  onClose,
}: SjmsProjectModalProps) {
  return (
    <ProjectModalShell
      isOpen={isOpen}
      onClose={onClose}
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
        <ModalSectionLabel>Review workflow</ModalSectionLabel>
        <div className="mt-5">
          <SjmsFlow steps={data.flow} />
        </div>
      </section>

      <section>
        <ModalSectionLabel>Scoring view</ModalSectionLabel>
        <div className="mt-5">
          <ScoringTable
            columns={data.scoring.columns}
            rows={data.scoring.rows}
          />
        </div>
      </section>

      <section>
        <ModalSectionLabel>Before → After</ModalSectionLabel>
        <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-10">
          <BeforeAfterColumn heading="Before" items={data.before} />
          <div
            aria-hidden="true"
            className="hidden self-stretch lg:flex lg:items-center lg:justify-center"
          >
            <ArrowIcon className="h-5 w-5 text-quiet" />
          </div>
          <BeforeAfterColumn heading="After" items={data.after} accent />
        </div>
      </section>

      <section>
        <ModalSectionLabel>How it was used</ModalSectionLabel>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {data.usage.map((item) => (
            <div
              key={item}
              className="border-t border-line pt-3 text-sm font-medium leading-6 text-foreground"
            >
              {item}
            </div>
          ))}
        </div>
        {data.usageNote ? (
          <p className="mt-5 max-w-2xl text-sm leading-6 text-muted">
            {data.usageNote}
          </p>
        ) : null}
      </section>

      <section className="border-t border-line pt-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-12">
          <div>
            <ModalSectionLabel>Skills used</ModalSectionLabel>
            <ul className="mt-5 space-y-5">
              {data.skills.map((skill) => (
                <li key={skill.title}>
                  <p className="text-sm font-medium leading-5 text-foreground">
                    {skill.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-6 text-muted">
                    {skill.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div
            aria-hidden="true"
            className="hidden self-stretch lg:flex lg:items-center"
          >
            <ArrowIcon className="h-5 w-5 text-quiet" />
          </div>

          <div>
            <ModalSectionLabel>Impact</ModalSectionLabel>
            <ul className="mt-5 space-y-5">
              {data.impact.map((item) => (
                <li key={item.title}>
                  <p className="text-sm font-medium leading-5 text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-6 text-muted">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </ProjectModalShell>
  );
}

function SjmsKpiStrip({ items }: { items: SjmsKpi[] }) {
  return (
    <div className="grid gap-x-8 gap-y-6 border-y border-line py-7 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label}>
          <p
            className={
              item.numeric
                ? "font-display text-4xl font-medium leading-none text-foreground lg:text-[2.75rem]"
                : "font-display text-2xl font-medium leading-tight text-foreground lg:text-[1.85rem]"
            }
            style={
              item.highlight
                ? {
                    background: "var(--sage-soft)",
                    boxShadow: "inset 0 -0.35em 0 var(--sage-soft)",
                    display: "inline-block",
                    padding: "0 0.2em",
                  }
                : undefined
            }
          >
            {item.value}
          </p>
          <p className="mt-2 text-[0.7rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}

function SjmsFlow({ steps }: { steps: SjmsFlowStep[] }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-3">
      {steps.map((step, index) => (
        <div key={step.label} className="flex flex-1 items-stretch gap-2 sm:gap-3">
          <div
            className="flex-1 border border-line px-4 py-4 sm:px-5 sm:py-5"
            style={
              step.emphasized
                ? {
                    borderColor: "var(--sage-line)",
                    background: "var(--sage-soft)",
                  }
                : { background: "var(--background)" }
            }
          >
            <p className="font-display text-lg font-medium leading-tight text-foreground sm:text-xl">
              {step.label}
            </p>
            {step.sublabel ? (
              <p className="mt-2 text-xs leading-5 text-muted">{step.sublabel}</p>
            ) : null}
          </div>
          {index < steps.length - 1 ? (
            <div
              aria-hidden="true"
              className="flex items-center justify-center self-stretch text-quiet"
            >
              <span className="sm:hidden">↓</span>
              <span className="hidden sm:inline">→</span>
            </div>
          ) : null}
        </div>
      ))}
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
      <table className="w-full min-w-[36rem] border-collapse text-left">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                scope="col"
                className="border-b border-line px-4 py-3 text-[0.65rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const isLast = idx === rows.length - 1;
            return (
              <tr key={row.applicant}>
                <Cell isLast={isLast} className="font-medium text-foreground">
                  {row.applicant}
                </Cell>
                <Cell isLast={isLast}>
                  <EligibilityLabel value={row.eligibility} />
                </Cell>
                <Cell isLast={isLast} className="font-display text-base text-foreground">
                  {row.reviewerAvg}
                </Cell>
                <Cell isLast={isLast}>
                  <ValidationPill value={row.validation} />
                </Cell>
                <Cell isLast={isLast} className="text-foreground">
                  {row.decision}
                </Cell>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Cell({
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

function EligibilityLabel({ value }: { value: string }) {
  const isComplete = value.toLowerCase() === "complete";
  return (
    <span
      className="text-xs font-medium leading-5"
      style={{ color: isComplete ? "var(--foreground)" : "var(--quiet)" }}
    >
      {value}
    </span>
  );
}

function ValidationPill({ value }: { value: "Pass" | "Flag" }) {
  const isFlag = value === "Flag";
  return (
    <span
      className="inline-flex items-center border px-2.5 py-1 text-[0.65rem] font-medium uppercase leading-4 tracking-[0.16em]"
      style={
        isFlag
          ? {
              borderColor: "var(--sage-line)",
              background: "var(--sage-soft)",
              color: "var(--foreground)",
            }
          : {
              borderColor: "var(--line)",
              background: "var(--background)",
              color: "var(--quiet)",
            }
      }
    >
      {value}
    </span>
  );
}

function BeforeAfterColumn({
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
            className="border-t pt-3 text-sm leading-6"
            style={{
              borderColor: accent ? "var(--sage-line)" : "var(--line)",
              color: "var(--foreground)",
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ArrowIcon({ className = "h-4 w-4", ...rest }: SVGProps<SVGSVGElement>) {
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
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}
