export const pslPreviewData = {
  title: "PSL Dashboard",
  subtitle: "Cohort outcomes and program evaluation",
  summary:
    "Built a faculty/staff evaluation dashboard that translated attendance, competency, survey, and interview data into clear program recommendations.",
  kpis: [
    { label: "Active participants", value: "22" },
    { label: "Pre/post competencies aligned", value: "21" },
    { label: "Wrap-up interviews synthesized", value: "22" },
    { label: "Recommendations generated", value: "13" },
  ],
  pipeline: {
    inputs: [
      "Attendance data",
      "Competency surveys",
      "Wrap-up interviews",
    ],
    stages: [
      "Cleaned data model",
      "Dashboard insights",
      "Program recommendations",
    ],
  },
  cohortPathway: [
    { label: "Registered", value: 27, display: "27" },
    { label: "Active cohort", value: 22, display: "22" },
    { label: "Consistent attendees", value: 20, display: "20" },
    { label: "Wrap-up completed", value: 22, display: "22" },
  ],
  competency: {
    items: [
      { label: "Facilitation readiness", pre: 3.19, post: 4.1 },
      { label: "Peer-support comfort", pre: 3.52, post: 4.2 },
      { label: "Referral awareness", pre: 2.52, post: 3.85 },
      { label: "Communication confidence", pre: 3.63, post: 4.3 },
      { label: "Leading conversations", pre: 3.26, post: 4.15 },
    ],
  },
  themes: [
    "Confidence",
    "Community",
    "Communication",
    "Applied at work",
  ],
  recommendations: {
    total: 13,
    examples: [
      "Reduce drop-off after initial training",
      "Standardize participant IDs across surveys",
      "Build stronger post-program alumni engagement",
    ],
  },
};

export type PslPreviewData = typeof pslPreviewData;
