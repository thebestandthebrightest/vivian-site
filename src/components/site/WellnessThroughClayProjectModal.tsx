"use client";

import type { WellnessThroughClayPreviewData } from "@/lib/wellness-through-clay-preview-data";
import {
  FlowDiagram,
  KpiStrip,
  ModalSectionLabel,
  ProjectModalShell,
  UsageGrid,
} from "./ProjectModalShell";

type WellnessThroughClayProjectModalProps = {
  data: WellnessThroughClayPreviewData;
  isOpen: boolean;
  onClose: () => void;
};

const behindTheScenes = [
  {
    label: "Workshops",
    sublabel: "Ceramics sessions on campus",
  },
  {
    label: "Attendance + feedback",
    sublabel: "Sign-ins · session notes",
  },
  {
    label: "Insights",
    sublabel: "What students return for",
    emphasized: true,
  },
  {
    label: "Outreach + event design",
    sublabel: "Next session shape",
  },
];

const usage = [
  "Program design",
  "Engagement analytics",
  "Grant-funded operations",
  "Repeat participation",
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

  const points = data.cumulativeGrowth.points;
  const max = Math.max(...points.map((p) => p.value)) * 1.1;

  return (
    <ProjectModalShell
      isOpen={isOpen}
      onClose={onClose}
      labelledById="wtc-modal-title"
      title="Wellness Through Clay"
      summary="Ceramics workshops showing how data, feedback, and operations shape the student wellness experience."
    >
      <section>
        <ModalSectionLabel>Impact snapshot</ModalSectionLabel>
        <div className="mt-4">
          <KpiStrip items={kpis} />
        </div>
      </section>

      <section>
        <ModalSectionLabel>Behind the scenes</ModalSectionLabel>
        <div className="mt-5">
          <FlowDiagram steps={behindTheScenes} />
        </div>
      </section>

      <section>
        <ModalSectionLabel>Cumulative attendees by cycle</ModalSectionLabel>
        <div className="mt-5 w-full overflow-x-auto">
          <svg
            viewBox="0 0 600 220"
            className="h-auto w-full min-w-[28rem]"
            role="img"
            aria-label="Cumulative attendees by cycle"
          >
            {(() => {
              const padL = 56;
              const padR = 20;
              const padT = 20;
              const padB = 44;
              const innerW = 600 - padL - padR;
              const innerH = 220 - padT - padB;
              const x = (i: number) =>
                padL + (i / (points.length - 1)) * innerW;
              const y = (v: number) => padT + innerH - (v / max) * innerH;
              const linePath = points
                .map((p, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(p.value)}`)
                .join(" ");
              const areaPath =
                `M ${x(0)} ${padT + innerH} ` +
                points.map((p, i) => `L ${x(i)} ${y(p.value)}`).join(" ") +
                ` L ${x(points.length - 1)} ${padT + innerH} Z`;
              const yTicks = [0, max / 2, max].map(
                (v) => Math.round(v / 10) * 10,
              );
              return (
                <>
                  {yTicks.map((tick) => {
                    const yy = y(tick);
                    return (
                      <g key={tick}>
                        <line
                          x1={padL}
                          x2={600 - padR}
                          y1={yy}
                          y2={yy}
                          stroke="currentColor"
                          strokeOpacity="0.08"
                          strokeWidth="1"
                        />
                        <text
                          x={padL - 10}
                          y={yy + 4}
                          textAnchor="end"
                          className="fill-current text-[10px]"
                          fillOpacity="0.5"
                        >
                          {tick}
                        </text>
                      </g>
                    );
                  })}
                  <path d={areaPath} fill="var(--sage-soft)" />
                  <path
                    d={linePath}
                    fill="none"
                    stroke="var(--sage)"
                    strokeWidth="2.5"
                  />
                  {points.map((p, i) => (
                    <g key={p.cycle}>
                      <circle
                        cx={x(i)}
                        cy={y(p.value)}
                        r="4"
                        fill="var(--sage)"
                        stroke="var(--background)"
                        strokeWidth="2"
                      />
                      <text
                        x={x(i)}
                        y={220 - 16}
                        textAnchor="middle"
                        className="fill-current text-[10px]"
                        fillOpacity="0.65"
                      >
                        {p.cycle}
                      </text>
                      <text
                        x={x(i)}
                        y={y(p.value) - 10}
                        textAnchor="middle"
                        className="fill-current text-[11px] font-medium"
                      >
                        {p.value}
                      </text>
                    </g>
                  ))}
                </>
              );
            })()}
          </svg>
        </div>
      </section>

      <section>
        <ModalSectionLabel>What changed</ModalSectionLabel>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          <li className="border-t border-line pt-3 text-sm leading-6 text-foreground">
            Treated each session as data — feedback shaped the next one.
          </li>
          <li className="border-t border-line pt-3 text-sm leading-6 text-foreground">
            Sustained 14–16 attendees per session across three cycles.
          </li>
          <li className="border-t border-line pt-3 text-sm leading-6 text-foreground">
            Operational rhythm let outreach and grants compound, not restart.
          </li>
        </ul>
      </section>

      <section>
        <ModalSectionLabel>How it’s used</ModalSectionLabel>
        <div className="mt-4">
          <UsageGrid items={usage} />
        </div>
      </section>
    </ProjectModalShell>
  );
}
