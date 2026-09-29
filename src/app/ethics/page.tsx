import PagePlaceholder from "@/components/PagePlaceholder";
export default function Page() {
  return (
    <PagePlaceholder
      title="Ethics Committee"
      crumb="Ethics Committee"
      icon="scale"
      description="Independent Ethics Committee (IEC/IRB) submissions, approvals and renewals."
      features={[
        "IEC/IRB submission tracker",
        "Initial approvals & renewals",
        "Amendment approvals",
        "Serious deviation reports to EC",
        "Meeting minutes archive",
        "Composition compliance",
      ]}
    />
  );
}
