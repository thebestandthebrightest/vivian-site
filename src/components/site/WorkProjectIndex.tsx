"use client";

import { useState } from "react";
import { ifnhPreviewData } from "@/lib/ifnh-preview-data";
import { pslPreviewData } from "@/lib/psl-preview-data";
import { wellnessThroughClayPreviewData } from "@/lib/wellness-through-clay-preview-data";
import { IfnhProjectModal } from "./IfnhProjectModal";
import { MotionReveal } from "./MotionReveal";
import { ProjectFeature, type Project } from "./ProjectFeature";
import { PslProjectModal } from "./PslProjectModal";
import { WellnessThroughClayProjectModal } from "./WellnessThroughClayProjectModal";

type WorkProjectIndexProps = {
  projects: Project[];
};

function ProjectTitle({ children }: { children: string }) {
  return (
    <span className="relative inline-block pb-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100">
      {children}
    </span>
  );
}

function OpenProjectRow({
  project,
  delay,
  onOpen,
}: {
  project: Project;
  delay: number;
  onOpen: () => void;
}) {
  return (
    <MotionReveal delay={delay}>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={onOpen}
        className="focus-ring group grid w-full gap-6 border-t border-line py-9 text-left transition duration-300 ease-out hover:translate-x-1 hover:border-foreground/25 md:grid-cols-[0.14fr_0.9fr_1.26fr] md:gap-10 md:py-11 lg:gap-14 motion-reduce:transition-none"
      >
        <p className="text-xs font-medium text-quiet">{project.number}</p>
        <div>
          <h3 className="font-display text-4xl font-medium leading-none text-foreground sm:text-5xl">
            <ProjectTitle>{project.title}</ProjectTitle>
          </h3>
          <p className="mt-4 text-sm font-medium leading-6 text-muted">
            {project.descriptor}
          </p>
        </div>
        <div className="max-w-2xl">
          <p className="text-sm leading-7 text-muted md:max-w-xl">
            {project.summary}
          </p>
          <p className="mt-5 text-sm font-medium leading-7 text-foreground md:max-w-xl">
            {project.impact}
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-2 gap-y-2 text-xs leading-6 text-quiet">
            {project.details.map((detail, index) => (
              <li key={detail}>
                {index > 0 ? <span className="text-line">{" / "}</span> : null}
                {detail}
              </li>
            ))}
          </ul>
          <p className="mt-6 inline-flex items-center gap-3 text-xs font-medium leading-6 text-foreground">
            <span>Open project</span>
            <span aria-hidden="true" className="text-quiet">
              +
            </span>
          </p>
        </div>
      </button>
    </MotionReveal>
  );
}

export function WorkProjectIndex({ projects }: WorkProjectIndexProps) {
  const [isWellnessThroughClayOpen, setIsWellnessThroughClayOpen] =
    useState(false);
  const [isIfnhOpen, setIsIfnhOpen] = useState(false);
  const [isPslOpen, setIsPslOpen] = useState(false);

  return (
    <>
      {projects.map((project, index) => {
        if (project.title === "Wellness Through Clay") {
          return (
            <OpenProjectRow
              key={project.title}
              project={project}
              delay={index * 0.05}
              onOpen={() => setIsWellnessThroughClayOpen(true)}
            />
          );
        }
        if (project.title === "IFNH InsightOS") {
          return (
            <OpenProjectRow
              key={project.title}
              project={project}
              delay={index * 0.05}
              onOpen={() => setIsIfnhOpen(true)}
            />
          );
        }
        if (project.title === "PSL Dashboard") {
          return (
            <OpenProjectRow
              key={project.title}
              project={project}
              delay={index * 0.05}
              onOpen={() => setIsPslOpen(true)}
            />
          );
        }
        return (
          <ProjectFeature
            key={project.title}
            project={project}
            delay={index * 0.05}
          />
        );
      })}
      <div className="border-t border-line" />
      <WellnessThroughClayProjectModal
        data={wellnessThroughClayPreviewData}
        isOpen={isWellnessThroughClayOpen}
        onClose={() => setIsWellnessThroughClayOpen(false)}
      />
      <IfnhProjectModal
        data={ifnhPreviewData}
        isOpen={isIfnhOpen}
        onClose={() => setIsIfnhOpen(false)}
      />
      <PslProjectModal
        data={pslPreviewData}
        isOpen={isPslOpen}
        onClose={() => setIsPslOpen(false)}
      />
    </>
  );
}
