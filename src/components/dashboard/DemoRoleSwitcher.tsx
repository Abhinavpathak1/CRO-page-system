"use client";

import { useState } from "react";
import Icon from "../Icon";
import { ALL_DEMO_ACCOUNTS, switchToRole, useSession } from "@/lib/session";
import type { Role } from "@/lib/mockData";

export default function DemoRoleSwitcher() {
  const { session } = useSession();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<Role | null>(null);

  const currentRole = session?.role;

  const trySwitch = (role: Role) => {
    if (role === currentRole) return;
    setPending(role);
    // brief delay to simulate re-auth for the new role
    setTimeout(() => {
      switchToRole(role);
      setPending(null);
      setOpen(false);
    }, 250);
  };

  return (
    <div className="card">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 p-4 text-left transition-colors"
        aria-expanded={open}
        style={{ borderRadius: "var(--radius-md)" }}
      >
        <div
          className="w-10 h-10 flex items-center justify-center shrink-0"
          style={{
            background: "rgba(184,134,46,0.14)",
            color: "#7A5A1A",
            border: "1px solid rgba(184,134,46,0.35)",
            borderRadius: "var(--radius-sm)",
          }}
        >
          <Icon name="spark" size={17} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="eyebrow" style={{ color: "var(--color-primary)" }}>
            Try the demo
          </div>
          <div
            className="text-token mt-0.5"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15 }}
          >
            Preview any role&rsquo;s dashboard
          </div>
          <div className="text-[12.5px] text-token-muted mt-0.5">
            Instantly switch context to see how the workspace changes per role.
          </div>
        </div>
        <Icon
          name="chevronDown"
          size={16}
          style={{
            color: "var(--color-text-muted)",
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 150ms ease",
          }}
        />
      </button>

      {open && (
        <div
          className="p-4"
          style={{ borderTop: "1px solid var(--color-border)", background: "var(--color-surface-soft)" }}
        >
          <div
            className="text-[12px] text-token-secondary mb-3 flex items-start gap-2 p-2"
            style={{
              background: "rgba(184,134,46,0.1)",
              border: "1px solid rgba(184,134,46,0.3)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <Icon name="lock" size={12} className="mt-0.5 shrink-0" style={{ color: "#7A5A1A" }} />
            <span>
              Demo re-authentication is instant. In production each role switch would require
              MFA and generate an immutable audit event.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {ALL_DEMO_ACCOUNTS.map((a) => {
              const active = a.role === currentRole;
              const isPending = pending === a.role;
              return (
                <button
                  key={a.email}
                  onClick={() => trySwitch(a.role)}
                  disabled={active || isPending}
                  className="p-3 text-left transition-colors"
                  style={{
                    background: "var(--color-surface)",
                    border: `1px solid ${active ? "var(--color-primary)" : "var(--color-border)"}`,
                    borderLeft: `3px solid ${active ? "var(--color-primary)" : "var(--color-border-strong)"}`,
                    borderRadius: "var(--radius-sm)",
                    opacity: active ? 0.75 : 1,
                    cursor: active ? "default" : "pointer",
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 flex items-center justify-center text-white text-[11px] font-semibold shrink-0"
                      style={{
                        background: active ? "var(--color-primary)" : "var(--color-primary-dark)",
                        borderRadius: "var(--radius-sm)",
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      {a.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div
                        className="text-token truncate"
                        style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 13.5 }}
                      >
                        {a.role}
                      </div>
                      <div className="text-[11px] text-token-muted truncate font-mono">
                        {a.email}
                      </div>
                    </div>
                    {active && <span className="pill pill-success">Current</span>}
                    {isPending && (
                      <span className="text-[11px] font-semibold text-primary-token">
                        Switching…
                      </span>
                    )}
                  </div>
                  <div className="text-[11.5px] text-token-secondary mt-2 leading-snug line-clamp-2">
                    {a.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
