import { home } from "@/content/pages";
import ScrollButtons from "./ScrollButtons";
import { Lines } from "./ui";

// "Bhavyaraj V. (Rocket Engineering Corporation Pvt. Ltd.)" → person and company.
const split = (name: string) => {
  const [, person = name, company = ""] = name.match(/^(.+?)\s*\((.+)\)$/) ?? [];
  return { person, company };
};
const initials = (person: string) => person.split(/\s+/).map((w) => w[0]).join("").replace(/[^A-Z]/gi, "").slice(0, 2).toUpperCase();

// Every client quote at once as a row of cards; below 900px the row becomes an autoplaying carousel.
export default function Testimonials() {
  const list = home.testimonials;
  return (
    <div>
      <div className="mb-[clamp(32px,4vw,56px)] flex items-end justify-between gap-6">
        <div>
          <span className="eyebrow">Testimonials</span>
          <Lines className="h-md" lines={["What our clients say"]} accent={2} />
        </div>
        <ScrollButtons target="testimonials-track" label="testimonial" autoplay={6000} className="flex-none min-[900px]:hidden" />
      </div>

      <div id="testimonials-track" className="flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] max-[899px]:-mx-(--gutter) max-[899px]:scroll-px-(--gutter) max-[899px]:px-(--gutter) min-[900px]:grid min-[900px]:grid-cols-3 min-[900px]:gap-5 min-[900px]:overflow-visible">
        {list.map((x, n) => {
          const { person, company } = split(x.name);
          return (
            <figure key={x.name} data-reveal style={{ "--d": `${n * 0.08}s` } as React.CSSProperties}
              className="group relative m-0 flex w-[min(86vw,420px)] flex-none snap-start flex-col rounded-[4px] border border-line bg-bg-2 p-[clamp(24px,2.6vw,36px)] transition-[border-color,box-shadow] duration-500 hover:border-line-2 hover:shadow-[0_30px_60px_-38px_rgba(11,29,51,.28)] min-[900px]:w-auto
                after:absolute after:inset-x-0 after:top-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-700 after:ease-io after:content-[''] hover:after:scale-x-100">
              <span className="block h-9 font-serif text-[72px] leading-[.9] text-accent-text" aria-hidden="true">“</span>
              <blockquote className="mb-8 mt-3 text-pretty text-[16px] leading-[1.7] text-soft">{x.quote.replace(/^“|”$/g, "")}</blockquote>
              <figcaption className="mt-auto flex items-center gap-3.5 border-t border-line pt-5">
                <span className="grid size-11 flex-none place-items-center rounded-full bg-ink text-[13px] font-semibold tracking-[.04em] text-bg" aria-hidden="true">{initials(person)}</span>
                <span className="grid min-w-0 gap-0.5">
                  <b className="text-[15px] font-semibold leading-[1.3] tracking-[-.01em] text-ink">{person}</b>
                  <span className="text-[13px] leading-[1.4] text-muted">{company}</span>
                  <span className="mt-0.5 text-[11px] font-medium uppercase tracking-[.14em] text-accent-text">{x.role}</span>
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
