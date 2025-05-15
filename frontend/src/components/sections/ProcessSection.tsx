import { User, Users, ShieldCheck, CheckCircle } from "lucide-react";

const ProcessSection = () => {
  const steps = [
    {
      icon: <User className="h-8 w-8 text-highlight" />,
      title: "Créez votre profil",
      description: "Créez votre profil en 60 s et valorisez vos expériences.",
      step: "01",
    },
    {
      icon: <Users className="h-8 w-8 text-highlight" />,
      title: "Invitez un parrain",
      description: "Invitez un parrain via un lien unique.",
      step: "02",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-highlight" />,
      title: "Vérification d'identité",
      description: "Nous vérifions rigoureusement l'identité de chaque parrain.",
      step: "03",
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-highlight" />,
      title: "Validation sécurisée",
      description: "Seules les personnes autorisées peuvent valider votre profil.",
      step: "04",
    },
  ];

  return (
    <section
      id="process-section"
      className="py-16 bg-gray-50 reveal-on-scroll relative"
    >
      <div className="container mx-auto px-4">
        <h2 className="section-title">
          Comment <span className="highlight-text">ça marche</span>
        </h2>
        <p className="section-subtitle">
          Un processus simple et sécurisé pour valoriser vos expériences
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all hover:-translate-y-1 hover:border-highlight group"
            >
              {/* Badge numéro en haut à droite */}
              <div className="absolute -top-3 -right-3 bg-highlight text-white text-lg font-bold h-10 w-10 rounded-full flex items-center justify-center">
                {step.step}
              </div>

              {/* Icône */}
              <div className="bg-lightpurple p-4 rounded-full flex items-center justify-center w-16 h-16 mb-4 group-hover:bg-highlight/20 transition-colors">
                {step.icon}
              </div>

              {/* Titre */}
              <h3 className="text-lg font-semibold mb-2 relative group-hover:text-highlight transition-colors">
                {step.title}
                <span className="block h-0.5 w-0 group-hover:w-1/2 bg-highlight transition-all duration-300"></span>
              </h3>

              {/* Description */}
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
