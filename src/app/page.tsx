import Image from "next/image";
import Link from "next/link";
import HeroSlides from "@/components/HeroSlides";
import PostCard from "@/components/PostCard";
import SocialHub from "@/components/SocialHub";
import Testimonials from "@/components/Testimonials";
import { ArrowR, CTA, Lines, Marquee, pad, TextLink } from "@/components/ui";
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
      <section className="hero">
        <HeroSlides />
        <div className="wrap hero-in">
          <span className="eyebrow" data-reveal>Introducing MIVA Robotics</span>
          <Lines as="h1" className="h-xl" lines={["Accessible,", "Adaptable, Affordable", "automation for", "every scale."]} accent={3} />
          <div className="hero-cta" data-reveal style={d(0.5)}><CTA href="/about-miva-robotics/">ABOUT MIVA</CTA></div>
        </div>
      </section>

      <section className="pillars">
        <div className="wrap pillars-in">
          {home.pillars.map((p, i) => (
            <div className="pillar" key={p.title} data-reveal style={d(i * 0.08)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">{icons[i]}</svg>
              <h2>{p.title}</h2>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section intro light">
        <div className="wrap intro-grid">
          <div className="intro-copy">
            <span className="eyebrow">Introducing MIVA Robotics</span>
            <Lines className="h-lg" lines={["AI-Powered", "robotics for", "smart plants"]} accent={2} />
            <p className="body-lg" data-reveal>{home.intro.text}</p>
            <div data-reveal><TextLink href="/about-miva-robotics/">ABOUT MIVA</TextLink></div>
          </div>
          <div className="intro-media frame" data-reveal="wipe">
            <Image src="/media/ai-manufacturing-miva-robotics.jpg" alt="ai-manufacturing-miva-robotics" fill sizes="(max-width: 900px) 100vw, 55vw" data-parallax="5" />
          </div>
        </div>
        <div className="wrap points">
          {home.intro.points.map((p, i) => (
            <Link href="/about-miva-robotics/" className="point dark" key={p} data-reveal style={d(i * 0.1)}>
              <Image src={i ? "/media/msme-automation.jpg" : "/media/ai-powered-robotics-msme.jpg"} alt="" fill sizes="(max-width: 900px) 100vw, 50vw" />
              <span className="point-t">{p}</span>
              <span className="circ" aria-hidden="true"><ArrowR /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="hs" data-hscroll>
        <div className="hs-sticky">
          <div className="wrap hs-head">
            <div>
              <span className="eyebrow" />
              <Lines className="h-lg" lines={["Products"]} />
            </div>
            <p className="hs-count"><b data-hs-count>01</b> / {pad(products.length, 2)}</p>
          </div>
          <div className="hs-track">
            {products.map((p, i) => (
              <Link href={`/portfolio/${p.slug}/`} className="prod" key={p.slug} data-reveal style={d((i % 3) * 0.08)}>
                <span className="prod-img">
                  <Image src={p.hero} alt={p.name} fill sizes="(max-width: 1000px) 80vw, 30vw" />
                  {p.comingSoon && <span className="tag">Coming soon</span>}
                </span>
                <b>{p.name}</b>
                <span className="prod-t">{p.tagline}</span>
              </Link>
            ))}
          </div>
          <div className="wrap"><span className="hs-progress" aria-hidden="true"><i /></span></div>
        </div>
      </section>

      <section className="section ind-sec light">
        <Marquee className="giant">
          <div style={{ display: "flex" }}>
            {home.industries.map((x) => <span className="giant-w" key={x.title}>{x.title}<i aria-hidden="true" /></span>)}
          </div>
        </Marquee>
        <div className="wrap">
          <div className="split-head">
            <div>
              <span className="eyebrow">Industry Focus Area</span>
              <Lines className="h-lg" lines={["MIVA enables intelligent", "automation across industries."]} accent={2} />
            </div>
          </div>
          <div className="ind">
            {home.industries.map((x, i) => (
              <article key={x.title} data-reveal style={d((i % 3) * 0.08)}>
                <div className="frame"><Image src={x.image} alt={x.title} fill sizes="(max-width: 760px) 100vw, 33vw" /></div>
                <span className="idx">{pad(i + 1, 2)}</span>
                <h3 className="h-sm">{x.title}</h3>
                <p>{x.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cred">
        <div className="wrap cred-in">
          <div>
            <span className="eyebrow">Credence</span>
            <Lines className="h-md" lines={["The hundred", "of completed", "works still", "counting"]} accent={2} />
          </div>
          <div className="cred-body">
            <p className="body-lg" data-reveal>{home.credence.text}</p>
            <div className="stats">
              {home.credence.stats.map((s, i) => (
                <div className="stat" key={s.label} data-reveal style={d(i * 0.08)}>
                  <b data-count={s.value} data-pad={s.pad} data-suffix="+">{pad(s.value, s.pad)}+</b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Marquee className="logos">
        <div style={{ display: "flex" }}>
          {home.logos.map((l) => (
            <div className={`logo-chip ${/Make|Startup|JIIF/.test(l.alt) ? "color" : ""}`} key={l.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={l.src} alt={l.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </Marquee>

      <section className="section tst-sec light">
        <div className="wrap"><Testimonials /></div>
      </section>

      <section className="section tight social-sec">
        <div className="wrap"><SocialHub /></div>
      </section>

      <section className="section light">
        <div className="wrap">
          <div className="split-head">
            <Lines className="h-md" lines={["Latest Posts"]} />
            <TextLink href="/category/blogs/">Blogs</TextLink>
          </div>
          <div className="posts">{posts.map((p) => <PostCard key={p.slug} post={p} byline />)}</div>
        </div>
      </section>
    </>
  );
}
