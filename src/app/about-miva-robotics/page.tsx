import Image from "next/image";
import { card, cardGrid, frame, fullImg, hairGrid, Lines, Marquee, pad, panel } from "@/components/ui";
import { about as a } from "@/content/pages";

export const metadata = { title: "About MIVA Robotics – MIVA Robotics", alternates: { canonical: "/about-miva-robotics/" } };

// Giant scrolling words: solid and outlined alternate.
const word = "whitespace-nowrap pr-[.6em] text-[clamp(40px,6vw,96px)] font-semibold uppercase leading-[1.25] tracking-[-.045em]";
const stat = "block text-[clamp(36px,3.2vw,46px)] font-medium leading-none tracking-[-.04em] tabular-nums";

const grid2 = "grid grid-cols-1 gap-[clamp(40px,6vw,110px)] min-[960px]:grid-cols-[5fr_7fr]";

export default function About() {
  return (
    <>
      <section className="pb-[clamp(31px,3.9vw,57px)] pt-[clamp(112px,11.7vw,156px)]">
        <div className="wrap"><Lines as="h1" className="h-xl" lines={[a.title]} /></div>
      </section>
      <div className={fullImg}><Image src="/media/Miva_About_Banner.jpg" alt="Miva_About_Banner" fill priority sizes="100vw" data-parallax="8" /></div>
      <Marquee>{a.disciplines.map((d, i) => <span className={`${word} ${i % 2 ? "text-transparent [-webkit-text-stroke:1px_rgba(11,29,51,.3)]" : ""}`} key={d}>{d}</span>)}</Marquee>

      <section className="section-y">
        <div className="wrap stack lead max-w-[1100px]">{a.intro.map((t) => <p key={t} data-reveal>{t}</p>)}</div>
      </section>

      <section className="section-y !pt-0">
        <div className="wrap">
          <div className={`${grid2} mb-12`}>
            <h2 className="h-lg" data-reveal>{a.intelligent.heading}</h2>
            <p className="lead self-end" data-reveal>{a.intelligent.text}</p>
          </div>
          <div className={cardGrid}>
            {a.intelligent.items.map((x, i) => (
              <article className={card} key={x.title} data-reveal><span className="idx">{pad(i + 1, 2)}</span><h3 className="h-sm">{x.title}</h3><p>{x.text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y light">
        <div className="wrap">
          <div className={`${grid2} mb-14`}>
            <h2 className="h-lg" data-reveal>{a.leaders.heading}</h2>
            <div className="stack lead">{a.leaders.text.map((t) => <p key={t} data-reveal>{t}</p>)}</div>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-[22px]">
            {a.leaders.people.map((p, i) => (
              <a className="group relative block" href={p.linkedin} target="_blank" rel="noopener noreferrer" key={p.name} data-reveal style={{ "--d": `${i * 0.1}s` } as React.CSSProperties}>
                <div className={`${frame} aspect-[606/788] [&_img]:![transition:filter_.8s,transform_1.4s_var(--ease-expo)]`}><Image src={p.image} alt={p.name.split(" /")[0]} fill sizes="(max-width: 760px) 100vw, 33vw" /></div>
                <h3 className="h-sm mt-[18px]">{p.name}</h3>
                <span className="eyebrow mt-2.5">LinkedIn</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="wrap">
          <h2 className="h-lg mb-11" data-reveal>{a.systems.heading}</h2>
          <div className={cardGrid}>
            {a.systems.items.map((x, i) => (
              <article className={card} key={x.title} data-reveal><span className="idx">{pad(i + 1, 2)}</span><h3 className="h-sm">{x.title}</h3><p>{x.text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y !pt-0">
        <div className={`wrap ${grid2}`}>
          <div>
            <span className="eyebrow">{a.beyond.eyebrow}</span>
            <Lines className="h-lg" lines={a.beyond.heading} />
            <div className="stack lead mt-7">{a.beyond.text.map((t) => <p key={t} data-reveal>{t}</p>)}</div>
          </div>
          <div>
            <div className="grid min-h-[480px] grid-cols-1 gap-3">
              <div className={`${frame} row-span-2 min-h-[200px]`} data-reveal="wipe"><Image src="/media/Miva_Robotics_About.jpg" alt="Miva_Robotics_About" fill sizes="50vw" /></div>
              <div className={`${frame} min-h-[200px]`} data-reveal="wipe"><Image src="/media/About-MIVA-Robotics.jpg" alt="About-MIVA-Robotics" fill sizes="50vw" /></div>
            </div>
            <p className="lead mt-7" data-reveal>{a.beyond.aside}</p>
            <div className="pr-5"><b className={stat} data-count={a.beyond.stat.value}>{a.beyond.stat.value}</b><span className="mt-4 block max-w-[18ch] text-[13px] leading-[1.5] text-muted">{a.beyond.stat.label}</span></div>
          </div>
        </div>
      </section>

      <section className="section-y light">
        <div className="wrap">
          <h2 className="h-lg mb-11" data-reveal>{a.how.heading}</h2>
          <div className={`${hairGrid} grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))]`}>
            {a.how.steps.map((x, i) => (
              <article className={panel} key={x.title} data-reveal style={{ "--d": `${i * 0.1}s` } as React.CSSProperties}>
                <span className="idx">{pad(i + 1, 2)}</span>
                <h3 className="h-md mb-4 mt-12">{x.title}</h3>
                <p className="text-[15px] text-muted">{x.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y light !pt-0">
        <div className="wrap"><div className={`${hairGrid} grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))]`}>
          {a.quotes.map((q) => <blockquote className={panel} key={q.by} data-reveal><cite className="mb-[18px] block text-[11.5px] font-medium not-italic uppercase tracking-[.14em] text-accent-text">{q.by}</cite><p className="text-base leading-[1.7] text-soft">{q.text}</p></blockquote>)}
        </div></div>
      </section>
    </>
  );
}
