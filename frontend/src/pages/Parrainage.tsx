import Layout from "../components/layout/Layout";
import { ShieldCheck, Handshake, Star } from "lucide-react";
import { Link } from "react-router-dom";
import SponsorshipSection from "../components/sections/SponsorshipSection";
import BenefitsSection from "../components/sections/BenefitsSection";
import FAQSection from "../components/sections/FAQSection";

/**
 * Page « Recommandations certifiées » (anciennement Parrainage)
 * 1. Hero minimal avec carte confiance
 * 2. Sections spécifiques : parrainage (SponsorshipSection), parties prenantes (BenefitsSection) et FAQ.
 */
const ParrainagePage = () => {
  return (
    <Layout>
      {/* HERO */}
      <section className="reveal-on-scroll bg-gray-50 py-24 md:min-h-[75vh] flex items-center">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-14 items-center">
          {/* LEFT – copywriting */}
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              La <span className="text-highlight">recommandation certifiée</span> qui inspire confiance
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-md">
              Découvrez comment CertyLink révolutionne l'insertion professionnelle grâce à un système
              d'attestations authentifiées par vos anciens employeurs.
            </p>
            <Link
              to="/creer"
              className="inline-flex items-center justify-center rounded-full bg-highlight px-7 py-3 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Créer mon profil
            </Link>
          </div>

          {/* RIGHT – trust card */}
          <div className="relative">
            <div className="relative isolate overflow-hidden rounded-3xl bg-white/90 shadow-xl backdrop-blur-md ring-1 ring-gray-200/70 dark:bg-gray-800/80 dark:ring-gray-700 w-full max-w-sm mx-auto">
              {/* gradient top */}
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-highlight via-purple-400 to-indigo-400 rounded-t-3xl" />

              <div className="p-10 flex flex-col items-center text-center gap-8">
                {/* shield icon */}
                <span className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
                  <ShieldCheck className="h-8 w-8 text-indigo-500" />
                </span>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white max-w-xs">
                  Chaque recommandation est <span className="text-highlight">authentifiée</span>
                </h3>

                <ul className="flex flex-col gap-4 text-left text-sm">
                  <li className="flex items-start gap-3">
                    <Handshake className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>
                      Employeur contacté directement pour confirmer la collaboration
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>
                      Vérification de l'identité professionnelle via email ou LinkedIn
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>
                      Badge « Confiance » ajouté sur votre profil une fois l'attestation validée
                    </span>
                  </li>
                </ul>

                <Link
                  to="#benefits"
                  className="rounded-full bg-gray-900/90 dark:bg-white/10 text-white dark:text-gray-100 px-6 py-2 text-sm font-semibold hover:bg-gray-900 transition-colors"
                >
                  En savoir plus
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sections spécifiques à la page Parrainage */}
      <SponsorshipSection />
      <BenefitsSection />
      <FAQSection />
    </Layout>
  );
};

export default ParrainagePage;
