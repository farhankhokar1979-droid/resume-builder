import { useState } from "react";
import LandingPage from "@/pages/landing/page";
import HomePage from "@/pages/home/page";

function App() {
  const [showApp, setShowApp] = useState(false);

  if (!showApp) {
    return <LandingPage onGetStarted={() => setShowApp(true)} />;
  }

  return <HomePage onBackHome={() => setShowApp(false)} />;
}

export default App;