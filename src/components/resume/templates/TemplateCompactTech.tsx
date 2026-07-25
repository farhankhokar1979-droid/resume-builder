import type { CSSProperties } from "react";
import { Mail, Phone, MapPin, Linkedin, Terminal } from "lucide-react";
import { getOrderedSections } from "@/lib/sections";
import type { SectionId } from "@/types/resume";
import type { TemplateProps } from "./types";

export default function TemplateCompactTech({ data }: TemplateProps) {
  const { personal, contact, technicalSkills, languages, education, experience, projects, certifications, techStack, achievements, leadership, extraCurricular } = data;
  const heading: CSSProperties = { fontFamily: "var(--resume-font-heading)" };
  const body: CSSProperties = { fontFamily: "var(--resume-font-body)" };
  const accent: CSSProperties = { color: "var(--resume-accent)" };

  function renderMain(id: SectionId) {
    switch (id) {
      case "experience":
        return experience.length === 0 ? null : (
          <section key={id}>
            <h2 style={heading} className="font-bold text-slate-900 text-xs uppercase mb-2">$ experience</h2>
            <div className="space-y-2.5">
              {experience.map((xp) => (
                <div key={xp.id}>
                  <div className="flex justify-between">
                    <p className="font-semibold text-[11.5px]">{xp.role} <span className="text-slate-400">@ {xp.company}</span></p>
                    <span className="text-[10.5px] text-slate-400 whitespace-nowrap">{xp.startDate}–{xp.endDate}</span>
                  </div>
                  <ul className="text-slate-600 text-[11px] mt-0.5 space-y-0.5">
                    {xp.bullets.filter(Boolean).map((b, i) => (
                      <li key={i} className="flex gap-1"><span style={accent}>›</span>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        );
      case "projects":
        return projects.length === 0 ? null : (
          <section key={id}>
            <h2 style={heading} className="font-bold text-slate-900 text-xs uppercase mb-2">$ projects</h2>
            <div className="space-y-2">
              {projects.map((p) => (
                <div key={p.id}>
                  <p className="font-semibold text-[11.5px]">{p.name}</p>
                  <p className="text-slate-600 text-[11px]">{p.description}</p>
                  {p.tags.length > 0 && <p className="text-[10.5px]" style={accent}>{p.tags.join(", ")}</p>}
                </div>
              ))}
            </div>
          </section>
        );
      case "achievements":
        return achievements.length === 0 ? null : (
          <section key={id}>
            <h2 style={heading} className="font-bold text-slate-900 text-xs uppercase mb-2">$ achievements</h2>
            <div className="text-[11px] text-slate-600 space-y-0.5">
              {achievements.map((a) => <p key={a.id}>{a.title}</p>)}
            </div>
          </section>
        );
      case "leadership":
        return leadership.length === 0 ? null : (
          <section key={id}>
            <h2 style={heading} className="font-bold text-slate-900 text-xs uppercase mb-2">$ leadership</h2>
            <div className="text-[11px] text-slate-600 space-y-0.5">
              {leadership.map((l) => <p key={l.id}>{l.role} @ {l.organization}</p>)}
            </div>
          </section>
        );
      case "extraCurricular":
        return extraCurricular.length === 0 ? null : (
          <section key={id}>
            <h2 style={heading} className="font-bold text-slate-900 text-xs uppercase mb-2">$ activities</h2>
            <div className="text-[11px] text-slate-600 space-y-0.5">
              {extraCurricular.map((ex) => <p key={ex.id}>{ex.title}</p>)}
            </div>
          </section>
        );
      default:
        return null;
    }
  }

  const mainIds = getOrderedSections(data).filter((id) => id !== "education" && id !== "certifications");

  return (
    <div style={body} className="w-full h-full bg-white text-slate-800 text-[12px] leading-snug p-6 flex flex-col">
      <div className="flex items-center justify-between border-b-2 pb-3 mb-4" style={{ borderColor: "var(--resume-accent)" }}>
        <div className="flex items-center gap-3">
          {personal.photoUrl && (
            <div className="w-12 h-12 rounded-md overflow-hidden shrink-0">
              <img src={personal.photoUrl} alt={personal.fullName} className="w-full h-full object-cover" />
            </div>
          )}
          <div>
            <h1 style={heading} className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Terminal className="w-5 h-5" style={accent} />
              {personal.fullName}
            </h1>
            <p className="text-xs mt-0.5" style={accent}>// {personal.title}</p>
          </div>
        </div>
        <div className="text-right text-[11px] text-slate-500 space-y-0.5">
          {contact.email && <p className="flex items-center gap-1 justify-end"><Mail className="w-3 h-3" />{contact.email}</p>}
          {contact.phone && <p className="flex items-center gap-1 justify-end"><Phone className="w-3 h-3" />{contact.phone}</p>}
          {contact.location && <p className="flex items-center gap-1 justify-end"><MapPin className="w-3 h-3" />{contact.location}</p>}
          {contact.linkedin && <p className="flex items-center gap-1 justify-end"><Linkedin className="w-3 h-3" />{contact.linkedin}</p>}
        </div>
      </div>

      {personal.summary && <p className="text-slate-600 mb-4 text-[11.5px]">{personal.summary}</p>}

      {techStack.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {techStack.map((t) => (
            <span key={t} className="text-[10.5px] bg-slate-900 px-2 py-0.5 rounded" style={{ color: "var(--resume-accent)" }}>{t}</span>
          ))}
        </div>
      )}

      <div className="grid grid-cols-3 gap-5 flex-1">
        <div className="col-span-2 space-y-4">{mainIds.map(renderMain)}</div>

        <div className="space-y-4">
          {education.length > 0 && (
            <section>
              <h2 style={heading} className="font-bold text-slate-900 text-xs uppercase mb-2">$ education</h2>
              {education.map((ed) => (
                <div key={ed.id} className="mb-1.5">
                  <p className="font-semibold text-[11.5px]">{ed.degree}</p>
                  <p className="text-slate-500 text-[10.5px]">{ed.institution}</p>
                  <p className="text-slate-400 text-[10.5px]">{ed.startDate}–{ed.endDate}</p>
                </div>
              ))}
            </section>
          )}

          {technicalSkills.length > 0 && (
            <section>
              <h2 style={heading} className="font-bold text-slate-900 text-xs uppercase mb-2">$ skills</h2>
              <div className="flex flex-wrap gap-1">
                {technicalSkills.map((s) => (
                  <span key={s.id} className="text-[10.5px] px-1.5 py-0.5 rounded" style={{ backgroundColor: "var(--resume-accent)", color: "white" }}>{s.name}</span>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <h2 style={heading} className="font-bold text-slate-900 text-xs uppercase mb-2">$ languages</h2>
              <p className="text-[10.5px] text-slate-600">{languages.map((l) => l.name).join(", ")}</p>
            </section>
          )}

          {certifications.length > 0 && (
            <section>
              <h2 style={heading} className="font-bold text-slate-900 text-xs uppercase mb-2">$ certs</h2>
              <div className="text-[10.5px] text-slate-600 space-y-0.5">
                {certifications.map((c) => <p key={c.id}>{c.name}</p>)}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
