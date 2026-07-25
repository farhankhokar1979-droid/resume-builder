export interface PersonalInfo {
  fullName: string;
  title: string;
  photoUrl: string;
  summary: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  dob: string;
  linkedin: string;
  website: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: number; // 0-100
}

export interface LanguageItem {
  id: string;
  name: string;
  level: number; // 0-100
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  score: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  link: string;
  description: string;
  tags: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
}

export interface LeadershipItem {
  id: string;
  role: string;
  organization: string;
  description: string;
}

export interface ExtraCurricularItem {
  id: string;
  title: string;
  description: string;
}

export interface ThemeConfig {
  accentColor: string; // hex color, e.g. "#2563eb"
  fontHeading: string; // CSS font-family stack for headings
  fontBody: string; // CSS font-family stack for body text
}

export const FONT_PAIRINGS: { id: string; label: string; heading: string; body: string }[] = [
  {
    id: "inter",
    label: "Inter / Inter",
    heading: "'Inter', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
  },
  {
    id: "poppins-inter",
    label: "Poppins / Inter",
    heading: "'Poppins', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
  },
  {
    id: "playfair-inter",
    label: "Playfair Display / Inter",
    heading: "'Playfair Display', Georgia, serif",
    body: "'Inter', system-ui, sans-serif",
  },
  {
    id: "montserrat-lora",
    label: "Montserrat / Lora",
    heading: "'Montserrat', system-ui, sans-serif",
    body: "'Lora', Georgia, serif",
  },
  {
    id: "space-inter",
    label: "Space Grotesk / Inter",
    heading: "'Space Grotesk', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
  },
  {
    id: "merriweather",
    label: "Merriweather / Merriweather",
    heading: "'Merriweather', Georgia, serif",
    body: "'Merriweather', Georgia, serif",
  },
  {
    id: "jetbrains",
    label: "JetBrains Mono / Inter",
    heading: "'JetBrains Mono', monospace",
    body: "'Inter', system-ui, sans-serif",
  },
];

export const ACCENT_COLORS: string[] = [
  "#2563eb", // blue
  "#dc2626", // red
  "#7c3aed", // violet
  "#0d9488", // teal
  "#d97706", // amber
  "#059669", // emerald
  "#db2777", // pink
  "#0f172a", // slate/near-black
  "#4f46e5", // indigo
  "#ea580c", // orange
];

// Ordered list of the reorderable "main flow" resume sections.
export const SECTION_IDS = [
  "education",
  "experience",
  "projects",
  "certifications",
  "achievements",
  "leadership",
  "extraCurricular",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export const SECTION_LABELS: Record<SectionId, string> = {
  education: "Education",
  experience: "Experience",
  projects: "Projects",
  certifications: "Certifications",
  achievements: "Achievements",
  leadership: "Leadership",
  extraCurricular: "Extra-Curricular",
};

export interface ResumeData {
  templateId: string;
  theme: ThemeConfig;
  sectionOrder: SectionId[];
  personal: PersonalInfo;
  contact: ContactInfo;
  technicalSkills: SkillItem[];
  languages: LanguageItem[];
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  leadership: LeadershipItem[];
  techStack: string[];
  extraCurricular: ExtraCurricularItem[];
}

export const emptyResume: ResumeData = {
  templateId: "dark-sidebar",
  theme: {
    accentColor: "#2563eb",
    fontHeading: FONT_PAIRINGS[0].heading,
    fontBody: FONT_PAIRINGS[0].body,
  },
  sectionOrder: [...SECTION_IDS],
  personal: {
    fullName: "Your Name",
    title: "Software Engineer",
    photoUrl: "",
    summary:
      "Motivated and detail-oriented Software Engineering student with strong problem-solving skills and experience in building efficient, scalable, and user-friendly applications. Passionate about learning new technologies and solving real-world problems.",
  },
  contact: {
    email: "youremail@gmail.com",
    phone: "+92 300 1234567",
    location: "Jhang, Punjab, Pakistan",
    dob: "",
    linkedin: "linkedin.com/in/yourname",
    website: "",
  },
  technicalSkills: [
    { id: "s1", name: "Python", level: 85 },
    { id: "s2", name: "C / C++", level: 75 },
    { id: "s3", name: "Java", level: 70 },
    { id: "s4", name: "JavaScript", level: 80 },
    { id: "s5", name: "HTML / CSS", level: 85 },
    { id: "s6", name: "SQL", level: 70 },
    { id: "s7", name: "Git & GitHub", level: 80 },
  ],
  languages: [
    { id: "l1", name: "English", level: 90 },
    { id: "l2", name: "Urdu", level: 100 },
  ],
  education: [
    {
      id: "e1",
      degree: "BS Software Engineering",
      institution: "The Islamia University of Bahawalpur",
      startDate: "2023",
      endDate: "Present",
      score: "3.94 / 4.00 (Till 5th Semester)",
    },
  ],
  experience: [
    {
      id: "x1",
      role: "Software Engineering Intern",
      company: "Company Name (Remote)",
      startDate: "Jan 2025",
      endDate: "Mar 2025",
      bullets: [
        "Worked on developing responsive web applications using Flask and SQLite.",
        "Collaborated with the team to design and implement major features.",
        "Optimized applications for performance and scalability.",
      ],
    },
    {
      id: "x2",
      role: "Freelance Developer",
      company: "Self-employed",
      startDate: "Jun 2024",
      endDate: "Present",
      bullets: [
        "Developed custom websites for clients using HTML, CSS, and Python.",
        "Delivered high-quality solutions within deadlines.",
        "Maintained client satisfaction and long-term relationships.",
      ],
    },
  ],
  projects: [
    {
      id: "p1",
      name: "Resume Builder",
      link: "",
      description:
        "A static resume builder web app with multiple templates and live preview.",
      tags: ["React", "TypeScript", "Tailwind CSS"],
    },
  ],
  certifications: [],
  achievements: [],
  leadership: [],
  techStack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
  extraCurricular: [],
};
