"use client";

import Link from "next/link";
import { useState } from "react";
import { productNav, serviceNav, site } from "@/content/site";

// Mirrors the mivarobotics.ai footer: light panel that the page content slides off to reveal (sticky, desktop only).
export default function Footer() {
  const [email, setEmail] = useState("");
  return (
    <footer className="ftr">
      <a className="ftr-follow" href={site.linkedin} target="_blank" rel="noopener noreferrer">Follow us — LinkedIn</a>
      <div className="wrap ftr-main">
        <div className="ftr-lead">
          <Link href="/" className="ftr-logo" aria-label="MIVA Robotics home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/MIVA-ROBOTICS-LOGO-BANNER.png" alt="MIVA Robotics" width={360} height={80} />
          </Link>
          <p>{site.footerBlurb}</p>
          <form className="sub-form" onSubmit={(e) => { e.preventDefault(); location.href = `mailto:${site.email}?subject=Subscribe&body=${encodeURIComponent(email)}`; }}>
            <input type="email" required placeholder="Your e-mail adress" aria-label="Your e-mail adress" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="submit" className="circ" aria-label="Subscribe">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
            </button>
          </form>
        </div>
        <div className="ftr-cols">
          <div>
            <h2>Company</h2>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about-miva-robotics/">About</Link></li>
              <li>
                <details className="ftr-more">
                  <summary>Services<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg></summary>
                  <ul>{serviceNav.map((s) => <li key={s.href}><Link href={s.href}>{s.label}</Link></li>)}</ul>
                </details>
              </li>
              <li><Link href="/category/blogs/">Blogs</Link></li>
              <li><Link href="/support-and-services/">Support</Link></li>
              <li><Link href="/contact/">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h2>Solutions</h2>
            <ul>{productNav.map((p) => <li key={p.href}><Link href={p.href}>{p.label.toUpperCase()}</Link></li>)}</ul>
          </div>
          <div>
            <h2>Find us</h2>
            <dl>
              <dt>Phone</dt>
              <dd><a href="tel:+918055507204">{site.phone}</a></dd>
              <dt>Email</dt>
              <dd><a href={`mailto:${site.email}`}>{site.email}</a></dd>
            </dl>
          </div>
        </div>
      </div>
      <p className="ftr-base">
        Copyright © 2026 MIVA ROBOTICS | All Rights Reserved | <Link href="/privacy-policy/">Privacy Policy</Link> | <Link href="/terms-conditions/">Terms &amp; Conditions</Link>
      </p>
    </footer>
  );
}
