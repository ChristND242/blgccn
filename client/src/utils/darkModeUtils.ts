import { useState, useEffect } from "react";

export function listenSystemMode() {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function darkModeHandler() {
    const mode = localStorage.getItem("theme");
    if (mode === null || mode === "system") {
      if (mediaQuery.matches) {
        document.documentElement.setAttribute("data-color-mode", "dark");
      } else {
        document.documentElement.setAttribute("data-color-mode", "light");
      }
      window.dispatchEvent(new Event("colorSchemeChange"));
    }
  }

  // Determine the current mode
  darkModeHandler();
  // Monitor mode changes
  mediaQuery.addEventListener("change", darkModeHandler);
}

export function getCurrentColorMode(): "light" | "dark" {
  return (
    (document.documentElement.getAttribute("data-color-mode") as
      | "light"
      | "dark") || "light"
  );
}

export function useColorMode() {
  const [colorMode, setColorMode] = useState<"light" | "dark">(
    getCurrentColorMode()
  );

  useEffect(() => {
    const updateColorMode = () => {
      setColorMode(getCurrentColorMode());
    };

    // Initial Setup
    updateColorMode();

    // Listen for color mode change events
    window.addEventListener("colorSchemeChange", updateColorMode);

    // Cleanup Function
    return () => {
      window.removeEventListener("colorSchemeChange", updateColorMode);
    };
  }, []);

  return colorMode;
}
