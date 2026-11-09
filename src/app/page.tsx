import Image from "next/image";
import Link from "next/link";
import HeroArm from "@/components/HeroArm";
import HeroStage from "@/components/HeroStage";
import PostCard from "@/components/PostCard";
import ScrollButtons from "@/components/ScrollButtons";
import SocialHub from "@/components/SocialHub";
import Testimonials from "@/components/Testimonials";
import { ArrowR, circ, circHover, frame, Lines, pad, tag, TextLink } from "@/components/ui";
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
      <HeroStage />

      <section className="border-y border-line">
        {/* Phones: a swipeable row with the next card peeking in. Tablet up: 2 then 4 columns. */}
        <div className="wrap flex snap-x snap-mandatory scroll-px-(--gutter) overflow-x-auto [scrollbar-width:none] min-[700px]:grid min-[700px]:grid-cols-2 min-[700px]:overflow-visible min-[1100px]:grid-cols-4">
          {home.pillars.map((p, i) => (
            <div key={p.title} className="py-10 [&+&]:border-line max-[699px]:w-[74vw] max-[699px]:max-w-[300px] max-[699px]:flex-none max-[699px]:snap-start max-[699px]:pr-6 max-[699px]:[&+&]:border-l max-[699px]:[&+&]:pl-6 min-[700px]:[&+&]:border-t min-[700px]:even:border-l min-[700px]:even:border-line min-[700px]:even:pl-8 min-[700px]:[&:nth-child(2)]:border-t-0 min-[1100px]:border-t-0! min-[1100px]:px-8 min-[1100px]:py-11 min-[1100px]:[&+&]:border-l" data-reveal style={d(i * 0.08)}>
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
            <Link href="/about-miva-robotics/" className="group relative isolate flex min-h-[250px] flex-col justify-between overflow-hidden !bg-bg-2 p-8 after:absolute after:inset-0 after:-z-10 after:bg-[linear-gradient(90deg,rgba(255,255,255,.82),rgba(255,255,255,.62)_32%,rgba(255,255,255,0)_66%)] max-[759px]:after:bg-[linear-gradient(90deg,rgba(255,255,255,.88),rgba(255,255,255,.72)_58%,rgba(255,255,255,0))] after:content-['']" key={p} data-reveal style={d(i * 0.1)}>
              <Image src={i ? "/media/msme-automation.jpg" : "/media/ai-powered-robotics-msme.jpg"} alt="" fill sizes="(max-width: 900px) 100vw, 50vw"
                className="-z-20 object-cover transition-[transform,filter] duration-[1.4s,1s] ease-expo group-hover:scale-105" />
              <span className="max-w-[15ch] text-[19px] font-medium leading-[1.35] tracking-[-.015em]">{p}</span>
              <span className={`${circ} ${circHover} border-line-2`} aria-hidden="true"><ArrowR /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative border-t border-line max-[999px]:py-[clamp(47px,6.5vw,78px)] motion-reduce:py-[clamp(47px,6.5vw,78px)]" data-hscroll>
        <div className="flex flex-col justify-center gap-[clamp(28px,3.4vw,48px)] min-[1000px]:sticky min-[1000px]:top-0 min-[1000px]:h-svh min-[1000px]:overflow-hidden min-[1000px]:pt-[60px] motion-reduce:static motion-reduce:h-auto motion-reduce:overflow-visible motion-reduce:pt-0">
          <div className="wrap flex items-end justify-between gap-6">
            <div>
              <span className="eyebrow" />
              <Lines className="h-lg" lines={["Products"]} />
            </div>
            <p className="hidden text-sm tabular-nums text-muted min-[1000px]:block motion-reduce:hidden"><b className="text-[26px] font-semibold tracking-[-.02em] text-ink" data-hs-count>01</b> / {pad(products.length, 2)}</p>
            <ScrollButtons target="products-track" label="product" className="min-[1000px]:hidden min-[1000px]:motion-reduce:flex" />
          </div>
          <div id="products-track" className="hs-track flex gap-[22px] px-[max(var(--gutter),calc((100vw-1440px)/2+var(--gutter)))] will-change-transform max-[999px]:snap-x max-[999px]:snap-mandatory max-[999px]:scroll-px-(--gutter) max-[999px]:overflow-x-auto max-[999px]:[scrollbar-width:none] motion-reduce:overflow-x-auto">
            {products.map((p, i) => (
              <Link href={`/portfolio/${p.slug}/`} className="group block w-[min(78vw,340px)] flex-none snap-start min-[1000px]:w-[clamp(280px,26vw,380px)]" key={p.slug} data-reveal style={d((i % 3) * 0.08)}>
                <span className="relative mb-[22px] block aspect-square overflow-hidden bg-panel">
                  <Image src={p.hero} alt={p.name} fill sizes="(max-width: 1000px) 80vw, 30vw" className="object-cover saturate-[.8] transition-[transform,filter] duration-[1.2s,.8s] ease-expo group-hover:scale-105 group-hover:saturate-100" />
                  {p.comingSoon && <span className={tag}>Coming soon</span>}
                </span>
                <b className="mb-2.5 block text-sm font-semibold tracking-[.02em] transition-colors duration-300 group-hover:text-accent-text">{p.name}</b>
                <span className="block max-w-[30ch] text-sm leading-[1.6] text-muted">{p.tagline}</span>
              </Link>
            ))}
          </div>
          <div className="wrap hidden min-[1000px]:block motion-reduce:hidden"><span className="block h-px bg-line-2" aria-hidden="true"><i className="block h-full origin-left bg-ink [transform:scaleX(calc(var(--k,0)*.82+.18))]" /></span></div>
        </div>
      </section>

      <section className="section-y light overflow-hidden">
        <div className="wrap">
          <div className="mb-[clamp(36px,4vw,56px)] flex items-end justify-between gap-5">
            <div>
              <span className="eyebrow">Industry Focus Area</span>
              <Lines className="h-lg" lines={["MIVA enables intelligent", "automation across industries."]} accent={2} />
            </div>
            <ScrollButtons target="industries-track" label="industry" className="flex-none min-[640px]:hidden" />
          </div>
          {/* Phones: a swipeable row that bleeds to the screen edges. Tablet up: 2 then 3 columns. */}
          <div id="industries-track" className="flex snap-x snap-mandatory gap-x-[22px] overflow-x-auto [scrollbar-width:none] max-[639px]:-mx-(--gutter) max-[639px]:scroll-px-(--gutter) max-[639px]:px-(--gutter) min-[640px]:grid min-[640px]:grid-cols-2 min-[640px]:gap-y-12 min-[640px]:overflow-visible min-[1000px]:grid-cols-3">
            {home.industries.map((x, i) => (
              <article key={x.title} className="group hover:!shadow-none max-[639px]:w-[80vw] max-[639px]:max-w-[340px] max-[639px]:flex-none max-[639px]:snap-start" data-reveal style={d((i % 3) * 0.08)}>
                {/* Hover: the photo eases in and regains colour while an accent rule draws along its foot. */}
                <div className={`${frame} mb-[22px] aspect-[4/3] [&_img]:saturate-[.75] [&_img]:transition-[transform,filter] group-hover:[&_img]:scale-[1.06] group-hover:[&_img]:saturate-100
                  after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-700 after:ease-io after:content-[''] group-hover:after:scale-x-100`}>
                  <Image src={x.image} alt={x.title} fill sizes="(max-width: 760px) 100vw, 33vw" />
                </div>
                <span className="idx mb-2.5 block">{pad(i + 1, 2)}</span>
                <h3 className="h-sm mb-2.5 transition-colors duration-300 group-hover:text-accent-text">{x.title}</h3>
                <p className="max-w-[40ch] text-sm leading-[1.65] text-muted">{x.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Credence: a two-tone headline with the story beside it, the arm at work centre stage and the counts along the floor. */}
      <section className="relative overflow-hidden border-t border-line pt-[clamp(56px,6.5vw,100px)]">
        <div className="wrap relative">
          <div className="grid gap-6 min-[1000px]:grid-cols-[7fr_4fr] min-[1000px]:gap-12">
            <h2 className="text-[clamp(34px,4.6vw,72px)] font-medium uppercase leading-[1] tracking-[-.035em]" data-reveal>
              <span className="text-[#7a848e]">The hundred of completed works </span><span className="text-ink">still counting.</span>
            </h2>
            <p className="text-[15px] leading-[1.6] text-muted min-[1000px]:pt-2" data-reveal style={d(0.15)}>{home.credence.text}</p>
          </div>
          <div className="mt-6 grid items-end gap-x-6 gap-y-8 pb-[clamp(40px,4.5vw,72px)] max-[899px]:grid-cols-2 min-[900px]:grid-cols-[1fr_minmax(0,1.7fr)_1fr]">
            <div className="relative h-[clamp(300px,36vw,520px)] max-[899px]:order-first max-[899px]:col-span-2 min-[900px]:col-start-2 min-[900px]:row-start-1"><HeroArm detail /></div>
            {[home.credence.stats.slice(0, 2), home.credence.stats.slice(2)].map((col, c) => (
              <div key={c} className={`grid gap-[clamp(28px,3.4vw,52px)] min-[900px]:row-start-1 ${c ? "min-[900px]:col-start-3 min-[900px]:text-right min-[900px]:[&_span]:ml-auto" : "min-[900px]:col-start-1"}`}>
                {col.map((s, i) => (
                  <div key={s.label} data-reveal style={d((c * 2 + i) * 0.08)}>
                    <b className="block text-[clamp(40px,4.4vw,68px)] font-medium leading-none tracking-[-.045em] text-accent-text tabular-nums"><span className="inline" data-count={s.value} data-pad={s.pad}>{pad(s.value, s.pad)}</span><small className="ml-0.5 text-[.45em] font-medium tracking-normal">+</small></b>
                    <span className="mt-3 block max-w-[20ch] text-[13.5px] leading-[1.45] text-soft">{s.label}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

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
            <div className="flex items-center gap-5">
              <TextLink href="/category/blogs/">Blogs</TextLink>
              <ScrollButtons target="posts-track" label="post" className="min-[640px]:hidden" />
            </div>
          </div>
          {/* Phones: a swipeable row that bleeds to the screen edges. Tablet up: a grid. */}
          <div id="posts-track" className="flex snap-x snap-mandatory gap-x-5 overflow-x-auto [scrollbar-width:none] max-[639px]:-mx-(--gutter) max-[639px]:scroll-px-(--gutter) max-[639px]:px-(--gutter) max-[639px]:*:w-[80vw] max-[639px]:*:max-w-[340px] max-[639px]:*:flex-none max-[639px]:*:snap-start min-[640px]:grid min-[640px]:grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] min-[640px]:gap-y-11 min-[640px]:overflow-visible">{posts.map((p) => <PostCard key={p.slug} post={p} byline />)}</div>
        </div>
      </section>
    </>
  );
}
