
import { Shield, Mail, UserCheck, Clock, Signature } from "lucide-react";

const VerificationSection = () => {
  const verificationSteps = [
    {
      icon: <Mail className="h-8 w-8 text-highlight" />,
      title: "Auth pro / LinkedIn",
      description: "e-mail pro vérifié"
    },
    {
      icon: <UserCheck className="h-8 w-8 text-highlight" />,
      title: "Cross-check anti-fraude",
      description: "Nom + domaine"
    },
    {
      icon: <Clock className="h-8 w-8 text-highlight" />,
      title: "Horodatage",
      description: "Date et heure précises"
    },
    {
      icon: <Signature className="h-8 w-8 text-highlight" />,
      title: "Signature numérique",
      description: "Authentification sécurisée"
    }
  ];

  return (
    <section className="py-16 bg-white reveal-on-scroll">
      <div className="container mx-auto px-4">
        <h2 className="section-title">
          Comment nous <span className="highlight-text">vérifions</span>
        </h2>
        <p className="section-subtitle">
          Notre processus de vérification rigoureux garantit la fiabilité des profils
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {verificationSteps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center feature-card">
              <div className="card-icon">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VerificationSection;
