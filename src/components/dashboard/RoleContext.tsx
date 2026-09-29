"use client";

import Icon from "../Icon";
import { roleWidgets, type Role } from "@/lib/mockData";

export default function RoleContext({ role }: { role: Role }) {
  const widgets = roleWidgets[role];
  return (
    <div
      className="p-4 flex flex-wrap items-center gap-3 mb-6"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderLeft: "4px solid var(--color-secondary)",
        borderRadius: "var(--radius-sm)",
      }}
    >
      <div
        className="w-10 h-10 flex items-center justify-center shrink-0"
        style={{
          background: "var(--color-success-soft)",
          color: "var(--color-secondary)",
          border: "1px solid rgba(31,92,63,0.2)",
          borderRadius: "var(--radius-sm)",
        }}
      >
        <Icon name="userCog" size={17} />
      </div>
      <div className="min-w-0">
        <div className="eyebrow" style={{ color: "var(--color-secondary)" }}>Role-based dashboard</div>
        <div
          className="text-token mt-0.5"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15 }}
        >
          {role} view
          <span
            className="font-normal ml-1.5 text-token-secondary"
            style={{ fontFamily: "var(--font-body)", fontSize: 13.5, fontWeight: 400 }}
          >
            · access scoped by RBAC / ABAC
          </span>
        </div>
      </div>
      <div className="ml-auto flex flex-wrap gap-1.5">
        {widgets.map((w) => (
          <span key={w} className="pill pill-neutral">{w}</span>
        ))}
      </div>
    </div>
  );
}
