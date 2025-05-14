
import { CheckCircle, User, Users, Search } from "lucide-react";

interface BenefitGroupProps {
  title: string;
  icon: React.ReactNode;
  benefits: string[];
}

const BenefitGroup = ({ title, icon, benefits }: BenefitGroupProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
      <div className="flex flex-col items-center mb-6">
        <div className="card-icon">{icon}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <ul className="space-y-3">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="h-5 w-5 text-highlight mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 text-sm">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const BenefitsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">
          Pour qui <span className="highlight-text">CertyLink</span> est-il conçu ?
        </h2>
        <p className="section-subtitle">
          Notre plateforme apporte de la valeur à chaque personne impliquée dans le
          processus de recrutement des jeunes talents.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <BenefitGroup
            title="Pour les candidats"
            icon={<User className="h-8 w-8 text-highlight" />}
            benefits={[
              "Création de profil en 90 secondes",
              "Validation par des personnes de confiance",
              "Partagez facilement avec les recruteurs",
              "Démarquez-vous des autres candidats"
            ]}
          />
          <BenefitGroup
            title="Pour les parrains"
            icon={<Users className="h-8 w-8 text-highlight" />}
            benefits={[
              "Processus de validation rapide",
              "Connexion simple via email pro ou LinkedIn",
              "Ajout de recommandations personnalisées",
              "Soutenez le parcours des jeunes"
            ]}
          />
          <BenefitGroup
            title="Pour les employeurs"
            icon={<Search className="h-8 w-8 text-highlight" />}
            benefits={[
              "Fiabilité vérifiée des candidats",
              "Économie de temps sur les vérifications",
              "Identification rapide des bons profils",
              "Réduction des risques d'embauche"
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
