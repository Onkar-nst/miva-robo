import Link from "next/link";
import { Fragment, type ReactNode } from "react";

/* Shared class recipes for patterns repeated across pages. */

// Round icon button; `circHover` lights it up when a parent `group` is hovered.
export const circ = "inline-grid size-[42px] flex-none cursor-pointer place-items-center rounded-full border border-line-2 bg-transparent p-0 text-ink transition-[background-color,border-color,color] duration-400 hover:border-accent hover:bg-accent hover:text-accent-ink [&_svg]:w-[15px] [&_svg]:transition-transform [&_svg]:duration-500 [&_svg]:ease-expo";
export const circHover = "group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink";
// Image box: covers its area and zooms slightly on hover (parallax images move on their own).
export const frame = "relative overflow-hidden bg-panel [&_img]:size-full [&_img]:object-cover [&_img]:transition-transform [&_img]:duration-[1.4s] [&_img]:ease-expo [&:hover_img:not([data-parallax])]:scale-[1.04]";
// Flat cell that brightens and draws an accent rule along its top on hover.
export const panel = "relative bg-bg p-[clamp(26px,2.6vw,40px)] transition-colors duration-500 hover:bg-bg-2 after:absolute after:inset-x-0 after:top-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-800 after:ease-io after:content-[''] hover:after:scale-x-100";
// Hairline grid: 1px gaps over a line-coloured background read as dividers.
export const hairGrid = "grid gap-px border-y border-line bg-line";
// Card grid: 1 → 2 → 3 per row; spans adjust so a row is never left with an empty cell.
export const cardGrid = `${hairGrid} grid-cols-1 min-[640px]:grid-cols-2 min-[1000px]:grid-cols-6`;
export const card = `${panel} flex min-h-[260px] flex-col gap-3 [&_.idx]:mb-auto [&_.idx]:pb-10 [&_p]:text-[15px] [&_p]:text-muted
  min-[640px]:max-[999px]:[&:last-child:nth-child(odd)]:col-span-2 min-[1000px]:col-span-2
  min-[1000px]:[&:nth-child(3n+1):nth-last-child(2)]:col-span-3 min-[1000px]:[&:nth-child(3n+2):last-child]:col-span-3`;
// Previous / next links split across the page width.
export const pager = "grid grid-cols-2 border-t border-line [&>a]:block [&>a]:px-(--gutter) [&>a]:py-[clamp(28px,3.4vw,52px)] [&>a]:transition-colors [&>a]:duration-400 [&>a:hover]:bg-bg-2 [&>*+a]:border-l [&>*+a]:border-line [&>*+a]:text-right [&>*+a_.eyebrow]:justify-end [&_b]:mt-4 [&_b]:block [&_b]:text-[clamp(20px,2.6vw,38px)] [&_b]:font-semibold [&_b]:tracking-[-.035em] [&_b]:transition-colors [&_b]:duration-300 [&>a:hover_b]:text-accent";
export const tag = "absolute left-3 top-3 z-[2] bg-[rgba(12,16,22,.72)] px-[9px] py-[5px] text-[10.5px] font-medium uppercase tracking-[.14em] text-white backdrop-blur-[6px]";
// Full-bleed photo strip with parallax.
export const fullImg = "relative h-[clamp(320px,76vh,860px)] overflow-hidden [&_img]:!inset-x-0 [&_img]:!-inset-y-[10%] [&_img]:!h-[120%] [&_img]:object-cover";

export const ArrowUR = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9" /></svg>
);
export const ArrowR = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

function Anchor({ href, external, className, children, label }: { href: string; external?: boolean; className: string; children: ReactNode; label?: string }) {
  return external
    ? <a href={href} className={className} target="_blank" rel="noopener noreferrer" aria-label={label}>{children}</a>
    : <Link href={href} className={className} aria-label={label}>{children}</Link>;
}

// Flat rectangular button: accent fill, or outlined when ghost. The fill wipes up and the arrow swaps on hover.
export const ctaClass = (ghost?: boolean) =>
  `group/cta relative isolate inline-flex cursor-pointer items-center gap-[18px] overflow-hidden border-0 py-[17px] pl-7 pr-6 text-sm font-medium tracking-[.01em] transition-colors duration-500 ease-expo
   before:absolute before:inset-0 before:-z-10 before:origin-bottom before:scale-y-0 before:bg-ink before:transition-transform before:duration-600 before:ease-io before:content-[''] hover:before:scale-y-100
   ${ghost ? "bg-transparent text-ink shadow-[inset_0_0_0_1px_var(--line-2)] hover:text-accent-ink" : "bg-accent text-accent-ink"}`;
