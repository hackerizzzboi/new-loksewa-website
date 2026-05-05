import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  X, Mail, Phone, MapPin, Github, Linkedin, Facebook, Award, 
  Briefcase, GraduationCap, Code, Shield, FileText, 
  Download, Zap, Target, Eye, Heart, Star, Terminal,
  Lock, Server, Bug, User, FileJson, Loader2, 
  Cpu, Wifi, Key, Network, Database, Cloud
} from "lucide-react";

const Portfolio = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("about");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const portfolioData = {
    name: "Dhiraj Shahi",
    title: "Ethical Hacker | Cybersecurity Enthusiast | Computer Operator",
    bio: "I am an aspiring cybersecurity enthusiast with a background in ethical hacking and digital security. I have knowledge of network security, vulnerability assessment, and basic penetration testing, along with hands-on experience using tools like Kali Linux and Nmap. In addition, I have skills in Microsoft Office and basic accounting, which help me manage data, create reports, and handle financial records efficiently. I am passionate about learning new technologies and building secure digital solutions.",
    email: "dhirajshahif15@gmail.com",
    phone: "+977 9709954775",
    location: "Surkhet, Nepal",
    social: {
      facebook: "https://www.facebook.com/dhirupiru69",
      github: "https://github.com/hackerizzzboi",
      linkedin: "https://www.linkedin.com/in/dhiraj-shahi-a121693a2/"
    },
    skills: [
      { name: "Ethical Hacking", level: 85, icon: "🐛", category: "cyber" },
      { name: "Cybersecurity Fundamentals", level: 90, icon: "🛡️", category: "cyber" },
      { name: "Network Security", level: 85, icon: "🌐", category: "cyber" },
      { name: "Vulnerability Assessment", level: 80, icon: "🎯", category: "cyber" },
      { name: "Penetration Testing", level: 75, icon: "🔒", category: "cyber" },
      { name: "Kali Linux & Tools", level: 85, icon: "💻", category: "cyber" },
      { name: "MS Office Suite", level: 90, icon: "📊", category: "office" },
      { name: "Basic Accounting", level: 85, icon: "💰", category: "office" },
      { name: "GitHub & Deployment", level: 80, icon: "📁", category: "web" }
    ],
    experience: [
      { title: "Loksewa Preparation Website", company: "Personal Project", period: "2024 - Present", desc: "Built and managed a website for Loksewa exam preparation, adding questions and content manually. Deployed using Vercel/GitHub Pages." },
      { title: "Cybersecurity & Ethical Hacking Training", company: "Training Program", period: "2024 - 2025", desc: "Completed training covering network security, reconnaissance, vulnerability assessment, and penetration testing with Kali Linux." },
      { title: "Website Deployment & Version Control", company: "Self-Learning", period: "2024 - Present", desc: "Used GitHub to upload, manage, and deploy web projects. Learned version control basics." }
    ],
    education: [
      { degree: "Certified Cybersecurity Educator Professional (CCEP)", institution: "Mastermind Assurance", year: "2026" },
      { degree: "Certified Red Team Analyst (CRTA)", institution: "Red Team Leaders", year: "2025" },
      { degree: "ISO/IEC 27001:2022 Lead Auditor", institution: "Mastermind Assurance", year: "2025" }
    ],
    certificates: [
      { name: "Certified Cybersecurity Educator Professional (CCEP)", issuer: "Mastermind Assurance", date: "Jan 8, 2026" },
      { name: "Certified Red Team Analyst (CRTA)", issuer: "Red Team Leaders", date: "Apr 16, 2025" },
      { name: "ISO/IEC 27001:2022 Lead Auditor", issuer: "Mastermind Assurance", date: "2025" },
      { name: "Q/A Training Certification", issuer: "22 Hours Program", date: "2025" }
    ]
  };

  const exportToJSON = () => {
    const data = { ...portfolioData, exportDate: new Date().toISOString(), version: '1.0' };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${portfolioData.name.replace(/\s/g, '_')}_Portfolio.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Loading Screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
        {/* Matrix Rain Effect */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-green-500/10 to-transparent animate-matrix"></div>
        </div>
        
        <div className="relative z-10 text-center">
          <div className="mb-8 relative">
            <div className="w-24 h-24 mx-auto rounded-full border-4 border-purple-500/30 flex items-center justify-center">
              <Shield size={48} className="text-purple-500 animate-pulse" />
            </div>
            <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full border-t-4 border-purple-500 animate-spin"></div>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 animate-pulse">
            Loading Portfolio...
          </h1>
          
          <div className="w-64 md:w-96 bg-gray-800 rounded-full h-2 mx-auto mb-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-red-500 rounded-full transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          
          <p className="text-gray-400 text-sm">{loadingProgress}%</p>
          
          <div className="flex justify-center gap-2 mt-6">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-x-hidden animate-fade-in">
      {/* Animated Matrix Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-10 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600 rounded-full filter blur-3xl opacity-10 animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-5 animate-pulse-slow delay-2000"></div>
        
        {/* Cyber Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Custom Cursor */}
      <div 
        className="fixed w-8 h-8 pointer-events-none z-50 transition-transform duration-100 ease-out hidden md:block"
        style={{ transform: `translate(${mousePosition.x - 16}px, ${mousePosition.y - 16}px)` }}
      >
        <div className="w-full h-full rounded-full border-2 border-purple-500 animate-pulse"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-md border-b border-purple-500/20 animate-slide-down">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Shield size={28} className="text-purple-500 animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-purple-500 blur-md opacity-50"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-red-400 to-purple-400 bg-clip-text text-transparent">
              DHRX SECURITY
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={exportToJSON}
              className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-red-600 hover:shadow-lg transition-all duration-300 text-white flex items-center gap-2 text-sm font-medium"
            >
              <Download size={14} /> Export JSON
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 text-white flex items-center gap-2 text-sm"
            >
              <X size={14} /> Close
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 pt-20 pb-12 animate-scale-up">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-red-600 animate-pulse-slow blur-xl"></div>
              <div className="relative w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-purple-700 to-red-700 flex items-center justify-center text-5xl font-bold text-white shadow-2xl border-4 border-purple-500/50">
                <User size={56} />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-green-500 border-4 border-black flex items-center justify-center">
                <span className="text-xs">✓</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-purple-400 via-red-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              {portfolioData.name}
            </h1>
            
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <span className="px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm font-medium border border-purple-500/30 flex items-center gap-2">
                <Bug size={14} /> Ethical Hacker
              </span>
              <span className="px-4 py-2 bg-red-500/20 rounded-full text-red-300 text-sm font-medium border border-red-500/30 flex items-center gap-2">
                <Shield size={14} /> Security Analyst
              </span>
              <span className="px-4 py-2 bg-blue-500/20 rounded-full text-blue-300 text-sm font-medium border border-blue-500/30 flex items-center gap-2">
                <Code size={14} /> Developer
              </span>
              <span className="px-4 py-2 bg-emerald-500/20 rounded-full text-emerald-300 text-sm font-medium border border-emerald-500/30 flex items-center gap-2">
                <Terminal size={14} /> Pen Tester
              </span>
            </div>
            
            <p className="text-gray-300 max-w-3xl mx-auto text-base leading-relaxed">
              {portfolioData.bio}
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 rounded-xl p-4 text-center border border-purple-500/30 hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold text-purple-400">3+</div>
              <div className="text-gray-400 text-xs mt-1">Certifications</div>
            </div>
            <div className="bg-gradient-to-br from-red-900/20 to-red-800/10 rounded-xl p-4 text-center border border-red-500/30 hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold text-red-400">10+</div>
              <div className="text-gray-400 text-xs mt-1">Skills Mastered</div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 rounded-xl p-4 text-center border border-blue-500/30 hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold text-blue-400">4+</div>
              <div className="text-gray-400 text-xs mt-1">Projects</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-900/20 to-emerald-800/10 rounded-xl p-4 text-center border border-emerald-500/30 hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold text-emerald-400">500+</div>
              <div className="text-gray-400 text-xs mt-1">Hours of Learning</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8 border-b border-purple-500/20 pb-4">
            {[
              { id: "about", label: "About", icon: "👤", color: "purple" },
              { id: "skills", label: "Skills", icon: "⚡", color: "blue" },
              { id: "experience", label: "Experience", icon: "💼", color: "emerald" },
              { id: "certificates", label: "Certificates", icon: "🏆", color: "yellow" },
              { id: "contact", label: "Contact", icon: "📞", color: "pink" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab.id 
                    ? `bg-gradient-to-r from-${tab.color}-600 to-${tab.color}-500 text-white shadow-lg scale-105` 
                    : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content with Animation */}
          <div className="animate-fade-in-up">
            
            {/* About Tab */}
            {activeTab === "about" && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Heart size={20} className="text-red-400" /> Who Am I?
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-sm">{portfolioData.bio}</p>
                  
                  <div className="pt-4">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-3">
                      <Star size={20} className="text-yellow-400" /> Core Competencies
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 text-gray-300 text-sm p-2 bg-white/5 rounded-lg"><Lock size={14} className="text-green-400" /> Vulnerability Assessment</div>
                      <div className="flex items-center gap-2 text-gray-300 text-sm p-2 bg-white/5 rounded-lg"><Bug size={14} className="text-red-400" /> Ethical Hacking</div>
                      <div className="flex items-center gap-2 text-gray-300 text-sm p-2 bg-white/5 rounded-lg"><Server size={14} className="text-blue-400" /> Network Security</div>
                      <div className="flex items-center gap-2 text-gray-300 text-sm p-2 bg-white/5 rounded-lg"><Code size={14} className="text-purple-400" /> Web Development</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-white/5 to-white/0 rounded-xl p-6 border border-purple-500/20">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
                    <Eye size={20} className="text-purple-400" /> Quick Facts
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-300 p-2 bg-white/5 rounded-lg">
                      <MapPin size={16} className="text-purple-400" />
                      <span className="text-sm">{portfolioData.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300 p-2 bg-white/5 rounded-lg">
                      <Mail size={16} className="text-purple-400" />
                      <a href={`mailto:${portfolioData.email}`} className="text-sm hover:text-purple-400 transition">{portfolioData.email}</a>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300 p-2 bg-white/5 rounded-lg">
                      <Phone size={16} className="text-purple-400" />
                      <a href={`tel:${portfolioData.phone}`} className="text-sm hover:text-purple-400 transition">{portfolioData.phone}</a>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-purple-500/20">
                    <h3 className="text-md font-semibold text-white mb-3">Connect on Socials</h3>
                    <div className="flex gap-3">
                      <a href={portfolioData.social.facebook} target="_blank" className="p-2 bg-white/10 rounded-xl hover:bg-blue-600 transition-all hover:scale-110">📘</a>
                      <a href={portfolioData.social.github} target="_blank" className="p-2 bg-white/10 rounded-xl hover:bg-gray-600 transition-all hover:scale-110">🐙</a>
                      <a href={portfolioData.social.linkedin} target="_blank" className="p-2 bg-white/10 rounded-xl hover:bg-blue-700 transition-all hover:scale-110">🔗</a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === "skills" && (
              <div className="grid md:grid-cols-2 gap-5">
                {portfolioData.skills.map((skill, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-white/5 to-white/0 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="flex items-center gap-2 text-white text-sm font-medium">
                        <span className="text-xl">{skill.icon}</span> {skill.name}
                      </span>
                      <span className="text-purple-400 text-sm font-bold">{skill.level}%</span>
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

            {/* Experience Tab */}
            {activeTab === "experience" && (
              <div className="space-y-4">
                {portfolioData.experience.map((exp, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-white/5 to-white/0 rounded-xl p-5 border-l-4 border-purple-500 hover:scale-[1.02] transition-all duration-300">
                    <h3 className="text-lg font-semibold text-white">{exp.title}</h3>
                    <p className="text-purple-400 text-sm mb-2">{exp.company} • {exp.period}</p>
                    <p className="text-gray-400 text-sm">{exp.desc}</p>
                  </div>
                ))}
                <div className="bg-gradient-to-r from-white/5 to-white/0 rounded-xl p-5 border-l-4 border-blue-500">
                  <h3 className="text-lg font-semibold text-white mb-3">🎓 Education & Certifications</h3>
                  {portfolioData.education.map((edu, idx) => (
                    <div key={idx} className="mb-3">
                      <p className="text-white text-sm font-medium">{edu.degree}</p>
                      <p className="text-gray-400 text-xs">{edu.institution} • {edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certificates Tab */}
            {activeTab === "certificates" && (
              <div className="grid md:grid-cols-2 gap-4">
                {portfolioData.certificates.map((cert, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-purple-900/30 to-red-900/30 rounded-xl p-5 border border-purple-500/30 hover:scale-105 transition-all duration-300 group">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-red-500 flex items-center justify-center text-2xl group-hover:scale-110 transition">
                        🏆
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{cert.name}</h4>
                        <p className="text-gray-400 text-xs">{cert.issuer}</p>
                      </div>
                    </div>
                    <p className="text-gray-500 text-xs mt-2">📅 Issued: {cert.date}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === "contact" && (
              <div className="bg-gradient-to-br from-white/5 to-white/0 rounded-xl p-8 text-center max-w-2xl mx-auto border border-purple-500/20">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-red-500 flex items-center justify-center mb-4 animate-pulse">
                  <Mail size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Get In Touch</h3>
                <p className="text-gray-400 mb-6">Open to security consulting, collaborations, and opportunities!</p>
                <div className="space-y-3 text-left max-w-sm mx-auto">
                  <div className="flex items-center gap-3 text-gray-300 p-3 bg-white/5 rounded-lg">
                    <Mail size={18} className="text-purple-400" />
                    <span className="text-sm">{portfolioData.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300 p-3 bg-white/5 rounded-lg">
                    <Phone size={18} className="text-purple-400" />
                    <span className="text-sm">{portfolioData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300 p-3 bg-white/5 rounded-lg">
                    <MapPin size={18} className="text-purple-400" />
                    <span className="text-sm">{portfolioData.location}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-10 pt-6 text-center border-t border-purple-500/20">
            <p className="text-gray-500 text-xs flex items-center justify-center gap-2">
              <Shield size={12} /> Secured by Dhiraj Shahi • Cybersecurity Enthusiast
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-up {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes matrix {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-slide-down { animation: slide-down 0.5s ease-out; }
        .animate-scale-up { animation: scale-up 0.5s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out; }
        .animate-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }
        .animate-matrix { animation: matrix 2s linear infinite; }
        .animate-bounce {
          animation: bounce 0.6s ease-in-out infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
