import Image from "next/image";
import { CTABand, Lines, Marquee, pad } from "@/components/ui";
import { about as a } from "@/content/pages";
import { ctaText } from "@/content/products";

export const metadata = { title: "About MIVA Robotics – MIVA Robotics", alternates: { canonical: "/about-miva-robotics/" } };

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap"><Lines as="h1" className="h-xl metal" lines={[a.title]} /></div>
      </section>
      <div className="fullimg"><Image src="/media/Miva_About_Banner.jpg" alt="Miva_About_Banner" fill priority sizes="100vw" data-parallax="8" /><span className="scan" /></div>
      <Marquee>{a.disciplines.map((d, i) => <span className={`word ${i % 2 ? "stroke" : "metal"}`} key={d}>{d}</span>)}</Marquee>

      <section className="section">
        <div className="wrap stack lead" style={{ maxWidth: 1100 }}>{a.intro.map((t) => <p key={t} data-reveal>{t}</p>)}</div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="grid-2" style={{ marginBottom: 48 }}>
            <h2 className="h-lg" data-reveal>{a.intelligent.heading}</h2>
            <p className="lead" style={{ alignSelf: "end" }} data-reveal>{a.intelligent.text}</p>
          </div>
          <div className="cards">
            {a.intelligent.items.map((x, i) => (
              <article className="panel" key={x.title} data-reveal><span className="idx">{pad(i + 1, 2)}</span><h3 className="h-sm">{x.title}</h3><p>{x.text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-2)", borderBlock: "1px solid var(--line)" }}>
        <div className="wrap">
          <div className="grid-2" style={{ marginBottom: 56 }}>
            <h2 className="h-lg" data-reveal>{a.leaders.heading}</h2>
            <div className="stack lead">{a.leaders.text.map((t) => <p key={t} data-reveal>{t}</p>)}</div>
          </div>
          <div className="people">
            {a.leaders.people.map((p, i) => (
              <a className="person" href={p.linkedin} target="_blank" rel="noopener noreferrer" key={p.name} data-reveal style={{ "--d": `${i * 0.1}s` } as React.CSSProperties}>
                <div className="frame"><span className="ticks" /><Image src={p.image} alt={p.name.split(" /")[0]} fill sizes="(max-width: 760px) 100vw, 33vw" /></div>
                <h3 className="h-sm">{p.name}</h3>
                <span className="eyebrow" style={{ marginTop: 10 }}>LinkedIn</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="h-lg" style={{ marginBottom: 44 }} data-reveal>{a.systems.heading}</h2>
          <div className="cards">
            {a.systems.items.map((x, i) => (
              <article className="panel" key={x.title} data-reveal><span className="idx">{pad(i + 1, 2)}</span><h3 className="h-sm">{x.title}</h3><p>{x.text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap grid-2">
          <div>
            <span className="eyebrow">{a.beyond.eyebrow}</span>
            <Lines className="h-lg metal" lines={a.beyond.heading} />
            <div className="stack lead" style={{ marginTop: 28 }}>{a.beyond.text.map((t) => <p key={t} data-reveal>{t}</p>)}</div>
          </div>
          <div>
            <div className="collage" style={{ minHeight: 480, gridTemplateColumns: "1fr" }}>
              <div className="frame" data-reveal="wipe"><Image src="/media/Miva_Robotics_About.jpg" alt="Miva_Robotics_About" fill sizes="50vw" /></div>
              <div className="frame" data-reveal="wipe"><span className="scan" /><Image src="/media/About-MIVA-Robotics.jpg" alt="About-MIVA-Robotics" fill sizes="50vw" /></div>
            </div>
            <p className="lead" style={{ marginTop: 28 }} data-reveal>{a.beyond.aside}</p>
            <div className="stat"><b className="metal" data-count={a.beyond.stat.value}>{a.beyond.stat.value}</b><span>{a.beyond.stat.label}</span></div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2 className="h-lg" style={{ marginBottom: 44 }} data-reveal>{a.how.heading}</h2>
          <div className="steps">
            {a.how.steps.map((x, i) => (
              <article className="panel" key={x.title} data-reveal style={{ "--d": `${i * 0.1}s` } as React.CSSProperties}>
                <span className="idx">{pad(i + 1, 2)}</span>
                <h3 className="h-md" style={{ marginBlock: "48px 16px" }}>{x.title}</h3>
                <p className="muted">{x.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap quotes">
          {a.quotes.map((q) => <blockquote className="panel" key={q.by} data-reveal><cite>{q.by}</cite><p>{q.text}</p></blockquote>)}
        </div>
      </section>
      <CTABand text={ctaText} label="Contact Us" href="/contact/" />
    </>
  );
}
