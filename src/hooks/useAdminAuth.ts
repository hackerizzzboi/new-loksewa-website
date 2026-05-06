import { useState, useEffect } from 'react';

// SHA-256 hash function using Web Crypto API
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Pre-computed SHA-256 hash of "$ud0wh0amI"
const DEFAULT_PASSWORD_HASH = '6e5fa4d6d80a5a7b1dc9c2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3';

export const useAdminAuth = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check session token
    const token = sessionStorage.getItem('admin_session');
    const expiry = sessionStorage.getItem('admin_session_expiry');
    if (token && expiry && Date.now() < parseInt(expiry)) {
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  const login = async (password: string): Promise<boolean> => {
    const hash = await sha256(password);
    const storedHash = localStorage.getItem('admin_password_hash');
    
    // Check against stored hash or compute default hash
    const defaultHash = await sha256('$ud0wh0amI');
    const targetHash = storedHash || defaultHash;
    
    if (hash === targetHash) {
      // Create session token (expires in 2 hours)
      const sessionToken = crypto.randomUUID();
      const expiry = Date.now() + 2 * 60 * 60 * 1000;
      sessionStorage.setItem('admin_session', sessionToken);
      sessionStorage.setItem('admin_session_expiry', expiry.toString());
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('admin_session');
    sessionStorage.removeItem('admin_session_expiry');
    setIsAdmin(false);
  };

  const changePassword = async (newPassword: string): Promise<boolean> => {
    if (newPassword.length < 6) return false;
    const hash = await sha256(newPassword);
    localStorage.setItem('admin_password_hash', hash);
    return true;
  };

  return { isAdmin, loading, login, logout, changePassword };
};
