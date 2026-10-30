"use client";

import { useEffect, useState } from "react";
import { home } from "@/content/pages";
import { ArrowR, Lines, pad } from "./ui";

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
    <div className="tst" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="tst-top">
        <div>
          <span className="eyebrow" />
          <Lines className="h-md" lines={["Testimonials"]} />
        </div>
        <div className="tst-nav">
          <span className="tst-count"><b>{pad(i + 1, 2)}</b> / {pad(list.length, 2)}</span>
          <button className="circ prev" onClick={() => go(-1)} aria-label="Previous testimonial"><ArrowR /></button>
          <button className="circ" onClick={() => go(1)} aria-label="Next testimonial"><ArrowR /></button>
        </div>
      </div>

      <div className="tst-stage" aria-live="polite">
        {list.map((x, n) => (
          <blockquote className={`tst-q ${n === i ? "on" : ""}`} key={x.name} aria-hidden={n !== i}>
            <span className="qmark" aria-hidden="true">“</span>
            <p>{x.quote.replace(/^“|”$/g, "")}</p>
          </blockquote>
        ))}
      </div>

      <div className="tst-tabs" role="tablist" aria-label="Testimonials">
        {list.map((x, n) => (
          <button key={x.name} role="tab" aria-selected={n === i} className={`tst-tab ${n === i ? "on" : ""} ${paused ? "paused" : ""}`} style={{ "--hold": `${HOLD}ms` } as React.CSSProperties} onClick={() => setI(n)}>
            <i className="tst-bar"><b key={n === i ? `on-${i}` : "off"} /></i>
            <span className="tst-name">{x.name}</span>
            <span className="tst-role">{x.role}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
