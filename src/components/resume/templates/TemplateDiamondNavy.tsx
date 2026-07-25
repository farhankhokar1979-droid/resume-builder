import type { CSSProperties } from "react";
import { Mail, Phone, MapPin, Calendar, Linkedin, GraduationCap, Briefcase, Rocket, Award, Users, Trophy, Star, Star as StarFilled } from "lucide-react";
import { getOrderedSections } from "@/lib/sections";
import type { SectionId } from "@/types/resume";
import type { TemplateProps } from "./types";

export default function TemplateDiamondNavy({ data }: TemplateProps) {
  const { personal, contact, technicalSkills, languages, education, experience, projects, certifications, achievements, leadership, extraCurricular } = data;
  const heading: CSSProperties = { fontFamily: "var(--resume-font-heading)" };
  const body: CSSProperties = { fontFamily: "var(--resume-font-body)" };
  const accent: CSSProperties = { color: "var(--resume-accent)" };

  const icons: Partial<Record<SectionId, JSX.Element>> = {
    education: <GraduationCap className="w-4 h-4" style={accent} />,
    experience: <Briefcase className="w-4 h-4" style={accent} />,
    projects: <Rocket className="w-4 h-4" style={accent} />,
    certifications: <Award className="w-4 h-4" style={accent} />,
    achievements: <Trophy className="w-4 h-4" style={accent} />,
    leadership: <Users className="w-4 h-4" style={accent} />,
    extraCurricular: <Star className="w-4 h-4" style={accent} />,
  };

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
      <h2 style={heading} className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-3">
        {icons[id]} {labels[id]}
        <span className="flex-1 h-px bg-slate-200 ml-2" />
      </h2>
    );
    switch (id) {
      case "education":
        return (
          <div key={id}>
            {header}
            <div className="space-y-2">
              {education.map((ed) => (
                <div key={ed.id} className="flex justify-between gap-2">
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{ed.degree}</p>
                    <p className="text-slate-500 text-xs">{ed.institution}</p>
                    {ed.score && <p className="text-xs mt-0.5" style={accent}>{ed.score}</p>}
                  </div>
                  <span className="text-xs px-2 py-1 h-fit rounded-full whitespace-nowrap" style={{ backgroundColor: "#eff6ff", color: "var(--resume-accent)" }}>{ed.startDate} – {ed.endDate}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case "experience":
        return (
          <div key={id}>
            {header}
            <div className="space-y-3">
              {experience.map((xp) => (
                <div key={xp.id}>
                  <div className="flex justify-between gap-2">
                    <p className="font-semibold text-slate-900 text-sm">{xp.role}</p>
                    <span className="text-xs px-2 py-1 h-fit rounded-full whitespace-nowrap" style={{ backgroundColor: "#eff6ff", color: "var(--resume-accent)" }}>{xp.startDate} – {xp.endDate}</span>
                  </div>
                  <p className="text-slate-500 text-xs">{xp.company}</p>
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
            {header}
            <div className="grid grid-cols-2 gap-2">
              {projects.map((p) => (
                <div key={p.id} className="bg-slate-50 rounded-lg p-2.5">
                  <p className="font-semibold text-slate-900 text-xs">{p.name}</p>
                  <p className="text-slate-600 text-[11px] mt-1">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "certifications":
        return (
          <div key={id}>
            {header}
            <div className="space-y-1.5">
              {certifications.map((c) => (
                <div key={c.id} className="flex justify-between text-xs">
                  <span className="text-slate-800 font-medium">{c.name} — {c.issuer}</span>
                  <span className="text-slate-400">{c.date}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case "achievements":
        return (
          <div key={id}>
            {header}
            <div className="space-y-1.5 text-xs text-slate-600">
              {achievements.map((a) => <p key={a.id}><span className="font-semibold text-slate-800">{a.title}:</span> {a.description}</p>)}
            </div>
          </div>
        );
      case "leadership":
        return (
          <div key={id}>
            {header}
            <div className="space-y-1.5 text-xs text-slate-600">
              {leadership.map((l) => <p key={l.id}><span className="font-semibold text-slate-800">{l.role} · {l.organization}:</span> {l.description}</p>)}
            </div>
          </div>
        );
      case "extraCurricular":
        return (
          <div key={id}>
            {header}
            <div className="space-y-1.5 text-xs text-slate-600">
              {extraCurricular.map((ex) => <p key={ex.id}><span className="font-semibold text-slate-800">{ex.title}:</span> {ex.description}</p>)}
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div style={body} className="flex w-full h-full text-[13px] leading-snug text-slate-800 bg-white">
      <div className="w-[33%] h-full text-white p-6 flex flex-col gap-5" style={{ backgroundColor: "#0b1220" }}>
        <div
          className="w-28 h-28 mx-auto overflow-hidden flex items-center justify-center shrink-0 bg-white/10"
          style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", border: "3px solid var(--resume-accent)" }}
        >
          {personal.photoUrl ? (
            <img src={personal.photoUrl} alt={personal.fullName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-3xl font-semibold" style={accent}>{personal.fullName.charAt(0) || "?"}</span>
          )}
        </div>

        <p className="text-center text-xs text-white/70 uppercase tracking-widest">Let's build a better tomorrow</p>

        <div>
          <h3 style={heading} className="font-bold uppercase tracking-wide text-xs mb-2 pb-1 border-b border-white/20">Contact</h3>
          <ul className="space-y-1.5 text-white/85 text-xs">
            {contact.email && <li className="flex items-center gap-2"><Mail className="w-3 h-3 shrink-0" style={accent} /> {contact.email}</li>}
            {contact.phone && <li className="flex items-center gap-2"><Phone className="w-3 h-3 shrink-0" style={accent} /> {contact.phone}</li>}
            {contact.location && <li className="flex items-center gap-2"><MapPin className="w-3 h-3 shrink-0" style={accent} /> {contact.location}</li>}
            {contact.dob && <li className="flex items-center gap-2"><Calendar className="w-3 h-3 shrink-0" style={accent} /> {contact.dob}</li>}
            {contact.linkedin && <li className="flex items-center gap-2"><Linkedin className="w-3 h-3 shrink-0" style={accent} /> {contact.linkedin}</li>}
          </ul>
        </div>

        {technicalSkills.length > 0 && (
          <div>
            <h3 style={heading} className="font-bold uppercase tracking-wide text-xs mb-2 pb-1 border-b border-white/20">Skills</h3>
            <ul className="space-y-1.5">
              {technicalSkills.map((s) => (
                <li key={s.id}>
                  <div className="flex justify-between text-xs text-white/85 mb-0.5"><span>{s.name}</span></div>
                  <div className="h-1.5 bg-white/15 rounded-full overflow-hidden">
                    <div className="h-full" style={{ width: `${s.level}%`, backgroundColor: "var(--resume-accent)" }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {languages.length > 0 && (
          <div>
            <h3 style={heading} className="font-bold uppercase tracking-wide text-xs mb-2 pb-1 border-b border-white/20">Languages</h3>
            <div className="space-y-1">
              {languages.map((l) => (
                <div key={l.id} className="flex items-center justify-between text-xs text-white/85">
                  <span>{l.name}</span>
                  <span className="flex gap-0.5">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <StarFilled key={i} className="w-2.5 h-2.5" style={i < Math.round(l.level / 20) ? accent : { color: "rgba(255,255,255,0.25)" }} />
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto" />
      </div>

      <div className="flex-1 h-full p-7 flex flex-col gap-5">
        <div>
          <h1 style={heading} className="text-3xl font-black text-slate-900">
            {personal.fullName.split(" ").slice(0, -1).join(" ") || personal.fullName}{" "}
            <span style={accent}>{personal.fullName.split(" ").slice(-1)}</span>
          </h1>
          <p className="uppercase tracking-widest text-slate-500 text-xs font-semibold mt-1">{personal.title}</p>
          {personal.summary && <p className="mt-3 text-slate-600 text-xs">{personal.summary}</p>}
        </div>
        <div className="flex-1 flex flex-col gap-5">
          {getOrderedSections(data).map(renderSection)}
        </div>
      </div>
    </div>
  );
}