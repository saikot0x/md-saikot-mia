import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./icons";
import type { Project, ProjectStatus } from "../data/projects";

const statusStyle: Record<ProjectStatus, string> = {
  Live: "text-[var(--color-cyan)] border-[var(--color-cyan-dim)]",
  Complete: "text-[var(--color-blue)] border-[var(--color-blue)]/40",
  "In Progress": "text-[var(--color-amber)] border-[var(--color-amber)]/40",
  Planned: "text-[var(--color-ink-faint)] border-[var(--color-border)]",
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="panel p-6 flex flex-col hover:border-[var(--color-cyan-dim)] hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-ink)]">
          {project.name}
        </h3>
        <span
          className={`shrink-0 rounded-md border px-2 py-0.5 text-[11px] font-[var(--font-mono)] ${statusStyle[project.status]}`}
        >
          {project.status}
        </span>
      </div>

      <p className="mt-3 text-sm text-[var(--color-ink-dim)] leading-relaxed">
        {project.description}
      </p>

      <p className="mt-3 text-xs text-[var(--color-ink-faint)] leading-relaxed">
        <span className="text-[var(--color-ink-dim)]">Problem solved: </span>
        {project.problem}
      </p>

      <ul className="mt-4 space-y-1.5">
        {project.features.slice(0, 4).map((f) => (
          <li key={f} className="text-xs text-[var(--color-ink-dim)] flex items-start gap-2">
            <span className="mt-1.5 h-1 w-1 rounded-full bg-[var(--color-cyan)] shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tools.map((t) => (
          <span
            key={t}
            className="rounded border border-[var(--color-border)] px-2 py-0.5 text-[11px] font-[var(--font-mono)] text-[var(--color-ink-dim)]"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-[var(--color-border-soft)] flex gap-3">
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--color-ink)] hover:text-[var(--color-cyan)] transition"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-sm text-[var(--color-ink-faint)]">
            <GithubIcon className="h-4 w-4" />
            Repo coming soon
          </span>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--color-ink)] hover:text-[var(--color-cyan)] transition"
          >
            <ExternalLink className="h-4 w-4" strokeWidth={1.75} />
            Live Demo
          </a>
        )}
      </div>
    </article>
  );
}
