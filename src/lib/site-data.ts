import type { Project } from "@/components/site/ProjectFeature";

export const resumeHref = "/Vivian-Glenn-Resume.pdf";

export const projects: Project[] = [
  {
    number: "01",
    title: "ScarletWell Studio",
    descriptor: "Operational analytics and planning platform",
    summary:
      "Designed a centralized strategy platform for understanding program performance, planning cycles, and translating participation data into clearer decisions.",
    impact:
      "Supported evaluation across 40+ wellness initiatives and a $43K+ programming budget.",
    previewDetail: "40+ initiatives / $43K+ budget",
    details: [
      "Grant-cycle planning",
      "Cohort analytics",
      "Decision support",
      "Forecasting",
    ],
  },
  {
    number: "02",
    title: "PSL Dashboard",
    descriptor: "Cohort outcomes and engagement insights",
    summary:
      "Built a stakeholder-facing dashboard to clarify attendance, competency growth, qualitative themes, and program recommendations.",
    impact:
      "Translated mixed participation and survey data into clearer program insights and recommendations.",
    previewDetail: "Pre/post analysis",
    details: [
      "Active cohort tracking",
      "Pre-post analysis",
      "Qualitative themes",
      "Recommendations",
    ],
  },
  {
    number: "03",
    title: "IFNH InsightOS",
    descriptor: "Institutional analytics and forecasting",
    summary:
      "Developed a clean analytics interface for exploring participation, capacity, and scenario planning across institutional programming.",
    impact:
      "Automated data processing and supported forecasting for engagement and program design.",
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
      "Founded and scaled a multi-semester Rutgers wellness initiative through programming, operations, partnerships, and student engagement.",
    impact:
      "Reached 250+ attendees across Rutgers community programming; improved reach per dollar while sustaining demand across semesters.",
    details: [
      "250+ attendees",
      "Multi-semester programming",
      "Grant funding",
      "Program evaluation",
    ],
  },
];
