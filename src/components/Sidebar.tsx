"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Icon, { type IconName } from "./Icon";
import { clearSession, notifySessionChange, useSession } from "@/lib/session";

type Item = { label: string; href: string; icon: IconName; badge?: string };

const NAV: Item[] = [
  { label: "Dashboard", href: "/", icon: "dashboard" },
  { label: "Clinical Trials", href: "/trials", icon: "flask" },
  { label: "Sites", href: "/sites", icon: "hospital" },
  { label: "Subjects", href: "/subjects", icon: "users" },
  { label: "Enrollment", href: "/enrollment", icon: "userPlus" },
  { label: "Visits", href: "/visits", icon: "calendar" },
  { label: "Safety / PV", href: "/safety", icon: "shield", badge: "2" },
  { label: "Regulatory", href: "/regulatory", icon: "clipboard" },
  { label: "Ethics Committee", href: "/ethics", icon: "scale" },
  { label: "Documents", href: "/documents", icon: "doc" },
  { label: "Monitoring", href: "/monitoring", icon: "eye" },
  { label: "Protocol Deviations", href: "/deviations", icon: "warn", badge: "5" },
  { label: "Data Management", href: "/data", icon: "database" },
  { label: "Reports & Analytics", href: "/reports", icon: "chart" },
  { label: "Audit Trail", href: "/audit", icon: "history" },
  { label: "Notifications", href: "/notifications", icon: "bell" },
  { label: "User Management", href: "/users", icon: "userCog" },
  { label: "System Settings", href: "/settings", icon: "settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { session } = useSession();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    clearSession();
    notifySessionChange();
    router.push("/login");
  };

  const displayName = session?.name ?? "Dr. Ramesh Iyer";
  const displayRole = session?.role ?? "Clinical Trial Manager";
  const displayInitials = session?.initials ?? "RI";
  const displayOrg = session?.organization ?? "ABC Clinical Research";

  return (
    <aside
      className={`${collapsed ? "w-16" : "w-64"} shrink-0 flex flex-col h-screen sticky top-0 transition-[width] duration-200`}
      style={{
        background: "var(--color-primary-dark)",
        color: "#F1E9DF",
        borderRight: "1px solid rgba(0,0,0,0.25)",
      }}
    >
      {/* Brand */}
      <div
        className="flex items-center gap-3 px-4 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div
          className="w-9 h-9 flex items-center justify-center shrink-0"
          style={{
            background: "var(--color-accent)",
            color: "var(--color-primary-dark)",
            borderRadius: "var(--radius-sm)",
            fontFamily: "var(--font-heading)",
            fontWeight: 900,
          }}
        >
          C
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <div
              className="text-white text-[15px] leading-tight truncate"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
            >
              CRO CTMS
            </div>
            <div
              className="text-[10px] mt-0.5"
              style={{ letterSpacing: "0.14em", color: "rgba(241,233,223,0.6)" }}
            >
              TRIAL MANAGEMENT
            </div>
          </div>
        )}
      </div>

      {/* Collapse handle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        aria-label="Toggle sidebar"
        className="absolute -right-3 top-6 w-6 h-6 flex items-center justify-center z-10"
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border-strong)",
          borderRadius: "var(--radius-pill)",
          color: "var(--color-text-secondary)",
        }}
      >
        <Icon name={collapsed ? "chevronRight" : "chevronLeft"} size={13} />
      </button>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5 scrollbar-thin">
        {NAV.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className="flex items-center gap-3 px-3 py-2 text-[13.5px] transition-colors relative"
              style={{
                color: active ? "#FFFFFF" : "rgba(241,233,223,0.82)",
                background: active ? "rgba(255,255,255,0.08)" : "transparent",
                borderRadius: "var(--radius-sm)",
                borderLeft: active ? "3px solid var(--color-accent)" : "3px solid transparent",
                fontWeight: active ? 600 : 500,
              }}
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.background = "transparent";
              }}
            >
              <Icon name={item.icon} size={16} className="shrink-0" />
              {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
              {!collapsed && item.badge && (
                <span
                  className="text-[10px] px-1.5 py-0.5 font-semibold"
                  style={{
                    background: "var(--color-accent)",
                    color: "var(--color-primary-dark)",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="p-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        {!collapsed ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div
                className="w-9 h-9 flex items-center justify-center text-[11px] font-semibold"
                style={{
                  background: "var(--color-accent)",
                  color: "var(--color-primary-dark)",
                  borderRadius: "var(--radius-sm)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                {displayInitials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-white text-sm truncate">{displayName}</div>
                <div className="text-[11px] truncate" style={{ color: "rgba(241,233,223,0.6)" }}>
                  {displayRole}
                </div>
              </div>
            </div>
            <div className="text-[11px] px-1" style={{ color: "rgba(241,233,223,0.6)" }}>
              <div className="truncate">{displayOrg}</div>
              <div className="flex items-center gap-1 mt-0.5" style={{ color: "var(--color-accent)" }}>
                <Icon name="lock" size={11} /> Secure Session
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-1.5 text-[12px] py-1.5"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "rgba(241,233,223,0.9)",
                borderRadius: "var(--radius-sm)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Icon name="logout" size={13} /> Sign Out
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-8 h-8 flex items-center justify-center text-[11px] font-semibold"
              style={{ background: "var(--color-accent)", color: "var(--color-primary-dark)", borderRadius: "var(--radius-sm)" }}
            >
              {displayInitials}
            </div>
            <button onClick={handleLogout} aria-label="Sign out" style={{ color: "rgba(241,233,223,0.7)" }}>
              <Icon name="logout" size={15} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
