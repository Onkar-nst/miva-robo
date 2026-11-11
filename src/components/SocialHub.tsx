"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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

const LiIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg>
);

// Tablet mockup playing the featured YouTube video in place.
function Tablet() {
  const [play, setPlay] = useState(false);
  const v = site.youtube.video;
  return (
    <figure className="group m-0 min-w-0 flex-1 min-[700px]:w-[min(760px,58vw)] min-[700px]:flex-initial min-[1000px]:w-[min(660px,44vw)]" data-reveal>
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

// The two phones show MIVA's Instagram and LinkedIn pages as each app draws them in dark mode. Every screen is
// built at a natural phone width and scaled down as one piece to fit its mockup.
const SCREEN_W = 360;
const IG_GRID = { top: 147, h: 240 }; // where the embed's 3×2 grid sits at 360px wide

const ig = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;
const Reels = ({ className = "" }) => <svg {...ig} className={className}><rect x="3" y="3" width="18" height="18" rx="5" /><path d="M3 8.5h18M8.5 3l3 5.5M14.5 3l3 5.5M10.5 11.5v6l5-3z" /></svg>;

const StatusBar = () => (
  <div className="flex h-[50px] flex-none items-end justify-between px-8 pb-1 text-[15px] font-semibold text-white">
    <span>9:41</span>
    <svg viewBox="0 0 46 12" className="w-[46px]" fill="#fff" aria-hidden="true"><rect x="0" y="7" width="3" height="5" rx="1" /><rect x="5" y="5" width="3" height="7" rx="1" /><rect x="10" y="2.5" width="3" height="9.5" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /><rect x="24" y=".5" width="19" height="11" rx="3" fill="none" stroke="#fff" /><rect x="26" y="2.5" width="13" height="7" rx="1.5" /><rect x="44" y="4" width="1.5" height="4" rx=".7" /></svg>
  </div>
);

// Instagram profile. Only the post grid is live: Instagram's profile embed, cropped to its grid (the embed's own
// header is a squeezed light-mode layout).
function InstaScreen() {
  const { instagram: { profile: pr, handle } } = site;
  const name = handle.replace(/^@/, "");
  return (
    <div className="flex h-full flex-col bg-[#0c1014] text-left text-[15px] leading-[1.3] text-[#f5f5f5]">
      <StatusBar />
      <div className="relative flex h-11 flex-none items-center justify-center px-4">
        <svg {...ig} className="absolute left-3 w-7"><path d="M15 5l-7 7 7 7" /></svg>
        <b className="text-[17px] font-bold">{name}</b>
      </div>

      <div className="flex-none px-4 pt-3">
        <div className="flex items-center gap-6">
          <span className="grid size-[86px] flex-none place-items-center rounded-full bg-black ring-1 ring-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/MIVA-Mark-White.svg" alt="" className="w-[56%]" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3"><b className="text-[17px] font-semibold">{name}</b><span className="tracking-[2px] text-[17px] leading-none">···</span></div>
            <div className="mt-2.5 flex justify-between pr-1">
              {pr.stats.map(([n, l]) => <span key={l} className="text-[14px] leading-[1.25]"><b className="block text-[15px] font-semibold">{n}</b>{l}</span>)}
            </div>
          </div>
        </div>
        <b className="mt-3.5 block text-[14px] font-semibold">{pr.name}</b>
        <span className="block text-[14px] text-[#a8a8a8]">{pr.category}</span>
        <p className="mt-0.5 line-clamp-3 text-[14px]">{pr.bio}… <span className="text-[#a8a8a8]">more</span></p>
        <span className="mt-1 flex items-center gap-1.5 text-[14px] font-semibold">
          <svg {...ig} className="w-4 -rotate-45"><path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1" /></svg>{pr.link} and 1 more
        </span>
        <div className="mt-3.5 flex gap-1.5 text-[14px] font-semibold">
          <span className="flex-1 rounded-lg bg-[#4a5df9] py-[7px] text-center text-white">Follow</span>
          <span className="flex-1 rounded-lg bg-[#25292e] py-[7px] text-center">Message</span>
          <span className="grid w-9 place-items-center rounded-lg bg-[#25292e]"><svg {...ig} className="w-4"><circle cx="10" cy="8" r="4" /><path d="M3 20a7 7 0 0114 0M19 8v6M16 11h6" /></svg></span>
        </div>
        <div className="mt-4 flex w-[68px] flex-col items-center gap-1.5">
          <span className="relative size-[64px] overflow-hidden rounded-full ring-1 ring-[#363636] ring-offset-[3px] ring-offset-[#0c1014]">
            <Image src={pr.highlight.image} alt="" fill sizes="64px" className="object-cover" />
          </span>
          <span className="whitespace-nowrap text-[12px]">{pr.highlight.label}</span>
        </div>
      </div>

      {/* Grid, reels and tagged tabs; the grid is live. */}
      <div className="mt-3 grid flex-none grid-cols-3 border-b border-[#262626] text-[#a8a8a8]">
        <span className="grid h-11 place-items-center border-b border-white text-white"><svg viewBox="0 0 24 24" className="w-6" fill="currentColor" aria-hidden="true">{[3, 9.5, 16].flatMap((x) => [3, 9.5, 16].map((y) => <rect key={`${x}${y}`} x={x} y={y} width="5" height="5" rx="1" />))}</svg></span>
        <span className="grid h-11 place-items-center"><Reels className="w-6" /></span>
        <span className="grid h-11 place-items-center"><svg {...ig} className="w-6"><rect x="3" y="4" width="18" height="16" rx="4" /><circle cx="12" cy="10.5" r="2.8" /><path d="M7.5 20a4.5 4.5 0 019 0M9.5 4l1-1.5h3l1 1.5" /></svg></span>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <iframe src={`${site.instagram.url}embed/`} title={`Latest posts from MIVA Robotics on Instagram (${handle})`} loading="lazy" scrolling="no" tabIndex={-1}
          className="absolute left-0 w-full border-0" style={{ top: -IG_GRID.top, height: IG_GRID.top + IG_GRID.h }} />
      </div>

      {/* Bottom tab bar. */}
      <div className="flex flex-none items-center justify-between border-t border-[#262626] bg-[#0c1014] px-7 pb-6 pt-2.5 [&_svg]:w-[26px]">
        <svg {...ig}><path d="M4 21V10.5L12 4l8 6.5V21h-5.5v-6.5h-5V21z" /></svg>
        <svg {...ig}><circle cx="11" cy="11" r="7" /><path d="M16.5 16.5L21 21" /></svg>
        <Reels />
        <svg {...ig}><path d="M21.5 3L10 14.5M21.5 3l-7 18-4.5-6.5L3 10z" /></svg>
        <span className="relative size-[26px] overflow-hidden rounded-full bg-[#1e2a38] ring-1 ring-white/30" aria-hidden="true" />
      </div>
    </div>
  );
}

// LinkedIn company page.
function LinkedInScreen() {
  const host = site.url.replace(/^https?:\/\//, "www.");
  const tabs = ["Home", "About", "Posts", "Jobs", "People"];
  return (
    <div className="flex h-full flex-col bg-black text-left text-[14px] leading-[1.4] text-white/90">
      <div className="flex-none bg-[#1b1f23]">
        <StatusBar />
        <div className="flex h-12 items-center gap-3 px-3">
          <svg {...ig} className="w-6 flex-none text-white/90"><path d="M15 5l-7 7 7 7" /></svg>
          <span className="flex h-[34px] flex-1 items-center gap-2 rounded-[4px] bg-[#38434f] px-3 text-white/70">
            <svg {...ig} className="w-4"><circle cx="11" cy="11" r="7" /><path d="M16.5 16.5L21 21" /></svg>{site.name}
          </span>
          <svg {...ig} className="w-6 flex-none text-white/90"><path d="M4 6h16v10H8l-4 4z" /></svg>
        </div>
      </div>
      <div className="flex-none bg-[#1b1f23] pb-3">
        <div className="relative grid h-[96px] place-items-center bg-[linear-gradient(120deg,#0b1d33,#10325a_60%,#0a66c2)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/MIVA-ROBOTICS-Wordmark.svg" alt="" className="w-[58%] opacity-90" />
        </div>
        <div className="px-4">
          <span className="relative z-[1] -mt-9 grid size-[76px] place-items-center rounded-[6px] border-[3px] border-[#1b1f23] bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/MIVA-Mark-White.svg" alt="" className="w-[58%]" />
          </span>
          <b className="mt-2 block text-[21px] font-semibold leading-tight text-white">{site.name}</b>
          <p className="mt-1">Accessible, Adaptable, Affordable automation for every scale.</p>
          <span className="mt-1 block text-[13px] text-white/60">{site.linkedin.replace(/^https:\/\/www\.|\/$/g, "")}</span>
          <div className="mt-3 flex gap-2 text-[15px] font-semibold">
            <span className="flex-1 rounded-full bg-[#71b7fb] py-[6px] text-center text-black">+ Follow</span>
            <span className="flex flex-1 items-center justify-center gap-1.5 rounded-full py-[6px] text-[#71b7fb] ring-1 ring-[#71b7fb]">Visit website<svg {...ig} className="w-3.5"><path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6" /></svg></span>
            <span className="grid w-[34px] place-items-center rounded-full text-white/70 ring-1 ring-white/60">···</span>
          </div>
        </div>
      </div>
      <div className="flex flex-none justify-between border-t border-white/10 bg-[#1b1f23] px-4 text-[14px] font-semibold text-white/60">
        {tabs.map((t, i) => <span key={t} className={`py-3 ${i ? "" : "border-b-2 border-[#01754f] text-[#4fb88a]"}`}>{t}</span>)}
      </div>
      <div className="mt-2 min-h-0 flex-1 overflow-hidden bg-[#1b1f23] px-4 pt-3">
        <b className="block text-[18px] font-semibold text-white">Overview</b>
        <p className="mt-2">{site.footerBlurb}</p>
        <b className="mt-3 block text-[14px] font-semibold text-white">Website</b>
        <span className="block font-semibold text-[#71b7fb]">{host}</span>
      </div>
      <div className="flex flex-none items-end justify-between border-t border-white/10 bg-[#1b1f23] px-4 pb-5 pt-2 text-[10.5px] text-white/60 [&_svg]:mx-auto [&_svg]:mb-0.5 [&_svg]:w-6">
        {[
          ["Home", <path key="h" d="M4 21V10.5L12 4l8 6.5V21h-5.5v-6.5h-5V21z" />],
          ["My Network", <g key="n"><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0113 0M16 4.8a3.5 3.5 0 010 6.4M18 14a6.5 6.5 0 013.5 6" /></g>],
          ["Post", <g key="p"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M12 8v8M8 12h8" /></g>],
          ["Notifications", <path key="b" d="M6 16V11a6 6 0 0112 0v5l2 2H4zM10 20a2 2 0 004 0" />],
          ["Jobs", <g key="j"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5h6v2M3 12h18" /></g>],
        ].map(([label, icon], i) => (
          <span key={label as string} className={`w-[62px] text-center ${i ? "" : "text-white"}`}><svg {...ig}>{icon}</svg>{label}</span>
        ))}
      </div>
    </div>
  );
}

// A phone that shows one app screen, built at SCREEN_W and scaled to the phone. Its height is a percentage of the
// screen box, so it always fills the phone whatever the box's size. The whole screen links to the profile.
function PhoneFrame({ href, label, bg, className = "", delay, children }: { href: string; label: string; bg: string; className?: string; delay: string; children: React.ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(0);
  useEffect(() => {
    const el = box.current!;
    const ro = new ResizeObserver(() => setK(el.clientWidth / SCREEN_W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <figure className={`group m-0 flex-none ${className}`} data-reveal style={{ "--d": delay } as React.CSSProperties}>
      <div className={`${bezel} aspect-[9/19] rounded-[20px] p-1 min-[700px]:rounded-[42px] min-[700px]:p-2.5`}>
        <div ref={box} className="relative isolate h-full overflow-hidden rounded-[16px] min-[700px]:rounded-[33px]" style={{ background: bg }}>
          {k > 0 && (
            <div className="absolute left-0 top-0 origin-top-left" style={{ width: SCREEN_W, height: `${100 / k}%`, transform: `scale(${k})` }}>{children}</div>
          )}
          <a href={href} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-[2]" aria-label={label} />
          <span className="pointer-events-none absolute left-1/2 top-[3.2%] z-[3] h-[4.2%] w-[32%] -translate-x-1/2 rounded-full bg-black after:absolute after:right-[9%] after:top-1/2 after:aspect-square after:h-[42%] after:-translate-y-1/2 after:rounded-full after:bg-[radial-gradient(circle_at_35%_35%,#33415a,#0b0f16_70%)] after:content-['']" aria-hidden="true" />
        </div>
      </div>
    </figure>
  );
}

// Both phones share one size; LinkedIn's only shows where three devices fit side by side.
const phoneSize = "w-[31%] max-w-[150px] min-[700px]:w-[clamp(210px,21vw,300px)] min-[700px]:max-w-none min-[1000px]:w-[clamp(210px,17.5vw,270px)]";

// Phones: three equal buttons on one row with short labels (the icon names the platform).
const socBtn = "inline-flex items-center justify-center gap-1.5 rounded-full px-2.5 py-3.5 text-[13px] min-[700px]:gap-3 min-[700px]:px-[30px] min-[700px]:py-[17px] min-[700px]:text-[15px] font-semibold text-white transition-transform duration-500 ease-expo hover:-translate-y-[3px] [&_svg]:w-[18px] min-[700px]:[&_svg]:w-5";
const long = "max-[699px]:hidden";

export default function SocialHub() {
  const { instagram: ig, youtube: yt } = site;
  return (
    <div className="grid justify-items-center text-center">
      <div className="[&_.eyebrow]:justify-center">
        <span className="eyebrow">{yt.handle} · {ig.handle} · miva-robotics</span>
        <Lines className="h-lg" lines={["YouTube, Instagram", "& LinkedIn"]} accent={1} />
      </div>
      <div className="mb-[clamp(40px,4vw,56px)] mt-[clamp(48px,5vw,72px)] flex w-full items-end justify-center gap-[clamp(12px,3.4vw,56px)]">
        <PhoneFrame href={site.linkedin} label="MIVA Robotics on LinkedIn" bg="#000" delay=".3s" className={`${phoneSize} max-[999px]:hidden`}><LinkedInScreen /></PhoneFrame>
        <Tablet />
        <PhoneFrame href={ig.url} label={`MIVA Robotics on Instagram (${ig.handle})`} bg="#0c1014" delay=".15s" className={phoneSize}><InstaScreen /></PhoneFrame>
      </div>
      <div className="grid w-full grid-cols-3 gap-2 min-[700px]:flex min-[700px]:w-auto min-[700px]:flex-wrap min-[700px]:justify-center min-[700px]:gap-3.5" data-reveal>
        <a className={`${socBtn} bg-[#e62117] shadow-[0_14px_34px_-14px_rgba(230,33,23,.8)]`} href={yt.url} target="_blank" rel="noopener noreferrer" aria-label="Subscribe on YouTube"><YtIcon /><span>Subscribe<span className={long}> on YouTube</span></span></a>
        <a className={`${socBtn} bg-[linear-gradient(90deg,#f9a03f,#e1306c_45%,#833ab4_80%,#5b51d8)] shadow-[0_14px_34px_-14px_rgba(225,48,108,.8)]`} href={ig.url} target="_blank" rel="noopener noreferrer" aria-label="Follow on Instagram"><InstaIcon /><span>Follow<span className={long}> on Instagram</span></span></a>
        <a className={`${socBtn} bg-[#0a66c2] shadow-[0_14px_34px_-14px_rgba(10,102,194,.8)]`} href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Follow on LinkedIn"><LiIcon /><span>Follow<span className={long}> on LinkedIn</span></span></a>
      </div>
    </div>
  );
}
