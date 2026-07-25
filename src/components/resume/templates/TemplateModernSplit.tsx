import type { CSSProperties } from "react";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { getOrderedSections } from "@/lib/sections";
import type { SectionId } from "@/types/resume";
import type { TemplateProps } from "./types";

export default function TemplateModernSplit({ data }: TemplateProps) {
  const { personal, contact, technicalSkills, languages, education, experience, projects, certifications, achievements, leadership, extraCurricular } = data;
  const heading: CSSProperties = { fontFamily: "var(--resume-font-heading)" };
  const body: CSSProperties = { fontFamily: "var(--resume-font-body)" };
  const accent: CSSProperties = { color: "var(--resume-accent)" };

  function renderLeft(id: SectionId) {
    switch (id) {
      case "experience":
        return experience.length === 0 ? null : (
          <section key={id}>
            <h2 style={{ ...heading, ...accent }} className="font-bold text-sm mb-3">Experience</h2>
            <div className="space-y-4">
              {experience.map((xp) => (
                <div key={xp.id} className="border-l-2 pl-3" style={{ borderColor: "var(--resume-accent)", opacity: 1 }}>
                  <div className="flex justify-between">
                    <p className="font-semibold">{xp.role}</p>
                    <span className="text-xs text-slate-400 whitespace-nowrap">{xp.startDate} – {xp.endDate}</span>
                  </div>
                  <p className="text-xs text-slate-500">{xp.company}</p>
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
            <h2 style={{ ...heading, ...accent }} className="font-bold text-sm mb-3">Projects</h2>
            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p.id} className="border-l-2 pl-3" style={{ borderColor: "var(--resume-accent)" }}>
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
            <h2 style={{ ...heading, ...accent }} className="font-bold text-sm mb-3">Achievements</h2>
            <div className="space-y-2">
              {achievements.map((a) => (
                <div key={a.id} className="border-l-2 pl-3" style={{ borderColor: "var(--resume-accent)" }}>
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
            <h2 style={{ ...heading, ...accent }} className="font-bold text-sm mb-3">Leadership</h2>
            <div className="space-y-2">
              {leadership.map((l) => (
                <div key={l.id} className="border-l-2 pl-3" style={{ borderColor: "var(--resume-accent)" }}>
                  <p className="font-semibold text-sm">{l.role} · {l.organization}</p>
                  <p className="text-slate-600 text-xs">{l.description}</p>
                </div>
              ))}
            </div>
          </section>
        );
      case "extraCurricular":
        return extraCurricular.length === 0 ? null : (
          <section key={id}>
            <h2 style={{ ...heading, ...accent }} className="font-bold text-sm mb-3">Extra-Curricular</h2>
            <div className="space-y-2">
              {extraCurricular.map((ex) => (
                <div key={ex.id} className="border-l-2 pl-3" style={{ borderColor: "var(--resume-accent)" }}>
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

  const leftIds = getOrderedSections(data).filter((id) => id !== "education" && id !== "certifications");

  return (
    <div style={body} className="w-full h-full bg-white text-slate-800 text-[13px] leading-snug flex flex-col">
      <div className="text-white px-8 py-7" style={{ backgroundColor: "var(--resume-accent)" }}>
        <h1 style={heading} className="text-3xl font-bold">{personal.fullName}</h1>
        <p className="text-white/80 text-sm mt-1">{personal.title}</p>
        <div className="flex flex-wrap gap-4 mt-3 text-xs text-white/80">
          {contact.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{contact.email}</span>}
          {contact.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{contact.phone}</span>}
          {contact.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{contact.location}</span>}
          {contact.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" />{contact.linkedin}</span>}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-0 flex-1">
        <div className="col-span-3 p-7 space-y-5">
          {personal.summary && <p className="text-slate-600">{personal.summary}</p>}
          {leftIds.map(renderLeft)}
        </div>

        <div className="col-span-2 bg-slate-50 p-7 space-y-5">
          {education.length > 0 && (
            <section>
              <h2 style={{ ...heading, ...accent }} className="font-bold text-sm mb-3">Education</h2>
              <div className="space-y-3">
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
              <h2 style={{ ...heading, ...accent }} className="font-bold text-sm mb-3">Skills</h2>
              <div className="space-y-2">
                {technicalSkills.map((s) => (
                  <div key={s.id}>
                    <div className="flex justify-between text-xs mb-1"><span>{s.name}</span></div>
                    <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full" style={{ width: `${s.level}%`, backgroundColor: "var(--resume-accent)" }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <h2 style={{ ...heading, ...accent }} className="font-bold text-sm mb-3">Languages</h2>
              <div className="flex flex-wrap gap-1.5">
                {languages.map((l) => (
                  <span key={l.id} className="text-xs bg-white border border-slate-200 px-2 py-1 rounded">{l.name}</span>
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section>
              <h2 style={{ ...heading, ...accent }} className="font-bold text-sm mb-3">Certifications</h2>
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
