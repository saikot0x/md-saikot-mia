import { GithubIcon } from "./icons";
import { projects } from "../data/projects";
import { socials } from "../data/site";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="py-20 sm:py-28 border-t border-[var(--color-border-soft)]">
      <div className="container-shell">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            tag="SEC-03 · Build Log"
            title="Projects"
            description="Practical work spanning networking tools, security labs, and applied programming."
          />
          <a
            href={socials.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-ink-dim)] hover:text-[var(--color-cyan)] transition"
          >
            <GithubIcon className="h-4 w-4" />
            All repos on GitHub
          </a>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
