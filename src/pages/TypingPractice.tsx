import { useState, useEffect, useCallback, useRef } from "react";

const englishTexts = [
  "The quick brown fox jumps over the lazy dog near the river bank.",
  "Computer operators must type accurately and quickly for government exams.",
  "Nepal is a beautiful country located between India and China in South Asia.",
  "Information technology has transformed the way we work and communicate daily.",
  "The Public Service Commission conducts examinations for civil service posts.",
  "Database management systems help organize and retrieve data efficiently.",
  "Cybersecurity is essential to protect digital assets from malicious attacks.",
  "Operating systems manage computer hardware and software resources effectively.",
];

const nepaliTexts = [
  "नेपाल एक सुन्दर देश हो जुन दक्षिण एसियामा अवस्थित छ।",
  "लोकसेवा आयोगले विभिन्न पदहरूको लागि प्रतियोगितात्मक परीक्षा सञ्चालन गर्छ।",
  "कम्प्युटरले हाम्रो दैनिक जीवनलाई धेरै सजिलो बनाएको छ।",
  "सूचना प्रविधिको विकासले नेपालको शासन प्रणालीमा सुधार ल्याएको छ।",
  "सुशासन भनेको पारदर्शी र जवाफदेही सरकारी व्यवस्थापन हो।",
];

const TypingPractice = () => {
  const [mode, setMode] = useState<"english" | "nepali">("english");
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const pickText = useCallback(() => {
    const texts = mode === "english" ? englishTexts : nepaliTexts;
    setText(texts[Math.floor(Math.random() * texts.length)]);
    setInput("");
    setStarted(false);
    setFinished(false);
    setWpm(0);
    setAccuracy(100);
    setTimeElapsed(0);
  }, [mode]);

  useEffect(() => { pickText(); }, [pickText]);

  useEffect(() => {
    if (!started || finished) return;
    const interval = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [started, finished, startTime]);

  const handleInput = (val: string) => {
    if (!started) {
      setStarted(true);
      setStartTime(Date.now());
    }
    setInput(val);

    // Calculate accuracy
    let correct = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] === text[i]) correct++;
    }
    const acc = val.length > 0 ? (correct / val.length) * 100 : 100;
    setAccuracy(Math.round(acc));

    // Check completion
    if (val.length >= text.length) {
      setFinished(true);
      const elapsed = (Date.now() - startTime) / 60000; // minutes
      const words = text.split(" ").length;
      setWpm(Math.round(words / elapsed));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl animate-fade-in">
      <h1 className="text-2xl font-heading font-bold mb-2">⌨️ Typing Practice</h1>
      <p className="text-muted-foreground mb-6">टाइपिङ गति र शुद्धता सुधार गर्नुहोस्।</p>

      <div className="flex gap-3 mb-6">
        <button onClick={() => { setMode("english"); }} className={`px-5 py-2 rounded-xl font-semibold transition-colors ${mode === "english" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
          English
        </button>
        <button onClick={() => { setMode("nepali"); }} className={`px-5 py-2 rounded-xl font-semibold transition-colors ${mode === "nepali" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
          नेपाली
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-card rounded-xl p-4 text-center shadow-sm">
          <p className="text-2xl font-heading font-bold text-primary">{wpm}</p>
          <p className="text-xs text-muted-foreground">WPM</p>
        </div>
        <div className="bg-card rounded-xl p-4 text-center shadow-sm">
          <p className="text-2xl font-heading font-bold text-success">{accuracy}%</p>
          <p className="text-xs text-muted-foreground">Accuracy</p>
        </div>
        <div className="bg-card rounded-xl p-4 text-center shadow-sm">
          <p className="text-2xl font-heading font-bold text-accent">{timeElapsed}s</p>
          <p className="text-xs text-muted-foreground">Time</p>
        </div>
      </div>

      {/* Text display */}
      <div className="bg-card rounded-2xl shadow-md p-6 mb-4 font-mono text-lg leading-relaxed">
        {text.split("").map((char, i) => {
          let cls = "text-muted-foreground/40";
          if (i < input.length) {
            cls = input[i] === char ? "typing-char-correct" : "typing-char-wrong";
          } else if (i === input.length) {
            cls = "typing-char-current";
          }
          return <span key={i} className={cls}>{char}</span>;
        })}
      </div>

      <textarea
        ref={inputRef}
        value={input}
        onChange={(e) => handleInput(e.target.value)}
        disabled={finished}
        placeholder={started ? "" : "Start typing here..."}
        className="w-full bg-card border rounded-xl p-4 font-mono text-lg resize-none h-24 focus:ring-2 focus:ring-primary focus:outline-none"
        autoFocus
      />

      {finished && (
        <div className="mt-6 text-center bg-success/10 rounded-2xl p-6">
          <h2 className="text-xl font-heading font-bold text-success mb-2">🎉 Completed!</h2>
          <p className="text-lg">Speed: <strong>{wpm} WPM</strong> | Accuracy: <strong>{accuracy}%</strong></p>
          <button onClick={pickText} className="mt-4 bg-primary text-primary-foreground px-8 py-2.5 rounded-xl font-semibold hover:opacity-90 transition-opacity">
            Try Again
          </button>
        </div>
      )}

      {!finished && (
        <button onClick={pickText} className="mt-4 bg-muted px-6 py-2 rounded-xl font-semibold hover:bg-muted/80 transition-colors">
          🔄 New Text
        </button>
      )}
    </div>
  );
};

export default TypingPractice;
