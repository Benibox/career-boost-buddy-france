import { CheckCircle, ShieldCheck } from "lucide-react";

/**
 * MissionSection – v2 avec fond gradient violet/indigo pour être cohérent avec AboutHero.
 */
const MissionSection = () => {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-purple-50 via-white to-indigo-50 py-24 reveal-on-scroll">
      {/* decorative wave top (blanc pour transition) */}
      <div className="absolute -top-1 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-[calc(100%+1.5px)] h-12 text-white" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0 32l48 5.3C96 43 192 53 288 58.7 384 64 480 64 576 53.3 672 43 768 21 864 16s192 5 288 21.3C1248 53 1344 75 1392 85.3l48 10.7V0H0z" fill="currentColor" />
        </svg>
      </div>

      <div className="container mx-auto px-4 text-center">
        <h2 className="section-title mb-4">
          Notre <span className="highlight-text">mission</span>
        </h2>
        <p className="section-subtitle max-w-3xl mx-auto mb-14">
          Bâtir un écosystème où <strong className="text-gray-900">candidats</strong> et <strong className="text-gray-900">employeurs</strong> se font confiance, avant même le premier entretien.
        </p>

        <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-12 text-left bg-white/80 backdrop-blur rounded-3xl p-12 ring-1 ring-gray-200 shadow-lg">
          {/* Bloc candidats */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-indigo-600">Pour les candidats</h3>
            <ul className="space-y-3 text-sm leading-relaxed text-gray-700">
              <li className="flex gap-2"><CheckCircle className="h-5 w-5 text-highlight mt-0.5" /> Vos expériences deviennent des preuves tangibles.</li>
              <li className="flex gap-2"><CheckCircle className="h-5 w-5 text-highlight mt-0.5" /> Vous réduisez l'incertitude des recruteurs et gagnez du temps.</li>
              <li className="flex gap-2"><CheckCircle className="h-5 w-5 text-highlight mt-0.5" /> Un profil authentifié valorise vos soft skills et votre fiabilité.</li>
            </ul>
          </div>

          {/* Bloc employeurs */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-indigo-600">Pour les employeurs</h3>
            <ul className="space-y-3 text-sm leading-relaxed text-gray-700">
              <li className="flex gap-2"><ShieldCheck className="h-5 w-5 text-highlight mt-0.5" /> Dès la short‑list, identifiez des profils déjà vérifiés.</li>
              <li className="flex gap-2"><ShieldCheck className="h-5 w-5 text-highlight mt-0.5" /> Diminuez le <em>no‑show</em> et les coûts liés aux mauvais recrutements.</li>
              <li className="flex gap-2"><ShieldCheck className="h-5 w-5 text-highlight mt-0.5" /> Renforcez votre marque employeur avec un process transparent.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* wave bottom (blanc) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-[calc(100%+1.5px)] h-12 text-white" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0 0l48 10.7C96 21 192 43 288 48.7 384 54 480 43 576 32 672 21 768 11 864 10.7c96-.3 192 10.7 288 26.6C1248 64 1344 75 1392 80l48 5v-96H0z" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
};

export default MissionSection;
