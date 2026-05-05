import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  X, Mail, Phone, MapPin, Github, Linkedin, Facebook, Award, 
  Briefcase, GraduationCap, Code, Shield, FileText, 
  Download, Zap, Target, Eye, Heart, Star, User,
  CheckCircle, Calendar, Clock, Trophy, Sparkles, Rocket
} from "lucide-react";

const Portfolio = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("about");
  const [isLoading, setIsLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
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
      { name: "Ethical Hacking", level: 85, icon: "🔒" },
      { name: "Cybersecurity Fundamentals", level: 90, icon: "🛡️" },
      { name: "Network Security", level: 85, icon: "🌐" },
      { name: "Vulnerability Assessment", level: 80, icon: "🎯" },
      { name: "Basic Penetration Testing", level: 75, icon: "⚔️" },
      { name: "Kali Linux & Security Tools", level: 85, icon: "💻" },
      { name: "MS Word, Excel, PowerPoint", level: 90, icon: "📊" },
      { name: "Basic Accounting & Bookkeeping", level: 85, icon: "💰" },
      { name: "Website Handling / GitHub", level: 80, icon: "🌐" },
      { name: "Problem Solving & Analytical Thinking", level: 88, icon: "🧠" }
    ],
    experience: [
      { title: "Loksewa Preparation Website", company: "Personal Project", period: "2024 - Present", desc: "Built and managed a website for Loksewa exam preparation, adding questions and content manually. Deployed using Vercel/GitHub Pages." },
      { title: "Cybersecurity & Ethical Hacking Training", company: "Training Program", period: "2024 - 2025", desc: "Completed training covering network security, reconnaissance, vulnerability assessment, and penetration testing with Kali Linux." },
      { title: "Basic Website Deployment & Version Control", company: "Self-Learning", period: "2024 - Present", desc: "Used GitHub to upload, manage, and deploy web projects. Learned version control basics." },
      { title: "MS Office & Accounting Practice", company: "Skill Development", period: "2023 - Present", desc: "Created documents, presentations, and spreadsheets; practiced bookkeeping and basic financial record handling." }
    ],
    education: [
      { degree: "Certified Cybersecurity Educator Professional (CCEP)", institution: "Mastermind Assurance", year: "2026" },
      { degree: "Certified Red Team Analyst (CRTA)", institution: "Red Team Leaders", year: "2025" },
      { degree: "ISO/IEC 27001:2022 Lead Auditor", institution: "Mastermind Assurance", year: "2025" },
      { degree: "Q/A Training", institution: "22 Hours Training Program", year: "2025" }
    ],
    certificates: [
      { name: "Certified Cybersecurity Educator Professional (CCEP)", issuer: "Mastermind Assurance", date: "January 8, 2026" },
      { name: "Certified Red Team Analyst (CRTA)", issuer: "Red Team Leaders", date: "April 16, 2025" },
      { name: "ISO/IEC 27001:2022 Lead Auditor", issuer: "Mastermind Assurance", date: "2025" },
      { name: "Q/A Training Certification", issuer: "22 Hours Program", date: "2025" }
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
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 to-slate-800 z-50 flex flex-col items-center justify-center">
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-ping opacity-75"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center animate-pulse">
              <Shield size={32} className="text-white" />
            </div>
          </div>
        </div>
        <h2 className="text-white text-xl font-semibold mb-2">Loading Portfolio</h2>
        <div className="w-48 h-1 bg-gray-700 rounded-full overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 animate-loading-bar"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-2' : 'bg-white/80 backdrop-blur-md py-4'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <Shield size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">{portfolioData.name}</span>
          </div>
          <div className="hidden md:flex gap-1">
            {["about", "skills", "experience", "education", "certificates", "contact"].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={exportToJSON} className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium flex items-center gap-2 hover:shadow-lg transition">
              <Download size={16} /> Export CV
            </button>
            <button onClick={() => navigate(-1)} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 text-sm font-medium flex items-center gap-2 hover:bg-gray-300 transition">
              <X size={16} /> Close
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-xl">
                <User size={48} className="text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center border-2 border-white">
                <CheckCircle size={16} className="text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-3">{portfolioData.name}</h1>
            <p className="text-lg text-blue-600 mb-4">{portfolioData.title}</p>
            
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">🔒 Ethical Hacker</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">🛡️ Security Analyst</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">💻 Developer</span>
            </div>
            
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {portfolioData.bio}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white rounded-xl p-4 text-center shadow-md hover:shadow-lg transition">
              <div className="text-2xl font-bold text-blue-600">4+</div>
              <div className="text-gray-500 text-sm">Certifications</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-md hover:shadow-lg transition">
              <div className="text-2xl font-bold text-purple-600">10+</div>
              <div className="text-gray-500 text-sm">Skills</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-md hover:shadow-lg transition">
              <div className="text-2xl font-bold text-green-600">4+</div>
              <div className="text-gray-500 text-sm">Projects</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-md hover:shadow-lg transition">
              <div className="text-2xl font-bold text-orange-600">500+</div>
              <div className="text-gray-500 text-sm">Hours</div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            
            {/* About */}
            {activeTab === "about" && (
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Heart size={20} className="text-red-500" /> About Me
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{portfolioData.bio}</p>
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-700 mb-2">Core Competencies:</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-gray-100 rounded text-sm">Vulnerability Assessment</span>
                      <span className="px-2 py-1 bg-gray-100 rounded text-sm">Ethical Hacking</span>
                      <span className="px-2 py-1 bg-gray-100 rounded text-sm">Network Security</span>
                      <span className="px-2 py-1 bg-gray-100 rounded text-sm">Web Development</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Eye size={20} className="text-blue-500" /> Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-600">
                      <MapPin size={18} className="text-blue-500" /> {portfolioData.location}
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Mail size={18} className="text-blue-500" /> {portfolioData.email}
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Phone size={18} className="text-blue-500" /> {portfolioData.phone}
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-700 mb-2">Connect with me:</h4>
                    <div className="flex gap-3">
                      <a href={portfolioData.social.facebook} target="_blank" className="p-2 bg-gray-100 rounded-lg hover:bg-blue-500 hover:text-white transition">📘</a>
                      <a href={portfolioData.social.github} target="_blank" className="p-2 bg-gray-100 rounded-lg hover:bg-gray-800 hover:text-white transition">🐙</a>
                      <a href={portfolioData.social.linkedin} target="_blank" className="p-2 bg-gray-100 rounded-lg hover:bg-blue-700 hover:text-white transition">🔗</a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Skills */}
            {activeTab === "skills" && (
              <div className="grid md:grid-cols-2 gap-4">
                {portfolioData.skills.map((skill, idx) => (
                  <div key={idx} className="group">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 font-medium flex items-center gap-2">
                        <span className="text-lg">{skill.icon}</span> {skill.name}
                      </span>
                      <span className="text-blue-600 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 group-hover:shadow-lg"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Experience */}
            {activeTab === "experience" && (
              <div className="space-y-4">
                {portfolioData.experience.map((exp, idx) => (
                  <div key={idx} className="border-l-4 border-blue-500 pl-4 py-2 hover:bg-gray-50 rounded-r-lg transition">
                    <h3 className="text-lg font-semibold text-gray-800">{exp.title}</h3>
                    <p className="text-blue-600 text-sm mb-1">{exp.company} • {exp.period}</p>
                    <p className="text-gray-600 text-sm">{exp.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {activeTab === "education" && (
              <div className="space-y-4">
                {portfolioData.education.map((edu, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <GraduationCap size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                      <p className="text-gray-500 text-sm">{edu.institution}</p>
                      <p className="text-blue-600 text-xs">{edu.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Certificates */}
            {activeTab === "certificates" && (
              <div className="grid md:grid-cols-2 gap-4">
                {portfolioData.certificates.map((cert, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                    <div className="text-2xl">🏆</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{cert.name}</h4>
                      <p className="text-gray-500 text-sm">{cert.issuer}</p>
                      <p className="text-gray-400 text-xs mt-1">{cert.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Contact */}
            {activeTab === "contact" && (
              <div className="text-center py-8">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                  <Mail size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Get In Touch</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">I'm open to opportunities, collaborations, and security consulting.</p>
                <div className="space-y-2 text-center">
                  <p className="text-gray-600">📧 {portfolioData.email}</p>
                  <p className="text-gray-600">📞 {portfolioData.phone}</p>
                  <p className="text-gray-600">📍 {portfolioData.location}</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">© 2024 Dhiraj Shahi • Cybersecurity Professional</p>
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
