"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { Lines } from "./ui";

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
    <figure className="dev tablet" data-reveal>
      <div className="tablet-body">
        <div className="dev-screen">
          {play ? (
            <iframe src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`} title={v.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
          ) : (
            <button className="dev-cover" onClick={() => setPlay(true)} aria-label={`Play video: ${v.title}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`} alt="" loading="lazy" />
              <span className="dev-tag"><YtIcon />YouTube</span>
              <span className="dev-play"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5l12 7-12 7z" /></svg></span>
            </button>
          )}
        </div>
        <span className="tablet-cam" aria-hidden="true" />
      </div>
    </figure>
  );
}

// Phone mockup showing MIVA's live Instagram profile (Instagram's embeddable profile view).
function Phone() {
  const ig = site.instagram;
  return (
    <figure className="dev phone" data-reveal style={{ "--d": ".15s" } as React.CSSProperties}>
      <div className="phone-body">
        <div className="dev-screen phone-screen">
          <iframe src={`${ig.url}embed/`} title={`MIVA Robotics on Instagram (${ig.handle})`} loading="lazy" scrolling="yes" />
          <span className="phone-island" aria-hidden="true" />
        </div>
      </div>
    </figure>
  );
}

export default function SocialHub() {
  const { instagram: ig, youtube: yt } = site;
  return (
    <div className="social">
      <div className="social-head">
        <span className="eyebrow">{yt.handle} · {ig.handle}</span>
        <Lines className="h-lg" lines={["YouTube & Instagram"]} accent={1} />
      </div>
      <div className="devices">
        <Tablet />
        <Phone />
      </div>
      <div className="social-ctas" data-reveal>
        <a className="soc-btn yt" href={yt.url} target="_blank" rel="noopener noreferrer"><YtIcon />Subscribe on YouTube</a>
        <a className="soc-btn ig" href={ig.url} target="_blank" rel="noopener noreferrer"><InstaIcon />Follow on Instagram</a>
      </div>
    </div>
  );
}
