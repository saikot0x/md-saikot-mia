// Central config for personal info + social links.
// Update the [ADD_*] placeholders with your real profile URLs when ready.
export const site = {
  name: "Md Saikot Mia",
  handle: "saikot0x",
  title: "CST Student | Cyber Security Learner | Networking Enthusiast",
  tagline: "Future Cyber Security Professional",
  email: "saikotpc@gmail.com",
  location: "Bangladesh",
  intro:
    "I'm a Computer Science & Technology student building my foundation in networking, Linux and practical security work. My path starts in networking and IT support, and grows into cyber security — one lab, one scan, one writeup at a time.",
  resumeUrl: "/resume.pdf",
};

export const socials = {
  github: "https://github.com/saikot0x",
  linkedin: "https://www.linkedin.com/in/saikot0x/",
  tryhackme: "[ADD_TRYHACKME_URL]",
  hackthebox: "[ADD_HACKTHEBOX_URL]",
  medium: "[ADD_MEDIUM_URL]",
  x: "[ADD_X_URL]",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "CTF/Labs", href: "#labs" },
  { label: "Writeups", href: "#writeups" },
  { label: "Certifications", href: "#certifications" },
  { label: "Education", href: "#education" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export function isPlaceholder(url: string) {
  return !url || url.startsWith("[ADD_");
}
