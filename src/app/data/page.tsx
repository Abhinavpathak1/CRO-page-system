import PagePlaceholder from "@/components/PagePlaceholder";
export default function Page() {
  return (
    <PagePlaceholder
      title="Data Management"
      crumb="Data Management"
      icon="database"
      description="eCRF completion, data queries, database lock and integration with EDC systems."
      features={[
        "eCRF completion tracker",
        "Query aging & resolution",
        "SDV progress",
        "Medical coding (MedDRA / WHO-Drug)",
        "Database lock workflow",
        "CDISC SDTM/ADaM outputs",
      ]}
    />
  );
}
