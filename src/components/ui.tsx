import Link from "next/link";
import { Fragment, type ReactNode } from "react";

export const ArrowUR = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9" /></svg>
);
export const ArrowR = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

function Anchor({ href, external, className, children, label }: { href: string; external?: boolean; className: string; children: ReactNode; label?: string }) {
  return external
    ? <a href={href} className={className} target="_blank" rel="noopener noreferrer" aria-label={label}>{children}</a>
    : <Link href={href} className={className} aria-label={label}>{children}</Link>;
}

// Flat rectangular button: accent fill, or outlined when ghost.
export function CTA({ href, children, ghost, external, className = "" }: { href: string; children: ReactNode; ghost?: boolean; external?: boolean; className?: string }) {
  return (
    <Anchor href={href} external={external} className={`cta ${ghost ? "ghost" : ""} ${className}`}>
      <span className="cta-label">{children}</span>
      <span className="cta-arrow"><ArrowUR /><ArrowUR /></span>
    </Anchor>
  );
}

// Underlined text link with a diagonal arrow.
export function TextLink({ href, children, external, className = "" }: { href: string; children: ReactNode; external?: boolean; className?: string }) {
  return <Anchor href={href} external={external} className={`tlink ${className}`}><span>{children}</span><ArrowUR /></Anchor>;
}

export function Circle({ href, label, external }: { href: string; label: string; external?: boolean }) {
  return <Anchor href={href} external={external} className="circ" label={label}><ArrowR /></Anchor>;
}

// Headlines reveal word by word; the last `accent` words take the brand colour.
export function Lines({ as: Tag = "h2", lines, className = "", accent = 0 }: { as?: "h1" | "h2" | "h3"; lines: string[]; className?: string; accent?: number }) {
  const total = lines.join(" ").split(" ").length;
  let n = 0;
  return (
    <Tag className={`lines ${className}`} data-lines>
      {lines.map((l, i) => (
        <span className="ln" key={i}>
          {l.split(" ").map((w, j, ws) => {
            const k = n++;
            return (
              <Fragment key={j}>
                <span className={`w ${k >= total - accent ? "acc" : ""}`} style={{ "--i": k } as React.CSSProperties}><span>{w}</span></span>
                {j < ws.length - 1 || i < lines.length - 1 ? " " : ""}
              </Fragment>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`eyebrow ${className}`}>{children}</span>;
}

export function Check({ children }: { children: ReactNode }) {
  return (
    <li className="check" data-reveal>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
      <span>{children}</span>
    </li>
  );
}

export function CTABand({ text, label, href, image = "/media/ai-robotics.jpg" }: { text: string; label: string; href: string; image?: string }) {
  return (
    <section className="band">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="band-img" src={image} alt="" loading="lazy" data-parallax="6" />
      <div className="wrap band-in">
        <Lines className="h-lg" lines={[text]} accent={3} />
        <div data-reveal><CTA href={href}>{label}</CTA></div>
      </div>
    </section>
  );
}

export function Marquee({ children, reverse, className = "" }: { children: ReactNode; reverse?: boolean; className?: string }) {
  return (
    <div className={`marquee ${reverse ? "rev" : ""} ${className}`}>
      <div className="marquee-track">
        {children}
        <div aria-hidden="true" style={{ display: "flex" }}>{children}</div>
      </div>
    </div>
  );
}

export const pad = (n: number, width: number) => String(n).padStart(width, "0");
