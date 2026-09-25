import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "addis-eats-auth";

// A placeholder auth: no real backend, but it behaves like a real one in
// the two ways RequireAuth cares about:
//   1. Checking whether you're signed in takes a moment (isLoading), the
//      same way a real app would verify a token with a server first.
//   2. Being signed in survives a page refresh, via localStorage, instead
//      of resetting to signed-out every time.
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const alreadySignedIn = localStorage.getItem(STORAGE_KEY) === "true";

    // The delay is only here to make the loading state visible and
    // testable; a real app would await an actual network call here.
    const timer = setTimeout(() => {
      setIsAuthenticated(alreadySignedIn);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const login = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({ isAuthenticated, isLoading, login, logout }),
    [isAuthenticated, isLoading]
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
