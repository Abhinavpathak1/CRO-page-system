import RegulatoryPanel from "@/components/dashboard/RegulatoryPanel";
import Icon from "@/components/Icon";
import Link from "next/link";

export default function Page() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="flex items-center gap-2 text-[12px] text-token-muted mb-2">
        <Link href="/" className="hover:text-token">Dashboard</Link>
        <Icon name="chevronRight" size={11} />
        <span>Regulatory</span>
      </div>
      <div className="mb-6">
        <h1
          className="text-token"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 32, lineHeight: 1.15 }}
        >
          Regulatory Affairs
        </h1>
        <p className="text-[14px] text-token-secondary mt-2 leading-relaxed">
          CTRI, CDSCO, ethics submissions and amendments across the portfolio.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RegulatoryPanel />
        <div className="card p-5">
          <h3 className="section-title text-[17px] mb-4">Upcoming Regulatory Deadlines</h3>
          <ul>
            {[
              { study: "CT-2026-002", item: "DSUR submission", due: "in 12 days", tone: "warning" },
              { study: "CT-2026-004", item: "Ethics amendment renewal", due: "in 5 days", tone: "danger" },
              { study: "CT-2026-001", item: "Annual progress report", due: "in 30 days", tone: "neutral" },
            ].map((r) => (
              <li
                key={r.item}
                className="py-3 flex items-center justify-between"
                style={{ borderBottom: "1px solid var(--color-border)" }}
              >
                <div>
                  <div
                    className="text-token"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14 }}
                  >
                    {r.item}
                  </div>
                  <div className="text-[11.5px] font-mono font-semibold mt-0.5 text-primary-token">
                    {r.study}
                  </div>
                </div>
                <div
                  className="text-[12.5px] font-semibold"
                  style={{
                    color:
                      r.tone === "danger"
                        ? "var(--color-danger)"
                        : r.tone === "warning"
                        ? "#7A5A1A"
                        : "var(--color-text-secondary)",
                  }}
                >
                  Due {r.due}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
