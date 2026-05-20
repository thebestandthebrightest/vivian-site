"use client";

import { useState } from "react";
import type { Project } from "./ProjectFeature";
import { MotionReveal } from "./MotionReveal";
import { ScarletWellProjectModal } from "./ScarletWellProjectModal";
import type { ScarletWellBriefData } from "@/lib/scarletwell-preview-data";

type SelectedWorkProjectsProps = {
  projects: Project[];
  scarletWellData: ScarletWellBriefData;
};

function ProjectTitle({ children }: { children: string }) {
  return (
    <span className="relative inline-block pb-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100">
      {children}
    </span>
  );
}

function AnalyticalPreview({
  variant,
  isFeatured = false,
}: {
  variant: string;
  isFeatured?: boolean;
}) {
  const barSets: Record<string, string[]> = {
    "01": ["72%", "44%", "88%", "58%"],
    "02": ["38%", "76%", "54%", "92%"],
    "03": ["62%", "50%", "82%", "66%"],
  };
  const bars = barSets[variant] ?? barSets["01"];
  const columnHeights = isFeatured
    ? ["1.05rem", "1.55rem", "0.82rem", "1.95rem"]
    : ["1.15rem", "0.72rem", "1.42rem", "0.96rem"];

  return (
    <div
      className={`h-16 w-full min-w-24 max-w-32 overflow-hidden border border-line bg-foreground/[0.025] p-3 opacity-75 grayscale transition duration-500 group-hover:opacity-95 sm:h-[4.75rem] sm:w-28 motion-reduce:transition-none ${
        isFeatured ? "bg-foreground/[0.035] opacity-90" : ""
      }`}
      aria-hidden="true"
    >
      <div className="flex h-full flex-col justify-between">
        <div className="grid grid-cols-4 gap-1.5">
          {bars.map((bar, index) => (
            <span
              key={`${variant}-${bar}-${index}`}
              className="block bg-foreground/25"
              style={{
                height: index % 2 === 0 ? "0.45rem" : "0.68rem",
                width: bar,
              }}
            />
          ))}
        </div>
        <div className="grid grid-cols-5 gap-1">
          {Array.from({ length: 10 }).map((_, index) => (
            <span
              key={`${variant}-cell-${index}`}
              className="h-1.5 bg-foreground/15"
            />
          ))}
        </div>
        <div className="flex items-end gap-1.5">
          {bars.map((bar, index) => (
            <span
              key={`${variant}-column-${bar}-${index}`}
              className="w-2 bg-foreground/20"
              style={{ height: columnHeights[index] }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectPreviewRow({
  project,
  isScarletWell,
  onToggle,
}: {
  project: Project;
  isScarletWell: boolean;
  onToggle?: () => void;
}) {
  const rowContent = (
    <>
      <p className="text-xs font-medium text-quiet">{project.number}</p>
      <AnalyticalPreview variant={project.number} isFeatured={isScarletWell} />
      <div className="min-w-0">
        <h3 className="font-display text-4xl font-medium leading-none text-foreground sm:text-5xl">
          <ProjectTitle>{project.title}</ProjectTitle>
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
          {project.descriptor}
        </p>
        {isScarletWell ? (
          <div className="mt-5 max-w-2xl space-y-4">
            <p className="text-sm leading-7 text-muted">{project.summary}</p>
            <p className="text-sm font-medium leading-7 text-foreground">
              {project.impact}
            </p>
            <ul className="flex flex-wrap gap-x-2 gap-y-2 text-xs leading-6 text-quiet">
              {project.details.map((detail, index) => (
                <li key={detail}>
                  {index > 0 ? (
                    <span className="text-line">{" / "}</span>
                  ) : null}
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      <div className="text-xs font-medium leading-6 text-quiet sm:max-w-64 sm:text-right">
        {isScarletWell ? (
          <span className="inline-flex items-center gap-3 text-foreground">
            <span>Open project</span>
            <span aria-hidden="true" className="text-quiet">+</span>
          </span>
        ) : (
          project.previewDetail ?? project.details[0]
        )}
      </div>
    </>
  );

  if (isScarletWell) {
    return (
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={onToggle}
        className="focus-ring group grid w-full cursor-pointer gap-5 border-t border-line py-9 text-left transition duration-500 ease-out hover:border-foreground/25 sm:grid-cols-[0.12fr_0.24fr_1fr_auto] sm:items-start sm:gap-8 lg:gap-10 lg:py-10 motion-reduce:transition-none"
      >
        {rowContent}
      </button>
    );
  }

  return (
    <article className="group grid gap-5 border-t border-line py-9 transition duration-500 ease-out hover:border-foreground/25 sm:grid-cols-[0.12fr_0.24fr_1fr_auto] sm:items-center sm:gap-8 lg:gap-10 lg:py-10 motion-reduce:transition-none">
      {rowContent}
    </article>
  );
}

export function SelectedWorkProjects({
  projects,
  scarletWellData,
}: SelectedWorkProjectsProps) {
  const [isScarletWellOpen, setIsScarletWellOpen] = useState(false);

  return (
    <div className="border-b border-line">
      {projects.map((project, index) => {
        const isScarletWell = project.title === "ScarletWell Studio";

        return (
          <MotionReveal key={project.title} delay={index * 0.05}>
            <div>
              <ProjectPreviewRow
                project={project}
                isScarletWell={isScarletWell}
                onToggle={
                  isScarletWell
                    ? () => setIsScarletWellOpen(true)
                    : undefined
                }
              />
            </div>
          </MotionReveal>
        );
      })}
      <ScarletWellProjectModal
        data={scarletWellData}
        isOpen={isScarletWellOpen}
        onClose={() => setIsScarletWellOpen(false)}
      />
    </div>
  );
}
