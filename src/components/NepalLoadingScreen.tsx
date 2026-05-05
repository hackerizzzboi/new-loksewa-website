import { useState, useEffect } from "react";

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
    const mapTimer = setTimeout(() => setShowMap(true), 500);
    const flagTimer = setTimeout(() => setShowFlag(true), 1000);
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
    <div className="fixed inset-0 bg-gradient-to-br from-red-600 via-white to-red-600 z-50 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto w-full">
        
        {/* Nepal Map - Above Quote */}
        <div className={`mb-6 transform transition-all duration-1000 ${showMap ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-blue-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <svg 
              viewBox="0 0 200 150" 
              className="w-48 h-36 md:w-80 md:h-60 lg:w-96 lg:h-72 mx-auto drop-shadow-2xl animate-float"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Nepal Map Shape - Simplified silhouette of Nepal */}
              <path 
                d="M40,80 L50,60 L65,50 L80,45 L95,40 L110,42 L125,45 L135,50 L145,55 L155,65 L160,75 L162,85 L158,95 L150,105 L140,110 L125,115 L110,118 L95,120 L80,118 L65,115 L55,108 L48,100 L42,92 L40,85 Z" 
                fill="#DC143C" 
                stroke="#003893" 
                strokeWidth="2.5"
                className="animate-draw"
              />
              {/* Mountains/Himalayas */}
              <path d="M60,55 L70,40 L80,55 L90,42 L100,55 L110,38 L120,55 L130,45 L140,55" stroke="#003893" strokeWidth="2" fill="none" className="animate-mountain"/>
              {/* Sun */}
              <circle cx="150" cy="45" r="6" fill="#FFD700" className="animate-pulse-slow"/>
            </svg>
          </div>
          <p className="text-red-700 text-xs md:text-sm font-mono mt-2 animate-pulse">🏔️ हिमालयको काखमा 🏔️</p>
        </div>

        {/* Quote */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="absolute -inset-2 bg-gradient-to-r from-red-500/20 to-blue-500/20 blur-xl rounded-full"></div>
            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-red-700 leading-relaxed relative z-10 font-hindi">
              {typedText}
              <span className={`inline-block w-0.5 h-5 md:h-8 bg-red-600 ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
            </h1>
          </div>
        </div>

        {/* Nepal Flag - Below Quote */}
        <div className={`mb-8 transform transition-all duration-1000 ${showFlag ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative inline-block group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-blue-600 rounded-lg blur-2xl opacity-50 animate-pulse"></div>
            <div className="relative w-32 h-28 md:w-48 md:h-40 lg:w-64 lg:h-52 mx-auto animate-flag-wave">
              <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-2xl">
                {/* Nepal Flag Shape */}
                <polygon 
                  points="30,10 70,10 70,40 90,40 70,60 90,80 70,80 70,110 30,110 30,10" 
                  fill="#DC143C" 
                  stroke="#003893" 
                  strokeWidth="2"
                  className="animate-draw-flag"
                />
                {/* Blue Border */}
                <polygon 
                  points="28,8 72,8 72,38 92,38 72,58 92,78 72,78 72,112 28,112 28,8" 
                  fill="none" 
                  stroke="#003893" 
                  strokeWidth="3.5"
                />
                {/* Sun */}
                <circle cx="50" cy="55" r="10" fill="white" className="animate-spin-slow"/>
                {/* Moon */}
                <path d="M50,38 Q58,50 50,62 Q42,50 50,38" fill="white"/>
                <circle cx="50" cy="47" r="4" fill="#DC143C"/>
                {/* Stars */}
                <circle cx="50" cy="28" r="1.5" fill="white" className="animate-twinkle"/>
                <circle cx="50" cy="82" r="1.5" fill="white" className="animate-twinkle delay-500"/>
                <circle cx="32" cy="55" r="1.5" fill="white" className="animate-twinkle delay-1000"/>
                <circle cx="68" cy="55" r="1.5" fill="white" className="animate-twinkle delay-1500"/>
                <circle cx="38" cy="38" r="1" fill="white" className="animate-twinkle"/>
                <circle cx="62" cy="38" r="1" fill="white" className="animate-twinkle delay-500"/>
                <circle cx="38" cy="72" r="1" fill="white" className="animate-twinkle delay-1000"/>
                <circle cx="62" cy="72" r="1" fill="white" className="animate-twinkle delay-1500"/>
              </svg>
            </div>
            <div className="absolute -left-2 top-0 w-2 h-28 md:h-40 lg:h-52 bg-gradient-to-b from-blue-600 to-red-600 rounded-full animate-flag-pole"></div>
          </div>
          <p className="text-blue-700 text-xs md:text-sm font-mono mt-3 animate-pulse">🇳🇵 जय नेपाल 🇳🇵</p>
        </div>

        {/* Progress Bar */}
        <div className="w-48 md:w-64 lg:w-80 mx-auto mt-4">
          <div className="h-1 bg-gray-300 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-600 to-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes flag-wave {
          0%, 100% { transform: skewX(0deg); }
          50% { transform: skewX(2deg); }
        }
        @keyframes flag-pole {
          0%, 100% { height: 112px; }
          50% { height: 116px; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes draw {
          0% { stroke-dasharray: 300; stroke-dashoffset: 300; fill-opacity: 0; }
          100% { stroke-dasharray: 300; stroke-dashoffset: 0; fill-opacity: 1; }
        }
        @keyframes mountain {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-flag-wave { animation: flag-wave 2s ease-in-out infinite; }
        .animate-flag-pole { animation: flag-pole 2s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 4s linear infinite; }
        .animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
        .animate-draw { animation: draw 1.5s ease-out forwards; stroke-dasharray: 300; stroke-dashoffset: 300; }
        .animate-draw-flag { animation: draw 1s ease-out forwards; stroke-dasharray: 200; stroke-dashoffset: 200; }
        .animate-mountain { animation: mountain 3s ease-in-out infinite; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-1000 { animation-delay: 1s; }
        .delay-1500 { animation-delay: 1.5s; }
        @media (min-width: 768px) {
          .animate-flag-pole { height: 160px; }
          @keyframes flag-pole {
            0%, 100% { height: 160px; }
            50% { height: 165px; }
          }
        }
        @media (min-width: 1024px) {
          .animate-flag-pole { height: 208px; }
          @keyframes flag-pole {
            0%, 100% { height: 208px; }
            50% { height: 215px; }
          }
        }
      `}</style>
    </div>
  );
};

export default NepalLoadingScreen;
