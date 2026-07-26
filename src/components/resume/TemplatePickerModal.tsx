import type { CSSProperties } from "react";
import { X, Check } from "lucide-react";
import { TEMPLATES } from "@/types/templates";
import { TEMPLATE_REGISTRY } from "./ResumePreview";
import type { ResumeData } from "@/types/resume";

interface Props {
  data: ResumeData;
  currentTemplateId: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}

export default function TemplatePickerModal({ data, currentTemplateId, onSelect, onClose }: Props) {
  const themeStyle: CSSProperties & Record<string, string> = {
    "--resume-accent": data.theme.accentColor,
    "--resume-font-heading": data.theme.fontHeading,
    "--resume-font-body": data.theme.fontBody,
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="neon-modal rounded-xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Choose a Template</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Pick a design that fits your style. Your content stays the same.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto app-scroll p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {TEMPLATES.map((tpl) => {
            const Template = TEMPLATE_REGISTRY[tpl.id];
            const active = tpl.id === currentTemplateId;
            return (
              <button
                key={tpl.id}
                type="button"
                onClick={() => {
                  onSelect(tpl.id);
                  onClose();
                }}
                className={`text-left rounded-lg border-2 p-4 transition-all ${active
                    ? "border-fuchsia-400 dark:border-fuchsia-400"
                    : "border-slate-200 dark:border-slate-700 hover:border-fuchsia-300 dark:hover:border-fuchsia-500/50"
                  }`}
                style={active ? { boxShadow: "0 0 0 3px rgba(217, 70, 239, 0.15), 0 0 24px -8px rgba(56, 189, 248, 0.4)" } : undefined}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-accent">
                    {tpl.category}
                  </span>
                  {active && (
                    <span className="flex items-center gap-1 text-xs font-medium text-accent">
                      <Check className="w-3.5 h-3.5" /> Selected
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white">{tpl.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 mb-3">{tpl.description}</p>
                <div className="rounded-md overflow-hidden border border-slate-200 aspect-[210/297] bg-slate-50" style={themeStyle}>
                  <div className="w-full h-full origin-top-left scale-[0.98]">
                    <Template data={data} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}