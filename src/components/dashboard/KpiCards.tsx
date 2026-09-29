import Icon, { type IconName } from "../Icon";

type Kpi = {
  label: string;
  value: string;
  trend: string;
  trendUp?: boolean;
  status: "normal" | "attention" | "critical" | "info";
  icon: IconName;
  tone: "primary" | "success" | "info" | "warning" | "danger" | "accent";
};

const KPIS: Kpi[] = [
  {
    label: "Total Active Trials",
    value: "24",
    trend: "+3 this quarter",
    trendUp: true,
    status: "info",
    icon: "flask",
    tone: "primary",
  },
  {
    label: "Active Sites",
    value: "148",
    trend: "92% operational",
    trendUp: true,
    status: "normal",
    icon: "hospital",
    tone: "success",
  },
  {
    label: "Total Enrolled",
    value: "8,426",
    trend: "76% of target",
    trendUp: true,
    status: "info",
    icon: "users",
    tone: "info",
  },
  {
    label: "Open Protocol Deviations",
    value: "37",
    trend: "5 critical",
    status: "attention",
    icon: "warn",
    tone: "warning",
  },
  {
    label: "Open AE / SAE Cases",
    value: "18",
    trend: "3 requiring action",
    status: "critical",
    icon: "shield",
    tone: "danger",
  },
  {
    label: "Compliance Score",
    value: "94.6%",
    trend: "2 items to review",
    status: "normal",
    icon: "check",
    tone: "accent",
  },
];

const toneMap: Record<Kpi["tone"], { bg: string; fg: string; border: string }> = {
  primary: { bg: "rgba(122,42,18,0.08)", fg: "var(--color-primary)", border: "rgba(122,42,18,0.18)" },
  success: { bg: "var(--color-success-soft)", fg: "var(--color-success)", border: "rgba(31,92,63,0.2)" },
  info:    { bg: "var(--color-info-soft)",    fg: "var(--color-info)",    border: "rgba(49,90,120,0.2)" },
  warning: { bg: "var(--color-warning-soft)", fg: "#7A5A1A",              border: "rgba(184,134,46,0.3)" },
  danger:  { bg: "var(--color-danger-soft)",  fg: "var(--color-danger)",  border: "rgba(155,44,44,0.2)" },
  accent:  { bg: "rgba(184,134,46,0.12)",     fg: "#7A5A1A",              border: "rgba(184,134,46,0.3)" },
};

const statusDot: Record<Kpi["status"], string> = {
  normal: "var(--color-success)",
  attention: "var(--color-warning)",
  critical: "var(--color-danger)",
  info: "var(--color-info)",
};

export default function KpiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {KPIS.map((k) => {
        const t = toneMap[k.tone];
        return (
          <div key={k.label} className="card card-hover p-4 relative">
            <div className="flex items-start justify-between">
              <div
                className="w-10 h-10 flex items-center justify-center"
                style={{
                  background: t.bg,
                  color: t.fg,
                  border: `1px solid ${t.border}`,
                  borderRadius: "var(--radius-sm)",
                }}
              >
                <Icon name={k.icon} size={18} />
              </div>
              <span
                className="w-2 h-2 rounded-full mt-1"
                style={{ background: statusDot[k.status] }}
                title={k.status}
              />
            </div>
            <div className="mt-4">
              <div className="eyebrow">{k.label}</div>
              <div
                className="mt-1.5 tabular-nums text-token"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: 28,
                  lineHeight: 1.1,
                }}
              >
                {k.value}
              </div>
              <div className="flex items-center gap-1 mt-2 text-[12.5px] text-token-secondary">
                {k.trendUp !== undefined && (
                  <Icon
                    name={k.trendUp ? "trendUp" : "trendDown"}
                    size={12}
                    style={{ color: k.trendUp ? "var(--color-success)" : "var(--color-danger)" }}
                  />
                )}
                <span>{k.trend}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
