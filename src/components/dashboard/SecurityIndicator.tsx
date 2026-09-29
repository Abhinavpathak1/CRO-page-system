"use client";

import Icon from "../Icon";
import { useSession } from "@/lib/session";

export default function SecurityIndicator() {
  const { session } = useSession();
  const loginTime = session
    ? new Date(session.loginAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "09:12";

  return (
    <div className="card p-4">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-9 h-9 flex items-center justify-center"
          style={{
            background: "var(--color-success-soft)",
            color: "var(--color-success)",
            border: "1px solid rgba(31,92,63,0.2)",
            borderRadius: "var(--radius-sm)",
          }}
        >
          <Icon name="lock" size={15} />
        </div>
        <div>
          <div
            className="text-token"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15 }}
          >
            Secure Session
          </div>
          <div className="text-[11.5px] text-token-muted mt-0.5">MFA · RBAC · Study-level access</div>
        </div>
      </div>
      <div className="text-[12.5px] space-y-2 text-token-secondary">
        <Row label="Signed in as" value={session?.name ?? "—"} />
        <Row label="Role" value={session?.role ?? "—"} />
        <Row label="Organization" value={session?.organization ?? "—"} />
        <Row label="Last login" value={`Today, ${loginTime}`} />
        <Row label="IP" value="10.24.11.19" />
      </div>
      <div
        className="mt-4 pt-3 flex flex-wrap gap-1.5"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        {["MFA", "RBAC", "ABAC", "ALCOA+", "21 CFR Part 11"].map((b) => (
          <span key={b} className="pill pill-success">{b}</span>
        ))}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-token-muted shrink-0">{label}</span>
      <span className="font-semibold text-token text-right truncate">{value}</span>
    </div>
  );
}
