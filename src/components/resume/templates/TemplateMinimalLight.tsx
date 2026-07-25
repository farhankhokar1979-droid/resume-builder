import type { CSSProperties } from "react";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { getOrderedSections } from "@/lib/sections";
import type { SectionId } from "@/types/resume";
import type { TemplateProps } from "./types";

export default function TemplateMinimalLight({ data }: TemplateProps) {
  const { personal, contact, technicalSkills, languages, education, experience, projects, certifications, achievements, leadership, extraCurricular } = data;
  const heading: CSSProperties = { fontFamily: "var(--resume-font-heading)" };
  const body: CSSProperties = { fontFamily: "var(--resume-font-body)" };

  function renderMain(id: SectionId) {
    switch (id) {
      case "experience":
        return experience.length === 0 ? null : (
          <section key={id}>
            <h2 style={heading} className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-3">Experience</h2>
            <div className="space-y-4">
              {experience.map((xp) => (
                <div key={xp.id}>
                  <div className="flex justify-between">
                    <p className="font-semibold">{xp.role} <span className="text-slate-400 font-normal">· {xp.company}</span></p>
                    <span className="text-xs text-slate-400 whitespace-nowrap">{xp.startDate} – {xp.endDate}</span>
                  </div>
                  <ul className="list-disc list-inside text-slate-600 text-xs mt-1 space-y-0.5">
                    {xp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        );
      case "projects":
        return projects.length === 0 ? null : (
          <section key={id}>
            <h2 style={heading} className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-3">Projects</h2>
            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p.id}>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-slate-600 text-xs">{p.description}</p>
                  {p.tags.length > 0 && <p className="text-xs text-slate-400 mt-0.5">{p.tags.join(" · ")}</p>}
                </div>
              ))}
            </div>
          </section>
        );
      case "achievements":
        return achievements.length === 0 ? null : (
          <section key={id}>
            <h2 style={heading} className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-3">Achievements</h2>
            <div className="space-y-2">
              {achievements.map((a) => (
                <div key={a.id}>
                  <p className="font-semibold text-sm">{a.title}</p>
                  <p className="text-slate-600 text-xs">{a.description}</p>
                </div>
              ))}
            </div>
          </section>
        );
      case "leadership":
        return leadership.length === 0 ? null : (
          <section key={id}>
            <h2 style={heading} className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-3">Leadership</h2>
            <div className="space-y-2">
              {leadership.map((l) => (
                <div key={l.id}>
                  <p className="font-semibold text-sm">{l.role} <span className="text-slate-400 font-normal">· {l.organization}</span></p>
                  <p className="text-slate-600 text-xs">{l.description}</p>
                </div>
              ))}
            </div>
          </section>
        );
      case "extraCurricular":
        return extraCurricular.length === 0 ? null : (
          <section key={id}>
            <h2 style={heading} className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-3">Extra-Curricular</h2>
            <div className="space-y-2">
              {extraCurricular.map((ex) => (
                <div key={ex.id}>
                  <p className="font-semibold text-sm">{ex.title}</p>
                  <p className="text-slate-600 text-xs">{ex.description}</p>
                </div>
              ))}
            </div>
          </section>
        );
      default:
        return null;
    }
  }

  const mainIds: SectionId[] = getOrderedSections(data).filter((id) => id !== "education" && id !== "certifications");

  return (
    <div style={body} className="w-full h-full bg-white text-slate-800 text-[13px] leading-snug p-8">
      <div className="border-b-2 border-slate-900 pb-4 mb-6 flex justify-between items-end">
        <div>
          <h1 style={heading} className="text-3xl font-bold tracking-tight text-slate-900">{personal.fullName}</h1>
          <p className="text-slate-500 text-sm mt-1">{personal.title}</p>
        </div>
        <div className="text-right text-xs text-slate-500 space-y-0.5">
          {contact.email && <p className="flex items-center gap-1 justify-end"><Mail className="w-3 h-3" />{contact.email}</p>}
          {contact.phone && <p className="flex items-center gap-1 justify-end"><Phone className="w-3 h-3" />{contact.phone}</p>}
          {contact.location && <p className="flex items-center gap-1 justify-end"><MapPin className="w-3 h-3" />{contact.location}</p>}
          {contact.linkedin && <p className="flex items-center gap-1 justify-end"><Linkedin className="w-3 h-3" />{contact.linkedin}</p>}
        </div>
      </div>

      {personal.summary && <p className="text-slate-600 mb-6">{personal.summary}</p>}

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">{mainIds.map(renderMain)}</div>

        <div className="space-y-6">
          {education.length > 0 && (
            <section>
              <h2 style={heading} className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-3">Education</h2>
              <div className="space-y-3">
                {education.map((ed) => (
                  <div key={ed.id}>
                    <p className="font-semibold text-sm">{ed.degree}</p>
                    <p className="text-slate-500 text-xs">{ed.institution}</p>
                    <p className="text-slate-400 text-xs">{ed.startDate} – {ed.endDate}</p>
                    {ed.score && <p className="text-xs text-slate-500">{ed.score}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {technicalSkills.length > 0 && (
            <section>
              <h2 style={heading} className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-3">Skills</h2>
              <div className="flex flex-wrap gap-1.5">
                {technicalSkills.map((s) => (
                  <span key={s.id} className="text-xs px-2 py-1 rounded" style={{ backgroundColor: "var(--resume-accent)", color: "white" }}>{s.name}</span>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <h2 style={heading} className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-3">Languages</h2>
              <div className="space-y-1 text-xs text-slate-600">
                {languages.map((l) => <p key={l.id}>{l.name}</p>)}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section>
              <h2 style={heading} className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-3">Certifications</h2>
              <div className="space-y-1 text-xs text-slate-600">
                {certifications.map((c) => <p key={c.id}>{c.name} — {c.issuer}</p>)}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
