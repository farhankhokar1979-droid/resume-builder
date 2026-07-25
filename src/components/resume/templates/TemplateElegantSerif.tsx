import type { CSSProperties } from "react";
import { getOrderedSections } from "@/lib/sections";
import type { SectionId } from "@/types/resume";
import type { TemplateProps } from "./types";

export default function TemplateElegantSerif({ data }: TemplateProps) {
  const { personal, contact, technicalSkills, languages, education, experience, projects, certifications, achievements, leadership, extraCurricular } = data;
  const heading: CSSProperties = { fontFamily: "var(--resume-font-heading)" };
  const body: CSSProperties = { fontFamily: "var(--resume-font-body)" };

  function renderMain(id: SectionId) {
    switch (id) {
      case "experience":
        return experience.length === 0 ? null : (
          <section key={id} className="mb-5">
            <h2 style={heading} className="text-center font-bold text-slate-900 text-sm tracking-[0.2em] uppercase mb-3">Experience</h2>
            <div className="space-y-3">
              {experience.map((xp) => (
                <div key={xp.id} className="text-xs">
                  <div className="flex justify-between">
                    <p style={heading} className="font-semibold text-slate-900 text-sm">{xp.role}, {xp.company}</p>
                    <span className="text-slate-400 whitespace-nowrap">{xp.startDate} – {xp.endDate}</span>
                  </div>
                  <ul className="list-disc list-inside text-slate-600 mt-1 space-y-0.5">
                    {xp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        );
      case "projects":
        return projects.length === 0 ? null : (
          <section key={id} className="mb-5">
            <h2 style={heading} className="text-center font-bold text-slate-900 text-sm tracking-[0.2em] uppercase mb-3">Projects</h2>
            <div className="space-y-2 text-xs">
              {projects.map((p) => (
                <div key={p.id}>
                  <p style={heading} className="font-semibold text-slate-900 text-sm">{p.name}</p>
                  <p className="text-slate-600">{p.description}</p>
                </div>
              ))}
            </div>
          </section>
        );
      case "achievements":
        return achievements.length === 0 ? null : (
          <section key={id} className="mb-5 text-xs">
            <h2 style={heading} className="text-center font-bold text-slate-900 text-sm tracking-[0.2em] uppercase mb-3">Achievements</h2>
            <p className="text-center text-slate-600">{achievements.map((a) => a.title).join(" • ")}</p>
          </section>
        );
      case "leadership":
        return leadership.length === 0 ? null : (
          <section key={id} className="mb-5 text-xs">
            <h2 style={heading} className="text-center font-bold text-slate-900 text-sm tracking-[0.2em] uppercase mb-3">Leadership</h2>
            <p className="text-center text-slate-600">{leadership.map((l) => `${l.role}, ${l.organization}`).join(" • ")}</p>
          </section>
        );
      case "extraCurricular":
        return extraCurricular.length === 0 ? null : (
          <section key={id} className="mb-5 text-xs">
            <h2 style={heading} className="text-center font-bold text-slate-900 text-sm tracking-[0.2em] uppercase mb-3">Extra-Curricular</h2>
            <p className="text-center text-slate-600">{extraCurricular.map((ex) => ex.title).join(" • ")}</p>
          </section>
        );
      default:
        return null;
    }
  }

  const mainIds = getOrderedSections(data).filter((id) => id !== "education" && id !== "certifications");

  return (
    <div style={body} className="w-full h-full bg-white text-slate-800 text-[13px] leading-snug p-9 flex flex-col">
      <div className="text-center border-b border-slate-300 pb-5 mb-6">
        {personal.photoUrl && (
          <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border" style={{ borderColor: "var(--resume-accent)" }}>
            <img src={personal.photoUrl} alt={personal.fullName} className="w-full h-full object-cover" />
          </div>
        )}
        <h1 style={heading} className="text-3xl font-bold tracking-wide text-slate-900">{personal.fullName}</h1>
        <p className="italic mt-1" style={{ color: "var(--resume-accent)" }}>{personal.title}</p>
        <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-slate-500">
          {contact.email && <span>{contact.email}</span>}
          {contact.phone && <span>{contact.phone}</span>}
          {contact.location && <span>{contact.location}</span>}
          {contact.linkedin && <span>{contact.linkedin}</span>}
        </div>
      </div>

      {personal.summary && <p className="text-center text-slate-600 mb-6 text-xs px-6">{personal.summary}</p>}

      {education.length > 0 && (
        <section className="mb-5">
          <h2 style={heading} className="text-center font-bold text-slate-900 text-sm tracking-[0.2em] uppercase mb-3">Education</h2>
          <div className="space-y-2">
            {education.map((ed) => (
              <div key={ed.id} className="flex justify-between text-xs">
                <div>
                  <p style={heading} className="font-semibold text-slate-900 text-sm">{ed.degree}</p>
                  <p className="text-slate-500">{ed.institution}</p>
                </div>
                <span className="text-slate-400 whitespace-nowrap">{ed.startDate} – {ed.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {mainIds.map(renderMain)}

      <div className="grid grid-cols-2 gap-6 text-xs mt-auto">
        {technicalSkills.length > 0 && (
          <section>
            <h2 style={heading} className="text-center font-bold text-slate-900 text-sm tracking-[0.2em] uppercase mb-3">Skills</h2>
            <p className="text-center text-slate-600">{technicalSkills.map((s) => s.name).join(" • ")}</p>
          </section>
        )}
        {languages.length > 0 && (
          <section>
            <h2 style={heading} className="text-center font-bold text-slate-900 text-sm tracking-[0.2em] uppercase mb-3">Languages</h2>
            <p className="text-center text-slate-600">{languages.map((l) => l.name).join(" • ")}</p>
          </section>
        )}
      </div>

      {certifications.length > 0 && (
        <section className="mt-5 text-xs">
          <h2 style={heading} className="text-center font-bold text-slate-900 text-sm tracking-[0.2em] uppercase mb-3">Certifications</h2>
          <p className="text-center text-slate-600">{certifications.map((c) => `${c.name} — ${c.issuer}`).join(" • ")}</p>
        </section>
      )}
    </div>
  );
}
