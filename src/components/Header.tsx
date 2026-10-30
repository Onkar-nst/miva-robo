"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { productNav, serviceNav } from "@/content/site";
import { CTA } from "./ui";

export const Logo = () => (
  <Link href="/" className="logo" aria-label="MIVA Robotics home">
    <b>MIVA ROBOTICS</b>
    <i>MOTION | INTELLIGENCE | VISION | AUTOMATION</i>
  </Link>
);

function Mega({ items }: { items: typeof productNav }) {
  return (
    <div className="mega">
      <div className="wrap mega-grid">
        {items.map((p) => (
          <Link key={p.href} href={p.href} className="mega-card">
            <Image src={p.image} alt="" fill sizes="240px" />
            <span>{p.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const on = () => setSolid(scrollY > 40);
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);

  const cur = (h: string) => (path === h ? "page" : undefined);

  return (
    <header className={`hdr ${solid || open ? "solid" : ""}`}>
      <div className="wrap hdr-in">
        <Logo />
        <nav className="nav" aria-label="Primary">
          <Link href="/" aria-current={cur("/")}>Home</Link>
          <Link href="/about-miva-robotics/" aria-current={cur("/about-miva-robotics/")}>About</Link>
          <div className="has-mega"><Link href="/portfolio/miva-axis/">Products</Link><Mega items={productNav} /></div>
          <div className="has-mega"><Link href="/portfolio/raas/">Services</Link><Mega items={serviceNav} /></div>
          <Link href="/category/blogs/" aria-current={cur("/category/blogs/")}>Blogs</Link>
          <Link href="/support-and-services/" aria-current={cur("/support-and-services/")}>Support</Link>
        </nav>
        <CTA href="/contact/" className="hdr-cta">Contact</CTA>
        <button className="burger" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 8h18M3 16h18" />}
          </svg>
        </button>
      </div>
      {open && (
        <nav className="mob" aria-label="Mobile" data-lenis-prevent>
          <Link href="/">Home</Link>
          <Link href="/about-miva-robotics/">About</Link>
          <p className="eyebrow" style={{ marginTop: 22 }}>Products</p>
          <div className="sub">{productNav.map((p) => <Link key={p.href} href={p.href}>{p.label}</Link>)}</div>
          <p className="eyebrow" style={{ marginTop: 22 }}>Services</p>
          <div className="sub">{serviceNav.map((p) => <Link key={p.href} href={p.href}>{p.label}</Link>)}</div>
          <Link href="/category/blogs/">Blogs</Link>
          <Link href="/support-and-services/">Support</Link>
          <Link href="/contact/">Contact</Link>
        </nav>
      )}
    </header>
  );
}
