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
  const [bgColor, setBgColor] = useState(0);

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

  // Background color cycling
  useEffect(() => {
    const colorInterval = setInterval(() => {
      setBgColor(prev => (prev + 1) % 6);
    }, 4000);
    return () => clearInterval(colorInterval);
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

  const bgGradients = [
    "from-red-700 via-red-500 to-red-700",
    "from-blue-700 via-blue-500 to-blue-700",
    "from-purple-700 via-purple-500 to-purple-700",
    "from-green-700 via-green-500 to-green-700",
    "from-orange-700 via-orange-500 to-orange-700",
    "from-pink-700 via-pink-500 to-pink-700"
  ];

  return (
    <div className={`fixed inset-0 bg-gradient-to-br ${bgGradients[bgColor]} z-50 flex flex-col items-center justify-center overflow-hidden transition-all duration-1000`}>
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float-particle"
            style={{
              width: Math.random() * 8 + 3 + 'px',
              height: Math.random() * 8 + 3 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              background: i % 2 === 0 ? 'rgba(255,255,255,0.6)' : 'rgba(255,215,0,0.6)',
              animationDuration: Math.random() * 6 + 4 + 's',
              animationDelay: Math.random() * 5 + 's',
            }}
          ></div>
        ))}
      </div>

      {/* Animated Shape Backgrounds */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-white/5 animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-yellow-500/10 animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-white/5 animate-pulse-slow delay-2000"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto w-full">
        
        {/* Nepal Map - Above Quote with Huge Glow Effect */}
        <div className={`mb-10 transform transition-all duration-1000 ${showMap ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-50'}`}>
          <div className="relative inline-block group cursor-pointer">
            {/* Multiple Glow Layers */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-yellow-500 rounded-3xl blur-3xl opacity-60 animate-pulse-slow group-hover:opacity-100 transition-all duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-white to-yellow-300 rounded-3xl blur-2xl opacity-40 animate-spin-slow"></div>
            <div className="absolute inset-0 bg-white/30 rounded-3xl blur-xl animate-pulse"></div>
            
            {/* Image Container with Transparent Background Blend */}
            <div className="relative bg-gradient-to-br from-red-600/20 to-blue-600/20 rounded-3xl p-4 backdrop-blur-sm">
              <div className="relative animate-float">
                <img 
                  src={nepalMap} 
                  alt="Nepal Map" 
                  className="w-56 h-44 md:w-96 md:h-72 lg:w-[450px] lg:h-[340px] mx-auto object-contain drop-shadow-2xl rounded-2xl"
                  style={{
                    filter: 'drop-shadow(0 0 30px rgba(255,215,0,0.6)) brightness(1.1) contrast(1.1)',
                    mixBlendMode: 'multiply'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quote with Double Rainbow Effect */}
        <div className="mb-10">
          <div className="relative inline-block">
            {/* Outer Rainbow Ring */}
            <div className="absolute -inset-6 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-70 animate-spin-slow"></div>
            {/* Inner Glow */}
            <div className="absolute -inset-3 bg-gradient-to-r from-red-500 to-blue-500 rounded-2xl blur-xl opacity-50 animate-pulse-slow"></div>
            
            {/* Quote Box with Glassmorphism */}
            <div className="relative bg-white/20 backdrop-blur-md px-6 py-5 md:px-10 md:py-7 rounded-2xl shadow-2xl border border-white/30">
              <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-white leading-relaxed drop-shadow-lg animate-text-glow">
                {typedText}
                <span className={`inline-block w-0.5 h-6 md:h-9 bg-white ml-1 ${cursorVisible ? 'opacity-100 animate-pulse' : 'opacity-0'}`}></span>
              </h1>
            </div>
          </div>
        </div>

        {/* Nepal Flag - Below Quote with Spectacular Animation */}
        <div className={`mb-10 transform transition-all duration-1000 ${showFlag ? 'translate-y-0 opacity-100 scale-100 rotate-0' : 'translate-y-20 opacity-0 scale-50 rotate-12'}`}>
          <div className="relative inline-block group cursor-pointer">
            {/* Crazy Glow Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-white to-blue-600 rounded-3xl blur-3xl opacity-60 animate-pulse-slow group-hover:opacity-100 transition-all duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-red-500 rounded-3xl blur-2xl opacity-40 animate-spin-slow"></div>
            <div className="absolute -inset-4 bg-gradient-to-r from-red-500 to-blue-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            
            {/* Flag Container */}
            <div className="relative bg-gradient-to-br from-red-600/20 to-blue-600/20 rounded-3xl p-4 backdrop-blur-sm">
              <div className="relative animate-flag-wave">
                <img 
                  src={nepalFlag} 
                  alt="Nepal Flag" 
                  className="w-40 h-36 md:w-60 md:h-56 lg:w-80 lg:h-72 mx-auto object-contain drop-shadow-2xl rounded-xl"
                  style={{
                    filter: 'drop-shadow(0 0 40px rgba(255,215,0,0.7)) brightness(1.15) saturate(1.2)',
                    mixBlendMode: 'multiply'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Animated Progress Bar with Glow */}
        <div className="w-64 md:w-80 lg:w-96 mx-auto mt-6">
          <div className="relative">
            <div className="h-2 bg-white/30 rounded-full overflow-hidden shadow-inner backdrop-blur-sm">
              <div 
                className="h-full bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 rounded-full transition-all duration-300 relative"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                <div className="absolute inset-0 bg-white/40 animate-shimmer"></div>
              </div>
            </div>
            {/* Progress Percentage with Glow */}
            <div className="absolute -top-7 right-0">
              <span className="text-xs font-bold text-white drop-shadow-lg animate-pulse">{Math.floor(Math.min(progress, 100))}%</span>
            </div>
          </div>
        </div>

        {/* Animated Loading Dots */}
        <div className="flex justify-center gap-3 mt-6">
          {[0, 1, 2, 3, 4].map(i => (
            <div 
              key={i} 
              className="w-2.5 h-2.5 rounded-full animate-bounce-smooth" 
              style={{ 
                background: i % 2 === 0 ? '#FFD700' : '#FFFFFF',
                boxShadow: '0 0 10px rgba(255,215,0,0.8)',
                animationDelay: `${i * 0.15}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-12px) scale(1.02); }
        }
        @keyframes flag-wave {
          0%, 100% { transform: skewX(0deg) scale(1); }
          25% { transform: skewX(4deg) scale(1.03); }
          75% { transform: skewX(-4deg) scale(1.03); }
        }
        @keyframes float-particle {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.15); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-smooth {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 10px rgba(255,255,255,0.5); }
          50% { text-shadow: 0 0 30px rgba(255,255,255,0.9); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-flag-wave { animation: flag-wave 2s ease-in-out infinite; transform-origin: center; }
        .animate-float-particle { animation: float-particle 8s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 6s linear infinite; }
        .animate-bounce-smooth { animation: bounce-smooth 0.8s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 1.5s ease-in-out infinite; }
        .animate-text-glow { animation: text-glow 1.5s ease-in-out infinite; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-800 { animation-delay: 0.8s; }
        .delay-1000 { animation-delay: 1s; }
      `}</style>
    </div>
  );
};

export default NepalLoadingScreen;
