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
      {/* Photo fills the right two-thirds, fading in from the left; full-bleed behind the text on small screens. */}
      <div aria-hidden="true" className="absolute inset-y-0 right-0 w-full min-[901px]:w-[66%] min-[901px]:[mask-image:linear-gradient(90deg,transparent_0%,#000_38%)]
        after:absolute after:inset-0 after:content-[''] after:bg-[linear-gradient(0deg,var(--bg)_8%,rgba(12,16,22,.55)_60%,rgba(12,16,22,.35))]
        min-[901px]:after:bg-[linear-gradient(0deg,var(--bg)_0%,transparent_25%),linear-gradient(rgba(12,16,22,.12),rgba(12,16,22,.12))]">
        {slides.map((s, n) => (
          <div key={s} className={`absolute inset-0 transition-opacity duration-[1.6s] ease-io ${n === i ? "opacity-100" : "opacity-0"}`}>
            <Image src={s} alt="" fill priority={n === 0} sizes="(max-width: 900px) 100vw, 70vw"
              className={`object-cover transition-transform duration-[8s] ease-linear ${n === i ? "scale-100" : "scale-110"}`} />
          </div>
        ))}
      </div>
      <div role="tablist" aria-label="Hero images" className="absolute right-(--gutter) top-[64%] z-[3] hidden gap-3.5 min-[901px]:grid">
        {slides.map((s, n) => (
          <button key={s} role="tab" aria-selected={n === i} aria-label={`Image ${n + 1}`} onClick={() => setI(n)}
            className={`grid cursor-pointer justify-items-center gap-2.5 border-0 bg-transparent p-0 text-[11px] tabular-nums ${n === i ? "text-white" : "text-white/50"}`}>
            <span>{pad(n + 1, 2)}</span>
            <i className="relative block h-11 w-px overflow-hidden bg-white/25">
              <b key={n === i ? `on-${i}` : "off"} style={{ animationDuration: `${HOLD}ms` }}
                className={`absolute inset-0 origin-top scale-y-0 bg-white ${n === i ? "animate-[fill_linear_forwards]" : ""}`} />
            </i>
          </button>
        ))}
      </div>
    </>
  );
}
