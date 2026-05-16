import { MotionReveal } from "./MotionReveal";

export type Project = {
  number: string;
  title: string;
  descriptor: string;
  summary: string;
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

export function ProjectFeature({
  project,
  delay = 0,
  compact = false,
}: ProjectFeatureProps) {
  return (
    <MotionReveal delay={delay}>
      <article className="group grid gap-6 border-t border-line py-8 transition-transform duration-300 ease-out hover:translate-x-1 md:grid-cols-[0.14fr_0.92fr_1.2fr] md:gap-10 md:py-10 lg:gap-14">
        <p className="text-xs font-medium tracking-[0.04em] text-quiet">
          {project.number}
        </p>
        <div>
          <h3 className="font-display text-4xl font-medium leading-none tracking-[0.005em] text-foreground sm:text-5xl">
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
      <article className="group grid gap-4 border-t border-line py-7 transition-transform duration-300 ease-out hover:translate-x-1 sm:grid-cols-[0.16fr_1fr_auto] sm:items-baseline sm:gap-8">
        <p className="text-xs font-medium tracking-[0.04em] text-quiet">
          {project.number}
        </p>
        <div>
          <h3 className="font-display text-3xl font-medium leading-none tracking-[0.005em] text-foreground sm:text-4xl">
            <ProjectTitle>{project.title}</ProjectTitle>
          </h3>
          <p className="mt-3 text-sm leading-6 text-muted">
            {project.descriptor}
          </p>
        </div>
        <p className="text-sm leading-6 text-quiet sm:max-w-64">
          {project.details[0]}
        </p>
      </article>
    </MotionReveal>
  );
}
