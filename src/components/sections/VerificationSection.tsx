
import { Shield, Mail, UserCheck, Clock, Signature } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const VerificationSection = () => {
  const verificationSteps = [
    {
      icon: <Mail className="h-8 w-8 text-white" />,
      title: "Auth pro / LinkedIn",
      description: "e-mail pro vérifié"
    },
    {
      icon: <UserCheck className="h-8 w-8 text-white" />,
      title: "Cross-check anti-fraude",
      description: "Nom + domaine"
    },
    {
      icon: <Clock className="h-8 w-8 text-white" />,
      title: "Horodatage",
      description: "Date et heure précises"
    },
    {
      icon: <Signature className="h-8 w-8 text-white" />,
      title: "Signature numérique",
      description: "Authentification sécurisée"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-highlight to-darkpurple text-white reveal-on-scroll">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-white">
          Comment nous <span className="text-white font-bold">vérifions</span>
        </h2>
        <p className="section-subtitle text-white/80">
          Notre processus de vérification rigoureux garantit la fiabilité des profils
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {verificationSteps.map((step, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors text-white feature-card">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-white/20 p-4 rounded-full flex items-center justify-center w-16 h-16 mb-4">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-white/80">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VerificationSection;
