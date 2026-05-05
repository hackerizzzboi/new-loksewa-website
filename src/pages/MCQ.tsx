import { Link } from "react-router-dom";
import { practiceSubjects } from "@/data/questions";

const Practice = () => (
  <div className="container mx-auto px-4 py-8 animate-fade-in">
    <h1 className="text-2xl font-heading font-bold mb-2">❓ Practice — Subject-wise MCQs</h1>
    <p className="text-muted-foreground mb-6">विषय छान्नुहोस् र अभ्यास सुरु गर्नुहोस्।</p>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {practiceSubjects.map((s) => (
        <Link key={s.id} to={`/quiz/practice/${s.id}`} className={`quick-card ${s.color} text-primary-foreground min-h-[140px]`}>
          <span className="text-4xl">{s.icon}</span>
          <span className="font-bold">{s.title}</span>
          {s.titleNp && <span className="text-xs opacity-80">{s.titleNp}</span>}
          <span className="text-xs opacity-70">{s.questionCount} Questions</span>
        </Link>
      ))}
    </div>
  </div>
);

export default Practice;
