export interface LabStat {
  label: string;
  value: string;
}

export interface LabPlatform {
  id: string;
  name: string;
  profileUrl: string;
  buttonLabel: string;
  stats: LabStat[];
  note: string;
}

// Update these numbers by hand as your profiles grow — no live API wired up.
export const labPlatforms: LabPlatform[] = [
  {
    id: "tryhackme",
    name: "TryHackMe",
    profileUrl: "[ADD_TRYHACKME_URL]",
    buttonLabel: "View TryHackMe Profile",
    stats: [
      { label: "Rooms completed", value: "—" },
      { label: "Learning paths", value: "—" },
      { label: "Badges", value: "—" },
    ],
    note: "Hands-on security learning — actively in progress.",
  },
  {
    id: "hackthebox",
    name: "Hack The Box",
    profileUrl: "[ADD_HACKTHEBOX_URL]",
    buttonLabel: "View Hack The Box Profile",
    stats: [
      { label: "Machines solved", value: "—" },
      { label: "Labs completed", value: "—" },
    ],
    note: "Profile set up — practical machine work coming next.",
  },
];
