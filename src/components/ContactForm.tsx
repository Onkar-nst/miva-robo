"use client";

import { site } from "@/content/site";
import { ArrowUR } from "./ui";

const fields = [
  { name: "First Name", required: true },
  { name: "Email Address", required: true, type: "email", half: true },
  { name: "Phone Number", type: "tel", half: true },
  { name: "What is the scope of your project /query", required: true, area: true },
  { name: "Any specific technical requirements?" },
  { name: "What is your budget range? (in INR)", half: true },
  { name: "What is your timeline for implementation?", half: true },
];

export default function ContactForm() {
  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const body = fields.map((f) => `${f.name}: ${data.get(f.name) || ""}`).join("\n");
        location.href = `mailto:${site.email}?subject=${encodeURIComponent("Website enquiry")}&body=${encodeURIComponent(body)}`;
      }}
    >
      {fields.map((f, i) => (
        <div className={`field ${f.half ? "half" : ""}`} key={f.name}>
          <label htmlFor={`f${i}`}>{f.name}{f.required && " *"}</label>
          {f.area
            ? <textarea id={`f${i}`} name={f.name} required={f.required} rows={4} />
            : <input id={`f${i}`} name={f.name} required={f.required} type={f.type || "text"} />}
        </div>
      ))}
      <div className="form-submit">
        <button type="submit" className="cta">
          <span className="cta-label">Submit</span>
          <span className="cta-arrow"><ArrowUR /><ArrowUR /></span>
        </button>
      </div>
    </form>
  );
}
