import { Link } from "react-router-dom";
import { oldIsGoldSets } from "@/data/questions";

const OldIsGold = () => (
  <div className="container mx-auto px-4 py-8 animate-fade-in">
    <h1 className="text-2xl font-heading font-bold mb-2">🏆 Old is Gold — Past PSC Papers</h1>
    <p className="text-muted-foreground mb-6">पुराना प्रश्नपत्रहरू अभ्यास गर्नुहोस्।</p>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {oldIsGoldSets.map((set, i) => (
        <Link key={set.id} to={`/quiz/old-is-gold/${set.id}`} className="bg-card rounded-2xl shadow-md p-5 card-hover flex items-start gap-4">
          <div className="bg-card-amber text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm shrink-0">
            {i + 1}
          </div>
          <div>
            <h3 className="font-semibold text-sm">{set.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">Year: {set.year} | 50 Questions</p>
            <span className="inline-block mt-2 text-xs bg-card-green/20 text-card-green px-2 py-0.5 rounded font-medium">Start →</span>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default OldIsGold;
