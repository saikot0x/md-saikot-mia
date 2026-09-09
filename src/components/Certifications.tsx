import { certifications } from "../data/certifications";
import SectionHeading from "./SectionHeading";
import CertificationCard from "./CertificationCard";

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 sm:py-28 border-t border-[var(--color-border-soft)]">
      <div className="container-shell">
        <SectionHeading tag="SEC-06 · Credentials" title="Certifications" />

        <div className="mt-10">
          {certifications.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <CertificationCard key={cert.id} cert={cert} />
              ))}
            </div>
          ) : null}

          <div className="mt-4 panel border-dashed p-5 text-sm text-[var(--color-ink-dim)]">
            Currently building certifications and practical security experience.
          </div>
        </div>
      </div>
    </section>
  );
}
