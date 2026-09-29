import type { Role } from "./mockData";

export type DemoAccount = {
  role: Role;
  email: string;
  password: string;
  name: string;
  initials: string;
  organization: string;
  description: string;
  scope: string;
};

export const DEMO_PASSWORD = "Demo@2026";

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    role: "Executive",
    email: "executive@abc-cro.com",
    password: DEMO_PASSWORD,
    name: "Anita Menon",
    initials: "AM",
    organization: "ABC Clinical Research",
    description: "Portfolio KPIs, trial performance, risk & compliance overview.",
    scope: "All studies · Read-only executive view",
  },
  {
    role: "Project Manager",
    email: "pm@abc-cro.com",
    password: DEMO_PASSWORD,
    name: "Rajiv Menon",
    initials: "RM",
    organization: "ABC Clinical Research",
    description: "Study milestones, enrollment, budget, risks and tasks.",
    scope: "Assigned studies · Full write access",
  },
  {
    role: "Clinical Trial Manager",
    email: "ctm@abc-cro.com",
    password: DEMO_PASSWORD,
    name: "Dr. Ramesh Iyer",
    initials: "RI",
    organization: "ABC Clinical Research",
    description: "Site performance, monitoring, enrollment, deviations, action items.",
    scope: "12 of 24 studies · Site-level access",
  },
  {
    role: "CRA",
    email: "cra@abc-cro.com",
    password: DEMO_PASSWORD,
    name: "Amit Kumar",
    initials: "AK",
    organization: "ABC Clinical Research",
    description: "Assigned sites, monitoring visits, queries, documents.",
    scope: "5 sites assigned",
  },
  {
    role: "Principal Investigator",
    email: "pi@aiims.edu",
    password: DEMO_PASSWORD,
    name: "Dr. R. Sharma",
    initials: "RS",
    organization: "AIIMS Delhi",
    description: "Subjects, visits, consent, AE/SAE, protocol compliance.",
    scope: "Site 001 · Investigator scope",
  },
  {
    role: "Study Coordinator",
    email: "coordinator@abc-cro.com",
    password: DEMO_PASSWORD,
    name: "Priya Rao",
    initials: "PR",
    organization: "ABC Clinical Research",
    description: "Screening, consent, enrollment, visits, tasks, data entry.",
    scope: "Site 001 · Data entry",
  },
  {
    role: "PV Team",
    email: "pv@abc-cro.com",
    password: DEMO_PASSWORD,
    name: "S. Mehta",
    initials: "SM",
    organization: "ABC Clinical Research",
    description: "AE/SAE cases, case processing, 24/7/14-day deadlines, safety alerts.",
    scope: "All studies · PV scope",
  },
  {
    role: "Regulatory",
    email: "regulatory@abc-cro.com",
    password: DEMO_PASSWORD,
    name: "R. Iyer",
    initials: "RI",
    organization: "ABC Clinical Research",
    description: "CTRI, ethics approvals, amendments and regulatory submissions.",
    scope: "All studies · Regulatory scope",
  },
  {
    role: "QA",
    email: "qa@abc-cro.com",
    password: DEMO_PASSWORD,
    name: "K. Nair",
    initials: "KN",
    organization: "ABC Clinical Research",
    description: "Audits, findings, CAPA and inspection readiness.",
    scope: "All studies · QA scope",
  },
  {
    role: "Sponsor",
    email: "sponsor@pharmacorp.com",
    password: DEMO_PASSWORD,
    name: "J. Patel",
    initials: "JP",
    organization: "PharmaCorp",
    description: "Study KPIs, enrollment, sites, safety, compliance and reports.",
    scope: "Sponsored studies · Read-mostly",
  },
  {
    role: "Regulator",
    email: "inspector@cdsco.gov.in",
    password: DEMO_PASSWORD,
    name: "Inspector D. Singh",
    initials: "DS",
    organization: "CDSCO",
    description: "Trial info, regulatory documents, safety information, audit trail.",
    scope: "Read-only regulator access",
  },
];

export function accountByRole(role: Role): DemoAccount {
  return DEMO_ACCOUNTS.find((a) => a.role === role) ?? DEMO_ACCOUNTS[2];
}

export function accountByEmail(email: string): DemoAccount | undefined {
  return DEMO_ACCOUNTS.find((a) => a.email.toLowerCase() === email.toLowerCase());
}
