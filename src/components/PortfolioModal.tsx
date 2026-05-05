import { useState, useEffect } from "react";
import { X, Mail, Phone, MapPin, Github, Linkedin, Facebook, Award, Briefcase, GraduationCap, Code, Shield, FileText, ExternalLink, Download, Zap, Target, Sparkles } from "lucide-react";

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PortfolioModal = ({ isOpen, onClose }: PortfolioModalProps) => {
  const [showContent, setShowContent] = useState(false);
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowContent(true), 100);
    } else {
      setShowContent(false);
      setActiveTab("about");
    }
  }, [isOpen]);

  if (!isOpen) return null;

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
      { name: "Ethical Hacking", level: 85, category: "cyber" },
      { name: "Cybersecurity Fundamentals", level: 90, category: "cyber" },
      { name: "Network Security", level: 85, category: "cyber" },
      { name: "Vulnerability Assessment", level: 80, category: "cyber" },
      { name: "Basic Penetration Testing", level: 75, category: "cyber" },
      { name: "Kali Linux & Security Tools", level: 85, category: "cyber" },
      { name: "Web Security (Basic)", level: 70, category: "cyber" },
      { name: "MS Word, Excel, PowerPoint", level: 90, category: "office" },
      { name: "Basic Accounting & Bookkeeping", level: 85, category: "office" },
      { name: "Website Handling / GitHub", level: 80, category: "web" },
      { name: "Problem Solving & Analytical Thinking", level: 88, category: "soft" }
    ],
    experience: [
      { 
        title: "Loksewa Preparation Website", 
        company: "Personal Project",
        period: "2024 - Present", 
        description: "Built and managed a website for Loksewa exam preparation, adding questions and content manually. Worked on structuring content, basic UI, and deployment using platforms like GitHub Pages/Vercel.",
        icon: "🌐"
      },
      { 
        title: "Cybersecurity & Ethical Hacking Training", 
        company: "Training Program",
        period: "2024 - 2025", 
        description: "Completed training covering network security, reconnaissance, vulnerability assessment, and basic penetration testing concepts with exposure to tools like Kali Linux.",
        icon: "🔒"
      },
      { 
        title: "Basic Website Deployment & Version Control", 
        company: "Self-Learning",
        period: "2024 - Present", 
        description: "Used GitHub to upload, manage, and deploy web projects. Learned basic version control and project updates.",
        icon: "💻"
      },
      { 
        title: "MS Office & Accounting Practice", 
        company: "Skill Development",
        period: "2023 - Present", 
        description: "Created documents, presentations, and spreadsheets; practiced bookkeeping, ledger entries, and basic financial record handling.",
        icon: "📊"
      }
    ],
    education: [
      { degree: "Certified Cybersecurity Educator Professional (CCEP)", institution: "Mastermind Assurance", year: "January 8, 2026", icon: "🎓" },
      { degree: "Certified Red Team Analyst (CRTA)", institution: "Red Team Leaders", year: "April 16, 2025", icon: "🔴" },
      { degree: "ISO/IEC 27001:2022 Lead Auditor", institution: "Mastermind Assurance", year: "2025", icon: "📜" },
      { degree: "Q/A Training", institution: "22 Hours Training Program", year: "2025", icon: "✅" }
    ],
    certificates: [
      { name: "Certified Cybersecurity Educator Professional (CCEP)", issuer: "Mastermind Assurance", date: "January 8, 2026", icon: "🎓" },
      { name: "Certified Red Team Analyst (CRTA)", issuer: "Red Team Leaders", date: "April 16, 2025", icon: "🔴" },
      { name: "ISO/IEC 27001:2022 Lead Auditor", issuer: "Mastermind Assurance", date: "2025", icon: "📜" }
    ]
  };

  const getSkillColor = (category: string) => {
    switch(category) {
      case 'cyber': return 'from-red-600 to-purple-600';
      case 'office': return 'from-blue-600 to-cyan-600';
      case 'web': return 'from-green-600 to-emerald-600';
      default: return 'from-gray-600 to-gray-500';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Black Background with Animation */}
      <div className="fixed inset-0 bg-black/98 backdrop-blur-md animate-fade-in" onClick={onClose}></div>
      
      {/* Animated Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-red-600 rounded-full filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-5 animate-pulse delay-2000"></div>
      </div>
      
      {/* Modal Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div 
          className={`relative w-full max-w-5xl bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-white/10 transition-all duration-700 transform ${
            showContent ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 text-white group"
          >
            <X size={22} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Header with Glowing Border */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-red-600 to-purple-600 animate-gradient-x"></div>
            <div className="relative bg-gradient-to-r from-gray-900/95 to-black/95 backdrop-blur p-8 text-center">
              <div className="animate-slide-down">
                {/* Profile Circle with Glow */}
                <div className="relative inline-block">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-red-600 animate-pulse-slow"></div>
                  <div className="relative w-28 h-28 mx-auto rounded-full border-4 border-white/20 bg-gradient-to-br from-purple-700 to-red-700 flex items-center justify-center text-4xl font-bold text-white shadow-2xl">
                    डी
                  </div>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-2 animate-slide-up bg-gradient-to-r from-purple-400 via-red-400 to-purple-400 bg-clip-text text-transparent">
                  {portfolioData.name}
                </h1>
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-1.5 mb-3 animate-fade-in">
                  <Shield size={16} className="text-red-400" />
                  <p className="text-red-300 font-medium text-sm">{portfolioData.title}</p>
                </div>
                
                {/* Quick Stats */}
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                  <div className="flex items-center gap-1 bg-white/5 rounded-full px-3 py-1 text-xs text-gray-300">
                    <Zap size={12} className="text-yellow-400" /> Ethical Hacker
                  </div>
                  <div className="flex items-center gap-1 bg-white/5 rounded-full px-3 py-1 text-xs text-gray-300">
                    <Target size={12} className="text-red-400" /> Security Analyst
                  </div>
                  <div className="flex items-center gap-1 bg-white/5 rounded-full px-3 py-1 text-xs text-gray-300">
                    <Code size={12} className="text-blue-400" /> Developer
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-white/10 px-6 pt-4">
            {[
              { id: "about", label: "📖 About", icon: "👤" },
              { id: "skills", label: "⚡ Skills", icon: "💪" },
              { id: "experience", label: "💼 Experience", icon: "🚀" },
              { id: "certificates", label: "🏆 Certificates", icon: "🎓" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 border-b-2 ${
                  activeTab === tab.id 
                    ? "border-purple-500 text-purple-400" 
                    : "border-transparent text-gray-400 hover:text-gray-200"
                }`}
              >
                <span className="mr-1">{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
            
            {/* About Tab */}
            {activeTab === "about" && (
              <div className="animate-fade-in">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                        <span className="w-6 h-0.5 bg-purple-500"></span>
                        Who Am I?
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-sm">{portfolioData.bio}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                        <span className="w-6 h-0.5 bg-purple-500"></span>
                        Contact Information
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-3 text-gray-300">
                          <Mail size={16} className="text-purple-400" />
                          <a href={`mailto:${portfolioData.email}`} className="hover:text-purple-400 transition">{portfolioData.email}</a>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300">
                          <Phone size={16} className="text-purple-400" />
                          <a href={`tel:${portfolioData.phone}`} className="hover:text-purple-400 transition">{portfolioData.phone}</a>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300">
                          <MapPin size={16} className="text-purple-400" />
                          <span>{portfolioData.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Sparkles size={16} className="text-yellow-400" />
                      Connect with Me
                    </h3>
                    <div className="space-y-3">
                      <a href={portfolioData.social.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition p-2 rounded-lg hover:bg-white/5 w-full">
                        <Facebook size={18} /> Facebook
                        <ExternalLink size={12} className="ml-auto" />
                      </a>
                      <a href={portfolioData.social.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-gray-400 transition p-2 rounded-lg hover:bg-white/5 w-full">
                        <Github size={18} /> GitHub
                        <ExternalLink size={12} className="ml-auto" />
                      </a>
                      <a href={portfolioData.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-blue-500 transition p-2 rounded-lg hover:bg-white/5 w-full">
                        <Linkedin size={18} /> LinkedIn
                        <ExternalLink size={12} className="ml-auto" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === "skills" && (
              <div className="animate-fade-in">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-md font-semibold text-purple-400 mb-3 flex items-center gap-2">
                      <Shield size={14} /> Cybersecurity & Technical
                    </h3>
                    <div className="space-y-3">
                      {portfolioData.skills.filter(s => s.category === 'cyber').map((skill, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between text-xs text-gray-300 mb-1">
                            <span>{skill.name}</span>
                            <span>{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-red-500 to-purple-500 rounded-full transition-all duration-1000"
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-md font-semibold text-blue-400 mb-3 flex items-center gap-2">
                      <Briefcase size={14} /> Professional & Soft Skills
                    </h3>
                    <div className="space-y-3">
                      {portfolioData.skills.filter(s => s.category !== 'cyber').map((skill, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between text-xs text-gray-300 mb-1">
                            <span>{skill.name}</span>
                            <span>{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${getSkillColor(skill.category)} rounded-full transition-all duration-1000`}
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Experience Tab */}
            {activeTab === "experience" && (
              <div className="animate-fade-in">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-md font-semibold text-purple-400 mb-3 flex items-center gap-2">
                      <Briefcase size={14} /> Projects & Experience
                    </h3>
                    <div className="space-y-3">
                      {portfolioData.experience.map((exp, idx) => (
                        <div key={idx} className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-300 border-l-2 border-purple-500">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">{exp.icon}</span>
                            <h4 className="font-semibold text-white text-sm">{exp.title}</h4>
                          </div>
                          <p className="text-purple-400 text-xs">{exp.company} • {exp.period}</p>
                          <p className="text-gray-400 text-xs mt-1">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-md font-semibold text-purple-400 mb-3 flex items-center gap-2">
                      <GraduationCap size={14} /> Education & Training
                    </h3>
                    <div className="space-y-3">
                      {portfolioData.education.map((edu, idx) => (
                        <div key={idx} className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-300">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">{edu.icon}</span>
                            <h4 className="font-semibold text-white text-sm">{edu.degree}</h4>
                          </div>
                          <p className="text-gray-400 text-xs">{edu.institution} • {edu.year}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Certificates Tab */}
            {activeTab === "certificates" && (
              <div className="animate-fade-in">
                <div className="grid md:grid-cols-2 gap-4">
                  {portfolioData.certificates.map((cert, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-purple-900/30 to-red-900/30 rounded-xl p-4 border border-purple-500/30 hover:scale-105 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-xl">
                          {cert.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm">{cert.name}</h4>
                          <p className="text-purple-300 text-xs">{cert.issuer}</p>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs mt-2">Issued: {cert.date}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <FileText size={12} className="text-green-400" />
                        <span className="text-green-400 text-xs">Certificate Available</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Extra Training */}
                <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-yellow-400" />
                    <span className="text-white text-sm font-medium">Additional Training</span>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">✅ Q/A Training - 22 Hours Certification Program</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-white/10 text-center">
            <p className="text-gray-500 text-xs">🚀 "Security is not a product, but a process." - Bruce Schneier</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient-x {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
        .animate-slide-down { animation: slide-down 0.5s ease-out; }
        .animate-slide-up { animation: slide-up 0.5s ease-out; }
        .animate-gradient-x { animation: gradient-x 3s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #1f1f1f; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #purple; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default PortfolioModal;
