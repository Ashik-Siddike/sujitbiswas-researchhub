import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

interface AdminUser {
  id: string;
  user_id: string;
  email: string;
  role: string;
  created_at: string;
}

export const useAdminAuth = () => {
  const { user: authUser, signOut: baseSignOut } = useAuth();
  const [user, setUser] = useState<{ id: string; email: string; role: string } | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(authUser || null);
    setAdminUser(authUser ? { id: authUser.id, user_id: authUser.id, email: authUser.email, role: authUser.role, created_at: '' } : null);
    setLoading(false);
  }, [authUser]);

  const checkAdminStatus = async (_userId: string) => {
    return !!authUser && authUser.role === 'admin';
  };

  const signOut = async () => {
    await baseSignOut();
    setUser(null);
    setAdminUser(null);
  };

  const isAdmin = !!adminUser;

  return {
    user,
    adminUser,
    loading,
    isAdmin,
    signOut,
    checkAdminStatus,
  };
};

