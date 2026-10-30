"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

// Site-wide motion: smooth scroll, reveals, counters, parallax, magnetic CTAs and pointer effects.
export default function Effects() {
  const path = usePathname();
  const bar = useRef<HTMLDivElement>(null);
  const cross = useRef<HTMLDivElement>(null);
  const [boot, setBoot] = useState(false);
  const [cookie, setCookie] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem("miva-boot")) { sessionStorage.setItem("miva-boot", "1"); setBoot(true); setTimeout(() => setBoot(false), 1700); }
      if (!localStorage.getItem("miva-cookie")) setCookie(true);
    } catch {}
  }, []);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = reduce ? null : new Lenis({ lerp: 0.1 });
    let raf = 0;
    const parallax = [...document.querySelectorAll<HTMLElement>("[data-parallax]")];
    const fills = [...document.querySelectorAll<HTMLElement>(".pipeline")];
    const loop = (t: number) => {
      lenis?.raf(t);
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.current?.style.setProperty("--s", String(h > 0 ? scrollY / h : 0));
      if (!reduce) for (const el of parallax) {
        const r = el.parentElement!.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) continue;
        const k = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        el.style.transform = `translate3d(0, ${k * Number(el.dataset.parallax || 8)}%, 0)`;
      }
      for (const el of fills) {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--p", String(Math.min(1, Math.max(0, (innerHeight * 0.8 - r.top) / r.height))));
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const count = (el: HTMLElement) => {
      const end = Number(el.dataset.count), width = Number(el.dataset.pad || 0), suffix = el.dataset.suffix || "";
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / 1900);
        const v = Math.round(end * (1 - Math.pow(1 - p, 4)));
        el.textContent = String(v).padStart(width, "0") + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((es) => {
      for (const e of es) if (e.isIntersecting) {
        e.target.classList.add("in");
        const c = e.target as HTMLElement;
        if (c.dataset.count && !reduce) count(c);
        io.unobserve(e.target);
      }
    }, { rootMargin: "0px 0px -7% 0px", threshold: 0.05 });
    document.querySelectorAll("[data-reveal],[data-lines],[data-count]").forEach((el) => io.observe(el));

    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const onMove = (e: PointerEvent) => {
      if (cross.current) { cross.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`; cross.current.classList.add("live"); }
      const target = e.target as Element;
      cross.current?.classList.toggle("on", !!target.closest?.("a,button,input,textarea"));
      const panel = target.closest?.<HTMLElement>(".panel");
      if (panel) {
        const r = panel.getBoundingClientRect();
        panel.style.setProperty("--mx", `${e.clientX - r.left}px`);
        panel.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
      const mag = target.closest?.<HTMLElement>("[data-magnetic]");
      if (mag) {
        const r = mag.getBoundingClientRect();
        mag.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.16}px, ${(e.clientY - r.top - r.height / 2) * 0.28}px)`;
      }
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((m) => { if (m !== mag && m.style.transform) { m.style.transition = "transform .6s cubic-bezier(.16,1,.3,1)"; m.style.transform = ""; } });
      if (mag) mag.style.transition = "transform .12s linear";
    };
    if (fine && !reduce) addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      lenis?.destroy();
      removeEventListener("pointermove", onMove);
    };
  }, [path]);

  return (
    <>
      <div className="bar" ref={bar} />
      <div className="crosshair" ref={cross} aria-hidden="true" />
      {cookie && (
        <div className="cookie" role="region" aria-label="Cookies">
          <span>This website uses cookies to improve your web experience.</span>
          <button onClick={() => { setCookie(false); try { localStorage.setItem("miva-cookie", "1"); } catch {} }}>Accept</button>
        </div>
      )}
      {boot && (
        <div className="boot" aria-hidden="true">
          <div className="logo"><b>MIVA ROBOTICS</b><i>MOTION | INTELLIGENCE | VISION | AUTOMATION</i></div>
        </div>
      )}
    </>
  );
}
