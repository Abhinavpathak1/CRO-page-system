import Icon from "../Icon";
import { alerts } from "@/lib/mockData";

const priorityStyle: Record<string, { dot: string; label: string; pill: string; border: string }> = {
  critical: {
    dot: "var(--color-danger)",
    label: "Critical",
    pill: "pill-danger",
    border: "var(--color-danger)",
  },
  high: {
    dot: "var(--color-warning)",
    label: "High",
    pill: "pill-warning",
    border: "var(--color-warning)",
  },
  medium: {
    dot: "var(--color-info)",
    label: "Medium",
    pill: "pill-info",
    border: "var(--color-info)",
  },
};

export default function AlertsPanel() {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 flex items-center justify-center"
          style={{
            background: "var(--color-danger-soft)",
            color: "var(--color-danger)",
            border: "1px solid rgba(155,44,44,0.2)",
            borderRadius: "var(--radius-sm)",
          }}
        >
          <Icon name="warn" size={18} />
        </div>
        <div className="flex-1">
          <h3 className="section-title text-[17px]">Action Required</h3>
          <p className="text-[12.5px] text-token-muted mt-0.5">
            Prioritized tasks needing attention
          </p>
        </div>
        <span className="pill pill-danger">{alerts.length} open</span>
      </div>

      <div className="space-y-2">
        {alerts.map((a) => {
          const p = priorityStyle[a.priority];
          return (
            <div
              key={a.id}
              className="flex items-center gap-3 p-3 transition-colors"
              style={{
                background: "var(--color-surface-soft)",
                borderLeft: `3px solid ${p.border}`,
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--color-border)",
                borderLeftWidth: 3,
                borderLeftColor: p.border,
              }}
            >
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: p.dot }}
                aria-hidden
              />
              <div className="flex-1 min-w-0">
                <div
                  className="text-token line-clamp-1"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14 }}
                >
                  {a.title}
                </div>
                <div className="text-[12px] text-token-muted mt-0.5 flex items-center gap-2 flex-wrap">
                  <span className="font-mono font-semibold text-primary-token">{a.study}</span>
                  <span>·</span>
                  <span>{a.role}</span>
                  <span>·</span>
                  <span className="font-semibold" style={{ color: p.border }}>Due: {a.due}</span>
                </div>
              </div>
              <span className={`pill ${p.pill}`}>{p.label}</span>
              <button className="btn btn-primary btn-xs shrink-0">Resolve</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
