// lucide-react no longer ships trademarked brand logos, so these are small
// hand-drawn monoline stand-ins that match the icon sizing/props used elsewhere
// (className, strokeWidth are accepted but only className is actually needed
// since these are filled glyphs, not stroked ones — kept for drop-in parity).
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function GithubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0.8C5.6 0.8 0.5 5.9 0.5 12.3c0 5.1 3.3 9.4 7.9 11 .6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11 11 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.6 7.9-5.9 7.9-11C23.5 5.9 18.4.8 12 .8Z" />
    </svg>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8.3 18.5H5.7V9.7h2.6v8.8ZM7 8.6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm11.5 9.9h-2.6v-4.3c0-1-.02-2.4-1.5-2.4-1.5 0-1.7 1.1-1.7 2.3v4.4H10V9.7h2.5v1.2h.03c.35-.65 1.2-1.4 2.5-1.4 2.7 0 3.2 1.8 3.2 4.1v5Z" />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.3 2H21l-6.6 7.6L22.2 22h-6.8l-5.3-6.9L4 22H1.3l7.1-8.1L1 2h6.9l4.8 6.3L18.3 2Zm-1.2 18h1.5L7 4h-1.6l11.7 16Z" />
    </svg>
  );
}
