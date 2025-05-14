
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User, CheckCircle, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

interface HeroProps {
  title: string;
  highlightedText: string;
  description: string;
  showProfile?: boolean;
  showAnchorHint?: boolean;
}

const Hero = ({ 
  title, 
  highlightedText, 
  description, 
  showProfile = false,
  showAnchorHint = false 
}: HeroProps) => {
  const [floating, setFloating] = useState(false);

  // Animation effect for the anchor chevron
  useEffect(() => {
    const interval = setInterval(() => {
      setFloating(prev => !prev);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const scrollToNextSection = () => {
    // Find the next section and scroll to it
    const nextSection = document.querySelector('.reveal-on-scroll:nth-child(2)');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 md:py-24 bg-gradient-to-b from-gray-50 to-white reveal-on-scroll relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(155,135,245,0.15),transparent)]"></div>
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#9b87f5" strokeWidth="0.5" opacity="0.3"></path>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"></rect>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
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
        
        {showAnchorHint && (
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 bottom-4 cursor-pointer flex flex-col items-center animate-fade-in"
            onClick={scrollToNextSection}
          >
            <p className="text-gray-500 mb-2">Découvrez comment ça marche</p>
            <div className={`transition-transform duration-700 ease-in-out ${floating ? 'translate-y-1' : '-translate-y-1'}`}>
              <ChevronDown className="h-6 w-6 text-highlight" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
