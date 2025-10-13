import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: { id: string; email: string; role: string } | null;
  token: string | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<{ id: string; email: string; role: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('auth_token');
    if (saved) {
      setToken(saved);
      const base = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
      fetch(`${base}/auth/me`, { headers: { Authorization: `Bearer ${saved}` } })
        .then(async (r) => {
          if (!r.ok) throw new Error('Unauthorized');
          const data = await r.json();
          setUser(data.user);
          setIsAdmin(data.user?.role === 'admin');
        })
        .catch(() => {
          localStorage.removeItem('auth_token');
          setToken(null);
          setUser(null);
          setIsAdmin(false);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const base = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
      const res = await fetch(`${base}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const msg = (await res.json().catch(() => ({ message: 'Login failed' }))).message;
        toast({ title: 'Sign in failed', description: msg, variant: 'destructive' });
        return { error: { message: msg } };
      }
      const data = await res.json();
      localStorage.setItem('auth_token', data.token);
      setToken(data.token);
      setUser(data.user);
      setIsAdmin(data.user?.role === 'admin');
      return { error: null };
    } catch (error) {
      const message = "An unexpected error occurred";
      toast({ title: 'Error', description: message, variant: 'destructive' });
      return { error: { message } };
    }
  };

  // Sign up removed in local JWT flow

  const signOut = async () => {
    localStorage.removeItem('auth_token');
    setToken(null);
    setUser(null);
    setIsAdmin(false);
    toast({ title: 'Signed out', description: 'You have been signed out successfully.' });
  };

  const value = {
    user,
    token,
    loading,
    isAdmin,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};