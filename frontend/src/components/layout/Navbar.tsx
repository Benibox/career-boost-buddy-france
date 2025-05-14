import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/* ------------------------------------------------
 * Remplacer ce hook par votre logique d’auth plus tard
 * ------------------------------------------------ */
const useUserProfile = () => {
  // TODO : lire token / profil depuis le contexte ou l’API
  return {
    isAuthenticated: false,       // ← token présent ?
    profileExists: false,         // ← profil complété ?
    name: "",
    avatarUrl: "",
  };
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const userProfile = useUserProfile();

  /* ------------------------------------------------
   * Effet scroll (ombre + hauteur réduite)
   * ------------------------------------------------ */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled ? "h-14 bg-white/90 dark:bg-gray-900/90" : "h-20 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-full flex justify-between items-center">
        {/* ---------- Logo ---------- */}
        <div className="flex items-center gap-2">
          <div
            className={`rounded-full bg-highlight text-white font-semibold flex items-center justify-center transition-all ${
              scrolled ? "h-6 w-6" : "h-8 w-8"
            }`}
          >
            T
          </div>
          <Link
            to="/"
            className={`font-bold transition-all ${
              scrolled ? "text-base" : "text-lg"
            }`}
          >
            Trust&nbsp;my&nbsp;Job
          </Link>
        </div>

        {/* ---------- Menu desktop ---------- */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="hover:text-highlight">
            Accueil
          </Link>
          <Link to="/parrainage" className="hover:text-highlight">
            Le&nbsp;parrainage
          </Link>
          <Link to="/qui-sommes-nous" className="hover:text-highlight">
            Qui&nbsp;sommes-nous
          </Link>
        </nav>

        {/* ---------- Actions profil / auth ---------- */}
        <div className="flex space-x-3">
          {userProfile.isAuthenticated ? (
            /* Profil présent → avatar cliquable */
            <Link to="/profil">
              <Avatar className="cursor-pointer transition-transform hover:scale-105">
                <AvatarImage src={userProfile.avatarUrl} alt="Profil" />
                <AvatarFallback className="bg-highlight text-white">
                  {userProfile.name ? userProfile.name.charAt(0) : "U"}
                </AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            /* Non connecté → bouton Login + bouton Register */
            <>
              <Button
                asChild
                variant="outline"
                className="border-highlight text-highlight hover:bg-highlight/10"
              >
                <Link to="/login">Se&nbsp;connecter</Link>
              </Button>
              <Button asChild className="bg-highlight hover:bg-darkpurple">
                <Link to="/creer">Créer&nbsp;mon&nbsp;profil</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
