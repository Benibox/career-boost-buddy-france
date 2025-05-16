import { Link } from "react-router-dom";

/**
 * AboutHero – layout calqué sur le hero « Parrainage » :
 * · texte à gauche
 * · citation/confiance à droite
 * · même rythme typographique et CTA
 */
const AboutHero = () => {
  return (
    <section className="bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-24 md:min-h-[75vh] flex items-center">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-14 items-center">
        {/* LEFT – copywriting */}
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Derrière <span className="text-highlight">CertyLink</span>, une mission
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-md">
            Bâtir un écosystème où <strong>candidats</strong> et <strong>employeurs</strong> se font confiance,
            avant même le premier entretien.
          </p>

          <Link
            to="/creer"
            className="inline-flex items-center justify-center rounded-full bg-highlight px-7 py-3 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
          >
            Créer mon profil
          </Link>
        </div>

        {/* RIGHT – citation confiance */}
        <div className="relative">
          <blockquote className="rounded-3xl bg-white/90 shadow-xl backdrop-blur-md ring-1 ring-gray-200/70 w-full max-w-sm mx-auto p-10 text-xl font-medium text-gray-800 leading-relaxed">
            « Nous croyons qu'une recommandation sincère peut ouvrir des portes que les algorithmes ne voient pas. »
            <footer className="mt-6 text-sm text-gray-500">— Ethan B. &amp; Ulysse T., co-fondateurs</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
