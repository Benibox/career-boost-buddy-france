import { HeartHandshake, Wand2, BookOpenCheck, TrendingUp } from "lucide-react";

/**
 * ValuesSection – nouveau design harmonisé avec le fond gradient du AboutHero.
 */
const ValuesSection = () => {
  const values = [
    {
      icon: <HeartHandshake className="h-8 w-8 text-highlight" />,
      title: "Confiance",
      desc: "Chaque décision est guidée par le respect et l'authenticité entre candidats et recruteurs.",
    },
    {
      icon: <Wand2 className="h-8 w-8 text-highlight" />,
      title: "Simplicité",
      desc: "Nous transformons des process complexes en expériences fluides et agréables.",
    },
    {
      icon: <BookOpenCheck className="h-8 w-8 text-highlight" />,
      title: "Transparence",
      desc: "Des règles claires, des données accessibles : rien n'est laissé dans l'ombre.",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-highlight" />,
      title: "Impact",
      desc: "Chaque profil certifié ouvre des portes et crée de la valeur pour l'économie.",
    },
  ] as const;

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-50 to-purple-50 py-24 reveal-on-scroll">
      {/* wave top to match previous light gray */}
      <div className="absolute -top-1 left-0 w-full overflow-hidden leading-[0]"><svg className="relative block w-[calc(100%+1.5px)] h-12 text-gray-50" viewBox="0 0 1440 80" preserveAspectRatio="none"><path d="M0 32l48 5.3C96 43 192 53 288 58.7 384 64 480 64 576 53.3 672 43 768 21 864 16s192 5 288 21.3C1248 53 1344 75 1392 85.3l48 10.7V0H0z" fill="currentColor" /></svg></div>

      <div className="container mx-auto px-4 text-center">
        <h2 className="section-title mb-4">
          Nos <span className="highlight-text">valeurs</span>
        </h2>
        <p className="section-subtitle max-w-3xl mx-auto mb-16">
          Les principes qui guident chacune de nos actions et décisions.
        </p>

        <div className="grid gap-8 md:grid-cols-4">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl bg-white/80 backdrop-blur p-10 text-center shadow-lg ring-1 ring-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-highlight/10 mb-6 mx-auto">
                {v.icon}
              </div>
              <h3 className="font-semibold text-lg mb-3 text-gray-900">{v.title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* wave bottom back to white */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]"><svg className="relative block w-[calc(100%+1.5px)] h-12 text-white" viewBox="0 0 1440 80" preserveAspectRatio="none"><path d="M0 0l48 10.7C96 21 192 43 288 48.7 384 54 480 43 576 32 672 21 768 11 864 10.7c96-.3 192 10.7 288 26.6C1248 64 1344 75 1392 80l48 5v-96H0z" fill="currentColor" /></svg></div>
    </section>
  );
};

export default ValuesSection;
