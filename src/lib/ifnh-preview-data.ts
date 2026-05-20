export const ifnhPreviewData = {
  title: "IFNH InsightOS",
  subtitle: "Institutional analytics and forecasting",
  summary:
    "Built to translate student survey responses into clearer decisions about space design, seating capacity, programming, and wellness-resource visibility.",
  context:
    "Spring 2026 survey · 105 responses · institutional decision-support analytics.",
  kpis: [
    { label: "Survey responses", value: "105" },
    { label: "Regular visitors", value: "78%" },
    { label: "Met someone new", value: "37%" },
    { label: "Open to meeting", value: "67%" },
    { label: "Mention seating", value: "48%" },
  ],
  kpiFootnote:
    "Survey percentages use question-level response counts where applicable.",
  connectionGap: {
    headline: "Students use the space often, but connection is not automatic.",
    insight:
      "IFNH functions as a strong destination, but the gap between openness and actual interaction suggests that seating, programming, and environmental cues can help convert presence into connection.",
    steps: [
      { label: "Regular visitors", value: 78 },
      { label: "Open to meeting", value: 67 },
      { label: "Met someone new", value: 37 },
    ],
  },
  capacity: {
    title: "Capacity pressure",
    insight:
      "Physical seat count can overstate usable capacity; modeling effective seats shows that peak demand may exceed comfortable capacity.",
    layouts: [
      {
        label: "Current layout",
        usable: 150,
        demand: 180,
        status: "Over capacity",
      },
      {
        label: "Shared + temporary seating",
        usable: 170,
        demand: 180,
        status: "Near capacity",
      },
    ],
    assumptions: [
      "10 two-seat tables",
      "25 four-seat tables",
      "42 lounge seats",
      "Modeled peak demand: 180",
    ],
  },
  recommendations: [
    {
      title: "Increase seating flexibility",
      signal: "48% mention seating capacity as the top open-text theme.",
      priority: "High",
      effort: "Medium",
    },
    {
      title: "Make interaction easier",
      signal: "67% open to meeting someone, but only 37% have.",
      priority: "High",
      effort: "Low",
    },
    {
      title: "Use programming as activation",
      signal: "25% of respondents call out events and programming.",
      priority: "Medium",
      effort: "Medium",
    },
    {
      title: "Improve wellness visibility",
      signal: "45% are aware of ScarletWell resources — a clear visibility gap.",
      priority: "Medium",
      effort: "Low",
    },
  ],
  opportunityGap: {
    open: 67,
    met: 37,
    gap: 30,
    insight:
      "If design and programming close even one-third of the gap, interaction could improve meaningfully.",
  },
  supports: [
    "Student experience strategy",
    "Space planning",
    "Seating capacity modeling",
    "Wellness-resource visibility",
    "Recommendation prioritization",
    "Scenario planning",
  ],
};

export type IfnhPreviewData = typeof ifnhPreviewData;
