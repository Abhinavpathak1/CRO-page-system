import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & { name: IconName; size?: number };

export type IconName =
  | "dashboard"
  | "flask"
  | "hospital"
  | "users"
  | "userPlus"
  | "calendar"
  | "shield"
  | "clipboard"
  | "scale"
  | "doc"
  | "eye"
  | "warn"
  | "database"
  | "chart"
  | "history"
  | "bell"
  | "userCog"
  | "settings"
  | "search"
  | "help"
  | "logout"
  | "check"
  | "plus"
  | "download"
  | "chevronLeft"
  | "chevronRight"
  | "chevronDown"
  | "trendUp"
  | "trendDown"
  | "circle"
  | "spark"
  | "lock"
  | "menu"
  | "filter"
  | "external";

export default function Icon({ name, size = 18, ...rest }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...rest,
  };
  switch (name) {
    case "dashboard":
      return (
        <svg {...common}><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>
      );
    case "flask":
      return <svg {...common}><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3"/><path d="M7.5 14h9"/></svg>;
    case "hospital":
      return <svg {...common}><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M12 9v6M9 12h6"/></svg>;
    case "users":
      return <svg {...common}><circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.6"/><path d="M15.5 20c0-2.5 1.5-4.5 4-4.5"/></svg>;
    case "userPlus":
      return <svg {...common}><circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M19 8v6M16 11h6"/></svg>;
    case "calendar":
      return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>;
    case "shield":
      return <svg {...common}><path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/></svg>;
    case "clipboard":
      return <svg {...common}><rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4h6v3H9zM9 12h6M9 16h4"/></svg>;
    case "scale":
      return <svg {...common}><path d="M12 3v18M5 21h14"/><path d="M7 8l-3 6h6l-3-6zM17 8l-3 6h6l-3-6z"/></svg>;
    case "doc":
      return <svg {...common}><path d="M6 3h8l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v5h4M8 13h8M8 17h6"/></svg>;
    case "eye":
      return <svg {...common}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>;
    case "warn":
      return <svg {...common}><path d="M12 3l10 18H2L12 3z"/><path d="M12 10v5M12 18h.01"/></svg>;
    case "database":
      return <svg {...common}><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></svg>;
    case "chart":
      return <svg {...common}><path d="M4 20V4M4 20h16"/><path d="M8 16v-4M12 16V8M16 16v-6"/></svg>;
    case "history":
      return <svg {...common}><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 8v4l3 2"/></svg>;
    case "bell":
      return <svg {...common}><path d="M6 8a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>;
    case "userCog":
      return <svg {...common}><circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6"/><circle cx="17" cy="16" r="2.5"/><path d="M17 12v1.5M17 18.5V20M20.5 14l-1.3.7M14.8 17.3L13.5 18M20.5 18l-1.3-.7M14.8 14.7L13.5 14"/></svg>;
    case "settings":
      return <svg {...common}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>;
    case "search":
      return <svg {...common}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
    case "help":
      return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 1-1 1.7M12 17h.01"/></svg>;
    case "logout":
      return <svg {...common}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></svg>;
    case "check":
      return <svg {...common}><path d="M5 12l5 5L20 7"/></svg>;
    case "plus":
      return <svg {...common}><path d="M12 5v14M5 12h14"/></svg>;
    case "download":
      return <svg {...common}><path d="M12 3v12M6 11l6 6 6-6M4 21h16"/></svg>;
    case "chevronLeft":
      return <svg {...common}><path d="M15 6l-6 6 6 6"/></svg>;
    case "chevronRight":
      return <svg {...common}><path d="M9 6l6 6-6 6"/></svg>;
    case "chevronDown":
      return <svg {...common}><path d="M6 9l6 6 6-6"/></svg>;
    case "trendUp":
      return <svg {...common}><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>;
    case "trendDown":
      return <svg {...common}><path d="M3 7l6 6 4-4 8 8"/><path d="M14 17h7v-7"/></svg>;
    case "circle":
      return <svg {...common}><circle cx="12" cy="12" r="4" fill="currentColor" stroke="none"/></svg>;
    case "spark":
      return <svg {...common}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/></svg>;
    case "lock":
      return <svg {...common}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 1 1 8 0v4"/></svg>;
    case "menu":
      return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
    case "filter":
      return <svg {...common}><path d="M3 5h18l-7 9v6l-4-2v-4L3 5z"/></svg>;
    case "external":
      return <svg {...common}><path d="M14 3h7v7M21 3l-9 9M19 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"/></svg>;
    default:
      return null;
  }
}
