import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, BookOpen, LogIn, LogOut, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { toast } from "sonner";

const navItems = [
  { label: "Home", path: "/", icon: "🏠" },
  { label: "MCQ", path: "/practice", icon: "❓" },
  { label: "Old Sets", path: "/old-is-gold", icon: "🏆" },
  { label: "Online Exam", path: "/online-exam", icon: "📝" },
  { label: "Subjective", path: "/subjective", icon: "📖" },
  
  { label: "Leaderboard", path: "/leaderboard", icon: "🏅" },
  { label: "Syllabus", path: "/syllabus", icon: "📋" },
  { label: "Typing", path: "/typing", icon: "⌨️" },
  { label: "Notes", path: "/notes", icon: "📒" },
  { label: "Downloads", path: "/downloads", icon: "📥" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const isAdmin = useIsAdmin();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out");
    navigate("/");
  };

  return (
    <nav className="nav-gradient sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2 text-nav-foreground font-heading font-bold text-lg">
            <BookOpen className="w-6 h-6" />
            <span>Computer Operator Pro</span>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary/30 text-primary-foreground"
                    : "text-nav-foreground/80 hover:bg-primary/20 hover:text-nav-foreground"
                }`}
              >
                {item.icon} {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-nav-foreground">
            {isAdmin && (
              <button
                onClick={() => navigate('/admin-panel')}
                className="flex items-center gap-1.5 bg-yellow-500/20 hover:bg-yellow-500/30 px-3 py-1.5 rounded-full text-sm font-medium transition border border-yellow-400/30"
              >
                <Shield size={14} /> Admin
              </button>
            )}
            {user ? (
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full text-sm font-medium transition"
                title={user.email || ""}
              >
                <LogOut size={14} /> Sign out
              </button>
            ) : (
              <button
                onClick={() => navigate('/auth')}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full text-sm font-medium transition"
              >
                <LogIn size={14} /> Sign in
              </button>
            )}
            <button
              onClick={() => navigate('/portfolio')}
              className="bg-gradient-to-r from-purple-600 to-red-600 px-4 py-1.5 rounded-full text-sm font-medium hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer text-white"
            >
              👤 Dhiraj Shahi
            </button>
          </div>

          <button onClick={() => setOpen(!open)} className="lg:hidden text-nav-foreground p-2">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile */}
        {open && (
          <div className="lg:hidden pb-4 animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary/30 text-primary-foreground"
                    : "text-nav-foreground/80 hover:bg-primary/20"
                }`}
              >
                {item.icon} {item.label}
              </Link>
            ))}
            {user ? (
              <button
                onClick={() => { setOpen(false); handleSignOut(); }}
                className="w-full mt-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-white/10 text-nav-foreground flex items-center justify-center gap-2"
              >
                <LogOut size={16} /> Sign out
              </button>
            ) : (
              <button
                onClick={() => { setOpen(false); navigate('/auth'); }}
                className="w-full mt-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-white/10 text-nav-foreground flex items-center justify-center gap-2"
              >
                <LogIn size={16} /> Sign in
              </button>
            )}
            <button
              onClick={() => {
                setOpen(false);
                navigate('/portfolio');
              }}
              className="w-full mt-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-600 to-red-600 text-white flex items-center justify-center gap-2"
            >
              👤 Dhiraj Shahi - Portfolio
            </button>
          </div>
        )}
      </div>
      <div className="h-1 bg-gradient-to-r from-card-red via-accent to-secondary" />
    </nav>
  );
};

export default Navbar;

