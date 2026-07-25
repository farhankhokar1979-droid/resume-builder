import { forwardRef, useImperativeHandle, type ComponentType, type CSSProperties } from "react";
import type { ResumeData } from "@/types/resume";
import { useFitToPage } from "@/lib/pageFit";
import TemplateDarkSidebar from "./templates/TemplateDarkSidebar";
import TemplateMinimalLight from "./templates/TemplateMinimalLight";
import TemplateModernSplit from "./templates/TemplateModernSplit";
import TemplateCreativeTimeline from "./templates/TemplateCreativeTimeline";
import TemplateBoldHeader from "./templates/TemplateBoldHeader";
import TemplateElegantSerif from "./templates/TemplateElegantSerif";
import TemplateCompactTech from "./templates/TemplateCompactTech";
import TemplateGeometricAccent from "./templates/TemplateGeometricAccent";
import TemplateDiamondNavy from "./templates/TemplateDiamondNavy";
import TemplateTwoTonePanels from "./templates/TemplateTwoTonePanels";
import TemplatePhotoGrid from "./templates/TemplatePhotoGrid";
import TemplateExecutiveRibbon from "./templates/TemplateExecutiveRibbon";
import TemplateGradientWave from "./templates/TemplateGradientWave";

const REGISTRY: Record<string, ComponentType<{ data: ResumeData }>> = {
  "dark-sidebar": TemplateDarkSidebar,
  "minimal-light": TemplateMinimalLight,
  "modern-split": TemplateModernSplit,
  "creative-timeline": TemplateCreativeTimeline,
  "bold-header": TemplateBoldHeader,
  "elegant-serif": TemplateElegantSerif,
  "compact-tech": TemplateCompactTech,
  "geometric-accent": TemplateGeometricAccent,
  "diamond-navy": TemplateDiamondNavy,
  "two-tone-panels": TemplateTwoTonePanels,
  "photo-grid": TemplatePhotoGrid,
  "executive-ribbon": TemplateExecutiveRibbon,
  "gradient-wave": TemplateGradientWave,
};

interface Props {
  data: ResumeData;
}

const ResumePreview = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const Template = REGISTRY[data.templateId] ?? TemplateDarkSidebar;
  const { containerRef, contentRef, scale } = useFitToPage<HTMLDivElement, HTMLDivElement>();

  // Expose the outer page box (not the scaled inner content) to the parent,
  // since that's what html2canvas should screenshot for PDF export.
  useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

  const themeStyle: CSSProperties & Record<string, string> = {
    "--resume-accent": data.theme.accentColor,
    "--resume-font-heading": data.theme.fontHeading,
    "--resume-font-body": data.theme.fontBody,
  };

  return (
    <div ref={containerRef} id="resume-print-area" className="resume-sheet shadow-lg" style={themeStyle}>
      <div
        ref={contentRef}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <Template data={data} />
      </div>
    </div>
  );
});

ResumePreview.displayName = "ResumePreview";

export default ResumePreview;
export { REGISTRY as TEMPLATE_REGISTRY };