import type { SVGProps } from "react";

export function BrandMark() {
  return (
    <div className="brand-mark" aria-label="Sculptr">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <rect x="3" y="3" width="7" height="7" rx="1.4" transform="rotate(-8 6.5 6.5)" />
        <rect x="12" y="3" width="7" height="7" rx="1.4" />
        <rect x="3" y="11" width="7" height="7" rx="1.4" />
        <rect x="3" y="19" width="5" height="2.5" rx="1" />
      </svg>
    </div>
  );
}

export function Wordmark() {
  return (
    <span className="wordmark">
      Scul<span className="wordmark-pt">pt</span>r
    </span>
  );
}

export const Ico = {
  arrow: (p: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  ),
  sun: (p: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...p}>
      <circle cx="10" cy="10" r="3.5" />
      <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4" />
    </svg>
  ),
  moon: (p: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" {...p}>
      <path d="M16.5 12.5A7 7 0 0 1 7.5 3.5a7 7 0 1 0 9 9z" />
    </svg>
  ),
};
