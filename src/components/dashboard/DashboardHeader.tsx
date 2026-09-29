"use client";

import { useState } from "react";
import Icon from "../Icon";
import type { Role } from "@/lib/mockData";

type Props = {
  role: Role;
  onSeed: () => void;
  seeding: boolean;
  seeded: boolean;
};

export default function DashboardHeader({ role, onSeed, seeding, seeded }: Props) {
  const [filtersOpen, setFiltersOpen] = useState(true);

  return (
    <div className="mb-6">
      {/* Title row */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2 text-[12px] text-token-muted mb-2">
            <span>Dashboard</span>
            <Icon name="chevronRight" size={11} />
            <span>Portfolio</span>
            <span className="mx-1">·</span>
            <span className="pill pill-primary" style={{ fontSize: 10, padding: "1px 8px" }}>
              {role}
            </span>
          </div>
          <h1
            className="text-token"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 32, lineHeight: 1.15 }}
          >
            Clinical Trial Portfolio
          </h1>
          <p className="text-[14px] text-token-secondary mt-2 max-w-2xl leading-relaxed">
            Real-time overview of clinical trial operations, compliance and safety.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {!seeded && (
            <button
              onClick={onSeed}
              disabled={seeding}
              className="btn btn-ghost"
              style={{
                background: "var(--color-warning-soft)",
                borderColor: "rgba(184,134,46,0.4)",
                color: "#7A5A1A",
              }}
            >
              <Icon name="database" size={14} />
              {seeding ? "Seeding…" : "Seed Demo Data"}
            </button>
          )}
          <button className="btn btn-ghost">
            <Icon name="download" size={14} /> Export Report
          </button>
          <button className="btn btn-primary">
            <Icon name="plus" size={14} /> Add Trial
          </button>
        </div>
      </div>

      {/* Filters bar */}
      <div className="card">
        <div
          className="flex items-center gap-2 px-4 py-2.5"
          style={{ borderBottom: "1px solid var(--color-border)", background: "var(--color-surface-soft)" }}
        >
          <Icon name="filter" size={14} style={{ color: "var(--color-text-muted)" }} />
          <div className="text-[12.5px] font-semibold text-token">Filters</div>
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className="ml-auto text-[12px] text-token-muted hover:text-token"
          >
            {filtersOpen ? "Hide" : "Show"}
          </button>
        </div>
        {filtersOpen && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4">
            <Filter label="Study" options={["All studies", "CT-2026-001", "CT-2026-002", "CT-2026-003"]} />
            <Filter label="Therapeutic Area" options={["All areas", "Oncology", "Cardiology", "Endocrinology", "Neurology", "Immunology"]} />
            <Filter label="Phase" options={["All phases", "Phase I", "Phase II", "Phase III", "Phase IV"]} />
            <Filter label="Site" options={["All sites", "SITE-001", "SITE-002", "SITE-003"]} />
            <Filter label="Country" options={["All countries", "India", "Global"]} />
            <Filter label="Date Range" options={["Last 30 days", "Last 90 days", "YTD", "Last 12 months"]} />
          </div>
        )}
      </div>
    </div>
  );
}

function Filter({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <div className="eyebrow mb-1.5">{label}</div>
      <select className="select" style={{ height: 34, fontSize: 13 }}>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
