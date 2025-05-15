// frontend/src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Crée le contexte (PAS default)
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  // Vérifie la session via /api/auth/check au mount
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/check`, {
      credentials: "include",
    })
      .then((r) => {
        // Ajoute un log pour debug
        // console.log("[AuthContext] /check status", r.status);
        if (r.ok) setAuth(true);
        else setAuth(false);
      })
      .catch(() => setAuth(false))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      }
    );
    if (!res.ok) throw new Error("Échec de la connexion");
    setAuth(true);
  };

  const logout = async () => {
    await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    setAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
