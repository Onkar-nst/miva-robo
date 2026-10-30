import Image from "next/image";
import Link from "next/link";
import { ctaText, products, type Product } from "@/content/products";
import { OsVideo } from "./SocialHub";
import { Check, CTA, CTABand, Lines, Marquee, pad } from "./ui";

function Pager({ p }: { p: Product }) {
  const i = products.indexOf(p), n = products.length;
  const prev = products[(i - 1 + n) % n], next = products[(i + 1) % n];
  return (
    <nav className="pager" aria-label="Products">
      <Link href={`/portfolio/${prev.slug}/`}><span className="eyebrow">Previous</span><b>{prev.name}</b></Link>
      <Link href={`/portfolio/${next.slug}/`}><span className="eyebrow">Next</span><b>{next.name}</b></Link>
    </nav>
  );
}

export default function ProductPage({ p }: { p: Product }) {
  const rows = p.specs?.flatMap((g) => g.rows) ?? [];
  const highlights = p.highlights?.map((h) => rows.find(([k]) => k === h)!).filter(Boolean) ?? [];

  return (
    <>
      <section className="p-hero">
        <Image src={p.hero} alt={p.name} fill priority sizes="100vw" data-parallax="6" />
        <span className="scan" />
        <div className="wrap">
          <span className="eyebrow">Products</span>
          <Lines as="h1" className="h-xl metal" lines={[p.name]} />
          <p className="lead" data-reveal>{p.tagline}</p>
          {!p.comingSoon && (
            <div className="p-actions" data-reveal>
              <CTA href="/contact/">Contact Us</CTA>
              {p.specs && <CTA href="#specs" ghost>Tech Specifications</CTA>}
            </div>
          )}
        </div>
      </section>

      {p.comingSoon && (
        <section className="soon">
          <Marquee><span className="word metal">COMING SOON.</span><span className="word stroke">FUTURE IS ALMOST HERE.</span><span className="word metal">COMING SOON.</span><span className="word stroke">FUTURE IS ALMOST HERE.</span></Marquee>
        </section>
      )}

      {p.about && (
        <section className="section">
          <div className="wrap grid-2">
            <div className="sticky-col"><h2 className="h-lg" data-reveal>About {p.name}</h2></div>
            <div className="stack lead">{p.about.map((t) => <p key={t} data-reveal>{t}</p>)}</div>
          </div>
        </section>
      )}

      {p.why && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap grid-2">
            <div className="sticky-col"><h2 className="h-lg" data-reveal>Why {p.name}</h2></div>
            <div>
              <div className="stack lead" style={{ marginBottom: 36 }}>{p.whyIntro?.map((t) => <p key={t} data-reveal>{t}</p>)}</div>
              <ul>{p.why.map((w) => <Check key={w}>{w}</Check>)}</ul>
            </div>
          </div>
        </section>
      )}

      {p.specs && (
        <section className="section" id="specs" style={{ background: "var(--bg-2)", borderBlock: "1px solid var(--line)", scrollMarginTop: 80 }}>
          <div className="wrap">
            <h2 className="h-lg" style={{ marginBottom: 44 }} data-reveal>Tech Specifications</h2>
            {highlights.length > 0 && (
              <div className="readouts">
                {highlights.map(([k, v]) => <div key={k} data-reveal><span>{k}</span><b>{v}</b></div>)}
              </div>
            )}
            <div className="spec-head"><span>Parameter</span><span>Specification</span></div>
            {p.specs.map((g, i) => (
              <table className="specs" key={g.group ?? i} data-reveal>
                {g.group && <caption>{g.group}</caption>}
                <tbody>{g.rows.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}</tbody>
              </table>
            ))}
          </div>
        </section>
      )}

      {p.capabilities && (
        <section className="section">
          <div className="wrap">
            <h2 className="h-lg" style={{ marginBottom: 44 }} data-reveal>Key Capabilities</h2>
            <div className="cards">
              {p.capabilities.map((c, i) => (
                <article className="panel" key={c.title} data-reveal style={{ "--d": `${i * 0.06}s` } as React.CSSProperties}>
                  <span className="idx">{pad(i + 1, 2)}</span>
                  <h3 className="h-sm">{c.title}</h3>
                  <p>{c.text}</p>
                </article>
              ))}
            </div>
            {p.capabilitiesNote && <p className="muted" style={{ marginTop: 18, fontSize: 15 }}>{p.capabilitiesNote}</p>}
          </div>
        </section>
      )}

      {p.slug === "miva-os" && <section className="section" style={{ paddingTop: 0 }}><div className="wrap" data-reveal><OsVideo /></div></section>}

      {p.secondary && (
        <div className="fullimg">
          <Image src={p.secondary} alt={p.name} fill sizes="100vw" data-parallax="8" style={p.slug === "miva-eagle" ? { objectFit: "contain" } : undefined} />
          <span className="ticks" />
        </div>
      )}

      {p.connects && (
        <section className="section">
          <div className="wrap grid-2">
            <div className="sticky-col"><h2 className="h-lg" data-reveal>What MIVA OS Connects</h2></div>
            <div>
              <p className="lead" style={{ marginBottom: 22 }} data-reveal>{p.connects.intro}</p>
              <ul>{p.connects.items.map((c) => <Check key={c}>{c}</Check>)}</ul>
              <p className="lead" style={{ marginTop: 26 }} data-reveal>{p.connects.outro}</p>
            </div>
          </div>
        </section>
      )}

      {p.applications && (
        <section className="section">
          <div className="wrap">
            <h2 className="h-lg" style={{ marginBottom: 14 }} data-reveal>Applications</h2>
            <p className="lead" style={{ marginBottom: 40 }} data-reveal>{p.applicationsIntro}</p>
            <ul className="apps">
              {p.applications.map((a, i) => <li key={a} data-reveal><span className="idx">{pad(i + 1, 2)}</span>{a}</li>)}
            </ul>
          </div>
        </section>
      )}

      {!p.comingSoon && <CTABand text={ctaText} label="Contact Us" href="/contact/" />}
      <Pager p={p} />
    </>
  );
}
