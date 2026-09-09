import { Mail, Newspaper, ShieldCheck, TerminalSquare } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "./icons";
import { site, socials, isPlaceholder } from "../data/site";

const links = [
  { key: "email", label: "Email", icon: Mail, url: `mailto:${site.email}`, always: true },
  { key: "github", label: "GitHub", icon: GithubIcon, url: socials.github },
  { key: "linkedin", label: "LinkedIn", icon: LinkedinIcon, url: socials.linkedin },
  { key: "tryhackme", label: "TryHackMe", icon: ShieldCheck, url: socials.tryhackme },
  { key: "medium", label: "Medium", icon: Newspaper, url: socials.medium },
  { key: "x", label: "X", icon: XIcon, url: socials.x },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--color-border-soft)] py-10">
      <div className="container-shell flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-[var(--color-ink)] font-[var(--font-display)] font-semibold">
            <TerminalSquare className="h-4 w-4 text-[var(--color-cyan)]" strokeWidth={1.75} />
            {site.name}
          </div>
          <p className="mt-1 text-sm text-[var(--color-ink-dim)]">{site.title}</p>
        </div>

        <div className="flex flex-wrap gap-4">
          {links.map(({ key, label, icon: Icon, url, always }) => {
            const disabled = !always && isPlaceholder(url);
            return (
              <a
                key={key}
                href={disabled ? undefined : url}
                target={key === "email" ? undefined : disabled ? undefined : "_blank"}
                rel={key === "email" ? undefined : disabled ? undefined : "noreferrer"}
                aria-disabled={disabled}
                aria-label={label}
                title={label}
                className={`p-2 rounded-md border border-[var(--color-border)] transition ${
                  disabled
                    ? "text-[var(--color-ink-faint)] cursor-default"
                    : "text-[var(--color-ink-dim)] hover:text-[var(--color-cyan)] hover:border-[var(--color-cyan-dim)]"
                }`}
              >
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </a>
            );
          })}
        </div>
      </div>

      <div className="container-shell mt-8 pt-6 border-t border-[var(--color-border-soft)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-[var(--color-ink-faint)]">
        <p>© {year} {site.name}. All rights reserved.</p>
        <p className="font-[var(--font-mono)]">Built with curiosity, discipline &amp; continuous learning.</p>
      </div>
    </footer>
  );
}
