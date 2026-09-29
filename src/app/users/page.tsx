import PagePlaceholder from "@/components/PagePlaceholder";
export default function Page() {
  return (
    <PagePlaceholder
      title="User Management"
      crumb="User Management"
      icon="userCog"
      description="Manage users, roles, permissions and study/site-level access."
      features={[
        "Role definitions (RBAC / ABAC)",
        "Study & site-scoped access",
        "MFA enforcement",
        "Delegation of authority log",
        "SSO / SAML / OIDC",
        "Provisioning workflows",
      ]}
    />
  );
}
