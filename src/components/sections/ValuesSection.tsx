
import FeatureCard from "@/components/ui/feature-card";
import { ShieldCheck, Users, BookOpen, BarChart } from "lucide-react";

const ValuesSection = () => {
  const values = [
    {
      icon: <ShieldCheck className="h-8 w-8 text-highlight" />,
      title: "Confiance",
      description:
        "Nous bâtissons des relations de confiance entre tous les acteurs de notre écosystème",
    },
    {
      icon: <Users className="h-8 w-8 text-highlight" />,
      title: "Simplicité",
      description:
        "Nous simplifions les processus pour faciliter l'accès à l'emploi des candidats",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-highlight" />,
      title: "Transparence",
      description:
        "Nous encourageons l'honnêteté et la clarté dans toutes nos interactions",
    },
    {
      icon: <BarChart className="h-8 w-8 text-highlight" />,
      title: "Impact",
      description:
        "Nous mesurons notre succès à l'aune des opportunités créées pour les candidats",
    },
  ];

  return (
    <section className="py-16 bg-white reveal-on-scroll">
      <div className="container mx-auto px-4">
        <h2 className="section-title">
          Nos <span className="highlight-text">valeurs</span>
        </h2>
        <p className="section-subtitle">
          Les principes qui guident nos actions et notre développement
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <FeatureCard
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
