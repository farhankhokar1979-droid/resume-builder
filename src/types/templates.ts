export interface TemplateMeta {
  id: string;
  name: string;
  description: string;
  category: string;
}

export const TEMPLATES: TemplateMeta[] = [
  {
    id: "dark-sidebar",
    name: "Professional Dark",
    description: "Classic dark sidebar with skill bars — clean and traditional",
    category: "Professional",
  },
  {
    id: "minimal-light",
    name: "Minimal Light",
    description: "Airy, modern layout with subtle accent lines — perfect for tech",
    category: "Modern",
  },
  {
    id: "modern-split",
    name: "Modern Split",
    description: "Dual-column with a striking header band — stands out instantly",
    category: "Modern",
  },
  {
    id: "creative-timeline",
    name: "Creative Timeline",
    description: "Timeline-style experience with icons — great for designers",
    category: "Creative",
  },
  {
    id: "bold-header",
    name: "Bold Header",
    description: "Large name plate with compact body — makes a strong first impression",
    category: "Professional",
  },
  {
    id: "elegant-serif",
    name: "Elegant Serif",
    description: "Refined serif typography, centered layout — ideal for academia",
    category: "Classic",
  },
  {
    id: "compact-tech",
    name: "Compact Tech",
    description: "Dense, icon-forward, tag-heavy — built for senior engineers",
    category: "Modern",
  },
  {
    id: "geometric-accent",
    name: "Geometric Accent",
    description: "Bold diagonal accent shapes, circular photo, quote banner — confident and modern",
    category: "Creative",
  },
  {
    id: "diamond-navy",
    name: "Diamond Navy",
    description: "Deep navy sidebar with a diamond-framed photo and interest icons",
    category: "Professional",
  },
  {
    id: "two-tone-panels",
    name: "Two-Tone Panels",
    description: "Card-based sections on a soft two-tone background — organized and scannable",
    category: "Modern",
  },
  {
    id: "photo-grid",
    name: "Photo Grid",
    description: "Photo-forward header with a clean grid body — friendly and approachable",
    category: "Creative",
  },
  {
    id: "executive-ribbon",
    name: "Executive Ribbon",
    description: "Horizontal ribbon header with a circular portrait — polished and formal",
    category: "Professional",
  },
  {
    id: "gradient-wave",
    name: "Gradient Wave",
    description: "Soft gradient hero with a wave divider — fresh and contemporary",
    category: "Creative",
  },
];

export const DEFAULT_TEMPLATE_ID = "dark-sidebar";
