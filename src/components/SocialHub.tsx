"use client";

import Image from "next/image";
import { useState } from "react";
import { pending, site } from "@/content/site";
import { CTA } from "./ui";

// Tiles use MIVA's own imagery until an Instagram feed/access token is connected.
const tiles = ["MIVA-AXIS-1.jpg", "MIVA-AMR-1.jpg", "MIVA-ASSIST-1.jpg", "MIVA-EYE-1.jpg", "MIVA-EAGLE-2.jpg", "MIVA-OS-2.jpg"];

export default function SocialHub() {
  const [play, setPlay] = useState(false);
  const id = site.youtubeVideoId;
  return (
    <div className="social">
      <div data-reveal>
        <div className="social-h">
          <h3 className="h-md">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r=".6" fill="currentColor" /></svg>
            Instagram
          </h3>
          {pending.instagramUrl ? <CTA href={pending.instagramUrl} external ghost>{pending.instagramHandle || "Follow"}</CTA> : <span className="pending">Instagram link pending from client</span>}
        </div>
        <div className="insta">
          {tiles.map((t) => {
            const img = <Image src={`/media/${t}`} alt="" fill sizes="(max-width: 1000px) 33vw, 16vw" />;
            return pending.instagramUrl
              ? <a key={t} href={pending.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="MIVA Robotics on Instagram">{img}</a>
              : <div key={t}>{img}</div>;
          })}
        </div>
      </div>
      <div data-reveal style={{ "--d": ".15s" } as React.CSSProperties}>
        <div className="social-h">
          <h3 className="h-md">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="4" /><path d="M10 9l5 3-5 3z" fill="currentColor" /></svg>
            YouTube
          </h3>
          {pending.youtubeChannelUrl ? <CTA href={pending.youtubeChannelUrl} external ghost>Subscribe</CTA> : <span className="pending">Channel link pending from client</span>}
        </div>
        <VideoFacade id={id} play={play} onPlay={() => setPlay(true)} />
      </div>
    </div>
  );
}

export function VideoFacade({ id, play, onPlay }: { id: string; play: boolean; onPlay: () => void }) {
  if (play) {
    return (
      <div className="yt frame">
        <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`} title="YouTube video player" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
      </div>
    );
  }
  return (
    <button className="yt frame" onClick={onPlay} aria-label="Play video">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
      <span className="play"><svg width="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5l12 7-12 7z" /></svg></span>
    </button>
  );
}

export function OsVideo() {
  const [play, setPlay] = useState(false);
  return <VideoFacade id={site.youtubeVideoId} play={play} onPlay={() => setPlay(true)} />;
}
