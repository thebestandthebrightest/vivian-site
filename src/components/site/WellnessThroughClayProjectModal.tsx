"use client";

import type { WellnessThroughClayPreviewData } from "@/lib/wellness-through-clay-preview-data";
import { ProjectModalShell } from "./ProjectModalShell";

type WellnessThroughClayProjectModalProps = {
  data: WellnessThroughClayPreviewData;
  isOpen: boolean;
  onClose: () => void;
};

const processSteps = [
  "Workshops",
  "Attendance + feedback",
  "Insights",
  "Outreach + event design",
];

const sessionAverages = [
  { label: "Spring 2025", value: 12.8, display: "12.8 / session" },
  { label: "Summer 2025", value: 18.7, display: "18.7 / session" },
  { label: "2025–2026", value: 16.3, display: "16.3 / session" },
];

const quotes = [
  "This gave me a reason to slow down during a stressful week.",
  "I met people here I wouldn't have talked to otherwise.",
  "It was nice creating something without pressure.",
];

const skills = ["Program operations", "Feedback analysis", "Outreach strategy"];

const impacts = [
  "Improved workshop planning with attendance and feedback data",
  "Strengthened student wellness and community-building experiences",
  "Connected creative programming to measurable outcomes",
];

const kpis = [
  { label: "Cumulative attendees", value: "250+", highlight: true },
  { label: "Sessions", value: "18" },
  { label: "Cycles", value: "3" },
  { label: "Avg / session", value: "14–16" },
];

