"use client";

import Link from "next/link";
import { useState } from "react";
import { pending, productNav, serviceNav, site } from "@/content/site";
import { Logo } from "./Header";

// Interim footer carrying the old footer's content. The final design is still to come from the client.
export default function Footer() {
  const [email, setEmail] = useState("");
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-grid">
          <div>
            <Logo />
            <p className="muted" style={{ marginTop: 18, maxWidth: 420 }}>{site.footerBlurb}</p>
            <form className="sub-form" onSubmit={(e) => { e.preventDefault(); location.href = `mailto:${site.email}?subject=Subscribe&body=${encodeURIComponent(email)}`; }}>
              <input type="email" required placeholder="Your e-mail adress" aria-label="Your e-mail adress" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button type="submit">Subscribe</button>
            </form>
          </div>
          <div>
            <h2>Company</h2>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about-miva-robotics/">About</Link></li>
              <li><span className="muted">Services</span></li>
              {serviceNav.map((s) => <li key={s.href}><Link href={s.href}>{s.label}</Link></li>)}
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
            <ul>
              <li><span className="muted">Phone</span><br /><a href="tel:+918055507204">{site.phone}</a></li>
              <li><span className="muted">Email</span><br /><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li className="gst" style={{ marginTop: 16 }}>GSTIN: {pending.gstin || <span className="pending">Pending from client</span>}</li>
            </ul>
          </div>
        </div>
        <div className="ftr-base">
          <span>Copyright © 2026 MIVA ROBOTICS | All Rights Reserved</span>
          <span><Link href="/privacy-policy/">Privacy Policy</Link> | <Link href="/terms-conditions/">Terms &amp; Conditions</Link></span>
        </div>
      </div>
    </footer>
  );
}
