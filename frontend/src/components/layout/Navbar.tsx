import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/* ------------------------------------------------
 * Remplacer ce hook par votre logique d’auth plus tard
 * ------------------------------------------------ */
const useUserProfile = () => {
  return {
    isAuthenticated: false,
    profileExists: false,
    name: "",
    avatarUrl: "",
  };
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const userProfile = useUserProfile();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // fonction de classe réutilisable pour les NavLink
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-all ${
      isActive
        ? "text-highlight font-semibold"   // actif : souligné en violet
        : "text-gray-700 hover:text-highlight"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled ? "h-14 bg-white/90 dark:bg-gray-900/90" : "h-20 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-full flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className={`rounded-full bg-highlight text-white font-semibold flex items-center justify-center transition-all ${
              scrolled ? "h-6 w-6" : "h-8 w-8"
            }`}
          >
            T
          </div>
          <NavLink to="/" className={({ isActive }) => (isActive ? "text-highlight text-lg font-bold" : "text-lg font-bold text-gray-900")}>
            Trust&nbsp;my&nbsp;Job
          </NavLink>
        </div>

        {/* Menu desktop */}
        <nav className="hidden md:flex space-x-8">
          <NavLink to="/" className={linkClass}>
            Accueil
          </NavLink>
          <NavLink to="/parrainage" className={linkClass}>
            Le&nbsp;parrainage
          </NavLink>
          <NavLink to="/qui-sommes-nous" className={linkClass}>
            Qui&nbsp;sommes-nous
          </NavLink>
        </nav>

        {/* Actions profil / auth */}
        <div className="flex space-x-3">
          {userProfile.isAuthenticated ? (
            <NavLink to="/profil">
              <Avatar className="cursor-pointer transition-transform hover:scale-105">
                <AvatarImage src={userProfile.avatarUrl} alt="Profil" />
                <AvatarFallback className="bg-highlight text-white">
                  {userProfile.name ? userProfile.name.charAt(0) : "U"}
                </AvatarFallback>
              </Avatar>
            </NavLink>
          ) : (
            <>
              <Button
                asChild
                variant="outline"
                className="border-highlight text-highlight hover:bg-highlight/10"
              >
                <NavLink to="/login">Se&nbsp;connecter</NavLink>
              </Button>
              <Button asChild className="bg-highlight hover:bg-darkpurple">
                <NavLink to="/creer">Créer&nbsp;mon&nbsp;profil</NavLink>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
