import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  X, Mail, Phone, MapPin, Github, Linkedin, Facebook, Award, 
  Briefcase, GraduationCap, Code, Shield, FileText, 
  Download, Zap, Target, Eye, Heart, Star, User,
  CheckCircle, Calendar, Clock, Trophy, Sparkles, Rocket,
  TrendingUp, Activity, Globe, Cpu, Lock, Server, Bug
} from "lucide-react";

const Portfolio = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("about");
  const [isLoading, setIsLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const [typedText, setTypedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [particles, setParticles] = useState<Array<{x: number, y: number, size: number, speed: number}>>([]);

  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const fullText = "Dhiraj Shahi";

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
    }, 100);
    return () => clearInterval(typing);
  }, []);

  // Blinking cursor
  useEffect(() => {
    const blink = setInterval(() => setCursorVisible(prev => !prev), 500);
    return () => clearInterval(blink);
  }, []);

  // Time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Reveal cards on scroll
      cardsRef.current.forEach((card, index) => {
        if (card) {
          const rect = card.getBoundingClientRect();
          if (rect.top < window.innerHeight - 100) {
            setVisibleCards(prev => [...new Set([...prev, index])]);
          }
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse move for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
      if (heroRef.current) {
        heroRef.current.style.transform = `translate(${(e.clientX - window.innerWidth / 2) * 0.02}px, ${(e.clientY - window.innerHeight / 2) * 0.02}px)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Particles
  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 100; i++) {
      newParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 2 + 0.5
      });
    }
    setParticles(newParticles);

    const animate = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        y: p.y - p.speed * 0.5,
        x: p.x + (Math.random() - 0.5) * 0.5
      })).filter(p => p.y > -50).concat(
        Array(5).fill(null).map(() => ({
          x: Math.random() * window.innerWidth,
          y: window.innerHeight + 50,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 2 + 0.5
        }))
      ));
    }, 50);
    return () => clearInterval(animate);
  }, []);

  // Loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
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
      { name: "Ethical Hacking", level: 85, icon: "🔒", color: "from-red-500 to-orange-500" },
      { name: "Cybersecurity Fundamentals", level: 90, icon: "🛡️", color: "from-blue-500 to-cyan-500" },
      { name: "Network Security", level: 85, icon: "🌐", color: "from-purple-500 to-pink-500" },
      { name: "Vulnerability Assessment", level: 80, icon: "🎯", color: "from-green-500 to-emerald-500" },
      { name: "Basic Penetration Testing", level: 75, icon: "⚔️", color: "from-yellow-500 to-orange-500" },
      { name: "Kali Linux & Security Tools", level: 85, icon: "💻", color: "from-gray-700 to-gray-500" },
      { name: "MS Word, Excel, PowerPoint", level: 90, icon: "📊", color: "from-blue-600 to-blue-400" },
      { name: "Basic Accounting & Bookkeeping", level: 85, icon: "💰", color: "from-emerald-500 to-teal-500" },
      { name: "Website Handling / GitHub", level: 80, icon: "🌐", color: "from-indigo-500 to-purple-500" },
      { name: "Problem Solving & Analytical Thinking", level: 88, icon: "🧠", color: "from-rose-500 to-pink-500" }
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
        {/* Animated circles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 animate-ping-slow" style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`
            }}></div>
          ))}
        </div>
        
        <div className="relative z-10 text-center">
          <div className="relative mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-ping opacity-75"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center animate-pulse">
                <Shield size={32} className="text-white" />
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2 animate-pulse">Loading Portfolio</h2>
          <div className="w-64 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 animate-loading-bar"></div>
          </div>
          <div className="flex justify-center gap-1 mt-4">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }}></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-x-hidden">
      {/* Animated Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle, i) => (
          <div key={i} className="absolute rounded-full bg-blue-400/20" style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size
          }}></div>
        ))}
      </div>

      {/* Floating Orbs */}
      <div className="fixed top-20 left-10 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl animate-float-slow"></div>
      <div className="fixed bottom-20 right-10 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl animate-float-slow" style={{ animationDelay: "2s" }}></div>
      <div className="fixed top-1/2 left-1/2 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl animate-float-slow" style={{ animationDelay: "4s" }}></div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-xl py-2' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center group-hover:scale-110 transition duration-300">
                <Shield size={20} className="text-white" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-105 transition">DHRX</span>
          </div>
          <div className="hidden md:flex gap-1">
            {["about", "skills", "experience", "education", "certificates", "contact"].map((tab, i) => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)} 
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  activeTab === tab 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button 
              onClick={exportToJSON} 
              className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium flex items-center gap-2 hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <Download size={16} /> Export CV
            </button>
            <button 
              onClick={() => navigate(-1)} 
              className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 text-sm font-medium flex items-center gap-2 hover:bg-gray-300 hover:scale-105 transition-all duration-300"
            >
              <X size={16} /> Close
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div ref={heroRef} className="container mx-auto px-4 text-center transition-transform duration-300">
          <div className="relative inline-block mb-6 group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 blur-2xl opacity-50 animate-pulse-slow"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-spin-slow opacity-30" style={{ width: '140px', height: '140px', left: '-10px', top: '-10px' }}></div>
            <div className="relative w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl group-hover:scale-110 transition duration-500 animate-float">
              <User size={48} className="text-white" />
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center border-2 border-white animate-bounce">
                <CheckCircle size={16} className="text-white" />
              </div>
            </div>
          </div>
          
          <div className="font-mono text-blue-600 text-sm mb-2 animate-pulse">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            SYSTEM ONLINE • {currentTime}
          </div>
          
          <div className="h-16 mb-3">
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
                {typedText}
              </span>
              <span className={`inline-block w-1 h-8 bg-blue-600 ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
            </h1>
          </div>
          
          <p className="text-xl text-gray-600 mb-5 animate-fade-up">{portfolioData.title}</p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {["🔒 Ethical Hacker", "🛡️ Security Analyst", "💻 Pen Tester", "🚀 Developer"].map((badge, i) => (
              <span 
                key={i} 
                className="px-4 py-2 bg-white rounded-full text-gray-700 text-sm shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 animate-float"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {badge}
              </span>
            ))}
          </div>
          
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-lg animate-fade-up">
            {portfolioData.bio}
          </p>
          
          <div className="mt-8 flex justify-center gap-4">
            <button 
              onClick={() => setActiveTab("contact")} 
              className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-2xl hover:scale-110 transition-all duration-300 animate-float group"
            >
              <span className="flex items-center gap-2">Hire Me <Rocket size={18} className="group-hover:translate-x-1 transition" /></span>
            </button>
            <button 
              onClick={exportToJSON} 
              className="px-8 py-3 rounded-full border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white hover:shadow-xl hover:scale-110 transition-all duration-300"
            >
              Download CV
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow cursor-pointer" onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}>
          <div className="w-6 h-10 border-2 border-blue-300 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-blue-500 rounded-full animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "4+", label: "Certifications", icon: <Trophy size={28} />, color: "from-yellow-500 to-orange-500" },
              { value: "10+", label: "Skills", icon: <Zap size={28} />, color: "from-blue-500 to-cyan-500" },
              { value: "4+", label: "Projects", icon: <Briefcase size={28} />, color: "from-green-500 to-emerald-500" },
              { value: "500+", label: "Hours", icon: <Clock size={28} />, color: "from-purple-500 to-pink-500" }
            ].map((stat, i) => (
              <div 
                key={i} 
                className="group relative bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                <div className={`text-${stat.color.split('-')[1]}-500 mb-3 group-hover:scale-110 transition duration-300`}>{stat.icon}</div>
                <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</div>
                <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content Section */}
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Tab Buttons - Animated */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {["about", "skills", "experience", "education", "certificates", "contact"].map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  activeTab === tab 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                    : 'bg-white text-gray-600 hover:shadow-md'
                } animate-fade-up`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Content Cards */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-scale-up">
            
            {/* About */}
            {activeTab === "about" && (
              <div className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4 animate-slide-right">
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                      <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                      About Me
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{portfolioData.bio}</p>
                    <div className="pt-2">
                      <h4 className="font-semibold text-gray-700 mb-3">Core Competencies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {["Vulnerability Assessment", "Ethical Hacking", "Network Security", "Web Development"].map((item, i) => (
                          <span key={i} className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full text-sm text-gray-700 hover:scale-105 transition-all duration-300">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 animate-slide-left">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Eye size={20} className="text-blue-500" /> Quick Info
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-600 p-2 bg-white rounded-lg hover:shadow-md transition">
                        <MapPin size={18} className="text-blue-500" /> {portfolioData.location}
                      </div>
                      <div className="flex items-center gap-3 text-gray-600 p-2 bg-white rounded-lg hover:shadow-md transition">
                        <Mail size={18} className="text-blue-500" /> {portfolioData.email}
                      </div>
                      <div className="flex items-center gap-3 text-gray-600 p-2 bg-white rounded-lg hover:shadow-md transition">
                        <Phone size={18} className="text-blue-500" /> {portfolioData.phone}
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-blue-200">
                      <h4 className="font-semibold text-gray-700 mb-2">Connect:</h4>
                      <div className="flex gap-3">
                        <a href={portfolioData.social.facebook} target="_blank" className="p-2 bg-white rounded-lg hover:bg-blue-500 hover:text-white transition-all hover:scale-110">📘</a>
                        <a href={portfolioData.social.github} target="_blank" className="p-2 bg-white rounded-lg hover:bg-gray-800 hover:text-white transition-all hover:scale-110">🐙</a>
                        <a href={portfolioData.social.linkedin} target="_blank" className="p-2 bg-white rounded-lg hover:bg-blue-700 hover:text-white transition-all hover:scale-110">🔗</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Skills */}
            {activeTab === "skills" && (
              <div className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-5">
                  {portfolioData.skills.map((skill, idx) => (
                    <div 
                      key={idx} 
                      ref={el => cardsRef.current[idx] = el}
                      className={`group transition-all duration-500 ${visibleCards.includes(idx) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                      style={{ transitionDelay: `${idx * 50}ms` }}
                      onMouseEnter={() => setHoveredSkill(idx)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700 font-medium flex items-center gap-2">
                          <span className="text-xl group-hover:animate-bounce">{skill.icon}</span> {skill.name}
                        </span>
                        <span className="text-blue-600 text-sm font-semibold">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ${hoveredSkill === idx ? 'shadow-lg' : ''}`}
                          style={{ width: `${hoveredSkill === idx ? Math.min(skill.level + 5, 100) : skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experience */}
            {activeTab === "experience" && (
              <div className="p-6 md:p-8">
                <div className="space-y-5">
                  {portfolioData.experience.map((exp, idx) => (
                    <div 
                      key={idx} 
                      className="group border-l-4 border-blue-500 pl-5 py-3 hover:bg-gradient-to-r hover:from-blue-50 to-transparent rounded-r-lg transition-all duration-300 hover:scale-[1.01] cursor-pointer"
                    >
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">{exp.title}</h3>
                      <p className="text-purple-600 text-sm mb-1 flex items-center gap-2">
                        <Briefcase size={14} /> {exp.company} • {exp.period}
                      </p>
                      <p className="text-gray-600 text-sm">{exp.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {activeTab === "education" && (
              <div className="p-6 md:p-8">
                <div className="space-y-4">
                  {portfolioData.education.map((edu, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 animate-pulse-slow">
                        <GraduationCap size={22} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg">{edu.degree}</h3>
                        <p className="text-gray-500">{edu.institution}</p>
                        <p className="text-blue-600 text-sm mt-1 flex items-center gap-1"><Calendar size={12} /> {edu.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certificates */}
            {activeTab === "certificates" && (
              <div className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-4">
                  {portfolioData.certificates.map((cert, idx) => (
                    <div 
                      key={idx} 
                      className="group p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-3xl group-hover:animate-bounce">🏆</div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{cert.name}</h4>
                          <p className="text-gray-500 text-sm">{cert.issuer}</p>
                          <p className="text-gray-400 text-xs mt-1 flex items-center gap-1"><Calendar size={10} /> {cert.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact */}
            {activeTab === "contact" && (
              <div className="p-6 md:p-8 text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-5 animate-bounce-slow">
                  <Mail size={36} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Let's Work Together</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">Ready to collaborate on security projects or development work</p>
                <div className="space-y-2 max-w-sm mx-auto">
                  <div className="flex items-center gap-2 text-gray-600 p-2 bg-gray-50 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 to-purple-50 transition">
                    <Mail size={16} className="text-blue-500" /> {portfolioData.email}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 p-2 bg-gray-50 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 to-purple-50 transition">
                    <Phone size={16} className="text-blue-500" /> {portfolioData.phone}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 p-2 bg-gray-50 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 to-purple-50 transition">
                    <MapPin size={16} className="text-blue-500" /> {portfolioData.location}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-gray-200 mt-8">
        <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
          <Shield size={14} className="text-blue-500" /> Secured by Dhiraj Shahi • Cybersecurity Professional • 2024
        </p>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(20px, 20px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(10px); opacity: 0; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-right {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-left {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scale-up {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 4s linear infinite; }
        .animate-scroll { animation: scroll 1.5s ease-in-out infinite; }
        .animate-fade-up { animation: fade-up 0.6s ease-out forwards; opacity: 0; }
        .animate-slide-right { animation: slide-right 0.5s ease-out forwards; opacity: 0; }
        .animate-slide-left { animation: slide-left 0.5s ease-out forwards; opacity: 0; }
        .animate-scale-up { animation: scale-up 0.5s ease-out; }
        .animate-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-loading-bar { animation: loading-bar 1.5s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Portfolio;
