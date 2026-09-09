export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  department: string;
  status: string;
  subjects: string[];
}

// Fill in your institution name once you're ready to publish.
export const education: EducationEntry = {
  id: "cst-diploma",
  degree: "Diploma in Computer Science & Technology",
  institution: "[Add your institution name]",
  department: "Computer Science & Technology",
  status: "Currently studying",
  subjects: [
    "Data Communication",
    "Operating System",
    "Microprocessor & Architecture",
    "Programming",
    "Web Development",
    "Data Structures & Algorithms",
  ],
};

export interface TimelineEntry {
  id: string;
  year: string;
  detail: string;
  status: "Done" | "Complete" | "In Progress" | "Planned";
}

export const timeline: TimelineEntry[] = [
  { id: "a", year: "2020", detail: "Started learning ethical hacking with Termux", status: "Done" },
  { id: "b", year: "2025", detail: "Focused learning on cybersecurity and networking through practice", status: "Done" },
  { id: "c", year: "2026", detail: "Completed Cybersecurity (V2) course on Muktopaath", status: "Complete" },
  { id: "d", year: "Ongoing", detail: "CST diploma and practical project work", status: "In Progress" },
  { id: "e", year: "Next", detail: "Network/IT role and career growth into cyber security", status: "Planned" },
];
