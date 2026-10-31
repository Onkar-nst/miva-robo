import Image from "next/image";
import { ctaLabel, ctaSub, ctaText, type Service } from "@/content/products";
import { CTA, CTABand, Lines, pad } from "./ui";

const shot = "absolute overflow-hidden rounded-[4px] max-[899px]:hidden";

export default function ServicePage({ s }: { s: Service }) {
  const i = s.images;
  return (
    <>
      <section className="deep relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-(--gutter) pb-10 pt-[110px] text-center">
        <Image src={i.banner} alt="" fill priority sizes="100vw" className="object-cover opacity-20" />
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,rgba(11,29,51,.85),transparent_80%),linear-gradient(0deg,#0b1d33,transparent_30%)]" />
        <div className={`${shot} left-[3%] top-[20%] aspect-[4/5] w-[19vw]`} data-parallax="10" aria-hidden="true"><Image src={i.a} alt="" fill sizes="20vw" className="object-cover" /></div>
        <div className={`${shot} right-[3%] top-[34%] aspect-[4/5] w-[17vw]`} data-parallax="-10" aria-hidden="true"><Image src={i.b} alt="" fill sizes="20vw" className="object-cover" /></div>
        <div className="relative z-[2] grid justify-items-center">
          <Lines as="h2" className="text-[clamp(96px,17vw,290px)] font-semibold leading-[.88] tracking-[-.045em] [&_.w]:pr-[.04em]" lines={[s.short]} />
          <h1 className="mb-9 mt-5 max-w-[20ch] text-[clamp(22px,2.4vw,36px)] font-medium leading-[1.15] tracking-[-.025em] text-soft">{s.full}</h1>
          <div data-reveal><CTA href="/contact/">Contact Us</CTA></div>
        </div>
      </section>

      <section className="section-y">
        <div className="wrap">
          <h2 className="mb-[clamp(32px,4vw,64px)] max-w-[18ch] text-[clamp(36px,4.8vw,72px)]" data-reveal>{s.heading}</h2>
          {/* Photo on the left, the copy beside it. */}
          <div className="grid gap-[clamp(28px,4vw,72px)] min-[960px]:grid-cols-[5fr_7fr] min-[960px]:items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-panel" data-reveal="wipe"><Image src={i.c} alt={s.full} fill sizes="(max-width: 960px) 100vw, 40vw" className="object-cover" /></div>
            <div className="stack lead">{s.body.map((t) => <p key={t} data-reveal>{t}</p>)}</div>
          </div>
        </div>
      </section>

      <section className="section-y !pt-0">
        <div className="wrap grid gap-[clamp(40px,6vw,96px)] min-[960px]:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-panel min-[960px]:sticky min-[960px]:top-[110px] min-[960px]:self-start" data-reveal="wipe"><Image src={i.d} alt={s.full} fill sizes="(max-width: 960px) 100vw, 50vw" className="object-cover" /></div>
          <div>
            <h2 className="h-lg mb-8" data-reveal>{s.includesTitle}</h2>
            <div className="pipeline relative before:absolute before:inset-y-[34px] before:left-1 before:w-px before:bg-line-2 before:content-['']">
              <span className="absolute inset-y-[34px] left-1 w-px origin-top bg-accent [transform:scaleY(var(--p,0))]" aria-hidden="true" />
              <ul>{s.includes.map((x) => (
                <li key={x} data-reveal className="relative py-[18px] pl-9 text-[clamp(19px,1.7vw,25px)] font-medium leading-[1.28] tracking-[-.02em] before:absolute before:left-0 before:top-[29px] before:z-[1] before:size-[9px] before:rounded-full before:bg-accent before:content-['']">{x}</li>
              ))}</ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits beside the service's banner photo (as on mivarobotics.ai): the photo holds still while the cards stack past it. */}
      <section className="deep section-y">
        <div className="wrap grid gap-[clamp(32px,4vw,64px)] min-[960px]:grid-cols-[5fr_7fr]">
          <div className="min-[960px]:sticky min-[960px]:top-[110px] min-[960px]:self-start">
            <h2 className="mb-[clamp(24px,3vw,40px)] text-[clamp(44px,6.4vw,104px)]" data-reveal>Benefits</h2>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-panel" data-reveal="wipe"><Image src={i.banner} alt={s.full} fill sizes="(max-width: 960px) 100vw, 40vw" className="object-cover" /></div>
          </div>
          <div className="grid gap-3">
            {s.benefits.map((b, n) => (
              <article key={b.title} style={{ "--n": n } as React.CSSProperties}
                className="sticky top-[calc(96px+var(--n)*16px)] grid content-start gap-3 rounded-[4px] border border-line-2 bg-panel p-[clamp(24px,2.8vw,40px)] !shadow-none min-[960px]:min-h-[220px]">
                <span className="text-[15px] font-medium tabular-nums text-accent-text">{pad(n + 1, 2)}</span>
                <h3 className="text-[clamp(23px,2.2vw,32px)] font-medium leading-[1.1] tracking-[-.03em]">{b.title}</h3>
                <p className="lead">{b.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

<<<<<<< HEAD
      <CTABand text={ctaText} label="Contact Us" href="/contact/" />
=======
      <CTABand text={ctaText} sub={ctaSub} label={ctaLabel} href="/contact/" />
>>>>>>> temp-completed
    </>
  );
}
