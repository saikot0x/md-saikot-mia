export type SkillLevel = "Practical" | "Intermediate" | "Familiar" | "Learning";

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "networking",
    title: "Networking",
    skills: [
      { name: "TCP/IP", level: "Intermediate" },
      { name: "OSI Model", level: "Intermediate" },
      { name: "IPv4 / IPv6", level: "Intermediate" },
      { name: "Subnetting", level: "Practical" },
      { name: "DNS", level: "Intermediate" },
      { name: "DHCP", level: "Intermediate" },
      { name: "NAT", level: "Familiar" },
      { name: "HTTP / HTTPS", level: "Intermediate" },
      { name: "VLAN", level: "Familiar" },
      { name: "Routing", level: "Familiar" },
      { name: "Switching", level: "Familiar" },
      { name: "Network Troubleshooting", level: "Practical" },
      { name: "Wireshark", level: "Practical" },
      { name: "Nmap", level: "Practical" },
    ],
  },
  {
    id: "cybersecurity",
    title: "Cyber Security",
    skills: [
      { name: "Reconnaissance", level: "Practical" },
      { name: "Network Security", level: "Intermediate" },
      { name: "Vulnerability Assessment", level: "Learning" },
      { name: "Web Security", level: "Intermediate" },
      { name: "Authentication Security", level: "Learning" },
      { name: "Linux Security", level: "Practical" },
      { name: "Basic Threat Hunting", level: "Learning" },
      { name: "Security Monitoring", level: "Learning" },
      { name: "CTF", level: "Practical" },
      { name: "Ethical Hacking Fundamentals", level: "Intermediate" },
    ],
  },
  {
    id: "programming",
    title: "Programming",
    skills: [
      { name: "Python", level: "Practical" },
      { name: "Bash", level: "Intermediate" },
      { name: "HTML", level: "Practical" },
      { name: "CSS", level: "Practical" },
      { name: "JavaScript", level: "Intermediate" },
      { name: "Git", level: "Intermediate" },
      { name: "GitHub", level: "Practical" },
    ],
  },
  {
    id: "tools",
    title: "Security / Technical Tools",
    skills: [
      { name: "Kali Linux", level: "Practical" },
      { name: "Nmap", level: "Practical" },
      { name: "Wireshark", level: "Practical" },
      { name: "Burp Suite", level: "Intermediate" },
      { name: "Metasploit", level: "Learning" },
      { name: "Gobuster", level: "Learning" },
      { name: "SQLMap", level: "Learning" },
      { name: "Hashcat", level: "Familiar" },
      { name: "John the Ripper", level: "Familiar" },
      { name: "Git", level: "Intermediate" },
    ],
  },
];
