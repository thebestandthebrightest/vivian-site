"use client";

import {
  FlowDiagram,
  KpiStrip,
  ModalSectionLabel,
  ProjectModalShell,
  UsageGrid,
} from "./ProjectModalShell";

export type SimpleProjectModalLink = {
  label: string;
  href: string | null;
};

export type SimpleProjectModalData = {
  title: string;
  subtitle: string;
  summary: string;
  kpis?: Array<{ label: string; value: string; highlight?: boolean }>;
  flow?: Array<{ label: string; sublabel?: string; emphasized?: boolean }>;
  whatChanged?: string[];
  usage?: string[];
  links?: SimpleProjectModalLink[];
  emptyState?: string;
};

type SimpleProjectModalProps = {
  data: SimpleProjectModalData;
  isOpen: boolean;
  onClose: () => void;
  labelledById: string;
};

export function SimpleProjectModal({
  data,
  isOpen,
  onClose,
  labelledById,
}: SimpleProjectModalProps) {
  return (
    <ProjectModalShell
      isOpen={isOpen}
      onClose={onClose}
      labelledById={labelledById}
      title={data.title}
      summary={data.summary}
    >
      {data.kpis && data.kpis.length > 0 ? (
        <section>
          <ModalSectionLabel>Impact snapshot</ModalSectionLabel>
          <div className="mt-4">
            <KpiStrip items={data.kpis} />
          </div>
        </section>
      ) : null}

      {data.flow && data.flow.length > 0 ? (
        <section>
          <ModalSectionLabel>Review workflow</ModalSectionLabel>
          <div className="mt-5">
            <FlowDiagram steps={data.flow} />
          </div>
        </section>
      ) : null}

      {data.whatChanged && data.whatChanged.length > 0 ? (
        <section>
          <ModalSectionLabel>What changed</ModalSectionLabel>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {data.whatChanged.map((item) => (
              <li
                key={item}
                className="border-t border-line pt-3 text-sm leading-6 text-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {data.usage && data.usage.length > 0 ? (
        <section>
          <ModalSectionLabel>How it’s used</ModalSectionLabel>
          <div className="mt-4">
            <UsageGrid items={data.usage} />
          </div>
        </section>
      ) : null}

      {data.links && data.links.length > 0 ? (
        <section>
          <ModalSectionLabel>Selected features</ModalSectionLabel>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {data.links.map((link) => (
              <div
                key={link.label}
                className="flex items-center justify-between border border-line bg-background px-4 py-3"
              >
                <span className="text-xs font-medium leading-5 text-foreground">
                  {link.label}
                </span>
                {link.href ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[0.65rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet hover:text-foreground"
                  >
                    Open
                  </a>
                ) : (
                  <span className="text-[0.65rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet">
                    Featured
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {data.emptyState ? (
        <section>
          <ModalSectionLabel>Selected features</ModalSectionLabel>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
            {data.emptyState}
          </p>
        </section>
      ) : null}
    </ProjectModalShell>
  );
}
