import type { Project } from "@/components/site/ProjectFeature";

export const projects: Project[] = [
  {
    number: "01",
    title: "ScarletWell Studio",
    descriptor: "Operational analytics and planning platform",
    summary:
      "Designed decision-support infrastructure for program performance, planning cycles, and AI synthesis workflows across wellness initiatives.",
    impact:
      "Supported clearer evaluation across 40+ wellness initiatives and a $43K+ programming budget.",
    previewDetail: "40+ initiatives / $43K+ budget",
    details: [
      "Grant-cycle planning",
      "Cohort analytics",
      "AI synthesis",
      "Forecasting",
    ],
  },
  {
    number: "02",
    title: "PSL Dashboard",
    descriptor: "Cohort outcomes and engagement insights",
    summary:
      "Built a stakeholder-facing dashboard for attendance patterns, competency growth, qualitative synthesis, and recommendation workflows.",
    impact:
      "Translated mixed participation and survey data into operational insight for program improvement.",
    previewDetail: "Pre/post analysis",
    details: [
      "Active cohort tracking",
      "Pre-post analysis",
      "Synthesis workflows",
      "Recommendations",
    ],
  },
  {
    number: "03",
    title: "IFNH InsightOS",
    descriptor: "Institutional analytics and forecasting",
    summary:
      "Developed an analytics interface for participation trends, capacity planning, and forecasting across institutional programming.",
    impact:
      "Created planning infrastructure to support engagement forecasts and program design decisions.",
    previewDetail: "Forecasting tools",
    details: [
      "Forecasting tools",
      "Capacity analysis",
      "Scenario modeling",
      "Institutional analytics",
    ],
  },
  {
    number: "04",
    title: "Wellness Through Clay",
    descriptor: "Founder-led wellness initiative",
    summary:
      "Founded and scaled a multi-semester wellness initiative through operating systems, partnerships, funding, and student engagement.",
    impact:
      "Reached 250+ attendees while improving reach per dollar and sustaining demand across semesters.",
    details: [
      "250+ attendees",
      "Multi-semester programming",
      "Grant funding",
      "Program evaluation",
    ],
  },
];

export const scarletWellPreview = {
  eyebrow: "Mini case study / dashboard preview",
  title: "ScarletWell Studio",
  descriptor: "Operational analytics and planning platform",
  description:
    "A private operating layer for understanding past cycles, monitoring current programs, and planning future wellness initiatives.",
  metrics: [
    { label: "Initiatives", value: "40+" },
    { label: "Programming budget", value: "$43K+" },
    { label: "Planning layer", value: "Grant cycles" },
    { label: "Analysis", value: "Cohorts" },
    { label: "Forward view", value: "Forecasting" },
    { label: "Workflow", value: "AI synthesis" },
  ],
  brief: [
    {
      label: "Question",
      text: "How can wellness leaders compare program reach, funding, and planning readiness across grant cycles?",
    },
    {
      label: "Built",
      text: "A private analytics and planning environment with cohort comparison, program profiles, cycle views, and scenario modeling.",
    },
    {
      label: "Supported",
      text: "Clearer evaluation, forecasting, and operating rhythms across wellness initiatives.",
    },
  ],
  portfolioSignals: [
    { label: "Programs", value: "40+", detail: "all available cycles" },
    { label: "Budget", value: "$43K+", detail: "programming funds" },
    { label: "WTC attendance", value: "114", detail: "2025-2026 documented total" },
  ],
  cycleBars: [
    { label: "2024-25 WOW", initiatives: 8, budget: 7.8, reach: 173 },
    { label: "2024-25 CG", initiatives: 17, budget: 18.5, reach: 1227 },
    { label: "2025-26 CG", initiatives: 8, budget: 6.2, reach: 817 },
    { label: "2025-26 WOW", initiatives: 9, budget: 8.6, reach: 786 },
  ],
  programPortfolio: [
    {
      name: "Wellness Through Clay",
      cycle: "2025-2026 / R2",
      reach: "114",
      budget: "$1.2K",
      signal: "Repeat-program profile",
    },
    {
      name: "Planting a Healthy Mindset",
      cycle: "2025-2026",
      reach: "Sanitized",
      budget: "$1.0K",
      signal: "Corrected budget",
    },
    {
      name: "Connection grant cohort",
      cycle: "All available cycles",
      reach: "Aggregate",
      budget: "$24K+",
      signal: "Cycle comparison",
    },
  ],
  cohortRows: [
    {
      program: "Wellness Through Clay",
      profile: "Unified profile",
      cycleEntry: "R2 / 2025-2026",
      reach: "114",
      budget: "$1.2K",
      efficiency: "$10.53",
    },
    {
      program: "Planting a Healthy Mindset",
      profile: "Single-cycle profile",
      cycleEntry: "2025-2026",
      reach: "Sanitized",
      budget: "$1.0K",
      efficiency: "Held",
    },
    {
      program: "Repeat recipients",
      profile: "Identity-linked",
      cycleEntry: "R1 / R2",
      reach: "Cycle-specific",
      budget: "Cycle-specific",
      efficiency: "Comparable",
    },
  ],
  insights: [
    "Programs with clearer attendance records are easier to compare across funding cycles.",
    "Repeat recipients benefit from unified profiles with cycle-specific analytics.",
    "Scenario modeling helps translate budget and participation assumptions into planning decisions.",
    "Structured summaries reduce the gap between raw reports and operational next steps.",
  ],
  recommendations: [
    "Confirm unique reach before cost-per-participant claims.",
    "Separate duplicated attendance from participant reach in reporting.",
    "Use profile snapshots to preserve institutional memory across cycles.",
  ],
  forecastScenarios: [
    { label: "Conservative", participants: 96, budget: 2800, sessions: 7 },
    { label: "Current", participants: 120, budget: 3000, sessions: 8 },
    { label: "Stretch", participants: 148, budget: 3400, sessions: 10 },
  ],
};
