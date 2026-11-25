









const PROFILE = {
  name: "Md Saikot Mia",
  handle: "saikot0x",
  role: "CST Student",
  fullTitle: "CST Student • Networking Enthusiast • Cyber Security Learner",
  typedLines: [
    "Networking Enthusiast",
    "Cyber Security Learner",
    "Future SOC Analyst"
  ],
  quotes: [
    "Learn by doing. Build with purpose. Improve every day.",
    "Learning today. Securing tomorrow.",
    "One lab, one scan, one writeup at a time.",
    "Built with curiosity, discipline & continuous learning.",
    "Start in networking. Grow into cyber security."
  ],
  heroLabel: "CST STUDENT / NETWORKING → CYBER SECURITY",
  heroHeading: "Learning today. Securing tomorrow.",
  heroSupport: "Computer Science & Technology student building a foundation in networking, Linux and practical security work — one lab, one scan, one writeup at a time.",
  location: "Bangladesh (UTC+6)",
  email: "saikotpc@gmail.com",
  resume: "resume.pdf",
  github: "https://github.com/saikot0x",
  linkedin: "https://www.linkedin.com/in/saikot0x/",
  tryhackme: "https://tryhackme.com/p/saikot0x",
  medium: "https://medium.com/@saikot0x",
  x: "https://x.com/saikot_0x",
  facebook: "https://www.facebook.com/saikot0x",
  instagram: "https://www.instagram.com/saikot0x",
  youtube: null,
  pgpKey: null,
  pgpFingerprint: null,
  availability: "Open to internships & networking roles",
  avatar: null,
  avatarPoster: null,
  bio: "I'm Md Saikot Mia, a Computer Science & Technology student passionate about networking and cybersecurity. I'm building my foundation in Linux, network fundamentals, security tools, ethical hacking, and practical security labs. My goal is to begin my professional career in networking and gradually grow into a cybersecurity professional.",
  facts: [
    {label:"Education",value:"Diploma in CST"},
    {label:"Institute",value:"Habiganj Polytechnic Institute"},
    {label:"Focus",value:"Networking → Cyber Security"},
    {label:"Certifications",value:"1"},
    {label:"Location",value:"Bangladesh"},
    {label:"Availability",value:"Open to internships & networking roles"}
  ],
  principles: [
    {icon:"🗡",title:"Learn by doing",text:"Hands-on practice, packet captures and real lab environments over theory alone."},
    {icon:"🛡",title:"Authorized labs only",text:"Security tools are practiced on platforms and machines built for learning."},
    {icon:"📜",title:"Document everything",text:"Notes and writeups turn every lab into something I can explain."},
    {icon:"🕊",title:"Improve every day",text:"Small tools, steady practice, honest skill levels."}
  ],
  vials: []
};

const STATS = [
  {value:48,suffix:"",label:"TryHackMe rooms completed"},
  {value:9,suffix:"",label:"TryHackMe badges"},
  {value:8,suffix:"",label:"Projects listed"},
  {value:1,suffix:"",label:"Certification earned"},
  {value:9,suffix:"%",label:"TryHackMe rank (top percent)"}
];

