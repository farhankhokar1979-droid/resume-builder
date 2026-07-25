import { FileText, Sparkles, Palette, Download, LayoutTemplate, ShieldCheck, ArrowRight } from "lucide-react";

interface Props {
    onGetStarted: () => void;
}

const FEATURES = [
    { icon: LayoutTemplate, title: "13 Templates", desc: "From minimal to bold — pick a style that fits you." },
    { icon: Palette, title: "Full Personalization", desc: "Your colors, your fonts, your section order." },
    { icon: Download, title: "One-Click PDF", desc: "Pixel-faithful export, ready to send." },
    { icon: ShieldCheck, title: "No Sign-Up, Ever", desc: "Nothing leaves your browser. No account needed." },
];

export default function LandingPage({ onGetStarted }: Props) {
    return (
        <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
            {/* ambient glow blobs */}
            <div className="pointer-events-none absolute -top-40 -left-40 w-[32rem] h-[32rem] rounded-full bg-fuchsia-600/20 blur-[120px] float-slow" />
            <div
                className="pointer-events-none absolute top-1/3 -right-40 w-[32rem] h-[32rem] rounded-full bg-sky-500/20 blur-[120px] float-slow"
                style={{ animationDelay: "1.5s" }}
            />
            <div
                className="pointer-events-none absolute bottom-0 left-1/3 w-[28rem] h-[28rem] rounded-full bg-violet-600/20 blur-[120px] float-slow"
                style={{ animationDelay: "3s" }}
            />

            <div className="relative max-w-5xl mx-auto px-6 pt-10 pb-24 flex flex-col items-center text-center">
                <div className="flex items-center gap-2 mb-16 self-start">
                    <div className="w-9 h-9 rounded-lg neon-button flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-lg">Resume Builder</span>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-slate-300 mb-8">
                    <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
                    Free forever. No account required.
                </div>

                <h1 className="text-5xl sm:text-6xl font-black leading-tight max-w-3xl">
                    Your next job starts with a <span className="neon-text">resume that stands out</span>
                </h1>

                <p className="mt-6 text-lg text-slate-400 max-w-xl">
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

                <p className="mt-4 text-xs text-slate-500">Takes less than a minute to start.</p>

                <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
                    {FEATURES.map((f) => (
                        <div
                            key={f.title}
                            className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left hover:border-white/20 transition-colors"
                        >
                            <f.icon className="w-5 h-5 text-fuchsia-400 mb-3" />
                            <h3 className="font-semibold text-sm">{f.title}</h3>
                            <p className="text-slate-400 text-xs mt-1">{f.desc}</p>
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={onGetStarted}
                    className="mt-20 flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-slate-200 font-medium hover:bg-white/5 transition-colors"
                >
                    Start building your resume
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}