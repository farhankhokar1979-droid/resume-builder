import type { CSSProperties } from "react";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { getOrderedSections } from "@/lib/sections";
import type { SectionId } from "@/types/resume";
import type { TemplateProps } from "./types";

export default function TemplateCreativeTimeline({ data }: TemplateProps) {
  const { personal, contact, technicalSkills, languages, education, experience, projects, certifications, achievements, leadership, extraCurricular } = data;
  const heading: CSSProperties = { fontFamily: "var(--resume-font-heading)" };
  const body: CSSProperties = { fontFamily: "var(--resume-font-body)" };
  const accent: CSSProperties = { color: "var(--resume-accent)" };
  const dot = <span className="absolute -left-[27px] top-1 w-3 h-3 rounded-full border-2 border-white" style={{ backgroundColor: "var(--resume-accent)" }} />;

  function renderTimeline(id: SectionId) {
    switch (id) {
      case "experience":
        return experience.length === 0 ? null : (
          <section key={id} className="mb-6">
            <h2 style={{ ...heading, ...accent }} className="text-sm uppercase tracking-wide mb-4 font-bold">Experience</h2>
            <div className="relative pl-5 border-l-2 space-y-5" style={{ borderColor: "var(--resume-accent)", opacity: 1 }}>
              {experience.map((xp) => (
                <div key={xp.id} className="relative">
                  {dot}
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
      case "achievements":
        return achievements.length === 0 ? null : (
          <section key={id} className="mb-6">
            <h2 style={{ ...heading, ...accent }} className="text-sm uppercase tracking-wide mb-3 font-bold">Achievements</h2>
            <div className="space-y-1.5 text-xs text-slate-600">
              {achievements.map((a) => <p key={a.id}><span className="font-semibold text-slate-800">{a.title}:</span> {a.description}</p>)}
            </div>
          </section>
        );
      case "leadership":
        return leadership.length === 0 ? null : (
          <section key={id} className="mb-6">
            <h2 style={{ ...heading, ...accent }} className="text-sm uppercase tracking-wide mb-3 font-bold">Leadership</h2>
            <div className="space-y-1.5 text-xs text-slate-600">
              {leadership.map((l) => <p key={l.id}><span className="font-semibold text-slate-800">{l.role} · {l.organization}:</span> {l.description}</p>)}
            </div>
          </section>
        );
      case "extraCurricular":
        return extraCurricular.length === 0 ? null : (
          <section key={id} className="mb-6">
            <h2 style={{ ...heading, ...accent }} className="text-sm uppercase tracking-wide mb-3 font-bold">Extra-Curricular</h2>
            <div className="space-y-1.5 text-xs text-slate-600">
              {extraCurricular.map((ex) => <p key={ex.id}><span className="font-semibold text-slate-800">{ex.title}:</span> {ex.description}</p>)}
            </div>
          </section>
        );
      default:
        return null;
    }
  }

  const timelineIds = getOrderedSections(data).filter((id) => ["experience", "achievements", "leadership", "extraCurricular"].includes(id));

  return (
    <div style={body} className="w-full h-full bg-white text-slate-800 text-[13px] leading-snug p-8 flex flex-col">
      <div className="flex items-center gap-5 mb-6">
        <div
          className="w-20 h-20 rounded-2xl overflow-hidden flex items-center justify-center shrink-0"
          style={{ backgroundColor: personal.photoUrl ? "transparent" : "#fdf2f8" }}
        >
          {personal.photoUrl ? (
            <img src={personal.photoUrl} alt={personal.fullName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl font-bold" style={accent}>{personal.fullName.charAt(0) || "?"}</span>
          )}
        </div>
        <div>
          <h1 style={heading} className="text-3xl font-bold text-slate-900">{personal.fullName}</h1>
          <p className="font-medium text-sm" style={accent}>{personal.title}</p>
          <div className="flex flex-wrap gap-3 mt-1 text-xs text-slate-500">
            {contact.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{contact.email}</span>}
            {contact.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{contact.phone}</span>}
            {contact.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{contact.location}</span>}
            {contact.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" />{contact.linkedin}</span>}
          </div>
        </div>
      </div>

      {personal.summary && <p className="text-slate-600 mb-6">{personal.summary}</p>}

      {education.length > 0 && (
        <section className="mb-6">
          <h2 style={{ ...heading, ...accent }} className="text-sm uppercase tracking-wide mb-4 font-bold">Education</h2>
          <div className="relative pl-5 border-l-2 space-y-3" style={{ borderColor: "var(--resume-accent)" }}>
            {education.map((ed) => (
              <div key={ed.id} className="relative">
                {dot}
                <div className="flex justify-between">
                  <p className="font-semibold">{ed.degree}</p>
                  <span className="text-xs text-slate-400 whitespace-nowrap">{ed.startDate} – {ed.endDate}</span>
                </div>
                <p className="text-xs text-slate-500">{ed.institution}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {timelineIds.map(renderTimeline)}

      <div className="grid grid-cols-2 gap-6 mt-auto">
        {projects.length > 0 && (
          <section>
            <h2 style={{ ...heading, ...accent }} className="text-sm uppercase tracking-wide mb-3 font-bold">Projects</h2>
            <div className="space-y-2">
              {projects.map((p) => (
                <div key={p.id}>
                  <p className="font-semibold text-sm">{p.name}</p>
                  <p className="text-slate-600 text-xs">{p.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="space-y-4">
          {technicalSkills.length > 0 && (
            <section>
              <h2 style={{ ...heading, ...accent }} className="text-sm uppercase tracking-wide mb-3 font-bold">Skills</h2>
              <div className="flex flex-wrap gap-1.5">
                {technicalSkills.map((s) => (
                  <span key={s.id} className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: "var(--resume-accent)", color: "white" }}>{s.name}</span>
                ))}
              </div>
            </section>
          )}
          {languages.length > 0 && (
            <section>
              <h2 style={{ ...heading, ...accent }} className="text-sm uppercase tracking-wide mb-2 font-bold">Languages</h2>
              <p className="text-xs text-slate-600">{languages.map((l) => l.name).join(", ")}</p>
            </section>
          )}
          {certifications.length > 0 && (
            <section>
              <h2 style={{ ...heading, ...accent }} className="text-sm uppercase tracking-wide mb-2 font-bold">Certifications</h2>
              <div className="space-y-0.5 text-xs text-slate-600">
                {certifications.map((c) => <p key={c.id}>{c.name} — {c.issuer}</p>)}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
