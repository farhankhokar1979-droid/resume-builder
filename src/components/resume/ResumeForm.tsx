import { useRef, useState, type ReactNode, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import {
  User,
  Phone,
  Code2,
  Globe2,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Award,
  Trophy,
  Users,
  Layers,
  Star,
  ChevronUp,
  ChevronDown,
  Plus,
  Trash2,
  Upload,
  X,
  Palette,
  ListOrdered,
  ArrowUp,
  ArrowDown,
  Loader2,
  Sparkles,
} from "lucide-react";
import { ACCENT_COLORS, FONT_PAIRINGS, SECTION_LABELS, type ResumeData, type SectionId } from "@/types/resume";
import { makeId } from "@/hooks/useResume";
import { fileToCompressedDataUrl } from "@/lib/image";
import { improveWithAi } from "@/lib/aiAssist";
import { PROFESSION_NAMES, getFallbackByProfession } from "@/lib/professionFallbacks";

interface Props {
  resume: ResumeData;
  updatePersonal: (patch: Partial<ResumeData["personal"]>) => void;
  updateContact: (patch: Partial<ResumeData["contact"]>) => void;
  update: <K extends keyof ResumeData>(key: K, value: ResumeData[K]) => void;
  updateTheme: (patch: Partial<ResumeData["theme"]>) => void;
  moveSection: (id: SectionId, direction: "up" | "down") => void;
}

function Section({
  title,
  icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="neon-card rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-100">
          <span className="text-accent">{icon}</span>
          {title}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>
      {open && <div className="px-5 pb-5 space-y-4 border-t border-slate-100 dark:border-slate-800 pt-4">{children}</div>}
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent";

function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={inputClass} />;
}

function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClass} resize-none`} />;
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-slate-400 hover:text-red-500 transition-colors shrink-0"
      aria-label="Remove"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}

function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-dark"
    >
      <Plus className="w-4 h-4" />
      {label}
    </button>
  );
}

function AiImproveButton({
  onClick,
  loading,
  label = "Improve with AI",
}: {
  onClick: () => void;
  loading: boolean;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-fuchsia-300 dark:hover:border-fuchsia-500/50 disabled:opacity-60 transition-colors"
    >
      {loading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <Sparkles className="w-3.5 h-3.5" style={{ color: "rgb(var(--glow-a))" }} />
      )}
      {loading ? "Improving…" : label}
    </button>
  );
}

/**
 * Shown when an AI request fails. Lets the person pick a profession and
 * instantly insert hand-written fallback text instead, so a down/rate-
 * limited AI provider never fully blocks progress.
 */
function FallbackPicker({ onPick }: { onPick: (profession: string) => void }) {
  return (
    <div className="mt-1.5 flex items-center gap-2">
      <span className="text-xs text-slate-500 dark:text-slate-400 shrink-0">
        Or use an example for:
      </span>
      <select
        defaultValue=""
        onChange={(e) => {
          if (e.target.value) onPick(e.target.value);
          e.target.value = "";
        }}
        className="text-xs rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 py-1 text-slate-700 dark:text-slate-200"
      >
        <option value="" disabled>
          Choose a profession…
        </option>
        {PROFESSION_NAMES.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

function PhotoUpload({ value, onChange }: { value: string; onChange: (dataUrl: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const dataUrl = await fileToCompressedDataUrl(file);
      onChange(dataUrl);
    } catch {
      setError("Could not process that image. Try a different file.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden flex items-center justify-center shrink-0">
        {value ? (
          <img src={value} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <User className="w-6 h-6 text-slate-300" />
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={loading}
            className="flex items-center gap-1.5 text-sm font-medium border border-slate-300 dark:border-slate-700 rounded-md px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-60"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
            {value ? "Change photo" : "Upload photo"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="flex items-center gap-1 text-sm text-slate-400 hover:text-red-500"
            >
              <X className="w-3.5 h-3.5" /> Remove
            </button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <p className="text-xs text-slate-400">From your device. JPG/PNG, auto-resized.</p>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    </div>
  );
}

function ThemePanel({
  theme,
  updateTheme,
}: {
  theme: ResumeData["theme"];
  updateTheme: (patch: Partial<ResumeData["theme"]>) => void;
}) {
  const activePairing = FONT_PAIRINGS.find(
    (p) => p.heading === theme.fontHeading && p.body === theme.fontBody
  );

  return (
    <div className="space-y-4">
      <div>
        <span className="block text-sm font-medium text-slate-700 mb-2">Accent Color</span>
        <div className="flex flex-wrap gap-2">
          {ACCENT_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => updateTheme({ accentColor: color })}
              aria-label={color}
              className={`w-7 h-7 rounded-full border-2 ${theme.accentColor === color ? "border-slate-900 scale-110" : "border-white"
                } shadow ring-1 ring-slate-200 transition-transform`}
              style={{ backgroundColor: color }}
            />
          ))}
          <label className="w-7 h-7 rounded-full border-2 border-white shadow ring-1 ring-slate-200 overflow-hidden cursor-pointer relative">
            <input
              type="color"
              value={theme.accentColor}
              onChange={(e) => updateTheme({ accentColor: e.target.value })}
              className="absolute -top-1 -left-1 w-9 h-9 cursor-pointer"
            />
          </label>
        </div>
      </div>

      <Field label="Font Pairing">
        <select
          value={activePairing?.id ?? ""}
          onChange={(e) => {
            const pairing = FONT_PAIRINGS.find((p) => p.id === e.target.value);
            if (pairing) updateTheme({ fontHeading: pairing.heading, fontBody: pairing.body });
          }}
          className={inputClass}
        >
          {!activePairing && <option value="">Custom</option>}
          {FONT_PAIRINGS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
      </Field>
    </div>
  );
}

function SectionOrderPanel({
  sectionOrder,
  moveSection,
}: {
  sectionOrder: SectionId[];
  moveSection: (id: SectionId, direction: "up" | "down") => void;
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs text-slate-500 mb-2">
        Controls the order these sections appear in on your resume. Sections you haven't filled in are
        skipped automatically.
      </p>
      {sectionOrder.map((id, idx) => (
        <div
          key={id}
          className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-sm"
        >
          <span className="text-slate-700 dark:text-slate-200">{SECTION_LABELS[id]}</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => moveSection(id, "up")}
              disabled={idx === 0}
              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent"
              aria-label={`Move ${SECTION_LABELS[id]} up`}
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => moveSection(id, "down")}
              disabled={idx === sectionOrder.length - 1}
              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent"
              aria-label={`Move ${SECTION_LABELS[id]} down`}
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ResumeForm({
  resume,
  updatePersonal,
  updateContact,
  update,
  updateTheme,
  moveSection,
}: Props) {
  const [aiLoadingId, setAiLoadingId] = useState<string | null>(null);
  const [aiError, setAiError] = useState<{ id: string; message: string } | null>(null);

  async function handleImproveSummary() {
    if (!resume.personal.summary.trim()) return;
    setAiError(null);
    setAiLoadingId("summary");
    try {
      const improved = await improveWithAi("summary", resume.personal.summary);
      updatePersonal({ summary: improved });
    } catch (err) {
      setAiError({ id: "summary", message: err instanceof Error ? err.message : "Something went wrong." });
    } finally {
      setAiLoadingId(null);
    }
  }

  async function handleImproveBullets(xpId: string) {
    const xp = resume.experience.find((x) => x.id === xpId);
    const joined = xp?.bullets.filter(Boolean).join("\n") ?? "";
    if (!joined.trim()) return;
    setAiError(null);
    setAiLoadingId(xpId);
    try {
      const improved = await improveWithAi("bullets", joined);
      const lines = improved
        .split("\n")
        .map((l) => l.replace(/^[-•*\d.]+\s*/, "").trim())
        .filter(Boolean);
      update(
        "experience",
        resume.experience.map((x) => (x.id === xpId ? { ...x, bullets: lines } : x))
      );
    } catch (err) {
      setAiError({ id: xpId, message: err instanceof Error ? err.message : "Something went wrong." });
    } finally {
      setAiLoadingId(null);
    }
  }

  return (
    <div className="space-y-4">
      {/* Design & Theme */}
      <Section title="Design & Theme" icon={<Palette className="w-4 h-4" />} defaultOpen>
        <ThemePanel theme={resume.theme} updateTheme={updateTheme} />
      </Section>

      {/* Section Order */}
      <Section title="Section Order" icon={<ListOrdered className="w-4 h-4" />}>
        <SectionOrderPanel sectionOrder={resume.sectionOrder} moveSection={moveSection} />
      </Section>

      {/* Personal Information */}
      <Section title="Personal Information" icon={<User className="w-4 h-4" />} defaultOpen>
        <Field label="Full Name">
          <TextInput
            value={resume.personal.fullName}
            onChange={(e) => updatePersonal({ fullName: e.target.value })}
          />
        </Field>
        <Field label="Professional Title">
          <TextInput
            value={resume.personal.title}
            onChange={(e) => updatePersonal({ title: e.target.value })}
          />
        </Field>
        <Field label="Profile Photo">
          <PhotoUpload
            value={resume.personal.photoUrl}
            onChange={(dataUrl) => updatePersonal({ photoUrl: dataUrl })}
          />
        </Field>
        <Field label="Professional Summary">
          <TextArea
            rows={4}
            value={resume.personal.summary}
            onChange={(e) => updatePersonal({ summary: e.target.value })}
          />
          <div className="mt-2 flex items-center gap-2">
            <AiImproveButton onClick={handleImproveSummary} loading={aiLoadingId === "summary"} />
          </div>
          {aiError?.id === "summary" && (
            <div className="mt-1">
              <p className="text-xs text-red-500">{aiError.message}</p>
              <FallbackPicker
                onPick={(profession) => {
                  const fb = getFallbackByProfession(profession);
                  if (fb) {
                    updatePersonal({ summary: fb.summary });
                    setAiError(null);
                  }
                }}
              />
            </div>
          )}
        </Field>
      </Section>

      {/* Contact Information */}
      <Section title="Contact Information" icon={<Phone className="w-4 h-4" />} defaultOpen>
        <Field label="Email">
          <TextInput
            value={resume.contact.email}
            onChange={(e) => updateContact({ email: e.target.value })}
          />
        </Field>
        <Field label="Phone">
          <TextInput
            value={resume.contact.phone}
            onChange={(e) => updateContact({ phone: e.target.value })}
          />
        </Field>
        <Field label="Location">
          <TextInput
            value={resume.contact.location}
            onChange={(e) => updateContact({ location: e.target.value })}
          />
        </Field>
        <Field label="Date of Birth">
          <TextInput
            placeholder="01 January, 2003"
            value={resume.contact.dob}
            onChange={(e) => updateContact({ dob: e.target.value })}
          />
        </Field>
        <Field label="LinkedIn">
          <TextInput
            placeholder="linkedin.com/in/yourname"
            value={resume.contact.linkedin}
            onChange={(e) => updateContact({ linkedin: e.target.value })}
          />
        </Field>
        <Field label="Website / Portfolio">
          <TextInput
            value={resume.contact.website}
            onChange={(e) => updateContact({ website: e.target.value })}
          />
        </Field>
      </Section>

      {/* Technical Skills */}
      <Section title="Technical Skills" icon={<Code2 className="w-4 h-4" />}>
        {resume.technicalSkills.map((skill) => (
          <div key={skill.id} className="flex items-center gap-2">
            <TextInput
              className={inputClass}
              value={skill.name}
              placeholder="Skill name"
              onChange={(e) =>
                update(
                  "technicalSkills",
                  resume.technicalSkills.map((s) =>
                    s.id === skill.id ? { ...s, name: e.target.value } : s
                  )
                )
              }
            />
            <input
              type="number"
              min={0}
              max={100}
              value={skill.level}
              onChange={(e) =>
                update(
                  "technicalSkills",
                  resume.technicalSkills.map((s) =>
                    s.id === skill.id ? { ...s, level: Number(e.target.value) } : s
                  )
                )
              }
              className="w-20 rounded-md border border-slate-300 px-2 py-2 text-sm"
            />
            <RemoveButton
              onClick={() =>
                update(
                  "technicalSkills",
                  resume.technicalSkills.filter((s) => s.id !== skill.id)
                )
              }
            />
          </div>
        ))}
        <AddButton
          label="Add Skill"
          onClick={() =>
            update("technicalSkills", [
              ...resume.technicalSkills,
              { id: makeId("skill"), name: "", level: 70 },
            ])
          }
        />
      </Section>

      {/* Languages */}
      <Section title="Languages" icon={<Globe2 className="w-4 h-4" />}>
        {resume.languages.map((lang) => (
          <div key={lang.id} className="flex items-center gap-2">
            <TextInput
              value={lang.name}
              placeholder="Language"
              onChange={(e) =>
                update(
                  "languages",
                  resume.languages.map((l) => (l.id === lang.id ? { ...l, name: e.target.value } : l))
                )
              }
            />
            <input
              type="number"
              min={0}
              max={100}
              value={lang.level}
              onChange={(e) =>
                update(
                  "languages",
                  resume.languages.map((l) =>
                    l.id === lang.id ? { ...l, level: Number(e.target.value) } : l
                  )
                )
              }
              className="w-20 rounded-md border border-slate-300 px-2 py-2 text-sm"
            />
            <RemoveButton
              onClick={() => update("languages", resume.languages.filter((l) => l.id !== lang.id))}
            />
          </div>
        ))}
        <AddButton
          label="Add Language"
          onClick={() =>
            update("languages", [...resume.languages, { id: makeId("lang"), name: "", level: 70 }])
          }
        />
      </Section>

      {/* Education */}
      <Section title="Education" icon={<GraduationCap className="w-4 h-4" />}>
        {resume.education.map((ed) => (
          <div key={ed.id} className="space-y-2 border border-slate-100 dark:border-slate-800 rounded-md p-3">
            <div className="flex justify-end">
              <RemoveButton
                onClick={() => update("education", resume.education.filter((e) => e.id !== ed.id))}
              />
            </div>
            <TextInput
              placeholder="Degree"
              value={ed.degree}
              onChange={(e) =>
                update(
                  "education",
                  resume.education.map((x) => (x.id === ed.id ? { ...x, degree: e.target.value } : x))
                )
              }
            />
            <TextInput
              placeholder="Institution"
              value={ed.institution}
              onChange={(e) =>
                update(
                  "education",
                  resume.education.map((x) =>
                    x.id === ed.id ? { ...x, institution: e.target.value } : x
                  )
                )
              }
            />
            <div className="grid grid-cols-2 gap-2">
              <TextInput
                placeholder="Start"
                value={ed.startDate}
                onChange={(e) =>
                  update(
                    "education",
                    resume.education.map((x) =>
                      x.id === ed.id ? { ...x, startDate: e.target.value } : x
                    )
                  )
                }
              />
              <TextInput
                placeholder="End"
                value={ed.endDate}
                onChange={(e) =>
                  update(
                    "education",
                    resume.education.map((x) => (x.id === ed.id ? { ...x, endDate: e.target.value } : x))
                  )
                }
              />
            </div>
            <TextInput
              placeholder="Score / GPA"
              value={ed.score}
              onChange={(e) =>
                update(
                  "education",
                  resume.education.map((x) => (x.id === ed.id ? { ...x, score: e.target.value } : x))
                )
              }
            />
          </div>
        ))}
        <AddButton
          label="Add Education"
          onClick={() =>
            update("education", [
              ...resume.education,
              {
                id: makeId("edu"),
                degree: "",
                institution: "",
                startDate: "",
                endDate: "",
                score: "",
              },
            ])
          }
        />
      </Section>

      {/* Experience */}
      <Section title="Experience" icon={<Briefcase className="w-4 h-4" />}>
        {resume.experience.map((xp) => (
          <div key={xp.id} className="space-y-2 border border-slate-100 dark:border-slate-800 rounded-md p-3">
            <div className="flex justify-end">
              <RemoveButton
                onClick={() => update("experience", resume.experience.filter((e) => e.id !== xp.id))}
              />
            </div>
            <TextInput
              placeholder="Role / Title"
              value={xp.role}
              onChange={(e) =>
                update(
                  "experience",
                  resume.experience.map((x) => (x.id === xp.id ? { ...x, role: e.target.value } : x))
                )
              }
            />
            <TextInput
              placeholder="Company"
              value={xp.company}
              onChange={(e) =>
                update(
                  "experience",
                  resume.experience.map((x) => (x.id === xp.id ? { ...x, company: e.target.value } : x))
                )
              }
            />
            <div className="grid grid-cols-2 gap-2">
              <TextInput
                placeholder="Start"
                value={xp.startDate}
                onChange={(e) =>
                  update(
                    "experience",
                    resume.experience.map((x) =>
                      x.id === xp.id ? { ...x, startDate: e.target.value } : x
                    )
                  )
                }
              />
              <TextInput
                placeholder="End"
                value={xp.endDate}
                onChange={(e) =>
                  update(
                    "experience",
                    resume.experience.map((x) => (x.id === xp.id ? { ...x, endDate: e.target.value } : x))
                  )
                }
              />
            </div>
            <TextArea
              rows={3}
              placeholder="One bullet point per line"
              value={xp.bullets.join("\n")}
              onChange={(e) =>
                update(
                  "experience",
                  resume.experience.map((x) =>
                    x.id === xp.id ? { ...x, bullets: e.target.value.split("\n") } : x
                  )
                )
              }
            />
            <div className="mt-2 flex items-center gap-2">
              <AiImproveButton
                onClick={() => handleImproveBullets(xp.id)}
                loading={aiLoadingId === xp.id}
                label="Improve bullets with AI"
              />
            </div>
            {aiError?.id === xp.id && (
              <div className="mt-1">
                <p className="text-xs text-red-500">{aiError.message}</p>
                <FallbackPicker
                  onPick={(profession) => {
                    const fb = getFallbackByProfession(profession);
                    if (fb) {
                      update(
                        "experience",
                        resume.experience.map((x) => (x.id === xp.id ? { ...x, bullets: fb.bullets } : x))
                      );
                      setAiError(null);
                    }
                  }}
                />
              </div>
            )}
          </div>
        ))}
        <AddButton
          label="Add Experience"
          onClick={() =>
            update("experience", [
              ...resume.experience,
              {
                id: makeId("xp"),
                role: "",
                company: "",
                startDate: "",
                endDate: "",
                bullets: [""],
              },
            ])
          }
        />
      </Section>

      {/* Projects */}
      <Section title="Projects" icon={<FolderGit2 className="w-4 h-4" />}>
        {resume.projects.map((p) => (
          <div key={p.id} className="space-y-2 border border-slate-100 dark:border-slate-800 rounded-md p-3">
            <div className="flex justify-end">
              <RemoveButton
                onClick={() => update("projects", resume.projects.filter((x) => x.id !== p.id))}
              />
            </div>
            <TextInput
              placeholder="Project Name"
              value={p.name}
              onChange={(e) =>
                update(
                  "projects",
                  resume.projects.map((x) => (x.id === p.id ? { ...x, name: e.target.value } : x))
                )
              }
            />
            <TextInput
              placeholder="Link (optional)"
              value={p.link}
              onChange={(e) =>
                update(
                  "projects",
                  resume.projects.map((x) => (x.id === p.id ? { ...x, link: e.target.value } : x))
                )
              }
            />
            <TextArea
              rows={2}
              placeholder="Description"
              value={p.description}
              onChange={(e) =>
                update(
                  "projects",
                  resume.projects.map((x) => (x.id === p.id ? { ...x, description: e.target.value } : x))
                )
              }
            />
            <TextInput
              placeholder="Tags, comma separated"
              value={p.tags.join(", ")}
              onChange={(e) =>
                update(
                  "projects",
                  resume.projects.map((x) =>
                    x.id === p.id
                      ? { ...x, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) }
                      : x
                  )
                )
              }
            />
          </div>
        ))}
        <AddButton
          label="Add Project"
          onClick={() =>
            update("projects", [
              ...resume.projects,
              { id: makeId("proj"), name: "", link: "", description: "", tags: [] },
            ])
          }
        />
      </Section>

      {/* Certifications */}
      <Section title="Certifications" icon={<Award className="w-4 h-4" />}>
        {resume.certifications.map((c) => (
          <div key={c.id} className="flex items-start gap-2 border border-slate-100 dark:border-slate-800 rounded-md p-3">
            <div className="flex-1 space-y-2">
              <TextInput
                placeholder="Certification Name"
                value={c.name}
                onChange={(e) =>
                  update(
                    "certifications",
                    resume.certifications.map((x) => (x.id === c.id ? { ...x, name: e.target.value } : x))
                  )
                }
              />
              <div className="grid grid-cols-2 gap-2">
                <TextInput
                  placeholder="Issuer"
                  value={c.issuer}
                  onChange={(e) =>
                    update(
                      "certifications",
                      resume.certifications.map((x) =>
                        x.id === c.id ? { ...x, issuer: e.target.value } : x
                      )
                    )
                  }
                />
                <TextInput
                  placeholder="Date"
                  value={c.date}
                  onChange={(e) =>
                    update(
                      "certifications",
                      resume.certifications.map((x) => (x.id === c.id ? { ...x, date: e.target.value } : x))
                    )
                  }
                />
              </div>
            </div>
            <RemoveButton
              onClick={() =>
                update("certifications", resume.certifications.filter((x) => x.id !== c.id))
              }
            />
          </div>
        ))}
        <AddButton
          label="Add Certification"
          onClick={() =>
            update("certifications", [
              ...resume.certifications,
              { id: makeId("cert"), name: "", issuer: "", date: "" },
            ])
          }
        />
      </Section>

      {/* Achievements */}
      <Section title="Achievements" icon={<Trophy className="w-4 h-4" />}>
        {resume.achievements.map((a) => (
          <div key={a.id} className="flex items-start gap-2 border border-slate-100 dark:border-slate-800 rounded-md p-3">
            <div className="flex-1 space-y-2">
              <TextInput
                placeholder="Title"
                value={a.title}
                onChange={(e) =>
                  update(
                    "achievements",
                    resume.achievements.map((x) => (x.id === a.id ? { ...x, title: e.target.value } : x))
                  )
                }
              />
              <TextArea
                rows={2}
                placeholder="Description"
                value={a.description}
                onChange={(e) =>
                  update(
                    "achievements",
                    resume.achievements.map((x) =>
                      x.id === a.id ? { ...x, description: e.target.value } : x
                    )
                  )
                }
              />
            </div>
            <RemoveButton
              onClick={() => update("achievements", resume.achievements.filter((x) => x.id !== a.id))}
            />
          </div>
        ))}
        <AddButton
          label="Add Achievement"
          onClick={() =>
            update("achievements", [
              ...resume.achievements,
              { id: makeId("ach"), title: "", description: "" },
            ])
          }
        />
      </Section>

      {/* Leadership */}
      <Section title="Leadership" icon={<Users className="w-4 h-4" />}>
        {resume.leadership.map((l) => (
          <div key={l.id} className="flex items-start gap-2 border border-slate-100 dark:border-slate-800 rounded-md p-3">
            <div className="flex-1 space-y-2">
              <TextInput
                placeholder="Role"
                value={l.role}
                onChange={(e) =>
                  update(
                    "leadership",
                    resume.leadership.map((x) => (x.id === l.id ? { ...x, role: e.target.value } : x))
                  )
                }
              />
              <TextInput
                placeholder="Organization"
                value={l.organization}
                onChange={(e) =>
                  update(
                    "leadership",
                    resume.leadership.map((x) =>
                      x.id === l.id ? { ...x, organization: e.target.value } : x
                    )
                  )
                }
              />
              <TextArea
                rows={2}
                placeholder="Description"
                value={l.description}
                onChange={(e) =>
                  update(
                    "leadership",
                    resume.leadership.map((x) =>
                      x.id === l.id ? { ...x, description: e.target.value } : x
                    )
                  )
                }
              />
            </div>
            <RemoveButton
              onClick={() => update("leadership", resume.leadership.filter((x) => x.id !== l.id))}
            />
          </div>
        ))}
        <AddButton
          label="Add Leadership"
          onClick={() =>
            update("leadership", [
              ...resume.leadership,
              { id: makeId("lead"), role: "", organization: "", description: "" },
            ])
          }
        />
      </Section>

      {/* Technical Stack */}
      <Section title="Technical Stack" icon={<Layers className="w-4 h-4" />}>
        <Field label="Comma separated list">
          <TextInput
            value={resume.techStack.join(", ")}
            onChange={(e) =>
              update(
                "techStack",
                e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
              )
            }
          />
        </Field>
      </Section>

      {/* Extra-Curricular Activities */}
      <Section title="Extra-Curricular Activities" icon={<Star className="w-4 h-4" />}>
        {resume.extraCurricular.map((ex) => (
          <div key={ex.id} className="flex items-start gap-2 border border-slate-100 dark:border-slate-800 rounded-md p-3">
            <div className="flex-1 space-y-2">
              <TextInput
                placeholder="Title"
                value={ex.title}
                onChange={(e) =>
                  update(
                    "extraCurricular",
                    resume.extraCurricular.map((x) =>
                      x.id === ex.id ? { ...x, title: e.target.value } : x
                    )
                  )
                }
              />
              <TextArea
                rows={2}
                placeholder="Description"
                value={ex.description}
                onChange={(e) =>
                  update(
                    "extraCurricular",
                    resume.extraCurricular.map((x) =>
                      x.id === ex.id ? { ...x, description: e.target.value } : x
                    )
                  )
                }
              />
            </div>
            <RemoveButton
              onClick={() =>
                update("extraCurricular", resume.extraCurricular.filter((x) => x.id !== ex.id))
              }
            />
          </div>
        ))}
        <AddButton
          label="Add Activity"
          onClick={() =>
            update("extraCurricular", [
              ...resume.extraCurricular,
              { id: makeId("extra"), title: "", description: "" },
            ])
          }
        />
      </Section>
    </div>
  );
}