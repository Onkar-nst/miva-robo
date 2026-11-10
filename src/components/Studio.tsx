import type { ReactNode } from "react";
import { Lines, Marquee } from "./ui";

export const delay = (s: number) => ({ "--d": `${s}s`, animationDelay: `${s}s` }) as React.CSSProperties;
const padX = "px-[clamp(20px,3.4vw,56px)]";
export const pill = "rounded-full !bg-[#a9cfe0] font-mono !text-[11px] uppercase tracking-[.14em] !text-[#14181d] before:rounded-full hover:!text-white";
export const ghostPill = "rounded-full !bg-transparent font-mono !text-[11px] uppercase tracking-[.14em] !text-[#14181d] shadow-[inset_0_0_0_1px_rgba(20,24,29,.45)] before:rounded-full hover:!text-white";

// The studio card itself: a grey rounded card with a lighter floor. On wide screens it fills the viewport, and grows
// past it rather than clipping its content on short ones.
function Card({ children }: { children: ReactNode }) {
  return (
    <section className="px-[clamp(10px,1.4vw,22px)] pb-[clamp(10px,1.4vw,22px)] pt-[88px]">
      <div className={`relative isolate flex flex-col overflow-hidden rounded-[clamp(18px,2vw,30px)] bg-[linear-gradient(180deg,#c9ced3,#dfe2e5_58%,#eceef0_72%,#f6f7f8)] ${padX} pt-[clamp(20px,2.6vw,36px)] text-[#14181d] min-[1000px]:min-h-[max(660px,calc(100svh-88px-clamp(10px,1.4vw,22px)))]`}>
        {/* Floor: a lighter plane meeting the backdrop, so the product reads as standing in a studio. */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-[30%] bg-[linear-gradient(180deg,#eef0f2,#f8f9fa)] shadow-[0_-1px_0_rgba(255,255,255,.7)]" />
        {children}
      </div>
    </section>
  );
}

const eyebrowPill = (text: string) => <span className="self-start rounded-full border border-[#14181d]/60 px-5 py-2 font-mono text-[10.5px] uppercase tracking-[.14em]" data-reveal>{text}</span>;
const footStrip = (foot: ReactNode) => foot && <div className="-mx-[clamp(20px,3.4vw,56px)] border-t border-[#14181d]/8 py-[clamp(18px,2.2vw,30px)]">{foot}</div>;

/* Home hero layout: an outlined pill, the title split across the top, a stage in the middle and a strip along the floor. */
export function Studio({ eyebrow, title, aside, actions, stage, foot }: {
  eyebrow: string;
  /** Headline lines, revealed word by word; `tail` finishes the h1 for assistive tech when `aside` shows it visually. */
  title: { lines: string[]; tail?: string };
  aside: ReactNode;
  actions?: ReactNode;
  stage: ReactNode;
  foot?: ReactNode;
}) {
  return (
    <Card>
      {eyebrowPill(eyebrow)}
      <div className="mt-[clamp(26px,3.6vw,52px)] grid items-start gap-6 min-[1000px]:grid-cols-[1fr_minmax(300px,29vw)] min-[1000px]:gap-10">
        <h1 className="text-[clamp(42px,6.4vw,108px)] font-medium leading-[.95] tracking-[-.055em] text-[#14181d]">
          <Lines as="span" className="block" lines={title.lines} />
          {title.tail && <span className="sr-only"> {title.tail}</span>}
        </h1>
        <div className="min-[1000px]:pt-[clamp(8px,1vw,16px)]" data-reveal style={delay(0.35)}>
          <span aria-hidden="true" className="mb-4 block h-[3px] w-9 bg-[#14181d]" />
          <div className="text-[clamp(20px,2vw,30px)] font-medium leading-[1.12] tracking-[-.03em] text-[#14181d]">{aside}</div>
          {actions && <div className="mt-7 flex flex-wrap gap-3">{actions}</div>}
        </div>
      </div>
      <div className="relative -mx-[clamp(20px,3.4vw,56px)] h-[min(78vw,340px)] min-[1000px]:h-auto min-[1000px]:min-h-[300px] min-[1000px]:flex-1">{stage}</div>
      {footStrip(foot)}
    </Card>
  );
}

/* Product and service hero layout: the story on the left (pill, title, dash and tagline, actions, read-outs)
   and large media filling the right-hand side to the card's full height. */
export function StudioSplit({ eyebrow, index, title, aside, actions, extra, media, foot }: {
  eyebrow: string;
  /** Small mono counter beside the pill, e.g. "03 / 06". */
  index?: string;
  title: string;
  aside: ReactNode;
  actions?: ReactNode;
  extra?: ReactNode;
  media: ReactNode;
  foot?: ReactNode;
}) {
  return (
    <Card>
      <div className="grid min-h-0 flex-1 gap-[clamp(28px,3.4vw,56px)] pb-[clamp(20px,2.6vw,36px)] min-[1000px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="flex min-w-0 flex-col">
          <div className="flex items-center gap-4">
            {eyebrowPill(eyebrow)}
            {index && <span className="font-mono text-[11px] tracking-[.16em] text-[#5b6672]" data-reveal>{index}</span>}
          </div>
          <div className="my-auto pt-[clamp(28px,4vw,56px)]">
            <h1 className="text-[clamp(44px,6vw,104px)] font-medium leading-[.92] tracking-[-.055em] text-[#14181d]"><Lines as="span" className="block" lines={[title]} /></h1>
            <div className="mt-[clamp(20px,2.4vw,34px)]" data-reveal style={delay(0.3)}>
              <span aria-hidden="true" className="mb-4 block h-[3px] w-9 bg-[#14181d]" />
              <div className="max-w-[26ch] text-[clamp(19px,1.7vw,26px)] font-medium leading-[1.18] tracking-[-.025em] text-[#14181d]">{aside}</div>
            </div>
            {actions && <div className="mt-[clamp(24px,2.6vw,36px)] flex flex-wrap gap-3" data-reveal style={delay(0.45)}>{actions}</div>}
          </div>
          {extra && <div className="mt-[clamp(24px,3vw,40px)]" data-reveal style={delay(0.6)}>{extra}</div>}
        </div>
        <div className="relative min-h-[clamp(280px,70vw,420px)] min-[1000px]:min-h-0">{media}</div>
      </div>
      {footStrip(foot)}
    </Card>
  );
}

// A strip that glides along the studio floor. It sits inside the card's padding and fades in and out at
// each end, so items enter and leave softly instead of being sliced by the card's edge.
export function FloorMarquee({ children }: { children: ReactNode }) {
  return (
    <div className={padX}>
      <Marquee className="[mask-image:linear-gradient(90deg,transparent,#000_16%,#000_84%,transparent)]">{children}</Marquee>
    </div>
  );
}

