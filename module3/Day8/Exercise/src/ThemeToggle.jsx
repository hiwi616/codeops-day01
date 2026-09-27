import { useTheme } from "./hooks/useTheme";

// Deeply nested: App -> Header -> ThemeToggle. It reads the theme straight
// from context, with no props passed down through Header at all.
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button type="button" className="theme-toggle" onClick={toggleTheme}>
      {theme === "light" ? "Switch to dark" : "Switch to light"}
    </button>
  );
}

export default ThemeToggle;
