"use client";

import { useEffect, useMemo, useState } from "react";
import Icon from "../Icon";
import StatusBadge from "./StatusBadge";

type Trial = {
  id: number;
  studyId: string;
  title: string;
  therapeuticArea: string;
  phase: string;
  sites: number;
  enrolled: number;
  target: number;
  compliance: number;
  safety: string;
  status: string;
  country: string;
  sponsor: string;
};

export default function TrialPortfolio() {
  const [trials, setTrials] = useState<Trial[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [phase, setPhase] = useState("All");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    let ok = true;
    fetch("/api/trials")
      .then((r) => r.json())
      .then((d) => {
        if (ok) setTrials(d.trials ?? []);
      })
      .finally(() => ok && setLoading(false));
    return () => {
      ok = false;
    };
  }, []);

  const filtered = useMemo(() => {
    return trials.filter((t) => {
      const matchQ =
        !q ||
        t.studyId.toLowerCase().includes(q.toLowerCase()) ||
        t.title.toLowerCase().includes(q.toLowerCase()) ||
        t.therapeuticArea.toLowerCase().includes(q.toLowerCase());
      const matchP = phase === "All" || t.phase === phase;
      const matchS = status === "All" || t.status === status;
      return matchQ && matchP && matchS;
    });
  }, [trials, q, phase, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const rows = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="card">
      <div
        className="flex flex-wrap items-center gap-3 p-4"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <div>
          <h3 className="section-title text-[17px]">Trial Portfolio</h3>
          <p className="text-[12.5px] text-token-muted mt-0.5">
            {filtered.length} of {trials.length} studies · Real-time
          </p>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <div className="relative">
            <Icon
              name="search"
              size={14}
              className="absolute left-2.5 top-1/2 -translate-y-1/2"
              style={{ color: "var(--color-text-muted)" }}
            />
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
              placeholder="Search trials…"
              className="input"
              style={{ height: 32, paddingLeft: 30, paddingRight: 10, fontSize: 12.5, width: 200 }}
            />
          </div>
          <select
            value={phase}
            onChange={(e) => setPhase(e.target.value)}
            className="select"
            style={{ height: 32, width: "auto", paddingRight: 24, fontSize: 12.5 }}
          >
            <option>All</option><option>Phase I</option><option>Phase II</option><option>Phase III</option><option>Phase IV</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="select"
            style={{ height: 32, width: "auto", paddingRight: 24, fontSize: 12.5 }}
          >
            <option>All</option><option>Active</option><option>Recruiting</option><option>Paused</option><option>Completed</option><option>At Risk</option>
          </select>
          <button className="btn btn-ghost btn-sm">
            <Icon name="download" size={13} /> Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[13.5px] min-w-[960px]">
          <thead style={{ background: "var(--color-surface-soft)" }}>
            <tr className="eyebrow">
              <Th>Study ID</Th>
              <Th>Trial</Th>
              <Th>Phase</Th>
              <Th className="text-right">Sites</Th>
              <Th>Enrollment</Th>
              <Th className="text-right">Compliance</Th>
              <Th>Safety</Th>
              <Th>Status</Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {loading &&
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} style={{ borderTop: "1px solid var(--color-border)" }}>
                  <td colSpan={9} className="p-4">
                    <div className="h-6 bg-soft" />
                  </td>
                </tr>
              ))}
            {!loading && rows.length === 0 && (
              <tr style={{ borderTop: "1px solid var(--color-border)" }}>
                <td colSpan={9} className="p-8 text-center text-token-muted">
                  No trials match your filters.
                </td>
              </tr>
            )}
            {!loading &&
              rows.map((t) => {
                const pct = Math.round((t.enrolled / t.target) * 100);
                const complianceColor =
                  t.compliance >= 95
                    ? "var(--color-success)"
                    : t.compliance >= 90
                    ? "#7A5A1A"
                    : "var(--color-danger)";
                return (
                  <tr
                    key={t.id}
                    className="row-hover"
                    style={{ borderTop: "1px solid var(--color-border)" }}
                  >
                    <Td>
                      <div className="font-mono text-[12.5px] font-semibold text-primary-token">
                        {t.studyId}
                      </div>
                    </Td>
                    <Td>
                      <div
                        className="text-token line-clamp-1"
                        style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14 }}
                      >
                        {t.title}
                      </div>
                      <div className="text-[11.5px] text-token-muted mt-0.5">
                        {t.therapeuticArea} · {t.sponsor}
                      </div>
                    </Td>
                    <Td>
                      <span className="pill pill-primary">{t.phase}</span>
                    </Td>
                    <Td className="text-right tabular-nums text-token">{t.sites}</Td>
                    <Td>
                      <div className="min-w-[150px]">
                        <div className="flex justify-between text-[11.5px] text-token-muted mb-1">
                          <span className="tabular-nums text-token-secondary font-semibold">
                            {t.enrolled.toLocaleString()}
                          </span>
                          <span>/ {t.target.toLocaleString()}</span>
                        </div>
                        <div className="progress-track">
                          <div
                            className="progress-fill"
                            style={{ width: `${Math.min(pct, 100)}%` }}
                          />
                        </div>
                      </div>
                    </Td>
                    <Td className="text-right">
                      <span
                        className="tabular-nums font-semibold"
                        style={{ color: complianceColor }}
                      >
                        {t.compliance}%
                      </span>
                    </Td>
                    <Td>
                      <StatusBadge value={t.safety} />
                    </Td>
                    <Td>
                      <StatusBadge value={t.status} />
                    </Td>
                    <Td className="text-right">
                      <button
                        className="text-[12.5px] font-semibold"
                        style={{ color: "var(--color-primary)" }}
                      >
                        View →
                      </button>
                    </Td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div
        className="flex items-center justify-between p-3 text-[12.5px] text-token-muted"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <div>Page {page} of {totalPages}</div>
        <div className="flex items-center gap-1">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="w-8 h-8 flex items-center justify-center disabled:opacity-40"
            style={{ border: "1px solid var(--color-border-strong)", borderRadius: "var(--radius-sm)" }}
          >
            <Icon name="chevronLeft" size={13} />
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="w-8 h-8 flex items-center justify-center disabled:opacity-40"
            style={{ border: "1px solid var(--color-border-strong)", borderRadius: "var(--radius-sm)" }}
          >
            <Icon name="chevronRight" size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <th
      className={`text-left font-semibold px-4 py-2.5 ${className}`}
      style={{ color: "var(--color-text-muted)" }}
    >
      {children}
    </th>
  );
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-middle ${className}`}>{children}</td>;
}
