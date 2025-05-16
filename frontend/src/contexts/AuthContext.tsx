import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';
import axios from 'axios';

export interface UserInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthCtx {
  user: UserInfo | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (e: string, p: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthCtx>({
  user: null,
  isAuthenticated: false,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  /* check session */
  useEffect(() => {
    axios
      .get<UserInfo>(`${import.meta.env.VITE_BACKEND_URL}/api/auth/check`, {
        withCredentials: true,
      })
      .then((r) => setUser(r.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const res = await axios.post<UserInfo>(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
      { email, password },
      { withCredentials: true },
    );
    setUser(res.data);
  };

  const logout = async () => {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
      {},
      { withCredentials: true },
    );
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
