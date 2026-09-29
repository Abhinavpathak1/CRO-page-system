import SafetyPanel from "@/components/dashboard/SafetyPanel";
import Icon from "@/components/Icon";
import Link from "next/link";

export default function SafetyPage() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="flex items-center gap-2 text-[12px] text-token-muted mb-2">
        <Link href="/" className="hover:text-token">Dashboard</Link>
        <Icon name="chevronRight" size={11} />
        <span>Safety / Pharmacovigilance</span>
      </div>
      <div className="mb-6">
        <h1
          className="text-token"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 32, lineHeight: 1.15 }}
        >
          Safety & Pharmacovigilance
        </h1>
        <p className="text-[14px] text-token-secondary mt-2 leading-relaxed max-w-3xl">
          AE/SAE case management, expedited reporting deadlines and safety signals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SafetyPanel />
          <div className="card p-5">
            <h3 className="section-title text-[17px] mb-5">Case Processing Pipeline</h3>
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: "Intake", value: 12, tone: "info" },
                { label: "Triage", value: 8, tone: "primary" },
                { label: "Assessment", value: 15, tone: "warning" },
                { label: "Reported", value: 91, tone: "success" },
              ].map((s) => {
                const color =
                  s.tone === "info"
                    ? "var(--color-info)"
                    : s.tone === "primary"
                    ? "var(--color-primary)"
                    : s.tone === "warning"
                    ? "var(--color-warning)"
                    : "var(--color-success)";
                return (
                  <div
                    key={s.label}
                    className="p-4 text-center"
                    style={{
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-sm)",
                    }}
                  >
                    <div
                      className="w-10 h-10 mx-auto flex items-center justify-center text-white text-[13px] font-bold"
                      style={{
                        background: color,
                        borderRadius: "var(--radius-sm)",
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      {s.value}
                    </div>
                    <div className="text-[12.5px] text-token-secondary mt-2.5 font-semibold">{s.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="card p-5">
            <h3 className="section-title text-[17px] mb-4">Regulatory Reporting</h3>
            <ul>
              {[
                { label: "CDSCO (India)", status: "On track", tone: "success" },
                { label: "US FDA MedWatch", status: "On track", tone: "success" },
                { label: "EMA EudraVigilance", status: "1 pending", tone: "warning" },
                { label: "PMDA Japan", status: "On track", tone: "success" },
              ].map((r) => (
                <li
                  key={r.label}
                  className="flex justify-between py-2.5 text-[13.5px]"
                  style={{ borderBottom: "1px solid var(--color-border)" }}
                >
                  <span className="text-token">{r.label}</span>
                  <span
                    className="font-semibold"
                    style={{
                      color: r.tone === "success" ? "var(--color-success)" : "#7A5A1A",
                    }}
                  >
                    {r.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
