import PagePlaceholder from "@/components/PagePlaceholder";
export default function Page() {
  return (
    <PagePlaceholder
      title="Visits"
      crumb="Visits"
      icon="calendar"
      description="Study visit scheduling, adherence tracking and window compliance."
      features={[
        "Visit calendar per subject",
        "Protocol window compliance",
        "Missed / unscheduled visits",
        "eCRF completion status",
        "Sample collection tracking",
        "Automated visit reminders",
      ]}
    />
  );
}
