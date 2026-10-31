"use client";

import Link from "next/link";
import { useState } from "react";
import { productNav, serviceNav, site } from "@/content/site";
import { ArrowR, ArrowUR, circ, Lines } from "./ui";

const colHead = "mb-[18px] text-[11.5px] font-medium uppercase tracking-[.18em] text-muted";
const colList = "space-y-2 text-[14.5px] [&_a]:inline-flex [&_a]:text-soft [&_a]:transition-[color,transform] [&_a]:duration-450 [&_a]:ease-expo [&_a:hover]:translate-x-1 [&_a:hover]:text-ink";

// Panel the page slides off to reveal: sticky behind <main> on screens big enough to show it whole.
export default function Footer() {
  const [email, setEmail] = useState("");
  return (
    <footer className="relative isolate overflow-hidden pt-[clamp(48px,5vw,72px)] text-soft bg-bg-2
      before:pointer-events-none before:absolute before:left-1/2 before:-top-[260px] before:-z-10 before:h-[520px] before:w-[min(1200px,120vw)] before:-translate-x-1/2 before:bg-[radial-gradient(ellipse_at_center,rgba(56,182,255,.16),transparent_65%)] before:content-['']
      reveal:sticky reveal:bottom-0 reveal:z-0">
      <div className="wrap">
        <div className="grid gap-9 border-b border-line pb-[clamp(32px,3.4vw,48px)] min-[1000px]:grid-cols-[7fr_4fr] min-[1000px]:items-end min-[1000px]:gap-[6vw]">
          <Lines className="max-w-[30ch] text-[clamp(24px,2.15vw,32px)] font-medium leading-[1.18] tracking-[-.03em] text-ink" lines={[site.footerBlurb]} accent={4} />
          <div className="grid gap-[22px]">
            <form onSubmit={(e) => { e.preventDefault(); location.href = `mailto:${site.email}?subject=Subscribe&body=${encodeURIComponent(email)}`; }}>
              <label htmlFor="ftr-email" className="mb-2.5 block text-[11.5px] font-medium uppercase tracking-[.18em] text-muted">Subscribe</label>
              <div className="flex items-center gap-3 border-b border-line-2 transition-colors duration-300 focus-within:border-accent">
                <input id="ftr-email" type="email" required placeholder="Your e-mail adress" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="min-w-0 flex-1 bg-transparent py-3.5 text-[15px] text-ink outline-0 placeholder:text-muted" />
                <button type="submit" className={`${circ} mb-1.5 !size-10`} aria-label="Subscribe"><ArrowR /></button>
              </div>
            </form>
            <a className="group inline-flex w-fit items-center gap-3 text-sm text-soft transition-colors duration-300 hover:text-ink" href={site.linkedin} target="_blank" rel="noopener noreferrer">
              <span className={`${circ} !size-9 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink`} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.5 8.5h-3v11h3v-11zM5 3.5a1.75 1.75 0 100 3.5 1.75 1.75 0 000-3.5zM20.5 13.2c0-2.9-1.6-4.9-4.3-4.9-1.4 0-2.4.7-2.9 1.5V8.5h-3v11h3v-5.8c0-1.4.6-2.6 2-2.6s1.9 1.2 1.9 2.6v5.8h3.3v-6.3z" /></svg>
              </span>
              <span>Follow us — LinkedIn</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-9 py-[clamp(32px,3.4vw,48px)] min-[900px]:grid-cols-[1.6fr_1fr_1fr_1.2fr_1.5fr]">
          <div className="col-span-full min-[900px]:col-span-1">
            <Link href="/" aria-label="MIVA Robotics home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/media/MIVA__ROBOTICS_Logo_White.svg" alt="MIVA Robotics" width={64} height={64} className="size-[58px]" />
            </Link>
          </div>
          <nav aria-label="Company">
            <h2 className={colHead}>Company</h2>
            <ul className={colList}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about-miva-robotics/">About</Link></li>
              <li><Link href="/category/blogs/">Blogs</Link></li>
              <li><Link href="/support-and-services/">Support</Link></li>
              <li><Link href="/contact/">Contact</Link></li>
            </ul>
          </nav>
          <nav aria-label="Services">
            <h2 className={colHead}>Services</h2>
            <ul className={colList}>{serviceNav.map((s) => <li key={s.href}><Link href={s.href}>{s.label}</Link></li>)}</ul>
          </nav>
          <nav aria-label="Solutions">
            <h2 className={colHead}>Solutions</h2>
            <ul className={colList}>{productNav.map((p) => <li key={p.href}><Link href={p.href}>{p.label.toUpperCase()}</Link></li>)}</ul>
          </nav>
          <div>
            <h2 className={colHead}>Find us</h2>
            <dl className="text-[14.5px] [&_dd]:mb-4 [&_dt]:mb-1 [&_dt]:text-xs [&_dt]:text-muted">
              <dt>Phone</dt>
              <dd><a className="text-soft transition-colors duration-300 hover:text-accent" href="tel:+918055507204">{site.phone}</a></dd>
              <dt>Email</dt>
              <dd>
                <a className="group inline-flex items-center gap-1.5 text-soft transition-colors duration-300 hover:text-accent" href={`mailto:${site.email}`}>
                  {site.email}<ArrowUR className="w-3 -translate-x-1 translate-y-1 opacity-0 transition-all duration-400 ease-expo group-hover:translate-0 group-hover:opacity-100" />
                </a>
              </dd>
            </dl>
          </div>
        </div>
      </div>

      <div className="select-none px-(--gutter) leading-[.8]" aria-hidden="true">
        <Lines as="h3" lines={["MIVA ROBOTICS"]}
          className="whitespace-nowrap text-center text-[clamp(44px,8.8vw,150px)] font-semibold leading-[.86] tracking-[-.04em] text-transparent [&_.w>span]:bg-[linear-gradient(180deg,rgba(14,143,230,.3),rgba(14,143,230,.03)_90%)] [&_.w>span]:bg-clip-text" />
      </div>

      <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-2.5 border-t border-line pb-6 pt-5 text-[12.5px] text-muted [&_a]:transition-colors [&_a]:duration-300 [&_a:hover]:text-ink">
        <span>Copyright © 2026 MIVA ROBOTICS | All Rights Reserved</span>
        <span className="flex gap-[22px]"><Link href="/privacy-policy/">Privacy Policy</Link><Link href="/terms-conditions/">Terms &amp; Conditions</Link></span>
      </div>
    </footer>
  );
}
