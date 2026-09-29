"use client";

import { useEffect, useState } from "react";
import Icon from "../Icon";

type Activity = {
  id: number;
  ts: string;
  actor: string;
  role: string;
  message: string;
  study: string | null;
};

const roleColor: Record<string, string> = {
  "Study Coordinator": "var(--color-info)",
  CRA: "var(--color-secondary)",
  "PV Associate": "var(--color-danger)",
  "Regulatory Manager": "var(--color-primary)",
  PI: "var(--color-primary-dark)",
  "Data Manager": "var(--color-warning)",
  QA: "var(--color-secondary)",
};

export default function ActivityFeed() {
  const [items, setItems] = useState<Activity[]>([]);
  useEffect(() => {
    fetch("/api/activities").then((r) => r.json()).then((d) => setItems(d.activities ?? []));
  }, []);

  return (
    <div className="card p-5">
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 flex items-center justify-center"
          style={{
            background: "var(--color-surface-soft)",
            color: "var(--color-text-secondary)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-sm)",
          }}
        >
          <Icon name="history" size={18} />
        </div>
        <div className="flex-1">
          <h3 className="section-title text-[17px]">Recent Activity</h3>
          <p className="text-[12.5px] text-token-muted mt-0.5">Audit-verified event feed</p>
        </div>
        <span className="text-[11px] text-token-muted flex items-center gap-1.5 font-semibold">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "var(--color-success)" }}
          />
          LIVE
        </span>
      </div>

      <div className="relative">
        <div
          className="absolute left-[15px] top-1 bottom-1 w-px"
          style={{ background: "var(--color-border)" }}
        />
        <ul className="space-y-4">
          {items.map((a) => {
            const time = new Date(a.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            const color = roleColor[a.role] ?? "var(--color-text-muted)";
            return (
              <li key={a.id} className="flex gap-3 relative">
                <div
                  className="w-8 h-8 text-[10.5px] font-semibold flex items-center justify-center shrink-0 z-10"
                  style={{
                    background: color,
                    color: "#FFFFFF",
                    borderRadius: "var(--radius-sm)",
                    border: "3px solid var(--color-surface)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {a.actor
                    .split(" ")
                    .map((s) => s[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[12px] flex-wrap">
                    <span className="font-mono text-token-muted">{time}</span>
                    <span className="font-semibold text-token">{a.actor}</span>
                    <span className="text-token-muted">·</span>
                    <span className="text-token-muted">{a.role}</span>
                  </div>
                  <div className="text-[13.5px] text-token-secondary mt-1">
                    {a.message}
                    {a.study && (
                      <span
                        className="font-mono text-[11.5px] ml-2 font-semibold"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {a.study}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
          {items.length === 0 && (
            <li className="text-[13px] text-token-muted py-6 text-center">Loading recent activity…</li>
          )}
        </ul>
      </div>
    </div>
  );
}
