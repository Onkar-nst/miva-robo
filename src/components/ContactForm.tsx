"use client";

import { site } from "@/content/site";
import { ctaClass, CtaInner } from "./ui";

const fields = [
  { name: "First Name", required: true },
  { name: "Email Address", required: true, type: "email", half: true },
  { name: "Phone Number", type: "tel", half: true },
  { name: "What is the scope of your project /query", required: true, area: true },
  { name: "Any specific technical requirements?" },
  { name: "What is your budget range? (in INR)", half: true },
  { name: "What is your timeline for implementation?", half: true },
];

const control = "w-full border border-transparent bg-bg px-4 py-3.5 text-[15px] text-ink transition-[border-color,background-color,box-shadow] duration-300 hover:border-line-2 focus:border-accent focus:bg-white focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_15%,transparent)] focus:outline-0";

export default function ContactForm() {
  return (
    <form
      className="grid grid-cols-2 gap-x-[18px] gap-y-[22px]"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const body = fields.map((f) => `${f.name}: ${data.get(f.name) || ""}`).join("\n");
        location.href = `mailto:${site.email}?subject=${encodeURIComponent("Website enquiry")}&body=${encodeURIComponent(body)}`;
      }}
    >
      {fields.map((f, i) => (
        <div className={`col-span-2 grid gap-2 ${f.half ? "min-[621px]:col-span-1" : ""}`} key={f.name}>
          <label htmlFor={`f${i}`} className="text-[13px] font-medium text-soft">{f.name}{f.required && " *"}</label>
          {f.area
            ? <textarea id={`f${i}`} name={f.name} required={f.required} rows={4} className={`${control} min-h-[130px] resize-y`} />
            : <input id={`f${i}`} name={f.name} required={f.required} type={f.type || "text"} className={control} />}
        </div>
      ))}
      <div className="col-span-2 mt-1.5">
        <button type="submit" className={`${ctaClass()} w-full justify-center !py-[19px]`}><CtaInner>Submit</CtaInner></button>
      </div>
    </form>
  );
}
