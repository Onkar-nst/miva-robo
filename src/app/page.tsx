import Image from "next/image";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import RobotLoader from "@/components/RobotLoader";
import SocialHub from "@/components/SocialHub";
import { Check, CTA, Lines, Marquee, pad } from "@/components/ui";
import { home } from "@/content/pages";
import { posts } from "@/content/posts";

export const metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-bg"><Image src="/media/MIVA-Robotics-Hero-Section.jpg" alt="" fill priority sizes="100vw" /></div>
        <RobotLoader />
        <div className="hero-shade" />
        <div className="wrap hero-in">
          <span className="eyebrow">Introducing</span>
          <Lines as="h1" className="h-xl metal" lines={["MIVA", "Robotics"]} />
          <p className="lead" data-reveal>Accessible, Adaptable, Affordable automation for every scale.</p>
          <div data-reveal style={{ "--d": ".15s" } as React.CSSProperties}><CTA href="/about-miva-robotics/">ABOUT MIVA</CTA></div>
        </div>
        <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
          <div className="pillars">
            {home.pillars.map((p, i) => (
              <div key={p.title} data-reveal style={{ "--d": `${i * 0.09}s` } as React.CSSProperties}>
                <h2>{p.title}</h2><p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid-2">
          <div>
            <div className="frame" data-reveal="wipe" style={{ aspectRatio: "492/596" }}>
              <span className="scan" /><span className="ticks" />
              <Image src="/media/ai-powered-robotics-msme.jpg" alt="ai-powered-robotics-msme" fill sizes="(max-width: 960px) 100vw, 40vw" />
            </div>
          </div>
          <div style={{ alignSelf: "center" }}>
            <span className="eyebrow">Introducing MIVA Robotics</span>
            <h2 className="h-lg" style={{ marginBlock: 22 }} data-reveal>{home.intro.heading}</h2>
            <p className="lead" data-reveal>{home.intro.text}</p>
            <ul style={{ marginBlock: 30 }}>{home.intro.points.map((p) => <Check key={p}>{p}</Check>)}</ul>
            <div className="frame" data-reveal="wipe" style={{ aspectRatio: "16/8", marginBottom: 30 }}>
              <Image src="/media/ai-manufacturing-miva-robotics.jpg" alt="ai-manufacturing-miva-robotics" fill sizes="(max-width: 960px) 100vw, 50vw" />
            </div>
            <CTA href="/about-miva-robotics/">ABOUT MIVA</CTA>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap" style={{ marginBottom: 48 }}>
          <span className="eyebrow">Industry Focus Area</span>
          <h2 className="h-lg" style={{ marginTop: 20, maxWidth: "20ch" }} data-reveal>MIVA enables intelligent automation across industries.</h2>
        </div>
        <div className="ind">
          {home.industries.map((x, i) => (
            <article key={x.title} data-reveal style={{ "--d": `${(i % 3) * 0.08}s` } as React.CSSProperties}>
              <Image src={x.image} alt={x.title} fill sizes="(max-width: 760px) 100vw, 34vw" />
              <h3 className="h-md">{x.title}</h3>
              <p>{x.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="grid-2">
            <div>
              <span className="eyebrow">Credence</span>
              <h2 className="h-lg" style={{ marginTop: 20 }} data-reveal>{home.credence.heading}</h2>
            </div>
            <p className="lead" style={{ alignSelf: "end" }} data-reveal>{home.credence.text}</p>
          </div>
          <div className="stats">
            {home.credence.stats.map((s) => (
              <div className="stat" key={s.label}>
                <b className="metal" data-count={s.value} data-pad={s.pad} data-suffix="+">{pad(s.value, s.pad)}+</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Marquee>
        <div style={{ display: "flex" }}>
          {home.logos.map((l) => (
            <div className={`logo-chip ${/Make|Startup|JIIF/.test(l.alt) ? "color" : ""}`} key={l.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={l.src} alt={l.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </Marquee>

      <section className="section">
        <div className="wrap">
          <span className="eyebrow" style={{ marginBottom: 40 }}>Testimonials</span>
          <div className="tst" style={{ marginTop: 32 }}>
            {home.testimonials.map((t, i) => (
              <div className="panel" key={t.name} data-reveal style={{ "--d": `${i * 0.1}s` } as React.CSSProperties}>
                <blockquote>
                  <p>{t.quote}</p>
                  <footer>{t.name}<span>{t.role}</span></footer>
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section tight" style={{ background: "var(--bg-2)", borderBlock: "1px solid var(--line)" }}>
        <div className="wrap"><SocialHub /></div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="social-h" style={{ marginBottom: 36 }}>
            <h2 className="h-lg" data-reveal>Latest Posts</h2>
            <Link href="/category/blogs/" className="eyebrow">Blogs</Link>
          </div>
          <div className="posts">{posts.map((p) => <PostCard key={p.slug} post={p} />)}</div>
        </div>
      </section>
    </>
  );
}
