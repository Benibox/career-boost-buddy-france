
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

const Profil = () => {
  // Ces données viendraient normalement d'un état global ou d'une API
  const [userProfile] = useState({
    name: "Jean Dupont",
    avatarUrl: "", // URL de l'avatar si disponible
    email: "jean.dupont@example.com",
    validatedExperiences: [
      { id: 1, title: "Développeur Web", company: "TechCorp", validatedBy: "Marie Martin", date: "2023-05-15" },
      { id: 2, title: "Chef de Projet", company: "DigitalAgency", validatedBy: "Thomas Bernard", date: "2023-08-22" },
    ]
  });

  return (
    <Layout>
      <div className="container mx-auto py-10 pt-24">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} />
                    <AvatarFallback className="text-xl bg-highlight text-white">
                      {userProfile.name.split(' ').map(name => name[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h2 className="text-xl font-bold">{userProfile.name}</h2>
                    <p className="text-sm text-gray-500">{userProfile.email}</p>
                  </div>
                  <Button className="w-full bg-highlight hover:bg-darkpurple">
                    Modifier mon profil
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:w-3/4">
            <Tabs defaultValue="experiences">
              <TabsList className="w-full">
                <TabsTrigger value="experiences" className="flex-1">Expériences validées</TabsTrigger>
                <TabsTrigger value="parrainages" className="flex-1">Mes parrainages</TabsTrigger>
                <TabsTrigger value="parametres" className="flex-1">Paramètres</TabsTrigger>
              </TabsList>
              
              <TabsContent value="experiences">
                <Card>
                  <CardHeader>
                    <CardTitle>Mes expériences validées</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {userProfile.validatedExperiences.length > 0 ? (
                      <div className="space-y-4">
                        {userProfile.validatedExperiences.map(exp => (
                          <Card key={exp.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex justify-between">
                                <div>
                                  <h3 className="font-medium">{exp.title}</h3>
                                  <p className="text-sm text-gray-500">{exp.company}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-xs text-gray-400">Validé par {exp.validatedBy}</p>
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
                        Vous n'avez pas encore d'expériences validées.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="parrainages">
                <Card>
                  <CardHeader>
                    <CardTitle>Mes parrainages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-4 text-gray-500">
                      Vous n'avez pas encore parrainé de personnes.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="parametres">
                <Card>
                  <CardHeader>
                    <CardTitle>Paramètres du compte</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">Modifier les paramètres de votre compte.</p>
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
};

export default Profil;
