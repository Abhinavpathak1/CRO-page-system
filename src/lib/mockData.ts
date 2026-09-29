// Static reference data used across dashboard widgets. Real DB data
// (trials/sites/audit) is served via API routes.

export type Role =
  | "Executive"
  | "Project Manager"
  | "Clinical Trial Manager"
  | "CRA"
  | "Principal Investigator"
  | "Study Coordinator"
  | "PV Team"
  | "Regulatory"
  | "QA"
  | "Sponsor"
  | "Regulator";

export const ROLES: Role[] = [
  "Executive",
  "Project Manager",
  "Clinical Trial Manager",
  "CRA",
  "Principal Investigator",
  "Study Coordinator",
  "PV Team",
  "Regulatory",
  "QA",
  "Sponsor",
  "Regulator",
];

export const enrollmentSeries = [
  { month: "Jul", target: 6800, actual: 6210, screened: 8100 },
  { month: "Aug", target: 7500, actual: 6890, screened: 8720 },
  { month: "Sep", target: 8200, actual: 7420, screened: 9310 },
  { month: "Oct", target: 8900, actual: 7810, screened: 9980 },
  { month: "Nov", target: 9600, actual: 8140, screened: 10450 },
  { month: "Dec", target: 10300, actual: 8426, screened: 10980 },
];

export const deviationTrend = [
  { month: "Jul", value: 21 },
  { month: "Aug", value: 26 },
  { month: "Sep", value: 30 },
  { month: "Oct", value: 24 },
  { month: "Nov", value: 33 },
  { month: "Dec", value: 37 },
];

export const alerts = [
  {
    id: 1,
    priority: "critical",
    title: "SAE reporting deadline missed",
    study: "CT-2026-002",
    role: "PV Associate",
    due: "Today",
  },
  {
    id: 2,
    priority: "high",
    title: "Ethics Committee document pending",
    study: "CT-2026-004",
    role: "Regulatory Manager",
    due: "2 days",
  },
  {
    id: 3,
    priority: "medium",
    title: "Site monitoring visit due",
    study: "CT-2026-001",
    role: "CRA",
    due: "5 days",
  },
  {
    id: 4,
    priority: "high",
    title: "Protocol amendment approval pending",
    study: "CT-2026-003",
    role: "Principal Investigator",
    due: "3 days",
  },
  {
    id: 5,
    priority: "medium",
    title: "Data query resolution overdue",
    study: "CT-2026-005",
    role: "Data Manager",
    due: "4 days",
  },
];

export const safetyDeadlines = [
  { label: "24-Hour Deadline", total: 4, overdue: 2, color: "red" },
  { label: "7-Day Deadline", total: 9, overdue: 0, color: "orange" },
  { label: "14-Day Deadline", total: 12, overdue: 0, color: "amber" },
];

export const roleWidgets: Record<Role, string[]> = {
  Executive: [
    "Portfolio KPIs",
    "Trial Performance",
    "Risk Overview",
    "Compliance",
    "Safety Overview",
  ],
  "Project Manager": [
    "Study Milestones",
    "Enrollment",
    "Sites",
    "Budget",
    "Risks",
    "Tasks",
  ],
  "Clinical Trial Manager": [
    "Site Performance",
    "Monitoring",
    "Enrollment",
    "Deviations",
    "Action Items",
  ],
  CRA: ["Assigned Sites", "Monitoring Visits", "Queries", "Documents", "Deviations"],
  "Principal Investigator": [
    "Subjects",
    "Visits",
    "Consent",
    "AE/SAE",
    "Protocol Compliance",
  ],
  "Study Coordinator": [
    "Screening",
    "Consent",
    "Enrollment",
    "Visits",
    "Tasks",
    "Data Entry",
  ],
  "PV Team": [
    "AE/SAE Cases",
    "Case Processing",
    "24/7/14-day Deadlines",
    "Safety Alerts",
  ],
  Regulatory: ["CTRI", "Ethics Approvals", "Amendments", "Regulatory Submissions"],
  QA: ["Audits", "Findings", "CAPA", "Inspection Readiness"],
  Sponsor: [
    "Study KPIs",
    "Enrollment",
    "Sites",
    "Safety",
    "Compliance",
    "Reports",
  ],
  Regulator: [
    "Trial Information",
    "Regulatory Documents",
    "Safety Information",
    "Audit Trail",
  ],
};
