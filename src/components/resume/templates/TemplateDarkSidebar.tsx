import type { CSSProperties } from "react";
import { Mail, Phone, MapPin, Calendar, Linkedin, Code2, GraduationCap, Briefcase } from "lucide-react";
import { getOrderedSections } from "@/lib/sections";
import type { SectionId } from "@/types/resume";
import type { TemplateProps } from "./types";

export default function TemplateDarkSidebar({ data }: TemplateProps) {
  const { personal, contact, technicalSkills, languages, education, experience, projects, certifications, achievements, leadership, extraCurricular } = data;

  const heading: CSSProperties = { fontFamily: "var(--resume-font-heading)" };
  const body: CSSProperties = { fontFamily: "var(--resume-font-body)" };
  const accent: CSSProperties = { color: "var(--resume-accent)" };
  const accentBg: CSSProperties = { backgroundColor: "var(--resume-accent)" };

  function renderSection(id: SectionId) {
    switch (id) {
      case "education":
        return (
          <div key={id}>
            <h2 style={heading} className="flex items-center gap-2 font-bold text-slate-900 uppercase text-sm tracking-wide border-b border-slate-200 pb-1 mb-3">
              <GraduationCap className="w-4 h-4" style={accent} /> Education
            </h2>
            <div className="space-y-3">
              {education.map((ed) => (
                <div key={ed.id} className="flex justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{ed.degree}</p>
                    <p className="text-slate-500 text-xs">{ed.institution}</p>
                    {ed.score && <p className="text-xs font-medium mt-0.5" style={accent}>{ed.score}</p>}
                  </div>
                  <span className="text-xs px-2 py-1 h-fit rounded-full whitespace-nowrap bg-slate-100" style={{ color: "var(--resume-accent)" }}>
                    {ed.startDate} – {ed.endDate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      case "experience":
        return (
          <div key={id}>
            <h2 style={heading} className="flex items-center gap-2 font-bold text-slate-900 uppercase text-sm tracking-wide border-b border-slate-200 pb-1 mb-3">
              <Briefcase className="w-4 h-4" style={accent} /> Experience
            </h2>
            <div className="space-y-4">
              {experience.map((xp) => (
                <div key={xp.id}>
                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{xp.role}</p>
                      <p className="text-slate-500 text-xs">{xp.company}</p>
                    </div>
                    <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-1 h-fit rounded-full whitespace-nowrap">
                      {xp.startDate} – {xp.endDate}
                    </span>
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
          <div key={id}>
            <h2 style={heading} className="font-bold text-slate-900 uppercase text-sm tracking-wide border-b border-slate-200 pb-1 mb-3">Projects</h2>
            <div className="space-y-2">
              {projects.map((p) => (
                <div key={p.id}>
                  <p className="font-semibold text-slate-900">{p.name}</p>
                  <p className="text-slate-600 text-xs">{p.description}</p>
                  {p.tags.length > 0 && <p className="text-xs mt-0.5" style={accent}>{p.tags.join(" · ")}</p>}
                </div>
              ))}
            </div>
          </div>
        );
      case "certifications":
        return (
          <div key={id}>
            <h2 style={heading} className="font-bold text-slate-900 uppercase text-sm tracking-wide border-b border-slate-200 pb-1 mb-3">Certifications</h2>
            <div className="space-y-1">
              {certifications.map((c) => (
                <div key={c.id} className="flex justify-between text-xs">
                  <span className="text-slate-800 font-medium">{c.name} — {c.issuer}</span>
                  <span className="text-slate-500">{c.date}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case "achievements":
        return (
          <div key={id}>
            <h2 style={heading} className="font-bold text-slate-900 uppercase text-sm tracking-wide border-b border-slate-200 pb-1 mb-3">Achievements</h2>
            <div className="space-y-1.5">
              {achievements.map((a) => (
                <div key={a.id}>
                  <p className="font-semibold text-slate-800 text-xs">{a.title}</p>
                  <p className="text-slate-500 text-xs">{a.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "leadership":
        return (
          <div key={id}>
            <h2 style={heading} className="font-bold text-slate-900 uppercase text-sm tracking-wide border-b border-slate-200 pb-1 mb-3">Leadership</h2>
            <div className="space-y-1.5">
              {leadership.map((l) => (
                <div key={l.id}>
                  <p className="font-semibold text-slate-800 text-xs">{l.role} — {l.organization}</p>
                  <p className="text-slate-500 text-xs">{l.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "extraCurricular":
        return (
          <div key={id}>
            <h2 style={heading} className="font-bold text-slate-900 uppercase text-sm tracking-wide border-b border-slate-200 pb-1 mb-3">Extra-Curricular</h2>
            <div className="space-y-1.5">
              {extraCurricular.map((ex) => (
                <div key={ex.id}>
                  <p className="font-semibold text-slate-800 text-xs">{ex.title}</p>
                  <p className="text-slate-500 text-xs">{ex.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div style={body} className="flex w-full h-full text-[13px] leading-snug text-slate-800 bg-white">
      {/* Sidebar */}
      <div className="w-[34%] h-full bg-slate-900 text-white p-6 flex flex-col gap-6">
        <div className="w-24 h-24 rounded-full bg-slate-700 mx-auto overflow-hidden flex items-center justify-center shrink-0">
          {personal.photoUrl ? (
            <img src={personal.photoUrl} alt={personal.fullName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-3xl font-semibold text-slate-400">{personal.fullName.charAt(0) || "?"}</span>
          )}
        </div>

        <div>
          <h3 className="flex items-center gap-2 font-semibold uppercase tracking-wide text-xs mb-3" style={{ ...heading, color: "var(--resume-accent)" }}>
            <Mail className="w-3.5 h-3.5" /> Contact
          </h3>
          <ul className="space-y-2 text-slate-300 text-xs">
            {contact.email && <li className="flex items-center gap-2"><Mail className="w-3 h-3 shrink-0" /> {contact.email}</li>}
            {contact.phone && <li className="flex items-center gap-2"><Phone className="w-3 h-3 shrink-0" /> {contact.phone}</li>}
            {contact.location && <li className="flex items-center gap-2"><MapPin className="w-3 h-3 shrink-0" /> {contact.location}</li>}
            {contact.dob && <li className="flex items-center gap-2"><Calendar className="w-3 h-3 shrink-0" /> {contact.dob}</li>}
            {contact.linkedin && <li className="flex items-center gap-2"><Linkedin className="w-3 h-3 shrink-0" /> {contact.linkedin}</li>}
          </ul>
        </div>

        {technicalSkills.length > 0 && (
          <div>
            <h3 style={{ ...heading, color: "var(--resume-accent)" }} className="flex items-center gap-2 font-semibold uppercase tracking-wide text-xs mb-3">
              <Code2 className="w-3.5 h-3.5" /> Technical Skills
            </h3>
            <ul className="space-y-2">
              {technicalSkills.map((s) => (
                <li key={s.id}>
                  <div className="flex justify-between text-xs text-slate-300 mb-1"><span>{s.name}</span></div>
                  <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full" style={{ width: `${s.level}%`, backgroundColor: "var(--resume-accent)" }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {languages.length > 0 && (
          <div>
            <h3 style={{ ...heading, color: "var(--resume-accent)" }} className="font-semibold uppercase tracking-wide text-xs mb-3">Languages</h3>
            <ul className="space-y-2">
              {languages.map((l) => (
                <li key={l.id}>
                  <div className="flex justify-between text-xs text-slate-300 mb-1"><span>{l.name}</span></div>
                  <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full" style={{ width: `${l.level}%`, backgroundColor: "var(--resume-accent)" }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto" />
      </div>

      {/* Main content */}
      <div className="flex-1 h-full p-7 flex flex-col gap-6">
        <div>
          <h1 style={heading} className="text-3xl font-extrabold text-slate-900">
            {personal.fullName.split(" ").slice(0, -1).join(" ") || personal.fullName}{" "}
            <span style={accent}>{personal.fullName.split(" ").slice(-1)}</span>
          </h1>
          <p className="uppercase tracking-widest text-slate-500 text-xs font-semibold mt-1">{personal.title}</p>
          {personal.summary && <p className="mt-4 text-slate-600">{personal.summary}</p>}
        </div>

        <div className="flex-1 flex flex-col gap-6">
          {getOrderedSections(data).map(renderSection)}
        </div>
      </div>
    </div>
  );
}