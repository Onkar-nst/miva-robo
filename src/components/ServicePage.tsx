import Image from "next/image";
import { ctaText, type Service } from "@/content/products";
import { CTA, CTABand, Lines, pad } from "./ui";

export default function ServicePage({ s }: { s: Service }) {
  const i = s.images;
  return (
    <>
      <section className="s-hero">
        <Image src={i.banner} alt="" fill priority sizes="100vw" />
        <div className="wrap">
          <h1 className="eyebrow">{s.full}</h1>
          <Lines as="h2" className="s-giant metal" lines={[s.short]} />
          <div className="p-actions" data-reveal><CTA href="/contact/">Contact Us</CTA></div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid-2">
          <div>
            <h2 className="h-lg" style={{ marginBottom: 30 }} data-reveal>{s.heading}</h2>
            <div className="stack lead">{s.body.map((t) => <p key={t} data-reveal>{t}</p>)}</div>
          </div>
          <div className="collage" style={{ minHeight: 520 }}>
            <div className="frame" data-reveal="wipe"><span className="scan" /><Image src={i.a} alt={s.full} fill sizes="35vw" /></div>
            <div className="frame" data-reveal="wipe" style={{ "--d": ".1s" } as React.CSSProperties}><Image src={i.b} alt={s.full} fill sizes="25vw" /></div>
            <div className="frame" data-reveal="wipe" style={{ "--d": ".2s" } as React.CSSProperties}><Image src={i.c} alt={s.full} fill sizes="25vw" /></div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-2)", borderBlock: "1px solid var(--line)" }}>
        <div className="wrap grid-2">
          <div className="sticky-col">
            <h2 className="h-lg" style={{ marginBottom: 32 }} data-reveal>{s.includesTitle}</h2>
            <div className="frame" data-reveal="wipe" style={{ aspectRatio: "16/10" }}><span className="ticks" /><Image src={i.d} alt={s.full} fill sizes="(max-width: 960px) 100vw, 40vw" /></div>
          </div>
          <div className="pipeline">
            <span className="pipeline-fill" aria-hidden="true" />
            <ul>{s.includes.map((x) => <li key={x} data-reveal>{x}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="h-lg" style={{ marginBottom: 44 }} data-reveal>Benefits</h2>
          <div className="stack-cards">
            {s.benefits.map((b, n) => (
              <article className="stack-card" key={b.title} style={{ "--n": n } as React.CSSProperties}>
                <span className="idx">{pad(n + 1, 2)}</span>
                <h3 className="h-md">{b.title}</h3>
                <p className="lead">{b.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="fullimg"><Image src={i.e} alt={s.full} fill sizes="100vw" data-parallax="8" /><span className="ticks" /></div>
      <CTABand text={ctaText} label="Contact Us" href="/contact/" />
    </>
  );
}
