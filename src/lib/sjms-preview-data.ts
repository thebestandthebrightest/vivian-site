export type SjmsKpi = {
  label: string;
  value: string;
  numeric: boolean;
};

export type SjmsFlowStep = {
  label: string;
  sublabel?: string;
  emphasized?: boolean;
};

export type SjmsScoringRow = {
  applicant: string;
  eligibility: string;
  reviewerAvg: string;
  validation: "Pass" | "Flag";
  decision: string;
};

export type SjmsListItem = {
  title: string;
  detail?: string;
};

export type SjmsPreviewData = {
  eyebrow: string;
  title: string;
  summary: string;
  kpis: SjmsKpi[];
  flow: SjmsFlowStep[];
  overviewInsight: string;
  scoring: {
    title: string;
    columns: string[];
    rows: SjmsScoringRow[];
    insight: string;
  };
  before: string[];
  after: string[];
  usage: string[];
  usageNote: string;
  skills: SjmsListItem[];
  impact: SjmsListItem[];
};

export const sjmsPreviewData: SjmsPreviewData = {
  eyebrow: "South Jersey Medical Society · scholarship review system",
  title: "SJMS Scholarship Dashboard",
  summary:
    "Built a JavaScript-enabled review dashboard to centralize evaluator scoring, validate submissions, and support $3,000 in scholarship award decisions.",
  kpis: [
    { label: "Awards supported", value: "$3,000", numeric: true },
    { label: "Review stages", value: "4", numeric: true },
    { label: "Scoring logic", value: "Automated", numeric: false },
    { label: "Reviewer workflow", value: "Unified", numeric: false },
  ],
  flow: [
    { label: "Applications", sublabel: "Submitted by candidates" },
    { label: "Reviewer scoring", sublabel: "Rubric-based evaluation" },
    {
      label: "Validation",
      sublabel: "Scores and completion checks",
      emphasized: true,
    },
    { label: "Award decisions", sublabel: "Final allocation support" },
  ],
  overviewInsight:
    "The dashboard replaced scattered review materials with a single workflow for scoring, validation, and award preparation.",
  scoring: {
    title: "Scoring view",
    columns: ["Applicant", "Eligibility", "Reviewer avg.", "Validation", "Decision"],
    rows: [
      {
        applicant: "Candidate A",
        eligibility: "Complete",
        reviewerAvg: "4.7",
        validation: "Pass",
        decision: "Finalist",
      },
      {
        applicant: "Candidate B",
        eligibility: "Missing item",
        reviewerAvg: "4.1",
        validation: "Flag",
        decision: "Review",
      },
      {
        applicant: "Candidate C",
        eligibility: "Complete",
        reviewerAvg: "3.8",
        validation: "Pass",
        decision: "Hold",
      },
    ],
    insight:
      "Automated rubric totals made reviewer inputs easier to compare and trace back to award decisions.",
  },
  before: [
    "Reviewer notes lived across scattered spreadsheets",
    "Score aggregation was manual",
    "Award decisions were harder to trace",
  ],
  after: [
    "One shared scoring view",
    "Automated rubric totals",
    "Clear validation and decision trail",
  ],
  usage: [
    "Application review",
    "Reviewer scoring",
    "Award decisions",
    "Cycle reporting",
  ],
  usageNote:
    "The dashboard gave reviewers and organizers a single workflow for evaluating applications and preparing final award decisions.",
  skills: [
    {
      title: "JavaScript workflow design",
      detail:
        "Structured the review process so evaluators could move through submissions in one consistent flow.",
    },
    {
      title: "Rubric-based data modeling",
      detail:
        "Mapped scoring logic, validation states, and reviewer inputs into a clean decision structure.",
    },
    {
      title: "Operations automation",
      detail:
        "Reduced manual score handling and made award preparation easier to trace.",
    },
  ],
  impact: [
    {
      title: "Centralized reviewer evaluation",
      detail:
        "Replaced scattered notes and spreadsheets with one shared scoring surface.",
    },
    {
      title: "Improved decision traceability",
      detail:
        "Made it easier to connect eligibility, reviewer averages, and final scholarship decisions.",
    },
    {
      title: "Supported $3,000 in awards",
      detail:
        "Helped organizers manage final award decisions with a cleaner operational process.",
    },
  ],
};
