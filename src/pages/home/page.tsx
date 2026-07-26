import { useRef, useState } from "react";
import { FileText, LayoutTemplate, RotateCcw, Download, Loader2, Sun, Moon } from "lucide-react";
import { useResume } from "@/hooks/useResume";
import ResumeForm from "@/components/resume/ResumeForm";
import ResumePreview from "@/components/resume/ResumePreview";
import TemplatePickerModal from "@/components/resume/TemplatePickerModal";

interface Props {
  onBackHome?: () => void;
  dark: boolean;
  onToggleDark: () => void;
}

export default function HomePage({ onBackHome, dark, onToggleDark }: Props) {
  const { resume, update, updatePersonal, updateContact, setTemplate, updateTheme, moveSection, reset } =
    useResume();
  const [showTemplates, setShowTemplates] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  async function handleDownloadPdf() {
    if (!previewRef.current) return;
    setDownloading(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      // previewRef points at the outer page box; its only child is the
      // scaled content wrapper (see ResumePreview.tsx / pageFit.ts).
      const container = previewRef.current;
      const contentEl = container.firstElementChild as HTMLElement | null;
      if (!contentEl) return;

      // html2canvas is unreliable with CSS transforms, and our on-screen
      // "fit to one page" uses transform: scale(). So we temporarily
      // neutralize it, capture the resume at its true natural size, and
      // let jsPDF (simple, reliable math) do the single-page fit instead —
      // this is what keeps the PDF pixel-faithful to the live preview.
      const prevTransform = contentEl.style.transform;
      const prevOverflow = container.style.overflow;
      contentEl.style.transform = "none";
      container.style.overflow = "visible";

      const canvas = await html2canvas(contentEl, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      contentEl.style.transform = prevTransform;
      container.style.overflow = prevOverflow;

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Fit the whole captured page into one A4 sheet, preserving aspect
      // ratio (mirrors the same uniform shrink the live preview applies).
      const imgRatio = canvas.width / canvas.height;
      let drawWidth = pageWidth;
      let drawHeight = pageWidth / imgRatio;
      if (drawHeight > pageHeight) {
        drawHeight = pageHeight;
        drawWidth = pageHeight * imgRatio;
      }
      const x = (pageWidth - drawWidth) / 2;
      const y = (pageHeight - drawHeight) / 2;

      pdf.addImage(imgData, "PNG", x, y, drawWidth, drawHeight);

      const fileName = `${resume.personal.fullName || "resume"}.pdf`.replace(/\s+/g, "_");
      pdf.save(fileName);
    } finally {
      setDownloading(false);
    }
  }

  function handleReset() {
    if (confirm("Reset all resume data? This cannot be undone.")) {
      reset();
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950 transition-colors relative">
      <div className="app-glow-bg">
        <div className="blob blob-a" />
        <div className="blob blob-b" />
        <div className="blob blob-c" />
      </div>

      <header className="sticky top-0 z-30 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-200 dark:border-white/10">
        <div className="neon-strip" />
        <div className="max-w-[1600px] mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onBackHome}
            className="flex items-center gap-2 shrink-0"
            aria-label="Back to home"
          >
            <div className="w-9 h-9 rounded-lg neon-button flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-slate-900 dark:text-white hidden sm:inline">
              Resume Builder
            </span>
          </button>
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto app-scroll">
            <button
              type="button"
              onClick={onToggleDark}
              className="p-2 rounded-md text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 shrink-0"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={() => setShowTemplates(true)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 shrink-0"
            >
              <LayoutTemplate className="w-4 h-4" /> <span className="hidden sm:inline">Templates</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 shrink-0"
            >
              <RotateCcw className="w-4 h-4" /> <span className="hidden sm:inline">Reset</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={downloading}
              className="neon-button flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-md text-sm font-semibold text-white hover:scale-105 active:scale-100 transition-transform disabled:opacity-60 disabled:hover:scale-100 shrink-0"
            >
              {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              <span className="hidden sm:inline">Download PDF</span>
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Edit Your Resume</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 mb-5">
            Fill in your details below. Your progress is automatically saved.
          </p>
          <ResumeForm
            resume={resume}
            update={update}
            updatePersonal={updatePersonal}
            updateContact={updateContact}
            updateTheme={updateTheme}
            moveSection={moveSection}
          />
        </section>

        <section className="lg:sticky lg:top-20 self-start lg:max-h-[calc(100vh-5.5rem)] lg:overflow-y-auto app-scroll pb-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Preview</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 mb-5">See how your resume looks in real-time</p>
          <div className="neon-panel rounded-lg p-4 sm:p-6">
            <div className="max-w-[560px] mx-auto">
              <ResumePreview ref={previewRef} data={resume} />
            </div>
          </div>
        </section>
      </main>

      {showTemplates && (
        <TemplatePickerModal
          data={resume}
          currentTemplateId={resume.templateId}
          onSelect={setTemplate}
          onClose={() => setShowTemplates(false)}
        />
      )}
    </div>
  );
}