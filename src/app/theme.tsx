import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "dark" | "light";

type ThemeCtx = {
  theme: Theme;
  toggle: () => void;
  setTheme: (t: Theme) => void;
};

const ThemeContext = createContext<ThemeCtx | null>(null);

function applyThemeToDom(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark"); // ✅ dark default

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme") as Theme | null;
      const initial: Theme = saved === "light" || saved === "dark" ? saved : "dark";
      setThemeState(initial);
      applyThemeToDom(initial);
    } catch {
      // If storage fails, still apply default
      applyThemeToDom("dark");
    }
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem("theme", t);
    } catch {}
    applyThemeToDom(t);
  };

  const toggle = () => setTheme(theme === "dark" ? "light" : "dark");

  const value = useMemo(() => ({ theme, toggle, setTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);

  // Don’t crash the whole app if used outside provider while you’re wiring things up.
  if (!ctx) {
    return {
      theme: "dark" as Theme,
      toggle: () => {},
      setTheme: () => {}
    };
  }

  return ctx;
}
