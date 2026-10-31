"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { productNav, serviceNav } from "@/content/site";
import { products, services } from "@/content/products";
import { ArrowUR, pad, TextLink } from "./ui";

export const Logo = () => (
  <Link href="/" className="inline-flex justify-self-start" aria-label="MIVA Robotics home">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/media/MIVA__ROBOTICS_Logo_White.svg" alt="" width={56} height={56} className="size-[46px] object-contain [filter:var(--logo-filter)] transition-[filter] duration-400" />
  </Link>
);

type NavItem = (typeof productNav)[number] & { sub: string };
const slug = (href: string) => href.split("/").filter(Boolean).pop();
const productItems: NavItem[] = productNav.map((p) => ({ ...p, sub: products.find((x) => x.slug === slug(p.href))?.tagline ?? "" }));
const serviceItems: NavItem[] = serviceNav.map((s) => ({ ...s, sub: services.find((x) => x.slug === slug(s.href))?.full ?? "" }));

// Top-level link with an underline that draws in on hover or when current.
const navLink = "relative block py-2 text-sm text-soft transition-colors duration-300 hover:text-ink aria-[current=page]:text-ink after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:origin-right after:scale-x-0 after:bg-accent after:transition-transform after:duration-500 after:ease-expo after:content-[''] hover:after:origin-left hover:after:scale-x-100 aria-[current=page]:after:origin-left aria-[current=page]:after:scale-x-100";

// Hover menu that shuts as soon as something in it is clicked, and stays shut until the pointer leaves.
function MenuItem({ href, label, current, items }: { href: string; label: string; current: boolean; items: NavItem[] }) {
  const [shut, setShut] = useState(false);
  const close = () => { setShut(true); (document.activeElement as HTMLElement | null)?.blur(); };
  return (
    <div className="group/mega relative" onMouseLeave={() => setShut(false)} onClickCapture={(e) => { if ((e.target as Element).closest("a")) close(); }}>
      <Link href={href} aria-current={current ? "page" : undefined} className={`${navLink} ${shut ? "" : "group-hover/mega:text-ink group-hover/mega:after:origin-left group-hover/mega:after:scale-x-100"}`}>{label}</Link>
      <Mega items={items} title={label} shut={shut} />
    </div>
  );
}

