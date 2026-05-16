import type { Project } from "@/components/site/ProjectFeature";

export const resumeHref = "/Vivian-Glenn-Resume.pdf";

export const projects: Project[] = [
  {
    number: "01",
    title: "ScarletWell Studio",
    descriptor: "Operational analytics and planning platform",
    summary:
      "Designed a system for understanding program performance, planning cycles, and translating participation data into clearer decisions.",
    details: ["Grant-cycle planning", "Cohort analytics", "Decision support"],
  },
  {
    number: "02",
    title: "PSL Dashboard",
    descriptor: "Cohort outcomes and engagement insights",
    summary:
      "Built a stakeholder-facing dashboard to clarify attendance, competency growth, qualitative themes, and program recommendations.",
    details: ["Active cohort tracking", "Pre-post analysis", "Recommendation system"],
  },
  {
    number: "03",
    title: "IFNH InsightOS",
    descriptor: "Institutional analytics and forecasting",
    summary:
      "Developed a clean analytics interface for exploring participation, capacity, and scenario planning across institutional programming.",
    details: ["Forecasting tools", "Capacity analysis", "Scenario modeling"],
  },
  {
    number: "04",
    title: "Wellness Through Clay",
    descriptor: "Founder-led wellness initiative",
    summary:
      "Founded and scaled a Rutgers wellness initiative through programming, operations, partnerships, and student engagement.",
    details: ["250+ attendees", "Multi-semester programming", "Cross-campus reach"],
  },
];
