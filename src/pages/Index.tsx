
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
        description="CertyLink permet aux candidats de prouver leur fiabilité grâce à un système de validation simple par des personnes de confiance."
        showProfile={true}
      />
      <VerificationSection />
      <ProcessSection />
      <TestimonialSection />
    </Layout>
  );
};

export default Index;
