"use client";

import Link from "next/link";
import { useState } from "react";
import { productNav, serviceNav, site } from "@/content/site";
import { ArrowR } from "./ui";

const colHead = "mb-[30px] text-[15px] font-semibold text-ink";
const colList = "space-y-[18px] text-[15px] [&_a]:inline-flex [&_a]:text-soft [&_a]:transition-[color,transform] [&_a]:duration-450 [&_a]:ease-expo [&_a:hover]:translate-x-1 [&_a:hover]:text-ink";

// Panel the page slides off to reveal: sticky behind <main> on screens big enough to show it whole.
export default function Footer() {
  const [email, setEmail] = useState("");
  const [servicesOpen, setServicesOpen] = useState(false);
  return (
    <footer className="deep relative isolate overflow-hidden pt-[clamp(36px,4.55vw,78px)] text-soft reveal:sticky reveal:bottom-0 reveal:z-0">
      <a href={site.linkedin} target="_blank" rel="noopener noreferrer"
        className="absolute left-[clamp(8px,1vw,14px)] top-[clamp(120px,14vw,220px)] hidden text-[13px] tracking-[.02em] text-soft transition-colors duration-300 [writing-mode:vertical-rl] rotate-180 hover:text-accent-text min-[900px]:block">
        Follow us — LinkedIn
      </a>

      <div className="wrap">
        <div className="grid gap-12 min-[900px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] min-[900px]:gap-[6vw]">
          <div className="max-w-[540px]">
            <Link href="/" aria-label="MIVA Robotics home" className="inline-block">
              <span className="block text-[clamp(30px,3.1vw,46px)] font-bold leading-none tracking-[.06em] text-ink">MIVA ROBOTICS</span>
              <span className="mt-2.5 block text-[clamp(10px,.98vw,14.5px)] font-semibold tracking-[.06em] text-accent-text">MOTION | INTELLIGENCE | VISION | AUTOMATION</span>
            </Link>
            <p className="mt-[clamp(32px,3.6vw,52px)] text-[15px] leading-[1.75] text-soft">{site.footerBlurb}</p>
            <form className="mt-8 flex items-center gap-3" onSubmit={(e) => { e.preventDefault(); location.href = `mailto:${site.email}?subject=Subscribe&body=${encodeURIComponent(email)}`; }}>
              <label htmlFor="ftr-email" className="sr-only">Your e-mail address</label>
              <input id="ftr-email" type="email" required placeholder="Your e-mail adress" value={email} onChange={(e) => setEmail(e.target.value)}
                className="h-[52px] min-w-0 flex-1 rounded-full border border-line-2 bg-transparent px-6 text-[15px] text-ink outline-0 transition-colors duration-300 placeholder:text-ink focus:border-accent" />
              <button type="submit" aria-label="Subscribe"
                className="grid size-[52px] flex-none cursor-pointer place-items-center rounded-full border border-line-2 text-ink transition-[background-color,border-color,color] duration-400 hover:border-accent hover:bg-accent hover:text-accent-ink [&_svg]:w-[15px]">
                <ArrowR />
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 min-[600px]:grid-cols-[1fr_1.5fr_1.5fr]">
            <nav aria-label="Company">
              <h2 className={colHead}>Company</h2>
              <ul className={colList}>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about-miva-robotics/">About</Link></li>
                <li>
                  <button type="button" aria-expanded={servicesOpen} onClick={() => setServicesOpen((o) => !o)}
                    className="inline-flex cursor-pointer items-center gap-1.5 text-soft transition-colors duration-300 hover:text-ink">
                    Services
                    <svg viewBox="0 0 12 12" className={`w-3 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" /></svg>
                  </button>
                  {servicesOpen && (
                    <ul className="mt-3 space-y-2.5 pl-3 text-[14px]">
                      {serviceNav.map((s) => <li key={s.href}><Link href={s.href}>{s.label}</Link></li>)}
                    </ul>
                  )}
                </li>
                <li><Link href="/category/blogs/">Blogs</Link></li>
                <li><Link href="/support-and-services/">Support</Link></li>
                <li><Link href="/contact/">Contact</Link></li>
              </ul>
            </nav>
            <nav aria-label="Solutions">
              <h2 className={colHead}>Solutions</h2>
              <ul className={colList}>{productNav.map((p) => <li key={p.href}><Link href={p.href}>{p.label.toUpperCase()}</Link></li>)}</ul>
            </nav>
            <div className="col-span-full min-[600px]:col-span-1">
              <h2 className={colHead}>Find us</h2>
              <dl className="text-[15px] [&_dd]:mb-[46px] [&_dt]:mb-3 [&_dt]:text-soft">
                <dt>Phone</dt>
                <dd><a className="text-soft transition-colors duration-300 hover:text-accent-text" href="tel:+918055507204">{site.phone}</a></dd>
                <dt>Email</dt>
                <dd><a className="text-soft transition-colors duration-300 hover:text-accent-text" href={`mailto:${site.email}`}>{site.email}</a></dd>
              </dl>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="text-[14px] text-soft transition-colors duration-300 hover:text-accent-text min-[900px]:hidden">Follow us — LinkedIn</a>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap pb-[clamp(26px,3.9vw,65px)] pt-[clamp(31px,3.25vw,47px)] text-center text-[13px] text-soft [&_a]:transition-colors [&_a]:duration-300 [&_a:hover]:text-ink">
        Copyright © 2026 MIVA ROBOTICS <span className="mx-1">|</span> All Rights Reserved <span className="mx-1">|</span> <Link href="/privacy-policy/">Privacy Policy</Link> <span className="mx-1">|</span> <Link href="/terms-conditions/">Terms &amp; Conditions</Link>
      </div>
    </footer>
  );
}
