import Layout from "../components/layout/Layout";
import AboutHero from "../components/sections/AboutHero";
import MissionSection from "../components/sections/MissionSection";
import TeamSection from "../components/sections/TeamSection";
import ValuesSection from "../components/sections/ValuesSection";
import FAQSection from "../components/sections/FAQSection";

const QuiSommesNous = () => {
  return (
    <Layout>
      <AboutHero />
      <MissionSection />
      <ValuesSection />
      <TeamSection />
      <FAQSection />
    </Layout>
  );
};

export default QuiSommesNous;
