import { FileDown, Target, Compass } from "lucide-react";
import { site } from "../data/site";
import { targetRoles, careerFocus } from "../data/resume";
import SectionHeading from "./SectionHeading";

export default function Resume() {
  return (
    <section id="resume" className="py-20 sm:py-28 border-t border-[var(--color-border-soft)]">
      <div className="container-shell">
        <SectionHeading tag="SEC-08 · Resume" title="Resume" />

        <div className="mt-12 grid lg:grid-cols-[1.1fr_1fr] gap-6">
          <div className="panel p-6 sm:p-8 flex flex-col">
            <div className="flex items-center gap-2 text-[var(--color-cyan)]">
              <Compass className="h-4 w-4" strokeWidth={1.75} />
              <span className="text-xs font-[var(--font-mono)] uppercase tracking-wide">
                Career focus
              </span>
            </div>
            <p className="mt-2 font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
              {careerFocus}
            </p>

            <div className="mt-6 flex items-center gap-2 text-[var(--color-cyan)]">
              <Target className="h-4 w-4" strokeWidth={1.75} />
              <span className="text-xs font-[var(--font-mono)] uppercase tracking-wide">
                Target roles
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {targetRoles.map((role) => (
                <span
                  key={role}
                  className="rounded-md border border-[var(--color-border)] bg-[var(--color-panel-alt)] px-3 py-1.5 text-sm text-[var(--color-ink-dim)]"
                >
                  {role}
                </span>
              ))}
            </div>

            <a
              href={site.resumeUrl}
              download
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-md bg-[var(--color-cyan)] px-5 py-2.5 text-sm font-medium text-[#04140F] hover:brightness-110 transition"
            >
              <FileDown className="h-4 w-4" />
              Download Resume
            </a>
            <p className="mt-2 text-xs text-[var(--color-ink-faint)]">
              PDF · updated as skills and experience grow.
            </p>
          </div>

          <div className="panel p-2 sm:p-3 flex items-center justify-center min-h-[280px]">
            <div className="w-full h-full rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-panel-alt)] flex flex-col items-center justify-center text-center px-6 py-10">
              <FileDown className="h-8 w-8 text-[var(--color-ink-faint)]" strokeWidth={1.5} />
              <p className="mt-3 text-sm text-[var(--color-ink-dim)]">
                Resume preview
              </p>
              <p className="mt-1 text-xs text-[var(--color-ink-faint)] max-w-xs">
                Add your PDF at <code className="font-[var(--font-mono)]">public/resume.pdf</code> to
                enable the download button and an inline preview here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
