"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { ALL_DEMO_ACCOUNTS, notifySessionChange, writeSession } from "@/lib/session";
import { DEMO_PASSWORD, accountByEmail, type DemoAccount } from "@/lib/roles";

type Mode = "mock" | "empty";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("mock");
  const [selected, setSelected] = useState<DemoAccount>(
    ALL_DEMO_ACCOUNTS.find((a) => a.role === "Clinical Trial Manager") ?? ALL_DEMO_ACCOUNTS[0]
  );
  const [email, setEmail] = useState(selected.email);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<string | null>(null); // holds email being submitted
  const [personasOpen, setPersonasOpen] = useState(true);

  useEffect(() => {
    const acc = accountByEmail(email);
    if (acc) setSelected(acc);
  }, [email]);

  const doLogin = (acc: DemoAccount) => {
    setError(null);
    setSubmitting(acc.email);
    setTimeout(() => {
      writeSession(acc);
      notifySessionChange();
      router.push("/");
    }, 250);
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const acc = accountByEmail(email);
    if (!acc || password !== acc.password) {
      setError("Invalid credentials. Use a demo persona on the right to autofill.");
      return;
    }
    doLogin(acc);
  };

  const launchSelected = () => doLogin(selected);

  return (
    <div
      className="min-h-screen w-full"
      style={{ background: "var(--color-background)", color: "var(--color-text)" }}
    >
      {/* ============ TOP BRAND STRIP ============ */}
      <header
        style={{
          background: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8 py-4 flex items-center gap-4 flex-wrap">
          {/* Logo mark */}
          <div
            className="w-11 h-11 flex items-center justify-center shrink-0"
            style={{
              background: "var(--color-primary)",
              color: "#FFFFFF",
              borderRadius: "var(--radius-sm)",
              fontFamily: "var(--font-heading)",
              fontWeight: 900,
              fontSize: 22,
            }}
            aria-label="Logo"
          >
            C
          </div>

          {/* Titles */}
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="eyebrow"
                style={{ color: "var(--color-primary)", letterSpacing: "0.14em" }}
              >
                ABC CLINICAL RESEARCH
              </span>
              <span
                className="text-[12px]"
                style={{ color: "var(--color-text-muted)" }}
              >
                · Contract Research Organization
              </span>
            </div>
            <div
              className="text-token mt-1 leading-tight"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 900,
                fontSize: 19,
              }}
            >
              CRO CTMS — Clinical Trial Management System
            </div>
          </div>

          {/* Site badge */}
          <div
            className="ml-auto flex items-center gap-2 px-3 py-2"
            style={{
              background: "var(--color-surface-soft)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <Icon name="hospital" size={15} style={{ color: "var(--color-primary)" }} />
            <span className="text-[13px] font-semibold text-token">
              Site 001 · New Delhi Main Campus
            </span>
          </div>
        </div>
      </header>

      {/* ============ MAIN CONTENT ============ */}
      <main className="max-w-[1200px] mx-auto px-5 lg:px-8 py-8">
        {/* Mode toggle */}
        <div className="flex justify-center mb-5">
          <div
            className="inline-flex p-1"
            style={{
              background: "var(--color-surface-soft)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-sm)",
            }}
            role="tablist"
            aria-label="Environment mode"
          >
            <button
              role="tab"
              aria-selected={mode === "mock"}
              onClick={() => setMode("mock")}
              className="inline-flex items-center gap-2 px-5 h-9 text-[13.5px] font-semibold transition-colors"
              style={{
                background: mode === "mock" ? "var(--color-primary)" : "transparent",
                color: mode === "mock" ? "#FFFFFF" : "var(--color-text-secondary)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              <Icon name="database" size={14} /> Mock
            </button>
            <button
              role="tab"
              aria-selected={mode === "empty"}
              onClick={() => setMode("empty")}
              className="inline-flex items-center gap-2 px-5 h-9 text-[13.5px] font-semibold transition-colors"
              style={{
                background: mode === "empty" ? "var(--color-primary)" : "transparent",
                color: mode === "empty" ? "#FFFFFF" : "var(--color-text-secondary)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              <Icon name="flask" size={14} /> Empty Test
            </button>
          </div>
        </div>

        {/* Mode banner */}
        <div
          className="flex items-start gap-2.5 p-3.5 mb-6"
          style={{
            background:
              mode === "mock"
                ? "rgba(184,134,46,0.12)"
                : "var(--color-info-soft)",
            border: `1px solid ${
              mode === "mock" ? "rgba(184,134,46,0.35)" : "rgba(49,90,120,0.25)"
            }`,
            borderRadius: "var(--radius-sm)",
          }}
        >
          <Icon
            name="help"
            size={16}
            className="mt-0.5 shrink-0"
            style={{ color: mode === "mock" ? "#7A5A1A" : "var(--color-info)" }}
          />
          <div
            className="text-[13px] leading-relaxed"
            style={{
              color: mode === "mock" ? "#7A5A1A" : "var(--color-info)",
            }}
          >
            {mode === "mock" ? (
              <>
                <strong>Mock Mode</strong> — Pre-populated synthetic demonstration environment with
                existing studies, sites, subjects, visits, safety events, tasks and documents. Use
                for regression testing or workflow demonstrations.
              </>
            ) : (
              <>
                <strong>Empty Test Mode</strong> — Clean sandbox environment with no pre-loaded
                data. Use to walk through onboarding, first-time study setup, or blank-slate QA
                validation.
              </>
            )}
          </div>
        </div>

        {/* Two-column grid: Sign-in card + Personas */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6">
          {/* ---------- LEFT: SIGN IN CARD ---------- */}
          <section className="card p-6 lg:p-7">
            <span
              className="pill pill-success inline-flex"
              style={{
                background: "var(--color-success-soft)",
                color: "var(--color-success)",
                borderColor: "rgba(31,92,63,0.3)",
              }}
            >
              <Icon name="shield" size={11} /> AUTHORIZED CLINICAL ACCESS · {mode === "mock" ? "MOCK" : "EMPTY"}
            </span>

            <h1
              className="text-token mt-4"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 900,
                fontSize: 30,
                lineHeight: 1.15,
              }}
            >
              Institutional Sign In
            </h1>
            <p className="text-[13.5px] text-token-secondary mt-2 leading-relaxed max-w-md">
              Access your designated clinical trial oversight, protocol compliance, and subject
              data portal.
            </p>

            {/* Instant Demo Evaluation */}
            <div
              className="mt-5 p-4 flex items-center gap-3 flex-wrap"
              style={{
                background: "var(--color-surface-soft)",
                border: "1px solid var(--color-border)",
                borderLeft: "3px solid var(--color-accent)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <Icon name="spark" size={14} style={{ color: "var(--color-accent)" }} />
                  <span
                    className="text-token"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14 }}
                  >
                    Instant Demo Evaluation
                  </span>
                </div>
                <p className="text-[12.5px] text-token-secondary mt-1 leading-snug">
                  Launch the <strong>{selected.role}</strong> dashboard directly with 1 click.
                </p>
              </div>
              <button
                type="button"
                onClick={launchSelected}
                disabled={submitting !== null}
                className="btn btn-primary shrink-0"
                style={{ height: 40 }}
              >
                {submitting === selected.email
                  ? "Launching…"
                  : `Launch ${abbrRole(selected.role)} Dashboard →`}
              </button>
            </div>

            {/* Manual form */}
            <form onSubmit={submitForm} className="mt-6 space-y-4" noValidate>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="eyebrow" style={{ color: "var(--color-text-secondary)" }}>
                    Institutional Email / Username
                  </label>
                </div>
                <div className="relative">
                  <Icon
                    name="users"
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: "var(--color-text-muted)" }}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    className="input"
                    style={{ paddingLeft: 34, height: 42 }}
                    placeholder="you@organization.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="eyebrow" style={{ color: "var(--color-text-secondary)" }}>
                    Security Passcode
                  </label>
                  <span
                    className="text-[11px] font-semibold"
                    style={{ color: "var(--color-secondary)" }}
                  >
                    GCP Delegation Protected
                  </span>
                </div>
                <div className="relative">
                  <Icon
                    name="lock"
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: "var(--color-text-muted)" }}
                  />
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="input"
                    style={{ paddingLeft: 34, paddingRight: 40, height: 42 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    aria-label="Toggle passcode visibility"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center"
                    style={{ color: "var(--color-text-muted)", borderRadius: "var(--radius-sm)" }}
                  >
                    <Icon name="eye" size={14} />
                  </button>
                </div>
              </div>

              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-2 p-3 text-[12.5px]"
                  style={{
                    background: "var(--color-danger-soft)",
                    borderLeft: "3px solid var(--color-danger)",
                    color: "var(--color-danger)",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  <Icon name="warn" size={14} className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting !== null}
                className="btn btn-primary w-full"
                style={{ height: 46, fontSize: 14 }}
              >
                {submitting !== null ? "Verifying credentials…" : "Sign In to Institutional Portal"}
                {submitting === null && <Icon name="chevronRight" size={14} />}
              </button>

              <div
                className="flex items-center gap-2 text-[11.5px] pt-2"
                style={{
                  color: "var(--color-text-muted)",
                  borderTop: "1px solid var(--color-border)",
                  paddingTop: 12,
                }}
              >
                <Icon name="lock" size={12} style={{ color: "var(--color-success)" }} />
                <span>
                  Session encrypted end-to-end · 21 CFR Part 11 · ALCOA+ · ICH-GCP compliant
                </span>
              </div>
            </form>
          </section>

          {/* ---------- RIGHT: DEMO PERSONAS ---------- */}
          <section className="card p-6 lg:p-7 h-fit">
            <button
              onClick={() => setPersonasOpen((v) => !v)}
              className="w-full flex items-center gap-2.5 text-left"
              aria-expanded={personasOpen}
            >
              <Icon name="userCog" size={19} style={{ color: "var(--color-primary)" }} />
              <div
                className="text-token flex-1"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20 }}
              >
                Demo Evaluation Personas
              </div>
              <Icon
                name="chevronDown"
                size={16}
                style={{
                  color: "var(--color-text-muted)",
                  transform: personasOpen ? "rotate(180deg)" : "none",
                  transition: "transform 150ms ease",
                }}
              />
            </button>

            <p className="text-[13px] text-token-secondary mt-3 leading-relaxed">
              Select any clinical persona below to automatically load credentials for role-based
              portal testing:
            </p>

            {personasOpen && (
              <div className="mt-4 space-y-2.5 pr-1" style={{ maxHeight: 640, overflowY: "auto" }}>
                {ALL_DEMO_ACCOUNTS.map((a) => {
                  const active = a.email === selected.email;
                  const isSubmitting = submitting === a.email;
                  return (
                    <div
                      key={a.email}
                      onClick={() => {
                        setSelected(a);
                        setEmail(a.email);
                        setPassword(a.password);
                      }}
                      className="p-3 flex items-center gap-3 transition-colors cursor-pointer"
                      style={{
                        background: "var(--color-surface)",
                        border: `1px solid ${active ? "var(--color-primary)" : "var(--color-border)"}`,
                        borderRadius: "var(--radius-sm)",
                        boxShadow: active ? "0 0 0 1px var(--color-primary) inset" : "none",
                      }}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className="text-token"
                            style={{
                              fontFamily: "var(--font-heading)",
                              fontWeight: 700,
                              fontSize: 14,
                              color: active ? "var(--color-primary)" : "var(--color-text)",
                            }}
                          >
                            {a.role}
                          </span>
                          {active && (
                            <span
                              className="inline-flex items-center justify-center w-4 h-4"
                              style={{
                                background: "var(--color-primary)",
                                color: "#FFF",
                                borderRadius: "var(--radius-pill)",
                              }}
                              title="Selected"
                            >
                              <Icon name="check" size={10} />
                            </span>
                          )}
                        </div>
                        <div className="text-[12.5px] text-token-secondary mt-0.5 truncate">
                          {a.name}
                        </div>
                        <div className="text-[11.5px] font-mono text-token-muted mt-0.5 truncate">
                          {a.email}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelected(a);
                          setEmail(a.email);
                          setPassword(a.password);
                          doLogin(a);
                        }}
                        disabled={submitting !== null}
                        className="btn btn-primary shrink-0"
                        style={{ height: 36, minWidth: 92 }}
                      >
                        {isSubmitting ? "Signing…" : "Sign In →"}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        {/* Footer note */}
        <div
          className="mt-8 pt-5 text-[11.5px] text-token-muted flex flex-wrap items-center justify-between gap-3"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <div>© 2026 ABC Clinical Research · Contract Research Organization</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-token">Privacy</a>
            <a href="#" className="hover:text-token">Terms of Use</a>
            <a href="#" className="hover:text-token">Data Residency</a>
            <a href="#" className="hover:text-token">Support</a>
          </div>
        </div>
      </main>
    </div>
  );
}

function abbrRole(role: string): string {
  const map: Record<string, string> = {
    "Clinical Trial Manager": "CTM",
    "Principal Investigator": "PI",
    "Study Coordinator": "SC",
    "Project Manager": "PM",
    "PV Team": "PV",
    Executive: "Executive",
    Regulatory: "Regulatory",
    CRA: "CRA",
    QA: "QA",
    Sponsor: "Sponsor",
    Regulator: "Regulator",
  };
  return map[role] ?? role;
}
