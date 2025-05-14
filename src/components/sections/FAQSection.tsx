
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Qui peut valider mon profil ?",
      answer:
        "Seules les personnes avec qui vous avez réellement travaillé peuvent valider votre profil. Ce peuvent être d'anciens employeurs, professeurs, mentors ou collègues qui peuvent confirmer vos compétences et expériences.",
    },
    {
      question: "Comment fonctionne le processus de validation ?",
      answer:
        "Vous créez votre profil, puis vous invitez des parrains en leur envoyant un lien unique. Après vérification de leur identité, ils peuvent confirmer votre expérience et ajouter des commentaires personnalisés qui seront visibles par les recruteurs.",
    },
    {
      question: "Est-ce que CertyLink est gratuit ?",
      answer:
        "Oui, CertyLink est entièrement gratuit pour les candidats et les parrains. Nous proposons également des fonctionnalités avancées pour les employeurs avec des forfaits adaptés à leurs besoins.",
    },
    {
      question: "Comment puis-je partager mon profil validé ?",
      answer:
        "Une fois que votre profil est validé, vous recevez un lien unique et un badge de confiance que vous pouvez ajouter à votre CV ou partager directement avec les recruteurs. Vous pouvez également le partager sur vos réseaux sociaux professionnels.",
    },
    {
      question: "Mes données sont-elles protégées ?",
      answer:
        "Absolument. La protection de vos données est notre priorité. Nous respectons scrupuleusement le RGPD et n'utilisons vos informations que dans le cadre strict du service. Vous gardez le contrôle total sur vos données et pouvez les supprimer à tout moment.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 reveal-on-scroll">
      <div className="container mx-auto px-4">
        <h2 className="section-title">
          Questions <span className="highlight-text">fréquentes</span>
        </h2>
        <p className="section-subtitle">
          Tout ce que vous devez savoir sur notre plateforme
        </p>

        <div className="max-w-3xl mx-auto mt-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
