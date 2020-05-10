import { useState, useEffect } from "react";

export default function useHomeScreen() {
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", onReady)

    return () => window.removeEventListener("beforeinstallprompt", onReady);
  }, [])

  function onReady(event: any) {
    event.prompt();
  }

  return prompt;
}