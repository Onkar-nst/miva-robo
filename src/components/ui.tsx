import Link from "next/link";
import type { ReactNode } from "react";

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M3 12h17M14 6l6 6-6 6" /></svg>
);

export function CTA({ href, children, ghost, external, className = "" }: { href: string; children: ReactNode; ghost?: boolean; external?: boolean; className?: string }) {
  const inner = (
    <>
      <span className="cta-label">{children}</span>
      <span className="cta-arrow"><Arrow /></span>
    </>
  );
  const cls = `cta ${ghost ? "ghost" : ""} ${className}`;
  return external ? (
    <a href={href} className={cls} data-magnetic target="_blank" rel="noopener noreferrer">{inner}</a>
  ) : (
    <Link href={href} className={cls} data-magnetic>{inner}</Link>
  );
}

export function Lines({ as: Tag = "h2", lines, className = "" }: { as?: "h1" | "h2" | "h3"; lines: string[]; className?: string }) {
  return (
    <Tag className={`lines ${className}`} data-lines>
      {lines.map((l, i) => (
        <span className="ln" key={i} style={{ "--i": i } as React.CSSProperties}>
          <span>{l}{i < lines.length - 1 ? " " : ""}</span>
        </span>
      ))}
    </Tag>
  );
}

export function Check({ children }: { children: ReactNode }) {
  return (
    <li className="check" data-reveal>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M12 2l10 10-10 10L2 12z" /><path d="M8 12l3 3 5-6" /></svg>
      <span>{children}</span>
    </li>
  );
}

export function CTABand({ text, label, href }: { text: string; label: string; href: string }) {
  return (
    <section className="cta-band">
      <span className="ring" /><span className="ring" /><span className="ring" />
      <div className="wrap inner">
        <h2 className="h-lg metal" data-reveal>{text}</h2>
        <div data-reveal><CTA href={href}>{label}</CTA></div>
      </div>
    </section>
  );
}

export function Marquee({ children }: { children: ReactNode }) {
  return (
    <div className="marquee">
      <div className="marquee-track">
        {children}
        <div aria-hidden="true" style={{ display: "flex" }}>{children}</div>
      </div>
    </div>
  );
}

export const pad = (n: number, width: number) => String(n).padStart(width, "0");
