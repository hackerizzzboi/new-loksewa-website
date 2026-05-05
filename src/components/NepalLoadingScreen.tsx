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
    }, 80);
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
          setTimeout(onComplete, 600);
          return 100;
        }
        return prev + Math.random() * 6;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-[9999] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              background: `rgba(255, ${Math.random() * 100 + 155}, 100, ${Math.random() * 0.3 + 0.1})`,
              animationDuration: Math.random() * 10 + 5 + 's',
              animationDelay: Math.random() * 5 + 's',
            }}
          ></div>
        ))}
      </div>

      {/* Soft Glowing Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-orange-500/5 animate-pulse-slow blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-red-500/5 animate-pulse-slow delay-1500 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-yellow-500/5 animate-pulse-slow delay-3000 blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto">
        
        {/* Nepal Map - Elegant Entrance */}
        <div className={`mb-8 transition-all duration-1000 ${showMap ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-16'}`}>
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative">
              <img 
                src={nepalMap} 
                alt="Nepal Map" 
                className="w-48 h-36 sm:w-56 sm:h-44 md:w-72 md:h-56 lg:w-80 lg:h-64 mx-auto object-contain drop-shadow-2xl animate-float-gentle"
              />
            </div>
          </div>
        </div>

        {/* Quote - Elegant Typography */}
        <div className="mb-10">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 blur-xl rounded-full"></div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white/90 leading-relaxed tracking-wide">
              {typedText}
              <span className={`inline-block w-0.5 h-6 sm:h-7 md:h-8 bg-orange-400 ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
            </h1>
          </div>
        </div>

        {/* Nepal Flag - Smooth Wave */}
        <div className={`mb-10 transition-all duration-1000 ${showFlag ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-16'}`}>
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
            <img 
              src={nepalFlag} 
              alt="Nepal Flag" 
              className="w-32 h-28 sm:w-40 sm:h-36 md:w-52 md:h-48 lg:w-60 lg:h-56 mx-auto object-contain drop-shadow-xl animate-flag-smooth"
            />
          </div>
        </div>

        {/* Premium Progress Bar */}
        <div className="w-48 sm:w-64 md:w-80 mx-auto mt-6">
          <div className="relative">
            {/* Progress Bar Label */}
            <div className="flex justify-between text-gray-400 text-[10px] sm:text-xs tracking-wider mb-1.5 px-1">
              <span>INITIALIZING</span>
              <span>{Math.floor(Math.min(progress, 100))}%</span>
            </div>
            
            {/* Bar Container */}
            <div className="h-1 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm">
              <div 
                className="h-full bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 rounded-full transition-all duration-300 relative"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
              </div>
            </div>
            
            {/* Decorative Dots */}
            <div className="flex justify-center gap-1.5 mt-3">
              {[0, 1, 2].map(i => (
                <div 
                  key={i} 
                  className="w-1 h-1 rounded-full transition-all duration-300"
                  style={{ 
                    backgroundColor: progress >= 33 * (i + 1) ? '#F97316' : '#374151',
                    transitionDelay: `${i * 0.1}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Elegant Loading Indicator */}
        <div className="flex justify-center items-center gap-3 mt-5">
          <div className="flex gap-1.5">
            {[0, 1, 2].map(i => (
              <div 
                key={i} 
                className="w-1 h-1 rounded-full animate-loading-dot" 
                style={{ 
                  backgroundColor: '#F97316',
                  animationDelay: `${i * 0.2}s`
                }}
              ></div>
            ))}
          </div>
          <span className="text-gray-500 text-[10px] tracking-wider font-light">LOADING</span>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
        }
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        @keyframes flag-smooth {
          0%, 100% { transform: skewX(0deg); }
          25% { transform: skewX(1.5deg); }
          75% { transform: skewX(-1.5deg); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes loading-dot {
          0%, 100% { transform: scale(0.3); opacity: 0.3; }
          50% { transform: scale(1); opacity: 1; }
        }
        .animate-float { animation: float 12s linear infinite; }
        .animate-float-gentle { animation: float-gentle 3s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-flag-smooth { animation: flag-smooth 2.5s ease-in-out infinite; transform-origin: center; }
        .animate-shimmer { animation: shimmer 1.5s ease-in-out infinite; }
        .animate-loading-dot { animation: loading-dot 1s ease-in-out infinite; }
        .delay-1500 { animation-delay: 1.5s; }
        .delay-3000 { animation-delay: 3s; }
      `}</style>
    </div>
  );
};

export default NepalLoadingScreen;
