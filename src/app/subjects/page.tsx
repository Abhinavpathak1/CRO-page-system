import PagePlaceholder from "@/components/PagePlaceholder";
export default function Page() {
  return (
    <PagePlaceholder
      title="Subjects"
      crumb="Subjects"
      icon="users"
      description="De-identified subject registry with consent status, screening, and visit history."
      features={[
        "Subject de-identification (SUBJ-ID mapping vault)",
        "Consent version tracking with e-signatures",
        "Screening → Enrollment funnel",
        "Visit timeline per subject",
        "AE/SAE cases linked to subject",
        "PII segregated per privacy policy",
      ]}
    />
  );
}
