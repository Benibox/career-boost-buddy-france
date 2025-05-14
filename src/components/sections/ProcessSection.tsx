
import FeatureCard from "@/components/ui/feature-card";
import { User, Users, ShieldCheck, CheckCircle } from "lucide-react";

const ProcessSection = () => {
  const steps = [
    {
      icon: <User className="h-8 w-8 text-highlight" />,
      title: "Créez votre profil",
      description:
        "Inscrivez-vous en 60 secondes et ajoutez vos expériences professionnelles",
    },
    {
      icon: <Users className="h-8 w-8 text-highlight" />,
      title: "Invitez un parrain",
      description:
        "Envoyez un lien unique aux personnes qui ont réellement travaillé avec vous",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-highlight" />,
      title: "Vérification d'identité",
      description:
        "Nous vérifions rigoureusement l'identité de chaque parrain pour éviter les fraudes",
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-highlight" />,
      title: "Validation sécurisée",
      description:
        "Seules les personnes autorisées peuvent valider votre profil",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">
          Comment <span className="highlight-text">ça marche</span>
        </h2>
        <p className="section-subtitle">
          Un processus simple et sécurisé pour valoriser vos expériences
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <FeatureCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
