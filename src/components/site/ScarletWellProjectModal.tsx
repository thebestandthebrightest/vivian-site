"use client";

import type { ScarletWellBriefData } from "@/lib/scarletwell-preview-data";
import {
  CompactBars,
  DeltaCards,
  KpiStrip,
  ModalSectionLabel,
  ProjectModalShell,
  UsageGrid,
} from "./ProjectModalShell";

type ScarletWellProjectModalProps = {
  data: ScarletWellBriefData;
  isOpen: boolean;
  onClose: () => void;
};

const strategicUses = [
  "Compare program performance",
  "Track grant cycle changes",
  "Identify cost efficiency",
  "Support funding decisions",
];

export function ScarletWellProjectModal({
  data,
  isOpen,
  onClose,
}: ScarletWellProjectModalProps) {
  const [previous, current] = data.cycles;

  const kpis = [
    { label: "Participants reached", value: "3,003" },
    { label: "Activities analyzed", value: "210" },
    { label: "Budget reviewed", value: "$41K+" },
    { label: "Programs evaluated", value: "41" },
  ];

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

  const compareBars = [
    {
      label: "Participants · 2024-25",
      value: previous.participants,
      display: previous.participants.toLocaleString(),
    },
    {
      label: "Participants · 2025-26",
      value: current.participants,
      display: current.participants.toLocaleString(),
      highlight: true,
    },
    {
      label: "Budget · 2024-25",
      value: previous.budget,
      display: `$${(previous.budget / 1000).toFixed(1)}K`,
    },
    {
      label: "Budget · 2025-26",
      value: current.budget,
      display: `$${(current.budget / 1000).toFixed(1)}K`,
      highlight: true,
    },
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
        <div className="flex items-baseline justify-between gap-4">
          <ModalSectionLabel>Year-over-year change</ModalSectionLabel>
          <p className="text-xs leading-5 text-quiet">2024-25 → 2025-26</p>
        </div>
        <div className="mt-5">
          <DeltaCards items={deltas} />
        </div>
        <div className="mt-8">
          <CompactBars items={compareBars} />
        </div>
        <p className="mt-6 max-w-2xl text-sm leading-7 text-muted">
          Higher reach with lower documented spend — cost per participant dropped
          roughly 51% year over year.
        </p>
      </section>

      <section>
        <ModalSectionLabel>What changed</ModalSectionLabel>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          <li className="border-t border-line pt-3 text-sm leading-6 text-foreground">
            Consolidated 41 wellness initiatives into one comparable portfolio view.
          </li>
          <li className="border-t border-line pt-3 text-sm leading-6 text-foreground">
            Tied participation, activities, and dollars to a shared planning cycle.
          </li>
          <li className="border-t border-line pt-3 text-sm leading-6 text-foreground">
            Made cost efficiency legible to funders and program leads in one place.
          </li>
        </ul>
      </section>

      <section>
        <ModalSectionLabel>How it’s used</ModalSectionLabel>
        <div className="mt-4">
          <UsageGrid items={strategicUses} />
        </div>
      </section>
    </ProjectModalShell>
  );
}
