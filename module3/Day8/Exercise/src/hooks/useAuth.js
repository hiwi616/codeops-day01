import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// A guarded hook: throws a specific, actionable message
// ("useAuth must be used inside an AuthProvider") instead of returning
// undefined and letting the crash happen somewhere else, later, on
// whatever property was read off it.
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return ctx;
}
