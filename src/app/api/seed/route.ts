import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { trials, sites, auditEvents, activities } from "@/db/schema";
import { sql } from "drizzle-orm";
import { createHash } from "crypto";

export const dynamic = "force-dynamic";

function hash(prev: string, payload: string) {
  return createHash("sha256").update(prev + payload).digest("hex").slice(0, 32);
}

export async function POST() {
  try {
    const db = getDb();

    await db.execute(sql`TRUNCATE TABLE trials, sites, audit_events, activities RESTART IDENTITY`);

    const trialRows = [
      { studyId: "CT-2026-001", title: "Phase III Advanced NSCLC Oncology Study", therapeuticArea: "Oncology", phase: "Phase III", sites: 32, enrolled: 842, target: 1000, compliance: 96, safety: "Normal", status: "Active", country: "India", sponsor: "Internal" },
      { studyId: "CT-2026-002", title: "Heart Failure Reduced EF Cardiology Study", therapeuticArea: "Cardiology", phase: "Phase II", sites: 18, enrolled: 426, target: 600, compliance: 91, safety: "Attention", status: "Monitoring", country: "India", sponsor: "Internal" },
      { studyId: "CT-2026-003", title: "Type 2 Diabetes Glycemic Control Study", therapeuticArea: "Endocrinology", phase: "Phase III", sites: 27, enrolled: 735, target: 800, compliance: 98, safety: "Normal", status: "Active", country: "India", sponsor: "Internal" },
      { studyId: "CT-2026-004", title: "Rheumatoid Arthritis Biologic Therapy", therapeuticArea: "Immunology", phase: "Phase II", sites: 14, enrolled: 312, target: 500, compliance: 89, safety: "Normal", status: "Active", country: "India", sponsor: "Internal" },
      { studyId: "CT-2026-005", title: "Pediatric Vaccine Immunogenicity Trial", therapeuticArea: "Vaccines", phase: "Phase III", sites: 22, enrolled: 1240, target: 1400, compliance: 97, safety: "No Issues", status: "Active", country: "India", sponsor: "Internal" },
      { studyId: "CT-2026-006", title: "Alzheimer's Disease Cognitive Trial", therapeuticArea: "Neurology", phase: "Phase II", sites: 16, enrolled: 218, target: 400, compliance: 87, safety: "Attention", status: "Recruiting", country: "India", sponsor: "Internal" },
      { studyId: "CT-2026-007", title: "Chronic Kidney Disease Progression", therapeuticArea: "Nephrology", phase: "Phase III", sites: 19, enrolled: 512, target: 700, compliance: 93, safety: "Normal", status: "Active", country: "India", sponsor: "Internal" },
      { studyId: "CT-2026-008", title: "Advanced Melanoma Immunotherapy", therapeuticArea: "Oncology", phase: "Phase I", sites: 8, enrolled: 84, target: 120, compliance: 95, safety: "Normal", status: "Active", country: "India", sponsor: "Internal" },
      { studyId: "CT-2026-009", title: "COPD Bronchodilator Efficacy Study", therapeuticArea: "Respiratory", phase: "Phase III", sites: 21, enrolled: 618, target: 750, compliance: 94, safety: "Normal", status: "Active", country: "India", sponsor: "Internal" },
      { studyId: "CT-2025-088", title: "Hypertension Combination Therapy", therapeuticArea: "Cardiology", phase: "Phase IV", sites: 12, enrolled: 980, target: 980, compliance: 99, safety: "Normal", status: "Completed", country: "India", sponsor: "Internal" },
      { studyId: "CT-2026-010", title: "Ulcerative Colitis JAK Inhibitor", therapeuticArea: "Gastroenterology", phase: "Phase II", sites: 11, enrolled: 189, target: 350, compliance: 90, safety: "Normal", status: "Active", country: "India", sponsor: "Internal" },
      { studyId: "CT-2026-011", title: "Migraine Preventive CGRP Study", therapeuticArea: "Neurology", phase: "Phase III", sites: 15, enrolled: 464, target: 600, compliance: 92, safety: "Normal", status: "Active", country: "India", sponsor: "Internal" },
      { studyId: "CT-2026-012", title: "Breast Cancer HER2+ Adjuvant", therapeuticArea: "Oncology", phase: "Phase III", sites: 24, enrolled: 706, target: 900, compliance: 96, safety: "Normal", status: "Active", country: "India", sponsor: "Internal" },
      { studyId: "CT-2026-013", title: "Osteoporosis Anabolic Agent", therapeuticArea: "Endocrinology", phase: "Phase II", sites: 9, enrolled: 142, target: 300, compliance: 88, safety: "Attention", status: "Monitoring", country: "India", sponsor: "Internal" },
    ];

    await db.insert(trials).values(trialRows);

    const siteRows = [
      { siteCode: "SITE-001", name: "AIIMS Delhi", country: "India", city: "New Delhi", pi: "Dr. R. Sharma", screened: 412, enrolled: 318, screenFailure: 94, deviations: 2, performance: "Excellent", status: "Operational" },
      { siteCode: "SITE-002", name: "Tata Memorial", country: "India", city: "Mumbai", pi: "Dr. A. Patel", screened: 386, enrolled: 274, screenFailure: 112, deviations: 4, performance: "Good", status: "Operational" },
      { siteCode: "SITE-003", name: "CMC Vellore", country: "India", city: "Vellore", pi: "Dr. M. George", screened: 298, enrolled: 236, screenFailure: 62, deviations: 1, performance: "Excellent", status: "Operational" },
      { siteCode: "SITE-004", name: "PGIMER Chandigarh", country: "India", city: "Chandigarh", pi: "Dr. S. Kaur", screened: 245, enrolled: 168, screenFailure: 77, deviations: 6, performance: "Needs Attention", status: "Operational" },
      { siteCode: "SITE-005", name: "Apollo Chennai", country: "India", city: "Chennai", pi: "Dr. V. Krishnan", screened: 189, enrolled: 92, screenFailure: 97, deviations: 9, performance: "At Risk", status: "Monitoring" },
      { siteCode: "SITE-006", name: "Fortis Bangalore", country: "India", city: "Bangalore", pi: "Dr. N. Rao", screened: 264, enrolled: 194, screenFailure: 70, deviations: 3, performance: "Good", status: "Operational" },
      { siteCode: "SITE-007", name: "KEM Hospital", country: "India", city: "Mumbai", pi: "Dr. P. Desai", screened: 231, enrolled: 172, screenFailure: 59, deviations: 2, performance: "Good", status: "Operational" },
      { siteCode: "SITE-014", name: "Sankara Nethralaya", country: "India", city: "Chennai", pi: "Dr. L. Iyer", screened: 156, enrolled: 118, screenFailure: 38, deviations: 5, performance: "Needs Attention", status: "Operational" },
    ];

    await db.insert(sites).values(siteRows);

    let prevHash = "GENESIS";
    const auditRows: (typeof auditEvents.$inferInsert)[] = [];
    const auditSpecs = [
      { user: "priya.rao@abc-cro.com", role: "Study Coordinator", action: "UPDATE", study: "CT-2026-001", record: "Consent Form", oldValue: "Version 2", newValue: "Version 3", ip: "10.24.11.8" },
      { user: "amit.kumar@abc-cro.com", role: "CRA", action: "COMPLETE", study: "CT-2026-002", record: "Monitoring Visit MV-118", oldValue: "Scheduled", newValue: "Completed", ip: "10.24.11.24" },
      { user: "s.mehta@abc-cro.com", role: "PV Associate", action: "CREATE", study: "CT-2026-001", record: "SAE Case SAE-2041", oldValue: null, newValue: "Serious - Grade 3", ip: "10.24.11.15" },
      { user: "r.iyer@abc-cro.com", role: "Regulatory Manager", action: "UPLOAD", study: "CT-2026-003", record: "CTRI Doc CTRI-889", oldValue: null, newValue: "Approved", ip: "10.24.11.19" },
      { user: "dr.sharma@aiims.edu", role: "Principal Investigator", action: "APPROVE", study: "CT-2026-001", record: "Protocol Amendment #4", oldValue: "Pending", newValue: "Approved", ip: "10.24.11.7" },
      { user: "n.rao@abc-cro.com", role: "Data Manager", action: "RESOLVE", study: "CT-2026-005", record: "Query DQ-1129", oldValue: "Open", newValue: "Resolved", ip: "10.24.11.31" },
      { user: "qa.lead@abc-cro.com", role: "QA", action: "CREATE", study: "CT-2026-004", record: "CAPA CAPA-072", oldValue: null, newValue: "Draft", ip: "10.24.11.50" },
      { user: "sponsor@pharmacorp.com", role: "Sponsor", action: "VIEW", study: "CT-2026-001", record: "Enrollment Report", oldValue: null, newValue: "Accessed", ip: "203.192.77.14" },
    ];

    const now = Date.now();
    auditSpecs.forEach((spec, i) => {
      const ts = new Date(now - i * 7 * 60 * 1000);
      const payload = JSON.stringify({ ...spec, ts: ts.toISOString() });
      const h = hash(prevHash, payload);
      auditRows.push({ ...spec, ts, hash: h, meta: { prevHash } });
      prevHash = h;
    });

    await db.insert(auditEvents).values(auditRows);

    const activityRows = [
      { actor: "Priya Rao", role: "Study Coordinator", message: "Updated subject consent (Subject S-2419)", study: "CT-2026-001" },
      { actor: "Amit Kumar", role: "CRA", message: "Completed monitoring visit at SITE-002", study: "CT-2026-002" },
      { actor: "S. Mehta", role: "PV Associate", message: "Created SAE case SAE-2041", study: "CT-2026-001" },
      { actor: "R. Iyer", role: "Regulatory Manager", message: "Uploaded CTRI registration document", study: "CT-2026-003" },
      { actor: "Dr. Sharma", role: "PI", message: "Approved protocol amendment #4", study: "CT-2026-001" },
      { actor: "N. Rao", role: "Data Manager", message: "Resolved data query DQ-1129", study: "CT-2026-005" },
      { actor: "QA Lead", role: "QA", message: "Opened CAPA CAPA-072 for finding F-118", study: "CT-2026-004" },
    ];

    const activityTs = new Date();
    const activityValues = activityRows.map((row, i) => ({
      ...row,
      ts: new Date(activityTs.getTime() - i * 6 * 60 * 1000),
    }));

    await db.insert(activities).values(activityValues);

    return NextResponse.json({ ok: true, seeded: { trials: trialRows.length, sites: siteRows.length, audit: auditRows.length, activities: activityValues.length } });
  } catch {
    return NextResponse.json({ ok: false, error: "Seed failed" }, { status: 500 });
  }
}
