"use client";

import { useEffect, useState } from "react";
import { home } from "@/content/pages";
import { ArrowR, circ, Lines, pad } from "./ui";

const HOLD = 8000;

// One large quote at a time; the client tabs below double as navigation and an autoplay timer.
export default function Testimonials() {
  const list = home.testimonials;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (d: number) => setI((n) => (n + d + list.length) % list.length);

  useEffect(() => {
    if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => go(1), HOLD);
    return () => clearTimeout(t);
  });

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="eyebrow" />
          <Lines className="h-md" lines={["Testimonials"]} />
        </div>
        <div className="flex items-center gap-2.5">
          <span className="mr-3.5 whitespace-nowrap text-[13px] tabular-nums text-muted">
            <b className="text-[22px] font-semibold tracking-[-.02em] text-ink">{pad(i + 1, 2)}</b> / {pad(list.length, 2)}
          </span>
          <button className={`${circ} [&_svg]:rotate-180`} onClick={() => go(-1)} aria-label="Previous testimonial"><ArrowR /></button>
          <button className={circ} onClick={() => go(1)} aria-label="Next testimonial"><ArrowR /></button>
        </div>
      </div>

      <div className="mb-[clamp(48px,5vw,72px)] mt-[clamp(48px,6vw,88px)] grid" aria-live="polite">
        {list.map((x, n) => (
          <blockquote key={x.name} aria-hidden={n !== i}
            className={`relative [grid-area:1/1] ${n === i
              ? "visible translate-y-0 opacity-100 transition-[opacity,transform,visibility] delay-100 duration-[.9s,1s,0s] ease-expo"
              : "invisible translate-y-4 opacity-0 transition-[opacity,transform,visibility] duration-[.7s,.9s,0s] ease-expo [transition-delay:0s,0s,.7s]"}`}>
            <span className="mb-[18px] block h-[.42em] font-serif text-[clamp(80px,9vw,130px)] font-medium leading-[.5] text-accent" aria-hidden="true">“</span>
            <p className="max-w-[34em] text-pretty text-[clamp(22px,2.3vw,34px)] font-medium leading-[1.38] tracking-[-.025em] text-ink">{x.quote.replace(/^“|”$/g, "")}</p>
          </blockquote>
        ))}
      </div>

      <div className="grid grid-cols-1 border-t border-line min-[900px]:grid-cols-3" role="tablist" aria-label="Testimonials">
        {list.map((x, n) => (
          <button key={x.name} role="tab" aria-selected={n === i} onClick={() => setI(n)}
            className={`relative grid cursor-pointer gap-1.5 border-0 bg-transparent pb-1 pr-6 pt-[26px] text-left transition-opacity duration-400 hover:opacity-100 min-[900px]:[&+&]:pl-6 ${n === i ? "opacity-100" : "opacity-45"}`}>
            <i className="absolute inset-x-0 -top-px h-0.5 overflow-hidden">
              <b key={n === i ? `on-${i}` : "off"} style={{ animationDuration: `${HOLD}ms`, animationPlayState: paused ? "paused" : "running" }}
                className={`block h-full origin-left scale-x-0 bg-accent ${n === i ? "animate-[fill_linear_forwards]" : ""}`} />
            </i>
            <span className="text-[15px] font-semibold leading-[1.4] tracking-[-.01em] text-ink">{x.name}</span>
            <span className="text-[11.5px] font-medium uppercase tracking-[.14em] text-accent">{x.role}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
