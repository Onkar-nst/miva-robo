import Image from "next/image";
import { CTA, Lines } from "@/components/ui";
import { support as s } from "@/content/pages";

export const metadata = { title: "Support and Services – MIVA Robotics", alternates: { canonical: "/support-and-services/" } };

export default function Support() {
  return (
    <>
      <section className="page-hero"><div className="wrap"><Lines as="h1" className="h-xl metal" lines={["Support & Services"]} /></div></section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap grid-2">
          <div>
            <span className="eyebrow">{s.eyebrow}</span>
            <h2 className="h-lg" style={{ marginBlock: 22 }} data-reveal>{s.heading}</h2>
            <p className="lead" data-reveal>{s.text}</p>
          </div>
          <div className="collage" style={{ minHeight: 440 }}>
            <div className="frame" data-reveal="wipe"><Image src="/media/support_1.jpg" alt="" fill priority sizes="35vw" /></div>
            <div className="frame" data-reveal="wipe" style={{ gridRow: "span 2" }}><Image src="/media/support_2.jpg" alt="" fill sizes="25vw" /></div>
          </div>
        </div>
      </section>
      <section className="section light">
        <div className="wrap">
          <span className="eyebrow">{s.servicesLabel}</span>
          <div className="svc" style={{ marginTop: 28 }}>
            {s.services.map((x, i) => (
              <article className="panel" key={x.title} data-reveal style={{ "--d": `${(i % 3) * 0.07}s` } as React.CSSProperties}>
                <b className="num" aria-hidden="true">{i + 1}</b>
                <h2 className="h-sm">{x.title}</h2>
                <p>{x.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section light" style={{ paddingTop: 0 }}>
        <div className="wrap grid-2">
          <div>
            <span className="eyebrow">{s.visionLabel}</span>
            <div className="stat"><b className="metal" data-count={s.stat.value}>{s.stat.value}</b><span>{s.stat.label}</span></div>
          </div>
          <div>
            <p className="h-md" data-reveal>{s.vision}</p>
            <div data-reveal style={{ marginTop: 36 }}><CTA href="/about-miva-robotics/">Meet the Team</CTA></div>
          </div>
        </div>
      </section>
    </>
  );
}
