import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function ConfirmSent() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Vérifiez votre boîte mail</h1>
        <p className="mb-6 text-gray-700">
          Un e-mail de confirmation vient de vous être envoyé. Cliquez sur le lien qu’il contient pour activer votre compte.
        </p>
        <Button asChild>
          <Link to="/login">Retour à la connexion</Link>
        </Button>
      </div>
    </Layout>
  );
}
