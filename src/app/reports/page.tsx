import PagePlaceholder from "@/components/PagePlaceholder";
export default function Page() {
  return (
    <PagePlaceholder
      title="Reports & Analytics"
      crumb="Reports & Analytics"
      icon="chart"
      description="Executive dashboards, sponsor reports and custom analytics across the portfolio."
      features={[
        "Executive scorecard",
        "Sponsor & study-level reports",
        "Custom report builder",
        "Scheduled distribution",
        "Data warehouse exports",
        "Interactive drill-down charts",
      ]}
    />
  );
}
