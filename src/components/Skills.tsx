import { skillCategories, type SkillLevel } from "../data/skills";
import SectionHeading from "./SectionHeading";

const levelColor: Record<SkillLevel, string> = {
  Practical: "text-[var(--color-cyan)] border-[var(--color-cyan-dim)]",
  Intermediate: "text-[var(--color-blue)] border-[var(--color-blue)]/40",
  Familiar: "text-[var(--color-ink-dim)] border-[var(--color-border)]",
  Learning: "text-[var(--color-amber)] border-[var(--color-amber)]/40",
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 sm:py-28 border-t border-[var(--color-border-soft)]">
      <div className="container-shell">
        <SectionHeading
          tag="SEC-02 · Capabilities"
          title="Skills"
          description="Grouped by domain — levels reflect honest, current standing, not inflated percentages."
        />

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {skillCategories.map((cat) => (
            <div key={cat.id} className="panel p-6">
              <h3 className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-ink)]">
                {cat.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-[var(--font-mono)] ${levelColor[skill.level]}`}
                    title={skill.level}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-4 text-xs text-[var(--color-ink-faint)] font-[var(--font-mono)]">
          {(Object.keys(levelColor) as SkillLevel[]).map((level) => (
            <span key={level} className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full border ${levelColor[level]}`} />
              {level}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
