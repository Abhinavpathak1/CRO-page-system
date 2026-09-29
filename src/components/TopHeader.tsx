"use client";

import { useState } from "react";
import Icon from "./Icon";
import { useSession } from "@/lib/session";

const ROLE_ABBR: Record<string, string> = {
  "Clinical Trial Manager": "CTM",
  "Principal Investigator": "PI",
  "Study Coordinator": "SC",
  "Project Manager": "PM",
  "PV Team": "PV",
  Executive: "EXEC",
  Regulatory: "REG",
  CRA: "CRA",
  QA: "QA",
  Sponsor: "SPN",
  Regulator: "INSP",
};

export default function TopHeader() {
  const [trial, setTrial] = useState("CT-2026-001");
  const { session } = useSession();
  const name = session?.name ?? "Dr. Ramesh Iyer";
  const initials = session?.initials ?? "RI";
  const org = session?.organization ?? "ABC Clinical Research";
  const roleAbbr = ROLE_ABBR[session?.role ?? "Clinical Trial Manager"] ?? "USER";
  const loginTime = session ? new Date(session.loginAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "09:12";
  return (
    <header
      className="sticky top-0 z-20"
      style={{
        background: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="flex items-center gap-3 px-6 h-16">
        {/* Search */}
        <div className="flex-1 max-w-xl relative">
          <Icon
            name="search"
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--color-text-muted)" }}
          />
          <input
            type="text"
            placeholder="Search studies, sites, subjects, documents…"
            className="input"
            style={{ paddingLeft: 34, height: 38, background: "var(--color-surface-soft)" }}
          />
        </div>

        {/* Trial context */}
        <div
          className="hidden lg:flex items-center gap-5 pl-5"
          style={{ borderLeft: "1px solid var(--color-border)" }}
        >
          <div>
            <div className="eyebrow">Organization</div>
            <div className="text-[13.5px] font-semibold text-token">{org}</div>
          </div>
          <div>
            <div className="eyebrow">Active Study</div>
            <select
              value={trial}
              onChange={(e) => setTrial(e.target.value)}
              className="text-[13.5px] font-semibold bg-transparent border-0 outline-none cursor-pointer"
              style={{ color: "var(--color-primary)", fontFamily: "var(--font-body)" }}
            >
              <option value="CT-2026-001">CT-2026-001 · Oncology</option>
              <option value="CT-2026-002">CT-2026-002 · Cardiology</option>
              <option value="CT-2026-003">CT-2026-003 · Diabetes</option>
              <option value="CT-2026-004">CT-2026-004 · Immunology</option>
              <option value="CT-2026-005">CT-2026-005 · Vaccines</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <IconButton icon="warn" tone="warning" badge="3" title="Alerts" />
          <IconButton icon="bell" tone="danger" badge="7" title="Notifications" />
          <IconButton icon="help" title="Help" />

          <div className="w-px h-6 mx-2" style={{ background: "var(--color-border)" }} />

          <div className="flex items-center gap-2 pr-2 pl-1">
            <div
              className="w-9 h-9 flex items-center justify-center text-[11px] font-semibold"
              style={{
                background: "var(--color-primary)",
                color: "var(--color-text-inverse)",
                borderRadius: "var(--radius-sm)",
                fontFamily: "var(--font-heading)",
              }}
            >
              {initials}
            </div>
            <div className="hidden md:block text-[12.5px] leading-tight">
              <div className="font-semibold text-token">{name}</div>
              <div className="text-token-muted">{roleAbbr} · Last login Today {loginTime}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function IconButton({
  icon,
  badge,
  tone,
  title,
}: {
  icon: React.ComponentProps<typeof Icon>["name"];
  badge?: string;
  tone?: "warning" | "danger";
  title: string;
}) {
  const badgeColor =
    tone === "warning"
      ? "var(--color-warning)"
      : tone === "danger"
      ? "var(--color-danger)"
      : "var(--color-text-muted)";
  return (
    <button
      title={title}
      aria-label={title}
      className="relative w-10 h-10 flex items-center justify-center transition-colors"
      style={{ color: "var(--color-text-secondary)", borderRadius: "var(--radius-sm)" }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-surface-soft)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <Icon name={icon} size={18} />
      {badge && (
        <span
          className="absolute top-1.5 right-1.5 min-w-[16px] h-[16px] px-1 text-[9px] font-bold flex items-center justify-center"
          style={{
            background: badgeColor,
            color: "#FFFFFF",
            borderRadius: "var(--radius-pill)",
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}
