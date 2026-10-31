import Image from "next/image";
import Link from "next/link";
import HeroSlides from "@/components/HeroSlides";
import PostCard from "@/components/PostCard";
import SocialHub from "@/components/SocialHub";
import Testimonials from "@/components/Testimonials";
import { ArrowR, circ, circHover, CTA, frame, Lines, Marquee, pad, tag, TextLink } from "@/components/ui";
import { home } from "@/content/pages";
import { posts } from "@/content/posts";
import { products } from "@/content/products";

export const metadata = { alternates: { canonical: "/" } };

const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

const icons = [
  <path key="0" d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM19.4 13a7.6 7.6 0 000-2l2-1.6-2-3.4-2.4 1a7.4 7.4 0 00-1.7-1L15 3.5h-4l-.4 2.5a7.4 7.4 0 00-1.7 1l-2.4-1-2 3.4L6.6 11a7.6 7.6 0 000 2l-2 1.6 2 3.4 2.4-1a7.4 7.4 0 001.7 1l.4 2.5h4l.4-2.5a7.4 7.4 0 001.7-1l2.4 1 2-3.4z" />,
  <path key="1" d="M12 3l9 5-9 5-9-5 9-5zM3 12.5l9 5 9-5M3 16.5l9 5 9-5" />,
  <path key="2" d="M12 3a9 9 0 109 9M12 7a5 5 0 105 5M12 11a1 1 0 101 1" />,
  <path key="3" d="M3 11l4-4 3 1 3-3 4 1 4 4-7 7-2-2M3 11l6 6M7 13l3 3M10 10l4 4" />,
];

