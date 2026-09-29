const MAP: Record<string, string> = {
  // trial status
  Active: "pill-success",
  Recruiting: "pill-info",
  Paused: "pill-warning",
  Completed: "pill-neutral",
  "At Risk": "pill-danger",
  // safety
  Normal: "pill-success",
  Attention: "pill-warning",
  Critical: "pill-danger",
  // site performance
  Excellent: "pill-success",
  Good: "pill-info",
  "Needs Attention": "pill-warning",
  Operational: "pill-success",
  "Under Review": "pill-warning",
};

export default function StatusBadge({ value }: { value: string }) {
  const cls = MAP[value] ?? "pill-neutral";
  return (
    <span className={`pill ${cls}`} style={{ textTransform: "uppercase", letterSpacing: "0.06em" }}>
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: "currentColor", opacity: 0.7 }}
      />
      {value}
    </span>
  );
}
