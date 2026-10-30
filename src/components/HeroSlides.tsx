"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { pad } from "./ui";

const slides = ["/media/physical-ai.jpg", "/media/MIVA-AMR-2.jpg"];
const HOLD = 6500;

export default function HeroSlides() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setI((n) => (n + 1) % slides.length), HOLD);
    return () => clearTimeout(t);
  }, [i]);

  return (
    <>
      <div className="hero-media" aria-hidden="true">
        {slides.map((s, n) => (
          <div className={`hero-slide ${n === i ? "on" : ""}`} key={s}>
            <Image src={s} alt="" fill priority={n === 0} sizes="(max-width: 900px) 100vw, 70vw" />
          </div>
        ))}
      </div>
      <div className="hero-dots" role="tablist" aria-label="Hero images">
        {slides.map((s, n) => (
          <button key={s} role="tab" aria-selected={n === i} aria-label={`Image ${n + 1}`} className={n === i ? "on" : ""} style={{ "--hold": `${HOLD}ms` } as React.CSSProperties} onClick={() => setI(n)}>
            <span>{pad(n + 1, 2)}</span><i><b /></i>
          </button>
        ))}
      </div>
    </>
  );
}
