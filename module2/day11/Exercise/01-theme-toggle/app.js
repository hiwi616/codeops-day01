// app.js - Step 1: theme toggle that remembers its choice.
//
// Pattern: save the choice to localStorage whenever it changes,
// and restore it from localStorage as soon as the page loads -
// this same pattern works for a language toggle too, just swap
// what value gets saved/restored and what it controls.

const THEME_KEY = "theme"; // stored value will be "light" or "dark"
const toggleBtn = document.querySelector("#toggle-theme-btn");

function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
}

function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}

function loadTheme() {
  // Defaults to "light" if nothing has been saved yet.
  return localStorage.getItem(THEME_KEY) || "light";
}

function toggleTheme() {
  const current = loadTheme();
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  saveTheme(next); // save on change
}

toggleBtn.addEventListener("click", toggleTheme);

// Restore on load
applyTheme(loadTheme());
