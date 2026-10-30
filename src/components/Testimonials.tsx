"use client";

import Image from "next/image";
import { useState } from "react";
import { home } from "@/content/pages";
import { ArrowR, pad } from "./ui";

const images = ["/media/Automotive-assembly-line-in-progress.jpg", "/media/MIVA-AMR-2.jpg", "/media/Construction-in-progress-on-urban-roadway.jpg"];

export default function Testimonials() {
  const list = home.testimonials;
  const [i, setI] = useState(0);
  const go = (d: number) => setI((n) => (n + d + list.length) % list.length);

  return (
    <div className="tst">
      <div className="tst-img">
        {list.map((x, n) => (
          <div className={`tst-slide ${n === i ? "on" : ""}`} key={x.name}>
            <Image src={images[n % images.length]} alt="" fill sizes="(max-width: 900px) 100vw, 30vw" />
          </div>
        ))}
      </div>
      <div className="tst-qs" aria-live="polite">
        {list.map((x, n) => (
          <blockquote className={`tst-q ${n === i ? "on" : ""}`} key={x.name} aria-hidden={n !== i}>
            <span className="qmark" aria-hidden="true">“</span>
            <p>{x.quote.replace(/^“|”$/g, "")}</p>
            <footer><b>{x.name}</b><span>{x.role}</span></footer>
          </blockquote>
        ))}
      </div>
      <div className="tst-nav">
        <button className="circ prev" onClick={() => go(-1)} aria-label="Previous testimonial"><ArrowR /></button>
        <button className="circ fill" onClick={() => go(1)} aria-label="Next testimonial"><ArrowR /></button>
        <span className="tst-count">{pad(i + 1, 2)} / {pad(list.length, 2)}</span>
      </div>
    </div>
  );
}
