import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  X, Mail, Phone, MapPin, Github, Linkedin, Facebook, Award, 
  Briefcase, GraduationCap, Code, Shield, FileText, 
  Download, Zap, Target, Eye, Heart, Star, User,
  CheckCircle, Calendar, Clock, Trophy, Sparkles, Rocket,
  TrendingUp, Activity, Globe, Cpu, Lock, Server, Bug,
  Sun, Moon, Cloud, Wind, Droplet, Flame, Diamond,
  Hexagon, Triangle, Circle
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
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("");
  const [glitchText, setGlitchText] = useState(false);
  const [shakeCard, setShakeCard] = useState<number | null>(null);
  const [rippleEffect, setRippleEffect] = useState<{x: number, y: number, show: boolean}>({ x: 0, y: 0, show: false });
  const [rotatingIcon, setRotatingIcon] = useState(0);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Individual letter colors for name
  const nameLetters = "Dhiraj Shahi".split("");
  const letterColors = [
    "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", 
    "#DFE6E9", "#FF7675", "#74B9FF", "#A29BFE", "#FDCB6E",
    "#E17055", "#00B894", "#0984E3", "#6C5CE7", "#FD79A8"
  ];

  const loadingMessages = [
    "INITIALIZING SECURE CONNECTION",
    "LOADING CYBER PROTOCOLS",
    "DECRYPTING PERSONAL DATA",
    "ESTABLISHING SECURE LINK",
    "VERIFYING CREDENTIALS",
    "ACCESS GRANTED",
    "WELCOME TO DHRX SECURITY"
  ];

  // Loading animation
  useEffect(() => {
    let progress = 0;
    let msgIndex = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 8;
      if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);
        setTimeout(() => setIsLoading(false), 1000);
      }
      setLoadingProgress(Math.min(progress, 100));
      setLoadingText(loadingMessages[msgIndex % loadingMessages.length]);
      if (progress > (msgIndex + 1) * (100 / loadingMessages.length)) {
        msgIndex++;
      }
    }, 200);
    return () => clearInterval(progressInterval);
  }, []);

  // Rotating icon for loading
  useEffect(() => {
    const rotateInterval = setInterval(() => {
      setRotatingIcon(prev => (prev + 1) % 360);
    }, 20);
    return () => clearInterval(rotateInterval);
  }, []);

  // Color changing effect for individual letters
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Typing effect
  useEffect(() => {
    let i = 0;
    const fullName = "Dhiraj Shahi";
    const typing = setInterval(() => {
      if (i <= fullName.length) {
        setTypedText(fullName.slice(0, i));
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

  // Canvas matrix effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / 30);
    const drops: number[] = new Array(columns).fill(1);
    const matrixChars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()";

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#0F0';
      ctx.font = '15px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        ctx.fillText(text, i * 30, drops[i] * 20);
        
        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    
    const interval = setInterval(draw, 50);
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleCardClick = (e: React.MouseEvent, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRippleEffect({ x: e.clientX - rect.left, y: e.clientY - rect.top, show: true });
    setShakeCard(index);
    setTimeout(() => setShakeCard(null), 300);
    setTimeout(() => setRippleEffect({ x: 0, y: 0, show: false }), 500);
  };

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
      { name: "Ethical Hacking", level: 85, icon: "🔒", color: "#FF6B6B" },
      { name: "Cybersecurity Fundamentals", level: 90, icon: "🛡️", color: "#4ECDC4" },
      { name: "Network Security", level: 85, icon: "🌐", color: "#45B7D1" },
      { name: "Vulnerability Assessment", level: 80, icon: "🎯", color: "#96CEB4" },
      { name: "Basic Penetration Testing", level: 75, icon: "⚔️", color: "#FFEAA7" },
      { name: "Kali Linux & Security Tools", level: 85, icon: "💻", color: "#DFE6E9" },
      { name: "MS Word, Excel, PowerPoint", level: 90, icon: "📊", color: "#74B9FF" },
      { name: "Basic Accounting & Bookkeeping", level: 85, icon: "💰", color: "#00B894" },
      { name: "Website Handling / GitHub", level: 80, icon: "🌐", color: "#6C5CE7" },
      { name: "Problem Solving & Analytical Thinking", level: 88, icon: "🧠", color: "#FD79A8" }
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
      <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center overflow-hidden">
        {/* Matrix Canvas */}
        <canvas ref={canvasRef} className="fixed inset-0 w-full h-full opacity-40"></canvas>
        
        {/* Animated circles background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="absolute rounded-full border border-green-500/20 animate-ping-slow" style={{
              width: `${150 + i * 50}px`,
              height: `${150 + i * 50}px`,
              left: `calc(50% - ${75 + i * 25}px)`,
              top: `calc(50% - ${75 + i * 25}px)`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${3 + i * 0.5}s`
            }}></div>
          ))}
        </div>
        
        <div className="relative z-10 text-center">
          {/* Rotating Shield */}
          <div className="relative mb-10">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-blue-500 blur-2xl opacity-50 animate-pulse"></div>
            <div 
              className="w-28 h-28 mx-auto rounded-full border-4 border-green-500/30 flex items-center justify-center"
              style={{ transform: `rotate(${rotatingIcon}deg)` }}
            >
              <Shield size={56} className="text-green-400 animate-pulse" />
            </div>
            <div className="absolute -inset-4 rounded-full border border-green-500/30 animate-ripple-expand"></div>
          </div>
          
          {/* Loading Text with color changing */}
          <div className="space-y-4">
            <h2 className="text-2xl font-mono font-bold">
              {loadingText.split('').map((char, i) => (
                <span 
                  key={i} 
                  className="inline-block animate-text-glow"
                  style={{ 
                    color: letterColors[i % letterColors.length],
                    animationDelay: `${i * 0.05}s`,
                    textShadow: `0 0 10px ${letterColors[i % letterColors.length]}`
                  }}
                >
                  {char}
                </span>
              ))}
            </h2>
            
            {/* Progress Bar */}
            <div className="w-80 h-1.5 bg-gray-800 rounded-full overflow-hidden mt-4">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-300 relative"
                style={{ width: `${loadingProgress}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
              </div>
            </div>
            
            <p className="text-gray-400 font-mono text-sm">{Math.floor(loadingProgress)}%</p>
            
            {/* Animated dots */}
            <div className="flex justify-center gap-2 mt-4">
              {[0, 1, 2, 3, 4].map(i => (
                <div 
                  key={i} 
                  className="w-2 h-2 rounded-full animate-bounce-smooth" 
                  style={{ 
                    backgroundColor: letterColors[i % letterColors.length],
                    animationDelay: `${i * 0.1}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Matrix Canvas Background */}
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full opacity-20 pointer-events-none"></canvas>
      
      {/* Animated Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full animate-float-particle"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              backgroundColor: letterColors[Math.floor(Math.random() * letterColors.length)],
              animationDuration: Math.random() * 5 + 3 + 's',
              animationDelay: Math.random() * 5 + 's',
              opacity: Math.random() * 0.5 + 0.2
            }}
          ></div>
        ))}
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? 'bg-black/95 backdrop-blur-md shadow-2xl py-2 border-b border-green-500/20' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg blur-md opacity-0 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center group-hover:scale-110 transition duration-300 animate-pulse-slow">
                <Shield size={20} className="text-black" />
              </div>
            </div>
            <span className="text-xl font-bold font-mono">
              {"> DHRX_SEC"}
            </span>
          </div>
          <div className="hidden md:flex gap-1">
            {["about", "skills", "experience", "education", "certificates", "contact"].map((tab, i) => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)} 
                className={`px-5 py-2 rounded-full text-sm font-mono font-medium transition-all duration-300 hover:scale-105 ${
                  activeTab === tab 
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-black shadow-lg' 
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                [{tab.toUpperCase()}]
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button 
              onClick={exportToJSON} 
              className="px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-black text-sm font-mono font-bold flex items-center gap-2 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Download size={16} /> EXPORT_CV
            </button>
            <button 
              onClick={() => navigate(-1)} 
              className="px-4 py-2 rounded-full border border-gray-700 text-gray-400 text-sm font-mono flex items-center gap-2 hover:bg-white/10 hover:scale-105 transition-all duration-300"
            >
              <X size={16} /> CLOSE
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div ref={heroRef} className="container mx-auto px-4 text-center transition-transform duration-300">
          <div className="relative inline-block mb-8 group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-blue-500 blur-2xl opacity-50 animate-pulse-slow"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-blue-500 animate-spin-slow opacity-30" style={{ width: '160px', height: '160px', left: '-20px', top: '-20px' }}></div>
            <div className="relative w-36 h-36 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center shadow-2xl group-hover:scale-110 transition duration-500 animate-float">
              <User size={56} className="text-black" />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center border-2 border-black animate-bounce">
                <CheckCircle size={20} className="text-black" />
              </div>
            </div>
          </div>
          
          <div className="font-mono text-green-400 text-sm mb-2 animate-pulse">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            root@dhrx:~$ ./portfolio --status=online • {currentTime}
          </div>
          
          <div className="h-20 mb-4">
            <h1 className="text-4xl md:text-6xl font-mono font-bold">
              {typedText.split('').map((char, i) => (
                <span 
                  key={i} 
                  className={`inline-block transition-all duration-300 hover:scale-125 hover:inline-block ${glitchText ? 'animate-glitch' : ''}`}
                  style={{ 
                    color: letterColors[i % letterColors.length],
                    textShadow: `0 0 5px ${letterColors[i % letterColors.length]}`,
                    animation: glitchText ? 'glitch 0.3s ease-in-out' : 'none'
                  }}
                >
                  {char}
                </span>
              ))}
              <span className={`inline-block w-1 h-8 bg-green-500 ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
            </h1>
          </div>
          
          <p className="text-xl text-green-400 mb-6 animate-fade-up font-mono">{portfolioData.title}</p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {["🔒 Ethical Hacker", "🛡️ Security Analyst", "💻 Pen Tester", "🚀 Developer"].map((badge, i) => (
              <span 
                key={i} 
                className="px-4 py-2 bg-gray-900/50 backdrop-blur rounded-full text-green-400 text-sm font-mono border border-green-500/30 hover:shadow-lg hover:scale-110 hover:border-green-500 transition-all duration-300 animate-float cursor-pointer"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {badge}
              </span>
            ))}
          </div>
          
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed text-lg animate-fade-up">
            {portfolioData.bio}
          </p>
          
          <div className="mt-8 flex justify-center gap-4">
            <button 
              onClick={() => setActiveTab("contact")} 
              className="px-8 py-3 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-black font-bold font-mono hover:shadow-2xl hover:scale-110 transition-all duration-300 animate-float group"
            >
              <span className="flex items-center gap-2">HIRE_ME <Rocket size={18} className="group-hover:translate-x-1 group-hover:animate-pulse transition" /></span>
            </button>
            <button 
              onClick={exportToJSON} 
              className="px-8 py-3 rounded-full border-2 border-green-500 text-green-400 font-bold font-mono hover:bg-green-500 hover:text-black hover:shadow-xl hover:scale-110 transition-all duration-300"
            >
              DOWNLOAD_CV
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow cursor-pointer" onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}>
          <div className="w-6 h-10 border-2 border-green-500/50 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-green-500 rounded-full animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "4+", label: "CERTIFICATIONS", icon: <Trophy size={28} />, color: "#FF6B6B" },
              { value: "10+", label: "SKILLS", icon: <Zap size={28} />, color: "#4ECDC4" },
              { value: "4+", label: "PROJECTS", icon: <Briefcase size={28} />, color: "#45B7D1" },
              { value: "500+", label: "HOURS", icon: <Clock size={28} />, color: "#96CEB4" }
            ].map((stat, i) => (
              <div 
                key={i} 
                className="group relative bg-gray-900/50 backdrop-blur rounded-2xl p-6 text-center border border-gray-800 hover:border-green-500/50 transition-all duration-500 hover:-translate-y-2 cursor-pointer animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
                onClick={(e) => handleCardClick(e, i)}
              >
                {rippleEffect.show && (
                  <div className="absolute rounded-full bg-green-500/30 animate-ripple" style={{ left: rippleEffect.x, top: rippleEffect.y }}></div>
                )}
                <div className={`text-${stat.color.split('-')[1]}-500 mb-3 group-hover:scale-110 group-hover:rotate-12 transition duration-300`} style={{ color: stat.color }}>{stat.icon}</div>
                <div className="text-3xl font-bold font-mono" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-gray-500 text-sm mt-1 font-mono">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content Section */}
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Tab Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {["about", "skills", "experience", "education", "certificates", "contact"].map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full text-sm font-mono font-bold transition-all duration-300 hover:scale-105 ${
                  activeTab === tab 
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-black shadow-lg' 
                    : 'bg-gray-900/50 text-gray-400 hover:text-white border border-gray-800 hover:border-green-500/50'
                } animate-fade-up`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                [{tab.toUpperCase()}]
              </button>
            ))}
          </div>

          {/* Content Cards */}
          <div className="bg-gray-900/50 backdrop-blur rounded-2xl border border-gray-800 overflow-hidden animate-scale-up">
            
            {/* About */}
            {activeTab === "about" && (
              <div className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4 animate-slide-right">
                    <h3 className="text-2xl font-mono font-bold text-green-400 flex items-center gap-2">
                      <div className="w-1 h-8 bg-green-500 rounded-full"></div>
                      // ABOUT_ME
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{portfolioData.bio}</p>
                    <div className="pt-2">
                      <h4 className="font-mono font-semibold text-green-400 mb-3">// CORE_COMPETENCIES</h4>
                      <div className="flex flex-wrap gap-2">
                        {["Vulnerability Assessment", "Ethical Hacking", "Network Security", "Web Development"].map((item, i) => (
                          <span key={i} className="px-3 py-1.5 bg-gray-800 rounded-full text-sm text-gray-300 font-mono hover:scale-105 hover:border hover:border-green-500 transition-all duration-300 cursor-pointer">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 animate-slide-left">
                    <h3 className="text-xl font-mono font-bold text-green-400 mb-4 flex items-center gap-2">
                      <Eye size={20} /> // SYSTEM_INFO
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-300 p-2 bg-gray-900 rounded-lg font-mono text-sm hover:border hover:border-green-500 transition-all duration-300">
                        <MapPin size={18} className="text-green-400" /> LOCATION: {portfolioData.location}
                      </div>
                      <div className="flex items-center gap-3 text-gray-300 p-2 bg-gray-900 rounded-lg font-mono text-sm hover:border hover:border-green-500 transition-all duration-300">
                        <Mail size={18} className="text-green-400" /> EMAIL: {portfolioData.email}
                      </div>
                      <div className="flex items-center gap-3 text-gray-300 p-2 bg-gray-900 rounded-lg font-mono text-sm hover:border hover:border-green-500 transition-all duration-300">
                        <Phone size={18} className="text-green-400" /> PHONE: {portfolioData.phone}
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-700">
                      <h4 className="font-mono font-semibold text-green-400 mb-2">// SOCIAL_LINKS</h4>
                      <div className="flex gap-3">
                        <a href={portfolioData.social.facebook} target="_blank" className="p-2 bg-gray-900 rounded-lg hover:bg-blue-600 hover:text-white hover:scale-110 transition-all duration-300">FB</a>
                        <a href={portfolioData.social.github} target="_blank" className="p-2 bg-gray-900 rounded-lg hover:bg-gray-600 hover:text-white hover:scale-110 transition-all duration-300">GH</a>
                        <a href={portfolioData.social.linkedin} target="_blank" className="p-2 bg-gray-900 rounded-lg hover:bg-blue-700 hover:text-white hover:scale-110 transition-all duration-300">IN</a>
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
                        <span className="text-gray-300 font-mono text-sm flex items-center gap-2">
                          <span className="text-xl group-hover:animate-bounce group-hover:scale-125 transition-transform duration-300">{skill.icon}</span> {skill.name}
                        </span>
                        <span className="text-green-400 text-sm font-mono font-bold animate-pulse">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${hoveredSkill === idx ? Math.min(skill.level + 5, 100) : skill.level}%`,
                            backgroundColor: skill.color,
                            boxShadow: hoveredSkill === idx ? `0 0 10px ${skill.color}` : 'none'
                          }}
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
                      className={`group border-l-4 border-green-500 pl-5 py-3 hover:bg-gray-800/50 rounded-r-lg transition-all duration-300 hover:scale-[1.01] cursor-pointer ${shakeCard === idx ? 'animate-shake' : ''}`}
                      onClick={(e) => handleCardClick(e, idx)}
                    >
                      <h3 className="text-lg font-mono font-semibold text-white group-hover:text-green-400 transition">{exp.title}</h3>
                      <p className="text-green-500 text-sm mb-1 flex items-center gap-2 font-mono">
                        <Briefcase size={14} /> {exp.company} // {exp.period}
                      </p>
                      <p className="text-gray-400 text-sm">{exp.desc}</p>
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
                      className="flex items-start gap-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700 hover:border-green-500 transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
                      onClick={(e) => handleCardClick(e, idx)}
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center flex-shrink-0 animate-pulse-slow group-hover:scale-110 transition">
                        <GraduationCap size={22} className="text-black" />
                      </div>
                      <div>
                        <h3 className="font-mono font-semibold text-white text-lg group-hover:text-green-400 transition">{edu.degree}</h3>
                        <p className="text-gray-400 font-mono text-sm">{edu.institution}</p>
                        <p className="text-green-500 text-sm mt-1 flex items-center gap-1 font-mono"><Calendar size={12} /> {edu.year}</p>
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
                      className="group p-4 bg-gray-800/30 rounded-xl border border-gray-700 hover:border-green-500 transition-all duration-300 hover:scale-105 cursor-pointer"
                      onClick={(e) => handleCardClick(e, idx)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-3xl group-hover:animate-bounce group-hover:scale-125 transition">🏆</div>
                        <div>
                          <h4 className="font-mono font-semibold text-white group-hover:text-green-400 transition">{cert.name}</h4>
                          <p className="text-gray-400 text-sm font-mono">{cert.issuer}</p>
                          <p className="text-gray-500 text-xs mt-1 flex items-center gap-1 font-mono"><Calendar size={10} /> {cert.date}</p>
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
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center mb-5 animate-bounce-slow cursor-pointer group" onClick={() => window.open(`mailto:${portfolioData.email}`)}>
                  <Mail size={36} className="text-black group-hover:scale-110 transition" />
                </div>
                <h3 className="text-2xl font-mono font-bold text-white mb-2">// CONTACT_ME</h3>
                <p className="text-gray-400 font-mono mb-6 max-w-md mx-auto">Ready to collaborate on security projects or development work</p>
                <div className="space-y-2 max-w-sm mx-auto">
                  <div className="flex items-center gap-2 text-gray-300 p-2 bg-gray-800/50 rounded-lg font-mono text-sm hover:bg-gray-800 hover:scale-105 transition-all duration-300 cursor-pointer group" onClick={() => window.open(`mailto:${portfolioData.email}`)}>
                    <Mail size={16} className="text-green-400 group-hover:animate-bounce" /> {portfolioData.email}
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 p-2 bg-gray-800/50 rounded-lg font-mono text-sm hover:bg-gray-800 hover:scale-105 transition-all duration-300 cursor-pointer" onClick={() => window.open(`tel:${portfolioData.phone}`)}>
                    <Phone size={16} className="text-green-400" /> {portfolioData.phone}
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 p-2 bg-gray-800/50 rounded-lg font-mono text-sm hover:bg-gray-800 hover:scale-105 transition-all duration-300">
                    <MapPin size={16} className="text-green-400" /> {portfolioData.location}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-gray-800 mt-8">
        <p className="text-gray-500 text-sm font-mono flex items-center justify-center gap-2">
          <Shield size={14} className="text-green-400 animate-pulse" /> root@dhrx:~# ./portfolio --status=secure // CYBERSECURITY_PROFESSIONAL // 2024
        </p>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-particle {
          0% { transform: translateY(0px); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
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
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes bounce-smooth {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-3px, 3px); }
          40% { transform: translate(-3px, -3px); }
          60% { transform: translate(3px, 3px); }
          80% { transform: translate(3px, -3px); }
          100% { transform: translate(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes ripple {
          0% { width: 0; height: 0; opacity: 0.5; }
          100% { width: 200px; height: 200px; opacity: 0; }
        }
        @keyframes ripple-expand {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 5px currentColor; }
          50% { text-shadow: 0 0 20px currentColor; }
        }
        @keyframes ping-slow {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.5); opacity: 0.05; }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float-particle { animation: float-particle 5s linear infinite; }
        .animate-spin-slow { animation: spin-slow 6s linear infinite; }
        .animate-scroll { animation: scroll 1.5s ease-in-out infinite; }
        .animate-fade-up { animation: fade-up 0.6s ease-out forwards; opacity: 0; }
        .animate-slide-right { animation: slide-right 0.5s ease-out forwards; opacity: 0; }
        .animate-slide-left { animation: slide-left 0.5s ease-out forwards; opacity: 0; }
        .animate-scale-up { animation: scale-up 0.5s ease-out; }
        .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-bounce-smooth { animation: bounce-smooth 0.6s ease-in-out infinite; }
        .animate-glitch { animation: glitch 0.3s ease-in-out; }
        .animate-shake { animation: shake 0.3s ease-in-out; }
        .animate-ripple { animation: ripple 0.5s ease-out; position: absolute; pointer-events: none; transform: translate(-50%, -50%); border-radius: 50%; }
        .animate-ripple-expand { animation: ripple-expand 2s ease-out infinite; }
        .animate-shimmer { animation: shimmer 1.5s ease-in-out infinite; }
        .animate-text-glow { animation: text-glow 1.5s ease-in-out infinite; }
        .animate-ping-slow { animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
      `}</style>
    </div>
  );
};

export default Portfolio;
