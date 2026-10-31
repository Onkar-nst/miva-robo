import ContactForm from "@/components/ContactForm";
import OfficeMap from "@/components/OfficeMap";
import { Lines } from "@/components/ui";
import { contact as c } from "@/content/pages";
import { pending } from "@/content/site";

export const metadata = { title: "Contact – MIVA Robotics", alternates: { canonical: "/contact/" } };

export default function Contact() {
  return (
    <>
      <section className="pb-[clamp(48px,6vw,88px)] pt-[clamp(170px,18vw,240px)]">
        <div className="wrap">
          <span className="eyebrow">{c.eyebrow}</span>
          <Lines as="h1" className="h-xl" lines={[c.heading]} />
          <p className="lead mt-6 max-w-[760px]" data-reveal>{c.text}</p>
        </div>
      </section>
      <section className="section-tight !pt-0">
        <div className="wrap" data-reveal><OfficeMap /></div>
        {pending.gstin && (
          <div className="wrap mt-6">
            <p className="text-[13px] tracking-[.04em] text-muted">GSTIN: {pending.gstin}</p>
          </div>
        )}
      </section>
      <section className="section-y light">
        <div className="wrap grid gap-12 min-[1000px]:grid-cols-[5fr_7fr] min-[1000px]:items-start min-[1000px]:gap-[6vw]">
          <div className="min-[1000px]:sticky min-[1000px]:top-[120px]">
            <span className="eyebrow">{c.formEyebrow}</span>
            <Lines className="h-lg mb-[22px]" lines={[c.formHeading]} accent={2} />
            <p className="lead" data-reveal>{c.formText}</p>
            <ul className="mt-10 border-t border-line" data-reveal>
              {c.offices.map((o) => (
                <li key={o.city} className="grid gap-1 border-b border-line py-[18px] [&_a]:w-fit [&_a]:text-base [&_a]:font-medium [&_a]:text-ink [&_a]:transition-colors [&_a]:duration-300 [&_a:hover]:text-accent">
                  <span className="idx mb-1">{o.city}</span>
                  <a href={`tel:${o.phone.replace(/-/g, "")}`}>{o.phone}</a>
                  <a href={`mailto:${o.email}`}>{o.email}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-line bg-white p-[clamp(24px,3.4vw,48px)] shadow-[0_40px_80px_-50px_rgba(15,40,63,.35)]" data-reveal><ContactForm /></div>
        </div>
      </section>
    </>
  );
}
