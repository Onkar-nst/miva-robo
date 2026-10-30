"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

// Site-wide motion: smooth scroll, reveals, counters, parallax and pinned horizontal scroll.
export default function Effects() {
  const path = usePathname();
  const bar = useRef<HTMLDivElement>(null);
  const [boot, setBoot] = useState(false);
  const [cookie, setCookie] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem("miva-boot")) { sessionStorage.setItem("miva-boot", "1"); setBoot(true); setTimeout(() => setBoot(false), 2300); }
      if (!localStorage.getItem("miva-cookie")) setCookie(true);
    } catch {}
  }, []);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = reduce ? null : new Lenis({ lerp: 0.09 });
    let raf = 0;
    const parallax = [...document.querySelectorAll<HTMLElement>("[data-parallax]")];
    const fills = [...document.querySelectorAll<HTMLElement>(".pipeline")];
    const pins = [...document.querySelectorAll<HTMLElement>("[data-hscroll]")].map((el) => ({
      el, track: el.querySelector<HTMLElement>(".hs-track")!, count: el.querySelector<HTMLElement>("[data-hs-count]"), n: el.querySelectorAll(".hs-track > *").length, dist: 0,
    }));

    const pinMq = matchMedia("(min-width: 1000px)");
    const sizePins = () => {
      for (const p of pins) {
        const on = pinMq.matches && !reduce;
        p.dist = on ? Math.max(0, p.track.scrollWidth - p.track.clientWidth) : 0;
        p.el.style.height = on ? `${p.dist + innerHeight}px` : "";
        if (!on) p.track.style.transform = "";
      }
    };
    sizePins();
    addEventListener("resize", sizePins);

    const loop = (t: number) => {
      lenis?.raf(t);
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.current?.style.setProperty("--s", String(h > 0 ? scrollY / h : 0));
      if (!reduce) for (const el of parallax) {
        const r = el.parentElement!.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) continue;
        const k = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        el.style.transform = `translate3d(0, ${k * Number(el.dataset.parallax || 8)}%, 0) scale(1.08)`;
      }
      for (const el of fills) {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--p", String(Math.min(1, Math.max(0, (innerHeight * 0.75 - r.top) / r.height))));
      }
      for (const p of pins) {
        if (!p.dist) continue;
        const r = p.el.getBoundingClientRect();
        const k = Math.min(1, Math.max(0, -r.top / p.dist));
        p.track.style.transform = `translate3d(${-k * p.dist}px, 0, 0)`;
        p.el.style.setProperty("--k", String(k));
        if (p.count) p.count.textContent = String(Math.min(p.n, 1 + Math.floor(k * p.n))).padStart(2, "0");
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const count = (el: HTMLElement) => {
      const end = Number(el.dataset.count), width = Number(el.dataset.pad || 0), suffix = el.dataset.suffix || "";
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / 2000);
        el.textContent = String(Math.round(end * (1 - Math.pow(1 - p, 4)))).padStart(width, "0") + suffix;
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
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    document.querySelectorAll("[data-reveal],[data-lines],[data-count]").forEach((el) => io.observe(el));

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      lenis?.destroy();
      removeEventListener("resize", sizePins);
    };
  }, [path]);

  return (
    <>
      <div className="bar" ref={bar} />
      {cookie && (
        <div className="cookie" role="region" aria-label="Cookies">
          <span>This website uses cookies to improve your web experience.</span>
          <button onClick={() => { setCookie(false); try { localStorage.setItem("miva-cookie", "1"); } catch {} }}>Accept</button>
        </div>
      )}
      {boot && (
        <div className="boot" aria-hidden="true">
          <div className="boot-top">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/MIVA__ROBOTICS_Logo_White.svg" alt="" />
            <span>MOTION | INTELLIGENCE | VISION | AUTOMATION</span>
          </div>
          <p className="boot-word">MIVA <em>Robotics</em></p>
          <div className="boot-bar"><i /></div>
        </div>
      )}
    </>
  );
}
