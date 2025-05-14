
import Layout from "@/components/layout/Layout";

const ValiderProfil = () => {
  return (
    <Layout>
      <div className="py-16 container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Validez un <span className="text-highlight">profil</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center mb-10">
          Vous avez reçu une invitation à valider l'expérience professionnelle d'un candidat ? Complétez le processus ici.
        </p>
        
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <p className="text-center text-gray-500 mb-8">
            Formulaire de validation de profil à venir...
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ValiderProfil;
