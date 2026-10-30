"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { productNav, serviceNav } from "@/content/site";
import { products, services } from "@/content/products";
import { ArrowUR, pad, TextLink } from "./ui";

export const Logo = () => (
  <Link href="/" className="logo" aria-label="MIVA Robotics home">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/media/MIVA__ROBOTICS_Logo_White.svg" alt="" width={56} height={56} />
  </Link>
);

type NavItem = (typeof productNav)[number] & { sub: string };
const slug = (href: string) => href.split("/").filter(Boolean).pop();
const productItems: NavItem[] = productNav.map((p) => ({ ...p, sub: products.find((x) => x.slug === slug(p.href))?.tagline ?? "" }));
const serviceItems: NavItem[] = serviceNav.map((s) => ({ ...s, sub: services.find((x) => x.slug === slug(s.href))?.full ?? "" }));

// Hover menu that shuts as soon as something in it is clicked, and stays shut until the pointer leaves.
function MenuItem({ href, label, current, items }: { href: string; label: string; current: boolean; items: NavItem[] }) {
  const [shut, setShut] = useState(false);
  const close = () => { setShut(true); (document.activeElement as HTMLElement | null)?.blur(); };
  return (
    <div className={`has-mega ${shut ? "shut" : ""}`} onMouseLeave={() => setShut(false)} onClickCapture={(e) => { if ((e.target as Element).closest("a")) close(); }}>
      <Link href={href} aria-current={current ? "page" : undefined}>{label}</Link>
      <Mega items={items} title={label} />
    </div>
  );
}

// Numbered list with a single preview that follows the hovered item.
function Mega({ items, title }: { items: NavItem[]; title: string }) {
  const [on, setOn] = useState(0);
  return (
    <div className="mega">
      <div className={`mega-in ${items.length < 4 ? "sm" : ""}`}>
        <div className="mega-list">
          <p className="eyebrow">{title}</p>
          <ul>
            {items.map((p, n) => (
              <li key={p.href}>
                <Link href={p.href} className={n === on ? "on" : ""} onMouseEnter={() => setOn(n)} onFocus={() => setOn(n)}>
                  <span className="idx">{pad(n + 1, 2)}</span>
                  <span className="mega-t"><b>{p.label}</b></span>
                  <ArrowUR />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mega-prev" aria-hidden="true">
          <div className="mega-shot">
            {items.map((p, n) => (
              <span className={n === on ? "on" : ""} key={p.href}><Image src={p.image} alt="" fill sizes="(max-width: 1200px) 50vw, 640px" quality={90} /></span>
            ))}
          </div>
          <div className="mega-cap" key={on}>
            <b>{items[on].label}</b>
            <small>{items[on].sub}</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    let last = scrollY;
    const on = () => {
      const y = scrollY;
      setSolid(y > 40);
      // Match the bar to whatever section is passing underneath it.
      setOnLight([...document.querySelectorAll(".light")].some((s) => { const r = s.getBoundingClientRect(); return r.top <= 42 && r.bottom >= 42; }));
      if (Math.abs(y - last) > 6) { setHidden(y > last && y > 240); last = y; }
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);

  const cur = (h: string) => (path === h ? "page" : undefined);
  const isProduct = productNav.some((p) => p.href === path);
  const isService = serviceNav.some((p) => p.href === path);
  const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

  return (
    <header className={`hdr ${solid || open ? "solid" : ""} ${hidden && !open ? "away" : ""} ${onLight && !open ? "on-light" : ""}`}>
      <div className="wrap hdr-in">
        <Logo />
        <nav className="nav" aria-label="Primary">
          <Link href="/" aria-current={cur("/")}>Home</Link>
          <Link href="/about-miva-robotics/" aria-current={cur("/about-miva-robotics/")}>About</Link>
          <MenuItem href="/portfolio/miva-axis/" label="Products" current={isProduct} items={productItems} />
          <MenuItem href="/portfolio/raas/" label="Services" current={isService} items={serviceItems} />
          <Link href="/category/blogs/" aria-current={path.startsWith("/category/blogs/") ? "page" : undefined}>Blogs</Link>
          <Link href="/support-and-services/" aria-current={cur("/support-and-services/")}>Support</Link>
        </nav>
        <div className="hdr-end">
          <TextLink href="/contact/" className="hdr-cta">Contact</TextLink>
          <button className={`burger ${open ? "x" : ""}`} aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
            <span /><span />
          </button>
        </div>
      </div>
      <nav className={`mob ${open ? "open" : ""}`} aria-label="Mobile" aria-hidden={!open} data-lenis-prevent inert={!open}>
        <Link href="/" style={i(0)}>Home</Link>
        <Link href="/about-miva-robotics/" style={i(1)}>About</Link>
        <p className="eyebrow" style={i(2)}>Products</p>
        <div className="sub" style={i(3)}>{productNav.map((p) => <Link key={p.href} href={p.href}>{p.label}</Link>)}</div>
        <p className="eyebrow" style={i(4)}>Services</p>
        <div className="sub" style={i(5)}>{serviceNav.map((p) => <Link key={p.href} href={p.href}>{p.label}</Link>)}</div>
        <Link href="/category/blogs/" style={i(6)}>Blogs</Link>
        <Link href="/support-and-services/" style={i(7)}>Support</Link>
        <Link href="/contact/" style={i(8)}>Contact</Link>
      </nav>
    </header>
  );
}