// Numbered list with a single preview that follows the hovered item.
function Mega({ items, title, shut }: { items: NavItem[]; title: string; shut: boolean }) {
  const [on, setOn] = useState(0);
  const small = items.length < 4;
  return (
    <div className={`invisible absolute left-1/2 top-full -translate-x-1/2 -translate-y-2 pt-[22px] opacity-0 transition-all ease-expo ${shut ? "duration-250" : "duration-450 group-hover/mega:visible group-hover/mega:translate-y-0 group-hover/mega:opacity-100 group-focus-within/mega:visible group-focus-within/mega:translate-y-0 group-focus-within/mega:opacity-100"}`}>
      <div className={`grid border border-line-2 bg-bg-2 shadow-[0_40px_80px_-30px_rgba(11,29,51,.35)] ${small ? "w-[min(700px,94vw)] grid-cols-[1fr_300px]" : "w-[min(900px,94vw)] grid-cols-[1fr_340px]"}`}>
        <div className="px-2 pb-3.5 pt-[26px]">
          <p className="eyebrow mb-3.5 ml-[18px]">{title}</p>
          <ul>
            {items.map((p, n) => {
              const active = n === on;
              return (
                <li key={p.href}>
                  <Link href={p.href} onMouseEnter={() => setOn(n)} onFocus={() => setOn(n)}
                    className={`relative grid grid-cols-[30px_1fr_14px] items-center gap-3.5 px-[18px] py-[13px] transition-colors duration-350 before:absolute before:inset-y-3 before:left-0 before:w-0.5 before:bg-accent before:transition-transform before:duration-450 before:ease-expo before:content-[''] ${active ? "bg-tint before:scale-y-100" : "before:scale-y-0"}`}>
                    <span className={`idx transition-colors duration-300 ${active ? "!text-accent-text" : ""}`}>{pad(n + 1, 2)}</span>
                    <b className="min-w-0 text-[17px] font-semibold tracking-[-.01em] text-ink">{p.label}</b>
                    <ArrowUR className={`w-[13px] text-accent-text transition-all duration-450 ease-expo ${active ? "opacity-100" : "-translate-x-1.5 translate-y-1.5 opacity-0"}`} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col gap-[18px] border-l border-line p-[18px]" aria-hidden="true">
          <div className="relative aspect-[16/10] overflow-hidden bg-panel">
            {items.map((p, n) => (
              <span key={p.href} className={`absolute inset-0 transition-opacity duration-600 ease-io ${n === on ? "opacity-100" : "opacity-0"}`}>
                <Image src={p.image} alt="" fill sizes="(max-width: 1200px) 50vw, 640px" quality={90} className={`object-cover transition-transform duration-[1.6s] ease-expo ${n === on ? "scale-100" : "scale-[1.06]"}`} />
              </span>
            ))}
          </div>
          <div className="grid animate-cap-in gap-1.5" key={on}>
            <b className="text-base font-semibold tracking-[-.015em]">{items[on].label}</b>
            <small className="text-[13px] leading-[1.55] text-muted">{items[on].sub}</small>
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
      // Match the bar to whatever section is passing underneath it (onLight = over a deep section).
      setOnLight([...document.querySelectorAll(".deep")].some((s) => { const r = s.getBoundingClientRect(); return r.top <= 42 && r.bottom >= 42; }));
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
  const mobLink = "block border-b border-line py-3.5 text-[30px] font-semibold tracking-[-.035em]";
  const mobSub = "grid grid-cols-2 gap-x-4 [&_a]:block [&_a]:border-b [&_a]:border-line [&_a]:py-2.5 [&_a]:text-[15px] [&_a]:text-soft";

  return (
    <header className={`fixed inset-x-0 top-0 z-[100] border-b text-ink transition-[transform,background-color,border-color,color] duration-600 ease-expo
      ${solid || open ? "border-line bg-[color-mix(in_srgb,var(--bg)_86%,transparent)] backdrop-blur-[16px]" : "border-transparent"}
      ${hidden && !open ? "-translate-y-full" : ""} ${onLight && !open ? "deep-vars" : ""}`}>
      <div className="wrap grid h-[84px] grid-cols-[1fr_auto_1fr] items-center">
        <Logo />
        <nav className="hidden gap-[clamp(20px,2.6vw,40px)] min-[1100px]:flex" aria-label="Primary">
          <Link href="/" aria-current={cur("/")} className={navLink}>Home</Link>
          <Link href="/about-miva-robotics/" aria-current={cur("/about-miva-robotics/")} className={navLink}>About</Link>
          <MenuItem href="/portfolio/miva-axis/" label="Products" current={isProduct} items={productItems} />
          <MenuItem href="/portfolio/raas/" label="Services" current={isService} items={serviceItems} />
          <Link href="/category/blogs/" aria-current={path.startsWith("/category/blogs/") ? "page" : undefined} className={navLink}>Blogs</Link>
          <Link href="/support-and-services/" aria-current={cur("/support-and-services/")} className={navLink}>Support</Link>
        </nav>
        <div className="col-start-3 flex items-center gap-5 justify-self-end">
          <TextLink href="/contact/" className="!hidden min-[1100px]:!inline-flex">Contact</TextLink>
          <button className="relative size-[46px] cursor-pointer rounded-full border-0 bg-ink min-[1100px]:hidden" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
            <span className={`absolute inset-x-[15px] h-[1.5px] bg-bg transition-all duration-500 ease-expo ${open ? "top-[22.5px] rotate-45" : "top-[19px]"}`} />
            <span className={`absolute inset-x-[15px] h-[1.5px] bg-bg transition-all duration-500 ease-expo ${open ? "top-[22.5px] -rotate-45" : "top-[26px]"}`} />
          </button>
        </div>
      </div>
      <nav aria-label="Mobile" aria-hidden={!open} data-lenis-prevent inert={!open}
        className={`fixed inset-x-0 bottom-0 top-[84px] overflow-y-auto bg-bg px-(--gutter) pb-12 pt-4 transition-[clip-path] duration-800 ease-io min-[1100px]:hidden
          *:transition-all *:duration-600 *:ease-expo
          ${open ? "[clip-path:inset(0)] *:translate-y-0 *:opacity-100 *:delay-[calc(.25s+var(--i)*.04s)]" : "[clip-path:inset(0_0_100%_0)] *:translate-y-4 *:opacity-0"}`}>
        <Link href="/" style={i(0)} className={mobLink}>Home</Link>
        <Link href="/about-miva-robotics/" style={i(1)} className={mobLink}>About</Link>
        <p className="eyebrow mb-1 mt-[26px]" style={i(2)}>Products</p>
        <div className={mobSub} style={i(3)}>{productNav.map((p) => <Link key={p.href} href={p.href}>{p.label}</Link>)}</div>
        <p className="eyebrow mb-1 mt-[26px]" style={i(4)}>Services</p>
        <div className={mobSub} style={i(5)}>{serviceNav.map((p) => <Link key={p.href} href={p.href}>{p.label}</Link>)}</div>
        <Link href="/category/blogs/" style={i(6)} className={mobLink}>Blogs</Link>
        <Link href="/support-and-services/" style={i(7)} className={mobLink}>Support</Link>
        <Link href="/contact/" style={i(8)} className={mobLink}>Contact</Link>
      </nav>
    </header>
  );
}
