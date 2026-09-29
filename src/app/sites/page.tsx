import SitePerformance from "@/components/dashboard/SitePerformance";
import Icon from "@/components/Icon";
import Link from "next/link";

export default function SitesPage() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="flex items-center gap-2 text-[12px] text-token-muted mb-2">
        <Link href="/" className="hover:text-token">Dashboard</Link>
        <Icon name="chevronRight" size={11} />
        <span>Sites</span>
      </div>
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1
            className="text-token"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 32, lineHeight: 1.15 }}
          >
            Investigator Sites
          </h1>
          <p className="text-[14px] text-token-secondary mt-2 leading-relaxed">
            Site performance, monitoring status and enrollment across the network.
          </p>
        </div>
        <button className="btn btn-primary">
          <Icon name="plus" size={14} /> Add Site
        </button>
      </div>
      <SitePerformance />
    </div>
  );
}
