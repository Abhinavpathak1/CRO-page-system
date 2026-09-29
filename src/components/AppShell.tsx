"use client";

import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";
import { useSession } from "@/lib/session";

const PUBLIC_ROUTES = new Set<string>(["/login"]);

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { session, ready } = useSession();
  const isPublic = PUBLIC_ROUTES.has(pathname);

  // Redirect unauthenticated users to /login for protected routes
  useEffect(() => {
    if (!ready) return;
    if (!isPublic && !session) {
      router.replace("/login");
    }
    if (isPublic && session) {
      router.replace("/");
    }
  }, [ready, session, isPublic, router]);

  if (isPublic) {
    return <>{children}</>;
  }

  // While redirecting, avoid flashing chrome
  if (!session) {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center"
        style={{ background: "var(--color-background)", color: "var(--color-text-muted)" }}
      >
        <div className="text-[13px]">Loading secure session…</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "var(--color-background)", color: "var(--color-text)" }}
    >
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <TopHeader />
        <main className="flex-1 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
