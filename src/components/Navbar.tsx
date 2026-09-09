import { useEffect, useState } from "react";
import { Menu, X, TerminalSquare } from "lucide-react";
import { navLinks } from "../data/site";
import { useScrollSpy } from "../hooks/useScrollSpy";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const ids = navLinks.map((l) => l.href.replace("#", ""));
  const activeId = useScrollSpy(ids);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleClick(href: string) {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "py-2.5 bg-[var(--color-bg)]/90 backdrop-blur-md border-[var(--color-border)]"
          : "py-4 bg-transparent border-transparent"
      }`}
    >
      <div className="container-shell flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleClick("#home");
          }}
          className="flex items-center gap-2 text-[var(--color-ink)] font-[var(--font-display)] font-semibold"
        >
          <TerminalSquare className="h-5 w-5 text-[var(--color-cyan)]" strokeWidth={1.75} />
          <span className="text-sm sm:text-base">Saikot Mia</span>
          <span className="hidden sm:inline text-[var(--color-ink-faint)] font-[var(--font-mono)] text-xs">
            /saikot0x
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const active = activeId === id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(link.href);
                }}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  active
                    ? "text-[var(--color-cyan)] bg-[var(--color-panel)]"
                    : "text-[var(--color-ink-dim)] hover:text-[var(--color-ink)]"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <button
          className="lg:hidden text-[var(--color-ink)] p-2"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav
          className="lg:hidden container-shell mt-3 pb-4 flex flex-col gap-1 border-t border-[var(--color-border)] pt-3"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleClick(link.href);
              }}
              className="px-2 py-2.5 text-sm text-[var(--color-ink-dim)] hover:text-[var(--color-cyan)] border-b border-[var(--color-border-soft)] last:border-0"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
