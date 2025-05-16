import { useEffect, useState } from "react";
import { CheckCircle, ChevronDown, User } from "lucide-react";

/**
 * Hero – v5 – composant ré-utilisable
 * --------------------------------------------------
 * Ajout de 2 flags :
 *   • `showProfile` (false par défaut)
 *   • `showBenefits` (false par défaut)
 * Cela permet de garder le nouveau design uniquement sur la landing
 * sans impacter Parrainage, QuiSommesNous, etc.
 */

interface HeroProps {
  title?: string;
  highlightedText?: string;
  description?: string;
  showAnchorHint?: boolean;
  showProfile?: boolean;
  showBenefits?: boolean;
}

const experiences = [
  { label: "Serveuse – Café Parisien", validatedBy: "Antoine Dupont" },
  { label: "Stagiaire Marketing – Agence Digitale", validatedBy: "Sophie Martin" },
  { label: "Vendeuse – Zara", validatedBy: "Claire Bernard" },
] as const;

const defaultBenefits = [
  "Obtenez une preuve concrète de votre expérience professionnelle",
  "Renforcez la confiance des recruteurs en un clin d'œil",
  "Centralisez toutes vos recommandations au même endroit",
] as const;

const Hero = ({
  title = "Faites-vous",
  highlightedText = "remarquer",
  description =
    "Prouvez votre fiabilité grâce à la recommandation authentifiée de vos anciens employeurs.",
  showAnchorHint = true,
  showProfile = false,
  showBenefits = false,
}: HeroProps) => {
  const [floating, setFloating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setFloating((f) => !f), 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToNextSection = () => {
    const nextSection = document.querySelector(".reveal-on-scroll:nth-child(2)");
    if (nextSection) nextSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[60vh] md:min-h-screen bg-gray-50 flex items-center py-24 overflow-hidden reveal-on-scroll">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-14 items-center">
        {/* Left – copywriting */}
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            {title} <span className="text-highlight">{highlightedText}</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 md:mb-10 max-w-md">{description}</p>

          {/* benefits – optionnel */}
          {showBenefits && (
            <ul className="space-y-3 mb-10">
              {defaultBenefits.map((b) => (
                <li key={b} className="flex gap-3 items-start">
                  <CheckCircle className="h-5 w-5 text-highlight shrink-0 mt-1" />
                  <span className="text-gray-700 leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          )}

          <a
            href="/creer"
            className="inline-flex items-center justify-center rounded-full bg-highlight px-7 py-3 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
          >
            Créer mon profil
          </a>
        </div>

        {/* Right – profile preview – optionnel */}
        {showProfile && (
          <div className="relative">
            <div className="relative isolate overflow-hidden rounded-3xl bg-white/90 shadow-2xl backdrop-blur-md ring-1 ring-gray-200/70 dark:bg-gray-800/80 dark:ring-gray-700 w-full max-w-md mx-auto">
              {/* top accent bar */}
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-highlight via-purple-400 to-indigo-400 rounded-t-3xl" />

              <div className="p-8">
                {/* header CENTERED */}
                <div className="flex flex-col items-center gap-4 mb-10">
                  <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center">
                    <User className="h-10 w-10 text-indigo-500" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white leading-snug text-center">
                    Marie Durand
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Étudiante</p>
                </div>

                {/* experience list */}
                <div className="flex flex-col gap-4">
                  {experiences.map(({ label, validatedBy }) => (
                    <div
                      key={label}
                      className="flex flex-col gap-1 px-4 py-3 rounded-lg bg-gray-100/70 dark:bg-white/5"
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-1" />
                        <p className="font-medium text-gray-900 dark:text-white text-sm leading-snug">
                          {label}
                        </p>
                      </div>
                      <p className="pl-8 text-xs text-emerald-700 dark:text-emerald-500">
                        Validé par {validatedBy}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CTA inside card */}
                <a
                  href="#" // future link to recommendations page
                  className="mt-10 block w-full text-center rounded-full bg-gray-900/90 dark:bg-white/10 text-white dark:text-gray-100 px-5 py-3 text-sm font-semibold hover:bg-gray-900/95 transition-colors"
                >
                  Voir toutes les recommandations
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* scroll hint */}
      {showAnchorHint && (
        <button
          onClick={scrollToNextSection}
          className="absolute left-1/2 bottom-8 -translate-x-1/2 flex flex-col items-center group"
        >
          <span className="text-gray-500 mb-1 group-hover:text-gray-700 transition-colors text-sm">
            Faites défiler pour découvrir le processus
          </span>
          <ChevronDown
            className={`h-6 w-6 text-highlight transition-transform duration-700 ease-in-out ${floating ? "translate-y-1" : "-translate-y-1"}`}
          />
        </button>
      )}
    </section>
  );
};

export default Hero;
