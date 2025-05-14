
const MissionSection = () => {
  return (
    <section className="py-16 bg-white reveal-on-scroll">
      <div className="container mx-auto px-4">
        <h2 className="section-title">
          Notre <span className="highlight-text">mission</span>
        </h2>
        
        <div className="max-w-3xl mx-auto bg-gray-50 p-8 rounded-lg border border-gray-100">
          <p className="text-gray-700 mb-4">
            CertyLink est né d'un constat simple : les candidats rencontrent des difficultés pour prouver leur fiabilité auprès des employeurs potentiels.
          </p>
          
          <p className="text-gray-700 mb-4">
            Notre mission est de créer un pont de confiance entre les candidats et les recruteurs en offrant un système de validation des expériences simple, fiable et efficace.
          </p>
          
          <p className="text-gray-700">
            Nous croyons que chaque expérience compte, et que la parole d'un ancien employeur, d'un professeur ou d'un mentor peut faire toute la différence dans un parcours professionnel.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
