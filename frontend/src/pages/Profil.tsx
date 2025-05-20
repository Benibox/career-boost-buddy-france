import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';

/* ---------- types ---------- */
interface Experience {
  _id: string;
  title: string;
  company?: string;
  validatedBy: string;
  date: string; // ISO
}

/* ---------- helpers ---------- */
const initials = (full: string) =>
  full
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

export default function Profil() {
  const { user } = useAuth(); // { _id, firstName, lastName, email, avatarUrl? }
  const BASE = import.meta.env.VITE_BACKEND_URL || '';

  /* profil détaillé (si AuthContext ne contient pas tout) -------- */
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    enabled: !!user, // ne lance qu’après auth
    queryFn: async () => {
      const r = await fetch(`${BASE}/api/users/me`, { credentials: 'include' });
      if (!r.ok) throw new Error();
      return r.json() as Promise<{
        firstName: string;
        lastName: string;
        email: string;
        avatarUrl?: string;
      }>;
    },
    initialData: user && {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatarUrl: (user as any).avatarUrl,
    },
    staleTime: 60_000,
  });

  /* expériences validées ---------------------------------------- */
  const { data: experiences = [], isLoading } = useQuery<Experience[]>({
    queryKey: ['experiences'],
    enabled: !!user,
    queryFn: async () => {
      const r = await fetch(`${BASE}/api/users/me/experiences`, {
        credentials: 'include',
      });
      return r.ok ? r.json() : [];
    },
  });

  if (!profile) return <Layout>Chargement…</Layout>;

  const fullName = `${profile.firstName} ${profile.lastName}`;

  return (
    <Layout>
      <div className="container mx-auto py-10 pt-24">
        <div className="flex flex-col md:flex-row gap-6">
          {/* -------- colonne gauche -------- */}
          <div className="md:w-1/4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.avatarUrl} alt={fullName} />
                    <AvatarFallback className="text-xl bg-highlight text-white">
                      {initials(fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h2 className="text-xl font-bold">{fullName}</h2>
                    <p className="text-sm text-gray-500">{profile.email}</p>
                  </div>
                  <Button className="w-full bg-highlight hover:bg-darkpurple">
                    Modifier mon profil
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* -------- colonne droite -------- */}
          <div className="md:w-3/4">
            <Tabs defaultValue="experiences">
              <TabsList className="w-full">
                <TabsTrigger value="experiences" className="flex-1">
                  Expériences validées
                </TabsTrigger>
                <TabsTrigger value="parrainages" className="flex-1">
                  Mes parrainages
                </TabsTrigger>
                <TabsTrigger value="parametres" className="flex-1">
                  Paramètres
                </TabsTrigger>
              </TabsList>

              {/* ----- expériences ----- */}
              <TabsContent value="experiences">
                <Card>
                  <CardHeader>
                    <CardTitle>Mes expériences validées</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <p className="text-center py-4 text-gray-500">Chargement…</p>
                    ) : experiences.length ? (
                      <div className="space-y-4">
                        {experiences.map((exp) => (
                          <Card
                            key={exp._id}
                            className="hover:shadow-md transition-shadow"
                          >
                            <CardContent className="p-4">
                              <div className="flex justify-between">
                                <div>
                                  <h3 className="font-medium">{exp.title}</h3>
                                  {exp.company && (
                                    <p className="text-sm text-gray-500">
                                      {exp.company}
                                    </p>
                                  )}
                                </div>
                                <div className="text-right">
                                  <p className="text-xs text-gray-400">
                                    Validé par {exp.validatedBy}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    {new Date(exp.date).toLocaleDateString('fr-FR')}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center py-4 text-gray-500">
                        Vous n&apos;avez pas encore d&apos;expériences validées.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ----- parrainages (placeholder) ----- */}
              <TabsContent value="parrainages">
                <Card>
                  <CardHeader>
                    <CardTitle>Mes parrainages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-4 text-gray-500">
                      Vous n&apos;avez pas encore parrainé de personnes.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ----- paramètres ----- */}
              <TabsContent value="parametres">
                <Card>
                  <CardHeader>
                    <CardTitle>Paramètres du compte</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      Modifier les paramètres de votre compte.
                    </p>
                    <Button variant="outline" className="mb-2 w-full sm:w-auto">
                      Changer mon mot de passe
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
}
