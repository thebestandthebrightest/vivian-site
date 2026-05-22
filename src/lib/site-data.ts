import type { Project } from "@/components/site/ProjectFeature";

export const projects: Project[] = [
  {
    number: "01",
    title: "ScarletWell Studio",
    descriptor: "Operational analytics and planning platform",
    category: "Operations · Analytics",
    outcome:
      "Increased participation while documented spend decreased across grant cycles.",
    metrics: [
      { value: "3,003", label: "participants" },
      { value: "210", label: "activities" },
      { value: "−51%", label: "cost / participant" },
    ],
    visual: "compare",
    summary:
      "Analytics and planning system helping Rutgers mental health and wellness programs track impact, allocate funding, and improve program performance.",
    impact:
      "Supported clearer evaluation across 40+ wellness initiatives and a $41K+ programming budget.",
    previewDetail: "41 initiatives / $41K+ budget",
    details: [
      "Portfolio evaluation",
      "Cohort analytics",
      "Efficiency tracking",
      "Strategic planning",
    ],
  },
  {
    number: "02",
    title: "PSL Dashboard",
    descriptor: "Cohort outcomes and engagement insights",
    category: "Evaluation · Analytics",
    outcome:
      "Translated mixed cohort data into competency growth and engagement signals.",
    metrics: [
      { value: "22", label: "cohort" },
      { value: "21", label: "aligned pre/post" },
      { value: "+0.9", label: "avg competency lift" },
    ],
    visual: "delta",
    summary:
      "Faculty and staff dashboard translating peer leader engagement and training data into clearer outcomes, trends, and program recommendations.",
    impact:
      "Translated mixed participation and survey data into operational insight for program improvement.",
    previewDetail: "Pre/post analysis",
    details: [
      "Cohort engagement",
      "Competency growth",
      "Qualitative themes",
      "Program evaluation",
    ],
  },
  {
    number: "03",
    title: "IFNH InsightOS",
    descriptor: "Institutional analytics and forecasting",
    category: "Strategy · Space planning",
    outcome:
      "Identified the gap where space usage and openness did not become interaction.",
    metrics: [
      { value: "78%", label: "regular visitors" },
      { value: "67%", label: "open to meeting" },
      { value: "37%", label: "actually met someone" },
    ],
    visual: "funnel",
    summary:
      "Campus engagement dashboard using real student participation and survey data to identify patterns, forecast needs, and guide program decisions.",
    impact:
      "Created planning infrastructure to support engagement forecasts and program design decisions.",
    previewDetail: "Survey n = 105",
    details: [
      "Capacity modeling",
      "Connection funnel",
      "Programming priorities",
      "Strategic recommendations",
    ],
  },
  {
    number: "04",
    title: "Wellness Through Clay",
    descriptor: "Founder-led wellness initiative",
    category: "Operations · Founder-led",
    outcome:
      "Scaled a recurring wellness program with stable participation across three cycles.",
    metrics: [
      { value: "250+", label: "attendees" },
      { value: "18", label: "sessions" },
      { value: "3", label: "cycles" },
    ],
    visual: "growth",
    summary:
      "Ceramics workshops showing how data, feedback, and operations shape student wellness experiences.",
    impact:
      "Reached 250+ attendees while sustaining stable participation across repeat programming cycles.",
    details: [
      "Participation growth",
      "Multi-cycle operations",
      "Grant funding",
      "Program evaluation",
    ],
  },
  {
    number: "05",
    title: "South Jersey Medical Society",
    descriptor: "Scholarship review system",
    category: "Operations · Review systems",
    outcome:
      "Centralized scholarship review and award decisions into a single workflow.",
    metrics: [
      { value: "$3K", label: "in awards" },
      { value: "1", label: "review system" },
      { value: "—", label: "—" },
    ],
    visual: "delta",
    summary:
      "Scholarship review system for scoring applications and organizing award decisions.",
    impact:
      "Built a JavaScript-enabled review dashboard to centralize reviewer evaluations, automate scoring, and organize award decisions.",
    details: [
      "Supported $3,000 in scholarship awards",
      "Centralized reviewer scoring",
      "Improved review workflow clarity",
    ],
  },
  {
    number: "06",
    title: "Press",
    descriptor: "Selected articles and external features",
    category: "External features",
    outcome:
      "External features and mentions documenting program reach and recognition.",
    metrics: [
      { value: "—", label: "—" },
      { value: "—", label: "—" },
      { value: "—", label: "—" },
    ],
    visual: "growth",
    summary: "Selected articles and external features.",
    impact:
      "External features and mentions documenting program reach, recognition, and public-facing impact.",
    details: [
      "Program features",
      "External recognition",
      "Public-facing impact",
    ],
  },
];
