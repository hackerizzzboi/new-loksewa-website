import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Lock, Shield } from "lucide-react";

const ADMIN_PASSWORD = "$ud0wh0amI";
const STORAGE_KEY = "admin_pwd_ok";

const CloudAdminGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [pwdOk, setPwdOk] = useState<boolean>(() => sessionStorage.getItem(STORAGE_KEY) === "1");
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!user) { setIsAdmin(false); return; }
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle()
      .then(({ data }) => setIsAdmin(!!data));
  }, [user]);

  if (loading || isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }
  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">🚫 Access Denied</h1>
          <p className="text-muted-foreground">You need admin privileges to view this page.</p>
        </div>
      </div>
    );
  }

  if (!pwdOk) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (pwd === ADMIN_PASSWORD) {
              sessionStorage.setItem(STORAGE_KEY, "1");
              setPwdOk(true);
            } else setErr("Incorrect password");
          }}
          className="bg-white/95 backdrop-blur rounded-2xl p-8 max-w-sm w-full shadow-2xl"
        >
          <div className="flex flex-col items-center mb-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg mb-3">
              <Shield className="text-white" size={32} />
            </div>
            <h1 className="text-xl font-bold">Admin Verification</h1>
            <p className="text-sm text-muted-foreground">Enter admin password to continue</p>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="password"
              autoFocus
              value={pwd}
              onChange={(e) => { setPwd(e.target.value); setErr(""); }}
              placeholder="Password"
              className="w-full pl-9 pr-3 py-2.5 rounded-lg border bg-background text-sm"
            />
          </div>
          {err && <p className="text-sm text-red-600 mt-2">{err}</p>}
          <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg font-semibold">
            Unlock
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
};

export default CloudAdminGuard;
