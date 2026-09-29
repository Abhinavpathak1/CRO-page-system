import Link from "next/link";
import Icon, { type IconName } from "./Icon";

type Props = {
  title: string;
  crumb: string;
  description: string;
  icon: IconName;
  features: string[];
};

export default function PagePlaceholder({ title, crumb, description, icon, features }: Props) {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="flex items-center gap-2 text-[12px] text-token-muted mb-2">
        <Link href="/" className="hover:text-token">Dashboard</Link>
        <Icon name="chevronRight" size={11} />
        <span>{crumb}</span>
      </div>
      <div className="flex items-start gap-4 mb-8">
        <div
          className="w-12 h-12 flex items-center justify-center"
          style={{
            background: "rgba(122,42,18,0.08)",
            color: "var(--color-primary)",
            border: "1px solid rgba(122,42,18,0.2)",
            borderRadius: "var(--radius-sm)",
          }}
        >
          <Icon name={icon} size={22} />
        </div>
        <div>
          <h1
            className="text-token"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 32, lineHeight: 1.15 }}
          >
            {title}
          </h1>
          <p className="text-[14px] text-token-secondary mt-2 leading-relaxed max-w-2xl">{description}</p>
        </div>
      </div>

      <div className="card p-10">
        <div className="max-w-2xl mx-auto text-center">
          <div
            className="w-16 h-16 mx-auto flex items-center justify-center mb-5"
            style={{
              background: "var(--color-surface-soft)",
              color: "var(--color-primary)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <Icon name={icon} size={28} />
          </div>
          <h2
            className="text-token mb-3"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22 }}
          >
            {title} module
          </h2>
          <p className="text-[14px] text-token-secondary leading-relaxed mb-8 max-w-xl mx-auto">
            This module is part of the CRO CTMS platform and will surface data from the connected
            microservices (Workflow Engine, Compliance Engine, PV Engine, Doc Store, Audit Log).
            Explore the main dashboard for a live portfolio overview.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            {features.map((f) => (
              <div
                key={f}
                className="flex items-start gap-2.5 p-3 text-[13.5px]"
                style={{
                  background: "var(--color-surface-soft)",
                  border: "1px solid var(--color-border)",
                  borderLeft: "3px solid var(--color-secondary)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                <Icon
                  name="check"
                  size={14}
                  className="mt-0.5 shrink-0"
                  style={{ color: "var(--color-success)" }}
                />
                <span className="text-token-secondary">{f}</span>
              </div>
            ))}
          </div>

          <Link
            href="/"
            className="inline-block mt-8 text-[13.5px] font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            ← Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
