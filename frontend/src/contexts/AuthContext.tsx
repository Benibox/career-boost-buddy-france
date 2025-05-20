import React, { createContext, useState, useEffect, useContext } from 'react';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
}

interface AuthCtx {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthCtx>({} as AuthCtx);

const BASE = import.meta.env.VITE_BACKEND_URL || '';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /* ----------- Vérifie la session au mount ----------- */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${BASE}/api/auth/me`, { credentials: 'include' });
        console.debug('GET /me →', res.status);
        if (res.ok) setUser(await res.json());
      } catch (err) {
        console.warn('GET /me failed', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ------------------ Login -------------------------- */
  const login = async (email: string, password: string) => {
    const res = await fetch(`${BASE}/api/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    console.debug('POST /login →', res.status);
    if (!res.ok) throw new Error('Identifiants invalides');
    setUser(await res.json());
  };

  /* ------------------ Logout ------------------------- */
  const logout = async () => {
    const res = await fetch(`${BASE}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    console.debug('POST /logout →', res.status);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
