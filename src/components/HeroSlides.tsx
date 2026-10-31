"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { src: "/media/MIVA-AXIS-1.jpg", alt: "MIVA AXIS gantry system on a factory floor" },
  { src: "/media/Automotive-assembly-line-in-progress.jpg", alt: "Automotive assembly line in progress" },
  { src: "/media/Advanced-manufacturing-in-action.jpg", alt: "Advanced manufacturing line in action" },
];
const HOLD = 6;

// Hero backdrop: muted factory photography over the right of the stage, fading into the page behind the headline,
// with an accent strip on the right edge that numbers the slides and fills as each one holds.
export default function HeroSlides() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setI((i + 1) % slides.length), HOLD * 1000);
    return () => clearTimeout(t);
  }, [i]);

  return (
    <>
      <div className="absolute inset-y-0 right-0 -z-10 w-full animate-[wipe-in_1.4s_var(--ease-io)_both] overflow-hidden min-[760px]:w-[70%]">
        {slides.map((s, k) => (
          <Image key={s.src} src={s.src} alt={k === i ? s.alt : ""} fill priority={k === 0} sizes="(min-width: 760px) 70vw, 100vw"
            className={`object-cover [filter:saturate(.45)_contrast(1.08)] transition-[opacity,scale] duration-[1.4s,7s] ease-out ${k === i ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"}`} />
        ))}
        <div className="absolute inset-0 bg-linear-to-r from-bg via-bg/80 to-bg/35 min-[760px]:via-bg/80 min-[760px]:via-35% min-[760px]:to-transparent min-[760px]:to-75%" />
        <div className="absolute inset-0 bg-linear-to-b from-bg/95 to-transparent to-[22%]" />
        <div className="absolute inset-0 bg-linear-to-t from-bg/80 to-transparent to-30% min-[760px]:hidden" />
      </div>

      <div aria-hidden="true" className="absolute bottom-0 right-0 top-24 z-[1] hidden w-[6%] min-w-14 max-w-24 origin-top animate-[drop-in_1.2s_.5s_var(--ease-io)_both] bg-accent/85 mix-blend-multiply min-[760px]:block" />
      <div className="absolute bottom-[18%] right-0 z-[3] hidden w-[6%] min-w-14 max-w-24 flex-col items-center gap-5 min-[760px]:flex">
        {slides.map((s, k) => (
          <button key={s.src} type="button" aria-label={`Show slide ${k + 1}`} aria-current={k === i} onClick={() => setI(k)}
            className={`flex cursor-pointer flex-col items-center gap-2 text-[11px] tabular-nums transition-colors ${k === i ? "text-white" : "text-white/55 hover:text-white"}`}>
            0{k + 1}
            <span className="relative block h-8 w-px overflow-hidden bg-white/30">
              {k === i && <span key={i} className="absolute inset-0 origin-top animate-[drop-in_6s_linear_both] bg-white" />}
            </span>
          </button>
        ))}
      </div>
    </>
  );
}
