import { home } from "@/content/pages";
import HeroArm from "./HeroArm";
import { FloorMarquee, pill, Studio } from "./Studio";
import { CTA } from "./ui";

// Home hero: the studio card with a robotic arm working centre stage and the partner logos gliding along the floor.
export default function HeroStage() {
  return (
    <Studio
      eyebrow="Introducing MIVA Robotics"
      title={{ lines: ["Accessible,", "Adaptable, Affordable"], tail: "automation for every scale." }}
      aside={<p aria-hidden="true">automation for every scale.</p>}
      actions={<CTA href="/about-miva-robotics/" className={pill}>About MIVA</CTA>}
      stage={<HeroArm />}
      foot={
        <FloorMarquee>
          <div className="flex">
            {home.logos.map((l) => (
              <div key={l.src} className="grid h-[clamp(52px,4.6vw,68px)] w-[clamp(170px,16vw,240px)] place-items-center px-7">
                {/* Optical sizing: every logo gets about the same area, so compact marks like JIIF stand as tall as they need
                    to read while long wordmarks stay slim. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.src} alt={l.alt} width={l.w} height={l.h} style={{ height: `calc(var(--logo) * ${Math.min(1.45, Math.sqrt(3.6 / (l.w / l.h))).toFixed(2)})` }} className="w-auto max-w-full object-contain opacity-70 mix-blend-multiply grayscale [--logo:clamp(22px,2.1vw,31px)]" />
              </div>
            ))}
          </div>
        </FloorMarquee>
      }
    />
  );
}
