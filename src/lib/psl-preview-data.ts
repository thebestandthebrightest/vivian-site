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
      { label: "Attendance data", icon: "calendar" as const },
      { label: "Competency surveys", icon: "clipboard" as const },
      { label: "Wrap-up interviews", icon: "message" as const },
    ],
    stages: [
      { label: "Cleaned data model", icon: "database" as const },
      { label: "Dashboard insights", icon: "bar-chart" as const },
      { label: "Program recommendations", icon: "route" as const },
    ],
  },
  cohortPathway: [
    { label: "Registered", value: 27, display: "27" },
    { label: "Active cohort", value: 22, display: "22" },
    { label: "Consistent attendees", value: 20, display: "20" },
    { label: "Wrap-up completed", value: 22, display: "22" },
  ],
  dataSources: [
    { label: "Attendance", icon: "calendar" as const },
    { label: "Surveys", icon: "clipboard" as const },
    { label: "Interviews", icon: "message" as const },
  ],
  overallInsight:
    "Combined attendance, survey, and interview data to evaluate participation, skill growth, and implementation feedback.",
  competency: {
    items: [
      { label: "Facilitation readiness", pre: 3.2, post: 4.1 },
      { label: "Peer-support comfort", pre: 3.5, post: 4.2 },
      { label: "Referral awareness", pre: 2.5, post: 3.9 },
      { label: "Communication confidence", pre: 3.6, post: 4.3 },
      { label: "Leading conversations", pre: 3.3, post: 4.2 },
    ],
    alignedQuestions: 21,
    insight:
      "Aligned pre/post questions showed gains across core peer-support skills, especially referral awareness and applied support behaviors.",
  },
  themes: [
    {
      title: "Confidence",
      icon: "spark" as const,
      insight:
        "Participants described feeling more prepared to support peers after repeated practice.",
      signal: "high" as const,
    },
    {
      title: "Community",
      icon: "users" as const,
      insight:
        "Training created a shared language around peer support and workplace connection.",
      signal: "medium" as const,
    },
    {
      title: "Communication",
      icon: "message" as const,
      insight:
        "Feedback emphasized active listening, referral language, and clearer boundaries.",
      signal: "high" as const,
    },
    {
      title: "Applied at work",
      icon: "briefcase" as const,
      insight:
        "Participants connected training concepts to real staff/student interactions.",
      signal: "medium" as const,
    },
  ],
  themesInsight:
    "Themes were synthesized from 22 wrap-up interviews to connect participant feedback with implementation priorities.",
  sampleProfile: {
    title: "Sample Participant Profile",
    subtext:
      "Anonymized view of how the dashboard connected attendance, competency movement, and interview themes.",
    fields: [
      { label: "Status", value: "Active cohort member" },
      { label: "Attendance", value: "Consistent attendee" },
      { label: "Survey completion", value: "Pre + post complete" },
      { label: "Competency movement", value: "+0.8 average growth" },
    ],
    themeTags: ["Confidence", "Communication"],
    programSignal: "Strong example of applied training",
    competencyMovement: [
      { label: "Pre", value: 3.4 },
      { label: "Post", value: 4.2 },
    ],
    insight:
      "Participant-level profiles helped connect survey movement with interview feedback, making the dashboard more useful for follow-up planning.",
  },
  skills: [
    {
      title: "Data cleaning + validation",
      detail:
        "Matched attendance, pre/post survey, and interview records across inconsistent participant identifiers.",
    },
    {
      title: "Survey/interview synthesis",
      detail:
        "Connected quantitative competency growth with qualitative feedback themes.",
    },
    {
      title: "Dashboard storytelling",
      detail:
        "Turned raw program data into a clear evaluation narrative for staff decision-making.",
    },
  ],
  impact: [
    {
      title: "Turned scattered data into usable decisions",
      detail:
        "Gave the team one place to understand participation, skill growth, and feedback.",
    },
    {
      title: "Clarified the participant pathway",
      detail:
        "Made registration, active participation, consistency, and wrap-up completion easier to evaluate.",
    },
    {
      title: "Generated an implementation roadmap",
      detail:
        "Translated findings into 13 recommendations the team could act on.",
    },
  ],
};

export type PslPreviewData = typeof pslPreviewData;
