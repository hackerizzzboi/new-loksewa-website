import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useNepalTime, useCountdown } from "@/hooks/useNepalTime";
import { practiceSubjects, motivationalQuotes } from "@/data/questions";
import dhirajPhoto from "@/assets/dhiraj-photo.jpg";

// Ashad 7, 2082 BS ≈ June 22, 2026 AD
const EXAM_DATE = new Date("2026-06-22T10:00:00+05:45");

const quickAccess = [
  { label: "Practice", icon: "❓", path: "/practice", color: "quick-card-red" },
  { label: "Old is Gold", icon: "🏆", path: "/old-is-gold", color: "quick-card-green" },
  { label: "अनलाइन परीक्षा", icon: "📝", path: "/online-exam", color: "quick-card-teal" },
  { label: "Syllabus", icon: "📋", path: "/syllabus", color: "quick-card-purple" },
  { label: "Typing", icon: "⌨️", path: "/typing", color: "quick-card-amber" },
  { label: "Notes", icon: "📒", path: "/notes", color: "quick-card-navy" },
  { label: "PSC News", icon: "📰", path: "/news", color: "quick-card-pink" },
];

const importantLinks = [
  { name: "PSC Nepal", desc: "psc.gov.np — Official Commission", url: "https://psc.gov.np", icon: "🏛️" },
  { name: "MoCIT Nepal", desc: "Ministry of Communications & IT", url: "https://mocit.gov.np", icon: "🏢" },
  { name: "NITC Nepal", desc: "National IT Center", url: "https://nitc.gov.np", icon: "🖥️" },
  { name: "DoIT", desc: "Department of IT", url: "https://doit.gov.np", icon: "📡" },
  { name: "NTA", desc: "Nepal Telecom Authority", url: "https://nta.gov.np", icon: "📶" },
];

