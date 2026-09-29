"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/Icon";

type Event = {
  id: number;
  ts: string;
  user: string;
  role: string;
  action: string;
  study: string;
  record: string;
  oldValue: string | null;
  newValue: string | null;
  ip: string;
  hash: string;
};

const actionPill: Record<string, string> = {
  UPDATE: "pill-info",
  CREATE: "pill-success",
  COMPLETE: "pill-success",
  UPLOAD: "pill-primary",
  APPROVE: "pill-primary",
  RESOLVE: "pill-success",
  VIEW: "pill-neutral",
};

export default function AuditPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/audit")
      .then((r) => r.json())
      .then((d) => setEvents(d.events ?? []))
      .finally(() => setLoading(false));
  }, []);

  const filtered = events.filter(
    (e) =>
      !q ||
      e.user.toLowerCase().includes(q.toLowerCase()) ||
      e.study.toLowerCase().includes(q.toLowerCase()) ||
      e.record.toLowerCase().includes(q.toLowerCase()) ||
      e.action.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="flex items-center gap-2 text-[12px] text-token-muted mb-2">
        <a href="/" className="hover:text-token">Dashboard</a>
        <Icon name="chevronRight" size={11} />
        <span>Audit Trail</span>
      </div>
      <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
        <div>
          <h1
            className="text-token"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 32, lineHeight: 1.15 }}
          >
            Audit Trail
          </h1>
          <p className="text-[14px] text-token-secondary mt-2 leading-relaxed">
            Immutable, hash-chained event log · ALCOA+ compliant · 21 CFR Part 11
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {["Hash-chained", "Immutable", "ALCOA+", "21 CFR Part 11", "GDPR"].map((b) => (
            <span key={b} className="pill pill-success">{b}</span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Events (30d)" value="24,812" icon="history" tone="primary" />
        <StatCard label="Records Modified" value="3,142" icon="doc" tone="info" />
        <StatCard label="Chain Integrity" value="100%" icon="shield" tone="success" />
        <StatCard label="Failed Auth Attempts" value="7" icon="lock" tone="warning" />
      </div>

      <div className="card">
        <div
          className="flex items-center gap-3 p-4"
          style={{ borderBottom: "1px solid var(--color-border)" }}
        >
          <div className="relative flex-1 max-w-md">
            <Icon
              name="search"
              size={14}
              className="absolute left-2.5 top-1/2 -translate-y-1/2"
              style={{ color: "var(--color-text-muted)" }}
            />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search users, studies, records, actions…"
              className="input"
              style={{ paddingLeft: 30, height: 36 }}
            />
          </div>
          <button className="btn btn-ghost btn-sm ml-auto">
            <Icon name="download" size={13} /> Export CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[13px] min-w-[1120px]">
            <thead style={{ background: "var(--color-surface-soft)" }}>
              <tr>
                <Th>Timestamp</Th>
                <Th>User</Th>
                <Th>Role</Th>
                <Th>Action</Th>
                <Th>Study</Th>
                <Th>Record</Th>
                <Th>Old → New</Th>
                <Th>IP</Th>
                <Th>Hash</Th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr style={{ borderTop: "1px solid var(--color-border)" }}>
                  <td colSpan={9} className="p-8 text-center text-[13px] text-token-muted">Loading events…</td>
                </tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr style={{ borderTop: "1px solid var(--color-border)" }}>
                  <td colSpan={9} className="p-8 text-center text-[13px] text-token-muted">
                    No audit events. Seed the demo data from the dashboard.
                  </td>
                </tr>
              )}
              {filtered.map((e) => (
                <tr
                  key={e.id}
                  className="row-hover"
                  style={{ borderTop: "1px solid var(--color-border)" }}
                >
                  <Td>
                    <div className="font-mono text-[12px] text-token">
                      {new Date(e.ts).toLocaleString()}
                    </div>
                  </Td>
                  <Td>
                    <div className="text-token font-semibold">{e.user.split("@")[0]}</div>
                    <div className="text-[11.5px] text-token-muted">{e.user}</div>
                  </Td>
                  <Td className="text-[12.5px] text-token-secondary">{e.role}</Td>
                  <Td>
                    <span className={`pill ${actionPill[e.action] ?? "pill-neutral"}`}>{e.action}</span>
                  </Td>
                  <Td>
                    <span className="font-mono text-[12px] font-semibold text-primary-token">{e.study}</span>
                  </Td>
                  <Td className="text-[12.5px] text-token-secondary">{e.record}</Td>
                  <Td>
                    <div className="text-[12.5px]">
                      {e.oldValue && (
                        <span className="line-through text-token-muted">{e.oldValue}</span>
                      )}
                      {e.oldValue && e.newValue && (
                        <span className="mx-1 text-token-muted">→</span>
                      )}
                      {e.newValue && (
                        <span className="font-semibold text-token">{e.newValue}</span>
                      )}
                    </div>
                  </Td>
                  <Td>
                    <span className="font-mono text-[12px] text-token-secondary">{e.ip}</span>
                  </Td>
                  <Td>
                    <code className="text-[11px] font-mono text-token-muted">{e.hash.slice(0, 12)}…</code>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      className="text-left px-4 py-2.5 eyebrow font-semibold"
      style={{ color: "var(--color-text-muted)" }}
    >
      {children}
    </th>
  );
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-top ${className}`}>{children}</td>;
}
function StatCard({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: string;
  icon: React.ComponentProps<typeof Icon>["name"];
  tone: "primary" | "info" | "success" | "warning";
}) {
  const tokenMap = {
    primary: { bg: "rgba(122,42,18,0.08)", color: "var(--color-primary)", border: "rgba(122,42,18,0.2)" },
    info: { bg: "var(--color-info-soft)", color: "var(--color-info)", border: "rgba(49,90,120,0.2)" },
    success: { bg: "var(--color-success-soft)", color: "var(--color-success)", border: "rgba(31,92,63,0.2)" },
    warning: { bg: "var(--color-warning-soft)", color: "#7A5A1A", border: "rgba(184,134,46,0.3)" },
  }[tone];
  return (
    <div className="card p-4">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 flex items-center justify-center"
          style={{
            background: tokenMap.bg,
            color: tokenMap.color,
            border: `1px solid ${tokenMap.border}`,
            borderRadius: "var(--radius-sm)",
          }}
        >
          <Icon name={icon} size={17} />
        </div>
        <div>
          <div className="eyebrow">{label}</div>
          <div
            className="tabular-nums text-token mt-0.5"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, lineHeight: 1.1 }}
          >
            {value}
          </div>
        </div>
      </div>
    </div>
  );
}