export default function Home() {
  return (
    <>
      <section data-robot-stage className="relative isolate flex h-svh min-h-[660px] flex-col justify-center overflow-hidden max-[759px]:justify-start max-[759px]:pt-16">
        <HeroSlides />
        <div className="wrap relative z-[2] pt-[84px]">
          <span className="eyebrow" data-reveal>Introducing MIVA Robotics</span>
          <Lines as="h1" className="h-xl !mt-7 max-w-[11.5em]" lines={["Accessible,", "Adaptable, Affordable", "automation for", "every scale."]} accent={3} />
          <div className="mt-11" data-reveal style={d(0.5)}><CTA href="/about-miva-robotics/">ABOUT MIVA</CTA></div>
        </div>
      </section>

      <section className="border-y border-line">
        <div className="wrap grid grid-cols-1 min-[700px]:grid-cols-2 min-[1100px]:grid-cols-4">
          {home.pillars.map((p, i) => (
            <div key={p.title} className="py-10 [&+&]:border-t [&+&]:border-line min-[700px]:even:border-l min-[700px]:even:border-line min-[700px]:even:pl-8 min-[700px]:[&:nth-child(2)]:border-t-0 min-[1100px]:border-t-0! min-[1100px]:px-8 min-[1100px]:py-11 min-[1100px]:[&+&]:border-l" data-reveal style={d(i * 0.08)}>
              <svg className="mb-[26px] w-6 text-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">{icons[i]}</svg>
              <h2 className="mb-3.5 max-w-[12ch] text-[15.5px] font-semibold leading-[1.25] tracking-[-.01em]">{p.title}</h2>
              <p className="max-w-[30ch] text-[13.5px] leading-[1.65] text-muted">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-y">
        <div className="wrap grid items-center gap-12 min-[900px]:grid-cols-[5fr_7fr] min-[900px]:gap-0">
          <div>
            <span className="eyebrow">Introducing MIVA Robotics</span>
            <Lines className="h-lg !mt-7" lines={["AI-Powered", "robotics for", "smart plants"]} accent={2} />
            <p className="body-lg mb-7 mt-[30px] max-w-[42ch]" data-reveal>{home.intro.text}</p>
            <div data-reveal><TextLink href="/about-miva-robotics/">ABOUT MIVA</TextLink></div>
          </div>
          <div className={`${frame} aspect-[16/10] min-[900px]:-mr-[max(var(--gutter),calc((100vw-1440px)/2+var(--gutter)))] min-[900px]:aspect-auto min-[900px]:h-[clamp(380px,34vw,500px)]`} data-reveal="wipe">
            <Image src="/media/ai-manufacturing-miva-robotics.jpg" alt="ai-manufacturing-miva-robotics" fill sizes="(max-width: 900px) 100vw, 55vw" data-parallax="5" />
          </div>
        </div>
        <div className="wrap mt-[clamp(56px,7vw,100px)] grid gap-5 min-[760px]:grid-cols-2">
          {home.intro.points.map((p, i) => (
            <Link href="/about-miva-robotics/" className="group relative isolate flex min-h-[250px] flex-col justify-between overflow-hidden !bg-bg-2 p-8 after:absolute after:inset-0 after:-z-10 after:bg-[linear-gradient(90deg,rgba(255,255,255,.96)_34%,rgba(255,255,255,.25))] after:content-['']" key={p} data-reveal style={d(i * 0.1)}>
              <Image src={i ? "/media/msme-automation.jpg" : "/media/ai-powered-robotics-msme.jpg"} alt="" fill sizes="(max-width: 900px) 100vw, 50vw"
                className="-z-20 object-cover transition-[transform,filter] duration-[1.4s,1s] ease-expo group-hover:scale-105" />
              <span className="max-w-[15ch] text-[19px] font-medium leading-[1.35] tracking-[-.015em]">{p}</span>
              <span className={`${circ} ${circHover} border-line-2`} aria-hidden="true"><ArrowR /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative border-t border-line max-[999px]:py-[clamp(72px,10vw,120px)] motion-reduce:py-[clamp(72px,10vw,120px)]" data-hscroll>
        <div className="flex flex-col justify-center gap-[clamp(28px,3.4vw,48px)] min-[1000px]:sticky min-[1000px]:top-0 min-[1000px]:h-svh min-[1000px]:overflow-hidden min-[1000px]:pt-[60px] motion-reduce:static motion-reduce:h-auto motion-reduce:overflow-visible motion-reduce:pt-0">
          <div className="wrap flex items-end justify-between gap-6">
            <div>
              <span className="eyebrow" />
              <Lines className="h-lg" lines={["Products"]} />
            </div>
            <p className="hidden text-sm tabular-nums text-muted min-[1000px]:block motion-reduce:hidden"><b className="text-[26px] font-semibold tracking-[-.02em] text-ink" data-hs-count>01</b> / {pad(products.length, 2)}</p>
          </div>
          <div className="hs-track flex gap-[22px] px-[max(var(--gutter),calc((100vw-1440px)/2+var(--gutter)))] will-change-transform max-[999px]:snap-x max-[999px]:snap-mandatory max-[999px]:overflow-x-auto max-[999px]:[scrollbar-width:none] motion-reduce:overflow-x-auto">
            {products.map((p, i) => (
              <Link href={`/portfolio/${p.slug}/`} className="group block w-[min(78vw,340px)] flex-none snap-start min-[1000px]:w-[clamp(280px,26vw,380px)]" key={p.slug} data-reveal style={d((i % 3) * 0.08)}>
                <span className="relative mb-[22px] block aspect-square overflow-hidden bg-panel">
                  <Image src={p.hero} alt={p.name} fill sizes="(max-width: 1000px) 80vw, 30vw" className="object-cover saturate-[.8] transition-[transform,filter] duration-[1.2s,.8s] ease-expo group-hover:scale-105 group-hover:saturate-100" />
                  {p.comingSoon && <span className={tag}>Coming soon</span>}
                </span>
                <b className="mb-2.5 block text-sm font-semibold tracking-[.02em] transition-colors duration-300 group-hover:text-accent">{p.name}</b>
                <span className="block max-w-[30ch] text-sm leading-[1.6] text-muted">{p.tagline}</span>
              </Link>
            ))}
          </div>
          <div className="wrap hidden min-[1000px]:block motion-reduce:hidden"><span className="block h-px bg-line-2" aria-hidden="true"><i className="block h-full origin-left bg-ink [transform:scaleX(calc(var(--k,0)*.82+.18))]" /></span></div>
        </div>
      </section>

      <section className="section-y light overflow-hidden border-t border-line">
        <Marquee className="mb-[clamp(28px,3vw,44px)]" trackClassName="[animation-duration:45s]">
          <div style={{ display: "flex" }}>
            {home.industries.map((x) => <span className="inline-flex items-center whitespace-nowrap text-[clamp(32px,4.4vw,68px)] font-semibold leading-[1.1] tracking-[-.03em] text-ghost" key={x.title}>{x.title}<i aria-hidden="true" className="mx-[.55em] inline-block size-[.14em] rounded-full bg-accent opacity-55" /></span>)}
          </div>
        </Marquee>
        <div className="wrap">
          <div className="mb-[clamp(36px,4vw,56px)]">
            <div>
              <span className="eyebrow">Industry Focus Area</span>
              <Lines className="h-lg" lines={["MIVA enables intelligent", "automation across industries."]} accent={2} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-x-[22px] gap-y-12 min-[640px]:grid-cols-2 min-[1000px]:grid-cols-3">
            {home.industries.map((x, i) => (
              <article key={x.title} className="group" data-reveal style={d((i % 3) * 0.08)}>
                <div className={`${frame} mb-[22px] aspect-[4/3] [&_img]:saturate-[.75] group-hover:[&_img]:scale-105 group-hover:[&_img]:saturate-100`}><Image src={x.image} alt={x.title} fill sizes="(max-width: 760px) 100vw, 33vw" /></div>
                <span className="idx mb-2.5 block">{pad(i + 1, 2)}</span>
                <h3 className="h-sm mb-2.5">{x.title}</h3>
                <p className="max-w-[40ch] text-sm leading-[1.65] text-muted">{x.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="deep py-[clamp(64px,7vw,96px)]">
        <div className="wrap grid gap-10 min-[1000px]:grid-cols-[3fr_9fr] min-[1000px]:gap-0">
          <div>
            <span className="eyebrow">Credence</span>
            <Lines className="h-md" lines={["The hundred", "of completed", "works still", "counting"]} accent={2} />
          </div>
          <div className="min-[1000px]:border-l min-[1000px]:border-line min-[1000px]:pl-12">
            <p className="body-lg max-w-[62ch]" data-reveal>{home.credence.text}</p>
            <div className="mt-11 grid grid-cols-2 gap-y-8 min-[900px]:grid-cols-4">
              {home.credence.stats.map((s, i) => (
                <div key={s.label} className="pr-5 [&+&]:border-l [&+&]:border-line [&+&]:pl-6 max-[899px]:[&:nth-child(3)]:border-l-0 max-[899px]:[&:nth-child(3)]:pl-0" data-reveal style={d(i * 0.08)}>
                  <b className="block text-[clamp(36px,3.2vw,46px)] font-medium leading-none tracking-[-.04em] tabular-nums" data-count={s.value} data-pad={s.pad} data-suffix="+">{pad(s.value, s.pad)}+</b>
                  <span className="mt-4 block max-w-[18ch] text-[13px] leading-[1.5] text-muted">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="deep border-t border-line">
        <Marquee className="[mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]" trackClassName="hover:[animation-play-state:paused]">
          <div style={{ display: "flex" }}>
            {home.logos.map((l) => (
              <div className="grid h-[110px] w-[220px] place-items-center px-9 py-7" key={l.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.src} alt={l.alt} loading="lazy" className={`max-h-9 w-auto object-contain transition-opacity duration-400 hover:opacity-100 ${/Make|Startup|JIIF/.test(l.alt) ? "bg-white p-1.5 opacity-55 grayscale hover:grayscale-0" : "opacity-60 [filter:grayscale(1)_brightness(0)_invert(1)]"}`} />
              </div>
            ))}
          </div>
        </Marquee>
      </div>

      <section className="section-y">
        <div className="wrap"><Testimonials /></div>
      </section>

      <section className="section-tight overflow-hidden border-t border-line">
        <div className="wrap"><SocialHub /></div>
      </section>

      <section className="section-y border-t border-line">
        <div className="wrap">
          <div className="mb-[clamp(36px,4vw,56px)] flex flex-wrap items-end justify-between gap-6">
            <Lines className="h-md" lines={["Latest Posts"]} />
            <TextLink href="/category/blogs/">Blogs</TextLink>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-x-5 gap-y-11">{posts.map((p) => <PostCard key={p.slug} post={p} byline />)}</div>
        </div>
      </section>
    </>
  );
}
