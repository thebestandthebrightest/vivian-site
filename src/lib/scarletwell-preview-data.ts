export const scarletWellBriefData = {
  title: "ScarletWell Studio",
  subtitle: "Operational analytics and planning platform",
  summary:
    "Built to compare participation, budget efficiency, and planning readiness across grant cycles.",
  portfolioKpis: [
    { label: "Initiatives", value: "41" },
    { label: "Participants", value: "3,003" },
    { label: "Budget", value: "$41K+" },
    { label: "Activities", value: "210" },
  ],
  cycles: [
    {
      label: "2024-2025",
      participants: 1400,
      budget: 26354,
      costPerParticipant: 18.82,
    },
    {
      label: "2025-2026",
      participants: 1603,
      budget: 14784,
      costPerParticipant: 9.22,
    },
  ],
  insight:
    "Participation increased while documented budget decreased, improving cost per participant year over year.",
  projection: {
    label: "Estimated participants at current efficiency",
    costPerParticipant: 9.22,
    points: [
      { budget: 15000, participants: 1626 },
      { budget: 20000, participants: 2169 },
      { budget: 26400, participants: 2858 },
    ],
  },
  supports: [
    "Portfolio evaluation",
    "Cross-cycle comparison",
    "Budget efficiency",
    "Strategic planning",
  ],
};

export type ScarletWellBriefData = typeof scarletWellBriefData;
