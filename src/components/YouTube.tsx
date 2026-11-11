"use client";

import { useState } from "react";

// A YouTube video that costs nothing until it is wanted: the poster frame and a play button, swapped for the
// privacy-enhanced player (autoplaying) on click.
export default function YouTube({ id, title, className = "" }: { id: string; title: string; className?: string }) {
  const [play, setPlay] = useState(false);
  return (
    <div className={`group relative overflow-hidden bg-black ${className}`}>
      {play ? (
        <iframe className="absolute inset-0 size-full border-0" src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
      ) : (
        <button type="button" className="absolute inset-0 w-full cursor-pointer border-0 bg-black p-0" onClick={() => setPlay(true)} aria-label={`Play video: ${title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`} alt="" className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.03]" />
          <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.45),transparent_30%,transparent_70%,rgba(0,0,0,.35))]" aria-hidden="true" />
          <span className="absolute left-4 right-4 top-4 truncate text-left text-[clamp(13px,1.1vw,16px)] font-medium text-white">{title}</span>
          <span className="absolute left-1/2 top-1/2 grid size-[clamp(56px,5.4vw,78px)] -translate-1/2 place-items-center rounded-full bg-white/95 text-[#ff0033] shadow-[0_10px_30px_rgba(0,0,0,.4)] transition-transform duration-600 ease-expo group-hover:scale-[1.08]">
            <svg className="ml-1 w-[38%]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5l12 7-12 7z" /></svg>
          </span>
        </button>
      )}
    </div>
  );
}
