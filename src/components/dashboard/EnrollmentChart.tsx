"use client";

import { useState } from "react";
import { enrollmentSeries } from "@/lib/mockData";

const C = {
  primary: "#7A2A12",
  primaryLight: "rgba(122,42,18,0.18)",
  secondary: "#1F5C3F",
  gold: "#B8862E",
  border: "#E4DED3",
  text: "#5A5347",
  muted: "#726B5C",
};

export default function EnrollmentChart() {
  const [hover, setHover] = useState<number | null>(null);
  const data = enrollmentSeries;
  const W = 640, H = 220, pad = { l: 44, r: 16, t: 20, b: 30 };
  const max = 12000;
  const xStep = (W - pad.l - pad.r) / (data.length - 1);
  const y = (v: number) => H - pad.b - (v / max) * (H - pad.t - pad.b);
  const barW = 16;

  const linePath = (key: "target" | "actual") =>
    data.map((d, i) => `${i === 0 ? "M" : "L"} ${pad.l + i * xStep} ${y(d[key])}`).join(" ");

  const areaPath =
    data.map((d, i) => `${i === 0 ? "M" : "L"} ${pad.l + i * xStep} ${y(d.actual)}`).join(" ") +
    ` L ${pad.l + (data.length - 1) * xStep} ${H - pad.b} L ${pad.l} ${H - pad.b} Z`;

  const target = 11000;
  const current = 8426;
  const pct = (current / target) * 100;

  return (
    <div className="card p-5">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="section-title text-[17px]">Enrollment Analytics</h3>
          <p className="text-[12.5px] text-token-muted mt-0.5">
            Portfolio-wide screening & enrollment trend
          </p>
        </div>
        <div className="flex items-center gap-4 text-[12px] text-token-secondary">
          <Legend color={C.primary} label="Actual" />
          <Legend color={C.muted} label="Target" dashed />
          <Legend color={C.gold} label="Screened" square />
        </div>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <MiniStat label="Target" value={target.toLocaleString()} />
        <MiniStat label="Current" value={current.toLocaleString()} accent="primary" />
        <MiniStat label="Progress" value={`${pct.toFixed(1)}%`} accent="success" />
      </div>

      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-56">
          {/* Gridlines */}
          {[0, 2500, 5000, 7500, 10000, 12000].map((g) => (
            <g key={g}>
              <line x1={pad.l} x2={W - pad.r} y1={y(g)} y2={y(g)} stroke={C.border} strokeDasharray="3 3" />
              <text x={pad.l - 8} y={y(g) + 4} fontSize="10.5" textAnchor="end" fill={C.muted}>
                {g / 1000}k
              </text>
            </g>
          ))}

          {/* Screened bars */}
          {data.map((d, i) => (
            <rect
              key={i}
              x={pad.l + i * xStep - barW / 2}
              y={y(d.screened)}
              width={barW}
              height={H - pad.b - y(d.screened)}
              fill={C.gold}
              opacity={hover === null || hover === i ? 0.28 : 0.15}
            />
          ))}

          {/* Area under actual */}
          <path d={areaPath} fill={C.primaryLight} />

          {/* Target dashed */}
          <path d={linePath("target")} fill="none" stroke={C.muted} strokeWidth="1.4" strokeDasharray="5 4" />
          {/* Actual */}
          <path d={linePath("actual")} fill="none" stroke={C.primary} strokeWidth="2.2" />

          {/* Points + hover */}
          {data.map((d, i) => (
            <g
              key={i}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: "pointer" }}
            >
              <rect x={pad.l + i * xStep - xStep / 2} y={pad.t} width={xStep} height={H - pad.t - pad.b} fill="transparent" />
              <circle cx={pad.l + i * xStep} cy={y(d.actual)} r={hover === i ? 5 : 3.5} fill="#FFF" stroke={C.primary} strokeWidth="2" />
              <text x={pad.l + i * xStep} y={H - pad.b + 16} fontSize="10.5" textAnchor="middle" fill={C.text}>
                {d.month}
              </text>
              {hover === i && (
                <g>
                  <rect x={pad.l + i * xStep - 62} y={y(d.actual) - 62} width="124" height="52" rx="2" fill="#1C1A17" />
                  <text x={pad.l + i * xStep} y={y(d.actual) - 46} fontSize="10" textAnchor="middle" fill="#B8862E" fontWeight="700">{d.month}</text>
                  <text x={pad.l + i * xStep} y={y(d.actual) - 32} fontSize="11" textAnchor="middle" fill="#FFF" fontWeight="600">
                    Actual: {d.actual.toLocaleString()}
                  </text>
                  <text x={pad.l + i * xStep} y={y(d.actual) - 18} fontSize="10" textAnchor="middle" fill="#E4DED3">
                    Target: {d.target.toLocaleString()}
                  </text>
                </g>
              )}
            </g>
          ))}
        </svg>
      </div>

      <div
        className="mt-4 pt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-[12.5px]"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <FooterStat label="Monthly recruitment" value="286 / month" />
        <FooterStat label="Screen-to-enrollment" value="76.7%" />
        <FooterStat label="Avg. per site" value="57 subjects" />
        <FooterStat label="Projected completion" value="Q2 2026" />
      </div>
    </div>
  );
}

function Legend({ color, label, dashed, square }: { color: string; label: string; dashed?: boolean; square?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      {dashed ? (
        <span
          className="w-4"
          style={{ borderTop: `2px dashed ${color}`, height: 0 }}
        />
      ) : (
        <span
          style={{
            width: square ? 10 : 14,
            height: square ? 10 : 3,
            background: color,
            borderRadius: 1,
          }}
        />
      )}
      {label}
    </div>
  );
}

function MiniStat({ label, value, accent }: { label: string; value: string; accent?: "primary" | "success" }) {
  const color =
    accent === "primary" ? "var(--color-primary)" : accent === "success" ? "var(--color-success)" : "var(--color-text)";
  return (
    <div
      className="p-3"
      style={{
        background: "var(--color-surface-soft)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-sm)",
      }}
    >
      <div className="eyebrow">{label}</div>
      <div
        className="mt-1 tabular-nums"
        style={{ color, fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 700, lineHeight: 1.1 }}
      >
        {value}
      </div>
    </div>
  );
}

function FooterStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="eyebrow">{label}</div>
      <div
        className="mt-0.5 text-token"
        style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15 }}
      >
        {value}
      </div>
    </div>
  );
}