const SKILLS = [
  {name:"TCP/IP",category:"Networking",level:45,status:"Learning",icon:"🌐",desc:"Understanding TCP/IP communication and network fundamentals.",tools:["TCP","UDP","IP"]},
  {name:"OSI Model",category:"Networking",level:55,status:"Intermediate",icon:"🔗",desc:"Learning the seven layers and their responsibilities.",tools:["OSI","Protocols"]},
  {name:"IPv4 / IPv6",category:"Networking",level:40,status:"Learning",icon:"🌍",desc:"Addressing, IP formats, and basic configuration.",tools:["IPv4","IPv6"]},
  {name:"Subnetting",category:"Networking",level:30,status:"Learning",icon:"🧮",desc:"Practicing subnet masks, CIDR, and address ranges.",tools:["CIDR","IPv4"]},
  {name:"DNS",category:"Networking",level:40,status:"Learning",icon:"🔎",desc:"Understanding domain resolution and DNS records.",tools:["DNS","nslookup"]},
  {name:"DHCP",category:"Networking",level:35,status:"Learning",icon:"📡",desc:"Learning automatic IP address assignment.",tools:["DHCP","IP"]},
  {name:"NAT",category:"Networking",level:30,status:"Learning",icon:"🔀",desc:"Understanding network address translation.",tools:["NAT","Routing"]},
  {name:"HTTP / HTTPS",category:"Networking",level:45,status:"Learning",icon:"🌐",desc:"Understanding web requests, responses, and TLS basics.",tools:["HTTP","HTTPS"]},
  {name:"VLAN",category:"Networking",level:25,status:"Learning",icon:"🧩",desc:"Exploring network segmentation concepts.",tools:["VLAN","Switching"]},
  {name:"Routing",category:"Networking",level:30,status:"Learning",icon:"🛣️",desc:"Learning routes and packet forwarding.",tools:["Routing","IP"]},
  {name:"Switching",category:"Networking",level:35,status:"Learning",icon:"🔌",desc:"Understanding Ethernet switching and MAC addresses.",tools:["Ethernet","MAC"]},
  {name:"Network Troubleshooting",category:"Networking",level:40,status:"Learning",icon:"🛠️",desc:"Diagnosing basic connectivity problems.",tools:["ping","traceroute"]},
  {name:"Wireshark",category:"Networking",level:35,status:"Learning",icon:"🦈",desc:"Inspecting packets and learning traffic analysis.",tools:["PCAP","Filters"]},
  {name:"Nmap",category:"Networking",level:35,status:"Learning",icon:"🔍",desc:"Practicing authorized host discovery and service scanning.",tools:["Nmap","Ports"]},
  {name:"Reconnaissance",category:"Cyber Security",level:30,status:"Learning",icon:"🎯",desc:"Learning structured information gathering.",tools:["OSINT","Recon"]},
  {name:"Network Security",category:"Cyber Security",level:35,status:"Learning",icon:"🛡️",desc:"Understanding network defenses and common risks.",tools:["Firewalls","ACLs"]},
  {name:"Vulnerability Assessment",category:"Cyber Security",level:25,status:"Learning",icon:"🔎",desc:"Learning to identify and document security weaknesses.",tools:["Scanning","Reports"]},
  {name:"Web Security",category:"Cyber Security",level:30,status:"Learning",icon:"🌐",desc:"Studying common web application security risks.",tools:["OWASP","HTTP"]},
  {name:"Authentication Security",category:"Cyber Security",level:30,status:"Learning",icon:"🔐",desc:"Understanding passwords, sessions, and MFA.",tools:["MFA","Sessions"]},
  {name:"Linux Security",category:"Cyber Security",level:35,status:"Learning",icon:"🐧",desc:"Exploring permissions, updates, and system hardening.",tools:["Linux","Permissions"]},
  {name:"Basic Threat Hunting",category:"Cyber Security",level:20,status:"Learning",icon:"🕵️",desc:"Learning to investigate suspicious activity.",tools:["Logs","Indicators"]},
  {name:"Security Monitoring",category:"Cyber Security",level:25,status:"Learning",icon:"📊",desc:"Understanding security logs and monitoring basics.",tools:["Logs","Alerts"]},
  {name:"CTF",category:"Cyber Security",level:35,status:"Learning",icon:"🚩",desc:"Practicing security puzzles in authorized environments.",tools:["CTF","Labs"]},
  {name:"Ethical Hacking Fundamentals",category:"Cyber Security",level:30,status:"Learning",icon:"⚔️",desc:"Studying authorized testing methods and responsible disclosure.",tools:["Methodology","Labs"]},
  {name:"Python",category:"Programming",level:30,status:"Learning",icon:"🐍",desc:"Building programming fundamentals and small scripts.",tools:["Python","Scripts"]},
  {name:"Bash",category:"Programming",level:25,status:"Learning",icon:"⌨️",desc:"Learning shell commands and basic automation.",tools:["Bash","Linux"]},
  {name:"HTML",category:"Programming",level:55,status:"Intermediate",icon:"🌐",desc:"Creating semantic page structures.",tools:["HTML5","Forms"]},
  {name:"CSS",category:"Programming",level:45,status:"Learning",icon:"🎨",desc:"Styling responsive layouts and interfaces.",tools:["CSS3","Flexbox"]},
  {name:"JavaScript",category:"Programming",level:30,status:"Learning",icon:"📜",desc:"Learning browser scripting and interactive interfaces.",tools:["JavaScript","DOM"]},
  {name:"Git",category:"Programming",level:35,status:"Learning",icon:"🌿",desc:"Practicing version control and change tracking.",tools:["Git","CLI"]},
  {name:"GitHub",category:"Programming",level:40,status:"Learning",icon:"🐙",desc:"Managing repositories and publishing projects.",tools:["Repositories","README"]},
  {name:"Kali Linux",category:"Security / Technical Tools",level:35,status:"Learning",icon:"🐉",desc:"Exploring a Linux environment for security labs.",tools:["Linux","CLI"]},
  {name:"Nmap",category:"Security / Technical Tools",level:35,status:"Learning",icon:"🔍",desc:"Practicing authorized network discovery.",tools:["Nmap","Scanning"]},
  {name:"Wireshark",category:"Security / Technical Tools",level:35,status:"Learning",icon:"🦈",desc:"Learning packet capture and inspection.",tools:["PCAP","Filters"]},
  {name:"Burp Suite",category:"Security / Technical Tools",level:20,status:"Learning",icon:"🕸️",desc:"Exploring web requests in authorized test labs.",tools:["Proxy","Repeater"]},
  {name:"Metasploit",category:"Security / Technical Tools",level:15,status:"Learning",icon:"💥",desc:"Studying the framework in controlled training labs.",tools:["Framework","Labs"]},
  {name:"Gobuster",category:"Security / Technical Tools",level:15,status:"Learning",icon:"📂",desc:"Learning authorized web content discovery.",tools:["Gobuster","Wordlists"]},
  {name:"SQLMap",category:"Security / Technical Tools",level:15,status:"Learning",icon:"🗃️",desc:"Studying SQL injection testing in authorized labs.",tools:["SQL","Labs"]},
  {name:"Hashcat",category:"Security / Technical Tools",level:10,status:"Learning",icon:"🔑",desc:"Learning password hash auditing concepts.",tools:["Hashes","Auditing"]},
  {name:"John the Ripper",category:"Security / Technical Tools",level:10,status:"Learning",icon:"🔐",desc:"Exploring password auditing in controlled environments.",tools:["Hashes","Wordlists"]},
  {name:"Git",category:"Security / Technical Tools",level:35,status:"Learning",icon:"🌿",desc:"Tracking security lab notes and code changes.",tools:["Git","Version Control"]}
];

