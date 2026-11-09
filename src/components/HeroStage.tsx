import { home } from "@/content/pages";
import HeroArm from "./HeroArm";
import { CTA, Lines, Marquee } from "./ui";

const d = (s: number) => ({ "--d": `${s}s`, animationDelay: `${s}s` }) as React.CSSProperties;

// Home hero: a grey studio card with the headline split across the top, a robotic arm working centre stage,
// and the partner logos gliding along the floor.
export default function HeroStage() {
  return (
    <section className="px-[clamp(10px,1.4vw,22px)] pb-[clamp(10px,1.4vw,22px)] pt-[88px]">
      <div className="relative isolate flex flex-col min-[1000px]:h-[calc(100svh-88px-clamp(10px,1.4vw,22px))] min-[1000px]:min-h-[660px] overflow-hidden rounded-[clamp(18px,2vw,30px)] bg-[linear-gradient(180deg,#c9ced3,#dfe2e5_58%,#eceef0_72%,#f6f7f8)] px-[clamp(20px,3.4vw,56px)] pt-[clamp(20px,2.6vw,36px)] text-[#14181d]">
        {/* Floor: a lighter plane meeting the backdrop, so the product reads as standing in a studio. */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-[30%] bg-[linear-gradient(180deg,#eef0f2,#f8f9fa)] shadow-[0_-1px_0_rgba(255,255,255,.7)]" />

        <span className="self-start rounded-full border border-[#14181d]/60 px-5 py-2 font-mono text-[10.5px] uppercase tracking-[.14em]" data-reveal>Introducing MIVA Robotics</span>

        <div className="mt-[clamp(26px,3.6vw,52px)] grid items-start gap-6 min-[1000px]:grid-cols-[1fr_minmax(260px,24vw)] min-[1000px]:gap-10">
          <h1 className="text-[clamp(42px,6.4vw,108px)] font-medium leading-[.95] tracking-[-.055em] text-[#14181d]">
            <Lines as="span" className="block" lines={["Accessible,", "Adaptable, Affordable"]} />
            <span className="sr-only"> automation for every scale.</span>
          </h1>
          <div className="min-[1000px]:pt-[clamp(8px,1vw,16px)]" data-reveal style={d(0.35)}>
            <span aria-hidden="true" className="mb-4 block h-[3px] w-9 bg-[#14181d]" />
            <p aria-hidden="true" className="text-[clamp(22px,2.2vw,34px)] font-medium leading-[1.08] tracking-[-.035em] text-[#14181d]">automation for every scale.</p>
            <CTA href="/about-miva-robotics/" className="mt-7 rounded-full !bg-[#a9cfe0] font-mono !text-[11px] uppercase tracking-[.14em] !text-[#14181d] before:rounded-full hover:!text-white">About MIVA</CTA>
          </div>
        </div>

        <div className="relative -mx-[clamp(20px,3.4vw,56px)] h-[min(78vw,340px)] min-[1000px]:h-auto min-[1000px]:min-h-[300px] min-[1000px]:flex-1"><HeroArm /></div>

        <div className="-mx-[clamp(20px,3.4vw,56px)] border-t border-[#14181d]/8 py-[clamp(18px,2.2vw,30px)]">
          <Marquee className="[mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
            <div className="flex">
              {home.logos.map((l) => (
                <div key={l.src} className="grid h-12 w-[clamp(160px,16vw,240px)] place-items-center px-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.src} alt={l.alt} className="max-h-[clamp(22px,2.2vw,32px)] w-auto max-w-[130px] object-contain opacity-70 mix-blend-multiply grayscale" />
                </div>
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </section>
  );
}
