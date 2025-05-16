import { UserCheck, Clock, Award, ShieldCheck } from "lucide-react";

/**
 * ImpactSection – chiffres open‑source sur la valeur des recommandations vérifiées.
 * Sources : LinkedIn, ERIN, 99Firms, SHRM (voir doc produit).
 */
const ImpactSection = () => {
  const stats = [
    {
      icon: <UserCheck className="h-8 w-8 text-highlight" />,
      value: "×7",
      label: "Taux d'embauche des candidats recommandés",
    },
    {
      icon: <Clock className="h-8 w-8 text-highlight" />,
      value: "‑10 j",
      label: "Jours gagnés sur le délai de recrutement",
    },
    {
      icon: <Award className="h-8 w-8 text-highlight" />,
      value: "88 %",
      label: "Employeurs recrutant via referrals",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-highlight" />,
      value: "92 %",
      label: "DRH pratiquant le background‑check",
    },
  ] as const;

  return (
    <section className="py-24 bg-white reveal-on-scroll">
      <div className="container mx-auto px-4 text-center">
        <h2 className="section-title mb-4">
          Notre impact <span className="highlight-text">en chiffres</span>
        </h2>
        <p className="section-subtitle max-w-3xl mx-auto mb-16">
          Ces données publiques démontrent la puissance de la recommandation certifiée dans le processus d'embauche.
        </p>

        <div className="grid gap-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-highlight/10 mb-6">
                {s.icon}
              </div>
              <p className="text-3xl font-extrabold text-gray-900 mb-2">{s.value}</p>
              <p className="text-sm text-gray-600 max-w-[11rem] leading-snug text-center">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
