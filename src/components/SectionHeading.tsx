import { useReveal } from "../hooks/useReveal";

interface Props {
  tag: string;
  title: string;
  description?: string;
}

export default function SectionHeading({ tag, title, description }: Props) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`max-w-2xl ${visible ? "fade-up" : "opacity-0"}`}
    >
      <p className="section-tag mb-2">{tag}</p>
      <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-semibold text-[var(--color-ink)] tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-[var(--color-ink-dim)] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
