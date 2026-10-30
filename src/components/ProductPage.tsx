import Image from "next/image";
import Link from "next/link";
import { ctaText, products, type Product } from "@/content/products";
import { card, cardGrid, Check, CTA, CTABand, fullImg, Lines, Marquee, pad, pager } from "./ui";

function Pager({ p }: { p: Product }) {
  const i = products.indexOf(p), n = products.length;
  const prev = products[(i - 1 + n) % n], next = products[(i + 1) % n];
  return (
    <nav className={pager} aria-label="Products">
      <Link href={`/portfolio/${prev.slug}/`}><span className="eyebrow">Previous</span><b>{prev.name}</b></Link>
      <Link href={`/portfolio/${next.slug}/`}><span className="eyebrow">Next</span><b>{next.name}</b></Link>
    </nav>
  );
}

const word = "whitespace-nowrap pr-[.6em] text-[clamp(40px,6vw,96px)] font-semibold uppercase leading-[1.25] tracking-[-.045em]";
const stroke = "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,.35)]";
const sticky = "min-[960px]:sticky min-[960px]:top-[120px] min-[960px]:self-start";

const grid2 = "grid grid-cols-1 gap-[clamp(40px,6vw,110px)] min-[960px]:grid-cols-[5fr_7fr]";

export default function ProductPage({ p }: { p: Product }) {
  const rows = p.specs?.flatMap((g) => g.rows) ?? [];
  const highlights = p.highlights?.map((h) => rows.find(([k]) => k === h)!).filter(Boolean) ?? [];

  return (
    <>
      <section className="relative flex min-h-svh items-end overflow-hidden bg-black after:absolute after:inset-0 after:content-[''] after:bg-[linear-gradient(0deg,var(--bg)_3%,rgba(12,16,22,.35)_55%,rgba(12,16,22,.55)),linear-gradient(90deg,rgba(12,16,22,.7),transparent_60%)]">
        <Image src={p.hero} alt={p.name} fill priority sizes="100vw" data-parallax="6" className="!inset-x-0 !-inset-y-[6%] !h-[112%] object-cover" />
        <div className="wrap relative z-[3] pb-[clamp(48px,6vw,96px)] pt-[140px]">
          <span className="eyebrow">Products</span>
          <Lines as="h1" className="h-xl !mt-[26px] mb-[22px]" lines={[p.name]} />
          <p className="lead mb-[38px] max-w-[40ch]" data-reveal>{p.tagline}</p>
          {!p.comingSoon && (
            <div className="flex flex-wrap gap-3" data-reveal>
              <CTA href="/contact/">Contact Us</CTA>
              {p.specs && <CTA href="#specs" ghost>Tech Specifications</CTA>}
            </div>
          )}
        </div>
      </section>

      {p.comingSoon && (
        <section className="relative overflow-hidden border-b border-line py-[clamp(32px,4vw,56px)]">
          <Marquee><span className={word}>COMING SOON.</span><span className={`${word} ${stroke}`}>FUTURE IS ALMOST HERE.</span><span className={word}>COMING SOON.</span><span className={`${word} ${stroke}`}>FUTURE IS ALMOST HERE.</span></Marquee>
        </section>
      )}

      {p.about && (
        <section className="section-y">
          <div className={`wrap ${grid2}`}>
            <div className={sticky}><h2 className="h-lg" data-reveal>About {p.name}</h2></div>
            <div className="stack lead">{p.about.map((t) => <p key={t} data-reveal>{t}</p>)}</div>
          </div>
        </section>
      )}

      {p.why && (
        <section className="section-y !pt-0">
          <div className={`wrap ${grid2}`}>
            <div className={sticky}><h2 className="h-lg" data-reveal>Why {p.name}</h2></div>
            <div>
              <div className="stack lead mb-9">{p.whyIntro?.map((t) => <p key={t} data-reveal>{t}</p>)}</div>
              <ul>{p.why.map((w) => <Check key={w}>{w}</Check>)}</ul>
            </div>
          </div>
        </section>
      )}

      {p.specs && (
        <section className="section-y light scroll-mt-20" id="specs">
          <div className="wrap">
            <h2 className="h-lg mb-11" data-reveal>Tech Specifications</h2>
            {highlights.length > 0 && (
              <div className="mb-[clamp(36px,4vw,56px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] border-y border-line">
                {highlights.map(([k, v]) => (
                  <div key={k} data-reveal className="py-7 pr-6 [&+&]:border-l [&+&]:border-line [&+&]:pl-6">
                    <span className="text-[11.5px] font-medium uppercase tracking-[.14em] text-muted">{k}</span>
                    <b className="mt-3 block text-[clamp(24px,2.2vw,32px)] font-medium leading-[1.15] tracking-[-.03em]">{v}</b>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-between pb-3 text-[11.5px] font-medium uppercase tracking-[.16em] text-muted"><span className="w-[42%]">Parameter</span><span className="flex-1">Specification</span></div>
            {p.specs.map((g, i) => (
              <table key={g.group ?? i} data-reveal className="w-full border-collapse [&_:is(th,td)]:border-t [&_:is(th,td)]:border-line [&_:is(th,td)]:py-4 [&_:is(th,td)]:pr-3.5 [&_:is(th,td)]:text-left [&_:is(th,td)]:align-top [&_:is(th,td)]:text-[15px] [&_:is(th,td)]:font-normal [&_:is(th,td)]:transition-[background-color,padding] [&_:is(th,td)]:duration-[.3s,.4s] [&_:is(th,td)]:ease-expo [&_th]:w-[42%] [&_th]:text-muted [&_tr:hover_:is(th,td)]:bg-tint [&_tr:hover_th]:pl-3.5">
                {g.group && <caption className="pb-3.5 pt-9 text-left text-[11.5px] font-medium uppercase tracking-[.16em] text-accent">{g.group}</caption>}
                <tbody>{g.rows.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}</tbody>
              </table>
            ))}
          </div>
        </section>
      )}

      {p.capabilities && (
        <section className="section-y">
          <div className="wrap">
            <h2 className="h-lg mb-11" data-reveal>Key Capabilities</h2>
            <div className={cardGrid}>
              {p.capabilities.map((c, i) => (
                <article className={card} key={c.title} data-reveal style={{ "--d": `${i * 0.06}s` } as React.CSSProperties}>
                  <span className="idx">{pad(i + 1, 2)}</span>
                  <h3 className="h-sm">{c.title}</h3>
                  <p>{c.text}</p>
                </article>
              ))}
            </div>
            {p.capabilitiesNote && <p className="mt-[18px] text-[15px] text-muted">{p.capabilitiesNote}</p>}
          </div>
        </section>
      )}


      {p.secondary && (
        <div className={fullImg}>
          <Image src={p.secondary} alt={p.name} fill sizes="100vw" data-parallax="8" style={p.slug === "miva-eagle" ? { objectFit: "contain" } : undefined} />
          
        </div>
      )}

      {p.connects && (
        <section className="section-y light">
          <div className={`wrap ${grid2}`}>
            <div className={sticky}><h2 className="h-lg" data-reveal>What MIVA OS Connects</h2></div>
            <div>
              <p className="lead mb-[22px]" data-reveal>{p.connects.intro}</p>
              <ul>{p.connects.items.map((c) => <Check key={c}>{c}</Check>)}</ul>
              <p className="lead mt-[26px]" data-reveal>{p.connects.outro}</p>
            </div>
          </div>
        </section>
      )}

      {p.applications && (
        <section className="section-y light">
          <div className="wrap">
            <h2 className="h-lg mb-3.5" data-reveal>Applications</h2>
            <p className="lead mb-10" data-reveal>{p.applicationsIntro}</p>
            <ul>
              {p.applications.map((a, i) => (
                <li key={a} data-reveal className="group flex items-baseline gap-[clamp(16px,3vw,48px)] border-t border-line py-[clamp(18px,2vw,28px)] text-[clamp(22px,2.6vw,38px)] font-semibold leading-[1.15] tracking-[-.035em] transition-[color,padding] duration-[.4s,.7s] ease-expo last:border-b hover:pl-4">
                  <span className="idx flex-none">{pad(i + 1, 2)}</span>{a}
                  <span aria-hidden="true" className="ml-auto -translate-x-2 translate-y-2 text-[.6em] text-accent opacity-0 transition-all duration-500 ease-expo group-hover:translate-0 group-hover:opacity-100">↗</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {!p.comingSoon && <CTABand text={ctaText} label="Contact Us" href="/contact/" />}
      <Pager p={p} />
    </>
  );
}
