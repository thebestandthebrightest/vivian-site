export const ifnhPreviewData = {
  title: "IFNH InsightOS",
  subtitle: "Institutional analytics and space strategy",
  summary:
    "High space usage and social openness did not consistently translate into interaction.",
  context:
    "Spring 2026 survey · 105 responses · decision-support analytics for space and programming.",
  kpis: [
    { label: "Survey responses", value: "105" },
    { label: "Regular visitors", value: "78%" },
    { label: "Open to meeting", value: "67%" },
    { label: "Met someone new", value: "37%" },
    { label: "Mention seating", value: "48%" },
  ],
  kpiFootnote:
    "Survey percentages use question-level response counts where applicable.",
  funnel: {
    insight:
      "Engagement does not automatically become connection — a 30-point gap between openness and interaction.",
    steps: [
      { label: "Regular visitors", value: 78, sublabel: "use the space often" },
      { label: "Open to meeting someone", value: 67, sublabel: "willing in principle" },
      { label: "Actually met someone new", value: 37, sublabel: "converted to interaction" },
    ],
  },
  capacity: {
    insight: "Peak demand exceeded comfortable seating capacity.",
    usable: 150,
    demand: 180,
    overage: 30,
    assumptions: [
      "10 two-seat tables",
      "25 four-seat tables",
      "42 lounge seats",
      "Modeled peak demand: 180",
    ],
  },
  recommendations: [
    {
      title: "Improve seating flexibility",
      signal: "48% of responses flag seating as the top open-text theme.",
      priority: "High",
      effort: "Medium",
    },
    {
      title: "Convert presence into interaction",
      signal: "67% open to meeting · only 37% have. Close the 30-pt gap.",
      priority: "High",
      effort: "Low",
    },
    {
      title: "Increase wellness visibility",
      signal: "Only 45% are aware of ScarletWell resources on-site.",
      priority: "Medium",
      effort: "Low",
    },
  ],
  supports: [
    "Student experience strategy",
    "Space planning",
    "Capacity modeling",
    "Programming priorities",
    "Recommendation prioritization",
  ],
};

export type IfnhPreviewData = typeof ifnhPreviewData;
