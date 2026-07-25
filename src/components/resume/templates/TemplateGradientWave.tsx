import type { CSSProperties } from "react";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { getOrderedSections } from "@/lib/sections";
import type { SectionId } from "@/types/resume";
import type { TemplateProps } from "./types";

export default function TemplateGradientWave({ data }: TemplateProps) {
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

  function renderSection(id: SectionId) {
    const header = (
      <h2 style={{ ...heading, ...accent }} className="text-xs font-bold uppercase tracking-widest mb-2.5">
        {labels[id]}
      </h2>
    );
    switch (id) {
      case "education":
        return (
          <section key={id} className="mb-4">
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
          </section>
        );
      case "experience":
        return (
          <section key={id} className="mb-4">
            {header}
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
          </section>
        );
      case "projects":
        return (
          <section key={id} className="mb-4">
            {header}
            <div className="grid grid-cols-2 gap-2">
              {projects.map((p) => (
                <div key={p.id} className="rounded-lg p-2.5 border border-slate-100">
                  <p className="font-semibold text-slate-900 text-xs">{p.name}</p>
                  <p className="text-slate-600 text-[11px] mt-1">{p.description}</p>
                </div>
              ))}
            </div>
          </section>
        );
      case "certifications":
        return (
          <section key={id} className="mb-4">
            {header}
            <div className="space-y-1 text-xs text-slate-600">
              {certifications.map((c) => <p key={c.id}>{c.name} — {c.issuer}</p>)}
            </div>
          </section>
        );
      case "achievements":
        return (
          <section key={id} className="mb-4">
            {header}
            <div className="space-y-1 text-xs text-slate-600">
              {achievements.map((a) => <p key={a.id}><span className="font-semibold text-slate-800">{a.title}:</span> {a.description}</p>)}
            </div>
          </section>
        );
      case "leadership":
        return (
          <section key={id} className="mb-4">
            {header}
            <div className="space-y-1 text-xs text-slate-600">
              {leadership.map((l) => <p key={l.id}><span className="font-semibold text-slate-800">{l.role} · {l.organization}:</span> {l.description}</p>)}
            </div>
          </section>
        );
      case "extraCurricular":
        return (
          <section key={id} className="mb-4">
            {header}
            <div className="space-y-1 text-xs text-slate-600">
              {extraCurricular.map((ex) => <p key={ex.id}><span className="font-semibold text-slate-800">{ex.title}:</span> {ex.description}</p>)}
            </div>
          </section>
        );
      default:
        return null;
    }
  }

  return (
    <div style={body} className="relative w-full h-full flex flex-col text-[13px] leading-snug text-slate-800 bg-white">
      <div className="relative px-8 pt-8 pb-14 text-white" style={{ backgroundColor: "var(--resume-accent)" }}>
        <div className="flex items-center gap-5">
          <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 bg-white/20 border-4 border-white/60">
            {personal.photoUrl ? (
              <img src={personal.photoUrl} alt={personal.fullName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl font-bold">{personal.fullName.charAt(0) || "?"}</div>
            )}
          </div>
          <div>
            <h1 style={heading} className="text-3xl font-bold">{personal.fullName}</h1>
            <p className="text-sm text-white/85 mt-0.5">{personal.title}</p>
            <div className="flex flex-wrap gap-3 mt-2 text-xs text-white/85">
              {contact.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{contact.email}</span>}
              {contact.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{contact.phone}</span>}
              {contact.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{contact.location}</span>}
              {contact.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" />{contact.linkedin}</span>}
            </div>
          </div>
        </div>
        {/* wave divider anchored to the bottom edge of this header */}
        <svg className="absolute left-0 bottom-0 w-full translate-y-1/2" style={{ height: "32px" }} viewBox="0 0 500 32" preserveAspectRatio="none">
          <path d="M0,16 C150,36 350,-4 500,16 L500,32 L0,32 Z" fill="white" />
        </svg>
      </div>

      <div className="flex-1 px-8 pt-6 pb-8 grid grid-cols-3 gap-6">
        <div className="col-span-2">
          {personal.summary && <p className="text-slate-600 text-xs mb-4">{personal.summary}</p>}
          {getOrderedSections(data).map(renderSection)}
        </div>

        <div className="space-y-5">
          {technicalSkills.length > 0 && (
            <div>
              <h2 style={{ ...heading, ...accent }} className="text-xs font-bold uppercase tracking-widest mb-2.5">Skills</h2>
              <div className="space-y-2">
                {technicalSkills.map((s) => (
                  <div key={s.id}>
                    <div className="flex justify-between text-xs mb-1"><span>{s.name}</span></div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full" style={{ width: `${s.level}%`, backgroundColor: "var(--resume-accent)" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {languages.length > 0 && (
            <div>
              <h2 style={{ ...heading, ...accent }} className="text-xs font-bold uppercase tracking-widest mb-2.5">Languages</h2>
              <div className="flex flex-wrap gap-1.5">
                {languages.map((l) => (
                  <span key={l.id} className="text-[11px] px-2 py-1 rounded-full" style={{ backgroundColor: "#f1f5f9" }}>{l.name}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}