const SKILL_LINKS = [
  [0,1],
  [0,3],
  [0,4],
  [0,6],
  [0,9],
  [1,5],
  [1,9],
  [2,4],
  [2,8],
  [3,8],
  [5,8],
  [6,7],
  [6,8]
];

const PROJECT_CATS = {
  "all": "All",
  "net": "Networking",
  "web": "Web Security",
  "auto": "Automation",
  "ai": "AI & Tools",
  "dev": "Web Development"
};

const PROJECTS = [
  {
    "name": "Network Scanner",
    "featured": true,
    "cat": "net",
    "lang": "Python",
    "stars": 0,
    "forks": 0,
    "status": "Ongoing",
    "url": "https://github.com/saikot0x",
    "icon": "📡",
    "tagline": "Host & port discovery on a local network",
    "desc": "A Python-based network scanning tool designed to discover hosts, open ports, services, and basic network information on a local network.",
    "tags": [
      "python",
      "nmap",
      "linux",
      "enumeration"
    ],
    "caseStudy": {
      "problem": "Manually checking which hosts and services are reachable on a network is slow and error-prone — this automates host discovery and reporting.",
      "approach": "A Python tool built around Nmap for host discovery, port scanning, service detection and basic enumeration, with results reported in a readable form."
    }
  },
  {
    "name": "Web Security Lab",
    "featured": true,
    "cat": "web",
    "lang": "Lab",
    "stars": 0,
    "forks": 0,
    "status": "Ongoing",
    "url": "https://github.com/saikot0x",
    "icon": "🕸",
    "tagline": "Controlled lab for common web vulnerabilities",
    "desc": "A controlled web security laboratory for learning and demonstrating common web vulnerabilities in a safe, isolated environment.",
    "tags": [
      "burp-suite",
      "kali-linux",
      "owasp-juice-shop",
      "xss",
      "sqli"
    ],
    "caseStudy": {
      "problem": "Understanding web vulnerabilities requires hands-on practice, not just theory — this lab is a repeatable environment for testing and documenting findings.",
      "approach": "OWASP Juice Shop tested with Burp Suite on Kali Linux: XSS, SQL injection, authentication vulnerabilities and HTTP request analysis in an isolated environment."
    }
  },
  {
    "name": "Wireshark Network Analysis",
    "featured": true,
    "cat": "net",
    "lang": "Lab",
    "stars": 0,
    "forks": 0,
    "status": "Ongoing",
    "url": "https://github.com/saikot0x",
    "icon": "🦈",
    "tagline": "Reading real traffic, packet by packet",
    "desc": "A practical network traffic analysis project using Wireshark to capture and investigate real traffic patterns.",
    "tags": [
      "wireshark",
      "tcpdump",
      "tcp",
      "udp",
      "dns"
    ],
    "caseStudy": {
      "problem": "Reading raw packet captures is a core SOC/network skill — this project builds fluency in spotting normal vs. suspicious traffic.",
      "approach": "Packet capture, then TCP, UDP, DNS and HTTP/HTTPS analysis in Wireshark, ending with suspicious-traffic investigation."
    }
  },
  {
    "name": "Security Automation Scripts",
    "featured": true,
    "cat": "auto",
    "lang": "Python / Bash",
    "stars": 0,
    "forks": 0,
    "status": "Planned",
    "url": "https://github.com/saikot0x",
    "icon": "⚙",
    "tagline": "Small scripts for routine security tasks",
    "desc": "A collection of Python and Bash scripts that automate basic security and networking tasks to save time during practice and labs.",
    "tags": [
      "python",
      "bash",
      "automation"
    ],
    "caseStudy": {
      "problem": "Repetitive recon and reporting tasks slow down lab work — small scripts remove that friction.",
      "approach": "Planned collection of Python/Bash utilities: a port scanner, IP information tool, log analyzer, hash generator and network utility scripts."
    }
  },
  {
    "name": "JARVIS Assistant",
    "featured": true,
    "cat": "ai",
    "lang": "Python",
    "stars": 0,
    "forks": 0,
    "status": "Live",
    "url": "https://github.com/saikot0x",
    "icon": "🤖",
    "tagline": "Voice-enabled AI assistant for Kali Linux",
    "desc": "A voice-enabled AI assistant built for Kali Linux, supporting voice control, local system functions, and an online AI conversation mode.",
    "tags": [
      "python",
      "linux",
      "livekit",
      "speech-to-text",
      "text-to-speech"
    ],
    "caseStudy": {
      "problem": "Built to explore how far a local-first assistant can go on Linux — combining offline speech tools with an online AI mode for more complex tasks.",
      "approach": "Voice command control with local system functions, an online AI conversation mode, and an offline speech-to-text / text-to-speech fallback."
    }
  },
  {
    "name": "Smart Grocery Billing System",
    "featured": true,
    "cat": "dev",
    "lang": "JavaScript",
    "stars": 0,
    "forks": 0,
    "status": "Live",
    "url": "https://github.com/saikot0x",
    "icon": "🛒",
    "tagline": "Billing & inventory dashboard for small shops",
    "desc": "A store management panel for billing, inventory, products and customer records, built as a full college project with a clean dashboard UI.",
    "tags": [
      "html",
      "css",
      "javascript",
      "firebase"
    ],
    "caseStudy": {
      "problem": "Small shops need a simple, reliable billing and inventory workflow without complex POS software — this covers the core operations in one dashboard.",
      "approach": "Point-of-sale billing, product & category management, customer records and sales reports, built with HTML, CSS, JavaScript and Firebase. Live demo: https://smart-grocery-billing-system.vercel.app/"
    }
  },
  {
    "name": "3D Vibe Store",
    "featured": true,
    "cat": "dev",
    "lang": "JavaScript",
    "stars": 0,
    "forks": 0,
    "status": "Completed",
    "url": "https://github.com/saikot0x",
    "icon": "🧊",
    "tagline": "Interactive 3D product landing page",
    "desc": "An interactive 3D landing page with motion effects and a product-focused layout, built to explore 3D web experiences.",
    "tags": [
      "three-js",
      "javascript",
      "sqlite"
    ],
    "caseStudy": {
      "problem": "Most product landing pages are flat and static — this explores how 3D and motion can make browsing more engaging.",
      "approach": "A 3D interactive scene with motion-based interactions and a product-focused layout, built with Three.js and JavaScript."
    }
  },
  {
    "name": "Pentest Tool Finder",
    "featured": true,
    "cat": "auto",
    "lang": "Python",
    "stars": 0,
    "forks": 0,
    "status": "Completed",
    "url": "https://github.com/saikot0x",
    "icon": "🔧",
    "tagline": "Organizes Kali tools by category",
    "desc": "A Python script that scans a Kali Linux system and organizes installed security tools by category to save time and reduce confusion.",
    "tags": [
      "python",
      "linux",
      "security"
    ],
    "caseStudy": {
      "problem": "Kali ships with hundreds of tools — finding the right one by category during a lab is easier with an organized index.",
      "approach": "Scans the installed tool set, groups tools by category and gives quick lookup during labs."
    }
  }
];

