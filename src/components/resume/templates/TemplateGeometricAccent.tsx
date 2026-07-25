import type { CSSProperties, ReactNode } from "react";
import { Mail, Phone, MapPin, Calendar, Linkedin, GraduationCap, Briefcase, Rocket, Award, Users, Trophy, Star } from "lucide-react";
import { getOrderedSections } from "@/lib/sections";
import type { SectionId } from "@/types/resume";
import type { TemplateProps } from "./types";

export default function TemplateGeometricAccent({ data }: TemplateProps) {
  const { personal, contact, technicalSkills, languages, education, experience, projects, certifications, achievements, leadership, extraCurricular } = data;
  const heading: CSSProperties = { fontFamily: "var(--resume-font-heading)" };
  const body: CSSProperties = { fontFamily: "var(--resume-font-body)" };
  const accent: CSSProperties = { color: "var(--resume-accent)" };
  const accentBg: CSSProperties = { backgroundColor: "var(--resume-accent)" };

  const icons: Record<string, JSX.Element> = {
    education: <GraduationCap className="w-3.5 h-3.5" style={{ color: "white" }} />,
    experience: <Briefcase className="w-3.5 h-3.5" style={{ color: "white" }} />,
    projects: <Rocket className="w-3.5 h-3.5" style={{ color: "white" }} />,
    certifications: <Award className="w-3.5 h-3.5" style={{ color: "white" }} />,
    achievements: <Trophy className="w-3.5 h-3.5" style={{ color: "white" }} />,
    leadership: <Users className="w-3.5 h-3.5" style={{ color: "white" }} />,
    extraCurricular: <Star className="w-3.5 h-3.5" style={{ color: "white" }} />,
  };

  function CardHeader({ id, label }: { id: SectionId; label: string }) {
    return (
      <div className="flex items-center gap-2 mb-3">
        <span className="w-6 h-6 rounded-md flex items-center justify-center shrink-0" style={accentBg}>
          {icons[id]}
        </span>
        <h2 style={{ ...heading, ...accent }} className="text-xs font-bold uppercase tracking-wide">{label}</h2>
      </div>
    );
  }

  function renderCard(id: SectionId) {
    const wrap = (label: string, content: ReactNode) => (
      <div key={id} className="bg-white rounded-xl shadow-sm p-4">
        <CardHeader id={id} label={label} />
        {content}
      </div>
    );
    switch (id) {
      case "education":
        return wrap(
          "Education",
          <div className="space-y-2">
            {education.map((ed) => (
              <div key={ed.id} className="flex justify-between gap-2">
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{ed.degree}</p>
                  <p className="text-slate-500 text-xs">{ed.institution}</p>
                  {ed.score && <p className="text-xs mt-0.5" style={accent}>{ed.score}</p>}
                </div>
                <span className="text-xs px-2 py-1 h-fit rounded-full bg-slate-100 text-slate-600 whitespace-nowrap">{ed.startDate} – {ed.endDate}</span>
              </div>
            ))}
          </div>
        );
      case "experience":
        return wrap(
          "Experience",
          <div className="space-y-3">
            {experience.map((xp) => (
              <div key={xp.id}>
                <div className="flex justify-between gap-2">
                  <p className="font-semibold text-slate-900 text-sm">{xp.role}</p>
                  <span className="text-xs px-2 py-1 h-fit rounded-full bg-slate-100 text-slate-600 whitespace-nowrap">{xp.startDate} – {xp.endDate}</span>
                </div>
                <p className="text-slate-500 text-xs">{xp.company}</p>
                <ul className="list-disc list-inside text-slate-600 text-xs mt-1 space-y-0.5">
                  {xp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        );
      case "projects":
        return wrap(
          "Projects",
          <div className="grid grid-cols-2 gap-2">
            {projects.map((p) => (
              <div key={p.id} className="bg-slate-50 rounded-lg p-2.5">
                <p className="font-semibold text-slate-900 text-xs">{p.name}</p>
                {p.tags.length > 0 && <p className="text-[10px] mt-0.5" style={accent}>{p.tags.join(", ")}</p>}
                <p className="text-slate-600 text-[11px] mt-1">{p.description}</p>
              </div>
            ))}
          </div>
        );
      case "certifications":
        return wrap(
          "Certifications",
          <div className="space-y-1.5">
            {certifications.map((c) => (
              <div key={c.id} className="flex justify-between text-xs">
                <span className="text-slate-800 font-medium">{c.name} — {c.issuer}</span>
                <span className="text-slate-400">{c.date}</span>
              </div>
            ))}
          </div>
        );
      case "achievements":
        return wrap(
          "Achievements",
          <div className="space-y-1.5 text-xs text-slate-600">
            {achievements.map((a) => <p key={a.id}><span className="font-semibold text-slate-800">{a.title}:</span> {a.description}</p>)}
          </div>
        );
      case "leadership":
        return wrap(
          "Leadership",
          <div className="space-y-1.5 text-xs text-slate-600">
            {leadership.map((l) => <p key={l.id}><span className="font-semibold text-slate-800">{l.role} · {l.organization}:</span> {l.description}</p>)}
          </div>
        );
      case "extraCurricular":
        return wrap(
          "Extra-Curricular",
          <div className="space-y-1.5 text-xs text-slate-600">
            {extraCurricular.map((ex) => <p key={ex.id}><span className="font-semibold text-slate-800">{ex.title}:</span> {ex.description}</p>)}
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div style={body} className="relative flex w-full h-full text-[13px] leading-snug text-slate-800 bg-slate-50">
      {/* diagonal accent shape */}
      <div
        className="absolute top-0 left-0 w-[38%] h-full"
        style={{ background: "var(--resume-accent)", clipPath: "polygon(0 0, 100% 0, 70% 100%, 0 100%)" }}
      />

      {/* Sidebar */}
      <div className="relative w-[32%] p-6 flex flex-col gap-5 text-white">
        <div className="w-28 h-28 rounded-full bg-white/20 border-4 border-white mx-auto overflow-hidden flex items-center justify-center shrink-0">
          {personal.photoUrl ? (
            <img src={personal.photoUrl} alt={personal.fullName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-3xl font-semibold text-white">{personal.fullName.charAt(0) || "?"}</span>
          )}
        </div>

        <div className="bg-white/10 rounded-lg p-3 text-center">
          <p className="text-xs italic text-white/90">"Building solutions for a better world."</p>
        </div>

        <div>
          <h3 style={heading} className="font-bold uppercase tracking-wide text-xs mb-2 border-b border-white/30 pb-1">Contact</h3>
          <ul className="space-y-1.5 text-white/90 text-xs">
            {contact.email && <li className="flex items-center gap-2"><Mail className="w-3 h-3 shrink-0" /> {contact.email}</li>}
            {contact.phone && <li className="flex items-center gap-2"><Phone className="w-3 h-3 shrink-0" /> {contact.phone}</li>}
            {contact.location && <li className="flex items-center gap-2"><MapPin className="w-3 h-3 shrink-0" /> {contact.location}</li>}
            {contact.dob && <li className="flex items-center gap-2"><Calendar className="w-3 h-3 shrink-0" /> {contact.dob}</li>}
            {contact.linkedin && <li className="flex items-center gap-2"><Linkedin className="w-3 h-3 shrink-0" /> {contact.linkedin}</li>}
          </ul>
        </div>

        {technicalSkills.length > 0 && (
          <div>
            <h3 style={heading} className="font-bold uppercase tracking-wide text-xs mb-2 border-b border-white/30 pb-1">Skills</h3>
            <ul className="space-y-1.5">
              {technicalSkills.map((s) => (
                <li key={s.id}>
                  <div className="flex justify-between text-xs text-white/90 mb-0.5"><span>{s.name}</span></div>
                  <div className="h-1.5 bg-white/25 rounded-full overflow-hidden">
                    <div className="h-full bg-white" style={{ width: `${s.level}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {languages.length > 0 && (
          <div>
            <h3 style={heading} className="font-bold uppercase tracking-wide text-xs mb-2 border-b border-white/30 pb-1">Languages</h3>
            <p className="text-xs text-white/90">{languages.map((l) => l.name).join(" · ")}</p>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="relative flex-1 p-7 flex flex-col gap-4">
        <div>
          <h1 style={heading} className="text-4xl font-black text-slate-900">
            {personal.fullName.split(" ").slice(0, -1).join(" ") || personal.fullName}{" "}
            <span style={accent}>{personal.fullName.split(" ").slice(-1)}</span>
          </h1>
          <p className="uppercase tracking-[0.2em] text-slate-500 text-xs font-semibold mt-1">{personal.title}</p>
          {personal.summary && <p className="mt-3 text-slate-600 text-xs">{personal.summary}</p>}
        </div>

        <div className="flex-1 flex flex-col gap-4">
          {getOrderedSections(data).map(renderCard)}
        </div>
      </div>
    </div>
  );
}