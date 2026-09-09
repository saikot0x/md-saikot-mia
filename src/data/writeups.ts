export type WriteupCategory = "Networking" | "Cyber Security" | "Linux" | "Web Security" | "CTF";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface Writeup {
  id: string;
  title: string;
  summary: string;
  category: WriteupCategory;
  difficulty: Difficulty;
  date: string;
  tech: string[];
  url?: string;
}

// Add a new writeup by adding an object here. Set `url` once it's published on Medium/your blog.
export const writeups: Writeup[] = [
  {
    id: "tcp-handshake",
    title: "Understanding TCP Three-Way Handshake",
    summary:
      "How SYN, SYN-ACK and ACK establish a reliable connection, and what it looks like in a packet capture.",
    category: "Networking",
    difficulty: "Beginner",
    date: "2026",
    tech: ["TCP/IP", "Wireshark"],
  },
  {
    id: "nmap-scanning",
    title: "Nmap Port Scanning — Beginner to Practical",
    summary:
      "Working through Nmap scan types, timing options and service detection with real examples from lab practice.",
    category: "Networking",
    difficulty: "Beginner",
    date: "2026",
    tech: ["Nmap", "Linux"],
  },
  {
    id: "wireshark-dns",
    title: "Wireshark: Analyzing DNS Traffic",
    summary:
      "Filtering and reading DNS queries and responses in Wireshark, including what suspicious lookups can look like.",
    category: "Networking",
    difficulty: "Intermediate",
    date: "2026",
    tech: ["Wireshark", "DNS"],
  },
  {
    id: "linux-privesc",
    title: "Linux Privilege Escalation Basics",
    summary:
      "Common misconfigurations and enumeration steps used to move from a low-privilege shell to root in practice labs.",
    category: "Linux",
    difficulty: "Intermediate",
    date: "2026",
    tech: ["Linux", "Bash"],
  },
  {
    id: "burp-suite-testing",
    title: "Web Security Testing with Burp Suite",
    summary:
      "Setting up Burp Suite as a proxy and walking through request interception, repeater and basic vulnerability testing.",
    category: "Web Security",
    difficulty: "Intermediate",
    date: "2026",
    tech: ["Burp Suite", "Web Security"],
  },
  {
    id: "thm-journey",
    title: "My TryHackMe Learning Journey",
    summary:
      "Rooms, learning paths and lessons from my ongoing TryHackMe practice, and what I'm focusing on next.",
    category: "CTF",
    difficulty: "Beginner",
    date: "2026",
    tech: ["TryHackMe", "CTF"],
  },
];

export const writeupCategories: WriteupCategory[] = [
  "Networking",
  "Cyber Security",
  "Linux",
  "Web Security",
  "CTF",
];
