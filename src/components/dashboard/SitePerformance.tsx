"use client";

import { useEffect, useState } from "react";
import StatusBadge from "./StatusBadge";

type Site = {
  id: number;
  siteCode: string;
  name: string;
  city: string;
  pi: string;
  screened: number;
  enrolled: number;
  screenFailure: number;
  deviations: number;
  performance: string;
};

export default function SitePerformance() {
  const [sites, setSites] = useState<Site[]>([]);
  useEffect(() => {
    fetch("/api/sites").then((r) => r.json()).then((d) => setSites(d.sites ?? []));
  }, []);

  const max = Math.max(1, ...sites.map((s) => s.screened));

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="section-title text-[17px]">Site Performance</h3>
          <p className="text-[12.5px] text-token-muted mt-0.5">
            Top investigator sites by activity across studies
          </p>
        </div>
        <button className="text-[12.5px] font-semibold" style={{ color: "var(--color-primary)" }}>
          View all sites →
        </button>
      </div>

      <div className="space-y-4">
        {sites.slice(0, 6).map((s) => {
          const pct = (s.screened / max) * 100;
          const enrolledPct = (s.enrolled / max) * 100;
          return (
            <div key={s.id}>
              <div className="flex items-center justify-between text-[12.5px] mb-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-mono font-semibold text-token">{s.siteCode}</span>
                  <span className="text-token-muted truncate">· {s.name}, {s.city}</span>
                </div>
                <StatusBadge value={s.performance} />
              </div>
              <div
                className="relative h-6 overflow-hidden"
                style={{ background: "var(--color-surface-strong)", borderRadius: "var(--radius-sm)" }}
              >
                {/* Screened */}
                <div
                  className="absolute inset-y-0 left-0"
                  style={{ width: `${pct}%`, background: "rgba(184,134,46,0.28)" }}
                  title={`Screened: ${s.screened}`}
                />
                {/* Enrolled */}
                <div
                  className="absolute inset-y-0 left-0"
                  style={{ width: `${enrolledPct}%`, background: "var(--color-primary)" }}
                  title={`Enrolled: ${s.enrolled}`}
                />
                <div className="absolute inset-0 flex items-center justify-between px-2 text-[11px] font-semibold">
                  <span style={{ color: "#FFFFFF" }}>{s.enrolled} enrolled</span>
                  <span style={{ color: "var(--color-text-secondary)" }}>
                    {s.screened} screened · {s.screenFailure} SF · {s.deviations} PD
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        {sites.length === 0 && (
          <div className="text-center py-8 text-[13px] text-token-muted">Loading site data…</div>
        )}
      </div>

      <div
        className="mt-5 pt-4 flex flex-wrap gap-5 text-[11.5px] text-token-muted"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <Legend color="rgba(184,134,46,0.5)" label="Screened" />
        <Legend color="var(--color-primary)" label="Enrolled" />
        <div className="ml-auto">SF = Screen Failure · PD = Protocol Deviation</div>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 font-semibold">
      <span className="w-3 h-3" style={{ background: color, borderRadius: 1 }} />
      {label}
    </div>
  );
}
