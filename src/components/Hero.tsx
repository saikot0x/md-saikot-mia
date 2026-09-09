import { useEffect, useState } from "react";
import { Newspaper, ShieldCheck, Download, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "./icons";
import { site, socials, isPlaceholder } from "../data/site";
import NetworkBackground from "./NetworkBackground";

const ROLES = [
  "Networking Enthusiast",
  "Cyber Security Learner",
  "Future SOC Analyst",
];

function TypedRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = ROLES[roleIndex];
    const speed = deleting ? 35 : 55;
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (text.length < full.length) {
          setText(full.slice(0, text.length + 1));
        } else {
          setTimeout(() => setDeleting(true), 1400);
        }
      } else {
        if (text.length > 0) {
          setText(full.slice(0, text.length - 1));
        } else {
          setDeleting(false);
          setRoleIndex((roleIndex + 1) % ROLES.length);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex]);

  return (
    <span className="text-[var(--color-cyan)] font-[var(--font-mono)]">
      {text}
      <span className="caret">_</span>
    </span>
  );
}

const socialIcons = [
  { key: "github", label: "GitHub", icon: GithubIcon, url: socials.github },
  { key: "linkedin", label: "LinkedIn", icon: LinkedinIcon, url: socials.linkedin },
  { key: "tryhackme", label: "TryHackMe", icon: ShieldCheck, url: socials.tryhackme },
  { key: "medium", label: "Medium", icon: Newspaper, url: socials.medium },
  { key: "x", label: "X", icon: XIcon, url: socials.x },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden grid-overlay"
    >
      <div className="absolute inset-0 pointer-events-none">
        <NetworkBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-bg)]/40 to-[var(--color-bg)]" />
      </div>

      <div className="container-shell relative">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-panel)]/70 px-3 py-1 text-xs font-[var(--font-mono)] text-[var(--color-ink-dim)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-cyan)] pulse-dot" />
            Open to internships &amp; networking roles
          </div>

          <h1 className="mt-6 font-[var(--font-display)] text-4xl sm:text-6xl font-semibold leading-[1.05] tracking-tight text-[var(--color-ink)]">
            {site.name}
          </h1>

          <p className="mt-4 text-lg sm:text-xl text-[var(--color-ink-dim)]">
            CST Student &middot; <TypedRole />
          </p>

          <p className="mt-6 text-[var(--color-ink-dim)] leading-relaxed max-w-xl">
            {site.intro}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-md bg-[var(--color-cyan)] px-5 py-2.5 text-sm font-medium text-[#04140F] hover:brightness-110 transition"
            >
              View My Projects
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={site.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] px-5 py-2.5 text-sm font-medium text-[var(--color-ink)] hover:border-[var(--color-cyan)] transition"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </div>

          <div className="mt-10 flex items-center gap-4">
            {socialIcons.map(({ key, label, icon: Icon, url }) => {
              const disabled = isPlaceholder(url);
              return (
                <a
                  key={key}
                  href={disabled ? undefined : url}
                  target={disabled ? undefined : "_blank"}
                  rel={disabled ? undefined : "noreferrer"}
                  aria-disabled={disabled}
                  aria-label={label}
                  title={disabled ? `${label} — coming soon` : label}
                  className={`p-2 rounded-md border border-[var(--color-border)] transition ${
                    disabled
                      ? "text-[var(--color-ink-faint)] cursor-default"
                      : "text-[var(--color-ink-dim)] hover:text-[var(--color-cyan)] hover:border-[var(--color-cyan)]"
                  }`}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
