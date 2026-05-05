import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  X, Mail, Phone, MapPin, Github, Linkedin, Facebook, Award, 
  Briefcase, GraduationCap, Code, Shield, FileText, 
  Download, Zap, Target, Sparkles, Eye, Heart, Star, Terminal,
  Lock, Server, Bug, Key, User, FileJson
} from "lucide-react";

const Portfolio = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("about");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
      { name: "Ethical Hacking", level: 85, icon: "🐛" },
      { name: "Cybersecurity Fundamentals", level: 90, icon: "🛡️" },
      { name: "Network Security", level: 85, icon: "🌐" },
      { name: "Vulnerability Assessment", level: 80, icon: "🎯" },
      { name: "Penetration Testing", level: 75, icon: "🔒" },
      { name: "Kali Linux & Tools", level: 85, icon: "💻" },
      { name: "MS Office Suite", level: 90, icon: "📊" },
      { name: "Basic Accounting", level: 85, icon: "💰" },
      { name: "GitHub & Deployment", level: 80, icon: "📁" }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-red-600 rounded-full filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-5 animate-pulse delay-2000"></div>
      </div>

      {/* Custom Cursor */}
      <div 
        className="fixed w-6 h-6 pointer-events-none z-50 transition-transform duration-100 ease-out hidden md:block"
        style={{ transform: `translate(${mousePosition.x - 12}px, ${mousePosition.y - 12}px)` }}
      >
        <div className="w-full h-full rounded-full border-2 border-purple-500 animate-pulse"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Shield size={24} className="text-purple-500" />
            <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-red-400 bg-clip-text text-transparent">
              Dhiraj Shahi
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={exportToJSON}
              className="px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition text-white flex items-center gap-1 text-sm"
            >
              <FileJson size={14} /> Export JSON
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition text-white flex items-center gap-1 text-sm"
            >
              <X size={14} /> Close
            </button>
          </div>
        </div>
      </nav>

      {/* Portfolio Content */}
      <div className="relative z-10 pt-16 pb-12">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* Hero Section */}
          <div className="text-center mb-10">
            <div className="relative inline-block mb-4">
              <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-purple-700 to-red-700 flex items-center justify-center text-5xl font-bold text-white shadow-2xl border-4 border-purple-500/30">
                D
              </div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-purple-400 via-red-400 to-purple-400 bg-clip-text text-transparent">
              {portfolioData.name}
            </h1>
            
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <span className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-300 text-xs font-medium">🐛 Ethical Hacker</span>
              <span className="px-3 py-1 bg-red-500/20 rounded-full text-red-300 text-xs font-medium">🛡️ Security Analyst</span>
              <span className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-300 text-xs font-medium">💻 Developer</span>
            </div>
            
            <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
              {portfolioData.bio}
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
              <div className="text-2xl font-bold text-purple-400">3+</div>
              <div className="text-gray-400 text-xs">Certifications</div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
              <div className="text-2xl font-bold text-red-400">10+</div>
              <div className="text-gray-400 text-xs">Skills</div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
              <div className="text-2xl font-bold text-blue-400">4+</div>
              <div className="text-gray-400 text-xs">Projects</div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
              <div className="text-2xl font-bold text-green-400">500+</div>
              <div className="text-gray-400 text-xs">Hours</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-6 border-b border-white/10 pb-3">
            {[
              { id: "about", label: "About", icon: "👤" },
              { id: "skills", label: "Skills", icon: "⚡" },
              { id: "experience", label: "Experience", icon: "💼" },
              { id: "certificates", label: "Certificates", icon: "🏆" },
              { id: "contact", label: "Contact", icon: "📞" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1 ${
                  activeTab === tab.id 
                    ? "bg-gradient-to-r from-purple-600 to-red-600 text-white shadow-lg" 
                    : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div>
            {/* About Tab */}
            {activeTab === "about" && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Who Am I?</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{portfolioData.bio}</p>
                  <div className="pt-3">
                    <h3 className="text-lg font-semibold text-white mb-2">What I Do</h3>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-300 text-sm">🔒 Vulnerability Assessment</div>
                      <div className="flex items-center gap-2 text-gray-300 text-sm">🐛 Ethical Hacking</div>
                      <div className="flex items-center gap-2 text-gray-300 text-sm">🌐 Network Security</div>
                      <div className="flex items-center gap-2 text-gray-300 text-sm">💻 Web Development</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-3">Quick Facts</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-300 text-sm">📍 {portfolioData.location}</div>
                    <div className="flex items-center gap-2 text-gray-300 text-sm">📧 {portfolioData.email}</div>
                    <div className="flex items-center gap-2 text-gray-300 text-sm">📞 {portfolioData.phone}</div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10">
                    <h3 className="text-md font-semibold text-white mb-2">Connect</h3>
                    <div className="flex gap-2">
                      <a href={portfolioData.social.facebook} target="_blank" className="p-1.5 bg-white/10 rounded-lg hover:bg-blue-600 transition">📘</a>
                      <a href={portfolioData.social.github} target="_blank" className="p-1.5 bg-white/10 rounded-lg hover:bg-gray-600 transition">🐙</a>
                      <a href={portfolioData.social.linkedin} target="_blank" className="p-1.5 bg-white/10 rounded-lg hover:bg-blue-700 transition">🔗</a>
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
                      <span className="flex items-center gap-1 text-white text-sm">{skill.icon} {skill.name}</span>
                      <span className="text-purple-400 text-xs">{skill.level}%</span>
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
                    <h3 className="text-md font-semibold text-white">{exp.title}</h3>
                    <p className="text-purple-400 text-xs mb-1">{exp.company} • {exp.period}</p>
                    <p className="text-gray-400 text-xs">{exp.desc}</p>
                  </div>
                ))}
                <div className="bg-white/5 rounded-xl p-4 border-l-4 border-blue-500">
                  <h3 className="text-md font-semibold text-white mb-2">Education</h3>
                  {portfolioData.education.map((edu, idx) => (
                    <div key={idx} className="mb-2">
                      <p className="text-white text-sm">{edu.degree}</p>
                      <p className="text-gray-400 text-xs">{edu.institution} • {edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certificates Tab */}
            {activeTab === "certificates" && (
              <div className="grid md:grid-cols-2 gap-3">
                {portfolioData.certificates.map((cert, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-purple-900/20 to-red-900/20 rounded-xl p-3 border border-purple-500/30">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">🏆</span>
                      <div>
                        <h4 className="font-bold text-white text-sm">{cert.name}</h4>
                        <p className="text-gray-400 text-xs">{cert.issuer}</p>
                      </div>
                    </div>
                    <p className="text-gray-500 text-xs">Issued: {cert.date}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === "contact" && (
              <div className="bg-white/5 rounded-xl p-6 text-center max-w-lg mx-auto">
                <span className="text-5xl mb-3 block">📧</span>
                <h3 className="text-xl font-bold text-white mb-2">Get In Touch</h3>
                <p className="text-gray-400 text-sm mb-4">Open to opportunities and collaborations!</p>
                <div className="space-y-2 text-left max-w-xs mx-auto">
                  <div className="flex items-center gap-2 text-gray-300 text-sm">📧 {portfolioData.email}</div>
                  <div className="flex items-center gap-2 text-gray-300 text-sm">📞 {portfolioData.phone}</div>
                  <div className="flex items-center gap-2 text-gray-300 text-sm">📍 {portfolioData.location}</div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-8 pt-4 text-center border-t border-white/10">
            <p className="text-gray-500 text-xs">© 2024 Dhiraj Shahi - Cybersecurity Enthusiast</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Portfolio;
