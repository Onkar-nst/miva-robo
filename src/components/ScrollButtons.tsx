"use client";

import { useEffect, useState } from "react";
import { ArrowR, circ } from "./ui";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

// Moves a snap scroller by one card (its first child's width plus the gap).
function step(el: HTMLElement, d: number) {
  const card = el.firstElementChild as HTMLElement | null;
  if (!card) return;
  const by = card.offsetWidth + (parseFloat(getComputedStyle(el).columnGap) || 0);
  el.scrollBy({ left: d * by, behavior: reduced() ? "auto" : "smooth" });
}

// Previous / next arrows for a horizontal snap scroller: each press moves one card, and an arrow dims at its end.
// With `autoplay` (ms), the row also advances on its own and loops, pausing while it is off screen, touched, hovered or focused.
export default function ScrollButtons({ target, label, autoplay, className = "" }: { target: string; label: string; autoplay?: number; className?: string }) {
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = document.getElementById(target);
    if (!autoplay || !el || reduced()) return;
    let visible = false, held = false, last = Date.now();
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.5 });
    io.observe(el);
    // Any scroll, by hand or by the arrows, restarts the wait so autoplay never snatches a card from under the reader.
    const moved = () => { last = Date.now(); };
    const hold = () => { held = true; };
    const release = () => { held = false; last = Date.now(); };
    const holdOn = ["touchstart", "pointerenter", "focusin"], holdOff = ["touchend", "touchcancel", "pointerleave", "focusout"];
    el.addEventListener("scroll", moved, { passive: true });
    holdOn.forEach((t) => el.addEventListener(t, hold, { passive: true }));
    holdOff.forEach((t) => el.addEventListener(t, release, { passive: true }));
    const tick = setInterval(() => {
      // Only a row that actually scrolls (phones) plays; on wider screens it is a grid and this stays idle.
      if (!visible || held || document.hidden || el.scrollWidth <= el.clientWidth + 2) { last = Date.now(); return; }
      if (Date.now() - last < autoplay) return;
      last = Date.now();
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) el.scrollTo({ left: 0, behavior: "smooth" });
      else step(el, 1);
    }, 250);
    return () => {
      clearInterval(tick);
      io.disconnect();
      el.removeEventListener("scroll", moved);
      holdOn.forEach((t) => el.removeEventListener(t, hold));
      holdOff.forEach((t) => el.removeEventListener(t, release));
    };
  }, [target, autoplay]);

  useEffect(() => {
    const el = document.getElementById(target);
    if (!el) return;
    const read = () => setEdge({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
    read();
    el.addEventListener("scroll", read, { passive: true });
    addEventListener("resize", read);
    return () => { el.removeEventListener("scroll", read); removeEventListener("resize", read); };
  }, [target]);

  const go = (d: number) => {
    const el = document.getElementById(target);
    if (el) step(el, d);
  };

  const btn = `${circ} disabled:pointer-events-none disabled:opacity-35`;
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <button type="button" className={`${btn} [&_svg]:rotate-180`} onClick={() => go(-1)} disabled={edge.start} aria-controls={target} aria-label={`Previous ${label}`}><ArrowR /></button>
      <button type="button" className={btn} onClick={() => go(1)} disabled={edge.end} aria-controls={target} aria-label={`Next ${label}`}><ArrowR /></button>
    </div>
  );
}
