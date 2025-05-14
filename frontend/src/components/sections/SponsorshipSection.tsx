
import { ShieldCheck, CheckCircle, Users } from "lucide-react";
import FeatureCard from "../ui/feature-card";

const SponsorshipSection = () => {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-highlight" />,
      title: "Identification vérifiée",
      description:
        "Nous vérifions rigoureusement l'identité des parrains pour éviter toute usurpation d'identité et auto-validation.",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-highlight" />,
      title: "Double vérification",
      description:
        "Un système de double authentification sécurise le processus de validation et garantit que seules les personnes légitimes peuvent valider un profil.",
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-highlight" />,
      title: "Relation de confiance",
      description:
        "Seules les personnes ayant réellement travaillé avec le candidat peuvent devenir parrains, créant ainsi un cercle de confiance vérifiable.",
    },
  ];

  return (
    <section className="py-16 bg-white reveal-on-scroll">
      <div className="container mx-auto px-4">
        <h2 className="section-title">
          Le <span className="highlight-text">parrainage</span>
        </h2>
        <p className="section-subtitle">
          Un système sécurisé qui garantit l'authenticité des validations
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorshipSection;
