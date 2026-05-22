import type { SimpleProjectModalData } from "@/components/site/SimpleProjectModal";

export const sjmsPreviewData: SimpleProjectModalData = {
  title: "South Jersey Medical Society",
  subtitle: "Scholarship review system",
  summary:
    "A JavaScript-enabled review dashboard that centralizes reviewer evaluations, automates scoring, and organizes award decisions.",
  kpis: [
    { label: "Awards supported", value: "$3,000", highlight: true },
    { label: "Review steps", value: "4" },
    { label: "Scoring", value: "Auto" },
    { label: "Workflow", value: "1 view" },
  ],
  flow: [
    { label: "Applications", sublabel: "Submitted by candidates" },
    { label: "Reviewer scoring", sublabel: "Rubric-based evaluation" },
    {
      label: "Validation",
      sublabel: "Aggregated scores",
      emphasized: true,
    },
    { label: "Award decisions", sublabel: "Final allocation" },
  ],
  whatChanged: [
    "Replaced scattered reviewer spreadsheets with one shared scoring view.",
    "Made award decisions traceable back to rubric inputs.",
    "Cut reviewer coordination time across the award cycle.",
  ],
  usage: [
    "Application review",
    "Reviewer scoring",
    "Award decisions",
    "Cycle reporting",
  ],
};
