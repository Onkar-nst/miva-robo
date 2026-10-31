"use client";

import { useState } from "react";
import { contact } from "@/content/pages";
import { ArrowUR, pad, tlink } from "./ui";

// Office cards on the left drive a live Google Map on the right (keyless embed, so no API key to manage).
export default function OfficeMap() {
  const offices = contact.offices;
  const [i, setI] = useState(0);
  const o = offices[i];
  const q = encodeURIComponent(o.maps);
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div className="grid gap-4 min-[1000px]:grid-cols-[5fr_7fr] min-[1000px]:items-stretch">
      <div className="grid gap-3" role="tablist" aria-label="Offices">
        {offices.map((x, n) => {
          const on = n === i;
          return (
            <div key={x.city} role="tab" aria-selected={on} tabIndex={0}
              onClick={() => setI(n)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setI(n); } }}
              className={`relative cursor-pointer border p-[clamp(24px,2.4vw,34px)] outline-offset-[-2px] transition-[border-color,background-color] duration-400 hover:border-line-2
                before:absolute before:-inset-y-px before:-left-px before:w-0.5 before:origin-top before:bg-accent before:transition-transform before:duration-600 before:ease-expo before:content-['']
                ${on ? "border-line-2 bg-panel before:scale-y-100" : "border-line bg-bg-2 before:scale-y-0"}`}>
              <div className="mb-[18px] flex items-center justify-between">
                <span className="idx">{pad(n + 1, 2)}</span>
                <span aria-hidden="true" className={`grid size-[38px] place-items-center rounded-full border transition-all duration-400 [&_svg]:w-[17px] ${on ? "border-accent bg-accent text-accent-ink" : "border-line-2 text-muted"}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 21s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></svg>
                </span>
              </div>
              <h3 className="h-md mb-1.5">{x.city}</h3>
              <p className="mb-[22px] text-[13px] text-accent-text">{x.label}</p>
              <dl className="mb-[22px] grid grid-cols-[70px_1fr] gap-x-4 gap-y-2.5 text-[14.5px] [&_dd]:leading-[1.55] [&_dd]:text-soft [&_dd_a]:transition-colors [&_dd_a]:duration-300 [&_dd_a:hover]:text-accent-text [&_dt]:pt-[3px] [&_dt]:text-[11px] [&_dt]:font-medium [&_dt]:uppercase [&_dt]:tracking-[.14em] [&_dt]:text-muted">
                <dt>Address</dt>
                <dd>{x.address}</dd>
                <dt>Phone</dt>
                <dd><a href={`tel:${x.phone.replace(/-/g, "")}`} onClick={stop}>{x.phone}</a></dd>
                <dt>Email</dt>
                <dd><a href={`mailto:${x.email}`} onClick={stop}>{x.email}</a></dd>
              </dl>
              <a className={`${tlink} !text-[13px]`} href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(x.maps)}`} target="_blank" rel="noopener noreferrer" onClick={stop}>
                <span>Get directions</span><ArrowUR />
              </a>
            </div>
          );
        })}
      </div>
      <div className="relative min-h-[420px] overflow-hidden border border-line-2 bg-panel">
        <iframe key={o.city} src={`https://maps.google.com/maps?q=${q}&z=15&output=embed`} title={`Map of the MIVA Robotics ${o.city} office`} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full animate-map-in border-0 [filter:saturate(.7)_contrast(.97)]" />
        <div className="pointer-events-none absolute bottom-4 left-4 grid gap-0.5 border border-line-2 bg-[color-mix(in_srgb,var(--bg)_90%,transparent)] px-4 py-3 backdrop-blur-[10px]">
          <b className="text-sm font-semibold tracking-[.06em]">{o.city}</b>
          <span className="text-xs text-muted">{o.label}</span>
        </div>
      </div>
    </div>
  );
}
