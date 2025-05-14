
const testimonialsData = [
  {
    quote: "J'ai décroché mon premier stage grâce à la validation de mon ancien prof. Le recruteur m'a dit que c'était ce qui avait fait la différence !",
    name: "Thomas B.",
    position: "Étudiant",
  },
  {
    quote: "CertyLink nous fait gagner un temps précieux pour vérifier les profils des candidats. C'est simple et efficace.",
    name: "Sophie L.",
    position: "Responsable RH",
  },
  {
    quote: "Je peux facilement valider les profils de mes anciens élèves en quelques clics. C'est gratifiant de les aider à entrer dans la vie active.",
    name: "Marc D.",
    position: "Professeur",
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-white reveal-on-scroll">
      <div className="container mx-auto px-4">
        <h2 className="section-title">
          Ils nous font <span className="highlight-text">confiance</span>
        </h2>
        <p className="section-subtitle mb-8">
          Découvrez ce que nos utilisateurs disent de CertyLink
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg border border-gray-100 feature-card"
            >
              <p className="italic text-gray-700 mb-4">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.position}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-highlight hover:bg-darkpurple text-white font-medium py-3 px-8 rounded-md transition-colors">
            Rejoindre CertyLink
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
