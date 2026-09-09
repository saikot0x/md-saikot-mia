import { ArrowUpRight } from "lucide-react";
import type { Writeup } from "../data/writeups";

const difficultyColor: Record<string, string> = {
  Beginner: "text-[var(--color-cyan)]",
  Intermediate: "text-[var(--color-blue)]",
  Advanced: "text-[var(--color-amber)]",
};

export default function WriteupCard({ writeup }: { writeup: Writeup }) {
  return (
    <article className="panel p-5 flex flex-col hover:border-[var(--color-cyan-dim)] transition-colors">
      <div className="flex items-center justify-between text-[11px] font-[var(--font-mono)] text-[var(--color-ink-faint)]">
        <span>{writeup.category}</span>
        <span>{writeup.date}</span>
      </div>
      <h3 className="mt-2 font-[var(--font-display)] font-semibold text-[var(--color-ink)] leading-snug">
        {writeup.title}
      </h3>
      <p className="mt-2 text-sm text-[var(--color-ink-dim)] leading-relaxed flex-1">
        {writeup.summary}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <span className={`text-xs font-[var(--font-mono)] ${difficultyColor[writeup.difficulty]}`}>
          {writeup.difficulty}
        </span>
        {writeup.url ? (
          <a
            href={writeup.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm text-[var(--color-ink)] hover:text-[var(--color-cyan)] transition"
          >
            Read More <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        ) : (
          <span className="text-xs text-[var(--color-ink-faint)]">Publishing soon</span>
        )}
      </div>
    </article>
  );
}
