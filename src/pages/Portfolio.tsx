import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  X, Mail, Phone, MapPin, Github, Linkedin, Facebook, Award, 
  Briefcase, GraduationCap, Code, Shield, FileText, 
  Download, Zap, Target, Eye, Heart, Star, Terminal,
  Lock, Server, Bug, User, FileJson, Sparkles, Rocket, 
  CheckCircle, ExternalLink, Calendar, Clock
} from "lucide-react";

const Portfolio = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("about");
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const portfolioData = {
    name: "Dhiraj Shahi",
    title: "Cybersecurity Professional | Ethical Hacker",
    bio: "Passionate cybersecurity enthusiast with expertise in ethical hacking, network security, and vulnerability assessment. Skilled in Kali Linux, penetration testing, and security analysis. Also proficient in web development and computer operations.",
    email: "dhirajshahif15@gmail.com",
    phone: "+977 9709954775",
    location: "Surkhet, Nepal",
    social: {
      facebook: "https://www.facebook.com/dhirupiru69",
      github: "https://github.com/hackerizzzboi",
      linkedin: "https://www.linkedin.com/in/dhiraj-shahi-a121693a2/"
    },
    skills: [
      { name: "Ethical Hacking & Penetration Testing", level: 85, icon: "🔒" },
      { name: "Cybersecurity & Network Security", level: 90, icon: "🛡️" },
      { name: "Vulnerability Assessment", level: 85, icon: "🎯" },
      { name: "Kali Linux & Security Tools", level: 85, icon: "💻" },
      { name: "Web Development & GitHub", level: 80, icon: "🌐" },
      { name: "MS Office & Documentation", level: 90, icon: "📝" }
    ],
    experience: [
      { title: "Cybersecurity Training", company: "Professional Program", period: "2024-2025", description: "Completed comprehensive training in ethical hacking, network security, and penetration testing with hands-on Kali Linux experience." },
      { title: "Web Development Projects", company: "Freelance", period: "2024-Present", description: "Built and deployed multiple web applications including Loksewa preparation platform using modern technologies." },
      { title: "Computer Operations", company: "Technical Support", period: "2023-Present", description: "Expert in system maintenance, data management, and technical documentation." }
    ],
    certifications: [
      { name: "Certified Cybersecurity Educator (CCEP)", issuer: "Mastermind Assurance", date: "Jan 2026" },
      { name: "Certified Red Team Analyst (CRTA)", issuer: "Red Team Leaders", date: "Apr 2025" },
      { name: "ISO/IEC 27001:2022 Lead Auditor", issuer: "Mastermind Assurance", date: "2025" }
    ]
  };

  const exportToJSON = () => {
    const data = { ...portfolioData, exportDate: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${portfolioData.name.replace(/\s/g, '_')}_Portfolio.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 relative">
            <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-ping"></div>
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-red-500 flex items-center justify-center">
              <Shield size={40} className="text-white" />
            </div>
          </div>
          <h2 className="text-white text-xl font-semibold mb-2">Loading Portfolio</h2>
          <div className="w-48 h-1 bg-gray-700 rounded-full mx-auto overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-purple-500 to-red-500 animate-loading-bar"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            {["about", "skills", "experience", "certifications", "contact"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setMobileMenuOpen(false);
                }}
                className="text-white text-xl font-semibold py-3 px-8 rounded-xl hover:bg-white/10 transition w-48 text-center"
              >
                {tab.toUpperCase()}
              </button>
            ))}
            <button
              onClick={exportToJSON}
              className="text-white text-xl font-semibold py-3 px-8 rounded-xl bg-gradient-to-r from-purple-600 to-red-600 hover:shadow-lg transition w-48 text-center"
            >
              EXPORT CV
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-md border-b border-gray-800 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-red-500 flex items-center justify-center">
                <Shield size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-sm md:text-base">{portfolioData.name}</h1>
                <p className="text-gray-400 text-xs hidden md:block">Cybersecurity Professional</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {["about", "skills", "experience", "certifications", "contact"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-purple-600 to-red-600 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={exportToJSON}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-red-600 text-white text-sm font-medium flex items-center gap-2 hover:shadow-lg transition"
              >
                <Download size={16} /> Export CV
              </button>
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium flex items-center gap-2 hover:bg-white/20 transition"
              >
                <X size={16} /> Close
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-white p-2 rounded-lg bg-white/10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-red-500 blur-xl opacity-50 animate-pulse"></div>
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-red-600 flex items-center justify-center border-4 border-white/20">
                <Shield size={48} className="text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
              {portfolioData.name}
            </h1>
            <p className="text-xl text-purple-400 mb-4">{portfolioData.title}</p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <span className="px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm">🔒 Ethical Hacker</span>
              <span className="px-4 py-2 bg-red-500/20 rounded-full text-red-300 text-sm">🛡️ Security Analyst</span>
              <span className="px-4 py-2 bg-blue-500/20 rounded-full text-blue-300 text-sm">💻 Developer</span>
            </div>
            
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {portfolioData.bio}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white/5 rounded-xl p-4 text-center hover:bg-white/10 transition group">
              <div className="text-2xl font-bold text-purple-400 group-hover:scale-110 transition">3+</div>
              <div className="text-gray-400 text-sm">Certifications</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center hover:bg-white/10 transition group">
              <div className="text-2xl font-bold text-red-400 group-hover:scale-110 transition">10+</div>
              <div className="text-gray-400 text-sm">Skills</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center hover:bg-white/10 transition group">
              <div className="text-2xl font-bold text-blue-400 group-hover:scale-110 transition">4+</div>
              <div className="text-gray-400 text-sm">Projects</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center hover:bg-white/10 transition group">
              <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition">500+</div>
              <div className="text-gray-400 text-sm">Hours</div>
            </div>
          </div>

          {/* Tab Content - Professional Cards */}
          <div className="bg-white/5 backdrop-blur rounded-2xl p-6 md:p-8 border border-white/10">
            
            {/* About */}
            {activeTab === "about" && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <User size={20} className="text-purple-400" /> Professional Background
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{portfolioData.bio}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <Eye size={20} className="text-purple-400" /> Quick Info
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-300">
                        <MapPin size={18} className="text-purple-400" />
                        <span>{portfolioData.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <Mail size={18} className="text-purple-400" />
                        <a href={`mailto:${portfolioData.email}`} className="hover:text-purple-400 transition">{portfolioData.email}</a>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <Phone size={18} className="text-purple-400" />
                        <a href={`tel:${portfolioData.phone}`} className="hover:text-purple-400 transition">{portfolioData.phone}</a>
                      </div>
                    </div>
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-white mb-3">Connect</h3>
                      <div className="flex gap-3">
                        <a href={portfolioData.social.facebook} target="_blank" className="p-2 bg-white/10 rounded-lg hover:bg-blue-600 transition"><Facebook size={20} /></a>
                        <a href={portfolioData.social.github} target="_blank" className="p-2 bg-white/10 rounded-lg hover:bg-gray-600 transition"><Github size={20} /></a>
                        <a href={portfolioData.social.linkedin} target="_blank" className="p-2 bg-white/10 rounded-lg hover:bg-blue-700 transition"><Linkedin size={20} /></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Skills */}
            {activeTab === "skills" && (
              <div className="space-y-4">
                {portfolioData.skills.map((skill, idx) => (
                  <div key={idx} className="group">
                    <div className="flex justify-between mb-2">
                      <span className="text-white text-sm font-medium flex items-center gap-2">
                        <span>{skill.icon}</span> {skill.name}
                      </span>
                      <span className="text-purple-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-red-500 rounded-full transition-all duration-1000 group-hover:shadow-lg"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Experience */}
            {activeTab === "experience" && (
              <div className="space-y-6">
                {portfolioData.experience.map((exp, idx) => (
                  <div key={idx} className="border-l-4 border-purple-500 pl-4">
                    <h3 className="text-lg font-semibold text-white">{exp.title}</h3>
                    <p className="text-purple-400 text-sm mb-2">{exp.company} • {exp.period}</p>
                    <p className="text-gray-300 text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Certifications */}
            {activeTab === "certifications" && (
              <div className="grid md:grid-cols-2 gap-4">
                {portfolioData.certifications.map((cert, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-purple-900/30 to-red-900/30 rounded-xl p-4 border border-purple-500/30 hover:scale-105 transition">
                    <div className="flex items-start gap-3">
                      <Award size={24} className="text-purple-400" />
                      <div>
                        <h4 className="text-white font-semibold">{cert.name}</h4>
                        <p className="text-gray-400 text-sm">{cert.issuer}</p>
                        <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                          <Calendar size={12} /> {cert.date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Contact */}
            {activeTab === "contact" && (
              <div className="text-center py-8">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-red-500 flex items-center justify-center mb-6">
                  <Mail size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Let's Work Together</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  I'm available for security consulting, penetration testing, and development opportunities.
                </p>
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail size={18} className="text-purple-400" />
                    <a href={`mailto:${portfolioData.email}`} className="hover:text-purple-400 transition">{portfolioData.email}</a>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Phone size={18} className="text-purple-400" />
                    <a href={`tel:${portfolioData.phone}`} className="hover:text-purple-400 transition">{portfolioData.phone}</a>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin size={18} className="text-purple-400" />
                    <span>{portfolioData.location}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">© 2024 Dhiraj Shahi • Cybersecurity Professional</p>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
