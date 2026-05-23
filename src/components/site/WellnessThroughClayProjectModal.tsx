"use client";

import type { WellnessThroughClayPreviewData } from "@/lib/wellness-through-clay-preview-data";
import {
  KpiStrip,
  ModalSectionLabel,
  ProjectModalShell,
} from "./ProjectModalShell";

type WellnessThroughClayProjectModalProps = {
  data: WellnessThroughClayPreviewData;
  isOpen: boolean;
  onClose: () => void;
};

const behindTheScenes = [
  { label: "Workshops", sublabel: "Ceramics sessions on campus" },
  { label: "Attendance + feedback", sublabel: "Sign-ins · session notes" },
  { label: "Insights", sublabel: "What students return for" },
  { label: "Outreach + event design", sublabel: "Next session shape" },
];

const themes = [
  {
    title: "Mood reset",
    detail:
      "Participants described the workshops as a calming reset during busy academic weeks.",
  },
  {
    title: "Connection",
    detail:
      "Students used the sessions as a low-pressure way to meet people and build community.",
  },
  {
    title: "Creative confidence",
    detail:
      "Participants valued having a space to make something without needing prior art experience.",
  },
];

const skills = ["Program operations", "Feedback analysis", "Outreach strategy"];

const impacts = [
  "Improved workshop planning with attendance and feedback data",
  "Strengthened student wellness and community-building experiences",
  "Connected creative programming to measurable outcomes",
];

