import Icon from "../Icon";

export default function RegulatoryPanel() {
  const items = [
    { label: "CTRI Registration", current: 24, total: 24 },
    { label: "Ethics Approval", current: 23, total: 24 },
    { label: "Essential Documents", pct: 94 },
    { label: "Amendments Pending", current: 3, warn: true },
    { label: "Regulatory Deadlines", current: 2, warn: true, suffix: "upcoming" },
  ];

  const overall = 94;

  return (
    <div className="card p-5">
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 flex items-center justify-center"
          style={{
            background: "var(--color-info-soft)",
            color: "var(--color-info)",
            border: "1px solid rgba(49,90,120,0.2)",
            borderRadius: "var(--radius-sm)",
          }}
        >
          <Icon name="clipboard" size={18} />
        </div>
        <div className="flex-1">
          <h3 className="section-title text-[17px]">Regulatory & Compliance</h3>
          <p className="text-[12.5px] text-token-muted mt-0.5">Study-level compliance snapshot</p>
        </div>
      </div>

      {/* Overall ring */}
      <div
        className="flex items-center gap-4 mb-5 p-4"
        style={{
          background: "var(--color-surface-soft)",
          border: "1px solid var(--color-border)",
          borderLeft: "4px solid var(--color-secondary)",
          borderRadius: "var(--radius-sm)",
        }}
      >
        <div className="relative w-16 h-16 shrink-0">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            <circle cx="18" cy="18" r="15" fill="none" stroke="var(--color-border-strong)" strokeWidth="3" />
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke="var(--color-secondary)"
              strokeWidth="3"
              strokeDasharray={`${(overall / 100) * 94} 94`}
              strokeLinecap="round"
            />
          </svg>
          <div
            className="absolute inset-0 flex items-center justify-center text-[14px]"
            style={{ color: "var(--color-secondary)", fontFamily: "var(--font-heading)", fontWeight: 700 }}
          >
            {overall}%
          </div>
        </div>
        <div className="text-[12.5px]">
          <div
            className="text-token"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14 }}
          >
            Overall Compliance Score
          </div>
          <div className="text-token-secondary mt-1 leading-relaxed">
            Portfolio meets ICH-GCP · CDSCO · Schedule Y standards.
          </div>
        </div>
      </div>

      <ul>
        {items.map((it) => (
          <li
            key={it.label}
            className="flex items-center justify-between py-2.5 text-[13.5px]"
            style={{ borderBottom: "1px solid var(--color-border)" }}
          >
            <div className="flex items-center gap-2">
              {it.warn ? (
                <Icon name="warn" size={14} style={{ color: "var(--color-warning)" }} />
              ) : (
                <Icon name="check" size={14} style={{ color: "var(--color-success)" }} />
              )}
              <span className="text-token">{it.label}</span>
            </div>
            <div className="font-semibold text-[13px]">
              {it.pct !== undefined ? (
                <span style={{ color: "var(--color-info)" }}>{it.pct}%</span>
              ) : it.total ? (
                <span style={{ color: it.current === it.total ? "var(--color-success)" : "#7A5A1A" }}>
                  {it.current} / {it.total}
                </span>
              ) : (
                <span style={{ color: "#7A5A1A" }}>{it.current} {it.suffix}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
