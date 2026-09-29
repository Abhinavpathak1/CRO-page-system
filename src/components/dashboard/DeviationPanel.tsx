import Icon from "../Icon";
import { deviationTrend } from "@/lib/mockData";

export default function DeviationPanel() {
  const max = Math.max(...deviationTrend.map((d) => d.value));
  return (
    <div className="card p-5">
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 flex items-center justify-center"
          style={{
            background: "var(--color-warning-soft)",
            color: "#7A5A1A",
            border: "1px solid rgba(184,134,46,0.3)",
            borderRadius: "var(--radius-sm)",
          }}
        >
          <Icon name="warn" size={18} />
        </div>
        <div className="flex-1">
          <h3 className="section-title text-[17px]">Protocol Deviations</h3>
          <p className="text-[12.5px] text-token-muted mt-0.5">Last 6 months</p>
        </div>
        <span
          className="tabular-nums"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 28, color: "var(--color-text)" }}
        >
          37
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-5">
        <Sev label="Critical" value={5} tone="danger" />
        <Sev label="Major" value={12} tone="warning" />
        <Sev label="Minor" value={20} tone="neutral" />
      </div>

      {/* Sparkline */}
      <div className="flex items-end gap-1.5 h-20 mb-1">
        {deviationTrend.map((d) => (
          <div key={d.month} className="flex-1 group">
            <div
              className="w-full transition-colors"
              style={{
                background: "var(--color-primary)",
                opacity: 0.85,
                height: `${(d.value / max) * 100}%`,
                borderRadius: "var(--radius-sm) var(--radius-sm) 0 0",
              }}
              title={`${d.month}: ${d.value}`}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-1.5 text-[11px] text-token-muted">
        {deviationTrend.map((d) => (
          <div key={d.month} className="flex-1 text-center">{d.month}</div>
        ))}
      </div>

      <button className="btn btn-secondary btn-sm w-full mt-5">View all deviations</button>
    </div>
  );
}

function Sev({ label, value, tone }: { label: string; value: number; tone: "danger" | "warning" | "neutral" }) {
  const styles =
    tone === "danger"
      ? { bg: "var(--color-danger-soft)", color: "var(--color-danger)", dot: "var(--color-danger)" }
      : tone === "warning"
      ? { bg: "var(--color-warning-soft)", color: "#7A5A1A", dot: "var(--color-warning)" }
      : { bg: "var(--color-surface-soft)", color: "var(--color-text-secondary)", dot: "var(--color-text-muted)" };
  return (
    <div
      className="p-2.5"
      style={{
        background: styles.bg,
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-sm)",
      }}
    >
      <div className="flex items-center gap-1.5 eyebrow" style={{ color: styles.color }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: styles.dot }} /> {label}
      </div>
      <div
        className="mt-1 tabular-nums"
        style={{
          color: styles.color,
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          fontSize: 20,
          lineHeight: 1,
        }}
      >
        {value}
      </div>
    </div>
  );
}
