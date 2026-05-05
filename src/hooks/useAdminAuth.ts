import { useState, useEffect } from 'react';

export const useAdminAuth = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminAuth = localStorage.getItem('admin_auth');
    setIsAdmin(adminAuth === 'true');
    setLoading(false);
  }, []);

  const login = (password: string): boolean => {
    const adminPassword = localStorage.getItem('admin_password') || '$ud0wh0amI';
    if (password === adminPassword) {
      localStorage.setItem('admin_auth', 'true');
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('admin_auth');
    setIsAdmin(false);
  };

  return { isAdmin, loading, login, logout };
};
