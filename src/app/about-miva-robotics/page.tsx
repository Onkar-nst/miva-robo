import Image from "next/image";
import { card, cardGrid, frame, fullImg, Lines, Marquee, pad } from "@/components/ui";
import ScrollButtons from "@/components/ScrollButtons";
import { about as a } from "@/content/pages";

export const metadata = { title: "About MIVA Robotics – MIVA Robotics", alternates: { canonical: "/about-miva-robotics/" } };

// Giant scrolling words: solid and outlined alternate.
const word = "whitespace-nowrap pr-[.6em] text-[clamp(40px,6vw,96px)] font-semibold uppercase leading-[1.25] tracking-[-.045em]";
const stat = "block text-[clamp(36px,3.2vw,46px)] font-medium leading-none tracking-[-.04em] tabular-nums";

// Phones turn a card grid into a snap-scrolling row; the 1px gaps still read as dividers.
const swipe = "max-[639px]:flex max-[639px]:snap-x max-[639px]:snap-mandatory max-[639px]:overflow-x-auto max-[639px]:[scrollbar-width:none]";
const swipeCard = "max-[639px]:w-[85%] max-[639px]:flex-none max-[639px]:snap-start";

const grid2 ="grid grid-cols-1 gap-[clamp(40px,6vw,110px)] min-[960px]:grid-cols-[5fr_7fr]";

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
          <div className={`${grid2} mb-8 min-[640px]:mb-12`}>
            <h2 className="h-lg" data-reveal>{a.intelligent.heading}</h2>
            <p className="lead self-end" data-reveal>{a.intelligent.text}</p>
          </div>
          <ScrollButtons target="intelligent-track" label="capability" className="mb-5 justify-end min-[640px]:hidden" />
          {/* Phones: a swipeable row of cards. Tablet up: the hairline grid. */}
          <div id="intelligent-track" className={`${cardGrid} ${swipe}`}>
            {a.intelligent.items.map((x, i) => (
              <article className={`${card} ${swipeCard}`} key={x.title} data-reveal><span className="idx">{pad(i + 1, 2)}</span><h3 className="h-sm">{x.title}</h3><p>{x.text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y light">
        <div className="wrap">
          <div className={`${grid2} mb-8 min-[640px]:mb-14`}>
            <h2 className="h-lg" data-reveal>{a.leaders.heading}</h2>
            <div className="stack lead">{a.leaders.text.map((t) => <p key={t} data-reveal>{t}</p>)}</div>
          </div>
          <ScrollButtons target="leaders-track" label="leader" className="mb-5 justify-end min-[640px]:hidden" />
          {/* Phones: a swipeable row of portraits that bleeds to the screen edges. Tablet up: a grid. */}
          <div id="leaders-track" className={`grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-[22px] ${swipe} max-[639px]:-mx-(--gutter) max-[639px]:scroll-px-(--gutter) max-[639px]:px-(--gutter)`}>
            {a.leaders.people.map((p, i) => {
              const quote = a.quotes.find((q) => q.by.startsWith(p.name.split(" /")[0]));
              return (
                <a className={`group relative flex flex-col ${swipeCard} max-[639px]:!w-[78%] max-[639px]:max-w-[300px]`} href={p.linkedin} target="_blank" rel="noopener noreferrer" key={p.name} data-reveal style={{ "--d": `${i * 0.1}s` } as React.CSSProperties}>
                  <div className={`${frame} aspect-[606/788] [&_img]:![transition:filter_.8s,transform_1.4s_var(--ease-expo)]`}><Image src={p.image} alt={p.name.split(" /")[0]} fill sizes="(max-width: 760px) 100vw, 33vw" /></div>
                  <h3 className="h-sm mt-[18px]">{p.name}</h3>
                  {quote && <blockquote className="mt-3 text-[15px] leading-[1.65] text-muted">{quote.text}</blockquote>}
                  <span className="eyebrow mt-auto pt-4">LinkedIn</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Systems: the heading on the left, the five systems strung along an arc on the right. */}
      <section className="section-y overflow-hidden">
        <div className="wrap grid items-center gap-12 min-[960px]:grid-cols-[5fr_7fr]">
          <h2 className="text-[clamp(36px,4.4vw,68px)] font-medium uppercase leading-[1.02] tracking-[-.035em] text-ink" data-reveal>
            {a.systems.heading.split(" ").map((w, i) => <span className="block" key={i}>{w}{i === 2 ? "." : ""}</span>)}
          </h2>
          <div className="relative [--bulge:clamp(70px,12vw,190px)]">
            {/* The arc is the parabola x = 2·bulge·t(1−t) down the list's height, run a little past both ends; each badge sits on it at its row's midpoint. */}
            <svg aria-hidden="true" className="absolute inset-y-0 left-0 h-full w-[calc(var(--bulge)*.5)] overflow-visible text-accent-text/50" viewBox="0 0 50 100" preserveAspectRatio="none" fill="none">
              <path d="M-34.5 -15Q134.5 50 -34.5 115" stroke="currentColor" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
            </svg>
            <ol className="relative grid auto-rows-fr">
              {a.systems.items.map((x, i) => (
                <li key={x.title} className="flex items-center gap-4 py-[clamp(10px,1.3vw,18px)]" style={{ marginLeft: `calc(var(--bulge) * ${[0.18, 0.42, 0.5, 0.42, 0.18][i]} - 15px)` }} data-reveal>
                  <span className="grid size-[30px] flex-none place-items-center rounded-full bg-[#0f5e87] text-[11px] font-semibold tabular-nums text-white ring-4 ring-bg">{pad(i + 1, 2)}</span>
                  <div>
                    <h3 className="text-[16px] font-semibold leading-[1.3] text-ink">{x.title}</h3>
                    <p className="mt-1 max-w-[52ch] text-[14px] leading-[1.55] text-muted">{x.text}</p>
                  </div>
                </li>
              ))}
            </ol>
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
            <div className="mt-8 pr-5"><b className={stat} data-count={a.beyond.stat.value}>{a.beyond.stat.value}</b><span className="mt-4 block max-w-[18ch] text-[13px] leading-[1.5] text-muted">{a.beyond.stat.label}</span></div>
          </div>
        </div>
      </section>

      {/* How it works: phase cards under a starred rule, the last phase picked out in pale blue, the disciplines along the foot. */}
      <section className="section-y light">
        <div className="wrap">
          <h2 className="text-[clamp(36px,4.4vw,68px)] font-medium uppercase leading-none tracking-[-.035em] text-ink" data-reveal>{a.how.heading}.</h2>
          <div className="mt-[clamp(32px,4vw,56px)] grid gap-x-2 gap-y-8 min-[760px]:grid-cols-3">
            {a.how.steps.map((x, i, all) => {
              const last = i === all.length - 1;
              return (
                <div key={x.title} data-reveal style={{ "--d": `${i * 0.1}s` } as React.CSSProperties}>
                  <div aria-hidden="true" className="mb-[clamp(18px,2vw,28px)] flex items-center gap-3 text-steel">
                    <span className="h-px flex-1 bg-line-2" /><svg className="w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" /></svg><span className="h-px flex-1 bg-line-2" />
                  </div>
                  <span className={`block rounded-[9px] py-2 text-center text-[13px] font-medium ${last ? "bg-[#c5dae6] text-ink" : "bg-[#24272b] text-white"}`}>Step {pad(i + 1, 2)}</span>
                  <article className={`mt-1.5 flex min-h-[190px] flex-col min-[760px]:min-h-[clamp(220px,19vw,290px)] justify-between gap-10 rounded-[11px] p-[clamp(18px,1.8vw,26px)] transition-transform duration-500 ease-expo hover:-translate-y-1 ${last ? "bg-[#c5dae6] text-ink" : "bg-[#24272b] text-white"}`}>
                    <h3 className={`text-[clamp(19px,1.7vw,25px)] font-normal uppercase leading-[1.15] tracking-[-.01em] ${last ? "text-ink" : "text-white"}`}>{pad(i + 1, 2)} {x.title}</h3>
                    <p className={`max-w-[36ch] text-[13.5px] leading-[1.55] ${last ? "text-soft" : "text-white/70"}`}>{x.text}</p>
                  </article>
                </div>
              );
            })}
          </div>
          <div className="mt-[clamp(44px,5vw,76px)] grid grid-cols-2 items-end gap-x-6 gap-y-5 border-t border-line pt-6 min-[640px]:grid-cols-3 min-[1100px]:grid-cols-[1.5fr_repeat(6,1fr)]">
            <span className="col-span-full text-[11.5px] font-semibold uppercase leading-[1.35] tracking-[.04em] text-ink min-[1100px]:col-span-1 min-[1100px]:max-w-[24ch]">{a.title}</span>
            {a.disciplines.map((t) => (
              <span key={t} className="text-[12px] leading-[1.35] text-soft before:mb-2 before:block before:h-0.5 before:w-3 before:bg-ink before:content-['']" data-reveal>{t}</span>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
