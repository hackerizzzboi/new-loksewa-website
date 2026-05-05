import { Link } from "react-router-dom";
import { weeklyTests } from "@/data/questions";

const OnlineExam = () => (
  <div className="container mx-auto px-4 py-8 animate-fade-in">
    <h1 className="text-2xl font-heading font-bold mb-2">📝 अनलाइन परीक्षा (Online Exam)</h1>
    <p className="text-muted-foreground mb-6">साप्ताहिक परीक्षामा भाग लिनुहोस् र आफ्नो तयारी जाँच गर्नुहोस्।</p>

    <div className="space-y-4">
      {weeklyTests.map((test) => (
        <div key={test.id} className="bg-card rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-heading font-bold mb-2">{test.titleNp}</h2>
          <div className="bg-muted rounded-xl p-4 mb-4 space-y-1 text-sm">
            <p>एक पटक मात्र परीक्षा दिन पाइनेछ। 'Start' मा क्लिक गरेपछि समय गणना हुनेछ।</p>
            <p>'Start' मा क्लिक गरेपछि पेजलाई 'Refresh' नगर्नुहोला। पेजबाट 'Back' नआउनुहोला।</p>
            <p className="font-medium">सोच विचार गरेर मात्र जवाफ दिनुहोला। शुभकामना !</p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm mb-4">
            <div><strong>प्रश्न संख्या:</strong> {test.questions}</div>
            <div><strong>पूर्णाङ्क:</strong> {test.marks} (प्रत्येक गलत उत्तरमा {test.negativeMarking} अंक कट्टा)</div>
            <div><strong>परीक्षा समय:</strong> {test.time} मिनेट</div>
          </div>
          <Link to={`/quiz/online-exam/${test.id}`} className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity">
            Start
          </Link>
        </div>
      ))}
    </div>
  </div>
);

export default OnlineExam;