export function WellnessThroughClayProjectModal({
  data,
  isOpen,
  onClose,
}: WellnessThroughClayProjectModalProps) {
  const kpis = [
    { label: "Cumulative attendees", value: "250+", highlight: true },
    { label: "Sessions", value: "18" },
    { label: "Cycles", value: "3" },
    { label: "Avg / session", value: "14–16" },
  ];

  const cycleStrip = data.cumulativeGrowth.points;

  const linkMap = Object.fromEntries(
    data.projectLinks.map((link) => [link.label, link.href]),
  ) as Record<string, string | null>;

  const externalLinks = [
    { label: "Website", href: linkMap["Website"] ?? null },
    { label: "Articles", href: linkMap["Daily Targum"] ?? null },
    { label: "Instagram", href: linkMap["Instagram"] ?? null },
  ];

  const websiteHref = linkMap["Website"] ?? null;

  return (
    <ProjectModalShell
      isOpen={isOpen}
      onClose={onClose}
      labelledById="wtc-modal-title"
      title="Wellness Through Clay"
      summary="Ceramics workshops showing how data, feedback, and operations shape student wellness experiences."
    >
      <section>
        <ModalSectionLabel>Impact snapshot</ModalSectionLabel>
        <div className="mt-4">
          <KpiStrip items={kpis} />
        </div>
      </section>

      <section>
        <ModalSectionLabel>Behind the scenes</ModalSectionLabel>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-3">
          {behindTheScenes.map((step, idx) => (
            <div
              key={step.label}
              className="flex flex-1 items-stretch gap-2 sm:gap-3"
            >
              <div className="flex-1 border-t border-line py-3 sm:py-4">
                <p className="text-sm font-medium leading-5 text-foreground">
                  {step.label}
                </p>
                <p className="mt-1 text-xs leading-5 text-muted">
                  {step.sublabel}
                </p>
              </div>
              {idx < behindTheScenes.length - 1 ? (
                <div
                  aria-hidden="true"
                  className="flex items-center justify-center self-stretch px-1 text-quiet"
                >
                  <span className="sm:hidden">↓</span>
                  <span className="hidden sm:inline">→</span>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section>
        <ModalSectionLabel>Cycle growth</ModalSectionLabel>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-3">
          {cycleStrip.map((point, idx) => {
            const isLast = idx === cycleStrip.length - 1;
            return (
              <div
                key={point.cycle}
                className="flex flex-1 items-stretch gap-2 sm:gap-3"
              >
                <div
                  className="flex-1 px-4 py-4"
                  style={{
                    border: isLast
                      ? "1px solid var(--sage-line)"
                      : "1px solid var(--line)",
                    background: isLast ? "var(--sage-soft)" : undefined,
                  }}
                >
                  <p className="text-[0.65rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
                    {point.cycle}
                  </p>
                  <p className="mt-1 font-display text-3xl font-medium leading-none text-foreground">
                    {point.value}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-muted">
                    Cumulative attendees
                  </p>
                </div>
                {!isLast ? (
                  <div
                    aria-hidden="true"
                    className="flex items-center justify-center self-stretch px-1 text-quiet"
                  >
                    <span className="sm:hidden">↓</span>
                    <span className="hidden sm:inline">→</span>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
          250+ attendees across students, faculty, and staff · 18 sessions · 3
          cycles.
        </p>
      </section>

      <section>
        <ModalSectionLabel>What participants shared</ModalSectionLabel>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {themes.map((t) => (
            <div
              key={t.title}
              className="border-t border-line pt-3"
            >
              <p className="text-sm font-medium leading-5 text-foreground">
                {t.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">{t.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <ModalSectionLabel>Skills used → Impact created</ModalSectionLabel>
        <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-6">
          <div className="lg:flex-1">
            <p className="text-[0.65rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
              Skills used
            </p>
            <ul className="mt-3 space-y-3">
              {skills.map((s) => (
                <li
                  key={s}
                  className="border-t border-line pt-3 text-sm font-medium leading-5 text-foreground"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div
            aria-hidden="true"
            className="flex items-center justify-center text-quiet lg:px-2"
          >
            <span className="lg:hidden">↓</span>
            <span className="hidden lg:inline">→</span>
          </div>
          <div className="lg:flex-1">
            <p className="text-[0.65rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
              Impact created
            </p>
            <ul className="mt-3 space-y-3">
              {impacts.map((i) => (
                <li
                  key={i}
                  className="border-t pt-3 text-sm font-medium leading-5 text-foreground"
                  style={{ borderColor: "var(--sage-line)" }}
                >
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section>
        <ModalSectionLabel>Explore the project</ModalSectionLabel>
        <div className="mt-5 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <WebsitePreview href={websiteHref} />
          <div>
            <p className="text-[0.65rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
              Links
            </p>
            <ul className="mt-3 divide-y divide-[color:var(--line)] border-y border-line">
              {externalLinks.map((link) => (
                <li
                  key={link.label}
                  className="flex items-baseline justify-between gap-4 py-3 text-sm leading-5"
                >
                  <span className="font-medium text-foreground">
                    {link.label}
                  </span>
                  {link.href ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring text-foreground underline underline-offset-4 transition hover:opacity-70"
                    >
                      Visit ↗
                    </a>
                  ) : (
                    <span className="text-xs uppercase tracking-[0.16em] text-quiet">
                      Coming soon
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </ProjectModalShell>
  );
}

function WebsitePreview({ href }: { href: string | null }) {
  const card = (
    <div
      className="group relative flex aspect-[4/3] flex-col justify-between overflow-hidden border border-line p-6 transition-colors sm:p-8"
      style={{
        background:
          "linear-gradient(135deg, var(--sage-soft) 0%, var(--background) 70%)",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-[0.65rem] font-medium uppercase leading-5 tracking-[0.22em] text-quiet">
          Wellness Through Clay
        </p>
        <span
          aria-hidden="true"
          className="text-base leading-none text-quiet transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          ↗
        </span>
      </div>
      <div>
        <p className="font-display text-3xl font-medium leading-tight text-foreground sm:text-4xl">
          Ceramics workshops at&nbsp;Rutgers
        </p>
        <p className="mt-3 text-sm leading-6 text-muted">
          Mindfulness, accessibility, and community engagement — three cycles
          and counting.
        </p>
      </div>
      <p className="text-xs font-medium uppercase leading-5 tracking-[0.18em] text-foreground">
        {href ? "Visit the site" : "Site coming soon"}
      </p>
    </div>
  );

  if (!href) return card;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open the Wellness Through Clay website in a new tab"
      className="focus-ring block"
    >
      {card}
    </a>
  );
}
