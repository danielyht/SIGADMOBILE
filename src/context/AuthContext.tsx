import { createContext, useContext, useState, ReactNode } from "react";

// Hardcoded superadmin — bypasses plan check, has access to everything
const ADMIN_EMAIL = "admin@sigad.com";
const ADMIN_PASSWORD = "admin123";

export type PlanType = "basico" | "pro" | "enterprise" | null;

export interface AuthUser {
  email: string;
  nomeAdmin: string;
  nomeOng: string;
  isAdmin: boolean;
  plan: PlanType;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  register: (data: { nomeOng: string; nomeAdmin: string; email: string; password: string }) => void;
  selectPlan: (plan: PlanType) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
const STORAGE_KEY = "sigad_user";

function loadUser(): AuthUser | null {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
}

function saveUser(u: AuthUser) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(loadUser);

  const login = (email: string, password: string): { ok: boolean; error?: string } => {
    if (!email || !password) return { ok: false, error: "Preencha e-mail e senha." };

    // Superadmin
    if (email === ADMIN_EMAIL) {
      if (password !== ADMIN_PASSWORD) return { ok: false, error: "Senha incorreta para o administrador." };
      const adminUser: AuthUser = {
        email: ADMIN_EMAIL,
        nomeAdmin: "Administrador",
        nomeOng: "SIGAD",
        isAdmin: true,
        plan: "enterprise",
      };
      setUser(adminUser);
      saveUser(adminUser);
      return { ok: true };
    }

    // Regular user — match stored account
    const stored = loadUser();
    if (!stored || stored.email !== email) {
      return { ok: false, error: "Nenhuma conta encontrada com esse e-mail." };
    }
    setUser(stored);
    return { ok: true };
  };

  const register = (data: { nomeOng: string; nomeAdmin: string; email: string; password: string }) => {
    const newUser: AuthUser = {
      email: data.email,
      nomeAdmin: data.nomeAdmin,
      nomeOng: data.nomeOng,
      isAdmin: false,
      plan: null,
    };
    setUser(newUser);
    saveUser(newUser);
  };

  const selectPlan = (plan: PlanType) => {
    if (!user) return;
    const updated = { ...user, plan };
    setUser(updated);
    saveUser(updated);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, selectPlan, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
