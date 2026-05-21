export const scarletWellBriefData = {
  title: "ScarletWell Studio",
  subtitle: "Operational analytics and planning platform",
  summary:
    "Higher participation supported with lower documented spend across grant cycles.",
  portfolioKpis: [
    { label: "Participants", value: "3,003" },
    { label: "Activities", value: "210" },
    { label: "Budget managed", value: "$41K+" },
    { label: "Initiatives", value: "41" },
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
  efficiencyDeltas: [
    {
      label: "Participants",
      delta: "+14%",
      direction: "up" as const,
      detail: "1,400 → 1,603",
    },
    {
      label: "Documented budget",
      delta: "−44%",
      direction: "down" as const,
      detail: "$26.4K → $14.8K",
    },
    {
      label: "Cost / participant",
      delta: "−51%",
      direction: "down" as const,
      detail: "$18.82 → $9.22",
    },
  ],
  insight:
    "Higher reach with lower documented spend — cost per participant dropped roughly 51% year over year.",
  strategicUses: [
    "Portfolio evaluation",
    "Cross-cycle comparison",
    "Budget efficiency",
    "Strategic planning",
  ],
};

export type ScarletWellBriefData = typeof scarletWellBriefData;
