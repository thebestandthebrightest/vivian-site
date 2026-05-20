type ProjectLink = {
  label: string;
  href: string | null;
};

export const wellnessThroughClayPreviewData = {
  title: "Wellness Through Clay",
  subtitle: "Founder-led wellness initiative",
  summary:
    "Built a recurring creative wellness program centered on mindfulness, connection, and accessible student engagement.",
  context: "Founded, funded, operated, and evaluated across multiple programming cycles.",
  kpis: [
    { label: "Attendees", value: "250+" },
    { label: "Cycles", value: "3" },
    { label: "2025-2026 attendance", value: "114" },
    { label: "Summer faculty/staff", value: "22" },
    { label: "Sessions", value: "8" },
  ],
  timeline: [
    {
      cycle: "Pilot",
      metric: "~16 average/session",
    },
    {
      cycle: "Summer cycle",
      metric: "22 faculty/staff",
    },
    {
      cycle: "Scaled repeat cycle",
      metric: "114 attendance",
    },
  ],
  attendanceSummary: {
    total: 114,
    sessions: 8,
    averagePerSession: 14.3,
    comparisons: [
      { label: "Spring 2025 average/session", value: 16, suffix: "" },
      { label: "2025-2026 average/session", value: 14.3, suffix: "" },
      { label: "Summer faculty/staff total", value: 22, suffix: "" },
    ],
  },
  projection: {
    label: "Projected attendance by session count",
    sessions: [8, 10, 12],
    scenarios: [
      {
        label: "Current pace · 14.3/session",
        averagePerSession: 14.3,
        points: [114, 143, 172],
      },
      {
        label: "Growth pace · 16/session",
        averagePerSession: 16,
        points: [128, 160, 192],
      },
    ],
  },
  projectLinks: [
    {
      label: "Website",
      href: null,
    },
    {
      label: "Daily Targum",
      href: null,
    },
    {
      label: "Rutgers feature",
      href: null,
    },
  ] as ProjectLink[],
  supports: [
    "Founder-led program design",
    "Engagement analytics",
    "Grant-funded operations",
    "Program evaluation",
    "Scalable wellness model",
  ],
};

export type WellnessThroughClayPreviewData =
  typeof wellnessThroughClayPreviewData;
