export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verifyUrl?: string;
}

// No fake certifications — only add entries here once they're real and confirmed.
export const certifications: Certification[] = [
  {
    id: "cybersecurity-v2-muktopaath",
    name: "Cybersecurity (V2)",
    issuer: "Muktopaath — DIKKHA Project, ICT Division",
    date: "2026",
  },
];
