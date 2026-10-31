import Image from "next/image";
import Link from "next/link";
import { ctaLabel, ctaSub, ctaText, products, type Product } from "@/content/products";
import { Check, CTA, CTABand, hairGrid, Lines, Marquee, pad, pager, panel } from "./ui";

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
const stroke = "text-transparent [-webkit-text-stroke:1px_rgba(11,29,51,.3)]";
const sticky = "min-[960px]:sticky min-[960px]:top-[120px] min-[960px]:self-start";
const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;
// "Up to 50 kg (Configurable)" → ["Up to 50 kg", "Configurable"]: the qualifier sits under the value.
const split = (v: string) => v.match(/^(.+?)\s*\((.+)\)$/)?.slice(1) ?? [v];

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
      <section className="deep relative flex min-h-svh flex-col items-center overflow-hidden pt-[104px] text-center">
        <div aria-hidden="true" className="absolute left-1/2 top-[58%] size-[min(900px,120vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,209,255,.16),transparent_65%)]" />
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
    <section className="deep relative flex min-h-svh items-end overflow-hidden after:absolute after:inset-0 after:content-[''] after:bg-[linear-gradient(0deg,#0b1d33_2%,rgba(11,29,51,.2)_50%,rgba(11,29,51,.5)),linear-gradient(90deg,rgba(11,29,51,.82),transparent_65%)]">
      <Image src={p.hero} alt={p.name} fill priority sizes="100vw" data-parallax="6" className="!inset-x-0 !-inset-y-[6%] !h-[112%] object-cover" />
      <div className="wrap relative z-[3] pb-[clamp(31px,3.9vw,62px)] pt-[140px]">
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
  // Cutout shots sit best on the datasheet's drawing grid; otherwise use the hero photo.
  const sheet = p.secondary?.endsWith(".png") ? p.secondary : p.hero;
  const groups = p.specs?.map((g, i) => ({ ...g, name: g.group ?? "General", id: `spec-${i + 1}` })) ?? [];

  return (
    <>
      <Hero p={p} />

      {p.comingSoon && (
        <section className="relative overflow-hidden border-b border-line py-[clamp(21px,2.6vw,36px)]">
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
        <section className="pb-[clamp(52px,6.5vw,98px)]">
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
        <section className="deep section-y relative scroll-mt-20 overflow-hidden" id="specs">
          <div aria-hidden="true" className="pointer-events-none absolute -right-[10%] -top-[20%] size-[min(820px,110vw)] rounded-full bg-[radial-gradient(circle,rgba(0,209,255,.09),transparent_62%)]" />
          <div className="wrap relative">
            <div className="mb-[clamp(40px,5vw,72px)] flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="eyebrow" data-reveal>Datasheet</span>
                <h2 className="h-lg" data-reveal>Tech Specifications</h2>
              </div>
              <p className="idx uppercase" data-reveal>{pad(rows.length, 2)} Parameters · {pad(p.specs.length, 2)} Groups</p>
            </div>

            {highlights.length > 0 && (
              <div className={`${hairGrid} mb-[clamp(56px,6vw,96px)] min-[760px]:grid-cols-3`}>
                {highlights.map(([k, v], i) => {
                  const [main, note] = split(v);
                  const [, lead, figure] = main.match(/^(Up to)\s+(.+)$/i) ?? [, "", main];
                  return (
                    <div key={k} data-reveal style={d(i * 0.08)} className={`${panel} flex min-h-[200px] flex-col !bg-bg-2 hover:!bg-panel`}>
                      <div className="mb-auto flex items-center justify-between pb-10">
                        <span className="meta !mb-0">{k}</span>
                        <span className="idx !text-accent-text">{pad(i + 1, 2)}</span>
                      </div>
                      {lead && <span className="mb-1 text-[13.5px] uppercase tracking-[.12em] text-muted">{lead}</span>}
                      <b className="block text-[clamp(34px,3.6vw,56px)] font-medium leading-[1] tracking-[-.04em]">{figure}</b>
                      {note && <span className="mt-3 self-start rounded-full border border-line-2 px-2.5 py-1 text-[12px] text-soft">{note}</span>}
                    </div>
                  );
                })}
              </div>
            )}

            <div className="grid gap-[clamp(32px,4vw,72px)] min-[960px]:grid-cols-[4fr_7fr]">
              {/* Datasheet cover: the product framed like a technical drawing, with an index of the groups below. */}
              <aside className={sticky}>
                <figure className="relative aspect-[4/3] overflow-hidden rounded-[4px] border border-line bg-bg-2 [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:32px_32px]" data-reveal>
                  <Image src={sheet} alt={p.name} fill sizes="(max-width: 960px) 100vw, 36vw" className={sheet.endsWith(".png") ? "object-contain p-6" : "object-cover opacity-90"} />
                  {["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"].map((c) => (
                    <span key={c} aria-hidden="true" className={`absolute size-4 border-accent ${c}`} />
                  ))}
                  <figcaption className="absolute inset-x-0 bottom-0 flex justify-between bg-[linear-gradient(0deg,rgba(14,16,19,.85),transparent)] px-5 pb-4 pt-10 text-[12px] uppercase tracking-[.14em] text-soft">
                    <span>{p.name}</span><span>{pad(rows.length, 2)} Parameters</span>
                  </figcaption>
                </figure>
                {groups.length > 1 && (
                  <nav aria-label="Specification groups" className="mt-8 max-[959px]:hidden">
                    {groups.map((g, i) => (
                      <a key={g.id} href={`#${g.id}`} className="group flex items-baseline gap-4 border-t border-line py-3.5 transition-[padding,color] duration-500 ease-expo last:border-b hover:pl-2 hover:text-accent-text">
                        <span className="idx !text-accent-text">{pad(i + 1, 2)}</span>
                        <span className="flex-1 text-[15px] font-medium">{g.name}</span>
                        <span className="text-[12px] text-muted">{pad(g.rows.length, 2)}</span>
                      </a>
                    ))}
                  </nav>
                )}
              </aside>

              <div className="flex flex-col gap-5">
                {groups.map((g, i) => (
                  <div key={g.id} id={g.id} className="scroll-mt-28 overflow-hidden rounded-[4px] border border-line bg-bg-2" data-reveal style={d(i * 0.05)}>
                    <div className="flex items-baseline gap-4 border-b border-line px-[clamp(20px,2.4vw,32px)] py-5">
                      <span className="idx !text-accent-text">{pad(i + 1, 2)}</span>
                      <h3 className="h-sm flex-1 font-medium">{g.name}</h3>
                      <span className="text-[12px] uppercase tracking-[.12em] text-muted">{g.rows.length} {g.rows.length === 1 ? "item" : "items"}</span>
                    </div>
                    <dl>
                      {g.rows.map(([k, v]) => {
                        const [main, note] = split(v);
                        const chips = main.split(/\s*\/\s*|,\s*/);
                        return (
                          <div key={k} className="group grid gap-x-8 gap-y-2 border-t border-line px-[clamp(20px,2.4vw,32px)] py-[18px] transition-colors duration-300 first:border-t-0 hover:bg-tint min-[640px]:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] min-[640px]:items-center">
                            <dt className="text-[14px] text-muted transition-colors duration-300 group-hover:text-accent-text">{k}</dt>
                            <dd className="flex flex-wrap items-center gap-2">
                              {chips.length > 1
                                ? chips.map((c) => <span key={c} className="rounded-full border border-line-2 bg-bg px-3 py-1 text-[14px] font-medium">{c}</span>)
                                : <span className="text-[clamp(16px,1.25vw,18px)] font-medium tracking-[-.01em]">{main}</span>}
                              {note && <span className="rounded-full bg-ghost px-2.5 py-1 text-[12px] text-soft">{note}</span>}
                            </dd>
                          </div>
                        );
                      })}
                    </dl>
                  </div>
                ))}
              </div>
            </div>
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
                  <span className="idx pt-1.5 !text-accent-text">{pad(i + 1, 2)}</span>
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
                <li key={a} data-reveal className="group flex items-baseline gap-[clamp(16px,2vw,32px)] border-t border-line-2 py-[clamp(18px,2vw,28px)] text-[clamp(20px,2.1vw,32px)] font-medium leading-[1.18] tracking-[-.025em] transition-[padding,color] duration-500 ease-expo last:border-b hover:pl-3 hover:text-accent-text">
                  <span className="idx flex-none">{pad(i + 1, 2)}</span>{a}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {!p.comingSoon && <CTABand text={ctaText} sub={ctaSub} label={ctaLabel} href="/contact/" />}
      <Pager p={p} />
    </>
  );
}
