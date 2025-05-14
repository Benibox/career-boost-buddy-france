
import { User, Search } from "lucide-react";
import Hero from "@/components/sections/Hero";
import ProcessSection from "@/components/sections/ProcessSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import VerificationSection from "@/components/sections/VerificationSection";
import Layout from "@/components/layout/Layout";

const Index = () => {
  return (
    <Layout>
      <Hero
        title="Faites-vous"
        highlightedText="remarquer"
        description="Prouvez votre fiabilité grâce à des validations de personnes de confiance."
        showProfile={true}
        showAnchorHint={true}
      />
      <VerificationSection />
      <ProcessSection />
      <TestimonialSection />
    </Layout>
  );
};

export default Index;
