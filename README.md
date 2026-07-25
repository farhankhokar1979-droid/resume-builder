# Resume Builder

A free, static, client-side resume builder with 7 professional templates, live preview, and one-click PDF export. No backend, no database, no signup.

## Features

- **13 resume templates**: Professional Dark, Minimal Light, Modern Split, Creative Timeline, Bold Header, Elegant Serif, Compact Tech, Geometric Accent, Diamond Navy, Two-Tone Panels, Photo Grid, Executive Ribbon, Gradient Wave
- **Photo upload from your device** — pick a file, it's auto-resized/compressed and stored locally (no upload to any server)
- **Design & Theme panel** — pick an accent color (presets or a custom color picker) and a font pairing (heading/body), applied live across whichever template you're using
- **Section reordering** — move Education, Experience, Projects, Certifications, Achievements, Leadership, and Extra-Curricular up/down to control the order they print in
- Live side-by-side preview as you type
- Auto-saves your progress to `localStorage` (nothing leaves your browser)
- One-click **Download PDF** (via `html2canvas` + `jsPDF`)
- Fully static — deploys anywhere, including Vercel's free tier

## Notes on specific features

**Photo upload**: images are resized to a max of 500px and compressed to JPEG before being stored, to keep them well within `localStorage`'s size limits. Very large or unusual image files may occasionally fail to process — if that happens, try a standard JPG/PNG export from your phone or a screenshot tool.

**Section reordering**: on single-column templates, all seven sections reorder freely. On two-column/sidebar templates, Education and Certifications are pinned to their dedicated column for visual balance, while Experience, Projects, Achievements, Leadership, and Extra-Curricular reorder within the main flow.

## Getting started (VS Code)

```bash
npm install
npm run dev
```

Open the printed local URL (defaults to `http://localhost:3000`).

## Build for production

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

The build output goes to `dist/`.

## Deploying to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel, "Add New Project" → import the repo.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy — no environment variables are required.

Or from the CLI:

```bash
npm i -g vercel
vercel
```

`vercel.json` is already included with a catch-all rewrite so client-side routing (if you add any) won't 404 on refresh.

## Project structure

```
resume-builder/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── vercel.json
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── types/
│   │   ├── resume.ts        # ResumeData shape, theme/section-order config, default sample data
│   │   └── templates.ts     # Template metadata (id, name, description)
│   ├── lib/
│   │   ├── sections.ts      # Computes section render order (used by every template)
│   │   └── image.ts         # Client-side photo resize/compression
│   ├── hooks/
│   │   └── useResume.ts     # State + localStorage persistence
│   ├── components/resume/
│   │   ├── ResumeForm.tsx       # Editable form: content, design/theme, section order
│   │   ├── ResumePreview.tsx    # Picks the active template, injects theme CSS vars
│   │   ├── TemplatePickerModal.tsx
│   │   └── templates/
│   │       ├── TemplateDarkSidebar.tsx
│   │       ├── TemplateMinimalLight.tsx
│   │       ├── TemplateModernSplit.tsx
│   │       ├── TemplateCreativeTimeline.tsx
│   │       ├── TemplateBoldHeader.tsx
│   │       ├── TemplateElegantSerif.tsx
│   │       ├── TemplateCompactTech.tsx
│   │       ├── TemplateGeometricAccent.tsx
│   │       ├── TemplateDiamondNavy.tsx
│   │       ├── TemplateTwoTonePanels.tsx
│   │       ├── TemplatePhotoGrid.tsx
│   │       ├── TemplateExecutiveRibbon.tsx
│   │       └── TemplateGradientWave.tsx
│   └── pages/home/page.tsx  # Main layout: header, form, sticky preview
```

## Adding a new template

1. Create `src/components/resume/templates/TemplateYourName.tsx` that accepts `{ data: ResumeData }`.
2. Read colors/fonts from the CSS variables `var(--resume-accent)`, `var(--resume-font-heading)`, `var(--resume-font-body)` so it respects the theme picker.
3. Use `getOrderedSections(data)` from `@/lib/sections` to render the reorderable sections in the user's chosen order.
4. Register it in `src/components/resume/ResumePreview.tsx` (`REGISTRY`).
5. Add its metadata to `TEMPLATES` in `src/types/templates.ts`.

## Notes

- This app is 100% frontend — there's no database or backend. All data lives in the browser's `localStorage` under the key `resume-builder:data`.
- "Reset" clears the saved data and restores the sample content.
