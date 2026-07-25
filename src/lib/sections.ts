import { SECTION_IDS, type ResumeData, type SectionId } from "@/types/resume";

function hasContent(data: ResumeData, id: SectionId): boolean {
  switch (id) {
    case "education":
      return data.education.length > 0;
    case "experience":
      return data.experience.length > 0;
    case "projects":
      return data.projects.length > 0;
    case "certifications":
      return data.certifications.length > 0;
    case "achievements":
      return data.achievements.length > 0;
    case "leadership":
      return data.leadership.length > 0;
    case "extraCurricular":
      return data.extraCurricular.length > 0;
    default:
      return false;
  }
}

/**
 * Returns the section ids that have content, in the user's chosen order.
 * Falls back to the default order, and appends any valid ids missing from
 * a stored (possibly stale/older) sectionOrder so nothing silently disappears.
 */
export function getOrderedSections(data: ResumeData): SectionId[] {
  const stored = Array.isArray(data.sectionOrder) && data.sectionOrder.length ? data.sectionOrder : SECTION_IDS;
  const seen = new Set(stored);
  const merged = [...stored, ...SECTION_IDS.filter((id) => !seen.has(id))];
  return merged.filter((id) => hasContent(data, id));
}
