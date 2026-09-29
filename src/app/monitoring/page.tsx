import PagePlaceholder from "@/components/PagePlaceholder";
export default function Page() {
  return (
    <PagePlaceholder
      title="Monitoring"
      crumb="Monitoring"
      icon="eye"
      description="Risk-based monitoring plan, visit scheduling, SDV and follow-up letters."
      features={[
        "SIV / IMV / COV visit planning",
        "Source Data Verification (SDV) tracker",
        "Monitoring visit reports",
        "Action items & follow-up letters",
        "Risk-based monitoring KPIs",
        "Central & remote monitoring",
      ]}
    />
  );
}
