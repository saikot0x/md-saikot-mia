# Md Saikot Mia — Cyber Security & Networking Portfolio

A React + TypeScript + Tailwind CSS portfolio built for cyber security /
networking internships and junior SOC / analyst roles.

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4 (via `@tailwindcss/postcss`, no separate config file — theme
  tokens live in `src/index.css` under `@theme`)
- lucide-react for icons (GitHub/LinkedIn/X are hand-drawn in
  `src/components/icons.tsx` since lucide dropped trademarked brand logos)
- EmailJS (`@emailjs/browser`) for the contact form

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build      # production build -> dist/
npm run preview    # preview the production build
```

## Update your content — no component edits needed

All real content lives in `src/data/`:

| File | What it controls |
|---|
| `site.ts` | Name, title, intro, email, resume link, **social URLs**, nav links |
| `projects.ts` | Project cards — add an object to add a project |
| `skills.ts` | Skill categories and levels (Familiar / Learning / Intermediate / Practical) |
| `labs.ts` | TryHackMe / Hack The Box profile URLs and stats (manual — no live API) |
| `writeups.ts` | Blog/writeup cards + filter categories |
| `certifications.ts` | Real certifications only — do not add unearned ones |
| `education.ts` | Diploma info + training timeline |
| `resume.ts` | Career focus + target roles shown in the Resume section |

## Placeholders to replace before publishing

Search the codebase for anything wrapped in `[ADD_...]` — these are marked
placeholders, not invented data:

- `socials.tryhackme`, `socials.hackthebox`, `socials.medium`, `socials.x` in
  `src/data/site.ts` / `src/data/labs.ts` — until filled in, those links
  render disabled/greyed out everywhere (nav, hero, footer, contact) instead
  of going nowhere.
- `education.institution` in `src/data/education.ts`.
- `public/resume.pdf` — a **placeholder PDF is included** so the download
  button works out of the box; it's clearly labelled as a template on the
  page itself. Replace it with your real resume (same filename).
- `public/og-image.png` — a generated placeholder social-share image in the
  same visual style as the site. Swap it for a custom one if you want.
- TryHackMe / Hack The Box stats in `src/data/labs.ts` show `—` until you
  update them by hand (no API is wired up).

## Contact form (EmailJS)

The form validates and sanitizes input client-side and sends via EmailJS.
Copy `.env.example` to `.env` and fill in your own values from
[emailjs.com](https://www.emailjs.com/):

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

`.env` is gitignored — never commit real keys. Until `.env` is filled in, the
form still validates but shows a friendly "not connected yet, email me
directly" message instead of failing silently.

## Deploying

Same flow as before: build (`npm run build`), then push `dist/` via GitHub
Pages / Vercel / Netlify. Update `index.html`'s canonical URL, `public/robots.txt`
and `public/sitemap.xml` if your deployed URL changes from
`https://saikot0x.github.io/portfolio/`.

## Accessibility & performance notes

- Respects `prefers-reduced-motion` globally (see `src/index.css`).
- Skip-to-content link, visible focus rings, semantic landmarks, alt/aria
  labels on icon-only buttons.
- Single hero SVG background + minimal, purposeful motion (typing role text,
  scroll-spy nav, reveal-on-scroll section headers) rather than animating
  everything.
