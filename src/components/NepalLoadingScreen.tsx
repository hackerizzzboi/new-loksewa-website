import { useState, useEffect } from "react";
import nepalMap from "@/assets/map.png";
import nepalFlag from "@/assets/flag.png";

interface NepalLoadingScreenProps {
  onComplete: () => void;
}

const NepalLoadingScreen = ({ onComplete }: NepalLoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [showFlag, setShowFlag] = useState(false);
  const [mapRotation, setMapRotation] = useState(0);
  const [hackerText, setHackerText] = useState("");

  const fullQuote = "नेपाली हामी रहौँला कहाँ, नेपालै नरहे।";
  const hackerMessages = [
    ">_ INITIALIZING SECURE CONNECTION...",
    ">_ LOADING NEPALI ENCRYPTION...",
    ">_ DECRYPTING NATIONAL DATA...",
    ">_ VERIFYING CITIZEN CREDENTIALS...",
    ">_ ACCESS GRANTED...",
    ">_ WELCOME TO NEPAL...",
    ">_ LOADING COMPLETE..."
  ];

  // Rotating map effect
  useEffect(() => {
    const rotateInterval = setInterval(() => {
      setMapRotation(prev => (prev + 2) % 360);
    }, 30);
    return () => clearInterval(rotateInterval);
  }, []);

  // Hacker text cycling
  useEffect(() => {
    let i = 0;
    const hackerInterval = setInterval(() => {
      setHackerText(hackerMessages[i % hackerMessages.length]);
      i++;
    }, 800);
    return () => clearInterval(hackerInterval);
  }, []);

  // Typing effect
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i <= fullQuote.length) {
        setTypedText(fullQuote.slice(0, i));
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

  // Show map and flag with delay
  useEffect(() => {
    const mapTimer = setTimeout(() => setShowMap(true), 300);
    const flagTimer = setTimeout(() => setShowFlag(true), 800);
    return () => {
      clearTimeout(mapTimer);
      clearTimeout(flagTimer);
    };
  }, []);

  // Loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 8;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Matrix Rain Effect - Hacker Style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute font-mono text-green-500/20 animate-matrix-rain"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
              animationDuration: `${Math.random() * 5 + 3}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            {Math.random() > 0.5 ? "01" : "10"}
          </div>
        ))}
      </div>

      {/* Animated Gold Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(150)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float-particle"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              background: '#FFD700',
              opacity: Math.random() * 0.6 + 0.2,
              animationDuration: Math.random() * 8 + 4 + 's',
              animationDelay: Math.random() * 5 + 's',
            }}
          ></div>
        ))}
      </div>

      {/* Hacker Terminal Border */}
      <div className="absolute inset-4 border border-green-500/20 rounded-2xl pointer-events-none"></div>
      <div className="absolute inset-6 border border-green-500/10 rounded-xl pointer-events-none"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto">
        
        {/* Hacker Header */}
        <div className="mb-4 font-mono text-green-500 text-xs sm:text-sm animate-pulse">
          {hackerText}
        </div>

        {/* Nepal Map - With 3D Rotation */}
        <div className={`mb-6 transition-all duration-1000 ${showMap ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-20'}`}>
          <div className="relative inline-block perspective-1000">
            <div 
              className="animate-rotate-3d"
              style={{
                transformStyle: 'preserve-3d',
                animation: 'rotate3d 3s ease-in-out infinite'
              }}
            >
              <img 
                src={nepalMap} 
                alt="Nepal Map" 
                className="w-48 h-36 sm:w-56 sm:h-44 md:w-64 md:h-52 lg:w-80 lg:h-64 mx-auto object-contain drop-shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.5))'
                }}
              />
            </div>
          </div>
        </div>

        {/* Quote - Red Text with Glitch Effect */}
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-red-500 leading-relaxed animate-glitch">
            {typedText}
            <span className={`inline-block w-0.5 h-6 sm:h-7 md:h-8 bg-red-500 ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
          </h1>
        </div>

        {/* Nepal Flag - With Wave and Glow */}
        <div className={`mb-8 transition-all duration-1000 ${showFlag ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-20'}`}>
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-blue-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <img 
              src={nepalFlag} 
              alt="Nepal Flag" 
              className="w-32 h-28 sm:w-40 sm:h-36 md:w-48 md:h-44 lg:w-56 lg:h-52 mx-auto object-contain animate-flag-wave drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Hacker-Style Progress Bar */}
        <div className="w-40 sm:w-56 md:w-64 mx-auto mt-4">
          <div className="relative">
            <div className="flex justify-between text-green-500 text-[8px] sm:text-xs font-mono mb-1">
              <span>[</span>
              <span>LOADING_SEQUENCE</span>
              <span>]</span>
            </div>
            <div className="h-2 bg-gray-900 rounded-full overflow-hidden border border-green-500/30">
              <div 
                className="h-full bg-gradient-to-r from-green-500 via-yellow-400 to-red-500 rounded-full transition-all duration-300 relative"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
              </div>
            </div>
            <div className="flex justify-between mt-1 text-green-500 text-[8px] sm:text-xs font-mono">
              <span>{Math.floor(Math.min(progress, 100))}%</span>
              <span className="animate-pulse">{">_"}</span>
            </div>
          </div>
        </div>

        {/* Loading Dots - Hacker Style */}
        <div className="flex justify-center gap-2 mt-4">
          {[0, 1, 2, 3, 4].map(i => (
            <div 
              key={i} 
              className="w-1.5 h-1.5 rounded-full animate-bounce-smooth" 
              style={{ 
                backgroundColor: '#00FF00',
                animationDelay: `${i * 0.15}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes rotate3d {
          0% { transform: rotateY(0deg) rotateX(0deg); }
          25% { transform: rotateY(15deg) rotateX(5deg); }
          75% { transform: rotateY(-15deg) rotateX(-5deg); }
          100% { transform: rotateY(0deg) rotateX(0deg); }
        }
        @keyframes matrix-rain {
          0% { transform: translateY(-100vh); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes glitch {
          0%, 100% { transform: skew(0deg); text-shadow: 0 0 5px rgba(255,0,0,0.5); }
          20% { transform: skew(2deg); text-shadow: -2px 0 5px rgba(0,255,0,0.5); }
          40% { transform: skew(-2deg); text-shadow: 2px 0 5px rgba(0,0,255,0.5); }
          60% { transform: skew(1deg); text-shadow: 0 -2px 5px rgba(255,255,0,0.5); }
          80% { transform: skew(-1deg); text-shadow: 0 2px 5px rgba(0,255,255,0.5); }
        }
        @keyframes float-particle {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.15); }
        }
        @keyframes flag-wave {
          0%, 100% { transform: skewX(0deg); }
          25% { transform: skewX(4deg); }
          75% { transform: skewX(-4deg); }
        }
        @keyframes bounce-smooth {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-rotate-3d { animation: rotate3d 3s ease-in-out infinite; transform-style: preserve-3d; }
        .animate-matrix-rain { animation: matrix-rain 6s linear infinite; }
        .animate-glitch { animation: glitch 2s ease-in-out infinite; }
        .animate-float-particle { animation: float-particle 8s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-flag-wave { animation: flag-wave 2s ease-in-out infinite; transform-origin: center; }
        .animate-bounce-smooth { animation: bounce-smooth 0.6s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 1.5s ease-in-out infinite; }
        .perspective-1000 { perspective: 1000px; }
        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
};

export default NepalLoadingScreen;
