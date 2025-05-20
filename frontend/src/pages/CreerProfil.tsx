import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar as CalendarIcon, User, Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';

const schema = z.object({
  role: z.enum(['Employeur', 'Employé'], { required_error: 'Sélectionnez votre rôle' }),
  prenom: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  dateNaissance: z.date({ required_error: 'Date de naissance requise' }),
  email: z.string().email('Email invalide'),
  password: z.string().min(8, '8 caractères minimum'),
});

const BASE = import.meta.env.VITE_BACKEND_URL || '';

export default function CreerProfil() {
  const navigate           = useNavigate();
  const { login }          = useAuth();
  const [error, setError]  = useState<string | null>(null);
  const [saving, setSaving]= useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: undefined,
      prenom: '',
      nom: '',
      dateNaissance: undefined,
      email: '',
      password: '',
    },
  });

  /* ---------------- Soumission ---------------- */
  const onSubmit = async (v: z.infer<typeof schema>) => {
    setSaving(true);
    setError(null);

    try {
      /* 1️⃣  Inscription -------------------------------- */
      const payload = {
        firstName: v.prenom,
        lastName : v.nom,
        email    : v.email,
        password : v.password,
      };
      const res = await fetch(`${BASE}/api/auth/register`, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify(payload),
      });
      console.debug('POST /register →', res.status);
      if (!res.ok) {
        const { message } = await res.json().catch(() => ({ message: 'Erreur' }));
        throw new Error(message || 'Inscription impossible');
      }

      /* 2️⃣  Connexion automatique ---------------------- */
      await login(v.email, v.password);

      /* 3️⃣  Redirection onboarding --------------------- */
      navigate('/welcome');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  /* -------------------- UI -------------------- */
  return (
    <Layout>
      <div className="py-12 container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Créez votre <span className="text-highlight">profil</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center mb-10">
          Quelques minutes suffisent pour commencer votre parcours
        </p>

        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* rôle */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Je suis</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4">
                        {['Employeur', 'Employé'].map((val) => (
                          <div key={val} className="flex items-center gap-2">
                            <RadioGroupItem value={val} id={val} />
                            <Label htmlFor={val}>{val}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Prénom / Nom */}
              <div className="grid md:grid-cols-2 gap-4">
                {['prenom', 'nom'].map((field) => (
                  <FormField
                    key={field}
                    control={form.control}
                    name={field as 'prenom' | 'nom'}
                    render={({ field: f }) => (
                      <FormItem>
                        <FormLabel>{field === 'prenom' ? 'Prénom' : 'Nom'}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                            <Input {...f} className="pl-10" placeholder={field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              {/* Date naissance */}
              <FormField
                control={form.control}
                name="dateNaissance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de naissance</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full text-left flex justify-between',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value
                              ? format(field.value, 'dd MMMM yyyy', { locale: fr })
                              : 'Sélectionner une date'}
                            <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="p-0 w-auto">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          fromYear={1940}
                          toYear={2010}
                          disabled={(d) => d > new Date() || d < new Date('1940-01-01')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input {...field} className="pl-10" placeholder="vous@exemple.com" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input {...field} type="password" className="pl-10" placeholder="********" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && <p className="text-sm text-red-600 text-center">{error}</p>}

              <Button type="submit" className="w-full bg-highlight hover:bg-darkpurple" disabled={saving}>
                {saving ? 'Création…' : 'Créer mon profil'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
}
