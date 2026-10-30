"use client";

import { useState } from "react";
import { contact } from "@/content/pages";
import { ArrowUR, pad } from "./ui";

// Office cards on the left drive a live Google Map on the right (keyless embed, so no API key to manage).
export default function OfficeMap() {
  const offices = contact.offices;
  const [i, setI] = useState(0);
  const o = offices[i];
  const q = encodeURIComponent(o.maps);

  return (
    <div className="omap">
      <div className="omap-list" role="tablist" aria-label="Offices">
        {offices.map((x, n) => (
          <div className={`office ${n === i ? "on" : ""}`} key={x.city} role="tab" aria-selected={n === i} tabIndex={0}
            onClick={() => setI(n)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setI(n); } }}>
            <div className="office-top">
              <span className="idx">{pad(n + 1, 2)}</span>
              <span className="office-pin" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 21s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></svg></span>
            </div>
            <h3 className="h-md">{x.city}</h3>
            <p className="office-label">{x.label}</p>
            <dl>
              <dt>Address</dt>
              <dd>{x.address}</dd>
              <dt>Phone</dt>
              <dd><a href={`tel:${x.phone.replace(/-/g, "")}`} onClick={(e) => e.stopPropagation()}>{x.phone}</a></dd>
              <dt>Email</dt>
              <dd><a href={`mailto:${x.email}`} onClick={(e) => e.stopPropagation()}>{x.email}</a></dd>
            </dl>
            <a className="tlink" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(x.maps)}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <span>Get directions</span><ArrowUR />
            </a>
          </div>
        ))}
      </div>
      <div className="omap-map">
        <iframe key={o.city} src={`https://maps.google.com/maps?q=${q}&z=15&output=embed`} title={`Map of the MIVA Robotics ${o.city} office`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        <div className="omap-chip"><b>{o.city}</b><span>{o.label}</span></div>
      </div>
    </div>
  );
}
