
import Hero from "@/components/sections/Hero";
import MissionSection from "@/components/sections/MissionSection";
import ValuesSection from "@/components/sections/ValuesSection";
import TeamSection from "@/components/sections/TeamSection";
import Layout from "@/components/layout/Layout";

const QuiSommesNous = () => {
  return (
    <Layout>
      <Hero
        title="Qui"
        highlightedText="sommes-nous"
        description="Découvrez l'équipe derrière CertyLink et notre mission d'aider les candidats à valoriser leurs expériences professionnelles."
      />
      <MissionSection />
      <ValuesSection />
      <TeamSection />
    </Layout>
  );
};

export default QuiSommesNous;
