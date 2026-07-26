import { useEffect } from "react";
import WalkingCharacter from "@/components/WalkingCharacter";

interface Props {
    onComplete: () => void;
}

const LOADING_MS = 2400;

export default function LoadingTransition({ onComplete }: Props) {
    useEffect(() => {
        const t = window.setTimeout(onComplete, LOADING_MS);
        return () => window.clearTimeout(t);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950 text-slate-900 dark:text-white overflow-hidden transition-colors">
            <div className="app-glow-bg">
                <div className="blob blob-a" />
                <div className="blob blob-b" />
                <div className="blob blob-c" />
            </div>

            <div className="relative z-10 w-full max-w-md flex flex-col items-center px-6">
                <div className="relative w-full h-32 overflow-hidden">
                    <div className="absolute bottom-0 left-0 char-walking-across">
                        <WalkingCharacter size={80} />
                    </div>
                </div>

                <p className="neon-text mt-4 text-lg font-bold">Preparing your resume builder…</p>

                <div className="mt-5 w-full h-1.5 rounded-full bg-slate-900/10 dark:bg-white/10 overflow-hidden">
                    <div className="h-full neon-button loading-bar-fill" />
                </div>
            </div>
        </div>
    );
}