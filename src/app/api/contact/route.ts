import nodemailer from "nodemailer";
import { contactFields } from "@/content/contact";

export const runtime = "nodejs";

// Mail goes out through Google Workspace SMTP (the domain's MX is Google), signed in as SMTP_USER
// with a Google app password in SMTP_PASS. Both are set in the Vercel project's environment variables.
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT || 465),
  secure: Number(process.env.SMTP_PORT || 465) === 465,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const json = (status: number, body: object) => Response.json(body, { status });

export async function POST(req: Request) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error("contact: SMTP_USER / SMTP_PASS not set");
    return json(500, { error: "Email is not configured." });
  }

  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return json(400, { error: "Invalid request." });
  }

  // Honeypot: real visitors never see or fill this field.
  if (typeof data.company_website === "string" && data.company_website) return json(200, { ok: true });

  const values: [string, string][] = contactFields.map((f) => {
    const v = typeof data[f.name] === "string" ? (data[f.name] as string).trim().slice(0, 5000) : "";
    return [f.name, v];
  });
  const get = (name: string) => values.find(([n]) => n === name)?.[1] || "";

  const missing = contactFields.filter((f) => f.required && !get(f.name));
  if (missing.length) return json(400, { error: `Please fill in: ${missing.map((f) => f.name).join(", ")}.` });

  const email = get("Email Address");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json(400, { error: "Please enter a valid email address." });

  const name = get("First Name").replace(/[\r\n]/g, " ");
  const to = process.env.CONTACT_TO || process.env.SMTP_USER;

  try {
    await transporter.sendMail({
      from: { name: "MIVA Robotics Website", address: process.env.SMTP_USER },
      to,
      replyTo: { name, address: email },
      subject: `Website enquiry from ${name}`,
      text: values.map(([k, v]) => `${k}: ${v || "-"}`).join("\n\n"),
      html: `<table cellpadding="8" style="border-collapse:collapse;font:14px/1.5 system-ui,sans-serif">${values
        .map(
          ([k, v]) =>
            `<tr><td style="vertical-align:top;color:#555;border-bottom:1px solid #eee"><b>${esc(k)}</b></td><td style="border-bottom:1px solid #eee;white-space:pre-wrap">${esc(v) || "-"}</td></tr>`,
        )
        .join("")}</table>`,
    });
    return json(200, { ok: true });
  } catch (err) {
    console.error("contact: sendMail failed", err);
    return json(502, { error: "Could not send your message. Please try again or email us directly." });
  }
}
