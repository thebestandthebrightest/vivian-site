"use client";

import type { IfnhPreviewData } from "@/lib/ifnh-preview-data";
import {
  DeltaCards,
  FlowDiagram,
  KpiStrip,
  ModalSectionLabel,
  ProjectModalShell,
  UsageGrid,
} from "./ProjectModalShell";

type IfnhProjectModalProps = {
  data: IfnhPreviewData;
  isOpen: boolean;
  onClose: () => void;
};

const dataflow = [
  {
    label: "Participation + survey data",
    sublabel: "Real student usage · n = 105",
  },
  {
    label: "Engagement patterns",
    sublabel: "Funnel, seating, awareness",
  },
  {
    label: "Forecasted needs",
    sublabel: "Capacity + connection gaps",
    emphasized: true,
  },
  {
    label: "Program decisions",
    sublabel: "Space + programming priorities",
  },
];

const usage = [
  "Student experience strategy",
  "Space planning",
  "Capacity modeling",
  "Programming priorities",
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
    { label: "Met someone new", value: "37%", highlight: true },
  ];

  const funnelSteps = data.funnel.steps;
  const maxValue = 100;

  return (
    <ProjectModalShell
      isOpen={isOpen}
      onClose={onClose}
      labelledById="ifnh-modal-title"
      title="IFNH InsightOS"
      summary="A campus engagement dashboard using real student participation and survey data to identify patterns, forecast needs, and guide program decisions."
    >
      <section>
        <ModalSectionLabel>Impact snapshot</ModalSectionLabel>
        <div className="mt-4">
          <KpiStrip items={kpis} />
        </div>
      </section>

      <section>
        <ModalSectionLabel>From real student data to decisions</ModalSectionLabel>
        <div className="mt-5">
          <FlowDiagram steps={dataflow} />
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
                      ? "var(--sage-soft)"
                      : "rgba(72,38,29,0.06)",
                    border: isLast
                      ? "1px solid var(--sage-line)"
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
        <p className="mt-5 max-w-2xl text-sm leading-7 text-muted">
          {data.funnel.insight}
        </p>
      </section>

      <section>
        <ModalSectionLabel>Top signals</ModalSectionLabel>
        <div className="mt-5">
          <DeltaCards
            items={[
              {
                label: "Seating flexibility",
                value: "48%",
                direction: "up",
                detail: "Top open-text theme in survey responses.",
              },
              {
                label: "Connection gap",
                value: "30 pt",
                direction: "down",
                detail: "Open to meeting (67%) vs. actually met (37%).",
                highlight: true,
              },
              {
                label: "Wellness awareness",
                value: "45%",
                direction: "up",
                detail: "Aware of ScarletWell resources on-site.",
              },
            ]}
          />
        </div>
      </section>

      <section>
        <ModalSectionLabel>How it’s used</ModalSectionLabel>
        <div className="mt-4">
          <UsageGrid items={usage} />
        </div>
      </section>
    </ProjectModalShell>
  );
}
