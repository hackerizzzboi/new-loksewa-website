import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const systemIntro = `I am **Dhiraj AI** 🤖 — your Loksewa study buddy. How can I help you today? Ask me anything about Computer Operator, IT Officer or general Loksewa topics!`;

const getAIResponse = (msg: string): string => {
  const lower = msg.toLowerCase();
  if (lower.includes("cpu") || lower.includes("processor")) {
    return "**CPU (Central Processing Unit)** = ALU + CU + Registers\n\n• ALU: Arithmetic & Logic operations\n• CU: Controls all operations\n• Registers: Small, fast storage in CPU\n\nCPU is called the 'brain of the computer'.\n\n**Example MCQ:**\nWhich part of CPU performs arithmetic operations?\nA) CU  B) **ALU** ✓  C) Register  D) Cache";
  }
  if (lower.includes("osi") || lower.includes("layer")) {
    return "**OSI Model has 7 Layers:**\n\n1. Physical\n2. Data Link\n3. Network\n4. Transport\n5. Session\n6. Presentation\n7. Application\n\n**याद गर्ने तरिका:** *Please Do Not Throw Sausage Pizza Away*\n\n**TCP/IP Model has 4 Layers:**\n1. Network Access\n2. Internet\n3. Transport\n4. Application";
  }
  if (lower.includes("sql") || lower.includes("database") || lower.includes("dbms")) {
    return "**SQL Commands:**\n\n• **DDL** (Data Definition): CREATE, ALTER, DROP\n• **DML** (Data Manipulation): SELECT, INSERT, UPDATE, DELETE\n• **DCL** (Data Control): GRANT, REVOKE\n\n**Primary Key** = Unique identifier for each row\n**Foreign Key** = Links two tables\n\n**Example:** `SELECT * FROM students WHERE marks > 50;`";
  }
  if (lower.includes("eta") || lower.includes("electronic transaction") || lower.includes("ऐन") || lower.includes("कानून")) {
    return "**Electronic Transaction Act (ETA), 2063 BS:**\n\n• Digital signature लाई कानूनी मान्यता\n• Cyber crime को सजाय\n• E-commerce regulation\n• Data protection provisions\n\n**ICT Policy, 2072:**\n• E-Governance promotion\n• IT infrastructure development\n• Digital literacy";
  }
  if (lower.includes("excel") || lower.includes("function") || lower.includes("formula")) {
    return "**Important Excel Functions:**\n\n• `=SUM(A1:A10)` - जोड\n• `=AVERAGE(A1:A10)` - औसत\n• `=IF(A1>50,\"Pass\",\"Fail\")` - Condition\n• `=VLOOKUP(value,range,col,FALSE)` - Lookup\n• `=COUNTIF(A:A,\">50\")` - Count with condition\n• `=CONCATENATE(A1,\" \",B1)` - Text join\n\n**Shortcut:** Ctrl+; = Current Date";
  }
  if (lower.includes("html") || lower.includes("web") || lower.includes("tag")) {
    return "**HTML Basics:**\n\n```html\n<html>\n<head><title>Page Title</title></head>\n<body>\n  <h1>Heading</h1>\n  <p>Paragraph</p>\n  <a href=\"url\">Link</a>\n  <img src=\"image.jpg\">\n</body>\n</html>\n```\n\n**Important Tags:** h1-h6, p, a, img, table, tr, td, form, input, div, span\n\n**CSS** = Cascading Style Sheets (styling)";
  }
  return "राम्रो प्रश्न! 🤔 म तपाईँलाई Loksewa सम्बन्धी कुनै पनि विषयमा मद्दत गर्न सक्छु:\n\n• 💻 Computer Fundamentals\n• 🌐 Networking & Web\n• 📊 Excel & Word\n• 🗄️ Database (SQL)\n• ⚖️ IT Laws (ETA, ICT Policy)\n• 🔒 Cyber Security\n• 🌍 General Knowledge\n\nकुनै विषय सोध्नुहोस्! 📚";
};

const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: systemIntro },
  ]);
  const [input, setInput] = useState("");
  const messagesEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const response = getAIResponse(input);
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
    }, 500);
  };

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-110 transition-transform animate-pulse-glow z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-6 right-6 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-4rem)] bg-card rounded-2xl shadow-2xl flex flex-col z-50 border border-border overflow-hidden">
          {/* Header */}
          <div className="hero-gradient text-primary-foreground p-4 flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-sm">Dhiraj AI 🤖</h3>
              <p className="text-xs opacity-80">Online · Loksewa expert</p>
            </div>
            <button onClick={() => setOpen(false)} className="hover:bg-primary-foreground/20 rounded-lg p-1 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                  m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}>
                  <div className="whitespace-pre-wrap">{m.content.replace(/\*\*(.*?)\*\*/g, "$1")}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEnd} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask anything about Loksewa..."
                className="flex-1 bg-muted rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button onClick={send} className="bg-primary text-primary-foreground rounded-xl p-2.5 hover:opacity-90 transition-opacity">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
