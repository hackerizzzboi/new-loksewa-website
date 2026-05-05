const News = () => (
  <div className="container mx-auto px-4 py-8 animate-fade-in">
    <h1 className="text-2xl font-heading font-bold mb-2">📰 PSC News & Updates</h1>
    <p className="text-muted-foreground mb-6">लोक सेवा आयोग र सरकारी सूचनाहरू।</p>

    <div className="space-y-4">
      {[
        { tag: "Vacancy", title: "PSC publishes Computer Operator vacancy 2081", desc: "लोक सेवा आयोगले कम्प्युटर अपरेटर पदको विज्ञापन प्रकाशित गरेको छ।", date: "२०८२-०१-१५", link: "https://psc.gov.np" },
        { tag: "Exam", title: "Written exam dates for IT Officer announced", desc: "IT Officer को लिखित परीक्षाको मिति तोकिएको छ।", date: "२०८२-०१-१०", link: "https://psc.gov.np" },
        { tag: "Result", title: "Computer Operator written exam result published", desc: "कम्प्युटर अपरेटर लिखित परीक्षाको नतिजा प्रकाशित।", date: "२०८१-१२-२५", link: "https://psc.gov.np" },
        { tag: "Syllabus", title: "Updated syllabus for assistant level posts", desc: "सहायक स्तरको नयाँ पाठ्यक्रम जारी।", date: "२०८१-१२-२०", link: "https://psc.gov.np" },
        { tag: "Notice", title: "Typing speed test requirements updated", desc: "कम्प्युटर अपरेटरको लागि नेपाली २५ WPM र English ४० WPM आवश्यक।", date: "२०८१-१२-१५", link: "https://psc.gov.np" },
        { tag: "Policy", title: "Digital Nepal Framework 2019 update", desc: "डिजिटल नेपाल फ्रेमवर्कमा नयाँ अद्यावधिक।", date: "२०८१-११-२०", link: "https://mocit.gov.np" },
      ].map((n, i) => (
        <a key={i} href={n.link} target="_blank" rel="noopener noreferrer" className="block bg-card rounded-2xl shadow-md p-5 card-hover">
          <div className="flex items-start gap-3">
            <span className={`text-xs px-2 py-1 rounded font-semibold shrink-0 ${
              n.tag === "Vacancy" ? "bg-success/20 text-success" :
              n.tag === "Exam" ? "bg-info/20 text-info" :
              n.tag === "Result" ? "bg-card-purple/20 text-card-purple" :
              n.tag === "Policy" ? "bg-card-navy/20 text-card-navy" :
              "bg-accent/20 text-accent"
            }`}>{n.tag}</span>
            <div>
              <h3 className="font-semibold text-sm">{n.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{n.desc}</p>
              <p className="text-xs text-muted-foreground mt-1">{n.date}</p>
            </div>
          </div>
        </a>
      ))}
    </div>

    {/* Typing Requirements */}
    <div className="bg-card rounded-2xl shadow-md p-6 mt-8">
      <h2 className="text-lg font-heading font-bold mb-4">⌨️ Typing Speed Requirements</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted">
            <th className="p-3 text-left rounded-tl-lg">Language</th>
            <th className="p-3 text-center">Required Speed</th>
            <th className="p-3 text-center rounded-tr-lg">Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border"><td className="p-3">English Typing</td><td className="p-3 text-center">40 WPM</td><td className="p-3 text-center">10 minutes</td></tr>
          <tr><td className="p-3">Nepali Typing (Preeti/Kantipur)</td><td className="p-3 text-center">25 WPM</td><td className="p-3 text-center">10 minutes</td></tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default News;
