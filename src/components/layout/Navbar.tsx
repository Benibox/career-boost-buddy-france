
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ease-out ${
        scrolled 
          ? "h-14 bg-white/90 dark:bg-gray-900/90" 
          : "h-20 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div 
            className={`rounded-full bg-highlight flex items-center justify-center text-white font-semibold transition-all duration-300 ease-out ${
              scrolled ? "h-6 w-6" : "h-8 w-8"
            }`}
          >
            T
          </div>
          <Link 
            to="/" 
            className={`font-bold transition-all duration-300 ease-out ${
              scrolled ? "text-base" : "text-lg"
            }`}
          >
            Trust my Job
          </Link>
        </div>

        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="hover:text-highlight">
            Accueil
          </Link>
          <Link to="/parrainage" className="hover:text-highlight">
            Le parrainage
          </Link>
          <Link to="/qui-sommes-nous" className="hover:text-highlight">
            Qui sommes-nous
          </Link>
        </nav>

        <div className="flex space-x-3">
          <Button asChild className="bg-highlight hover:bg-darkpurple">
            <Link to="/creer">Créer mon profil</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
