import Image from "next/image";
import Link from "next/link";
import { ctaText, products, type Product } from "@/content/products";
import { Check, CTA, CTABand, Lines, Marquee, pad, pager } from "./ui";

function Pager({ p }: { p: Product }) {
  const i = products.indexOf(p), n = products.length;
  const prev = products[(i - 1 + n) % n], next = products[(i + 1) % n];
  return (
    <nav className={`${pager} deep`} aria-label="Products">
      <Link href={`/portfolio/${prev.slug}/`}><span className="eyebrow">Previous</span><b>{prev.name}</b></Link>
      <Link href={`/portfolio/${next.slug}/`}><span className="eyebrow">Next</span><b>{next.name}</b></Link>
    </nav>
  );
}

const word = "whitespace-nowrap pr-[.6em] text-[clamp(40px,6vw,96px)] font-semibold uppercase leading-[1.25] tracking-[-.045em]";
const stroke = "text-transparent [-webkit-text-stroke:1px_rgba(18,33,51,.3)]";
const sticky = "min-[960px]:sticky min-[960px]:top-[120px] min-[960px]:self-start";
const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

function Hero({ p }: { p: Product }) {
  const cutout = p.secondary?.endsWith("EAGLE-1.png");
  const actions = !p.comingSoon && (
    <div className="flex flex-wrap gap-3" data-reveal>
      <CTA href="/contact/">Contact Us</CTA>
      {p.specs && <CTA href="#specs" ghost>Tech Specifications</CTA>}
    </div>
  );
  if (cutout) {
    // Transparent product shot: presented like a showroom piece, lit from behind.
    return (
      <section className="deep relative flex min-h-svh flex-col items-center overflow-hidden pt-[120px] text-center">
        <div aria-hidden="true" className="absolute left-1/2 top-[58%] size-[min(900px,120vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(14,143,230,.3),transparent_65%)]" />
        <div className="wrap relative z-[2]">
          <span className="eyebrow">Products</span>
          <Lines as="h1" className="h-xl !mt-6 mb-4 justify-center" lines={[p.name]} />
          <p className="lead mx-auto max-w-[56ch]" data-reveal>{p.tagline}</p>
        </div>
        <div className="relative z-[1] mt-4 min-h-[300px] w-full max-w-[1100px] flex-1" data-reveal>
          <Image src={p.secondary!} alt={p.name} fill priority sizes="(max-width: 1100px) 100vw, 1100px" className="object-contain" />
        </div>
        <div className="relative z-[2] pb-10 pt-4">{actions}</div>
      </section>
    );
  }
  return (
    <section className="deep relative flex min-h-svh items-end overflow-hidden after:absolute after:inset-0 after:content-[''] after:bg-[linear-gradient(0deg,#070b11_2%,rgba(7,11,17,.2)_50%,rgba(7,11,17,.5)),linear-gradient(90deg,rgba(7,11,17,.82),transparent_65%)]">
      <Image src={p.hero} alt={p.name} fill priority sizes="100vw" data-parallax="6" className="!inset-x-0 !-inset-y-[6%] !h-[112%] object-cover" />
      <div className="wrap relative z-[3] pb-[clamp(48px,6vw,96px)] pt-[140px]">
        <span className="eyebrow">Products</span>
        <Lines as="h1" className="!mt-6 mb-[22px] text-[clamp(52px,9vw,148px)] leading-[.95]" lines={[p.name]} />
        <p className="lead mb-[38px] max-w-[46ch]" data-reveal>{p.tagline}</p>
        {actions}
      </div>
    </section>
  );
}

