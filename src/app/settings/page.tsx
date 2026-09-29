import PagePlaceholder from "@/components/PagePlaceholder";
export default function Page() {
  return (
    <PagePlaceholder
      title="System Settings"
      crumb="System Settings"
      icon="settings"
      description="System configuration, integrations, retention policies and validation."
      features={[
        "Organization profile",
        "Integrations (EDC, CTMS, DMS, PV)",
        "Data retention & archival",
        "System validation reports",
        "Password & MFA policy",
        "Localization & time zones",
      ]}
    />
  );
}
