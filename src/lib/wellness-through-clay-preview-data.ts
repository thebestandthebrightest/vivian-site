type ProjectLink = {
  label: string;
  href: string | null;
};

export const wellnessThroughClayPreviewData = {
  title: "Wellness Through Clay",
  subtitle: "Founder-led wellness initiative",
  summary:
    "Founded and scaled a recurring creative wellness initiative focused on mindfulness, accessibility, and low-pressure student connection.",
  context: "Three cycles · 18 sessions · 250+ cumulative attendees.",
  kpis: [
    { label: "Cumulative attendees", value: "250+" },
    { label: "Sessions", value: "18" },
    { label: "Cycles", value: "3" },
    { label: "Faculty/staff", value: "22" },
    { label: "Avg / session", value: "14–16" },
  ],
  cumulativeGrowth: {
    label: "Cumulative attendees by cycle",
    points: [
      { cycle: "Spring 2025", value: 128, displayValue: "128" },
      { cycle: "Summer 2025", value: 150, displayValue: "150" },
      { cycle: "2025-2026", value: 250, displayValue: "250+" },
    ],
  },
  stability: {
    insight: "Participation remained stable across repeat programming cycles.",
    comparisons: [
      { label: "Spring 2025 · avg / session", value: 16 },
      { label: "2025-2026 · avg / session", value: 14.3 },
    ],
  },
  projectLinks: [
    {
      label: "Website",
      href: "https://wellnessthroughclay.com",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/ru_wellness_clay/",
    },
    {
      label: "Rutgers CAS",
      href: "https://alcoholstudies.rutgers.edu/wellness-through-clay-promotes-relaxation-in-biweekly-pottery-workshops/",
    },
    {
      label: "Daily Targum",
      href: "https://www.dailytargum.com/article/targum-spotlight-wellness-through-clay-to-host-biweekly-pottery-workshops-at-the-yard-20250206",
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
