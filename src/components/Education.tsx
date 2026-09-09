import { education, timeline } from "../data/education";
import SectionHeading from "./SectionHeading";

const statusColor: Record<string, string> = {
  Done: "border-[var(--color-cyan-dim)] text-[var(--color-cyan)]",
  Complete: "border-[var(--color-blue)]/40 text-[var(--color-blue)]",
  "In Progress": "border-[var(--color-amber)]/40 text-[var(--color-amber)]",
  Planned: "border-[var(--color-border)] text-[var(--color-ink-faint)]",
};

export default function Education() {
  return (
    <section id="education" className="py-20 sm:py-28 border-t border-[var(--color-border-soft)]">
      <div className="container-shell">
        <SectionHeading tag="SEC-07 · Path" title="Education" />

        <div className="mt-12 grid lg:grid-cols-[1fr_1.2fr] gap-10">
          <div className="panel p-6">
            <h3 className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-ink)]">
              {education.degree}
            </h3>
            <p className="mt-1 text-sm text-[var(--color-ink-dim)]">{education.institution}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-[var(--font-mono)] text-[var(--color-ink-faint)]">
              <span className="rounded border border-[var(--color-border)] px-2 py-0.5">
                {education.department}
              </span>
              <span className="rounded border border-[var(--color-cyan-dim)] text-[var(--color-cyan)] px-2 py-0.5">
                {education.status}
              </span>
            </div>
            <p className="mt-4 text-xs uppercase tracking-wide text-[var(--color-ink-faint)]">
              Relevant subjects
            </p>
            <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
              {education.subjects.map((s) => (
                <li key={s} className="text-sm text-[var(--color-ink-dim)] flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-[var(--color-cyan)] shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <ol className="relative border-l border-[var(--color-border)] pl-6 space-y-7">
            {timeline.map((entry) => (
              <li key={entry.id} className="relative">
                <span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-[var(--color-bg)] border-2 border-[var(--color-cyan)]" />
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-[var(--font-mono)] text-xs text-[var(--color-ink-faint)]">
                    {entry.year}
                  </span>
                  <span
                    className={`rounded border px-2 py-0.5 text-[10px] font-[var(--font-mono)] ${statusColor[entry.status]}`}
                  >
                    {entry.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-[var(--color-ink)]">{entry.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
