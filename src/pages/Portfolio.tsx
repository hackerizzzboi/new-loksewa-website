import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  X, Mail, Phone, MapPin, Github, Linkedin, Facebook, Award, 
  Briefcase, GraduationCap, Code, Shield, FileText, 
  Download, Zap, Target, Eye, Heart, Star, Terminal,
  Lock, Server, Bug, User, FileJson, 
  Sparkles, Rocket, Crown, Gem, Globe,
  Activity, Coffee, Flag, Gift
} from "lucide-react";

const Portfolio = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("about");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showFireworks, setShowFireworks] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  const fullText = "Dhiraj Shahi | Ethical Hacker | Cybersecurity Expert";

  // Typing effect
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 50);
    return () => clearInterval(typing);
  }, []);

  // Blinking cursor
  useEffect(() => {
    const blink = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            setShowFireworks(true);
            setTimeout(() => setShowFireworks(false), 3000);
          }, 500);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 150);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
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
      { name: "Ethical Hacking", level: 85, icon: "🐛" },
      { name: "Cybersecurity", level: 90, icon: "🛡️" },
      { name: "Network Security", level: 85, icon: "🌐" },
      { name: "Penetration Testing", level: 75, icon: "🔒" },
      { name: "Kali Linux", level: 85, icon: "💻" },
      { name: "MS Office", level: 90, icon: "📊" },
      { name: "GitHub", level: 80, icon: "📁" }
    ],
    experience: [
      { title: "Loksewa Preparation Website", company: "Personal Project", period: "2024 - Present", desc: "Built and managed a website for Loksewa exam preparation." },
      { title: "Cybersecurity Training", company: "Training Program", period: "2024 - 2025", desc: "Completed training covering network security and penetration testing." },
      { title: "Website Deployment", company: "Self-Learning", period: "2024 - Present", desc: "Used GitHub to deploy web projects." }
    ],
    education: [
      { degree: "Certified Cybersecurity Educator (CCEP)", institution: "Mastermind Assurance", year: "2026" },
      { degree: "Certified Red Team Analyst (CRTA)", institution: "Red Team Leaders", year: "2025" },
      { degree: "ISO/IEC 27001:2022 Lead Auditor", institution: "Mastermind Assurance", year: "2025" }
    ],
    certificates: [
      { name: "CCEP Certification", issuer: "Mastermind Assurance", date: "Jan 8, 2026" },
      { name: "CRTA Certification", issuer: "Red Team Leaders", date: "Apr 16, 2025" },
      { name: "ISO 27001 Lead Auditor", issuer: "Mastermind Assurance", date: "2025" }
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

  // Loading Screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
        <div className="relative z-10 text-center">
          <div className="mb-8 relative">
            <div className="w-24 h-24 mx-auto rounded-full border-4 border-purple-500/30 flex items-center justify-center">
              <Shield size={48} className="text-purple-500 animate-pulse" />
            </div>
            <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full border-t-4 border-purple-500 animate-spin"></div>
          </div>
          
          <div className="font-mono text-green-400 text-sm mb-2">Loading Portfolio...</div>
          
          <div className="w-64 md:w-80 bg-gray-800 rounded-full h-2 mx-auto mb-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-red-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(loadingProgress, 100)}%` }}
            ></div>
          </div>
          
          <p className="text-gray-400 text-sm font-mono">{Math.floor(Math.min(loadingProgress, 100))}%</p>
          
          <div className="flex justify-center gap-2 mt-6">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 100}ms` }}></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black overflow-x-hidden relative">
      {/* Fireworks Effect */}
      {showFireworks && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="absolute w-2 h-2 bg-gradient-to-r from-purple-500 to-red-500 rounded-full animate-ping" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 1 + 0.5}s`
            }}></div>
          ))}
        </div>
      )}

      {/* Custom Cursor */}
      <div 
        className="fixed w-8 h-8 pointer-events-none z-50 transition-transform duration-75 ease-out hidden md:block"
        style={{ transform: `translate(${mousePosition.x - 16}px, ${mousePosition.y - 16}px)` }}
      >
        <div className="w-full h-full rounded-full border-2 border-purple-500 animate-pulse opacity-50"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-md border-b border-purple-500/30">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <Shield size={28} className="text-purple-500" />
            <span className="text-lg font-mono font-bold bg-gradient-to-r from-purple-400 to-red-400 bg-clip-text text-transparent">
              DHRX Security
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={exportToJSON}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-red-600 text-white flex items-center gap-1 text-xs font-mono"
            >
              <Download size={12} /> Export JSON
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-3 py-1.5 rounded-lg bg-white/10 text-white flex items-center gap-1 text-xs font-mono"
            >
              <X size={12} /> Close
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* Hero Section */}
          <div className="text-center mb-10">
            <div className="relative inline-block mb-6">
              <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-purple-700 to-red-700 flex items-center justify-center shadow-2xl border-4 border-purple-500/50">
                <Shield size={48} className="text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-green-500 border-2 border-black flex items-center justify-center text-xs font-bold">
                ✓
              </div>
            </div>
            
            <div className="font-mono text-green-400 text-xs mb-2">Active Session: Root</div>
            
            <div className="h-10 mb-3">
              <h1 className="text-2xl md:text-4xl font-mono font-bold">
                <span className="bg-gradient-to-r from-purple-400 to-red-400 bg-clip-text text-transparent">
                  {typedText}
                </span>
                <span className={`inline-block w-0.5 h-5 bg-purple-500 ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
              </h1>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 mb-5">
              <span className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-300 text-xs font-mono border border-purple-500/30">Ethical Hacker</span>
              <span className="px-3 py-1 bg-red-500/20 rounded-full text-red-300 text-xs font-mono border border-red-500/30">Security Analyst</span>
              <span className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-300 text-xs font-mono border border-blue-500/30">Pen Tester</span>
            </div>
            
            <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
              {portfolioData.bio}
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 rounded-xl p-3 text-center border border-purple-500/30 hover:scale-105 transition-all duration-300">
              <div className="text-2xl font-bold text-purple-400">3+</div>
              <div className="text-gray-500 text-xs font-mono mt-1">CERTIFICATIONS</div>
            </div>
            <div className="bg-gradient-to-br from-red-900/20 to-red-800/10 rounded-xl p-3 text-center border border-red-500/30 hover:scale-105 transition-all duration-300">
              <div className="text-2xl font-bold text-red-400">10+</div>
              <div className="text-gray-500 text-xs font-mono mt-1">SKILLS</div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 rounded-xl p-3 text-center border border-blue-500/30 hover:scale-105 transition-all duration-300">
              <div className="text-2xl font-bold text-blue-400">4+</div>
              <div className="text-gray-500 text-xs font-mono mt-1">PROJECTS</div>
            </div>
            <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 rounded-xl p-3 text-center border border-green-500/30 hover:scale-105 transition-all duration-300">
              <div className="text-2xl font-bold text-green-400">500+</div>
              <div className="text-gray-500 text-xs font-mono mt-1">HOURS</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-6 border-b border-purple-500/20 pb-3">
            {[
              { id: "about", label: "ABOUT", emoji: "👤" },
              { id: "skills", label: "SKILLS", emoji: "⚡" },
              { id: "experience", label: "EXPERIENCE", emoji: "💼" },
              { id: "certificates", label: "CERTIFICATES", emoji: "🏆" },
              { id: "contact", label: "CONTACT", emoji: "📞" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-300 flex items-center gap-1 ${
                  activeTab === tab.id 
                    ? "bg-gradient-to-r from-purple-600 to-red-600 text-white shadow-md" 
                    : "bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                {tab.emoji} [{tab.label}]
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div>
            {/* About Tab */}
            {activeTab === "about" && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-md font-mono font-bold text-purple-400 flex items-center gap-2">
                    <Heart size={16} /> Who Am I
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{portfolioData.bio}</p>
                  
                  <div className="pt-3">
                    <h3 className="text-md font-mono font-bold text-purple-400 flex items-center gap-2 mb-2">
                      <Star size={16} /> Core Skills
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {["Vulnerability Assessment", "Ethical Hacking", "Network Security", "Web Development"].map((skill, i) => (
                        <div key={i} className="flex items-center gap-2 text-gray-300 text-xs p-2 bg-white/5 rounded-lg">
                          <span className="text-sm">🔒</span> {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-xl p-5 border border-purple-500/20">
                  <h3 className="text-md font-mono font-bold text-purple-400 flex items-center gap-2 mb-3">
                    <Eye size={16} /> Quick Info
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-300 text-xs p-2 bg-white/5 rounded-lg">
                      <MapPin size={12} className="text-purple-400" /> {portfolioData.location}
                    </div>
                    <div className="flex items-center gap-2 text-gray-300 text-xs p-2 bg-white/5 rounded-lg">
                      <Mail size={12} className="text-purple-400" /> {portfolioData.email}
                    </div>
                    <div className="flex items-center gap-2 text-gray-300 text-xs p-2 bg-white/5 rounded-lg">
                      <Phone size={12} className="text-purple-400" /> {portfolioData.phone}
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-purple-500/20">
                    <h3 className="text-xs font-mono font-bold text-purple-400 mb-2">Connect</h3>
                    <div className="flex gap-2">
                      <a href={portfolioData.social.facebook} target="_blank" className="p-2 bg-white/10 rounded-lg hover:bg-blue-600 transition text-sm">FB</a>
                      <a href={portfolioData.social.github} target="_blank" className="p-2 bg-white/10 rounded-lg hover:bg-gray-600 transition text-sm">GH</a>
                      <a href={portfolioData.social.linkedin} target="_blank" className="p-2 bg-white/10 rounded-lg hover:bg-blue-700 transition text-sm">IN</a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === "skills" && (
              <div className="grid md:grid-cols-2 gap-4">
                {portfolioData.skills.map((skill, idx) => (
                  <div key={idx} className="bg-white/5 rounded-xl p-3 hover:bg-white/10 transition">
                    <div className="flex justify-between items-center mb-1">
                      <span className="flex items-center gap-1 text-white text-xs font-mono">
                        <span>{skill.icon}</span> {skill.name}
                      </span>
                      <span className="text-purple-400 text-xs font-mono">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-red-500 rounded-full" style={{ width: `${skill.level}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Experience Tab */}
            {activeTab === "experience" && (
              <div className="space-y-3">
                {portfolioData.experience.map((exp, idx) => (
                  <div key={idx} className="bg-white/5 rounded-xl p-4 border-l-4 border-purple-500">
                    <h3 className="text-sm font-mono font-bold text-white">{exp.title}</h3>
                    <p className="text-purple-400 text-xs font-mono mb-1">{exp.company} | {exp.period}</p>
                    <p className="text-gray-400 text-xs">{exp.desc}</p>
                  </div>
                ))}
                <div className="bg-white/5 rounded-xl p-4 border-l-4 border-blue-500">
                  <h3 className="text-sm font-mono font-bold text-white mb-2">Education</h3>
                  {portfolioData.education.map((edu, idx) => (
                    <div key={idx} className="mb-2">
                      <p className="text-white text-xs font-mono">{edu.degree}</p>
                      <p className="text-gray-400 text-xs font-mono">{edu.institution} | {edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certificates Tab */}
            {activeTab === "certificates" && (
              <div className="grid md:grid-cols-2 gap-3">
                {portfolioData.certificates.map((cert, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-purple-900/20 to-red-900/20 rounded-xl p-3 border border-purple-500/30 hover:scale-105 transition">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">🏆</span>
                      <div>
                        <h4 className="font-mono font-bold text-white text-xs">{cert.name}</h4>
                        <p className="text-gray-400 text-xs font-mono">{cert.issuer}</p>
                      </div>
                    </div>
                    <p className="text-gray-500 text-xs font-mono mt-1">Issued: {cert.date}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === "contact" && (
              <div className="bg-white/5 rounded-xl p-6 text-center max-w-lg mx-auto border border-purple-500/20">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-red-500 flex items-center justify-center mb-3">
                  <Mail size={28} className="text-white" />
                </div>
                <h3 className="text-md font-mono font-bold text-white mb-2">Get In Touch</h3>
                <p className="text-gray-400 text-xs font-mono mb-4">Open for opportunities</p>
                <div className="space-y-2 text-left max-w-xs mx-auto">
                  <div className="flex items-center gap-2 text-gray-300 text-xs p-2 bg-white/5 rounded-lg font-mono">
                    <Mail size={12} className="text-purple-400" /> {portfolioData.email}
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 text-xs p-2 bg-white/5 rounded-lg font-mono">
                    <Phone size={12} className="text-purple-400" /> {portfolioData.phone}
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 text-xs p-2 bg-white/5 rounded-lg font-mono">
                    <MapPin size={12} className="text-purple-400" /> {portfolioData.location}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-8 pt-4 text-center border-t border-purple-500/20">
            <p className="text-gray-600 text-xs font-mono flex items-center justify-center gap-2">
              <Shield size={10} /> Secured by Dhiraj Shahi | Status: Active
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
