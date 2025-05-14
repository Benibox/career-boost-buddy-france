
const teamMembers = [
  {
    name: "Sophie Martin",
    position: "Fondatrice & CEO",
    description: "Ancienne DRH passionnée par l'insertion professionnelle des candidats",
  },
  {
    name: "Thomas Dubois",
    position: "CTO",
    description: "Expert en technologie avec 10 ans d'expérience dans les startups",
  },
  {
    name: "Léa Bernard",
    position: "Responsable Partenariats",
    description: "Spécialiste des relations entreprises et du développement commercial",
  },
];

const TeamSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">
          Notre <span className="highlight-text">équipe</span>
        </h2>
        <p className="section-subtitle">
          Des passionnés engagés pour faire évoluer le monde du travail
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-24 h-24 rounded-full bg-lightpurple mx-auto mb-4 flex items-center justify-center">
                <Users className="h-10 w-10 text-highlight" />
              </div>
              <h3 className="font-semibold text-xl">{member.name}</h3>
              <p className="text-highlight mb-2">{member.position}</p>
              <p className="text-gray-600 text-sm">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
