"use client";

import Image from "next/image";
import { useState } from "react";
import { site } from "@/content/site";
import { TextLink } from "./ui";

// Tiles use MIVA's own imagery and open the Instagram profile.
const tiles = ["MIVA-AXIS-1.jpg", "MIVA-AMR-1.jpg", "MIVA-ASSIST-1.jpg", "MIVA-EYE-1.jpg", "MIVA-EAGLE-2.jpg", "MIVA-OS-2.jpg"];

const InstaIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r=".7" fill="currentColor" /></svg>
);
const YtIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="4" /><path d="M10 9l5 3-5 3z" fill="currentColor" /></svg>
);

function Head({ icon, name, handle, href, cta }: { icon: React.ReactNode; name: string; handle: string; href: string; cta: string }) {
  return (
    <div className="social-h">
      <a className="social-id" href={href} target="_blank" rel="noopener noreferrer">
        <span className="social-ic">{icon}</span>
        <span><b>{name}</b><small>{handle}</small></span>
      </a>
      <TextLink href={href} external>{cta}</TextLink>
    </div>
  );
}

export default function SocialHub() {
  const [play, setPlay] = useState(false);
  const { instagram: ig, youtube: yt } = site;
  return (
    <div className="social">
      <div className="social-col" data-reveal>
        <Head icon={<InstaIcon />} name="Instagram" handle={ig.handle} href={ig.url} cta="Follow" />
        <div className="insta">
          {tiles.map((t) => (
            <a key={t} href={ig.url} target="_blank" rel="noopener noreferrer" aria-label={`MIVA Robotics on Instagram, ${ig.handle}`}>
              <Image src={`/media/${t}`} alt="" fill sizes="(max-width: 1000px) 33vw, 14vw" />
              <span className="insta-ov" aria-hidden="true"><InstaIcon /></span>
            </a>
          ))}
        </div>
      </div>
      <div className="social-col" data-reveal style={{ "--d": ".12s" } as React.CSSProperties}>
        <Head icon={<YtIcon />} name="YouTube" handle={yt.handle} href={yt.url} cta="Subscribe" />
        <VideoFacade id={yt.video.id} play={play} onPlay={() => setPlay(true)} title={yt.video.title} hd />
        <a className="yt-cap" href={`https://www.youtube.com/watch?v=${yt.video.id}`} target="_blank" rel="noopener noreferrer">
          <span className="meta">Featured video</span>
          <b>{yt.video.title}</b>
        </a>
      </div>
    </div>
  );
}

export function VideoFacade({ id, play, onPlay, title = "YouTube video player", hd }: { id: string; play: boolean; onPlay: () => void; title?: string; hd?: boolean }) {
  if (play) {
    return (
      <div className="yt frame">
        <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`} title={title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
      </div>
    );
  }
  return (
    <button className="yt frame" onClick={onPlay} aria-label={`Play video: ${title}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`https://i.ytimg.com/vi/${id}/${hd ? "maxresdefault" : "hqdefault"}.jpg`} alt="" loading="lazy" />
      <span className="play"><svg width="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5l12 7-12 7z" /></svg></span>
    </button>
  );
}

export function OsVideo() {
  const [play, setPlay] = useState(false);
  return <VideoFacade id={site.osVideoId} play={play} onPlay={() => setPlay(true)} />;
}
