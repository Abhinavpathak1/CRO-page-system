import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "CRO Clinical Trial Management System",
  description:
    "Enterprise CTMS dashboard for Contract Research Organizations — trials, sites, enrollment, pharmacovigilance, regulatory and audit trail.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className="antialiased"
        style={{ background: "var(--color-background)", color: "var(--color-text)" }}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
