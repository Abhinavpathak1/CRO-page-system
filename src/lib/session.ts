"use client";

import { useEffect, useState } from "react";
import { DEMO_ACCOUNTS, accountByRole, type DemoAccount } from "./roles";
import type { Role } from "./mockData";

const KEY = "ctms.session";

export type Session = {
  role: Role;
  email: string;
  name: string;
  initials: string;
  organization: string;
  loginAt: string;
};

export function readSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export function writeSession(account: DemoAccount): Session {
  const session: Session = {
    role: account.role,
    email: account.email,
    name: account.name,
    initials: account.initials,
    organization: account.organization,
    loginAt: new Date().toISOString(),
  };
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY, JSON.stringify(session));
  }
  return session;
}

export function clearSession() {
  if (typeof window !== "undefined") localStorage.removeItem(KEY);
}

/** React hook — reactive session that syncs across tabs and updates. */
export function useSession(): { session: Session | null; ready: boolean; refresh: () => void } {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSession(readSession());
    setReady(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setSession(readSession());
    };
    const onCustom = () => setSession(readSession());
    window.addEventListener("storage", onStorage);
    window.addEventListener("ctms:session", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("ctms:session", onCustom);
    };
  }, []);

  return {
    session,
    ready,
    refresh: () => setSession(readSession()),
  };
}

export function notifySessionChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("ctms:session"));
  }
}

/** Set the active role (used by the "Try demo of another role" switcher). */
export function switchToRole(role: Role) {
  const acc = accountByRole(role);
  writeSession(acc);
  notifySessionChange();
}

export const ALL_DEMO_ACCOUNTS = DEMO_ACCOUNTS;
