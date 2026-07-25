import type { CSSProperties } from "react";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { getOrderedSections } from "@/lib/sections";
import type { SectionId } from "@/types/resume";
import type { TemplateProps } from "./types";

export default function TemplateBoldHeader({ data }: TemplateProps) {
  const { personal, contact, technicalSkills, languages, education, experience, projects, certifications, achievements, leadership, extraCurricular } = data;
  const heading: CSSProperties = { fontFamily: "var(--resume-font-heading)" };
  const body: CSSProperties = { fontFamily: "var(--resume-font-body)" };

  function renderMain(id: SectionId) {
    switch (id) {
      case "experience":
        return experience.length === 0 ? null : (
          <section key={id}>
            <h2 style={heading} className="font-black text-slate-900 text-sm uppercase tracking-wide border-b-2 border-slate-900 pb-1 mb-3">Experience</h2>
            <div className="space-y-3">
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
            <h2 style={heading} className="font-black text-slate-900 text-sm uppercase tracking-wide border-b-2 border-slate-900 pb-1 mb-3">Projects</h2>
            <div className="space-y-2">
              {projects.map((p) => (
                <div key={p.id}>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-slate-600 text-xs">{p.description}</p>
                </div>
              ))}
            </div>
          </section>
        );
      case "achievements":
        return achievements.length === 0 ? null : (
          <section key={id}>
            <h2 style={heading} className="font-black text-slate-900 text-sm uppercase tracking-wide border-b-2 border-slate-900 pb-1 mb-3">Achievements</h2>
            <div className="space-y-1.5 text-xs text-slate-600">
              {achievements.map((a) => <p key={a.id}><span className="font-semibold text-slate-800">{a.title}:</span> {a.description}</p>)}
            </div>
          </section>
        );
      case "leadership":
        return leadership.length === 0 ? null : (
          <section key={id}>
            <h2 style={heading} className="font-black text-slate-900 text-sm uppercase tracking-wide border-b-2 border-slate-900 pb-1 mb-3">Leadership</h2>
            <div className="space-y-1.5 text-xs text-slate-600">
              {leadership.map((l) => <p key={l.id}><span className="font-semibold text-slate-800">{l.role} · {l.organization}:</span> {l.description}</p>)}
            </div>
          </section>
        );
      case "extraCurricular":
        return extraCurricular.length === 0 ? null : (
          <section key={id}>
            <h2 style={heading} className="font-black text-slate-900 text-sm uppercase tracking-wide border-b-2 border-slate-900 pb-1 mb-3">Extra-Curricular</h2>
            <div className="space-y-1.5 text-xs text-slate-600">
              {extraCurricular.map((ex) => <p key={ex.id}><span className="font-semibold text-slate-800">{ex.title}:</span> {ex.description}</p>)}
            </div>
          </section>
        );
      default:
        return null;
    }
  }

  const mainIds = getOrderedSections(data).filter((id) => ["experience", "projects", "achievements", "leadership", "extraCurricular"].includes(id));

  return (
    <div style={body} className="w-full h-full bg-white text-slate-800 text-[13px] leading-snug flex flex-col">
      <div className="bg-slate-900 px-8 py-8 flex items-center gap-6">
        {personal.photoUrl && (
          <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border-2" style={{ borderColor: "var(--resume-accent)" }}>
            <img src={personal.photoUrl} alt={personal.fullName} className="w-full h-full object-cover" />
          </div>
        )}
        <div>
          <h1 style={heading} className="text-4xl font-black text-white tracking-tight uppercase">{personal.fullName}</h1>
          <p className="font-semibold text-sm mt-1 uppercase tracking-widest" style={{ color: "var(--resume-accent)" }}>{personal.title}</p>
        </div>
      </div>
      <div className="px-8 py-2 flex flex-wrap gap-4 text-xs font-medium text-white" style={{ backgroundColor: "var(--resume-accent)" }}>
        {contact.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{contact.email}</span>}
        {contact.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{contact.phone}</span>}
        {contact.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{contact.location}</span>}
        {contact.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" />{contact.linkedin}</span>}
      </div>

      <div className="p-7 space-y-5 flex-1">
        {personal.summary && <p className="text-slate-600">{personal.summary}</p>}

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-5">{mainIds.map(renderMain)}</div>

          <div className="space-y-5">
            {education.length > 0 && (
              <section>
                <h2 style={heading} className="font-black text-slate-900 text-sm uppercase tracking-wide border-b-2 border-slate-900 pb-1 mb-3">Education</h2>
                <div className="space-y-2">
                  {education.map((ed) => (
                    <div key={ed.id}>
                      <p className="font-semibold text-sm">{ed.degree}</p>
                      <p className="text-slate-500 text-xs">{ed.institution}</p>
                      <p className="text-slate-400 text-xs">{ed.startDate} – {ed.endDate}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {technicalSkills.length > 0 && (
              <section>
                <h2 style={heading} className="font-black text-slate-900 text-sm uppercase tracking-wide border-b-2 border-slate-900 pb-1 mb-3">Skills</h2>
                <div className="flex flex-wrap gap-1.5">
                  {technicalSkills.map((s) => (
                    <span key={s.id} className="text-xs text-white px-2 py-1 rounded" style={{ backgroundColor: "var(--resume-accent)" }}>{s.name}</span>
                  ))}
                </div>
              </section>
            )}

            {languages.length > 0 && (
              <section>
                <h2 style={heading} className="font-black text-slate-900 text-sm uppercase tracking-wide border-b-2 border-slate-900 pb-1 mb-3">Languages</h2>
                <p className="text-xs text-slate-600">{languages.map((l) => l.name).join(", ")}</p>
              </section>
            )}

            {certifications.length > 0 && (
              <section>
                <h2 style={heading} className="font-black text-slate-900 text-sm uppercase tracking-wide border-b-2 border-slate-900 pb-1 mb-3">Certifications</h2>
                <div className="space-y-0.5 text-xs text-slate-600">
                  {certifications.map((c) => <p key={c.id}>{c.name} — {c.issuer}</p>)}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
