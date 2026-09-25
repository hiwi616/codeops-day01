import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

// A placeholder auth: no real backend, just a boolean in state. It's
// enough to demonstrate RequireAuth and the "return to where you were"
// flow; a real app would replace login()/logout() with real calls and
// probably persist the session in a cookie or token.
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  const value = useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return ctx;
}
