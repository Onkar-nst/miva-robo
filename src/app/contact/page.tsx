import ContactForm from "@/components/ContactForm";
import OfficeMap from "@/components/OfficeMap";
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
          <Lines as="h1" className="h-xl" lines={[c.heading]} />
          <p className="lead" style={{ maxWidth: 760, marginTop: 24 }} data-reveal>{c.text}</p>
        </div>
      </section>
      <section className="section tight" style={{ paddingTop: 0 }}>
        <div className="wrap" data-reveal><OfficeMap /></div>
        {pending.gstin && (
          <div className="wrap" style={{ marginTop: 24 }}>
            <p className="gst">GSTIN: {pending.gstin}</p>
          </div>
        )}
      </section>
      <section className="section light">
        <div className="wrap cform">
          <div className="cform-intro">
            <span className="eyebrow">{c.formEyebrow}</span>
            <Lines className="h-lg" lines={[c.formHeading]} accent={2} />
            <p className="lead" data-reveal>{c.formText}</p>
            <ul className="cform-direct" data-reveal>
              {c.offices.map((o) => (
                <li key={o.city}>
                  <span className="idx">{o.city}</span>
                  <a href={`tel:${o.phone.replace(/-/g, "")}`}>{o.phone}</a>
                  <a href={`mailto:${o.email}`}>{o.email}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="cform-card" data-reveal><ContactForm /></div>
        </div>
      </section>
    </>
  );
}
