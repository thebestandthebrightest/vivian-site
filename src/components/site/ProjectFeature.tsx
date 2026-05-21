import { MotionReveal } from "./MotionReveal";

export type ProjectMetric = {
  value: string;
  label: string;
};

export type Project = {
  number: string;
  title: string;
  descriptor: string;
  category: string;
  outcome: string;
  metrics: ProjectMetric[];
  visual: "compare" | "funnel" | "growth" | "delta";
  summary: string;
  impact: string;
  previewDetail?: string;
  details: string[];
};

type ProjectFeatureProps = {
  project: Project;
  delay?: number;
  compact?: boolean;
};

function ProjectTitle({ children }: { children: string }) {
  return (
    <span className="relative inline-block pb-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100">
      {children}
    </span>
  );
}

function AnalyticalPreview({ variant }: { variant: string }) {
  const barSets: Record<string, string[]> = {
    "01": ["72%", "44%", "88%", "58%"],
    "02": ["38%", "76%", "54%", "92%"],
    "03": ["62%", "50%", "82%", "66%"],
  };
  const bars = barSets[variant] ?? barSets["01"];
  const columnHeights = ["1.15rem", "0.72rem", "1.42rem", "0.96rem"];

  return (
    <div
      className="h-16 w-full min-w-24 max-w-32 overflow-hidden border border-line bg-foreground/[0.025] p-3 opacity-75 grayscale transition duration-500 group-hover:opacity-95 sm:h-[4.75rem] sm:w-28"
      aria-hidden="true"
    >
      <div className="flex h-full flex-col justify-between">
        <div className="grid grid-cols-4 gap-1.5">
          {bars.map((bar, index) => (
            <span
              key={`${variant}-${bar}-${index}`}
              className="block bg-foreground/25"
              style={{ height: index % 2 === 0 ? "0.45rem" : "0.68rem", width: bar }}
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

export function ProjectFeature({
  project,
  delay = 0,
  compact = false,
}: ProjectFeatureProps) {
  return (
    <MotionReveal delay={delay}>
      <article className="group grid gap-6 border-t border-line py-9 transition-transform duration-300 ease-out hover:translate-x-1 md:grid-cols-[0.14fr_0.9fr_1.26fr] md:gap-10 md:py-11 lg:gap-14">
        <p className="text-xs font-medium text-quiet">
          {project.number}
        </p>
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
          {!compact ? (
            <ul className="mt-6 flex flex-wrap gap-x-2 gap-y-2 text-xs leading-6 text-quiet">
              {project.details.map((detail, index) => (
                <li key={detail}>
                  {index > 0 ? (
                    <span className="text-line">{" / "}</span>
                  ) : null}
                  {detail}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </article>
    </MotionReveal>
  );
}

export function ProjectPreview({ project, delay = 0 }: ProjectFeatureProps) {
  return (
    <MotionReveal delay={delay}>
      <article className="group grid gap-5 border-t border-line py-9 transition duration-500 ease-out hover:border-foreground/25 sm:grid-cols-[0.12fr_0.24fr_1fr_auto] sm:items-center sm:gap-8 lg:gap-10 lg:py-10">
        <p className="text-xs font-medium text-quiet">
          {project.number}
        </p>
        <AnalyticalPreview variant={project.number} />
        <div>
          <h3 className="font-display text-4xl font-medium leading-none text-foreground sm:text-5xl">
            <ProjectTitle>{project.title}</ProjectTitle>
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
            {project.descriptor}
          </p>
        </div>
        <p className="text-xs font-medium leading-6 text-quiet sm:max-w-56 sm:text-right">
          {project.previewDetail ?? project.details[0]}
        </p>
      </article>
    </MotionReveal>
  );
}
