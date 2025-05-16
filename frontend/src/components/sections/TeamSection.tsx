import { User } from "lucide-react";

/**
 * TeamSection – section présentant uniquement les deux co-fondateurs.
 */
const team = [
  {
    name: "Ethan B.",
    role: "CEO & Co-fondateur",
    bio: "Entrepreneur passionné, Ethan pilote la vision stratégique et le développement de CertyLink.",
  },
  {
    name: "Ulysse T.",
    role: "CTO & Co-fondateur",
    bio: "Ingénieur full-stack, Ulysse conçoit et sécurise la plateforme pour garantir la confiance.",
  },
] as const;

const TeamSection = () => {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-purple-50 to-white py-24 reveal-on-scroll">
      {/* wave top */}
      <div className="absolute -top-1 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-[calc(100%+1.5px)] h-12 text-white" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0 32l48 5.3C96 43 192 53 288 58.7 384 64 480 64 576 53.3 672 43 768 21 864 16s192 5 288 21.3C1248 53 1344 75 1392 85.3l48 10.7V0H0z" fill="currentColor" />
        </svg>
      </div>

      <div className="container mx-auto px-4 text-center">
        <h2 className="section-title mb-4">
          Notre <span className="highlight-text">équipe</span>
        </h2>
        <p className="section-subtitle max-w-3xl mx-auto mb-16">
          Rencontrez les deux co-fondateurs déterminés à transformer le recrutement.
        </p>

        <div className="grid gap-10 md:grid-cols-2 max-w-4xl mx-auto">
          {team.map(({ name, role, bio }) => (
            <div
              key={name}
              className="flex flex-col items-center text-center rounded-2xl bg-white/80 backdrop-blur p-10 shadow-lg ring-1 ring-gray-200 hover:shadow-xl transition-shadow"
            >
              <span className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center mb-6">
                <User className="h-10 w-10 text-indigo-500" />
              </span>
              <h3 className="font-semibold text-xl text-gray-900 mb-1">{name}</h3>
              <p className="text-highlight text-sm font-medium mb-4">{role}</p>
              <p className="text-sm text-gray-700 leading-relaxed max-w-xs">{bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* wave bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-[calc(100%+1.5px)] h-12 text-gray-50" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0 0l48 10.7C96 21 192 43 288 48.7 384 54 480 43 576 32 672 21 768 11 864 10.7c96-.3 192 10.7 288 26.6C1248 64 1344 75 1392 80l48 5v-96H0z" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
};

export default TeamSection;
