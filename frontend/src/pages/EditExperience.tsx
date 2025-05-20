import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import Layout   from '@/components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input }    from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button }   from '@/components/ui/button';

/* ---------- types ---------- */
type ExpStatus = 'draft' | 'submitted' | 'validated' | 'rejected';

interface Experience {
  _id: string;
  title: string;
  company?: string;
  status: ExpStatus;
  startDate?: string;
  endDate?: string;
  shortDesc?: string;
  location?: string;
}

/* ---------- const ---------- */
const BASE = import.meta.env.VITE_BACKEND_URL || '';

/* ======================================================================== */
/*                       C O M P O S A N T   P A G E                        */
/* ======================================================================== */
export default function EditExperience() {
  /* ---- routing ---- */
  const { id }   = useParams<{ id: string }>();
  const navigate = useNavigate();
  const qc       = useQueryClient();

  /* ---- fetch unique expérience ---- */
  const {
    data: exp,
    isLoading,
    isError,
  } = useQuery<Experience>({
    queryKey : ['experience', id],
    enabled  : !!id,
    queryFn  : async () => {
      const r = await fetch(`${BASE}/api/experiences/${id}`, {
        credentials: 'include',
      });
      if (!r.ok) throw new Error('Not found');
      return r.json();
    },
  });

  /* ---- formulaire local ---- */
  const [form, setForm] = useState<Omit<Experience, '_id' | 'status'>>({
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    shortDesc: '',
    location: '',
  });

  /* pré-remplir quand l’API a répondu */
  useEffect(() => {
    if (exp) {
      setForm({
        title     : exp.title     ?? '',
        company   : exp.company   ?? '',
        startDate : exp.startDate ?? '',
        endDate   : exp.endDate   ?? '',
        shortDesc : exp.shortDesc ?? '',
        location  : exp.location  ?? '',
      });
    }
  }, [exp]);

  /* ---- mutation save ---- */
  const saveMut = useMutation({
    mutationFn: async () => {
      const r = await fetch(`${BASE}/api/experiences/${id}`, {
        method      : 'PUT',
        credentials : 'include',
        headers     : { 'Content-Type': 'application/json' },
        body        : JSON.stringify(form),
      });
      if (!r.ok) throw new Error('Update failed');
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['experiences'] });
      navigate('/dashboard');
    },
  });

  /* ---- guards UX ---- */
  if (isLoading) {
    return (
      <Layout>
        <div className="pt-24 text-center">Chargement…</div>
      </Layout>
    );
  }
  if (isError || !exp) {
    return (
      <Layout>
        <div className="pt-24 text-center text-red-600">
          Impossible de charger l’expérience.
        </div>
      </Layout>
    );
  }
  if (exp.status === 'validated' || exp.status === 'rejected') {
    return (
      <Layout>
        <div className="pt-24 text-center text-red-600">
          Impossible de modifier une expérience déjà validée ou refusée.
        </div>
      </Layout>
    );
  }

  /* ---- handlers ---- */
  const handleChange =
    (key: keyof typeof form) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    saveMut.mutate();
  };

  /* ---- render ---- */
  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 pt-24 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Modifier l’expérience</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Titre / poste"
                placeholder="Développeur front-end…"
                value={form.title}
                onChange={handleChange('title')}
                required
              />

              <Input
                label="Entreprise / organisation"
                placeholder="Acme Corp"
                value={form.company}
                onChange={handleChange('company')}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="date"
                  label="Début"
                  value={form.startDate?.slice(0, 10)}
                  onChange={handleChange('startDate')}
                />
                <Input
                  type="date"
                  label="Fin"
                  value={form.endDate?.slice(0, 10)}
                  onChange={handleChange('endDate')}
                />
              </div>

              <Input
                label="Localisation"
                placeholder="Paris, Remote…"
                value={form.location}
                onChange={handleChange('location')}
              />

              <Textarea
                label="Description courte"
                placeholder="(facultatif)"
                value={form.shortDesc}
                onChange={handleChange('shortDesc')}
              />

              <Button className="w-full" disabled={saveMut.isLoading}>
                Enregistrer
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
