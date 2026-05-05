import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  X, Mail, Phone, MapPin, Github, Linkedin, Facebook, Award, 
  Briefcase, GraduationCap, Code, Shield, FileText, 
  Download, Zap, Target, Eye, Heart, Star, Terminal,
  Lock, Server, Bug, User, FileJson, Loader2, 
  Cpu, Wifi, Key, Network, Database, Cloud, 
  Sparkles, Rocket, Crown, Gem, Globe, Binary,
  Activity, Bell, Camera, Coffee, Compass, Dice6,
  Feather, Flag, Frown, Gift, Hash, Infinity
} from "lucide-react";

const Portfolio = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("about");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [particles, setParticles] = useState<Array<{x: number, y: number, size: number, speed: number}>>([]);
  const [showFireworks, setShowFireworks] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [stars, setStars] = useState<Array<{x: number, y: number, size: number, opacity: number}>>([]);
  const [binaryRain, setBinaryRain] = useState<Array<{x: number, y: number, char: string, speed: number}>>([]);

  const fullText = ">_ Dhiraj Shahi // Ethical Hacker // Cybersecurity Expert";

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

  // Generate particles
  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 2 + 0.5
      });
    }
    setParticles(newParticles);

    const newStars = [];
    for (let i = 0; i < 200; i++) {
      newStars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
    setStars(newStars);

    const newBinary = [];
    for (let i = 0; i < 100; i++) {
      newBinary.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        char: Math.random() > 0.5 ? "1" : "0",
        speed: Math.random() * 3 + 1
      });
    }
    setBinaryRain(newBinary);
  }, []);

  // Animate particles
  useEffect(() => {
    const animate = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        y: p.y - p.speed,
        x: p.x + (Math.random() - 0.5)
      })).filter(p => p.y > 0).concat(
        Array(5).fill(null).map(() => ({
          x: Math.random() * window.innerWidth,
          y: window.innerHeight,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 2 + 0.5
        }))
      ));
      
      setBinaryRain(prev => prev.map(b => ({
        ...b,
        y: b.y + b.speed,
        x: b.x + (Math.random() - 0.5) * 0.5
      })).filter(b => b.y < window.innerHeight).concat(
        Array(3).fill(null).map(() => ({
          x: Math.random() * window.innerWidth,
          y: 0,
          char: Math.random() > 0.5 ? "1" : "0",
          speed: Math.random() * 3 + 1
        }))
      ));
    }, 50);
    return () => clearInterval(animate);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    // Simulate loading progress
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
      { name: "Ethical Hacking", level: 85, icon: "🐛", color: "from-purple-500 to-pink-500" },
      { name: "Cybersecurity", level: 90, icon: "🛡️", color: "from-blue-500 to-cyan-500" },
      { name: "Network Security", level: 85, icon: "🌐", color: "from-green-500 to-emerald-500" },
      { name: "Penetration Testing", level: 75, icon: "🔒", color: "from-red-500 to-orange-500" },
      { name: "Kali Linux", level: 85, icon: "💻", color: "from-indigo-500 to-purple-500" },
      { name: "MS Office", level: 90, icon: "📊", color: "from-emerald-500 to-teal-500" },
      { name: "GitHub", level: 80, icon: "📁", color: "from-gray-500 to-gray-600" }
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
      <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center overflow-hidden">
        {/* Binary Rain Background */}
        <div className="absolute inset-0 overflow-hidden opacity-20 font-mono text-green-500 text-xs">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="absolute animate-binary-rain" style={{ left: `${Math.random() * 100}%`, animationDuration: `${Math.random() * 3 + 2}s` }}>
              {Math.random() > 0.5 ? "1" : "0"}
            </div>
          ))}
        </div>
        
        <div className="relative z-10 text-center">
          <div className="mb-8 relative">
            <div className="w-32 h-32 mx-auto rounded-full border-4 border-purple-500/30 flex items-center justify-center animate-pulse-glow">
              <Shield size={64} className="text-purple-500 animate-spin-slow" />
            </div>
            <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full border-t-4 border-purple-500 animate-spin"></div>
            <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full border-r-4 border-red-500 animate-spin reverse"></div>
          </div>
          
          <div className="font-mono text-green-400 text-sm mb-2 animate-pulse">>_ INITIALIZING SECURE CONNECTION...</div>
          <div className="font-mono text-purple-400 text-sm mb-4">>_ LOADING PORTFOLIO v3.0</div>
          
          <div className="w-80 md:w-96 bg-gray-800 rounded-full h-2 mx-auto mb-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 via-red-500 to-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          
          <p className="text-gray-400 text-sm font-mono">{Math.floor(loadingProgress)}%</p>
          
          <div className="flex justify-center gap-2 mt-6">
            {[0, 1, 2, 3, 4].map(i => (
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
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="absolute animate-firework" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}>
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-red-500 rounded-full"></div>
            </div>
          ))}
        </div>
      )}

      {/* Stars Background */}
      {stars.map((star, i) => (
        <div key={i} className="fixed rounded-full bg-white animate-twinkle" style={{
          left: star.x,
          top: star.y,
          width: star.size,
          height: star.size,
          opacity: star.opacity,
          animationDelay: `${Math.random() * 5}s`
        }}></div>
      ))}

      {/* Binary Rain */}
      {binaryRain.map((bin, i) => (
        <div key={i} className="fixed font-mono text-green-500/20 text-xs pointer-events-none" style={{
          left: bin.x,
          top: bin.y,
          opacity: 0.3
        }}>
          {bin.char}
        </div>
      ))}

      {/* Particles */}
      {particles.map((particle, i) => (
        <div key={i} className="fixed rounded-full bg-purple-500/30 pointer-events-none" style={{
          left: particle.x,
          top: particle.y,
          width: particle.size,
          height: particle.size
        }}></div>
      ))}

      {/* Custom Cursor with Trail */}
      <div 
        className="fixed w-10 h-10 pointer-events-none z-50 transition-all duration-75 ease-out hidden md:block"
        style={{ transform: `translate(${mousePosition.x - 20}px, ${mousePosition.y - 20}px)` }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-500 to-red-500 animate-pulse opacity-50 blur-sm"></div>
        <div className="w-4 h-4 rounded-full bg-white absolute top-3 left-3"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-b border-purple-500/30 animate-slide-down">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Shield size={32} className="text-purple-500 animate-pulse-glow" />
              <div className="absolute inset-0 rounded-full bg-purple-500 blur-md opacity-50 animate-ping"></div>
            </div>
            <div>
              <span className="text-xl font-black bg-gradient-to-r from-purple-400 via-red-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                0x445348
              </span>
              <p className="text-xs text-gray-500 font-mono">[SECURE_ENCLAVE]</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={exportToJSON}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-red-600 hover:shadow-xl transition-all duration-300 text-white flex items-center gap-2 text-sm font-mono group"
            >
              <Download size={14} className="group-hover:animate-bounce" /> EXPORT_JSON
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 text-white flex items-center gap-2 text-sm font-mono"
            >
              <X size={14} /> CLOSE
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-12 animate-scale-up">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-red-600 animate-pulse-glow blur-2xl"></div>
              <div className="relative w-36 h-36 mx-auto rounded-full bg-gradient-to-br from-purple-700 to-red-700 flex items-center justify-center text-6xl font-bold text-white shadow-2xl border-4 border-purple-500/50 animate-float">
                <Shield size={64} />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-green-500 border-4 border-black flex items-center justify-center animate-bounce">
                <span className="text-sm font-bold">✓</span>
              </div>
            </div>
            
            <div className="font-mono text-green-400 text-sm mb-3 animate-pulse">>_ ACTIVE DIRECTORY: ROOT</div>
            
            <div className="h-12 mb-4">
              <h1 className="text-4xl md:text-6xl font-black">
                <span className="bg-gradient-to-r from-purple-400 via-red-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                  {typedText}
                </span>
                <span className={`inline-block w-1 h-8 bg-purple-500 ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
              </h1>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {[
                { icon: <Bug size={14} />, text: "ETHICAL HACKER", color: "purple" },
                { icon: <Shield size={14} />, text: "SECURITY ANALYST", color: "red" },
                { icon: <Terminal size={14} />, text: "PENETRATION TESTER", color: "blue" },
                { icon: <Code size={14} />, text: "DEVELOPER", color: "green" }
              ].map((badge, i) => (
                <span key={i} className={`px-4 py-2 bg-${badge.color}-500/20 rounded-full text-${badge.color}-300 text-sm font-mono border border-${badge.color}-500/30 flex items-center gap-2 animate-float`} style={{ animationDelay: `${i * 0.1}s` }}>
                  {badge.icon} {badge.text}
                </span>
              ))}
            </div>
            
            <p className="text-gray-300 max-w-3xl mx-auto text-base leading-relaxed animate-fade-in-up">
              {portfolioData.bio}
            </p>
          </div>

          {/* Stats Row with 3D effect */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { value: "3+", label: "CERTIFICATIONS", color: "purple", icon: <Award size={24} /> },
              { value: "10+", label: "SKILLS", color: "red", icon: <Zap size={24} /> },
              { value: "4+", label: "PROJECTS", color: "blue", icon: <Briefcase size={24} /> },
              { value: "500+", label: "HOURS", color: "green", icon: <Clock size={24} /> }
            ].map((stat, i) => (
              <div key={i} className={`group relative bg-gradient-to-br from-${stat.color}-900/20 to-${stat.color}-800/10 rounded-2xl p-5 text-center border border-${stat.color}-500/30 hover:scale-110 transition-all duration-300 cursor-pointer animate-float`} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={`absolute inset-0 bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity`}></div>
                <div className="relative">
                  <div className={`text-${stat.color}-400 mb-2 flex justify-center`}>{stat.icon}</div>
                  <div className={`text-3xl font-black text-${stat.color}-400`}>{stat.value}</div>
                  <div className="text-gray-400 text-xs font-mono mt-1">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs with 3D effect */}
          <div className="flex flex-wrap justify-center gap-3 mb-8 border-b border-purple-500/20 pb-4">
            {[
              { id: "about", label: "ABOUT", icon: <User size={16} />, color: "purple" },
              { id: "skills", label: "SKILLS", icon: <Zap size={16} />, color: "blue" },
              { id: "experience", label: "EXPERIENCE", icon: <Briefcase size={16} />, color: "emerald" },
              { id: "certificates", label: "CERTIFICATES", icon: <Award size={16} />, color: "yellow" },
              { id: "contact", label: "CONTACT", icon: <Mail size={16} />, color: "pink" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-xl text-sm font-mono font-bold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab.id 
                    ? `bg-gradient-to-r from-${tab.color}-600 to-${tab.color}-500 text-white shadow-xl scale-105` 
                    : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.icon} [{tab.label}]
              </button>
            ))}
          </div>

          {/* Tab Content with Glitch Effect */}
          <div className="animate-glitch-in">
            
            {/* About Tab */}
            {activeTab === "about" && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-mono font-bold text-purple-400 flex items-center gap-2">
                    <Heart size={20} className="animate-pulse" /> // WHO_AM_I
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-sm">{portfolioData.bio}</p>
                  
                  <div className="pt-4">
                    <h3 className="text-xl font-mono font-bold text-purple-400 flex items-center gap-2 mb-3">
                      <Star size={20} className="animate-spin-slow" /> // SKILL_MATRIX
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { text: "Vulnerability Assessment", icon: "🔒", color: "green" },
                        { text: "Ethical Hacking", icon: "🐛", color: "red" },
                        { text: "Network Security", icon: "🌐", color: "blue" },
                        { text: "Web Development", icon: "💻", color: "purple" }
                      ].map((skill, i) => (
                        <div key={i} className={`flex items-center gap-2 text-gray-300 text-sm p-2 bg-${skill.color}-500/10 rounded-lg border border-${skill.color}-500/30 hover:scale-105 transition-all`}>
                          <span>{skill.icon}</span> {skill.text}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-white/5 to-white/0 rounded-2xl p-6 border border-purple-500/30 hover:shadow-2xl transition-all">
                  <h3 className="text-xl font-mono font-bold text-purple-400 flex items-center gap-2 mb-4">
                    <Eye size={20} /> // SYSTEM_INFO
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-300 p-3 bg-white/5 rounded-lg font-mono text-sm">
                      <MapPin size={16} className="text-purple-400" />
                      <span>{portfolioData.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300 p-3 bg-white/5 rounded-lg font-mono text-sm">
                      <Mail size={16} className="text-purple-400" />
                      <a href={`mailto:${portfolioData.email}`} className="hover:text-purple-400 transition">{portfolioData.email}</a>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300 p-3 bg-white/5 rounded-lg font-mono text-sm">
                      <Phone size={16} className="text-purple-400" />
                      <a href={`tel:${portfolioData.phone}`} className="hover:text-purple-400 transition">{portfolioData.phone}</a>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-purple-500/30">
                    <h3 className="text-md font-mono font-bold text-purple-400 mb-3">// SOCIAL_ENGINEERING</h3>
                    <div className="flex gap-3">
                      <a href={portfolioData.social.facebook} target="_blank" className="p-3 bg-white/10 rounded-xl hover:bg-blue-600 transition-all hover:scale-110 text-xl">📘</a>
                      <a href={portfolioData.social.github} target="_blank" className="p-3 bg-white/10 rounded-xl hover:bg-gray-600 transition-all hover:scale-110 text-xl">🐙</a>
                      <a href={portfolioData.social.linkedin} target="_blank" className="p-3 bg-white/10 rounded-xl hover:bg-blue-700 transition-all hover:scale-110 text-xl">🔗</a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === "skills" && (
              <div className="grid md:grid-cols-2 gap-5">
                {portfolioData.skills.map((skill, idx) => (
                  <div key={idx} className={`group bg-gradient-to-r from-white/5 to-white/0 rounded-xl p-4 hover:scale-105 transition-all duration-300 border-l-4 border-${skill.color.split('-')[1]}-500`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="flex items-center gap-2 text-white text-sm font-mono font-bold">
                        <span className="text-2xl">{skill.icon}</span> {skill.name}
                      </span>
                      <span className={`text-${skill.color.split('-')[1]}-400 text-sm font-mono font-bold animate-pulse`}>{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 group-hover:shadow-lg`}
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
                  <div key={idx} className="group bg-gradient-to-r from-white/5 to-white/0 rounded-xl p-5 border-l-4 border-purple-500 hover:scale-[1.02] transition-all duration-300">
                    <h3 className="text-lg font-mono font-bold text-white">{exp.title}</h3>
                    <p className="text-purple-400 text-sm font-mono mb-2">{exp.company} // {exp.period}</p>
                    <p className="text-gray-400 text-sm">{exp.desc}</p>
                  </div>
                ))}
                <div className="bg-gradient-to-r from-white/5 to-white/0 rounded-xl p-5 border-l-4 border-blue-500">
                  <h3 className="text-lg font-mono font-bold text-white mb-3">// EDUCATION_TRACK</h3>
                  {portfolioData.education.map((edu, idx) => (
                    <div key={idx} className="mb-3">
                      <p className="text-white text-sm font-mono">{edu.degree}</p>
                      <p className="text-gray-400 text-xs font-mono">{edu.institution} // {edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certificates Tab */}
            {activeTab === "certificates" && (
              <div className="grid md:grid-cols-2 gap-4">
                {portfolioData.certificates.map((cert, idx) => (
                  <div key={idx} className="group bg-gradient-to-br from-purple-900/30 to-red-900/30 rounded-xl p-5 border border-purple-500/30 hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-red-500 flex items-center justify-center text-3xl group-hover:scale-110 transition">
                        🏆
                      </div>
                      <div>
                        <h4 className="font-mono font-bold text-white text-sm">{cert.name}</h4>
                        <p className="text-gray-400 text-xs font-mono">{cert.issuer}</p>
                      </div>
                    </div>
                    <p className="text-gray-500 text-xs font-mono mt-2">>_ ISSUED: {cert.date}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === "contact" && (
              <div className="bg-gradient-to-br from-white/5 to-white/0 rounded-2xl p-8 text-center max-w-2xl mx-auto border border-purple-500/30">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-red-500 flex items-center justify-center mb-4 animate-bounce">
                  <Mail size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-mono font-bold text-white mb-3">[CONNECT_WITH_ME]</h3>
                <p className="text-gray-400 font-mono mb-6">>_ READY_FOR_COLLABORATION // SEND_MESSAGE</p>
                <div className="space-y-3 text-left max-w-sm mx-auto">
                  <div className="flex items-center gap-3 text-gray-300 p-3 bg-white/5 rounded-lg font-mono text-sm hover:bg-white/10 transition">
                    <Mail size={18} className="text-purple-400" />
                    <span>{portfolioData.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300 p-3 bg-white/5 rounded-lg font-mono text-sm hover:bg-white/10 transition">
                    <Phone size={18} className="text-purple-400" />
                    <span>{portfolioData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300 p-3 bg-white/5 rounded-lg font-mono text-sm hover:bg-white/10 transition">
                    <MapPin size={18} className="text-purple-400" />
                    <span>{portfolioData.location}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-10 pt-6 text-center border-t border-purple-500/20">
            <p className="text-gray-500 text-xs font-mono flex items-center justify-center gap-2">
              <Shield size={12} /> [SECURED_BY_DHRX] // CYBERSECURITY_ENTHUSIAST // STATUS: ACTIVE
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.5); }
          50% { box-shadow: 0 0 50px rgba(139, 92, 246, 0.8); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        @keyframes firework {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(1); opacity: 0; }
        }
        @keyframes binary-rain {
          0% { transform: translateY(-100%); opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        @keyframes glitch-in {
          0% { opacity: 0; transform: translateX(-10px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-down {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
        @keyframes scale-up {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes fade-in-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 4s linear infinite; }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
        .animate-firework { animation: firework 1s ease-out forwards; }
        .animate-binary-rain { animation: binary-rain 4s linear infinite; }
        .animate-glitch-in { animation: glitch-in 0.5s ease-out; }
        .animate-slide-down { animation: slide-down 0.5s ease-out; }
        .animate-scale-up { animation: scale-up 0.5s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out; }
        .animate-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }
        .reverse { animation-direction: reverse; }
        .bg-gradient-custom { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
      `}</style>
    </div>
  );
};

export default Portfolio;
