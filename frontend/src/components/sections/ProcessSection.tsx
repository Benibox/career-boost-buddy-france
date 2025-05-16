import { User, Users, ShieldCheck, Send } from "lucide-react";

/**
 * Nouveau composant « ProcessSection » sous forme de timeline responsive.
 *
 * ▸ Mobile : timeline verticale (steps empilés).
 * ▸ Desktop ≥ md : timeline horizontale reliée par une ligne.
 *
 * NB : Nous avons ajusté le wording pour rendre le parcours plus clair.
 */
const ProcessSection = () => {
  const steps = [
    {
      icon: <User className="h-7 w-7 text-highlight" />,
      title: "Créez votre profil",
      description: "En 20 s, complétez vos informations clés.",
      step: "1",
    },
    {
      icon: <Users className="h-7 w-7 text-highlight" />,
      title: "Invitez votre référent",
      description: "Générez un lien unique et partagez‑le à votre ancien employeur.",
      step: "2",
    },
    {
      icon: <ShieldCheck className="h-7 w-7 text-highlight" />,
      title: "Référent vérifié",
      description: "Nous vérifions automatiquement l'identité professionnelle du référent.",
      step: "3",
    },
    {
      icon: <Send className="h-7 w-7 text-highlight" />,
      title: "Authentification des expériences",
      description: "Vos expériences sont authentifié par ce dernier",
      step: "4",
    },
    {
      icon: <Send className="h-7 w-7 text-highlight" />,
      title: "Partagez & postulez",
      description: "Votre profil est prêt à être partagé aux recruteurs en un clic !",
      step: "4",
    },
  ] as const;

  return (
    <section id="process-section" className="py-20 bg-gray-50 reveal-on-scroll">
      <div className="container mx-auto px-4">
        <h2 className="section-title">
          Comment <span className="highlight-text">ça marche ?</span>
        </h2>
        <p className="section-subtitle max-w-2xl">
          4 étapes simples pour faire vérifier votre expérience et booster votre crédibilité.
        </p>

        {/* wrapper timeline */}
        <div className="relative mt-14 flex flex-col gap-12 md:flex-row md:justify-between">
          {/* ligne horizontale (desktop) */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-lightpurple via-highlight/40 to-lightpurple" />

          {steps.map((s, i) => (
            <div
              key={s.step}
              className="relative flex items-start md:flex-col md:items-center text-center max-w-xs mx-auto"
            >
              {/* point + numéro */}
              <div className="relative flex items-center justify-center">
                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-highlight/10 ring-4 ring-highlight/10 backdrop-blur-sm">
                  {s.icon}
                </span>
                {/* numéro */}
                <span className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-highlight text-white text-sm font-semibold flex items-center justify-center">
                  {s.step}
                </span>
              </div>

              {/* connecteur vertical (mobile) */}
              {i < steps.length - 1 && (
                <span className="md:hidden absolute left-1/2 top-full h-10 w-0.5 bg-highlight/20" />
              )}

              {/* texte */}
              <div className="mt-4 md:mt-6">
                <h3 className="font-semibold text-lg mb-1 text-gray-900">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
