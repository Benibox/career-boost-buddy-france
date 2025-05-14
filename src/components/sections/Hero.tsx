
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User, CheckCircle } from "lucide-react";

interface HeroProps {
  title: string;
  highlightedText: string;
  description: string;
  showProfile?: boolean;
}

const Hero = ({ title, highlightedText, description, showProfile = false }: HeroProps) => {
  return (
    <section className="py-12 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-center md:text-left md:pr-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {title} <span className="text-highlight">{highlightedText}</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl">
              {description}
            </p>
            <div className="space-x-4">
              <Button asChild size="lg" className="bg-highlight hover:bg-darkpurple">
                <Link to="/creer">Créer mon profil</Link>
              </Button>
              <Button variant="outline" asChild size="lg">
                <Link to="/valider">Valider un profil</Link>
              </Button>
            </div>
          </div>

          {showProfile && (
            <div className="w-full md:w-1/2 mt-10 md:mt-0">
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-8 w-8 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Marie Durand</h3>
                    <p className="text-gray-500">Étudiante</p>
                  </div>
                </div>

                <div className="border-t pt-4 mb-4">
                  <div className="bg-gray-50 rounded p-4 mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-medium">Serveuse</p>
                      <span className="h-6 w-6 rounded-full bg-yertle flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">Café Parisien · 3 mois</p>
                    <div className="mt-2 text-sm bg-green-50 border border-green-100 p-2 rounded">
                      <p className="text-green-800">
                        <span className="font-medium">Validée par Antoine Dupont</span>
                        <br />
                        "Marie est très professionnelle et ponctuelle. Excellente avec les clients et fiable."
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded p-4">
                    <p className="font-medium">Stagiaire Marketing</p>
                    <p className="text-sm text-gray-500">Agence Digitale · 2 mois</p>
                  </div>
                </div>

                <button className="w-full py-2 bg-highlight text-white rounded flex items-center justify-center gap-2 hover:bg-darkpurple transition-colors">
                  <span>Partager mon profil</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
