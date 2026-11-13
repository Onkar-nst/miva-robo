"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { contactFields as fields } from "@/content/contact";
import { ctaClass, CtaInner } from "./ui";

const control = "w-full border border-transparent bg-bg px-4 py-3.5 text-[15px] text-ink transition-[border-color,background-color,box-shadow] duration-300 hover:border-line-2 focus:border-accent focus:bg-white focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_15%,transparent)] focus:outline-0";

type Status = { state: "idle" | "sending" | "sent" } | { state: "error"; message: string };

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const sending = status.state === "sending";

  return (
    <form
      className="grid grid-cols-2 gap-x-[18px] gap-y-[22px]"
      onSubmit={async (e) => {
        e.preventDefault();
        if (sending) return;
        const form = e.currentTarget;
        setStatus({ state: "sending" });
        try {
          const res = await fetch("/api/contact/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(new FormData(form))),
          });
          const out = await res.json().catch(() => ({}));
          if (!res.ok) throw new Error(out.error || "Something went wrong.");
          form.reset();
          setStatus({ state: "sent" });
        } catch (err) {
          setStatus({ state: "error", message: err instanceof Error ? err.message : "Something went wrong." });
        }
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
      {/* Honeypot for bots: hidden from people and screen readers. */}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
      <div className="col-span-2 mt-1.5 grid gap-4">
        <button type="submit" disabled={sending} className={`${ctaClass()} w-full justify-center !py-[19px] disabled:cursor-wait disabled:opacity-60`}>
          <CtaInner>{sending ? "Sending…" : "Submit"}</CtaInner>
        </button>
        <p role="status" aria-live="polite" className="text-[14px] empty:hidden">
          {status.state === "sent" && <span className="text-ink">Thank you — your message has been sent. We'll get back to you shortly.</span>}
          {status.state === "error" && (
            <span className="text-[#c0392b]">
              {status.message} You can also email us at <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>.
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
