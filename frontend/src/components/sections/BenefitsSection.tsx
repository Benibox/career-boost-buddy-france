import { Users, Landmark, Search } from "lucide-react";

/**
 * BenefitsSection – version revue pour moins de répétition et plus de valeur concrète.
 */
const BenefitsSection = () => {
  const blocks = [
    {
      icon: <Users className="h-7 w-7 text-highlight" />,
      title: "Candidats",
      bullets: [
        "Crédibilité instantanée auprès des recruteurs",
        "Mettez en avant vos soft skills et résultats concrets",
        "Contrôlez quelles recommandations sont visibles",
        "Plus d'entretiens, moins d'efforts",
      ],
    },
    {
      icon: <Landmark className="h-7 w-7 text-highlight" />,
      title: "Référents",
      bullets: [
        "Valorisez vos ancien·ne·s collaborateur·ice·s en 60 s",
        "Aucune création de compte obligatoire",
        "Renforcez votre marque employeur personnelle",
        "Contribuez à la réussite des talents que vous soutenez",
      ],
    },
    {
      icon: <Search className="h-7 w-7 text-highlight" />,
      title: "Recruteurs",
      bullets: [
        "Références vérifiées avant l'entretien",
        "Réduction des coûts de background check",
        "Filtrez et classez les profils par niveau de confiance",
        "Diminuez le risque d'embauche inadaptée",
      ],
    },
  ] as const;

  return (
    <section className="py-24 bg-gray-50 reveal-on-scroll" id="benefits">
      <div className="container mx-auto px-4 text-center">
        <h2 className="section-title mb-4">
          Pour qui <span className="highlight-text">CertyLink</span> a-t-il été conçu ?
        </h2>
        <p className="section-subtitle max-w-3xl mx-auto mb-16">
          Notre plateforme crée de la valeur pour chaque acteur du recrutement — du candidat au DRH.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {blocks.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl border bg-white p-10 text-left shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-highlight/10 mb-6">
                {b.icon}
              </div>
              <h3 className="font-semibold text-lg mb-6 text-gray-900">Pour les {b.title.toLowerCase()}</h3>
              <ul className="space-y-3 text-sm">
                {b.bullets.map((line) => (
                  <li key={line} className="flex gap-2 items-start">
                    <span className="text-highlight">•</span>
                    <span className="text-gray-700 leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
