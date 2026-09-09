import { ExternalLink } from "lucide-react";
import { labPlatforms } from "../data/labs";
import { isPlaceholder } from "../data/site";
import SectionHeading from "./SectionHeading";

export default function CTFLabs() {
  return (
    <section id="labs" className="py-20 sm:py-28 border-t border-[var(--color-border-soft)]">
      <div className="container-shell">
        <SectionHeading
          tag="SEC-04 · Practice"
          title="CTF &amp; Security Labs"
          description="Where the hands-on learning happens — updated by hand as profiles grow."
        />

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {labPlatforms.map((platform) => {
            const disabled = isPlaceholder(platform.profileUrl);
            return (
              <div key={platform.id} className="panel p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-ink)]">
                    {platform.name}
                  </h3>
                  <span className="text-[11px] font-[var(--font-mono)] text-[var(--color-ink-faint)]">
                    {platform.note}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  {platform.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-md border border-[var(--color-border)] bg-[var(--color-panel-alt)] px-3 py-3 text-center"
                    >
                      <div className="font-[var(--font-display)] text-xl text-[var(--color-cyan)]">
                        {stat.value}
                      </div>
                      <div className="mt-1 text-[10px] text-[var(--color-ink-faint)] leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href={disabled ? undefined : platform.profileUrl}
                  target={disabled ? undefined : "_blank"}
                  rel={disabled ? undefined : "noreferrer"}
                  aria-disabled={disabled}
                  className={`mt-5 inline-flex items-center gap-2 text-sm ${
                    disabled
                      ? "text-[var(--color-ink-faint)] cursor-default"
                      : "text-[var(--color-cyan)] hover:underline"
                  }`}
                >
                  {platform.buttonLabel}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
