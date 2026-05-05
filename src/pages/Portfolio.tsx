import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  X, Mail, Phone, MapPin, Github, Linkedin, Facebook, Award, 
  Briefcase, GraduationCap, Code, Shield, FileText, 
  Download, Zap, Target, Eye, Heart, Star, Terminal,
  Lock, Server, Bug, User, FileJson, Sparkles, Rocket, 
  CheckCircle, Calendar, Clock, Trophy, Cpu, Wifi, 
  Globe, Database, Cloud, Layers, Crown, GitBranch,
  Activity, Bell, Coffee, Compass, Diamond, Feather
} from "lucide-react";

const Portfolio = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("about");
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [scrolled, setScrolled] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [typedText, setTypedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalOutput, setTerminalOutput] = useState<string[]>(["> Welcome to DHRX Security Terminal", "> Type 'help' for commands", ""]);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  const fullText = "> DHIRAJ SHAHI // CYBERSECURITY EXPERT // ETHICAL HACKER <";

  // Typing effect
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(typing);
        setTimeout(() => {
          setTypedText("");
          i = 0;
          const restart = setInterval(() => {
            if (i <= fullText.length) {
              setTypedText(fullText.slice(0, i));
              i++;
            } else {
              clearInterval(restart);
            }
          }, 50);
        }, 4000);
      }
    }, 50);
    return () => clearInterval(typing);
  }, []);

  // Blinking cursor
  useEffect(() => {
    const blink = setInterval(() => setCursorVisible(prev => !prev), 500);
    return () => clearInterval(blink);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{ x: number; y: number; radius: number; speedX: number; speedY: number; color: string }> = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 1,
        speedY: (Math.random() - 0.5) * 1,
        color: `hsl(${Math.random() * 60 + 260}, 70%, 60%)`
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 12;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleTerminalCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const cmd = terminalInput.toLowerCase();
      let output = "";
      if (cmd === "help") {
        output = "Available commands: about, skills, experience, certs, contact, clear, help, whoami";
      } else if (cmd === "whoami") {
        output = "Dhiraj Shahi | Cybersecurity Expert | Ethical Hacker";
      } else if (cmd === "about") {
        output = "Cybersecurity professional with expertise in ethical hacking and network security.";
      } else if (cmd === "skills") {
        output = "Penetration Testing, Network Security, Kali Linux, Vulnerability Assessment";
      } else if (cmd === "experience") {
        output = "Senior Security Analyst | Ethical Hacking Consultant | Web Security Developer";
      } else if (cmd === "certs") {
        output = "CRTA, CCEP, ISO 27001 Lead Auditor";
      } else if (cmd === "contact") {
        output = "Email: dhirajshahif15@gmail.com | Phone: +977 9709954775";
      } else if (cmd === "clear") {
        setTerminalOutput([]);
        setTerminalInput("");
        return;
      } else if (cmd !== "") {
        output = `Command '${cmd}' not found. Type 'help' for available commands.`;
      }
      if (output) {
        setTerminalOutput(prev => [...prev, `> ${cmd}`, output, ""]);
      }
      setTerminalInput("");
    }
  };

  const portfolioData = {
    name: "Dhiraj Shahi",
    title: "Cybersecurity Expert | Ethical Hacker",
    bio: "A passionate cybersecurity professional with expertise in ethical hacking, penetration testing, and network security. Skilled in identifying vulnerabilities and securing digital assets. Also proficient in web development and computer operations, bringing a unique blend of security and development skills to protect modern digital infrastructure.",
    email: "dhirajshahif15@gmail.com",
    phone: "+977 9709954775",
    location: "Surkhet, Nepal",
    social: { facebook: "https://www.facebook.com/dhirupiru69", github: "https://github.com/hackerizzzboi", linkedin: "https://www.linkedin.com/in/dhiraj-shahi-a121693a2/" },
    skills: [
      { name: "Penetration Testing", level: 88, icon: "🔒", color: "from-red-500 to-orange-500" },
      { name: "Network Security", level: 92, icon: "🌐", color: "from-blue-500 to-cyan-500" },
      { name: "Vulnerability Assessment", level: 85, icon: "🎯", color: "from-purple-500 to-pink-500" },
      { name: "Kali Linux", level: 90, icon: "💻", color: "from-gray-700 to-gray-500" },
      { name: "Web Security", level: 82, icon: "🛡️", color: "from-green-500 to-emerald-500" },
      { name: "MS Office Suite", level: 95, icon: "📊", color: "from-blue-600 to-blue-400" }
    ],
    experience: [
      { title: "Senior Security Analyst", company: "Cybersecurity Firm", period: "2024 - Present", desc: "Leading security assessments, penetration testing, and vulnerability management for enterprise clients." },
      { title: "Ethical Hacking Consultant", company: "Freelance", period: "2023 - Present", desc: "Providing security consulting services including network audits and security training." },
      { title: "Web Security Developer", company: "Tech Solutions", period: "2022 - 2024", desc: "Developed secure web applications and implemented security best practices." }
    ],
    certifications: [
      { name: "Certified Red Team Analyst", issuer: "Red Team Leaders", date: "2025", icon: "🔴" },
      { name: "Certified Cybersecurity Educator", issuer: "Mastermind Assurance", date: "2026", icon: "🎓" },
      { name: "ISO 27001 Lead Auditor", issuer: "Mastermind Assurance", date: "2025", icon: "📜" }
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
      <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
        <canvas ref={canvasRef} className="fixed inset-0 w-full h-full"></canvas>
        <div className="relative z-10 text-center">
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-purple-600 to-red-600 animate-ping opacity-75"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-red-500 flex items-center justify-center animate-spin-slow">
                <Shield size={48} className="text-white animate-pulse" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-1 w-64 bg-gray-800 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-red-500 rounded-full transition-all duration-300" style={{ width: `${Math.min(loadingProgress, 100)}%` }}></div>
            </div>
            <p className="text-gray-400 font-mono text-sm">{Math.floor(Math.min(loadingProgress, 100))}% LOADING</p>
            <div className="flex justify-center gap-1 mt-4">
              {[0, 1, 2, 3, 4].map(i => (
                <div key={i} className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 100}ms` }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950 overflow-x-hidden relative">
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none"></canvas>
      
      <div className="fixed inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

      {/* Custom Cursor */}
      <div className="fixed w-10 h-10 pointer-events-none z-50 hidden lg:block rounded-full bg-gradient-to-r from-purple-500 to-red-500 opacity-30 blur-md transition-all duration-75" style={{ transform: `translate(${mousePosition.x - 20}px, ${mousePosition.y - 20}px)` }}></div>
      <div className="fixed w-3 h-3 pointer-events-none z-50 hidden lg:block rounded-full bg-white transition-all duration-100" style={{ transform: `translate(${mousePosition.x - 6}px, ${mousePosition.y - 6}px)` }}></div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? 'bg-black/95 backdrop-blur-md py-2 shadow-2xl border-b border-purple-500/20' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative">
              <Shield size={32} className="text-purple-500 group-hover:scale-110 transition duration-300" />
              <div className="absolute inset-0 bg-purple-500 blur-lg opacity-50 group-hover:opacity-100 transition"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-red-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-105 transition">DHRX</span>
          </div>
          <div className="hidden md:flex gap-2">
            {["about", "skills", "experience", "certifications", "contact"].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === tab ? 'bg-gradient-to-r from-purple-600 to-red-600 text-white shadow-lg scale-105' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}>
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={exportToJSON} className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-red-600 text-white text-sm font-medium flex items-center gap-2 hover:shadow-xl transition-all hover:scale-105">
              <Download size={16} /> EXPORT
            </button>
            <button onClick={() => navigate(-1)} className="px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium flex items-center gap-2 hover:bg-white/20 transition-all">
              <X size={16} /> CLOSE
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-red-600 blur-2xl opacity-50 animate-pulse"></div>
            <div className="relative w-36 h-36 rounded-full bg-gradient-to-br from-purple-600 to-red-600 flex items-center justify-center border-4 border-white/20 shadow-2xl animate-float">
              <Shield size={56} className="text-white animate-pulse" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center animate-bounce border-2 border-white">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
          </div>
          
          <div className="font-mono text-green-400 text-sm mb-4 animate-pulse">>_ SECURE_CONNECTION_ESTABLISHED | {currentTime}</div>
          
          <div className="h-16 mb-4">
            <h1 className="text-2xl md:text-4xl font-mono font-bold">
              <span className="bg-gradient-to-r from-purple-400 via-red-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                {typedText}
              </span>
              <span className={`inline-block w-1 h-6 bg-purple-500 ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
            </h1>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {["🔒 Ethical Hacker", "🛡️ Security Analyst", "💻 Pen Tester", "🚀 Developer"].map((badge, i) => (
              <span key={i} className="px-4 py-2 bg-white/10 rounded-full text-white text-sm backdrop-blur border border-white/20 animate-float" style={{ animationDelay: `${i * 0.1}s` }}>
                {badge}
              </span>
            ))}
          </div>
          
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed text-lg animate-fade-up">
            {portfolioData.bio}
          </p>
          
          <div className="mt-8 flex justify-center gap-4">
            <button onClick={() => setActiveTab("contact")} className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-red-600 text-white font-semibold hover:shadow-2xl transition-all hover:scale-105 animate-float">
              Hire Me 🚀
            </button>
            <button onClick={exportToJSON} className="px-8 py-3 rounded-full border border-purple-500 text-purple-400 font-semibold hover:bg-purple-500/10 transition-all hover:scale-105">
              Download CV 📄
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* Terminal Section */}
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-black/80 backdrop-blur rounded-xl border border-purple-500/30 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-900/50 to-red-900/50 px-4 py-2 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-400 text-xs ml-2">dhrx@security:~</span>
            </div>
            <div className="p-4 font-mono text-sm">
              {terminalOutput.map((line, i) => (
                <p key={i} className="text-gray-400">{line}</p>
              ))}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-green-400">$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  onKeyDown={handleTerminalCommand}
                  className="flex-1 bg-transparent outline-none text-white placeholder-gray-500"
                  placeholder="Type 'help' to start..."
                  autoFocus
                />
                <span className={`w-2 h-4 bg-white ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {[
              { value: "3+", label: "CERTIFICATIONS", icon: <Award size={28} />, color: "from-purple-500 to-pink-500" },
              { value: "10+", label: "SKILLS", icon: <Zap size={28} />, color: "from-blue-500 to-cyan-500" },
              { value: "4+", label: "PROJECTS", icon: <Briefcase size={28} />, color: "from-green-500 to-emerald-500" },
              { value: "500+", label: "HOURS", icon: <Clock size={28} />, color: "from-orange-500 to-red-500" }
            ].map((stat, i) => (
              <div key={i} className="group relative bg-white/5 backdrop-blur rounded-2xl p-6 text-center hover:scale-110 transition-all duration-500 cursor-pointer overflow-hidden animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity`}></div>
                <div className={`text-${stat.color.split('-')[1]}-400 mb-3 group-hover:scale-110 transition`}>{stat.icon}</div>
                <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</div>
                <div className="text-gray-400 text-xs mt-2">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white/5 backdrop-blur rounded-3xl p-8 border border-white/10 shadow-2xl animate-scale-up">
            
            {activeTab === "about" && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <div className="w-1 h-8 bg-purple-500 rounded-full"></div> Professional Journey
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{portfolioData.bio}</p>
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    {["🔒 Vulnerability Assessment", "🐛 Ethical Hacking", "🌐 Network Security", "💻 Web Security"].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-gray-300 text-sm p-2 bg-white/5 rounded-lg hover:bg-white/10 transition">
                        <CheckCircle size={14} className="text-green-400" /> {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-900/30 to-red-900/30 rounded-2xl p-6 border border-purple-500/30">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Eye size={20} className="text-purple-400" /> Contact Info</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-300 p-3 bg-white/5 rounded-xl"><MapPin size={18} className="text-purple-400" /> {portfolioData.location}</div>
                    <div className="flex items-center gap-3 text-gray-300 p-3 bg-white/5 rounded-xl"><Mail size={18} className="text-purple-400" /> {portfolioData.email}</div>
                    <div className="flex items-center gap-3 text-gray-300 p-3 bg-white/5 rounded-xl"><Phone size={18} className="text-purple-400" /> {portfolioData.phone}</div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-purple-500/20">
                    <h3 className="text-md font-semibold text-white mb-3">Connect</h3>
                    <div className="flex gap-3">
                      <a href={portfolioData.social.facebook} target="_blank" className="p-3 bg-white/10 rounded-xl hover:bg-blue-600 transition-all hover:scale-110"><Facebook size={20} /></a>
                      <a href={portfolioData.social.github} target="_blank" className="p-3 bg-white/10 rounded-xl hover:bg-gray-600 transition-all hover:scale-110"><Github size={20} /></a>
                      <a href={portfolioData.social.linkedin} target="_blank" className="p-3 bg-white/10 rounded-xl hover:bg-blue-700 transition-all hover:scale-110"><Linkedin size={20} /></a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "skills" && (
              <div className="space-y-6">
                {portfolioData.skills.map((skill, idx) => (
                  <div key={idx} className="group relative" onMouseEnter={() => setHoveredCard(idx)} onMouseLeave={() => setHoveredCard(null)}>
                    <div className="flex justify-between mb-2">
                      <span className="text-white font-medium flex items-center gap-2 text-lg"><span className="text-2xl">{skill.icon}</span> {skill.name}</span>
                      <span className="text-purple-400 font-mono">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ${hoveredCard === idx ? 'shadow-lg' : ''}`} style={{ width: `${skill.level}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "experience" && (
              <div className="space-y-6">
                {portfolioData.experience.map((exp, idx) => (
                  <div key={idx} className="group relative bg-gradient-to-r from-white/5 to-transparent rounded-xl p-6 border-l-4 border-purple-500 hover:scale-[1.02] transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                    <div className="relative">
                      <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                      <p className="text-purple-400 text-sm mb-2">{exp.company} • {exp.period}</p>
                      <p className="text-gray-300">{exp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "certifications" && (
              <div className="grid md:grid-cols-3 gap-6">
                {portfolioData.certifications.map((cert, idx) => (
                  <div key={idx} className="group relative bg-gradient-to-br from-purple-900/30 to-red-900/30 rounded-2xl p-6 text-center border border-purple-500/30 hover:scale-105 transition-all duration-300 cursor-pointer">
                    <div className="text-6xl mb-4 group-hover:animate-bounce">{cert.icon}</div>
                    <h4 className="text-lg font-bold text-white mb-2">{cert.name}</h4>
                    <p className="text-gray-400 text-sm">{cert.issuer}</p>
                    <p className="text-gray-500 text-xs mt-2 flex items-center justify-center gap-1"><Calendar size={12} /> {cert.date}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "contact" && (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-red-500 flex items-center justify-center mb-6 animate-bounce">
                  <Mail size={40} className="text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Ready to Secure Your Digital Assets?</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">Let's discuss how I can help protect your organization from cyber threats.</p>
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-3 text-gray-300"><Mail size={18} className="text-purple-400" /> {portfolioData.email}</div>
                  <div className="flex items-center gap-3 text-gray-300"><Phone size={18} className="text-purple-400" /> {portfolioData.phone}</div>
                  <div className="flex items-center gap-3 text-gray-300"><MapPin size={18} className="text-purple-400" /> {portfolioData.location}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-white/10">
        <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
          <Shield size={14} /> Secured by Dhiraj Shahi • Cybersecurity Professional • 2024
        </p>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(15px); opacity: 0; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-up {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 4s linear infinite; }
        .animate-scroll { animation: scroll 1.5s ease-in-out infinite; }
        .animate-fade-up { animation: fade-up 0.6s ease-out forwards; opacity: 0; }
        .animate-scale-up { animation: scale-up 0.5s ease-out; }
        .animate-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }
      `}</style>
    </div>
  );
};

export default Portfolio;
