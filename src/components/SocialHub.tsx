"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { Lines } from "./ui";

// Device bezel shared by the tablet and phone mockups.
const bezel = "relative bg-[linear-gradient(145deg,#2a2f37,#0a0c10_45%,#1b1f26)] shadow-[inset_0_0_0_1.5px_rgba(255,255,255,.14),0_50px_90px_-35px_rgba(0,0,0,.9),0_0_0_1px_rgba(0,0,0,.6)] transition-[transform,box-shadow] duration-[.9s,.6s] ease-expo group-hover:-translate-y-2 group-hover:shadow-[inset_0_0_0_1.5px_rgba(255,255,255,.2),0_50px_90px_-30px_rgba(56,182,255,.3),0_0_0_1px_rgba(0,0,0,.6)]";
const screen = "relative isolate h-full overflow-hidden [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:size-full [&_iframe]:border-0";

const InstaIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r=".8" fill="currentColor" /></svg>
);
const YtIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 002.4 7.2 26 26 0 002 12a26 26 0 00.4 4.8 2.5 2.5 0 001.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 001.8-1.8A26 26 0 0022 12a26 26 0 00-.4-4.8zM10 15V9l5.2 3L10 15z" /></svg>
);

// Tablet mockup playing the featured YouTube video in place.
function Tablet() {
  const [play, setPlay] = useState(false);
  const v = site.youtube.video;
  return (
    <figure className="group m-0 w-full flex-none min-[901px]:w-[min(760px,58vw)]" data-reveal>
      <div className={`${bezel} aspect-[16/10.4] rounded-[22px] p-2.5 min-[901px]:rounded-[34px] min-[901px]:p-[18px]`}>
        <div className={`${screen} rounded-[13px] bg-black min-[901px]:rounded-[18px]`}>
          {play ? (
            <iframe src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`} title={v.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
          ) : (
            <button className="absolute inset-0 w-full cursor-pointer border-0 bg-black p-0" onClick={() => setPlay(true)} aria-label={`Play video: ${v.title}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`} alt="" loading="lazy" className="absolute inset-0 size-full bg-[#0c0c0c] object-contain transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.03]" />
              <span className="absolute left-4 top-4 z-[2] inline-flex items-center gap-1.5 rounded-full bg-black/55 px-[11px] py-1.5 text-[11.5px] font-medium text-white backdrop-blur-[8px] [&_svg]:w-3.5 [&_svg]:text-[#ff0033]"><YtIcon />YouTube</span>
              <span className="absolute left-1/2 top-1/2 z-[2] grid size-[76px] -translate-1/2 place-items-center rounded-full bg-white/95 text-[#ff0033] shadow-[0_10px_30px_rgba(0,0,0,.4)] transition-transform duration-600 ease-expo group-hover:scale-[1.08]"><svg className="ml-1 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5l12 7-12 7z" /></svg></span>
            </button>
          )}
        </div>
        <span className="absolute left-1/2 top-[7px] size-1.5 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#33415a,#05070a_70%)]" aria-hidden="true" />
      </div>
    </figure>
  );
}

// Phone mockup showing MIVA's live Instagram profile (Instagram's embeddable profile view).
function Phone() {
  const ig = site.instagram;
  return (
    <figure className="group m-0 w-[min(300px,78vw)] flex-none min-[901px]:w-[clamp(220px,21vw,300px)]" data-reveal style={{ "--d": ".15s" } as React.CSSProperties}>
      <div className={`${bezel} aspect-[9/17] rounded-[46px] p-2.5`}>
        <div className={`${screen} rounded-[37px] bg-white before:absolute before:inset-x-0 before:top-0 before:h-10 before:bg-white before:content-[''] [&_iframe]:top-10 [&_iframe]:h-[calc(100%-40px)]`}>
          <iframe src={`${ig.url}embed/`} title={`MIVA Robotics on Instagram (${ig.handle})`} loading="lazy" scrolling="yes" />
          <span className="pointer-events-none absolute left-1/2 top-2.5 z-[3] h-6 w-[34%] -translate-x-1/2 rounded-full bg-black after:absolute after:right-[9px] after:top-[7px] after:size-2.5 after:rounded-full after:bg-[radial-gradient(circle_at_35%_35%,#33415a,#0b0f16_70%)] after:content-['']" aria-hidden="true" />
        </div>
      </div>
    </figure>
  );
}

const socBtn = "inline-flex items-center gap-3 rounded-full px-[30px] py-[17px] text-[15px] font-semibold text-white transition-transform duration-500 ease-expo hover:-translate-y-[3px] [&_svg]:w-5";

export default function SocialHub() {
  const { instagram: ig, youtube: yt } = site;
  return (
    <div className="grid justify-items-center text-center">
      <div className="[&_.eyebrow]:justify-center">
        <span className="eyebrow">{yt.handle} · {ig.handle}</span>
        <Lines className="h-lg" lines={["YouTube & Instagram"]} accent={1} />
      </div>
      <div className="mb-[clamp(40px,4vw,56px)] mt-[clamp(48px,5vw,72px)] flex w-full flex-col items-center justify-center gap-[clamp(24px,3.4vw,56px)] min-[901px]:flex-row min-[901px]:items-end">
        <Tablet />
        <Phone />
      </div>
      <div className="flex flex-wrap justify-center gap-3.5" data-reveal>
        <a className={`${socBtn} bg-[#e62117] shadow-[0_14px_34px_-14px_rgba(230,33,23,.8)]`} href={yt.url} target="_blank" rel="noopener noreferrer"><YtIcon />Subscribe on YouTube</a>
        <a className={`${socBtn} bg-[linear-gradient(90deg,#f9a03f,#e1306c_45%,#833ab4_80%,#5b51d8)] shadow-[0_14px_34px_-14px_rgba(225,48,108,.8)]`} href={ig.url} target="_blank" rel="noopener noreferrer"><InstaIcon />Follow on Instagram</a>
      </div>
    </div>
  );
}