const THM_BADGES = [
  {
    "icon": "🔥",
    "name": "3 Day Streak"
  },
  {
    "icon": "🔥",
    "name": "7 Day Streak"
  },
  {
    "icon": "🔥",
    "name": "30 Day Streak"
  },
  {
    "icon": "🐧",
    "name": "cat linux.txt"
  },
  {
    "icon": "🛡",
    "name": "Cyber Ready"
  },
  {
    "icon": "🏆",
    "name": "Gold League"
  },
  {
    "icon": "🔎",
    "name": "OhSINT"
  }
];

const HUNT_CYCLE = [
  {
    "n": "01",
    "icon": "📖",
    "name": "Learn",
    "text": "Pick one concept — a protocol, a tool, a technique — and study how it really works."
  },
  {
    "n": "02",
    "icon": "🧪",
    "name": "Practice",
    "text": "Try it hands-on in labs: TryHackMe rooms, Kali Linux, packet captures."
  },
  {
    "n": "03",
    "icon": "📜",
    "name": "Document",
    "text": "Write notes and writeups so every lab becomes something I can explain."
  },
  {
    "n": "04",
    "icon": "🛠",
    "name": "Build",
    "text": "Turn what I learned into small tools and projects, then repeat."
  }
];

const EXPERIENCE = [
  {
    "date": "Earlier",
    "type": "education",
    "role": "Secondary education",
    "org": "Hazi Boyen Uddin Public High School",
    "orgLabel": "SCHOOL",
    "desc": "School education before starting the CST diploma.",
    "points": [],
    "tools": []
  },
  {
    "date": "2020",
    "type": "experience",
    "role": "Started ethical hacking",
    "org": null,
    "orgLabel": "SELF-LEARNING · TERMUX",
    "desc": "First steps into ethical hacking, learning by experimenting with Termux.",
    "points": [
      "Self-taught, hands-on experiments",
      "First contact with the command line and security tools"
    ],
    "tools": [
      "Termux",
      "Linux"
    ]
  },
  {
    "date": "2025",
    "type": "experience",
    "role": "Focused cyber security & networking practice",
    "org": null,
    "orgLabel": "SELF-LEARNING",
    "desc": "Moved from early experiments to focused learning in networking and cyber security through practice.",
    "points": [
      "Networking fundamentals and Linux",
      "Security tools and practical labs"
    ],
    "tools": [
      "Kali Linux",
      "Nmap",
      "Wireshark"
    ]
  },
  {
    "date": "2026",
    "type": "experience",
    "role": "Cybersecurity (V2) course",
    "org": "Muktopaath — DIKKHA Project, ICT Division",
    "orgLabel": null,
    "desc": "Completed the Cybersecurity (V2) course on Muktopaath.",
    "points": [
      "Course completed in 2026",
      "Certificate earned"
    ],
    "tools": [
      "Cyber Security"
    ]
  },
  {
    "date": "Ongoing",
    "type": "education",
    "role": "Diploma in Computer Science & Technology",
    "org": "Habiganj Polytechnic Institute",
    "orgLabel": null,
    "desc": "Studying CST while building practical networking and security projects.",
    "points": [
      "Data Communication, Operating System, Microprocessor & Architecture",
      "Programming, Web Development, Data Structures & Algorithms",
      "Practical project work alongside coursework"
    ],
    "tools": [
      "Networking",
      "Linux",
      "Python"
    ]
  }
];

const CERTS = [
  {
    "icon": "🛡",
    "title": "Cybersecurity (V2)",
    "issuer": "Muktopaath — DIKKHA Project, ICT Division",
    "date": "2026",
    "verify": null
  }
];

const AVAILABILITY = {
  "open": true,
  "openLabel": "Open to internships & networking roles",
  "closedLabel": "Currently engaged",
  "detail": "Looking for internships, IT support, network support and junior security roles in Bangladesh and beyond."
};

 
window.NF_DATA = {
  PROFILE, STATS, SKILLS, SKILL_LINKS, PROJECT_CATS, PROJECTS, THM_BADGES,
  HUNT_CYCLE, EXPERIENCE, CERTS, AVAILABILITY
};
