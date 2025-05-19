import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();

  // TODO: récupérer via react-query les stats « liens envoyés » et « expériences validées »
  const stats = {
    linksSent: 0,
    experiencesValidated: 0,
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 pt-24">
        <h1 className="text-3xl font-bold mb-8">
          Bonjour, <span className="text-highlight">{user?.firstName}</span>
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <Card>
            <CardHeader>
              <CardTitle>Liens envoyés</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-semibold">{stats.linksSent}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Expériences validées</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-semibold">{stats.experiencesValidated}</p>
            </CardContent>
          </Card>
        </div>

        <Link
          to="/experiences/new"
          className="inline-flex bg-highlight hover:bg-darkpurple text-white rounded-full px-6 py-3 font-medium"
        >
          Ajouter une expérience
        </Link>
      </div>
    </Layout>
  );
}
