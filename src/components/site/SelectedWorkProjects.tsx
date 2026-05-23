"use client";

import { useState } from "react";
import type { Project } from "./ProjectFeature";
import { IfnhProjectModal } from "./IfnhProjectModal";
import { MotionReveal } from "./MotionReveal";
import { PslProjectModal } from "./PslProjectModal";
import { ScarletWellProjectModal } from "./ScarletWellProjectModal";
import { WellnessThroughClayProjectModal } from "./WellnessThroughClayProjectModal";
import type { IfnhPreviewData } from "@/lib/ifnh-preview-data";
import type { PslPreviewData } from "@/lib/psl-preview-data";
import type { ScarletWellBriefData } from "@/lib/scarletwell-preview-data";
import type { WellnessThroughClayPreviewData } from "@/lib/wellness-through-clay-preview-data";

type SelectedWorkProjectsProps = {
  projects: Project[];
  scarletWellData: ScarletWellBriefData;
  wellnessThroughClayData: WellnessThroughClayPreviewData;
  ifnhData: IfnhPreviewData;
  pslData: PslPreviewData;
};

function MicroVisual({ variant }: { variant: Project["visual"] }) {
  if (variant === "compare") {
    return (
      <svg
        viewBox="0 0 80 44"
        className="h-11 w-20"
        role="img"
        aria-label="Comparison visual"
      >
        <rect x="6" y="14" width="28" height="22" fill="currentColor" fillOpacity="0.18" />
        <rect x="42" y="6" width="28" height="30" fill="var(--accent)" />
        <line x1="2" x2="78" y1="40" y2="40" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
      </svg>
    );
  }
  if (variant === "funnel") {
    return (
      <svg
        viewBox="0 0 80 44"
        className="h-11 w-20"
        role="img"
        aria-label="Funnel visual"
      >
        <rect x="6" y="6" width="68" height="8" fill="currentColor" fillOpacity="0.22" />
        <rect x="14" y="18" width="52" height="8" fill="var(--accent)" />
        <rect x="26" y="30" width="28" height="8" fill="currentColor" fillOpacity="0.45" />
      </svg>
    );
  }
  if (variant === "growth") {
    return (
      <svg
        viewBox="0 0 80 44"
        className="h-11 w-20"
        role="img"
        aria-label="Growth visual"
      >
        <line x1="2" x2="78" y1="40" y2="40" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
        <polyline
          points="6,34 26,28 48,18 72,8"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="72" cy="8" r="3" fill="var(--accent)" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 80 44"
      className="h-11 w-20"
      role="img"
      aria-label="Delta visual"
    >
      <rect x="6" y="22" width="14" height="14" fill="currentColor" fillOpacity="0.18" />
      <rect x="24" y="16" width="14" height="20" fill="currentColor" fillOpacity="0.28" />
      <rect x="42" y="10" width="14" height="26" fill="var(--accent)" />
      <rect x="60" y="4" width="14" height="32" fill="var(--accent)" />
    </svg>
  );
}

function ProjectRow({
  project,
  isOpenable,
  onToggle,
}: {
  project: Project;
  isOpenable: boolean;
  onToggle?: () => void;
}) {
  const rowContent = (
    <>
      <div className="flex items-baseline gap-4 sm:block">
        <p className="text-xs font-medium text-quiet">{project.number}</p>
        <p className="text-[0.7rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet sm:mt-2">
          {project.category}
        </p>
      </div>

      <div className="min-w-0">
        <h3 className="font-display text-[2.4rem] font-medium leading-[0.95] text-foreground sm:text-[2.9rem] lg:text-5xl">
          <span className="relative inline-block pb-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100">
            {project.title}
          </span>
        </h3>
        <p className="mt-4 max-w-xl text-[0.95rem] leading-7 text-muted">
          {project.outcome}
        </p>
      </div>

      <div className="flex flex-col gap-5 sm:items-end">
        <div className="grid w-full grid-cols-3 gap-x-4 sm:w-auto sm:gap-x-7">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="sm:text-right">
              <p className="font-display text-[1.75rem] font-medium leading-none text-foreground sm:text-3xl">
                {metric.value}
              </p>
              <p className="mt-1.5 text-[0.65rem] font-medium uppercase leading-4 tracking-[0.14em] text-quiet">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
        <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-end sm:gap-6">
          <MicroVisual variant={project.visual} />
          {isOpenable ? (
            <span className="inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase leading-5 tracking-[0.18em] text-foreground">
              <span>Open</span>
              <span aria-hidden="true" className="modal-arrow text-[0.9rem]">→</span>
            </span>
          ) : (
            <span className="text-[0.7rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
              {project.previewDetail ?? project.details[0]}
            </span>
          )}
        </div>
      </div>
    </>
  );

  const layout =
    "group grid w-full gap-7 border-t border-line py-8 transition duration-500 ease-out hover:border-foreground/30 sm:grid-cols-[6rem_1.1fr_1.2fr] sm:items-start sm:gap-10 lg:py-10 motion-reduce:transition-none";

  if (isOpenable) {
    return (
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={onToggle}
        className={`focus-ring text-left cursor-pointer ${layout}`}
      >
        {rowContent}
      </button>
    );
  }

  return <article className={layout}>{rowContent}</article>;
}

export function SelectedWorkProjects({
  projects,
  scarletWellData,
  wellnessThroughClayData,
  ifnhData,
  pslData,
}: SelectedWorkProjectsProps) {
  const [isScarletWellOpen, setIsScarletWellOpen] = useState(false);
  const [isWellnessThroughClayOpen, setIsWellnessThroughClayOpen] =
    useState(false);
  const [isIfnhOpen, setIsIfnhOpen] = useState(false);
  const [isPslOpen, setIsPslOpen] = useState(false);

  return (
    <div className="border-b border-line">
      {projects.map((project, index) => {
        const onToggle =
          project.title === "ScarletWell Studio"
            ? () => setIsScarletWellOpen(true)
            : project.title === "Wellness Through Clay"
              ? () => setIsWellnessThroughClayOpen(true)
              : project.title === "IFNH InsightOS"
                ? () => setIsIfnhOpen(true)
                : project.title === "PSL Dashboard"
                  ? () => setIsPslOpen(true)
                  : undefined;

        return (
          <MotionReveal key={project.title} delay={index * 0.05}>
            <ProjectRow
              project={project}
              isOpenable={Boolean(onToggle)}
              onToggle={onToggle}
            />
          </MotionReveal>
        );
      })}
      <ScarletWellProjectModal
        data={scarletWellData}
        isOpen={isScarletWellOpen}
        onClose={() => setIsScarletWellOpen(false)}
      />
      <WellnessThroughClayProjectModal
        data={wellnessThroughClayData}
        isOpen={isWellnessThroughClayOpen}
        onClose={() => setIsWellnessThroughClayOpen(false)}
      />
      <IfnhProjectModal
        data={ifnhData}
        isOpen={isIfnhOpen}
        onClose={() => setIsIfnhOpen(false)}
      />
      <PslProjectModal
        data={pslData}
        isOpen={isPslOpen}
        onClose={() => setIsPslOpen(false)}
      />
    </div>
  );
}
