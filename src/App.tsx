import { useEffect, useState } from "react";
import LandingPage from "@/pages/landing/page";
import LoadingTransition from "@/pages/landing/LoadingTransition";
import HomePage from "@/pages/home/page";

type Stage = "landing" | "loading" | "app";

function App() {
  const [stage, setStage] = useState<Stage>("landing");
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const onToggleDark = () => setDark((d) => !d);

  if (stage === "landing") {
    return (
      <LandingPage onGetStarted={() => setStage("loading")} dark={dark} onToggleDark={onToggleDark} />
    );
  }

  if (stage === "loading") {
    return <LoadingTransition onComplete={() => setStage("app")} />;
  }

  return <HomePage onBackHome={() => setStage("landing")} dark={dark} onToggleDark={onToggleDark} />;
}

export default App;