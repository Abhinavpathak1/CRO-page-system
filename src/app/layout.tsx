import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Merriweather, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-heading",
  display: "swap",
});

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CRO Clinical Trial Management System",
  description:
    "Enterprise CTMS dashboard for Contract Research Organizations — trials, sites, enrollment, pharmacovigilance, regulatory and audit trail.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${merriweather.variable} ${sourceSans3.variable}`}>
      <body
        className="antialiased"
        style={{ background: "var(--color-background)", color: "var(--color-text)" }}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}