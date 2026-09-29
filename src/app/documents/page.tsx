import PagePlaceholder from "@/components/PagePlaceholder";
export default function Page() {
  return (
    <PagePlaceholder
      title="Documents"
      crumb="Documents"
      icon="doc"
      description="eTMF (electronic Trial Master File) — essential documents, versioning and controlled access."
      features={[
        "eTMF Reference Model structure",
        "Version control with audit trail",
        "Study, country, site & subject scopes",
        "e-signatures (21 CFR Part 11)",
        "Bulk import / export",
        "Inspection-ready packages",
      ]}
    />
  );
}
