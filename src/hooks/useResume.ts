import { useCallback, useEffect, useState } from "react";
import { emptyResume, type ResumeData } from "@/types/resume";

const STORAGE_KEY = "resume-builder:data";

function loadInitial(): ResumeData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyResume;
    const parsed = JSON.parse(raw);
    // Merge with defaults so newly-added fields don't break old saves
    return { ...emptyResume, ...parsed };
  } catch {
    return emptyResume;
  }
}

let idCounter = 0;
export function makeId(prefix: string) {
  idCounter += 1;
  return `${prefix}-${Date.now()}-${idCounter}`;
}

export function useResume() {
  const [resume, setResume] = useState<ResumeData>(loadInitial);

  useEffect(() => {
    const t = window.setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
      } catch {
        /* storage full or unavailable — ignore */
      }
    }, 250);
    return () => window.clearTimeout(t);
  }, [resume]);

  const update = useCallback(<K extends keyof ResumeData>(key: K, value: ResumeData[K]) => {
    setResume((prev) => ({ ...prev, [key]: value }));
  }, []);

  const updatePersonal = useCallback((patch: Partial<ResumeData["personal"]>) => {
    setResume((prev) => ({ ...prev, personal: { ...prev.personal, ...patch } }));
  }, []);

  const updateContact = useCallback((patch: Partial<ResumeData["contact"]>) => {
    setResume((prev) => ({ ...prev, contact: { ...prev.contact, ...patch } }));
  }, []);

  const setTemplate = useCallback((templateId: string) => {
    setResume((prev) => ({ ...prev, templateId }));
  }, []);

  const updateTheme = useCallback((patch: Partial<ResumeData["theme"]>) => {
    setResume((prev) => ({ ...prev, theme: { ...prev.theme, ...patch } }));
  }, []);

  const moveSection = useCallback((id: ResumeData["sectionOrder"][number], direction: "up" | "down") => {
    setResume((prev) => {
      const order = [...prev.sectionOrder];
      const idx = order.indexOf(id);
      if (idx === -1) return prev;
      const swapWith = direction === "up" ? idx - 1 : idx + 1;
      if (swapWith < 0 || swapWith >= order.length) return prev;
      [order[idx], order[swapWith]] = [order[swapWith], order[idx]];
      return { ...prev, sectionOrder: order };
    });
  }, []);

  const reset = useCallback(() => {
    setResume(emptyResume);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  return {
    resume,
    setResume,
    update,
    updatePersonal,
    updateContact,
    setTemplate,
    updateTheme,
    moveSection,
    reset,
  };
}
