import Icon from "../Icon";
import { safetyDeadlines } from "@/lib/mockData";

export default function SafetyPanel() {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 flex items-center justify-center"
            style={{
              background: "var(--color-danger-soft)",
              color: "var(--color-danger)",
              border: "1px solid rgba(155,44,44,0.2)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <Icon name="shield" size={18} />
          </div>
          <div>
            <h3 className="section-title text-[17px]">Safety / Pharmacovigilance</h3>
            <p className="text-[12.5px] text-token-muted mt-0.5">
              Case processing & regulatory deadlines
            </p>
          </div>
        </div>
        <span className="pill pill-danger">LIVE</span>
      </div>

      {/* Case grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <SafetyMetric label="AE Cases" value="126" />
        <SafetyMetric label="SAE Cases" value="18" tone="warning" />
        <SafetyMetric label="Pending Review" value="7" tone="info" />
        <SafetyMetric label="Overdue" value="2" tone="danger" pulse />
      </div>

      {/* Deadline timeline */}
      <div className="space-y-3 mb-5">
        {safetyDeadlines.map((d) => {
          const pct = d.overdue > 0 ? 100 : Math.min(80, (d.total / 15) * 100);
          const fillClass = d.color === "red" ? "danger" : d.color === "orange" ? "warning" : "warning";
          return (
            <div key={d.label}>
              <div className="flex items-center justify-between text-[12.5px] mb-1.5">
                <span className="font-semibold text-token">{d.label}</span>
                <span className="text-token-muted">
                  {d.total} cases
                  {d.overdue > 0 && (
                    <span className="ml-2 font-semibold" style={{ color: "var(--color-danger)" }}>
                      · {d.overdue} overdue
                    </span>
                  )}
                </span>
              </div>
              <div className="progress-track">
                <div className={`progress-fill ${fillClass}`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Alert */}
      <div
        className="flex items-start gap-2.5 p-3"
        style={{
          background: "var(--color-danger-soft)",
          borderLeft: "4px solid var(--color-danger)",
          borderRadius: "var(--radius-sm)",
        }}
      >
        <Icon name="warn" size={16} className="mt-0.5 shrink-0" style={{ color: "var(--color-danger)" }} />
        <div className="flex-1 text-[12.5px]">
          <div className="font-semibold" style={{ color: "var(--color-danger)" }}>
            2 SAE cases require immediate attention
          </div>
          <div className="mt-0.5 text-token-secondary">
            Study CT-2026-002 · Cases SAE-2041, SAE-2043 have breached the 24-hour reporting window.
          </div>
        </div>
      </div>

      <button className="btn btn-primary w-full mt-4">
        Open PV Dashboard <Icon name="external" size={13} />
      </button>
    </div>
  );
}

function SafetyMetric({
  label,
  value,
  tone,
  pulse,
}: {
  label: string;
  value: string;
  tone?: "warning" | "info" | "danger";
  pulse?: boolean;
}) {
  const color =
    tone === "warning" ? "#7A5A1A" : tone === "danger" ? "var(--color-danger)" : tone === "info" ? "var(--color-info)" : "var(--color-text)";
  return (
    <div
      className="p-3"
      style={{
        background: "var(--color-surface-soft)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-sm)",
      }}
    >
      <div className="eyebrow">{label}</div>
      <div
        className="mt-1 tabular-nums flex items-center gap-1.5"
        style={{ color, fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 700, lineHeight: 1.1 }}
      >
        {value}
        {pulse && (
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "var(--color-danger)" }}
          />
        )}
      </div>
    </div>
  );
}
