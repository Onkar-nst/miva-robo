import ContactForm from "@/components/ContactForm";
import { Lines } from "@/components/ui";
import { contact as c } from "@/content/pages";
import { pending } from "@/content/site";

export const metadata = { title: "Contact – MIVA Robotics", alternates: { canonical: "/contact/" } };

export default function Contact() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">{c.eyebrow}</span>
          <Lines as="h1" className="h-xl metal" lines={[c.heading]} />
          <p className="lead" style={{ maxWidth: 760, marginTop: 24 }} data-reveal>{c.text}</p>
        </div>
      </section>
      <section className="section tight" style={{ paddingTop: 0 }}>
        <div className="wrap offices">
          {c.offices.map((o, i) => (
            <article className="panel office" key={o.city} data-reveal style={{ "--d": `${i * 0.1}s` } as React.CSSProperties}>
              <h3 className="h-lg metal">{o.city}</h3>
              <dl>
                <dt>{o.label}</dt>
                <dd className="h-sm"><a href={`tel:${o.phone.replace(/-/g, "")}`}>{o.phone}</a></dd>
                <dt>Address</dt>
                <dd><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.maps)}`} target="_blank" rel="noopener noreferrer">{o.address}</a></dd>
                <dd className="h-sm" style={{ marginBottom: 0 }}><a href={`mailto:${o.email}`}>{o.email}</a></dd>
              </dl>
            </article>
          ))}
        </div>
        <div className="wrap" style={{ marginTop: 24 }}>
          <p className="gst">GSTIN: {pending.gstin || <span className="pending">Pending from client</span>}</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap grid-2">
          <div className="sticky-col">
            <span className="eyebrow">{c.formEyebrow}</span>
            <h3 className="h-lg" style={{ marginBlock: 20 }} data-reveal>{c.formHeading}</h3>
            <p className="lead" data-reveal>{c.formText}</p>
          </div>
          <div className="panel" data-reveal><ContactForm /></div>
        </div>
      </section>
    </>
  );
}
