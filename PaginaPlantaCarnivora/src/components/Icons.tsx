import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...p,
});

export const Leaf = (p: P) => (
  <svg {...base(p)} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M4 20c0-7 4-12 13-13-1 8-5 12-11 12 2-3 4-5 7-7-4 1-7 4-9 8z" />
    <path d="M3 9c0-3 2-5 6-5 0 3-1 5-4 6 1-1 2-2 2-3-2 0-3 1-4 2z" opacity=".7" />
  </svg>
);
export const ArrowRight = (p: P) => (
  <svg {...base(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ArrowLeft = (p: P) => (
  <svg {...base(p)}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
);
export const CircleArrow = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M10.5 8.5 14 12l-3.5 3.5" /></svg>
);
export const Check = (p: P) => (
  <svg {...base(p)}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
);
export const Cart = (p: P) => (
  <svg {...base(p)}><path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.1L21 8H6.2" /><circle cx="9.5" cy="20" r="1" /><circle cx="17.5" cy="20" r="1" /></svg>
);
export const NoSpray = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M5.6 5.6l12.8 12.8M9 9h4v8H9zM11 9V7h3" /></svg>
);
export const Paw = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="14.5" rx="3" ry="2.3" /><circle cx="8.5" cy="10.5" r="1" /><circle cx="11" cy="8.5" r="1" /><circle cx="13.5" cy="8.5" r="1" /><circle cx="15.5" cy="10.5" r="1" /></svg>
);
export const Drop = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M12 6.8s-3.2 3.6-3.2 6a3.2 3.2 0 0 0 6.4 0c0-2.4-3.2-6-3.2-6z" /></svg>
);
export const Truck = (p: P) => (
  <svg {...base(p)}><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.6" /><circle cx="17" cy="17.5" r="1.6" /></svg>
);
export const Shield = (p: P) => (
  <svg {...base(p)}><path d="M12 3 5 6v5c0 4.5 3 8.2 7 10 4-1.8 7-5.5 7-10V6z" /><path d="m9 12 2 2 4-4" /></svg>
);
export const Refresh = (p: P) => (
  <svg {...base(p)}><path d="M20 11a8 8 0 0 0-14.6-4.5L4 8M4 4v4h4M4 13a8 8 0 0 0 14.6 4.5L20 16M20 20v-4h-4" /></svg>
);
export const Headset = (p: P) => (
  <svg {...base(p)}><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="13" width="4" height="6" rx="1.5" /><rect x="17" y="13" width="4" height="6" rx="1.5" /><path d="M19 19c0 1.5-2 2-5 2" /></svg>
);
export const Grid = (p: P) => (
  <svg {...base(p)}><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></svg>
);
export const Phone = (p: P) => (
  <svg {...base(p)}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
);
export const Mail = (p: P) => (
  <svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
);
export const Pin = (p: P) => (
  <svg {...base(p)}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
);
export const Bug = (p: P) => (
  <svg {...base(p)}><rect x="8" y="7" width="8" height="12" rx="4" /><path d="M12 7V5M9.5 4.5 11 6M14.5 4.5 13 6M8 11H4M8 15H4.5M16 11h4M16 15h3.5M12 11v8" /></svg>
);
export const Sparkle = (p: P) => (
  <svg {...base(p)}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" /></svg>
);
export const Sun = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
);
export const Menu = (p: P) => (
  <svg {...base(p)}><path d="M4 7h16M4 12h16M4 17h10" /></svg>
);
export const Social = {
  Instagram: (p: P) => (
    <svg {...base(p)}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r=".6" fill="currentColor" /></svg>
  ),
  Facebook: (p: P) => (
    <svg {...base(p)}><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" /></svg>
  ),
  Pinterest: (p: P) => (
    <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M10.5 20 12 14m0 0c3 1.5 6-1 5.5-4.5C17 6 9 6 7.5 10c-.6 1.6 0 3 1 3.5" /></svg>
  ),
  Youtube: (p: P) => (
    <svg {...base(p)}><rect x="3" y="6" width="18" height="12" rx="4" /><path d="m10.5 9.5 4 2.5-4 2.5z" fill="currentColor" /></svg>
  ),
};