export default function ProductPage({ p }: { p: Product }) {
  const rows = p.specs?.flatMap((g) => g.rows) ?? [];
  const highlights = p.highlights?.map((h) => rows.find(([k]) => k === h)!).filter(Boolean) ?? [];
  const photo = p.secondary?.endsWith("EAGLE-1.png") ? p.hero : p.secondary;

  return (
    <>
      <Hero p={p} />

      {p.comingSoon && (
        <section className="relative overflow-hidden border-b border-line py-[clamp(32px,4vw,56px)]">
          <Marquee><span className={word}>COMING SOON.</span><span className={`${word} ${stroke}`}>FUTURE IS ALMOST HERE.</span><span className={word}>COMING SOON.</span><span className={`${word} ${stroke}`}>FUTURE IS ALMOST HERE.</span></Marquee>
        </section>
      )}

      {p.about && (
        <section className="section-y">
          <div className="wrap">
            <h2 className="h-lg mb-[clamp(28px,3vw,44px)]" data-reveal>About {p.name}</h2>
            <p className="max-w-[34em] text-[clamp(22px,2.3vw,34px)] font-medium leading-[1.3] tracking-[-.022em]" data-reveal>{p.about[0]}</p>
            {p.about.slice(1).map((t) => <p key={t} className="lead mt-8 max-w-[62ch] min-[960px]:ml-[41.6%]" data-reveal>{t}</p>)}
          </div>
        </section>
      )}

      {p.why && (
        <section className="pb-[clamp(80px,10vw,150px)]">
          <div className="wrap">
            <div className="grid overflow-hidden rounded-[4px] border border-line bg-bg-2 min-[960px]:grid-cols-2">
              <div className="p-[clamp(28px,4vw,64px)]">
                <h2 className="h-md mb-6" data-reveal>Why {p.name}</h2>
                <div className="stack lead">{p.whyIntro?.map((t) => <p key={t} data-reveal>{t}</p>)}</div>
              </div>
              <ul className="self-center border-t border-line bg-bg p-[clamp(28px,4vw,64px)] min-[960px]:h-full min-[960px]:border-l min-[960px]:border-t-0">{p.why.map((w) => <Check key={w}>{w}</Check>)}</ul>
            </div>
          </div>
        </section>
      )}

      {p.specs && (
        <section className="deep section-y scroll-mt-20" id="specs">
          <div className="wrap">
            <h2 className="h-lg mb-[clamp(32px,4vw,56px)]" data-reveal>Tech Specifications</h2>
            {highlights.length > 0 && (
              <div className="mb-[clamp(36px,4vw,64px)] grid gap-px bg-line min-[760px]:grid-cols-3">
                {highlights.map(([k, v], i) => (
                  <div key={k} data-reveal style={d(i * 0.08)} className="bg-bg py-7 pr-6 min-[760px]:px-7 min-[760px]:first:pl-0">
                    <span className="text-[11px] font-medium uppercase tracking-[.16em] text-muted">{k}</span>
                    <b className="mt-3 block text-[clamp(24px,2.5vw,38px)] font-medium leading-[1.12] tracking-[-.03em]">{v}</b>
                  </div>
                ))}
              </div>
            )}
            <table className="w-full border-collapse text-left text-[clamp(15px,1.1vw,17px)]" data-reveal>
              <thead>
                <tr className="border-b border-line-2 text-[11px] uppercase tracking-[.16em] text-muted">
                  <th scope="col" className="w-[42%] py-3 font-medium">Parameter</th>
                  <th scope="col" className="py-3 font-medium">Specification</th>
                </tr>
              </thead>
              {p.specs.map((g, i) => (
                <tbody key={g.group ?? i}>
                  {g.group && <tr><th colSpan={2} scope="colgroup" className="pb-2 pt-8 text-[12px] font-semibold uppercase tracking-[.14em] text-accent">{g.group}</th></tr>}
                  {g.rows.map(([k, v]) => (
                    <tr key={k} className="border-b border-line transition-colors duration-300 hover:bg-tint">
                      <th scope="row" className="py-[18px] pr-5 align-top font-normal text-soft">{k}</th>
                      <td className="py-[18px] align-top font-medium">{v}</td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </section>
      )}

      {p.capabilities && (
        <section className="section-y">
          <div className="wrap grid gap-[clamp(40px,5vw,88px)] min-[960px]:grid-cols-[5fr_7fr]">
            <div className={sticky}>
              <h2 className="h-lg mb-8" data-reveal>Key Capabilities</h2>
              {photo && (
                <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-panel" data-reveal="wipe">
                  <Image src={photo} alt={p.name} fill sizes="(max-width: 960px) 100vw, 40vw" className="object-cover" />
                </div>
              )}
            </div>
            <div>
              {p.capabilities.map((c, i) => (
                <article key={c.title} data-reveal className="group grid grid-cols-[52px_1fr] border-t border-line py-[clamp(24px,2.6vw,38px)] !shadow-none last:border-b">
                  <span className="idx pt-1.5 !text-accent">{pad(i + 1, 2)}</span>
                  <div>
                    <h3 className="mb-2.5 text-[clamp(21px,2vw,30px)] font-medium leading-[1.15] tracking-[-.025em] transition-transform duration-500 ease-expo group-hover:translate-x-1.5">{c.title}</h3>
                    <p className="max-w-[56ch] text-[15.5px] leading-[1.65] text-muted">{c.text}</p>
                  </div>
                </article>
              ))}
              {p.capabilitiesNote && <p className="mt-[18px] text-[15px] text-muted">{p.capabilitiesNote}</p>}
            </div>
          </div>
        </section>
      )}

      {p.connects && (
        <section className="section-y !pt-0">
          <div className="wrap grid gap-10 min-[960px]:grid-cols-[5fr_7fr]">
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
        <section className="section-y bg-bg-2">
          <div className="wrap grid gap-10 min-[960px]:grid-cols-[5fr_7fr]">
            <div className={sticky}>
              <h2 className="h-lg mb-3.5" data-reveal>Applications</h2>
              <p className="lead" data-reveal>{p.applicationsIntro}</p>
            </div>
            <ul>
              {p.applications.map((a, i) => (
                <li key={a} data-reveal className="group flex items-baseline gap-[clamp(16px,2vw,32px)] border-t border-line-2 py-[clamp(18px,2vw,28px)] text-[clamp(20px,2.1vw,32px)] font-medium leading-[1.18] tracking-[-.025em] transition-[padding,color] duration-500 ease-expo last:border-b hover:pl-3 hover:text-accent">
                  <span className="idx flex-none">{pad(i + 1, 2)}</span>{a}
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
