import { about as a } from "@/content/pages";
import { pad } from "./ui";

// Two home-page sections that explain how MIVA works; `eyebrow` names the promise each one backs up.

const heading = "text-[clamp(36px,4.4vw,68px)] font-medium uppercase tracking-[-.035em] text-ink";
const eyebrowTag = (eyebrow?: string) => eyebrow && <span className="eyebrow mb-6" data-reveal>{eyebrow}</span>;

// The heading on the left, the five systems strung along an arc on the right.
export function SystemsArc({ eyebrow }: { eyebrow?: string }) {
  return (
    <section className="section-y overflow-hidden">
      <div className="wrap grid items-center gap-12 min-[960px]:grid-cols-[5fr_7fr]">
        <div>
          {eyebrowTag(eyebrow)}
          <h2 className={`${heading} leading-[1.02]`} data-reveal>
            {a.systems.heading.split(" ").map((w, i) => <span className="block" key={i}>{w}{i === 2 ? "." : ""}</span>)}
          </h2>
        </div>
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
  );
}

// Phase cards under a starred rule, the last phase picked out in pale blue, the disciplines along the foot.
export function HowItWorks({ eyebrow }: { eyebrow?: string }) {
  return (
    <section className="section-y light">
      <div className="wrap">
        {eyebrowTag(eyebrow)}
        <h2 className={`${heading} leading-none`} data-reveal>{a.how.heading}.</h2>
        <div className="mt-[clamp(32px,4vw,56px)] grid gap-x-2 gap-y-8 min-[760px]:grid-cols-3">
          {a.how.steps.map((x, i, all) => {
            const last = i === all.length - 1;
            return (
              <div key={x.title} data-reveal style={{ "--d": `${i * 0.1}s` } as React.CSSProperties}>
                <div aria-hidden="true" className="mb-[clamp(18px,2vw,28px)] flex items-center gap-3 text-steel">
                  <span className="h-px flex-1 bg-line-2" /><svg className="w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" /></svg><span className="h-px flex-1 bg-line-2" />
                </div>
                <span className={`block rounded-[9px] py-2 text-center text-[13px] font-medium ${last ? "bg-[#c5dae6] text-ink" : "bg-[#24272b] text-white"}`}>Step {pad(i + 1, 2)}</span>
                <article className={`mt-1.5 flex min-h-[190px] flex-col justify-between gap-10 rounded-[11px] p-[clamp(18px,1.8vw,26px)] transition-transform duration-500 ease-expo hover:-translate-y-1 min-[760px]:min-h-[clamp(220px,19vw,290px)] ${last ? "bg-[#c5dae6] text-ink" : "bg-[#24272b] text-white"}`}>
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
  );
}
