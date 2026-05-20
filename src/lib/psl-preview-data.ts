export const pslPreviewData = {
  title: "PSL Dashboard",
  subtitle: "Cohort outcomes and engagement analysis",
  summary:
    "Designed an evaluation and reporting system for understanding participant engagement, competency growth, and leadership outcomes across a peer support cohort.",
  context: "Built from attendance, competency, survey, and interview data.",
  kpis: [
    { label: "Cohort participants", value: "22" },
    { label: "Aligned pre/post competencies", value: "21" },
    { label: "Wrap-up interview coverage", value: "100%" },
    { label: "Comfortable threshold", value: "80%" },
  ],
  engagement: {
    insight:
      "Participation stabilized across the cohort as interview completion and session consistency increased through the program cycle.",
    bars: [
      { label: "Registered", value: 27, display: "27" },
      { label: "Active cohort", value: 22, display: "22" },
      { label: "Consistent attendees", value: 20, display: "20" },
      { label: "Wrap-up completed", value: 22, display: "22" },
    ],
  },
  competency: {
    insight:
      "Participants showed the strongest gains in facilitation confidence and peer-support readiness after the training cycle.",
    items: [
      { label: "Facilitation readiness", pre: 3.19, post: 4.1 },
      { label: "Peer-support comfort", pre: 3.52, post: 4.2 },
      { label: "Referral awareness", pre: 2.52, post: 3.85 },
      { label: "Communication confidence", pre: 3.63, post: 4.3 },
      { label: "Leading conversations", pre: 3.26, post: 4.15 },
    ],
  },
  qualitative: {
    columns: [
      {
        label: "Confidence",
        insight:
          "Participants described feeling more prepared to navigate peer-support situations and explain the role to colleagues.",
      },
      {
        label: "Community",
        insight:
          "Cohort connection and a safe learning environment surfaced repeatedly as the foundation for ongoing engagement.",
      },
      {
        label: "Communication",
        insight:
          "Active listening, open-ended questions, and comfort with silence were the most frequently applied skills at work.",
      },
    ],
  },
  outcomes: [
    "Cohort evaluation",
    "Executive-ready reporting",
    "Competency tracking",
    "Engagement monitoring",
    "Qualitative synthesis",
    "Operational visibility",
  ],
};

export type PslPreviewData = typeof pslPreviewData;
