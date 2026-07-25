import type { CSSProperties } from "react";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { getOrderedSections } from "@/lib/sections";
import type { SectionId } from "@/types/resume";
import type { TemplateProps } from "./types";

export default function TemplateExecutiveRibbon({ data }: TemplateProps) {
  const { personal, contact, technicalSkills, languages, education, experience, projects, certifications, achievements, leadership, extraCurricular } = data;
  const heading: CSSProperties = { fontFamily: "var(--resume-font-heading)" };
  const body: CSSProperties = { fontFamily: "var(--resume-font-body)" };
  const accent: CSSProperties = { color: "var(--resume-accent)" };

  const labels: Record<SectionId, string> = {
    education: "Education",
    experience: "Professional Experience",
    projects: "Key Projects",
    certifications: "Certifications",
    achievements: "Achievements",
    leadership: "Leadership",
    extraCurricular: "Extra-Curricular",
  };

  function renderSection(id: SectionId) {
    const header = (
      <h2 style={heading} className="text-sm font-bold uppercase tracking-wide text-slate-900 mb-2 flex items-center gap-3">
        {labels[id]}
        <span className="flex-1 h-px" style={{ backgroundColor: "var(--resume-accent)" }} />
      </h2>
    );
    switch (id) {
      case "education":
        return (
          <div key={id} className="mb-4">
            {header}
            <div className="space-y-2">
              {education.map((ed) => (
                <div key={ed.id} className="flex justify-between">
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{ed.degree}</p>
                    <p className="text-slate-500 text-xs">{ed.institution}</p>
                  </div>
                  <span className="text-xs text-slate-400 whitespace-nowrap">{ed.startDate} – {ed.endDate}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case "experience":
        return (
          <div key={id} className="mb-4">
            {header}
            <div className="space-y-3">
              {experience.map((xp) => (
                <div key={xp.id}>
                  <div className="flex justify-between">
                    <p className="font-semibold text-slate-900 text-sm">{xp.role}, {xp.company}</p>
                    <span className="text-xs text-slate-400 whitespace-nowrap">{xp.startDate} – {xp.endDate}</span>
                  </div>
                  <ul className="list-disc list-inside text-slate-600 text-xs mt-1 space-y-0.5">
                    {xp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );
      case "projects":
        return (
          <div key={id} className="mb-4">
            {header}
            <div className="space-y-2">
              {projects.map((p) => (
                <div key={p.id}>
                  <p className="font-semibold text-slate-900 text-sm">{p.name}</p>
                  <p className="text-slate-600 text-xs">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "certifications":
        return (
          <div key={id} className="mb-4">
            {header}
            <div className="space-y-1 text-xs text-slate-600">
              {certifications.map((c) => <p key={c.id}>{c.name} — {c.issuer} ({c.date})</p>)}
            </div>
          </div>
        );
      case "achievements":
        return (
          <div key={id} className="mb-4">
            {header}
            <div className="space-y-1 text-xs text-slate-600">
              {achievements.map((a) => <p key={a.id}><span className="font-semibold text-slate-800">{a.title}:</span> {a.description}</p>)}
            </div>
          </div>
        );
      case "leadership":
        return (
          <div key={id} className="mb-4">
            {header}
            <div className="space-y-1 text-xs text-slate-600">
              {leadership.map((l) => <p key={l.id}><span className="font-semibold text-slate-800">{l.role} · {l.organization}:</span> {l.description}</p>)}
            </div>
          </div>
        );
      case "extraCurricular":
        return (
          <div key={id} className="mb-4">
            {header}
            <div className="space-y-1 text-xs text-slate-600">
              {extraCurricular.map((ex) => <p key={ex.id}><span className="font-semibold text-slate-800">{ex.title}:</span> {ex.description}</p>)}
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div style={body} className="w-full h-full flex flex-col text-[13px] leading-snug text-slate-800 bg-white">
      <div className="flex items-center gap-5 px-8 py-6 text-white" style={{ backgroundColor: "#1e293b" }}>
        <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 border-4" style={{ borderColor: "var(--resume-accent)" }}>
          {personal.photoUrl ? (
            <img src={personal.photoUrl} alt={personal.fullName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl font-bold" style={{ backgroundColor: "var(--resume-accent)" }}>
              {personal.fullName.charAt(0) || "?"}
            </div>
          )}
        </div>
        <div className="flex-1">
          <h1 style={heading} className="text-2xl font-bold">{personal.fullName}</h1>
          <p className="text-sm font-medium" style={accent}>{personal.title}</p>
        </div>
      </div>
      <div className="px-8 py-2 flex flex-wrap gap-4 text-xs text-white" style={{ backgroundColor: "var(--resume-accent)" }}>
        {contact.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{contact.email}</span>}
        {contact.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{contact.phone}</span>}
        {contact.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{contact.location}</span>}
        {contact.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" />{contact.linkedin}</span>}
      </div>

      <div className="flex-1 px-8 py-6">
        {personal.summary && <p className="text-slate-600 text-xs mb-4">{personal.summary}</p>}
        {getOrderedSections(data).map(renderSection)}

        {(technicalSkills.length > 0 || languages.length > 0) && (
          <div className="grid grid-cols-2 gap-6 mt-2 pt-4 border-t border-slate-100">
            {technicalSkills.length > 0 && (
              <div>
                <h2 style={heading} className="text-sm font-bold uppercase tracking-wide text-slate-900 mb-2">Skills</h2>
                <div className="flex flex-wrap gap-1.5">
                  {technicalSkills.map((s) => (
                    <span key={s.id} className="text-[11px] px-2 py-1 rounded" style={{ backgroundColor: "#f1f5f9", color: "#1e293b" }}>{s.name}</span>
                  ))}
                </div>
              </div>
            )}
            {languages.length > 0 && (
              <div>
                <h2 style={heading} className="text-sm font-bold uppercase tracking-wide text-slate-900 mb-2">Languages</h2>
                <p className="text-xs text-slate-600">{languages.map((l) => l.name).join(", ")}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
