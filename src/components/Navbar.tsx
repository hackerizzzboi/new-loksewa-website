import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, BookOpen } from "lucide-react";

const navItems = [
  { label: "Home", path: "/", icon: "🏠" },
  { label: "Practice", path: "/practice", icon: "❓" },
  { label: "Old is Gold", path: "/old-is-gold", icon: "🏆" },
  { label: "अनलाइन परीक्षा", path: "/online-exam", icon: "📝" },
  { label: "Syllabus", path: "/syllabus", icon: "📋" },
  { label: "Typing", path: "/typing", icon: "⌨️" },
  { label: "Notes", path: "/notes", icon: "📒" },
  { label: "News", path: "/news", icon: "📰" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

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
            <div className="bg-primary/30 px-3 py-1.5 rounded-full text-sm font-medium">
              👤 Dhiraj Shahi
            </div>
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
            <div className="mt-2 px-4 text-nav-foreground/70 text-sm">👤 Dhiraj Shahi</div>
          </div>
        )}
      </div>
      <div className="h-1 bg-gradient-to-r from-card-red via-accent to-secondary" />
    </nav>
  );
};

export default Navbar;
