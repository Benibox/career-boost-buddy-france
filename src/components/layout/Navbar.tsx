
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="border-b py-4 bg-white">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-highlight flex items-center justify-center text-white font-semibold">
            C
          </div>
          <Link to="/" className="font-bold text-lg">
            CertyLink
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
