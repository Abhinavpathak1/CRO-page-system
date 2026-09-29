import AlertsPanel from "@/components/dashboard/AlertsPanel";
import Icon from "@/components/Icon";
import Link from "next/link";

export default function Page() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="flex items-center gap-2 text-[12px] text-token-muted mb-2">
        <Link href="/" className="hover:text-token">Dashboard</Link>
        <Icon name="chevronRight" size={11} />
        <span>Notifications</span>
      </div>
      <div className="mb-6">
        <h1
          className="text-token"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 32, lineHeight: 1.15 }}
        >
          Notifications & Alerts
        </h1>
        <p className="text-[14px] text-token-secondary mt-2 leading-relaxed">
          Consolidated action items, alerts and system notifications.
        </p>
      </div>
      <AlertsPanel />
    </div>
  );
}
