export const scarletWellBriefData = {
  title: "ScarletWell Studio",
  subtitle: "Operational analytics and planning platform",
  summary:
    "Built to compare participation, budget efficiency, and planning readiness across grant cycles.",
  portfolioKpis: [
    { label: "Project records", value: "41" },
    { label: "Participant touchpoints", value: "3,003" },
    { label: "Budget", value: "$41K+" },
    { label: "Touchpoints / $1K", value: "73" },
    { label: "Activities", value: "210" },
  ],
  portfolioTotals: {
    grants: 42,
    records: 41,
    activities: 210,
    touchpoints: 3003,
    budget: 41138,
    costPerTouchpoint: 13.7,
    touchpointsPerThousand: 73,
  },
  cycleBars: [
    {
      label: "2024-2025",
      grants: 25,
      activities: 124,
      touchpoints: 1400,
      budget: 26354,
      costPerTouchpoint: 18.82,
      touchpointsPerThousand: 53,
    },
    {
      label: "2025-2026",
      grants: 17,
      activities: 86,
      touchpoints: 1603,
      budget: 14784,
      costPerTouchpoint: 9.22,
      touchpointsPerThousand: 108,
    },
  ],
  insight:
    "Participant reach increased while total documented budget decreased, producing a stronger portfolio efficiency signal in the newer cycle.",
  planningDefaults: {
    budget: 15000,
    efficiency: 108,
    activities: 90,
  },
  supports: [
    "Portfolio evaluation",
    "Cross-cycle comparison",
    "Operational planning",
    "Scenario modeling",
    "Executive-ready reporting",
  ],
};

export type ScarletWellBriefData = typeof scarletWellBriefData;
