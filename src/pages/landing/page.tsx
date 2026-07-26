import { FileText, Sparkles, Palette, Download, LayoutTemplate, ShieldCheck, ArrowRight, Sun, Moon } from "lucide-react";
import WalkingCharacter from "@/components/WalkingCharacter";

interface Props {
    onGetStarted: () => void;
    dark: boolean;
    onToggleDark: () => void;
}

const FEATURES = [
    { icon: LayoutTemplate, title: "13 Templates", desc: "From minimal to bold — pick a style that fits you." },
    { icon: Palette, title: "Full Personalization", desc: "Your colors, your fonts, your section order." },
    { icon: Download, title: "One-Click PDF", desc: "Pixel-faithful export, ready to send." },
    { icon: ShieldCheck, title: "No Sign-Up, Ever", desc: "Nothing leaves your browser. No account needed." },
];

export default function LandingPage({ onGetStarted, dark, onToggleDark }: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950 text-slate-900 dark:text-white overflow-hidden relative transition-colors">
            <div className="app-glow-bg">
                <div className="blob blob-a float-slow" />
                <div className="blob blob-b float-slow" style={{ animationDelay: "1.5s" }} />
                <div className="blob blob-c float-slow" style={{ animationDelay: "3s" }} />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 pt-10 pb-24 flex flex-col items-center text-center">
                <div className="flex items-center justify-between w-full mb-16">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-lg neon-button flex items-center justify-center">
                            <FileText className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-lg">Resume Builder</span>
                    </div>
                    <button
                        type="button"
                        onClick={onToggleDark}
                        className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-900/5 dark:hover:bg-white/10"
                        aria-label="Toggle dark mode"
                    >
                        {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-900/10 dark:border-white/10 bg-white/60 dark:bg-white/5 text-xs font-medium text-slate-600 dark:text-slate-300">
                    <Sparkles className="w-3.5 h-3.5" style={{ color: "rgb(var(--glow-a))" }} />
                    Free forever. No account required.
                </div>

                <h1 className="mt-8 text-4xl sm:text-5xl md:text-6xl font-black leading-tight max-w-3xl">
                    Your next job starts with a <span className="neon-text">resume that stands out</span>
                </h1>

                <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-xl">
                    Build a polished, professional resume in minutes — pick a template, make it yours, and
                    download a pixel-perfect PDF. No sign-up, no watermark, no catch.
                </p>

                <button
                    type="button"
                    onClick={onGetStarted}
                    className="neon-button mt-10 flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold text-lg shadow-xl hover:scale-105 active:scale-100 transition-transform"
                >
                    Get Started for Free
                    <ArrowRight className="w-5 h-5" />
                </button>

                <p className="mt-4 text-xs text-slate-500 dark:text-slate-500">Takes less than a minute to start.</p>

                <WalkingCharacter size={70} className="mt-8" />

                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
                    {FEATURES.map((f) => (
                        <div
                            key={f.title}
                            className="rounded-xl border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] p-5 text-left shadow-sm dark:shadow-none hover:border-slate-900/20 dark:hover:border-white/20 transition-colors"
                        >
                            <f.icon className="w-5 h-5 mb-3" style={{ color: "rgb(var(--glow-a))" }} />
                            <h3 className="font-semibold text-sm">{f.title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">{f.desc}</p>
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={onGetStarted}
                    className="mt-20 flex items-center gap-2 px-6 py-3 rounded-full border border-slate-900/15 dark:border-white/15 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-900/5 dark:hover:bg-white/5 transition-colors"
                >
                    Start building your resume
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}