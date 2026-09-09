export type ProjectStatus = "Live" | "In Progress" | "Planned" | "Complete";

export interface Project {
  id: string;
  name: string;
  description: string;
  problem: string;
  tools: string[];
  features: string[];
  github?: string;
  demo?: string;
  status: ProjectStatus;
}

// Add a new project by adding an object here — no component edits needed.
export const projects: Project[] = [
  {
    id: "network-scanner",
    name: "Network Scanner",
    description:
      "A Python-based network scanning tool designed to discover hosts, open ports, services, and basic network information on a local network.",
    problem:
      "Manually checking which hosts and services are reachable on a network is slow and error-prone — this automates host discovery and reporting.",
    tools: ["Python", "Nmap", "Linux"],
    features: [
      "Host discovery",
      "Port scanning",
      "Service detection",
      "Basic enumeration",
      "Result reporting",
    ],
    status: "In Progress",
  },
  {
    id: "web-security-lab",
    name: "Web Security Lab",
    description:
      "A controlled web security laboratory for learning and demonstrating common web vulnerabilities in a safe, isolated environment.",
    problem:
      "Understanding web vulnerabilities requires hands-on practice, not just theory — this lab is a repeatable environment for testing and documenting findings.",
    tools: ["Burp Suite", "Kali Linux", "OWASP Juice Shop"],
    features: [
      "XSS testing",
      "SQL Injection testing",
      "Authentication vulnerability analysis",
      "HTTP request analysis",
      "Burp Suite proxy testing",
    ],
    status: "In Progress",
  },
  {
    id: "wireshark-analysis",
    name: "Wireshark Network Analysis",
    description:
      "A practical network traffic analysis project using Wireshark to capture and investigate real traffic patterns.",
    problem:
      "Reading raw packet captures is a core SOC/network skill — this project builds fluency in spotting normal vs. suspicious traffic.",
    tools: ["Wireshark", "tcpdump"],
    features: [
      "Packet capture",
      "TCP analysis",
      "UDP analysis",
      "DNS analysis",
      "HTTP/HTTPS traffic review",
      "Suspicious traffic investigation",
    ],
    status: "In Progress",
  },
  {
    id: "security-automation",
    name: "Security Automation Scripts",
    description:
      "A collection of Python and Bash scripts that automate basic security and networking tasks to save time during practice and labs.",
    problem:
      "Repetitive recon and reporting tasks slow down lab work — small scripts remove that friction.",
    tools: ["Python", "Bash"],
    features: [
      "Port scanner",
      "IP information tool",
      "Log analyzer",
      "Hash generator",
      "Network utility scripts",
    ],
    status: "Planned",
  },
  {
    id: "jarvis-assistant",
    name: "JARVIS Assistant",
    description:
      "A voice-enabled AI assistant built for Kali Linux, supporting voice control, local system functions, and an online AI conversation mode.",
    problem:
      "Built to explore how far a local-first assistant can go on Linux — combining offline speech tools with an online AI mode for more complex tasks.",
    tools: ["Python", "Linux", "LiveKit", "Speech-to-Text / Text-to-Speech"],
    features: [
      "Voice command control",
      "Local system functions",
      "Online AI conversation mode",
      "Offline STT/TTS fallback",
    ],
    status: "Live",
  },
  {
    id: "smart-grocery-billing",
    name: "Smart Grocery Billing System",
    description:
      "A store management panel for billing, inventory, products and customer records, built as a full college project with a clean dashboard UI.",
    problem:
      "Small shops need a simple, reliable billing and inventory workflow without complex POS software — this covers the core operations in one dashboard.",
    tools: ["HTML", "CSS", "JavaScript", "Firebase"],
    features: [
      "Point-of-sale billing",
      "Product & category CRUD",
      "Customer records",
      "Sales reports",
      "Staff management",
    ],
    demo: "https://smart-grocery-billing-system.vercel.app/",
    status: "Live",
  },
  {
    id: "3d-vibe-store",
    name: "3D Vibe Store",
    description:
      "An interactive 3D landing page with motion effects and a product-focused layout, built to explore 3D web experiences.",
    problem:
      "Most product landing pages are flat and static — this explores how 3D and motion can make browsing more engaging.",
    tools: ["Three.js", "JavaScript", "SQLite"],
    features: [
      "3D interactive scene",
      "Motion-based interactions",
      "Product-focused layout",
    ],
    status: "Complete",
  },
  {
    id: "pentest-tool-finder",
    name: "Pentest Tool Finder",
    description:
      "A Python script that scans a Kali Linux system and organizes installed security tools by category to save time and reduce confusion.",
    problem:
      "Kali ships with hundreds of tools — finding the right one by category during a lab is easier with an organized index.",
    tools: ["Python", "Linux", "Security"],
    features: [
      "Scans installed tool set",
      "Groups tools by category",
      "Quick lookup during labs",
    ],
    status: "Complete",
  },
];
