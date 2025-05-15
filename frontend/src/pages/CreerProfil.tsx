
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon, User, Lock, Mail } from "lucide-react";

import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  role: z.enum(["Employeur", "Employé"], {
    required_error: "Veuillez sélectionner votre rôle",
  }),
  prenom: z.string().min(2, {
    message: "Le prénom doit contenir au moins 2 caractères",
  }),
  nom: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }),
  dateNaissance: z.date({
    required_error: "La date de naissance est requise",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide",
  }),
  password: z.string().min(8, {
    message: "Le mot de passe doit contenir au moins 8 caractères",
  }),
});

const CreerProfil = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: undefined,
      prenom: "",
      nom: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // Traitement du formulaire à implémenter
  };

  return (
    <Layout>
      <div className="py-12 container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Créez votre <span className="text-highlight">profil</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center mb-10">
          En quelques minutes seulement, créez votre profil et commencez votre parcours
        </p>
        
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-lg font-medium">Je suis</h2>
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col sm:flex-row sm:gap-6 gap-2"
                        >
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="employeur" id="employeur" />
                            <Label htmlFor="employeur" className="cursor-pointer">Employeur</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="employe" id="employe" />
                            <Label htmlFor="employe" className="cursor-pointer">Employé</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="prenom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                          <Input className="pl-10" placeholder="Entrez votre prénom" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                          <Input className="pl-10" placeholder="Entrez votre nom" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="dateNaissance"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date de naissance</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal flex justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <div className="flex items-center">
                              <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                              {field.value ? (
                                format(field.value, "dd MMMM yyyy", { locale: fr })
                              ) : (
                                "Sélectionnez une date"
                              )}
                            </div>
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          captionLayout="dropdown-buttons"
                          selected={field.value}
                          onSelect={field.onChange}
                          fromYear={1940}
                          toYear={2010}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1940-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input className="pl-10" placeholder="vous@exemple.com" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input 
                          className="pl-10" 
                          placeholder="********" 
                          type="password" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-highlight hover:bg-darkpurple"
              >
                Créer mon profil
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default CreerProfil;
