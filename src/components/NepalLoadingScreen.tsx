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

  const fullQuote = "नेपाली हामी रहौँला कहाँ, नेपालै नरहे।";

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
    <div className="fixed inset-0 bg-gradient-to-br from-red-700 via-red-500 to-red-700 z-50 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Animated Particles - Gold and White */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float-particle"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              background: i % 2 === 0 ? '#FFD700' : '#FFFFFF',
              opacity: Math.random() * 0.6 + 0.2,
              animationDuration: Math.random() * 5 + 3 + 's',
              animationDelay: Math.random() * 5 + 's',
            }}
          ></div>
        ))}
      </div>

      {/* Animated Glowing Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-yellow-500/20 animate-pulse-slow blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-white/20 animate-pulse-slow delay-1000 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-red-500/20 animate-pulse-slow delay-2000 blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto w-full">
        
        {/* Nepal Map */}
        <div className={`mb-8 transition-all duration-1000 ${showMap ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-20'}`}>
          <div className="relative inline-block">
            {/* Glow ring */}
            <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500 to-white rounded-full blur-2xl opacity-60 animate-pulse"></div>
            <div className="relative">
              <img 
                src={nepalMap} 
                alt="Nepal Map" 
                className="w-56 h-44 md:w-80 md:h-64 lg:w-96 lg:h-80 mx-auto object-contain"
                style={{
                  filter: 'drop-shadow(0 0 30px rgba(255,215,0,0.8)) brightness(1.1)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Quote with Glass Effect */}
        <div className="mb-10">
          <div className="relative inline-block">
            {/* Rainbow glow behind quote */}
            <div className="absolute -inset-4 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 rounded-2xl blur-2xl opacity-60 animate-spin-slow"></div>
            
            <div className="relative bg-black/30 backdrop-blur-md px-6 py-4 md:px-10 md:py-6 rounded-2xl border border-white/30 shadow-2xl">
              <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-white leading-relaxed">
                {typedText}
                <span className={`inline-block w-0.5 h-6 md:h-9 bg-yellow-400 ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
              </h1>
            </div>
          </div>
        </div>

        {/* Nepal Flag */}
        <div className={`mb-10 transition-all duration-1000 ${showFlag ? 'opacity-100 scale-100 translate-y-0 rotate-0' : 'opacity-0 scale-50 translate-y-20 rotate-12'}`}>
          <div className="relative inline-block">
            {/* Multiple glow rings */}
            <div className="absolute -inset-6 bg-gradient-to-r from-red-600 to-blue-600 rounded-full blur-2xl opacity-60 animate-pulse-slow"></div>
            <div className="absolute -inset-3 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full blur-xl opacity-40 animate-pulse"></div>
            
            <div className="relative">
              <img 
                src={nepalFlag} 
                alt="Nepal Flag" 
                className="w-40 h-36 md:w-56 md:h-52 lg:w-72 lg:h-68 mx-auto object-contain animate-flag-wave"
                style={{
                  filter: 'drop-shadow(0 0 40px rgba(255,215,0,0.9)) brightness(1.15) contrast(1.1)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 md:w-96 mx-auto mt-4">
          <div className="relative">
            <div className="h-1.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 via-white to-yellow-400 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                <div className="absolute inset-0 bg-white/50 animate-shimmer"></div>
              </div>
            </div>
            <div className="absolute -top-6 right-0">
              <span className="text-xs font-bold text-yellow-300">{Math.floor(Math.min(progress, 100))}%</span>
            </div>
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center gap-2 mt-5">
          {[0, 1, 2, 3, 4].map(i => (
            <div 
              key={i} 
              className="w-2 h-2 rounded-full animate-bounce-smooth" 
              style={{ 
                backgroundColor: '#FFD700',
                animationDelay: `${i * 0.15}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float-particle {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes flag-wave {
          0%, 100% { transform: skewX(0deg); }
          25% { transform: skewX(3deg); }
          75% { transform: skewX(-3deg); }
        }
        @keyframes bounce-smooth {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-float-particle { animation: float-particle 8s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 6s linear infinite; }
        .animate-flag-wave { animation: flag-wave 2s ease-in-out infinite; transform-origin: center; }
        .animate-bounce-smooth { animation: bounce-smooth 0.6s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 1.5s ease-in-out infinite; }
        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
};

export default NepalLoadingScreen;
