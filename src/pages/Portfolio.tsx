import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  X, Mail, Phone, MapPin, Github, Linkedin, Facebook, Award, 
  Briefcase, GraduationCap, Code, Shield, FileText, ExternalLink, 
  Download, Zap, Target, Sparkles, Eye, Heart, Star, Terminal,
  Cpu, Lock, Server, Wifi, Bug, Key, Globe, User, Printer,
  Save, FileJson
} from "lucide-react";

const Portfolio = () => {
  const navigate = useNavigate();
  const portfolioRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("about");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isExporting, setIsExporting] = useState(false);

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
    website: "https://github.com/hackerizzzboi",
    social: {
      facebook: "https://www.facebook.com/dhirupiru69",
      github: "https://github.com/hackerizzzboi",
      linkedin: "https://www.linkedin.com/in/dhiraj-shahi-a121693a2/"
    },
    skills: [
      { name: "Ethical Hacking", level: 85, icon: <Bug size={14} /> },
      { name: "Cybersecurity Fundamentals", level: 90, icon: <Shield size={14} /> },
      { name: "Network Security", level: 85, icon: <Server size={14} /> },
      { name: "Vulnerability Assessment", level: 80, icon: <Target size={14} /> },
      { name: "Penetration Testing", level: 75, icon: <Lock size={14} /> },
      { name: "Kali Linux & Tools", level: 85, icon: <Terminal size={14} /> },
      { name: "MS Office Suite", level: 90, icon: <FileText size={14} /> },
      { name: "Basic Accounting", level: 85, icon: <Briefcase size={14} /> },
      { name: "GitHub & Deployment", level: 80, icon: <Code size={14} /> }
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

  const exportToPDF = async () => {
    if (!portfolioRef.current) return;
    
    setIsExporting(true);
    
    try {
      // Dynamically import html2pdf
      const html2pdf = (await import('html2pdf.js')).default;
      
      const element = portfolioRef.current;
      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `${portfolioData.name.replace(/\s/g, '_')}_Portfolio.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      };
      
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const exportToJSON = () => {
    const data = {
      ...portfolioData,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${portfolioData.name.replace(/\s/g, '_')}_Portfolio.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Animated Background Matrix Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      </div>

      {/* Custom Cursor */}
      <div 
        className="fixed w-8 h-8 pointer-events-none z-50 transition-transform duration-100 ease-out hidden md:block"
        style={{ 
          transform: `translate(${mousePosition.x - 16}px, ${mousePosition.y - 16}px)`,
        }}
      >
        <div className="w-full h-full rounded-full border-2 border-purple-500 animate-pulse"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Shield size={28} className="text-purple-500 animate-pulse" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-red-400 bg-clip-text text-transparent">
              Dhiraj Shahi
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={exportToPDF}
              disabled={isExporting}
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-all duration-300 text-white flex items-center gap-2 shadow-lg"
            >
              <Download size={16} /> {isExporting ? "Exporting..." : "Save as PDF"}
            </button>
            <button
              onClick={exportToJSON}
              className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all duration-300 text-white flex items-center gap-2"
            >
              <FileJson size={16} /> Export JSON
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 text-white flex items-center gap-2"
            >
              <X size={18} /> Close
            </button>
          </div>
        </div>
      </nav>

      {/* Portfolio Content for PDF Export */}
      <div ref={portfolioRef} className="relative z-10 pt-20 pb-12">
        <div className="container mx-auto px-6 max-w-6xl">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-red-600 animate-pulse-slow"></div>
              <div className="relative w-36 h-36 mx-auto rounded-full border-4 border-purple-500/30 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-purple-700 to-red-700 flex items-center justify-center">
                  <User size={56} className="text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-red-400 to-purple-400 bg-clip-text text-transparent">
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
            </div>
            
            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              {portfolioData.bio}
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
              <div className="text-3xl font-bold text-purple-400">3+</div>
              <div className="text-gray-400 text-sm">Certifications</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
              <div className="text-3xl font-bold text-red-400">10+</div>
              <div className="text-gray-400 text-sm">Skills</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
              <div className="text-3xl font-bold text-blue-400">4+</div>
              <div className="text-gray-400 text-sm">Projects</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
              <div className="text-3xl font-bold text-green-400">500+</div>
              <div className="text-gray-400 text-sm">Hours Learned</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8 border-b border-white/10 pb-4">
            {[
              { id: "about", label: "📖 About", icon: <User size={16} /> },
              { id: "skills", label: "⚡ Skills", icon: <Zap size={16} /> },
              { id: "experience", label: "💼 Experience", icon: <Briefcase size={16} /> },
              { id: "certificates", label: "🏆 Certificates", icon: <Award size={16} /> },
              { id: "contact", label: "📞 Contact", icon: <Mail size={16} /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
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
          <div className="animate-fade-in">
            
            {/* About Tab */}
            {activeTab === "about" && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Heart size={20} className="text-red-400" /> Who Am I?
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{portfolioData.bio}</p>
                  
                  <div className="pt-4">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-3">
                      <Star size={20} className="text-yellow-400" /> What I Do
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-300"><Lock size={14} className="text-green-400" /> Vulnerability Assessment</div>
                      <div className="flex items-center gap-2 text-gray-300"><Bug size={14} className="text-red-400" /> Ethical Hacking</div>
                      <div className="flex items-center gap-2 text-gray-300"><Server size={14} className="text-blue-400" /> Network Security</div>
                      <div className="flex items-center gap-2 text-gray-300"><Code size={14} className="text-purple-400" /> Web Development</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
                    <Eye size={20} className="text-purple-400" /> Quick Facts
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-300">
                      <MapPin size={16} className="text-purple-400" />
                      <span>{portfolioData.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Mail size={16} className="text-purple-400" />
                      <a href={`mailto:${portfolioData.email}`} className="hover:text-purple-400 transition">{portfolioData.email}</a>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Phone size={16} className="text-purple-400" />
                      <a href={`tel:${portfolioData.phone}`} className="hover:text-purple-400 transition">{portfolioData.phone}</a>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <h3 className="text-md font-semibold text-white mb-3">Connect with me</h3>
                    <div className="flex gap-4">
                      <a href={portfolioData.social.facebook} target="_blank" className="p-2 bg-white/10 rounded-lg hover:bg-blue-600 transition-all"><Facebook size={20} /></a>
                      <a href={portfolioData.social.github} target="_blank" className="p-2 bg-white/10 rounded-lg hover:bg-gray-600 transition-all"><Github size={20} /></a>
                      <a href={portfolioData.social.linkedin} target="_blank" className="p-2 bg-white/10 rounded-lg hover:bg-blue-700 transition-all"><Linkedin size={20} /></a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === "skills" && (
              <div className="grid md:grid-cols-2 gap-6">
                {portfolioData.skills.map((skill, idx) => (
                  <div key={idx} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{skill.icon}</span>
                        <span className="text-white font-medium">{skill.name}</span>
                      </div>
                      <span className="text-purple-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-red-500 rounded-full transition-all duration-1000"
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
                  <div key={idx} className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-all duration-300 border-l-4 border-purple-500">
                    <h3 className="text-lg font-semibold text-white">{exp.title}</h3>
                    <p className="text-purple-400 text-sm mb-2">{exp.company} • {exp.period}</p>
                    <p className="text-gray-400 text-sm">{exp.desc}</p>
                  </div>
                ))}
                <div className="bg-white/5 rounded-xl p-5 border-l-4 border-blue-500">
                  <h3 className="text-lg font-semibold text-white">Education</h3>
                  {portfolioData.education.map((edu, idx) => (
                    <div key={idx} className="mt-2">
                      <p className="text-white text-sm">{edu.degree}</p>
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
                  <div key={idx} className="bg-gradient-to-br from-purple-900/20 to-red-900/20 rounded-xl p-4 border border-purple-500/30 hover:scale-105 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <Award size={24} className="text-purple-400" />
                      <div>
                        <h4 className="font-bold text-white">{cert.name}</h4>
                        <p className="text-gray-400 text-xs">{cert.issuer}</p>
                      </div>
                    </div>
                    <p className="text-gray-500 text-xs mt-2">Issued: {cert.date}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === "contact" && (
              <div className="bg-white/5 rounded-xl p-8 text-center max-w-2xl mx-auto">
                <Mail size={48} className="text-purple-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Get In Touch</h3>
                <p className="text-gray-400 mb-6">I'm always open to new opportunities and collaborations!</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-3 text-gray-300">
                    <Mail size={18} className="text-purple-400" />
                    <a href={`mailto:${portfolioData.email}`} className="hover:text-purple-400 transition">{portfolioData.email}</a>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-gray-300">
                    <Phone size={18} className="text-purple-400" />
                    <a href={`tel:${portfolioData.phone}`} className="hover:text-purple-400 transition">{portfolioData.phone}</a>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-gray-300">
                    <MapPin size={18} className="text-purple-400" />
                    <span>{portfolioData.location}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-12 pt-6 text-center border-t border-white/10">
            <p className="text-gray-500 text-sm">© 2024 Dhiraj Shahi - Cybersecurity Enthusiast</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-slide-down { animation: slide-down 0.6s ease-out; }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
        .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
        .animate-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }
      `}</style>
    </div>
  );
};

export default Portfolio;
