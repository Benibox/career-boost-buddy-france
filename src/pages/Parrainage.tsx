
import Hero from "@/components/sections/Hero";
import SponsorshipSection from "@/components/sections/SponsorshipSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import FAQSection from "@/components/sections/FAQSection";
import Layout from "@/components/layout/Layout";
import { User, Search, Users } from "lucide-react";

const Parrainage = () => {
  return (
    <Layout>
      <Hero
        title="Le parrainage"
        highlightedText="qui donne confiance"
        description="Découvrez comment CertyLink transforme l'insertion professionnelle des candidats grâce à un système de validation simple mais puissant."
      />
      <SponsorshipSection />
      <BenefitsSection />
      <FAQSection />
    </Layout>
  );
};

export default Parrainage;
