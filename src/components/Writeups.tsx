import { useState } from "react";
import { writeups, writeupCategories, type WriteupCategory } from "../data/writeups";
import SectionHeading from "./SectionHeading";
import WriteupCard from "./WriteupCard";

export default function Writeups() {
  const [filter, setFilter] = useState<WriteupCategory | "All">("All");
  const visible = filter === "All" ? writeups : writeups.filter((w) => w.category === filter);

  return (
    <section id="writeups" className="py-20 sm:py-28 border-t border-[var(--color-border-soft)]">
      <div className="container-shell">
        <SectionHeading
          tag="SEC-05 · Notes"
          title="Writeups"
          description="Short technical notes from labs and practice sessions."
        />

        <div className="mt-8 flex flex-wrap gap-2">
          {(["All", ...writeupCategories] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-[var(--font-mono)] transition-colors ${
                filter === cat
                  ? "border-[var(--color-cyan)] text-[var(--color-cyan)] bg-[var(--color-cyan)]/10"
                  : "border-[var(--color-border)] text-[var(--color-ink-dim)] hover:text-[var(--color-ink)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((w) => (
            <WriteupCard key={w.id} writeup={w} />
          ))}
        </div>
      </div>
    </section>
  );
}