const arrow = "absolute inset-0 w-3.5 transition-transform duration-600 ease-expo";
export const CtaInner = ({ children }: { children: ReactNode }) => (
  <>
    <span className="whitespace-nowrap">{children}</span>
    <span className="relative size-3.5 flex-none overflow-hidden">
      <ArrowUR className={`${arrow} group-hover/cta:translate-x-[120%] group-hover/cta:-translate-y-[120%]`} />
      <ArrowUR className={`${arrow} -translate-x-[120%] translate-y-[120%] group-hover/cta:translate-x-0 group-hover/cta:translate-y-0`} />
    </span>
  </>
);
export function CTA({ href, children, ghost, external, className = "" }: { href: string; children: ReactNode; ghost?: boolean; external?: boolean; className?: string }) {
  return <Anchor href={href} external={external} className={`${ctaClass(ghost)} ${className}`}><CtaInner>{children}</CtaInner></Anchor>;
}

// Underlined text link with a diagonal arrow; the underline redraws on hover.
export const tlink = "group/tl relative inline-flex items-center gap-[22px] pb-2 pt-1 text-sm after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-right after:bg-current after:opacity-60 after:content-[''] hover:after:animate-[underline_.9s_var(--ease-io)] [&_svg]:w-[13px] [&_svg]:transition-transform [&_svg]:duration-500 [&_svg]:ease-expo hover:[&_svg]:translate-x-[3px] hover:[&_svg]:-translate-y-[3px]";
export function TextLink({ href, children, external, className = "" }: { href: string; children: ReactNode; external?: boolean; className?: string }) {
  return <Anchor href={href} external={external} className={`${tlink} ${className}`}><span>{children}</span><ArrowUR /></Anchor>;
}

export function Circle({ href, label, external }: { href: string; label: string; external?: boolean }) {
  return <Anchor href={href} external={external} className={circ} label={label}><ArrowR /></Anchor>;
}

// Headlines reveal word by word (motion rules keyed on [data-lines] in globals.css); the last `accent` words take the brand colour.
export function Lines({ as: Tag = "h2", lines, className = "", accent = 0 }: { as?: "h1" | "h2" | "h3"; lines: string[]; className?: string; accent?: number }) {
  const total = lines.join(" ").split(" ").length;
  let n = 0;
  return (
    <Tag className={className} data-lines>
      {lines.map((l, i) => (
        <span className="block" key={i}>
          {l.split(" ").map((w, j, ws) => {
            const k = n++;
            return (
              <Fragment key={j}>
                <span className={`w -mx-[.08em] -mb-[.14em] inline-block overflow-hidden px-[.08em] pb-[.14em] align-top ${k >= total - accent ? "text-accent" : ""}`} style={{ "--i": k } as React.CSSProperties}>
                  <span className="inline-block">{w}</span>
                </span>
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
    <li className="flex items-start gap-4 border-t border-line py-[18px] last:border-b" data-reveal>
      <svg className="mt-[3px] w-[18px] flex-none text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
      <span>{children}</span>
    </li>
  );
}

export function CTABand({ text, label, href, image = "/media/ai-robotics.jpg" }: { text: string; label: string; href: string; image?: string }) {
  return (
    <section className="relative isolate overflow-hidden border-t border-line bg-bg-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="absolute inset-0 -z-10 size-full object-cover opacity-20 min-[900px]:inset-y-[-8%] min-[900px]:left-[40%] min-[900px]:h-[116%] min-[900px]:w-[60%] min-[900px]:opacity-50 min-[900px]:[mask-image:linear-gradient(90deg,transparent,#000_50%)]" src={image} alt="" loading="lazy" data-parallax="6" />
      <div className="wrap grid items-center gap-9 py-[clamp(80px,9vw,130px)] min-[900px]:grid-cols-[7fr_5fr]">
        <Lines className="h-lg max-w-[16ch]" lines={[text]} accent={3} />
        <div data-reveal><CTA href={href}>{label}</CTA></div>
      </div>
    </section>
  );
}

export function Marquee({ children, reverse, className = "", trackClassName = "" }: { children: ReactNode; reverse?: boolean; className?: string; trackClassName?: string }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className={`flex w-max animate-marquee *:flex-none ${reverse ? "[animation-direction:reverse]" : ""} ${trackClassName}`}>
        {children}
        <div aria-hidden="true" className="flex">{children}</div>
      </div>
    </div>
  );
}

export const pad = (n: number, width: number) => String(n).padStart(width, "0");
