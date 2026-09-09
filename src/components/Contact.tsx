import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Newspaper, ShieldCheck, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "./icons";
import { site, socials, isPlaceholder } from "../data/site";
import SectionHeading from "./SectionHeading";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialState: FormState = { name: "", email: "", subject: "", message: "" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// EmailJS reads these from your build environment — never hardcode real keys in source.
// Copy .env.example to .env and fill in your own Service ID / Template ID / Public Key.
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;
const emailjsConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

const contactLinks = [
  { key: "email", label: "Email", icon: Mail, url: `mailto:${site.email}`, always: true },
  { key: "github", label: "GitHub", icon: GithubIcon, url: socials.github },
  { key: "linkedin", label: "LinkedIn", icon: LinkedinIcon, url: socials.linkedin },
  { key: "tryhackme", label: "TryHackMe", icon: ShieldCheck, url: socials.tryhackme },
  { key: "medium", label: "Medium", icon: Newspaper, url: socials.medium },
  { key: "x", label: "X", icon: XIcon, url: socials.x },
];

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function validate(values: FormState): Partial<FormState> {
    const next: Partial<FormState> = {};
    if (!values.name.trim()) next.name = "Name is required.";
    else if (values.name.trim().length > 100) next.name = "Keep it under 100 characters.";

    if (!values.email.trim()) next.email = "Email is required.";
    else if (!EMAIL_RE.test(values.email.trim())) next.email = "Enter a valid email address.";

    if (!values.subject.trim()) next.subject = "Subject is required.";
    else if (values.subject.trim().length > 150) next.subject = "Keep it under 150 characters.";

    if (!values.message.trim()) next.message = "Message is required.";
    else if (values.message.trim().length < 10) next.message = "Say a little more (10+ characters).";
    else if (values.message.trim().length > 2000) next.message = "Keep it under 2000 characters.";

    return next;
  }

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const sanitized: FormState = {
      name: form.name.trim().slice(0, 100),
      email: form.email.trim().slice(0, 254),
      subject: form.subject.trim().slice(0, 150),
      message: form.message.trim().slice(0, 2000),
    };

    const validationErrors = validate(sanitized);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (!emailjsConfigured) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID as string,
        TEMPLATE_ID as string,
        {
          from_name: sanitized.name,
          from_email: sanitized.email,
          subject: sanitized.subject,
          message: sanitized.message,
        },
        { publicKey: PUBLIC_KEY as string }
      );
      setStatus("sent");
      setForm(initialState);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-20 sm:py-28 border-t border-[var(--color-border-soft)]">
      <div className="container-shell">
        <SectionHeading
          tag="SEC-09 · Reach out"
          title="Contact"
          description="Open to internships, IT support roles, networking jobs, and cyber security opportunities in Bangladesh and beyond."
        />

        <div className="mt-12 grid lg:grid-cols-[280px_1fr] gap-8">
          <div className="space-y-2">
            {contactLinks.map(({ key, label, icon: Icon, url, always }) => {
              const disabled = !always && isPlaceholder(url);
              return (
                <a
                  key={key}
                  href={disabled ? undefined : url}
                  target={key === "email" ? undefined : disabled ? undefined : "_blank"}
                  rel={key === "email" ? undefined : disabled ? undefined : "noreferrer"}
                  aria-disabled={disabled}
                  className={`flex items-center gap-3 rounded-md border px-4 py-3 text-sm transition ${
                    disabled
                      ? "border-[var(--color-border-soft)] text-[var(--color-ink-faint)] cursor-default"
                      : "border-[var(--color-border)] text-[var(--color-ink)] hover:border-[var(--color-cyan-dim)] hover:text-[var(--color-cyan)]"
                  }`}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                  {label}
                </a>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} noValidate className="panel p-6 sm:p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-xs font-[var(--font-mono)] text-[var(--color-ink-dim)] mb-1.5">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className="w-full rounded-md bg-[var(--color-panel-alt)] border border-[var(--color-border)] px-3.5 py-2.5 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-cyan)] transition"
                  maxLength={100}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1.5 text-xs text-[var(--color-red)]">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-[var(--font-mono)] text-[var(--color-ink-dim)] mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className="w-full rounded-md bg-[var(--color-panel-alt)] border border-[var(--color-border)] px-3.5 py-2.5 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-cyan)] transition"
                  maxLength={254}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1.5 text-xs text-[var(--color-red)]">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs font-[var(--font-mono)] text-[var(--color-ink-dim)] mb-1.5">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                value={form.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                className="w-full rounded-md bg-[var(--color-panel-alt)] border border-[var(--color-border)] px-3.5 py-2.5 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-cyan)] transition"
                maxLength={150}
              />
              {errors.subject && (
                <p id="subject-error" className="mt-1.5 text-xs text-[var(--color-red)]">
                  {errors.subject}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-[var(--font-mono)] text-[var(--color-ink-dim)] mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                className="w-full rounded-md bg-[var(--color-panel-alt)] border border-[var(--color-border)] px-3.5 py-2.5 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-cyan)] transition resize-y"
                maxLength={2000}
              />
              {errors.message && (
                <p id="message-error" className="mt-1.5 text-xs text-[var(--color-red)]">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 rounded-md bg-[var(--color-cyan)] px-5 py-2.5 text-sm font-medium text-[#04140F] hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>

              {status === "sent" && (
                <p className="text-sm text-[var(--color-cyan)]" role="status">
                  Message sent — thanks, I'll reply soon.
                </p>
              )}
              {status === "error" && !emailjsConfigured && (
                <p className="text-sm text-[var(--color-amber)]" role="status">
                  Contact form isn't connected yet — email {site.email} directly for now.
                </p>
              )}
              {status === "error" && emailjsConfigured && (
                <p className="text-sm text-[var(--color-red)]" role="status">
                  Something went wrong sending that. Try again or email {site.email}.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
