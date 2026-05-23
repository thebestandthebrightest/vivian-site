"use client";

import { useState } from "react";
import { ifnhPreviewData } from "@/lib/ifnh-preview-data";
import { pslPreviewData } from "@/lib/psl-preview-data";
import { scarletWellBriefData } from "@/lib/scarletwell-preview-data";
import { sjmsPreviewData } from "@/lib/sjms-preview-data";
import { wellnessThroughClayPreviewData } from "@/lib/wellness-through-clay-preview-data";
import { IfnhProjectModal } from "./IfnhProjectModal";
import { MotionReveal } from "./MotionReveal";
import type { Project } from "./ProjectFeature";
import { PslProjectModal } from "./PslProjectModal";
import { ScarletWellProjectModal } from "./ScarletWellProjectModal";
import { SjmsProjectModal } from "./SjmsProjectModal";
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

function ProjectRow({
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
        className="focus-ring group grid w-full gap-6 border-t border-line py-7 text-left transition duration-300 ease-out hover:translate-x-1 hover:border-foreground/25 md:grid-cols-[0.14fr_0.9fr_1.26fr] md:gap-10 md:py-8 lg:gap-14 motion-reduce:transition-none"
      >
        <p className="text-xs font-medium text-quiet">{project.number}</p>
        <div>
          <h3 className="font-display text-4xl font-medium leading-none text-foreground sm:text-5xl">
            <ProjectTitle>{project.title}</ProjectTitle>
          </h3>
        </div>
        <div className="max-w-2xl">
          <p className="text-sm leading-7 text-muted md:max-w-xl">
            {project.summary}
          </p>
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-quiet md:hidden">
            View project
          </p>
        </div>
      </button>
    </MotionReveal>
  );
}

type ModalKey =
  | "scarletwell"
  | "psl"
  | "ifnh"
  | "wtc"
  | "sjms"
  | null;

const titleToModalKey: Record<string, Exclude<ModalKey, null>> = {
  "ScarletWell Studio": "scarletwell",
  "PSL Dashboard": "psl",
  "IFNH InsightOS": "ifnh",
  "Wellness Through Clay": "wtc",
  "SJMS Scholarship Dashboard": "sjms",
};

export function WorkProjectIndex({ projects }: WorkProjectIndexProps) {
  const [openModal, setOpenModal] = useState<ModalKey>(null);
  const closeModal = () => setOpenModal(null);

  return (
    <>
      {projects.map((project, index) => {
        const key = titleToModalKey[project.title];
        return (
          <ProjectRow
            key={project.title}
            project={project}
            delay={index * 0.05}
            onOpen={() => setOpenModal(key ?? null)}
          />
        );
      })}
      <div className="border-t border-line" />

      <ScarletWellProjectModal
        data={scarletWellBriefData}
        isOpen={openModal === "scarletwell"}
        onClose={closeModal}
      />
      <PslProjectModal
        data={pslPreviewData}
        isOpen={openModal === "psl"}
        onClose={closeModal}
      />
      <IfnhProjectModal
        data={ifnhPreviewData}
        isOpen={openModal === "ifnh"}
        onClose={closeModal}
      />
      <WellnessThroughClayProjectModal
        data={wellnessThroughClayPreviewData}
        isOpen={openModal === "wtc"}
        onClose={closeModal}
      />
      <SjmsProjectModal
        data={sjmsPreviewData}
        isOpen={openModal === "sjms"}
        onClose={closeModal}
      />
    </>
  );
}
