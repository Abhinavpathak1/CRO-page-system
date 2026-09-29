import DeviationPanel from "@/components/dashboard/DeviationPanel";
import Icon from "@/components/Icon";
import Link from "next/link";

export default function Page() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="flex items-center gap-2 text-[12px] text-token-muted mb-2">
        <Link href="/" className="hover:text-token">Dashboard</Link>
        <Icon name="chevronRight" size={11} />
        <span>Protocol Deviations</span>
      </div>
      <div className="mb-6">
        <h1
          className="text-token"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 32, lineHeight: 1.15 }}
        >
          Protocol Deviations
        </h1>
        <p className="text-[14px] text-token-secondary mt-2 leading-relaxed">
          Track, classify and remediate deviations across studies and sites.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DeviationPanel />
        <div className="card p-5">
          <h3 className="section-title text-[17px] mb-4">Deviations by Category</h3>
          <div className="space-y-4">
            {[
              { label: "Inclusion / Exclusion", pct: 34, tone: "danger" },
              { label: "Visit window", pct: 22, tone: "warning" },
              { label: "Sample handling", pct: 18, tone: "warning" },
              { label: "IP administration", pct: 14, tone: "primary" },
              { label: "Consent process", pct: 12, tone: "info" },
            ].map((r) => {
              const color =
                r.tone === "danger"
                  ? "var(--color-danger)"
                  : r.tone === "warning"
                  ? "var(--color-warning)"
                  : r.tone === "primary"
                  ? "var(--color-primary)"
                  : "var(--color-info)";
              return (
                <div key={r.label}>
                  <div className="flex justify-between text-[12.5px] mb-1.5">
                    <span className="text-token font-semibold">{r.label}</span>
                    <span className="text-token-muted tabular-nums">{r.pct}%</span>
                  </div>
                  <div className="progress-track">
                    <div className="h-full" style={{ width: `${r.pct}%`, background: color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
