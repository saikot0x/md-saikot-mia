import { BadgeCheck, ExternalLink } from "lucide-react";
import type { Certification } from "../data/certifications";

export default function CertificationCard({ cert }: { cert: Certification }) {
  return (
    <div className="panel p-5 flex items-start gap-4">
      <span className="p-2 rounded-md bg-[var(--color-panel-alt)] border border-[var(--color-border)] shrink-0">
        <BadgeCheck className="h-5 w-5 text-[var(--color-cyan)]" strokeWidth={1.75} />
      </span>
      <div className="min-w-0">
        <h3 className="font-medium text-[var(--color-ink)]">{cert.name}</h3>
        <p className="text-sm text-[var(--color-ink-dim)]">{cert.issuer}</p>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[var(--color-ink-faint)] font-[var(--font-mono)]">
          <span>{cert.date}</span>
          {cert.credentialId && <span>ID: {cert.credentialId}</span>}
          {cert.verifyUrl && (
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[var(--color-cyan)] hover:underline"
            >
              Verify <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
