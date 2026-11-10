import Image from "next/image";
import { ctaLabel, ctaSub, ctaText, services, type Service } from "@/content/products";
import { FloorMarquee, pill, StudioSplit } from "./Studio";
import { CTA, CTABand, pad } from "./ui";

// A photo floating on the studio stage: rounded, lifted on a soft shadow, bobbing gently.
const float = "absolute animate-[hover-float_7s_ease-in-out_infinite] overflow-hidden rounded-[clamp(12px,1.4vw,20px)] shadow-[0_40px_70px_-30px_rgba(20,24,29,.45)]";
// Overlapping photos get a pale mat so they read as prints laid over the banner.
const framed = "ring-[clamp(4px,.5vw,8px)] ring-[#e9ecef]";

export default function ServicePage({ s }: { s: Service }) {
  const i = s.images;
  return (
    <>
      {/* Studio hero: the acronym and its full name on the left; on the right a layered collage, the banner
          behind with two framed photos overlapping it. What the service includes glides along the floor. */}
      <StudioSplit
        eyebrow="Services"
        index={`${pad(services.indexOf(s) + 1, 2)} / ${pad(services.length, 2)}`}
        title={s.short}
        aside={<p>{s.full}</p>}
        actions={<CTA href="/contact/" className={pill}>Contact Us</CTA>}
        media={
          <div className="absolute inset-0 animate-[rise_1.2s_.15s_var(--ease-expo)_both]">
            <div className={`${float} right-0 top-0 h-[82%] w-[86%]`}>
              <Image src={i.banner} alt={s.full} fill priority sizes="(min-width: 1000px) 50vw, 90vw" className="object-cover" />
              <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/85 px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[.14em] text-[#14181d] backdrop-blur-[8px]">
                <i aria-hidden="true" className="size-1.5 rounded-full bg-accent-text" />{s.short}
              </span>
            </div>
            <div className={`${float} ${framed} bottom-0 left-0 h-[52%] w-[34%] [animation-delay:-2.5s]`} aria-hidden="true"><Image src={i.a} alt="" fill sizes="20vw" className="object-cover" /></div>
            <div className={`${float} ${framed} bottom-[3%] right-[7%] h-[38%] w-[26%] [animation-delay:-5s]`} aria-hidden="true"><Image src={i.b} alt="" fill sizes="16vw" className="object-cover" /></div>
          </div>
        }
        foot={
          <FloorMarquee>
            <div className="flex">
              {s.includes.map((t) => (
                <span key={t} className="flex items-center gap-3 whitespace-nowrap px-[clamp(22px,2.6vw,40px)] font-mono text-[11.5px] uppercase tracking-[.1em] text-[#14181d]">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-text" />{t}
                </span>
              ))}
            </div>
          </FloorMarquee>
        }
      />

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

      <CTABand text={ctaText} sub={ctaSub} label={ctaLabel} href="/contact/" />
    </>
  );
}
