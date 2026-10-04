import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

// A guarded hook, same shape as useAuth: fails loudly with a message you
// can act on, instead of quietly returning undefined and crashing later
// on `theme.something`.
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside a ThemeProvider");
  }
  return ctx;
}
