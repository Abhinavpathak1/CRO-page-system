import Icon, { type IconName } from "../Icon";

const ACTIONS: { label: string; icon: IconName }[] = [
  { label: "Create Trial", icon: "flask" },
  { label: "Add Site", icon: "hospital" },
  { label: "Register Subject", icon: "userPlus" },
  { label: "Record AE / SAE", icon: "shield" },
  { label: "Upload Document", icon: "doc" },
  { label: "Create Amendment", icon: "clipboard" },
  { label: "Schedule Visit", icon: "calendar" },
  { label: "Generate Report", icon: "chart" },
];

export default function QuickActions() {
  return (
    <div className="card p-5">
      <h3 className="section-title text-[17px] mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-2">
        {ACTIONS.map((a) => (
          <button
            key={a.label}
            className="flex items-center gap-3 py-3 px-3 transition-colors text-left"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-sm)",
              color: "var(--color-text)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-surface-soft)";
              e.currentTarget.style.borderColor = "var(--color-primary)";
              e.currentTarget.style.color = "var(--color-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--color-surface)";
              e.currentTarget.style.borderColor = "var(--color-border)";
              e.currentTarget.style.color = "var(--color-text)";
            }}
          >
            <Icon name={a.icon} size={17} className="shrink-0" />
            <span className="text-[12.5px] font-semibold">{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
