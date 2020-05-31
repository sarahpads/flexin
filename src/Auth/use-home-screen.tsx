import { useState, useEffect } from "react";

export default function useHomeScreen() {
  const [prompt, setPrompt] = useState();

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", onReady);

    return () => window.removeEventListener("beforeinstallprompt", onReady);
  }, []);

  function onReady(event: any) {
    setPrompt(event);
  }

  return prompt;
}