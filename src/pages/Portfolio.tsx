import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  X, Mail, Phone, MapPin, Github, Linkedin, Facebook, Award, 
  Briefcase, GraduationCap, Code, Shield, FileText, 
  Download, Zap, Target, Eye, Heart, Star, User,
  CheckCircle, Calendar, Clock, Trophy, Sparkles, Rocket,
  TrendingUp, Activity, Globe, Cpu, Lock, Server, Bug,
  Flame, Droplet, Monitor, Sun, Moon
} from "lucide-react";

const Portfolio = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("about");
  const [isLoading, setIsLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const [typedText, setTypedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("");
  const [bgType, setBgType] = useState("rain");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const raindropsRef = useRef<any[]>([]);
  const particlesRef = useRef<any[]>([]);
  const isVisibleRef = useRef(true);

  const fullName = "Dhiraj Shahi";
  
  // Typing effect
  useEffect(() => {
    let i = 0;
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

  // Intersection Observer for canvas visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    
    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // Optimized canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let frameCount = 0;
    let lastTimestamp = 0;
    const targetFPS = 30; // Limit FPS for better performance on mobile
    const frameInterval = 1000 / targetFPS;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      // Reinitialize particles based on new dimensions
      if (bgType === "rain") {
        const dropCount = Math.min(Math.floor(width * 0.3), 150);
        raindropsRef.current = [];
        for (let i = 0; i < dropCount; i++) {
          raindropsRef.current.push({
            x: Math.random() * width,
            y: Math.random() * height,
            length: Math.random() * 15 + 8,
            speed: Math.random() * 5 + 3,
            opacity: Math.random() * 0.3 + 0.15
          });
        }
      } else {
        const particleCount = Math.min(Math.floor(width * 0.25), 100);
        particlesRef.current = [];
        for (let i = 0; i < particleCount; i++) {
          particlesRef.current.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 3 + 1.5,
            speed: Math.random() * 2 + 1,
            alpha: Math.random() * 0.4 + 0.2
          });
        }
      }
    };

    const initEffects = () => {
      if (bgType === "rain") {
        const dropCount = Math.min(Math.floor(width * 0.3), 150);
        raindropsRef.current = [];
        for (let i = 0; i < dropCount; i++) {
          raindropsRef.current.push({
            x: Math.random() * width,
            y: Math.random() * height,
            length: Math.random() * 15 + 8,
            speed: Math.random() * 5 + 3,
            opacity: Math.random() * 0.3 + 0.15
          });
        }
      } else {
        const particleCount = Math.min(Math.floor(width * 0.25), 100);
        particlesRef.current = [];
        for (let i = 0; i < particleCount; i++) {
          particlesRef.current.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 3 + 1.5,
            speed: Math.random() * 2 + 1,
            alpha: Math.random() * 0.4 + 0.2
          });
        }
      }
    };

    const drawRain = () => {
      for (let i = 0; i < raindropsRef.current.length; i++) {
        const drop = raindropsRef.current[i];
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.strokeStyle = `rgba(100, 150, 255, ${drop.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        drop.y += drop.speed;
        
        if (drop.y > height) {
          drop.y = -drop.length;
          drop.x = Math.random() * width;
        }
      }
    };

    const drawFire = () => {
      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, ${Math.random() * 80 + 70}, 0, ${p.alpha})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        p.y -= p.speed;
        p.x += (Math.random() - 0.5) * 0.8;
        
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
      }
    };

    const animate = (timestamp: number) => {
      if (!isVisibleRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      if (timestamp - lastTimestamp >= frameInterval) {
        if (bgType === "rain") {
          ctx.clearRect(0, 0, width, height);
          drawRain();
        } else {
          ctx.clearRect(0, 0, width, height);
          drawFire();
        }
        lastTimestamp = timestamp;
        frameCount++;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initEffects();
    
    const handleResize = () => {
      resizeCanvas();
      initEffects();
    };
    
    window.addEventListener('resize', handleResize);
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [bgType]);

  // Loading animation
  useEffect(() => {
    const loadingMessages = [
      "INITIALIZING SYSTEM",
      "LOADING SECURE PROTOCOLS",
      "DECRYPTING DATA",
      "ESTABLISHING CONNECTION",
      "VERIFYING CREDENTIALS",
      "ACCESS GRANTED",
      "WELCOME"
    ];
    let progress = 0;
    let msgIndex = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 8;
      if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);
        setTimeout(() => setIsLoading(false), 500);
      }
      setLoadingProgress(Math.min(progress, 100));
      setLoadingText(loadingMessages[msgIndex % loadingMessages.length]);
      if (progress > (msgIndex + 1) * (100 / loadingMessages.length)) {
        msgIndex++;
      }
    }, 200);
    return () => clearInterval(progressInterval);
  }, []);

  const handleCardClick = (e: React.MouseEvent, index: number) => {
    setShakeCard(index);
    setTimeout(() => setShakeCard(null), 300);
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
        <div className="relative z-10 text-center">
          <div className="relative mb-10">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 blur-2xl opacity-50 animate-pulse"></div>
            <div className="w-20 h-20 md:w-28 md:h-28 mx-auto rounded-full border-4 border-blue-500/30 flex items-center justify-center bg-black/50 animate-spin-slow">
              <Shield size={40} className="text-blue-500 animate-pulse md:w-14 md:h-14" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-lg md:text-2xl font-mono font-bold text-blue-400">
              {loadingText}
            </h2>
            
            <div className="w-56 md:w-80 h-1.5 bg-gray-800 rounded-full overflow-hidden mx-auto">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            
            <p className="text-gray-400 font-mono text-xs md:text-sm">{Math.floor(loadingProgress)}%</p>
            
            <div className="flex justify-center gap-1.5 md:gap-2 mt-4">
              {[0, 1, 2, 3, 4].map(i => (
                <div key={i} className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-bounce-smooth bg-blue-500" style={{ animationDelay: `${i * 0.1}s` }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Optimized Canvas Background */}
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none will-change-transform"></canvas>
      
      {/* Background Toggle Switch - Optimized for mobile */}
      <div className="fixed bottom-4 right-4 z-50 flex gap-2 bg-black/60 backdrop-blur rounded-full p-1 border border-gray-700">
        <button
          onClick={() => setBgType("rain")}
          className={`px-2 md:px-3 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-mono transition-all duration-300 flex items-center gap-0.5 md:gap-1 ${
            bgType === "rain" ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Droplet size={12} className="md:w-3 md:h-3" /> RAIN
        </button>
        <button
          onClick={() => setBgType("fire")}
          className={`px-2 md:px-3 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-mono transition-all duration-300 flex items-center gap-0.5 md:gap-1 ${
            bgType === "fire" ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Flame size={12} className="md:w-3 md:h-3" /> FIRE
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="flex flex-col items-center justify-center h-full space-y-4 px-4">
            {["about", "skills", "experience", "education", "certificates", "contact"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setMobileMenuOpen(false);
                }}
                className="text-white text-base font-mono py-3 px-8 rounded-xl hover:bg-white/10 transition w-48 text-center"
              >
                [{tab.toUpperCase()}]
              </button>
            ))}
            <button
              onClick={exportToJSON}
              className="text-white text-base font-mono py-3 px-8 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-lg transition w-48 text-center"
            >
              EXPORT CV
            </button>
            <button
              onClick={() => navigate(-1)}
              className="text-white text-base font-mono py-3 px-8 rounded-xl bg-white/10 hover:bg-white/20 transition w-48 text-center"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? 'bg-black/95 backdrop-blur-md shadow-2xl py-2 border-b border-blue-500/20' : 'bg-transparent py-3 md:py-4'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur-md opacity-0 group-hover:opacity-50 transition duration-500"></div>
                <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition duration-300">
                  <Shield size={16} className="text-black md:w-5 md:h-5" />
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs md:text-lg font-bold font-mono text-white">Dhiraj Shahi</span>
                <span className="text-lg md:text-2xl">🇳🇵</span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-1">
              {["about", "skills", "experience", "education", "certificates", "contact"].map((tab) => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)} 
                  className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all duration-300 hover:scale-105 ${
                    activeTab === tab 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-black shadow-lg' 
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  [{tab.toUpperCase()}]
                </button>
              ))}
            </div>
            
            {/* Desktop Actions */}
            <div className="hidden md:flex gap-2">
              <button 
                onClick={exportToJSON} 
                className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-black text-xs font-mono font-bold flex items-center gap-2 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <Download size={14} /> EXPORT CV
              </button>
              <button 
                onClick={() => navigate(-1)} 
                className="px-4 py-2 rounded-full border border-gray-700 text-gray-400 text-xs font-mono flex items-center gap-2 hover:bg-white/10 hover:scale-105 transition-all duration-300"
              >
                <X size={14} /> CLOSE
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-white p-2 rounded-lg bg-white/10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 pb-8 overflow-hidden">
        <div ref={heroRef} className="container mx-auto px-4 text-center transition-transform duration-300">
          <div className="relative inline-block mb-6 group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 blur-2xl opacity-50 animate-pulse-slow"></div>
            <div className="relative w-24 h-24 md:w-36 md:h-36 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-2xl group-hover:scale-110 transition duration-500 animate-float">
              <User size={36} className="text-black md:w-14 md:h-14" />
              <div className="absolute -bottom-2 -right-2 w-7 h-7 md:w-10 md:h-10 rounded-full bg-green-500 flex items-center justify-center border-2 border-black animate-bounce">
                <CheckCircle size={12} className="text-black md:w-5 md:h-5" />
              </div>
            </div>
          </div>
          
          <div className="font-mono text-blue-400 text-[10px] md:text-sm mb-2 animate-pulse">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
            root@dhrx:~$ ./portfolio --status=online • {currentTime}
          </div>
          
          <div className="mb-4">
            <h1 className="text-2xl md:text-6xl lg:text-7xl font-bold font-mono tracking-wide">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-gradient">
                {typedText}
              </span>
              <span className="text-2xl md:text-6xl lg:text-7xl ml-1">🇳🇵</span>
              <span className={`inline-block w-0.5 h-5 md:h-10 bg-blue-500 ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
            </h1>
          </div>
          
          <p className="text-sm md:text-xl text-blue-400 mb-5 animate-fade-up font-mono px-2">{portfolioData.title}</p>
          
          <div className="flex flex-wrap justify-center gap-1.5 md:gap-3 mb-8">
            {["🔒 Ethical Hacker", "🛡️ Security Analyst", "💻 Pen Tester", "🚀 Developer"].map((badge, i) => (
              <span 
                key={i} 
                className="px-2 py-1 md:px-4 md:py-2 bg-gray-900/50 backdrop-blur rounded-full text-blue-400 text-[10px] md:text-sm font-mono border border-blue-500/30 hover:shadow-lg hover:scale-110 hover:border-blue-500 transition-all duration-300 animate-float cursor-pointer"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {badge}
              </span>
            ))}
          </div>
          
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed text-xs md:text-base px-4 animate-fade-up">
            {portfolioData.bio}
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-2 md:gap-4">
            <button 
              onClick={() => setActiveTab("contact")} 
              className="px-5 py-2 md:px-8 md:py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-black font-bold font-mono text-xs md:text-base hover:shadow-2xl hover:scale-110 transition-all duration-300 animate-float group"
            >
              <span className="flex items-center gap-1 md:gap-2">HIRE ME <Rocket size={14} className="md:w-5 md:h-5 group-hover:translate-x-1 transition" /></span>
            </button>
            <button 
              onClick={exportToJSON} 
              className="px-5 py-2 md:px-8 md:py-3 rounded-full border-2 border-blue-500 text-blue-400 font-bold font-mono text-xs md:text-base hover:bg-blue-500 hover:text-black hover:shadow-xl hover:scale-110 transition-all duration-300"
            >
              DOWNLOAD CV
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow cursor-pointer" onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}>
          <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-blue-500/50 rounded-full flex justify-center">
            <div className="w-1 h-1.5 bg-blue-500 rounded-full animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-6 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
            {[
              { value: "4+", label: "CERTIFICATIONS", icon: <Trophy size={16} className="md:w-7 md:h-7" />, color: "#FF6B6B" },
              { value: "10+", label: "SKILLS", icon: <Zap size={16} className="md:w-7 md:h-7" />, color: "#4ECDC4" },
              { value: "4+", label: "PROJECTS", icon: <Briefcase size={16} className="md:w-7 md:h-7" />, color: "#45B7D1" },
              { value: "500+", label: "HOURS", icon: <Clock size={16} className="md:w-7 md:h-7" />, color: "#96CEB4" }
            ].map((stat, i) => (
              <div 
                key={i} 
                className="group relative bg-gray-900/50 backdrop-blur rounded-xl md:rounded-2xl p-2 md:p-6 text-center border border-gray-800 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 cursor-pointer animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
                onClick={(e) => handleCardClick(e, i)}
              >
                <div className={`mb-0.5 md:mb-3 group-hover:scale-110 group-hover:rotate-12 transition duration-300`} style={{ color: stat.color }}>{stat.icon}</div>
                <div className="text-lg md:text-3xl font-bold font-mono" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-gray-500 text-[8px] md:text-sm mt-0.5 md:mt-1 font-mono">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content Section */}
      <section className="py-4 md:py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Tab Buttons */}
          <div className="flex flex-wrap justify-center gap-1 md:gap-2 mb-4 md:mb-8">
            {["about", "skills", "experience", "education", "certificates", "contact"].map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-2 py-1 md:px-5 md:py-2.5 rounded-full text-[9px] md:text-sm font-mono font-bold transition-all duration-300 hover:scale-105 ${
                  activeTab === tab 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-black shadow-lg' 
                    : 'bg-gray-900/50 text-gray-400 hover:text-white border border-gray-800 hover:border-blue-500/50'
                } animate-fade-up`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                [{tab.toUpperCase()}]
              </button>
            ))}
          </div>

          {/* Content Cards */}
          <div className="bg-gray-900/50 backdrop-blur rounded-xl md:rounded-2xl border border-gray-800 overflow-hidden animate-scale-up">
            
            {/* About */}
            {activeTab === "about" && (
              <div className="p-3 md:p-8">
                <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                  <div className="space-y-2 md:space-y-4 animate-slide-right">
                    <h3 className="text-base md:text-2xl font-mono font-bold text-blue-400 flex items-center gap-2">
                      <div className="w-1 h-4 md:h-8 bg-blue-500 rounded-full"></div>
                      // ABOUT_ME
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-xs md:text-base">{portfolioData.bio}</p>
                    <div className="pt-2">
                      <h4 className="font-mono font-semibold text-blue-400 text-xs md:text-base mb-1 md:mb-3">// CORE_COMPETENCIES</h4>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {["Vulnerability Assessment", "Ethical Hacking", "Network Security", "Web Development"].map((item, i) => (
                          <span key={i} className="px-1.5 py-0.5 md:px-3 md:py-1.5 bg-gray-800 rounded-full text-[9px] md:text-sm text-gray-300 font-mono hover:scale-105 hover:border hover:border-blue-500 transition-all duration-300 cursor-pointer">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-3 md:p-6 border border-gray-700 animate-slide-left">
                    <h3 className="text-sm md:text-xl font-mono font-bold text-blue-400 mb-2 md:mb-4 flex items-center gap-2">
                      <Eye size={14} className="md:w-5 md:h-5" /> // SYSTEM_INFO
                    </h3>
                    <div className="space-y-1.5 md:space-y-3">
                      <div className="flex items-center gap-1.5 md:gap-3 text-gray-300 p-1 md:p-2 bg-gray-900 rounded-lg font-mono text-[10px] md:text-sm hover:border hover:border-blue-500 transition-all duration-300">
                        <MapPin size={10} className="md:w-[18px] md:h-[18px] text-blue-400" /> LOCATION: {portfolioData.location}
                      </div>
                      <div className="flex items-center gap-1.5 md:gap-3 text-gray-300 p-1 md:p-2 bg-gray-900 rounded-lg font-mono text-[10px] md:text-sm hover:border hover:border-blue-500 transition-all duration-300">
                        <Mail size={10} className="md:w-[18px] md:h-[18px] text-blue-400" /> EMAIL: {portfolioData.email}
                      </div>
                      <div className="flex items-center gap-1.5 md:gap-3 text-gray-300 p-1 md:p-2 bg-gray-900 rounded-lg font-mono text-[10px] md:text-sm hover:border hover:border-blue-500 transition-all duration-300">
                        <Phone size={10} className="md:w-[18px] md:h-[18px] text-blue-400" /> PHONE: {portfolioData.phone}
                      </div>
                    </div>
                    <div className="mt-3 md:mt-6 pt-2 md:pt-4 border-t border-gray-700">
                      <h4 className="font-mono font-semibold text-blue-400 text-[10px] md:text-sm mb-1.5 md:mb-2">// SOCIAL_LINKS</h4>
                      <div className="flex gap-1.5 md:gap-3">
                        <a href={portfolioData.social.facebook} target="_blank" className="p-1 md:p-2 bg-gray-900 rounded-lg hover:bg-blue-600 hover:text-white hover:scale-110 transition-all duration-300 text-[10px] md:text-sm">FB</a>
                        <a href={portfolioData.social.github} target="_blank" className="p-1 md:p-2 bg-gray-900 rounded-lg hover:bg-gray-600 hover:text-white hover:scale-110 transition-all duration-300 text-[10px] md:text-sm">GH</a>
                        <a href={portfolioData.social.linkedin} target="_blank" className="p-1 md:p-2 bg-gray-900 rounded-lg hover:bg-blue-700 hover:text-white hover:scale-110 transition-all duration-300 text-[10px] md:text-sm">IN</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Skills */}
            {activeTab === "skills" && (
              <div className="p-3 md:p-8">
                <div className="grid md:grid-cols-2 gap-2 md:gap-5">
                  {portfolioData.skills.map((skill, idx) => (
                    <div 
                      key={idx} 
                      ref={el => cardsRef.current[idx] = el}
                      className={`group transition-all duration-500 ${visibleCards.includes(idx) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                      style={{ transitionDelay: `${idx * 50}ms` }}
                      onMouseEnter={() => setHoveredSkill(idx)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="flex justify-between mb-0.5">
                        <span className="text-gray-300 font-mono text-[10px] md:text-sm flex items-center gap-1 md:gap-2">
                          <span className="text-xs md:text-xl group-hover:animate-bounce group-hover:scale-125 transition-transform duration-300">{skill.icon}</span> {skill.name}
                        </span>
                        <span className="text-blue-400 text-[10px] md:text-sm font-mono font-bold animate-pulse">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1 md:h-2 overflow-hidden">
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
              <div className="p-3 md:p-8">
                <div className="space-y-2 md:space-y-5">
                  {portfolioData.experience.map((exp, idx) => (
                    <div 
                      key={idx} 
                      className={`group border-l-4 border-blue-500 pl-2 md:pl-5 py-1.5 md:py-3 hover:bg-gray-800/50 rounded-r-lg transition-all duration-300 hover:scale-[1.01] cursor-pointer`}
                      onClick={(e) => handleCardClick(e, idx)}
                    >
                      <h3 className="text-xs md:text-lg font-mono font-semibold text-white group-hover:text-blue-400 transition">{exp.title}</h3>
                      <p className="text-blue-400 text-[10px] md:text-sm mb-0.5 flex items-center gap-1 md:gap-2 font-mono">
                        <Briefcase size={10} className="md:w-[14px]" /> {exp.company} // {exp.period}
                      </p>
                      <p className="text-gray-400 text-[10px] md:text-sm">{exp.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {activeTab === "education" && (
              <div className="p-3 md:p-8">
                <div className="space-y-2 md:space-y-4">
                  {portfolioData.education.map((edu, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-start gap-2 md:gap-4 p-2 md:p-4 bg-gray-800/30 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
                      onClick={(e) => handleCardClick(e, idx)}
                    >
                      <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 animate-pulse-slow group-hover:scale-110 transition">
                        <GraduationCap size={14} className="text-black md:w-[22px] md:h-[22px]" />
                      </div>
                      <div>
                        <h3 className="font-mono font-semibold text-white text-xs md:text-lg group-hover:text-blue-400 transition">{edu.degree}</h3>
                        <p className="text-gray-400 font-mono text-[10px] md:text-sm">{edu.institution}</p>
                        <p className="text-blue-400 text-[10px] md:text-sm mt-0.5 flex items-center gap-1 font-mono"><Calendar size={8} className="md:w-3 md:h-3" /> {edu.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certificates */}
            {activeTab === "certificates" && (
              <div className="p-3 md:p-8">
                <div className="grid md:grid-cols-2 gap-2 md:gap-4">
                  {portfolioData.certificates.map((cert, idx) => (
                    <div 
                      key={idx} 
                      className="group p-2 md:p-4 bg-gray-800/30 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-105 cursor-pointer"
                      onClick={(e) => handleCardClick(e, idx)}
                    >
                      <div className="flex items-start gap-1.5 md:gap-3">
                        <div className="text-xl md:text-3xl group-hover:animate-bounce group-hover:scale-125 transition">🏆</div>
                        <div>
                          <h4 className="font-mono font-semibold text-white text-[10px] md:text-sm group-hover:text-blue-400 transition">{cert.name}</h4>
                          <p className="text-gray-400 text-[9px] md:text-sm font-mono">{cert.issuer}</p>
                          <p className="text-gray-500 text-[8px] md:text-xs mt-0.5 flex items-center gap-1 font-mono"><Calendar size={7} className="md:w-2 md:h-2" /> {cert.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact */}
            {activeTab === "contact" && (
              <div className="p-3 md:p-8 text-center">
                <div className="w-14 h-14 md:w-24 md:h-24 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-3 md:mb-5 animate-bounce-slow cursor-pointer group" onClick={() => window.open(`mailto:${portfolioData.email}`)}>
                  <Mail size={20} className="text-black md:w-9 md:h-9 group-hover:scale-110 transition" />
                </div>
                <h3 className="text-base md:text-2xl font-mono font-bold text-white mb-1 md:mb-2">// CONTACT_ME</h3>
                <p className="text-gray-400 font-mono text-xs md:text-base mb-3 md:mb-6 max-w-md mx-auto px-2">Ready to collaborate on security projects or development work</p>
                <div className="space-y-1.5 max-w-sm mx-auto">
                  <div className="flex items-center gap-1.5 text-gray-300 p-1.5 bg-gray-800/50 rounded-lg font-mono text-[10px] md:text-sm hover:bg-gray-800 hover:scale-105 transition-all duration-300 cursor-pointer group" onClick={() => window.open(`mailto:${portfolioData.email}`)}>
                    <Mail size={10} className="md:w-4 md:h-4 text-blue-400 group-hover:animate-bounce" /> {portfolioData.email}
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-300 p-1.5 bg-gray-800/50 rounded-lg font-mono text-[10px] md:text-sm hover:bg-gray-800 hover:scale-105 transition-all duration-300 cursor-pointer" onClick={() => window.open(`tel:${portfolioData.phone}`)}>
                    <Phone size={10} className="md:w-4 md:h-4 text-blue-400" /> {portfolioData.phone}
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-300 p-1.5 bg-gray-800/50 rounded-lg font-mono text-[10px] md:text-sm hover:bg-gray-800 hover:scale-105 transition-all duration-300">
                    <MapPin size={10} className="md:w-4 md:h-4 text-blue-400" /> {portfolioData.location}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 md:py-8 text-center border-t border-gray-800 mt-4 md:mt-8">
        <p className="text-gray-500 text-[8px] md:text-sm font-mono flex items-center justify-center gap-1 md:gap-2 flex-wrap px-2">
          <Shield size={8} className="md:w-3 md:h-3 text-blue-400 animate-pulse" /> root@dhrx:~# ./portfolio --status=secure // CYBERSECURITY_PROFESSIONAL // 2024 🇳🇵
        </p>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(8px); opacity: 0; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-right {
          from { opacity: 0; transform: translateX(-15px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-left {
          from { opacity: 0; transform: translateX(15px); }
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
          50% { transform: translateY(-8px); }
        }
        @keyframes bounce-smooth {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 6s linear infinite; }
        .animate-scroll { animation: scroll 1.5s ease-in-out infinite; }
        .animate-fade-up { animation: fade-up 0.6s ease-out forwards; opacity: 0; }
        .animate-slide-right { animation: slide-right 0.5s ease-out forwards; opacity: 0; }
        .animate-slide-left { animation: slide-left 0.5s ease-out forwards; opacity: 0; }
        .animate-scale-up { animation: scale-up 0.5s ease-out; }
        .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-bounce-smooth { animation: bounce-smooth 0.6s ease-in-out infinite; }
        .animate-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }
      `}</style>
    </div>
  );
};

export default Portfolio;