export function WellnessThroughClayProjectModal({
  data,
  isOpen,
  onClose,
}: WellnessThroughClayProjectModalProps) {
  const linkMap = Object.fromEntries(
    data.projectLinks.map((link) => [link.label, link.href]),
  ) as Record<string, string | null>;

  const websiteHref = linkMap["Website"] ?? "https://wellnessthroughclay.com";
  const instagramHref = linkMap["Instagram"] ?? null;
  const rutgersCasHref = linkMap["Rutgers CAS"] ?? null;
  const dailyTargumHref = linkMap["Daily Targum"] ?? null;

  return (
    <ProjectModalShell
      isOpen={isOpen}
      onClose={onClose}
      labelledById="wtc-modal-title"
      title="Wellness Through Clay"
      summary="Student wellness initiative built through iterative programming and attendance insights."
    >
      <section>
        <KpiStripTight items={kpis} />
      </section>

      <section>
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-2">
          {processSteps.map((step, idx) => (
            <div
              key={step}
              className="flex flex-1 items-center gap-2"
            >
              <p className="flex-1 text-xs leading-5 text-foreground">
                {step}
              </p>
              {idx < processSteps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="text-[0.7rem] text-quiet/70"
                >
                  <span className="sm:hidden">↓</span>
                  <span className="hidden sm:inline">→</span>
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section>
        <SessionAveragesViz items={sessionAverages} />
        <p className="mt-5 max-w-xl text-xs leading-6 text-muted">
          Attendance stabilized while expanding across student and faculty
          audiences.
        </p>
      </section>

      <section>
        <div className="grid gap-8 sm:grid-cols-3 sm:gap-10">
          {quotes.map((quote, idx) => (
            <figure
              key={idx}
              className="border-t border-line pt-5"
            >
              <blockquote className="font-display text-base italic leading-7 text-foreground sm:text-[1.05rem]">
                <span aria-hidden="true" className="text-quiet/60">
                  &ldquo;
                </span>
                {quote}
                <span aria-hidden="true" className="text-quiet/60">
                  &rdquo;
                </span>
              </blockquote>
            </figure>
          ))}
        </div>
      </section>

      <section>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-5">
          <div className="lg:flex-1">
            <p className="text-[0.65rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
              Skills used
            </p>
            <ul className="mt-2.5 space-y-2">
              {skills.map((s) => (
                <li
                  key={s}
                  className="border-t border-line pt-2 text-sm leading-5 text-foreground"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div
            aria-hidden="true"
            className="flex items-center justify-center text-quiet/70 lg:px-1"
          >
            <span className="lg:hidden">↓</span>
            <span className="hidden lg:inline">→</span>
          </div>
          <div className="lg:flex-1">
            <p className="text-[0.65rem] font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
              Impact created
            </p>
            <ul className="mt-2.5 space-y-2">
              {impacts.map((i) => (
                <li
                  key={i}
                  className="border-t pt-2 text-sm leading-5 text-foreground"
                  style={{ borderColor: "var(--sage-line)" }}
                >
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-xs leading-6 text-muted">
          Supported 250+ cumulative participants across 18 sessions while
          iterating programming through attendance and feedback insights.
        </p>
      </section>

      <section>
        <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr] lg:items-start">
          <WebsiteEmbed href={websiteHref} />
          <ExternalLinksList
            items={[
              {
                label: "Website",
                href: websiteHref,
                display: "wellnessthroughclay.com",
              },
              {
                label: "Rutgers CAS",
                href: rutgersCasHref,
                display: "Read article",
                group: "Articles",
              },
              {
                label: "Daily Targum",
                href: dailyTargumHref,
                display: "Read article",
                group: "Articles",
              },
              {
                label: "Instagram",
                href: instagramHref,
                display: "@ru_wellness_clay",
              },
            ]}
          />
        </div>
      </section>
    </ProjectModalShell>
  );
}

function KpiStripTight({
  items,
}: {
  items: Array<{ label: string; value: string; highlight?: boolean }>;
}) {
  return (
    <div className="grid gap-x-6 gap-y-4 border-y border-line py-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label}>
          <p
            className="font-display text-[2rem] font-medium leading-none text-foreground lg:text-[2.25rem]"
            style={
              item.highlight
                ? {
                    background: "var(--sage-soft)",
                    boxShadow: "inset 0 -0.35em 0 var(--sage-soft)",
                    display: "inline-block",
                    padding: "0 0.2em",
                  }
                : undefined
            }
          >
            {item.value}
          </p>
          <p className="mt-1.5 text-[0.65rem] font-medium uppercase leading-5 tracking-[0.16em] text-quiet">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}

function SessionAveragesViz({
  items,
}: {
  items: Array<{ label: string; value: number; display: string }>;
}) {
  const max = Math.max(...items.map((i) => i.value));
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="grid grid-cols-[minmax(7rem,9rem)_1fr_5.5rem] items-center gap-4"
        >
          <p className="text-xs leading-5 text-foreground">{item.label}</p>
          <div className="h-px bg-foreground/[0.07]">
            <div
              className="h-full"
              style={{
                width: `${(item.value / max) * 100}%`,
                background: "rgba(72,38,29,0.45)",
              }}
              aria-hidden="true"
            />
          </div>
          <p className="text-right text-xs leading-5 text-muted">
            {item.display}
          </p>
        </div>
      ))}
    </div>
  );
}

type ExternalLinkItem = {
  label: string;
  href: string | null;
  display: string;
  group?: string;
};

function ExternalLinksList({ items }: { items: ExternalLinkItem[] }) {
  const groups: Array<{ key: string; items: ExternalLinkItem[] }> = [];
  for (const item of items) {
    const key = item.group ?? item.label;
    let bucket = groups.find((g) => g.key === key);
    if (!bucket) {
      bucket = { key, items: [] };
      groups.push(bucket);
    }
    bucket.items.push(item);
  }

  return (
    <ul className="divide-y divide-[color:var(--line)] border-y border-line">
      {groups.map((group) => (
        <li key={group.key} className="py-3">
          {group.items.length === 1 ? (
            <ExternalRow item={group.items[0]} />
          ) : (
            <div>
              <p className="text-xs font-medium leading-5 text-foreground">
                {group.key}
              </p>
              <ul className="mt-1.5 space-y-1.5">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <ExternalSubRow item={item} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

function ExternalRow({ item }: { item: ExternalLinkItem }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-xs font-medium leading-5 text-foreground">
        {item.label}
      </span>
      {item.href ? (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring inline-flex items-baseline gap-1 text-xs leading-5 text-muted transition hover:text-foreground"
        >
          <span>{item.display}</span>
          <span aria-hidden="true">↗</span>
        </a>
      ) : (
        <span className="text-xs leading-5 text-quiet">{item.display}</span>
      )}
    </div>
  );
}

function ExternalSubRow({ item }: { item: ExternalLinkItem }) {
  if (!item.href) {
    return (
      <span className="text-xs leading-5 text-quiet">{item.label}</span>
    );
  }
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="focus-ring inline-flex items-baseline gap-1 text-xs leading-5 text-muted transition hover:text-foreground"
    >
      <span>{item.label}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}

function WebsiteEmbed({ href }: { href: string }) {
  return (
    <div className="group relative overflow-hidden border border-line">
      <div
        className="flex items-center gap-2 border-b border-line px-3 py-2"
        style={{ background: "var(--sage-soft)" }}
      >
        <div
          aria-hidden="true"
          className="flex items-center gap-1.5"
        >
          <span
            className="block h-2 w-2 rounded-full"
            style={{ background: "rgba(72,38,29,0.18)" }}
          />
          <span
            className="block h-2 w-2 rounded-full"
            style={{ background: "rgba(72,38,29,0.18)" }}
          />
          <span
            className="block h-2 w-2 rounded-full"
            style={{ background: "rgba(72,38,29,0.18)" }}
          />
        </div>
        <div className="flex-1 truncate text-center text-[0.65rem] leading-5 tracking-[0.04em] text-muted">
          wellnessthroughclay.com
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Wellness Through Clay in a new tab"
          className="focus-ring text-[0.65rem] leading-5 text-muted transition hover:text-foreground"
        >
          Open ↗
        </a>
      </div>
      <div className="relative h-[26rem] overflow-hidden sm:h-[30rem]">
        <iframe
          src={href}
          title="Wellness Through Clay live homepage preview"
          loading="lazy"
          className="absolute inset-0 h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.01]"
          style={{ border: 0 }}
          sandbox="allow-same-origin allow-scripts allow-popups"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
