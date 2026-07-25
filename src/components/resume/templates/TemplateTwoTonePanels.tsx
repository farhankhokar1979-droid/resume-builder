import type { CSSProperties, ReactNode } from "react";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { getOrderedSections } from "@/lib/sections";
import type { SectionId } from "@/types/resume";
import type { TemplateProps } from "./types";

export default function TemplateTwoTonePanels({ data }: TemplateProps) {
  const { personal, contact, technicalSkills, languages, education, experience, projects, certifications, achievements, leadership, extraCurricular } = data;
  const heading: CSSProperties = { fontFamily: "var(--resume-font-heading)" };
  const body: CSSProperties = { fontFamily: "var(--resume-font-body)" };
  const accent: CSSProperties = { color: "var(--resume-accent)" };

  const labels: Record<SectionId, string> = {
    education: "Education",
    experience: "Experience",
    projects: "Projects",
    certifications: "Certifications",
    achievements: "Achievements",
    leadership: "Leadership",
    extraCurricular: "Extra-Curricular",
  };

  function Panel({ id, children }: { id: SectionId; children: ReactNode }) {
    return (
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
        <h2 style={{ ...heading, ...accent }} className="text-xs font-bold uppercase tracking-wide mb-3 pb-2 border-b border-slate-100">
          {labels[id]}
        </h2>
        {children}
      </div>
    );
  }

  function renderPanel(id: SectionId) {
    switch (id) {
      case "education":
        return (
          <Panel key={id} id={id}>
            <div className="space-y-2">
              {education.map((ed) => (
                <div key={ed.id}>
                  <div className="flex justify-between">
                    <p className="font-semibold text-slate-900 text-sm">{ed.degree}</p>
                    <span className="text-xs text-slate-400 whitespace-nowrap">{ed.startDate} – {ed.endDate}</span>
                  </div>
                  <p className="text-slate-500 text-xs">{ed.institution}</p>
                  {ed.score && <p className="text-xs mt-0.5" style={accent}>{ed.score}</p>}
                </div>
              ))}
            </div>
          </Panel>
        );
      case "experience":
        return (
          <Panel key={id} id={id}>
            <div className="space-y-3">
              {experience.map((xp) => (
                <div key={xp.id}>
                  <div className="flex justify-between">
                    <p className="font-semibold text-slate-900 text-sm">{xp.role} <span className="text-slate-400 font-normal">· {xp.company}</span></p>
                    <span className="text-xs text-slate-400 whitespace-nowrap">{xp.startDate} – {xp.endDate}</span>
                  </div>
                  <ul className="list-disc list-inside text-slate-600 text-xs mt-1 space-y-0.5">
                    {xp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </Panel>
        );
      case "projects":
        return (
          <Panel key={id} id={id}>
            <div className="grid grid-cols-2 gap-2">
              {projects.map((p) => (
                <div key={p.id} className="bg-slate-50 rounded-md p-2">
                  <p className="font-semibold text-slate-900 text-xs">{p.name}</p>
                  <p className="text-slate-600 text-[11px] mt-0.5">{p.description}</p>
                </div>
              ))}
            </div>
          </Panel>
        );
      case "certifications":
        return (
          <Panel key={id} id={id}>
            <div className="space-y-1.5 text-xs">
              {certifications.map((c) => (
                <div key={c.id} className="flex justify-between">
                  <span className="text-slate-800 font-medium">{c.name} — {c.issuer}</span>
                  <span className="text-slate-400">{c.date}</span>
                </div>
              ))}
            </div>
          </Panel>
        );
      case "achievements":
        return (
          <Panel key={id} id={id}>
            <div className="space-y-1.5 text-xs text-slate-600">
              {achievements.map((a) => <p key={a.id}><span className="font-semibold text-slate-800">{a.title}:</span> {a.description}</p>)}
            </div>
          </Panel>
        );
      case "leadership":
        return (
          <Panel key={id} id={id}>
            <div className="space-y-1.5 text-xs text-slate-600">
              {leadership.map((l) => <p key={l.id}><span className="font-semibold text-slate-800">{l.role} · {l.organization}:</span> {l.description}</p>)}
            </div>
          </Panel>
        );
      case "extraCurricular":
        return (
          <Panel key={id} id={id}>
            <div className="space-y-1.5 text-xs text-slate-600">
              {extraCurricular.map((ex) => <p key={ex.id}><span className="font-semibold text-slate-800">{ex.title}:</span> {ex.description}</p>)}
            </div>
          </Panel>
        );
      default:
        return null;
    }
  }

  return (
    <div className="w-full h-full flex flex-col text-[13px] leading-snug text-slate-800" style={{ backgroundColor: "#f8fafc", ...body }}>
      <div className="flex items-center gap-4 p-6 pb-4">
        {personal.photoUrl ? (
          <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-sm">
            <img src={personal.photoUrl} alt={personal.fullName} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-xl shrink-0 flex items-center justify-center text-white text-xl font-bold" style={{ backgroundColor: "var(--resume-accent)" }}>
            {personal.fullName.charAt(0) || "?"}
          </div>
        )}
        <div className="flex-1">
          <h1 style={heading} className="text-2xl font-bold text-slate-900">{personal.fullName}</h1>
          <p className="text-sm font-medium" style={accent}>{personal.title}</p>
        </div>
        <div className="text-right text-[11px] text-slate-500 space-y-0.5">
          {contact.email && <p className="flex items-center gap-1 justify-end"><Mail className="w-3 h-3" />{contact.email}</p>}
          {contact.phone && <p className="flex items-center gap-1 justify-end"><Phone className="w-3 h-3" />{contact.phone}</p>}
          {contact.location && <p className="flex items-center gap-1 justify-end"><MapPin className="w-3 h-3" />{contact.location}</p>}
          {contact.linkedin && <p className="flex items-center gap-1 justify-end"><Linkedin className="w-3 h-3" />{contact.linkedin}</p>}
        </div>
      </div>

      {personal.summary && <p className="text-slate-600 text-xs px-6 pb-4">{personal.summary}</p>}

      <div className="flex-1 px-6 pb-6 grid grid-cols-2 gap-3 auto-rows-min">
        {getOrderedSections(data).map(renderPanel)}

        {(technicalSkills.length > 0 || languages.length > 0) && (
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 col-span-2">
            <div className="grid grid-cols-2 gap-4">
              {technicalSkills.length > 0 && (
                <div>
                  <h2 style={{ ...heading, ...accent }} className="text-xs font-bold uppercase tracking-wide mb-2">Skills</h2>
                  <div className="flex flex-wrap gap-1.5">
                    {technicalSkills.map((s) => (
                      <span key={s.id} className="text-[11px] px-2 py-1 rounded-full bg-slate-100 text-slate-700">{s.name}</span>
                    ))}
                  </div>
                </div>
              )}
              {languages.length > 0 && (
                <div>
                  <h2 style={{ ...heading, ...accent }} className="text-xs font-bold uppercase tracking-wide mb-2">Languages</h2>
                  <div className="flex flex-wrap gap-1.5">
                    {languages.map((l) => (
                      <span key={l.id} className="text-[11px] px-2 py-1 rounded-full bg-slate-100 text-slate-700">{l.name}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
