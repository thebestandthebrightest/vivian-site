"use client";

import type { PslPreviewData } from "@/lib/psl-preview-data";
import {
  CompactBars,
  KpiStrip,
  ModalSectionLabel,
  ProjectModalShell,
} from "./ProjectModalShell";

type PslProjectModalProps = {
  data: PslPreviewData;
  isOpen: boolean;
  onClose: () => void;
};

export function PslProjectModal({
  data,
  isOpen,
  onClose,
}: PslProjectModalProps) {
  const competencyBars = data.competency.items.map((item, index) => ({
    label: item.label,
    value: item.post,
    display: `${item.pre.toFixed(1)} → ${item.post.toFixed(1)}`,
    highlight: index < 2,
  }));

  const pathwayMax = Math.max(...data.cohortPathway.map((s) => s.value));

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
        <ModalSectionLabel>From scattered data to decisions</ModalSectionLabel>
        <div className="mt-5 flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-2 lg:flex-1">
            {data.pipeline.inputs.map((input) => (
              <div
                key={input}
                className="border border-line bg-background px-4 py-3 text-sm font-medium leading-5 text-foreground"
              >
                {input}
              </div>
            ))}
          </div>
          <PipelineArrow />
          <div className="border border-line bg-background px-4 py-4 text-sm font-medium leading-5 text-foreground lg:flex-1">
            {data.pipeline.stages[0]}
          </div>
          <PipelineArrow />
          <div className="border border-line bg-background px-4 py-4 text-sm font-medium leading-5 text-foreground lg:flex-1">
            {data.pipeline.stages[1]}
          </div>
          <PipelineArrow emphasized />
          <div
            className="px-4 py-4 text-sm font-medium leading-5 text-foreground lg:flex-1"
            style={{
              background: "var(--sage-soft)",
              border: "1px solid var(--sage-line)",
            }}
          >
            {data.pipeline.stages[2]}
          </div>
        </div>
      </section>

      <section>
        <ModalSectionLabel>Cohort pathway</ModalSectionLabel>
        <div className="mt-5 space-y-2">
          {data.cohortPathway.map((step, idx) => {
            const width = (step.value / pathwayMax) * 100;
            const isLast = idx === data.cohortPathway.length - 1;
            return (
              <div
                key={step.label}
                className="flex items-center justify-between border px-4 py-3 sm:px-5 sm:py-4"
                style={{
                  width: `${width}%`,
                  minWidth: "16rem",
                  background: isLast
                    ? "var(--sage-soft)"
                    : "rgba(72,38,29,0.06)",
                  borderColor: isLast ? "var(--sage-line)" : "var(--line)",
                }}
              >
                <p className="text-xs font-medium leading-5 text-foreground sm:text-sm">
                  {step.label}
                </p>
                <p className="font-display text-2xl font-medium leading-none text-foreground sm:text-3xl">
                  {step.display}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <ModalSectionLabel>Pre/post competency growth</ModalSectionLabel>
        <div className="mt-5">
          <CompactBars items={competencyBars} />
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
          21 aligned pre/post survey questions showed gains across core
          peer-support skills. Scale 1–5.
        </p>
      </section>

      <section>
        <ModalSectionLabel>Qualitative synthesis</ModalSectionLabel>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Themes surfaced from 22 wrap-up interviews.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {data.themes.map((theme) => (
            <div
              key={theme}
              className="border border-line bg-background px-4 py-5 text-sm font-medium leading-5 text-foreground"
            >
              {theme}
            </div>
          ))}
        </div>
      </section>

      <section>
        <ModalSectionLabel>Recommendations</ModalSectionLabel>
        <div className="mt-4 flex items-baseline gap-3">
          <p
            className="font-display text-4xl font-medium leading-none text-foreground"
            style={{
              background: "var(--sage-soft)",
              boxShadow: "inset 0 -0.35em 0 var(--sage-soft)",
              display: "inline-block",
              padding: "0 0.2em",
            }}
          >
            {data.recommendations.total}
          </p>
          <p className="text-sm leading-5 text-muted">
            recommendations generated
          </p>
        </div>
        <ol className="mt-5 divide-y divide-[color:var(--line)] border-y border-line">
          {data.recommendations.examples.map((rec, idx) => (
            <li
              key={rec}
              className="flex items-baseline gap-4 py-3 text-sm leading-6 text-foreground"
            >
              <span className="text-[0.7rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span>{rec}</span>
            </li>
          ))}
        </ol>
      </section>
    </ProjectModalShell>
  );
}

function PipelineArrow({ emphasized = false }: { emphasized?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center self-stretch text-quiet"
      style={emphasized ? { color: "var(--foreground)" } : undefined}
    >
      <span className="lg:hidden">↓</span>
      <span className="hidden lg:inline">→</span>
    </div>
  );
}
