import Image from "next/image";
import { CTA, frame, hairGrid, Lines, panel } from "@/components/ui";
import { support as s } from "@/content/pages";

export const metadata = { title: "Support and Services – MIVA Robotics", alternates: { canonical: "/support-and-services/" } };

const grid2 = "grid grid-cols-1 gap-[clamp(40px,6vw,110px)] min-[960px]:grid-cols-[5fr_7fr]";

export default function Support() {
  return (
    <>
      <section className="pb-[clamp(31px,3.9vw,57px)] pt-[clamp(112px,11.7vw,156px)]"><div className="wrap"><Lines as="h1" className="h-xl" lines={["Support & Services"]} /></div></section>
      <section className="section-y !pt-0">
        <div className={`wrap ${grid2}`}>
          <div>
            <span className="eyebrow">{s.eyebrow}</span>
            <h2 className="h-lg !my-[22px]" data-reveal>{s.heading}</h2>
            <p className="lead" data-reveal>{s.text}</p>
          </div>
          <div className="grid min-h-[440px] grid-cols-[7fr_5fr] gap-3">
            <div className={`${frame} row-span-2 min-h-[200px]`} data-reveal="wipe"><Image src="/media/support_1.jpg" alt="" fill priority sizes="35vw" /></div>
            <div className={`${frame} row-span-2 min-h-[200px]`} data-reveal="wipe"><Image src="/media/support_2.jpg" alt="" fill sizes="25vw" /></div>
          </div>
        </div>
      </section>
      <section className="section-y light">
        <div className="wrap">
          <span className="eyebrow">{s.servicesLabel}</span>
          <div className={`${hairGrid} mt-7 grid-cols-[repeat(auto-fit,minmax(min(100%,330px),1fr))]`}>
            {s.services.map((x, i) => (
              <article key={x.title} className={`${panel} group flex min-h-[300px] flex-col`} data-reveal style={{ "--d": `${(i % 3) * 0.07}s` } as React.CSSProperties}>
                <b className="mb-auto pb-7 text-[64px] font-semibold leading-none tracking-[-.05em] text-transparent [-webkit-text-stroke:1px_var(--line-2)] transition-[-webkit-text-stroke-color] duration-500 group-hover:[-webkit-text-stroke-color:var(--accent)]" aria-hidden="true">{i + 1}</b>
                <h2 className="h-sm mb-2.5">{x.title}</h2>
                <p className="text-[15px] text-muted">{x.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-y light !pt-0">
        <div className={`wrap ${grid2}`}>
          <div>
            <span className="eyebrow">{s.visionLabel}</span>
            <div>
              <b className="block text-[clamp(36px,3.2vw,46px)] font-medium leading-none tracking-[-.04em] tabular-nums" data-count={s.stat.value}>{s.stat.value}</b>
              <span className="mt-4 block max-w-[18ch] text-[13px] leading-[1.5] text-muted">{s.stat.label}</span>
            </div>
          </div>
          <div>
            <p className="h-md" data-reveal>{s.vision}</p>
            <div className="mt-9" data-reveal><CTA href="/about-miva-robotics/">Meet the Team</CTA></div>
          </div>
        </div>
      </section>
    </>
  );
}
