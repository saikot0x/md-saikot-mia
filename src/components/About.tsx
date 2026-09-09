import { GraduationCap, Network, ShieldCheck, TerminalSquare, FlaskConical } from "lucide-react";
import SectionHeading from "./SectionHeading";

const facts = [
  { icon: GraduationCap, label: "CST Student" },
  { icon: Network, label: "Networking Enthusiast" },
  { icon: ShieldCheck, label: "Cyber Security Learner" },
  { icon: TerminalSquare, label: "Linux User" },
  { icon: FlaskConical, label: "Practical Lab Learner" },
];

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28 border-t border-[var(--color-border-soft)]">
      <div className="container-shell">
        <SectionHeading tag="SEC-01 · Profile" title="About" />

        <div className="mt-12 grid lg:grid-cols-[1fr_320px] gap-10">
          <div className="space-y-5 text-[var(--color-ink-dim)] leading-relaxed">
            <p>
              <span className="text-[var(--color-ink)] font-medium">Md Saikot Mia.</span>{" "}
              I'm a Computer Science &amp; Technology student interested in networking and
              cyber security. I'm currently building my foundation in networking, Linux,
              security tools, ethical hacking, and practical security labs.
            </p>
            <p>
              My career goal is to start my professional journey in networking and gradually
              grow into a cyber security professional — learning through real labs, packet
              captures, and small tools rather than theory alone.
            </p>
          </div>

          <div className="panel p-5 space-y-3">
            {facts.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-sm text-[var(--color-ink)]">
                <span className="p-1.5 rounded-md bg-[var(--color-panel-alt)] border border-[var(--color-border)]">
                  <Icon className="h-4 w-4 text-[var(--color-cyan)]" strokeWidth={1.75} />
                </span>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
