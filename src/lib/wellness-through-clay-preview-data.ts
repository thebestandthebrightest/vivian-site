type ProjectLink = {
  label: string;
  href: string | null;
};

export const wellnessThroughClayPreviewData = {
  title: "Wellness Through Clay",
  subtitle: "Founder-led wellness initiative",
  summary:
    "Built a recurring clay-making workshop series that uses creative expression, mindfulness, and shared-table interaction to support student connection and well-being.",
  context: "Founded, funded, operated, and evaluated across multiple semesters.",
  kpis: [
    { label: "Attendees", value: "250+" },
    { label: "Programming cycles", value: "3" },
    { label: "Documented 2025-2026 attendance", value: "114" },
    { label: "Faculty/staff summer participants", value: "22" },
    { label: "2025-2026 sessions", value: "8" },
  ],
  evaluationSignals: [
    "Spring 2025: ~16 average/session",
    "2025-2026: 14.3 average/session",
    "Participation tracking across repeat sessions",
  ],
  timeline: [
    {
      cycle: "Spring 2025",
      label: "Pilot",
      metric: "~16 average/session",
      description:
        "Tested demand for a repeatable clay-making wellness format centered on creative expression and shared-table connection.",
    },
    {
      cycle: "Summer 2025",
      label: "Faculty/staff cycle",
      metric: "22 participants",
      description:
        "Extended the model into a summer faculty/staff cycle, pairing operations, materials planning, and campus partnership work.",
    },
    {
      cycle: "Fall 2025-Spring 2026",
      label: "Scaled repeat cycle",
      metric: "114 documented attendance",
      description:
        "Ran 8 documented sessions with sustained participation signals across fall and spring programming.",
    },
  ],
  attendanceSessions: [
    { date: "10/17", label: "Create", attendees: 17 },
    { date: "11/7", label: "Paint", attendees: 13 },
    { date: "11/14", label: "Session", attendees: 10 },
    { date: "11/21", label: "Session", attendees: 7 },
    { date: "2/27", label: "Session", attendees: 19 },
    { date: "3/6", label: "Session", attendees: 10 },
    { date: "4/17", label: "Session", attendees: 22 },
    { date: "4/24", label: "Session", attendees: 16 },
  ],
  attendanceInsight:
    "Attendance remained consistent across semesters, with spring sessions reaching the highest documented turnout.",
  projectionDefaults: {
    sessions: 8,
    averageAttendance: 14.3,
    capacity: 20,
  },
  projectLinks: [
    {
      label: "Website",
      href: null,
      // TODO: add final Wellness Through Clay website URL when confirmed.
    },
    {
      label: "Daily Targum",
      href: null,
      // TODO: add final Daily Targum article URL when confirmed.
    },
    {
      label: "Rutgers feature",
      href: null,
      // TODO: add final Rutgers Alcohol Studies / Wellness Through Clay article URL when confirmed.
    },
  ] satisfies ProjectLink[],
  supports: [
    "Founder-led program design",
    "Engagement analytics",
    "Grant-funded operations",
    "Community-centered evaluation",
    "Scalable wellness programming",
  ],
};

export type WellnessThroughClayPreviewData =
  typeof wellnessThroughClayPreviewData;
