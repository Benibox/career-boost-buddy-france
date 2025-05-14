
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-highlight flex items-center justify-center text-white font-semibold">
                C
              </div>
              <span className="font-bold text-lg">CertyLink</span>
            </div>
            <p className="text-sm text-gray-400">
              Votre passeport emploi en un clic. CertyLink aide les jeunes de 16 à 25 ans à prouver leur fiabilité.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Accueil</Link></li>
              <li><Link to="/parrainage" className="text-gray-400 hover:text-white">Le parrainage</Link></li>
              <li><Link to="/qui-sommes-nous" className="text-gray-400 hover:text-white">Qui sommes-nous</Link></li>
              <li><Link to="/comment-ca-marche" className="text-gray-400 hover:text-white">Comment ça marche</Link></li>
              <li><Link to="/creer" className="text-gray-400 hover:text-white">Créer mon profil</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Utilisateurs</h3>
            <ul className="space-y-2">
              <li><Link to="/candidats" className="text-gray-400 hover:text-white">Candidats</Link></li>
              <li><Link to="/parrains" className="text-gray-400 hover:text-white">Parrains</Link></li>
              <li><Link to="/employeurs" className="text-gray-400 hover:text-white">Employeurs</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Légal</h3>
            <ul className="space-y-2">
              <li><Link to="/confidentialite" className="text-gray-400 hover:text-white">Politique de confidentialité</Link></li>
              <li><Link to="/conditions" className="text-gray-400 hover:text-white">Conditions d'utilisation</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>© 2025 CertyLink - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
