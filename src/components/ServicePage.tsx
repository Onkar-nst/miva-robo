import Image from "next/image";
import { ctaText, type Service } from "@/content/products";
import { CTA, CTABand, frame, fullImg, Lines, pad } from "./ui";

const grid2 = "grid grid-cols-1 gap-[clamp(40px,6vw,110px)] min-[960px]:grid-cols-[5fr_7fr]";

export default function ServicePage({ s }: { s: Service }) {
  const i = s.images;
  return (
    <>
      <section className="relative flex min-h-svh flex-col justify-end overflow-hidden after:absolute after:inset-0 after:content-[''] after:bg-[linear-gradient(0deg,var(--bg)_5%,rgba(12,16,22,.3)_70%)]">
        <Image src={i.banner} alt="" fill priority sizes="100vw" className="object-cover opacity-55" />
        <div className="wrap relative z-[2] pb-[clamp(48px,6vw,88px)] pt-[140px]">
          <h1 className="eyebrow leading-[1.3]">{s.full}</h1>
          <Lines as="h2" className="!mb-9 !mt-6 text-[clamp(96px,19vw,320px)] font-semibold leading-[.9] tracking-[-.035em] [&_.w]:pr-[.04em]" lines={[s.short]} />
          <div className="flex flex-wrap gap-3" data-reveal><CTA href="/contact/">Contact Us</CTA></div>
        </div>
      </section>

      <section className="section-y">
        <div className={`wrap ${grid2}`}>
          <div>
            <h2 className="h-lg mb-[30px]" data-reveal>{s.heading}</h2>
            <div className="stack lead">{s.body.map((t) => <p key={t} data-reveal>{t}</p>)}</div>
          </div>
          <div className="grid min-h-[520px] grid-cols-[7fr_5fr] gap-3">
            <div className={`${frame} row-span-2 min-h-[200px]`} data-reveal="wipe"><Image src={i.a} alt={s.full} fill sizes="35vw" /></div>
            <div className={`${frame} min-h-[200px]`} data-reveal="wipe" style={{ "--d": ".1s" } as React.CSSProperties}><Image src={i.b} alt={s.full} fill sizes="25vw" /></div>
            <div className={`${frame} min-h-[200px]`} data-reveal="wipe" style={{ "--d": ".2s" } as React.CSSProperties}><Image src={i.c} alt={s.full} fill sizes="25vw" /></div>
          </div>
        </div>
      </section>

      <section className="section-y light">
        <div className={`wrap ${grid2}`}>
          <div className="min-[960px]:sticky min-[960px]:top-[120px] min-[960px]:self-start">
            <h2 className="h-lg mb-8" data-reveal>{s.includesTitle}</h2>
            <div className={`${frame} aspect-[16/10]`} data-reveal="wipe"><Image src={i.d} alt={s.full} fill sizes="(max-width: 960px) 100vw, 40vw" /></div>
          </div>
          <div className="pipeline relative before:absolute before:inset-y-[38px] before:left-3 before:w-px before:bg-line-2 before:content-['']">
            <span className="absolute inset-y-[38px] left-3 w-px origin-top bg-accent [transform:scaleY(var(--p,0))]" aria-hidden="true" />
            <ul>{s.includes.map((x) => (
              <li key={x} data-reveal className="relative border-b border-line py-[22px] pl-12 text-[clamp(19px,1.8vw,26px)] font-medium leading-[1.3] tracking-[-.025em] before:absolute before:left-2 before:top-[33px] before:z-[1] before:size-[9px] before:border before:border-accent before:bg-bg before:content-['']">{x}</li>
            ))}</ul>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="wrap">
          <h2 className="h-lg mb-11" data-reveal>Benefits</h2>
          <div className="grid">
            {s.benefits.map((b, n) => (
              <article key={b.title} style={{ "--n": n } as React.CSSProperties}
                className="sticky top-[calc(100px+var(--n)*14px)] grid gap-[22px] border-t border-line-2 bg-bg-2 py-[clamp(28px,4vw,52px)] min-[900px]:grid-cols-[110px_1fr_1fr] min-[900px]:items-start min-[900px]:px-6">
                <span className="idx">{pad(n + 1, 2)}</span>
                <h3 className="h-md">{b.title}</h3>
                <p className="lead">{b.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className={fullImg}><Image src={i.e} alt={s.full} fill sizes="100vw" data-parallax="8" /></div>
      <CTABand text={ctaText} label="Contact Us" href="/contact/" />
    </>
  );
}
