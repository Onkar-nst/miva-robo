"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { Lines } from "./ui";

// Device bezel shared by the tablet and phone mockups.
const bezel = "relative bg-[linear-gradient(145deg,#2a2f37,#0a0c10_45%,#1b1f26)] shadow-[inset_0_0_0_1.5px_rgba(255,255,255,.14),0_50px_90px_-40px_rgba(11,29,51,.55),0_0_0_1px_rgba(0,0,0,.2)] transition-[transform,box-shadow] duration-[.9s,.6s] ease-expo group-hover:-translate-y-2 group-hover:shadow-[inset_0_0_0_1.5px_rgba(255,255,255,.2),0_50px_90px_-30px_rgba(0,209,255,.3),0_0_0_1px_rgba(0,0,0,.6)]";
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
    <figure className="group m-0 min-w-0 flex-1 min-[700px]:w-[min(760px,58vw)] min-[700px]:flex-initial" data-reveal>
      <div className={`${bezel} aspect-[16/10.4] rounded-[14px] p-1.5 min-[700px]:rounded-[34px] min-[700px]:p-[18px]`}>
        <div className={`${screen} rounded-[9px] bg-black min-[700px]:rounded-[18px]`}>
          {play ? (
            <iframe src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`} title={v.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
          ) : (
            <button className="absolute inset-0 w-full cursor-pointer border-0 bg-black p-0" onClick={() => setPlay(true)} aria-label={`Play video: ${v.title}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`} alt="" loading="lazy" className="absolute inset-0 size-full bg-[#0c0c0c] object-contain transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.03]" />
              <span className="absolute left-2 top-2 z-[2] inline-flex items-center gap-1 rounded-full bg-black/55 px-2 py-1 text-[9px] font-medium text-white backdrop-blur-[8px] [&_svg]:w-2.5 [&_svg]:text-[#ff0033] min-[700px]:left-4 min-[700px]:top-4 min-[700px]:gap-1.5 min-[700px]:px-[11px] min-[700px]:py-1.5 min-[700px]:text-[11.5px] min-[700px]:[&_svg]:w-3.5"><YtIcon />YouTube</span>
              <span className="absolute left-1/2 top-1/2 z-[2] grid size-11 -translate-1/2 place-items-center rounded-full bg-white/95 text-[#ff0033] shadow-[0_10px_30px_rgba(0,0,0,.4)] transition-transform duration-600 ease-expo group-hover:scale-[1.08] min-[700px]:size-[76px]"><svg className="ml-0.5 w-4 min-[700px]:ml-1 min-[700px]:w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5l12 7-12 7z" /></svg></span>
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
    <figure className="group m-0 w-[31%] max-w-[150px] flex-none min-[700px]:w-[clamp(200px,21vw,300px)] min-[700px]:max-w-none" data-reveal style={{ "--d": ".15s" } as React.CSSProperties}>
      <div className={`${bezel} aspect-[9/17] rounded-[20px] p-1 min-[700px]:rounded-[46px] min-[700px]:p-2.5`}>
        <div className={`${screen} rounded-[16px] bg-white min-[700px]:rounded-[37px] min-[700px]:before:absolute min-[700px]:before:inset-x-0 min-[700px]:before:top-0 min-[700px]:before:h-10 min-[700px]:before:bg-white min-[700px]:before:content-[''] [&_iframe]:top-10 [&_iframe]:h-[calc(100%-40px)]`}>
          {/* Instagram's embed lays itself out for its on-screen width, which on phones is too narrow to read,
              so phones get a static profile card and larger screens get the live embed. */}
          <a href={ig.url} target="_blank" rel="noopener noreferrer" aria-label={`MIVA Robotics on Instagram (${ig.handle})`}
            className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-1.5 pt-3 text-center min-[700px]:hidden">
            <span className="mb-1 grid size-11 place-items-center rounded-full bg-[linear-gradient(45deg,#f9a03f,#e1306c_55%,#833ab4)] p-[2px]">
              <span className="grid size-full place-items-center rounded-full border-2 border-white bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/media/MIVA__ROBOTICS_Logo_White.svg" alt="" className="size-6 object-contain" />
              </span>
            </span>
            <b className="max-w-full truncate text-[10px] font-semibold leading-tight text-black">{ig.handle.replace(/^@/, "")}</b>
            <span className="text-[8.5px] leading-tight text-[#737373]">MIVA ROBOTICS</span>
            <span className="mt-1.5 rounded-md bg-[#0095f6] px-3.5 py-1 text-[9px] font-semibold text-white">Follow</span>
          </a>
          <iframe src={`${ig.url}embed/`} title={`MIVA Robotics on Instagram (${ig.handle})`} loading="lazy" scrolling="yes" className="max-[699px]:hidden" />
          <span className="pointer-events-none absolute left-1/2 top-1 z-[3] h-2.5 w-[34%] -translate-x-1/2 rounded-full bg-black after:absolute after:right-[9px] after:top-[7px] after:hidden after:size-2.5 after:rounded-full after:bg-[radial-gradient(circle_at_35%_35%,#33415a,#0b0f16_70%)] after:content-[''] min-[700px]:top-2.5 min-[700px]:h-6 min-[700px]:after:block" aria-hidden="true" />
        </div>
      </div>
    </figure>
  );
}

// Phones: two equal halves on one row with short labels (the icon names the platform).
const socBtn = "inline-flex items-center justify-center gap-2 rounded-full px-4 py-3.5 text-sm min-[700px]:gap-3 min-[700px]:px-[30px] min-[700px]:py-[17px] min-[700px]:text-[15px] font-semibold text-white transition-transform duration-500 ease-expo hover:-translate-y-[3px] [&_svg]:w-[18px] min-[700px]:[&_svg]:w-5";
const long = "max-[699px]:hidden";

export default function SocialHub() {
  const { instagram: ig, youtube: yt } = site;
  return (
    <div className="grid justify-items-center text-center">
      <div className="[&_.eyebrow]:justify-center">
        <span className="eyebrow">{yt.handle} · {ig.handle}</span>
        <Lines className="h-lg" lines={["YouTube & Instagram"]} accent={1} />
      </div>
      <div className="mb-[clamp(40px,4vw,56px)] mt-[clamp(48px,5vw,72px)] flex w-full items-end justify-center gap-[clamp(12px,3.4vw,56px)]">
        <Tablet />
        <Phone />
      </div>
      <div className="grid w-full grid-cols-2 gap-2.5 min-[700px]:flex min-[700px]:w-auto min-[700px]:flex-wrap min-[700px]:justify-center min-[700px]:gap-3.5" data-reveal>
        <a className={`${socBtn} bg-[#e62117] shadow-[0_14px_34px_-14px_rgba(230,33,23,.8)]`} href={yt.url} target="_blank" rel="noopener noreferrer" aria-label="Subscribe on YouTube"><YtIcon /><span>Subscribe<span className={long}> on YouTube</span></span></a>
        <a className={`${socBtn} bg-[linear-gradient(90deg,#f9a03f,#e1306c_45%,#833ab4_80%,#5b51d8)] shadow-[0_14px_34px_-14px_rgba(225,48,108,.8)]`} href={ig.url} target="_blank" rel="noopener noreferrer" aria-label="Follow on Instagram"><InstaIcon /><span>Follow<span className={long}> on Instagram</span></span></a>
      </div>
    </div>
  );
}