const Index = () => {
  const { timeStr, dateStr } = useNepalTime();
  const countdown = useCountdown(EXAM_DATE);
  const quote = useMemo(() => motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)], []);

  // Age converter
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [ageResult, setAgeResult] = useState<string | null>(null);

  const calculateAge = () => {
    if (!birthYear || !birthMonth || !birthDay) return;
    const bd = new Date(parseInt(birthYear), parseInt(birthMonth) - 1, parseInt(birthDay));
    const now = new Date();
    let years = now.getFullYear() - bd.getFullYear();
    let months = now.getMonth() - bd.getMonth();
    let days = now.getDate() - bd.getDate();
    if (days < 0) { months--; days += 30; }
    if (months < 0) { years--; months += 12; }
    setAgeResult(`तपाईँको उमेर: ${years} वर्ष, ${months} महिना, ${days} दिन`);
  };

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="hero-gradient text-primary-foreground py-10 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img src={dhirajPhoto} alt="Dhiraj Shahi" className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-primary-foreground/30 object-cover shadow-lg" />
            <div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold">🏛️ लोकसेवा Practice Dashboard</h1>
              <p className="text-sm md:text-base opacity-90 mt-1">Computer Operator & IT Officer Preparation — नेपाल सरकार</p>
              <p className="text-sm opacity-80">Prepared by <span className="font-semibold">Dhiraj Shahi</span></p>
            </div>
          </div>
          <div className="bg-primary-foreground/15 backdrop-blur-sm rounded-2xl px-6 py-4 text-center">
            <div className="text-3xl md:text-4xl font-heading font-bold tracking-wider">{timeStr}</div>
            <div className="text-xs opacity-80 mt-1">{dateStr}</div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 space-y-10">
        {/* Quick Access */}
        <section>
          <h2 className="text-xl font-heading font-bold mb-4">⚡ Quick Access</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {quickAccess.map((item) => (
              <Link key={item.path} to={item.path} className={`quick-card ${item.color} text-primary-foreground`}>
                <span className="text-3xl">{item.icon}</span>
                <span className="text-sm font-semibold">{item.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Countdown + Links */}
        <div className="grid md:grid-cols-2 gap-6">
          <section className="bg-card rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-heading font-bold">🏆 Exam Countdown</h2>
              <span className="bg-card-red text-primary-foreground text-xs px-3 py-1 rounded-full font-semibold animate-pulse">Live</span>
            </div>
            <div className="countdown-box text-primary-foreground">
              <p className="text-sm mb-4 opacity-90">💻 Computer Operator (Kharidar) — Written Exam</p>
              {countdown.expired ? (
                <p className="text-xl font-bold">परीक्षा सकियो! 🎉</p>
              ) : (
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { val: countdown.days, label: "DAYS" },
                    { val: countdown.hours, label: "HRS" },
                    { val: countdown.minutes, label: "MIN" },
                    { val: countdown.seconds, label: "SEC" },
                  ].map((t) => (
                    <div key={t.label} className="bg-primary-foreground/10 rounded-xl py-3 text-center">
                      <div className="text-2xl md:text-3xl font-heading font-bold">{t.val.toString().padStart(2, "0")}</div>
                      <div className="text-xs opacity-70">{t.label}</div>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-xs opacity-60 mt-4">आसार ७, २०८२ — Update once PSC announces officially.</p>
            </div>
          </section>

          <section className="bg-card rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-heading font-bold mb-4">🔗 Important Links</h2>
            <div className="space-y-3">
              {importantLinks.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors">
                  <span className="text-2xl">{link.icon}</span>
                  <div>
                    <p className="font-semibold text-sm">{link.name}</p>
                    <p className="text-xs text-muted-foreground">{link.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>

        {/* PSC News */}
        <section className="bg-card rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-heading font-bold mb-4">📰 PSC News & Notices</h2>
          <div className="space-y-3">
            {[
              { tag: "Vacancy", text: "PSC publishes Computer Operator vacancy 2081", time: "2 days ago" },
              { tag: "Exam", text: "Written exam dates for IT Officer announced", time: "5 days ago" },
              { tag: "Syllabus", text: "Updated syllabus for assistant level posts", time: "1 week ago" },
              { tag: "Result", text: "Computer Operator (Kharidar) written exam result published", time: "2 weeks ago" },
            ].map((n, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted transition-colors">
                <span className={`text-xs px-2 py-1 rounded font-semibold ${n.tag === "Vacancy" ? "bg-success/20 text-success" : n.tag === "Exam" ? "bg-info/20 text-info" : n.tag === "Result" ? "bg-card-purple/20 text-card-purple" : "bg-accent/20 text-accent"}`}>{n.tag}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{n.text}</p>
                  <p className="text-xs text-muted-foreground">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Motivational Quote */}
        <section className="hero-gradient text-primary-foreground rounded-2xl p-6 text-center">
          <p className="text-lg md:text-xl font-heading font-semibold">"{quote}"</p>
          <p className="text-sm opacity-80 mt-2">— Keep going, Dhiraj 💪</p>
        </section>

        {/* Age Calculator + Useful Tools */}
        <div className="grid md:grid-cols-2 gap-6">
          <section className="bg-card rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-heading font-bold mb-4">🎂 Age Calculator (उमेर गणना)</h2>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div>
                <label className="text-xs text-muted-foreground">Year</label>
                <input type="number" placeholder="2000" value={birthYear} onChange={(e) => setBirthYear(e.target.value)} className="w-full p-2 rounded-lg border bg-background text-sm" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Month</label>
                <input type="number" placeholder="1-12" min="1" max="12" value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)} className="w-full p-2 rounded-lg border bg-background text-sm" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Day</label>
                <input type="number" placeholder="1-31" min="1" max="31" value={birthDay} onChange={(e) => setBirthDay(e.target.value)} className="w-full p-2 rounded-lg border bg-background text-sm" />
              </div>
            </div>
            <button onClick={calculateAge} className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity">Calculate Age</button>
            {ageResult && <p className="mt-3 text-center font-semibold text-success">{ageResult}</p>}
          </section>

          <section className="bg-card rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-heading font-bold mb-4">🛠️ Useful Tools</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Typing Practice", icon: "⌨️", path: "/typing" },
                { label: "Notes", icon: "📒", path: "/notes" },
                { label: "Full Syllabus", icon: "📋", path: "/syllabus" },
                { label: "Online Exam", icon: "📝", path: "/online-exam" },
              ].map((tool) => (
                <Link key={tool.path} to={tool.path} className="flex items-center gap-2 p-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors">
                  <span className="text-xl">{tool.icon}</span>
                  <span className="text-sm font-medium">{tool.label}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Exam Pattern */}
        <section className="bg-card rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-heading font-bold mb-4">📋 Exam Pattern — Computer Operator (Kharidar)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 text-left rounded-tl-lg">Paper</th>
                  <th className="p-3 text-left">Subject</th>
                  <th className="p-3 text-center">Marks</th>
                  <th className="p-3 text-center">Questions</th>
                  <th className="p-3 text-center rounded-tr-lg">Time</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-3">Paper I</td>
                  <td className="p-3">सामान्य ज्ञान र सार्वजनिक व्यवस्थापन (GK & Public Mgmt)</td>
                  <td className="p-3 text-center">१०० (20×2)</td>
                  <td className="p-3 text-center">20 MCQ</td>
                  <td className="p-3 text-center">45 min</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3">Paper II</td>
                  <td className="p-3">सेवा सम्बन्धित कार्य-ज्ञान (Job Knowledge)</td>
                  <td className="p-3 text-center">१०० (30×2 + Short/Long)</td>
                  <td className="p-3 text-center">30 MCQ + Subjective</td>
                  <td className="p-3 text-center">2h 15m</td>
                </tr>
                <tr>
                  <td className="p-3">Practical</td>
                  <td className="p-3">प्रयोगात्मक परीक्षा (Practical)</td>
                  <td className="p-3 text-center">५०</td>
                  <td className="p-3 text-center">7 tasks</td>
                  <td className="p-3 text-center">45 min</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
