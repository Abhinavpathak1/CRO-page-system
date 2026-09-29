"use client";

import { useState } from "react";
import KpiCards from "@/components/dashboard/KpiCards";
import TrialPortfolio from "@/components/dashboard/TrialPortfolio";
import EnrollmentChart from "@/components/dashboard/EnrollmentChart";
import SitePerformance from "@/components/dashboard/SitePerformance";
import SafetyPanel from "@/components/dashboard/SafetyPanel";
import RegulatoryPanel from "@/components/dashboard/RegulatoryPanel";
import DeviationPanel from "@/components/dashboard/DeviationPanel";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import QuickActions from "@/components/dashboard/QuickActions";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import RoleContext from "@/components/dashboard/RoleContext";
import SecurityIndicator from "@/components/dashboard/SecurityIndicator";
import DemoRoleSwitcher from "@/components/dashboard/DemoRoleSwitcher";
import { useSession } from "@/lib/session";
import type { Role } from "@/lib/mockData";

export default function DashboardPage() {
  const { session } = useSession();
  const role: Role = session?.role ?? "Clinical Trial Manager";
  const [seeding, setSeeding] = useState(false);
  const [seeded, setSeeded] = useState(false);

  const runSeed = async () => {
    setSeeding(true);
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      if (res.ok) {
        setSeeded(true);
        window.location.reload();
      }
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <DashboardHeader role={role} onSeed={runSeed} seeding={seeding} seeded={seeded} />

      <RoleContext role={role} />

      {/* Demo role switcher — replaces the old role dropdown */}
      <div className="mb-6">
        <DemoRoleSwitcher />
      </div>

      {/* KPI cards */}
      <div className="mb-6">
        <KpiCards />
      </div>

      {/* Portfolio */}
      <div className="mb-6">
        <TrialPortfolio />
      </div>

      {/* Two-column: Enrollment + Right stack */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <div className="xl:col-span-2">
          <EnrollmentChart />
        </div>
        <div className="space-y-6">
          <SafetyPanel />
          <SecurityIndicator />
        </div>
      </div>

      {/* Three-column: Site perf + Reg + Deviations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1">
          <RegulatoryPanel />
        </div>
        <div className="lg:col-span-2">
          <SitePerformance />
        </div>
      </div>

      {/* Alerts + Deviations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <AlertsPanel />
        </div>
        <div>
          <DeviationPanel />
        </div>
      </div>

      {/* Activity + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Footer / architecture note */}
      <div
        className="text-[11.5px] text-center py-5 mt-6 text-token-muted"
        style={{ borderTop: "1px solid var(--color-border)", letterSpacing: "0.02em" }}
      >
        CRO CTMS · Frontend → API Gateway → RBAC · Workflow · Compliance · PV · Notifications · Trial DB · Doc Store · Audit Log · Analytics
      </div>
    </div>
  );
}
