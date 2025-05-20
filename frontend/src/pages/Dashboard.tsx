/* src/pages/Dashboard.tsx */
import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  BadgeCheck,
  Clock,
  XCircle,
  Pencil,
  File,
  Share2,
  Plus,
} from 'lucide-react';

import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

/* ---------- modèles ---------- */
type ExpStatus = 'draft' | 'submitted' | 'validated' | 'rejected';
interface Experience {
  _id: string;
  title: string;
  company?: string;
  status: ExpStatus;
  startDate?: string;
  endDate?: string;
}

/* ---------- helpers ---------- */
const prettyDate = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleDateString('fr-FR', {
        month: 'short',
        year: 'numeric',
      })
    : '';

/* ➜ nouveau pictogramme pour “draft”  */
const statusIcon: Record<ExpStatus, JSX.Element> = {
  draft:     <File       className="h-4 w-4 text-gray-500" />,
  submitted: <Clock      className="h-4 w-4 text-orange-500" />,
  validated: <BadgeCheck className="h-4 w-4 text-green-600" />,
  rejected:  <XCircle    className="h-4 w-4 text-red-600" />,
};

export default function Dashboard() {
  const { user }   = useAuth();
  const navigate   = useNavigate();
  const BASE       = import.meta.env.VITE_BACKEND_URL || '';

  /* ---------- fetch ---------- */
  const { data: exps = [], isLoading, isError } = useQuery<Experience[]>({
    queryKey : ['experiences'],
    enabled  : !!user,
    queryFn  : async () => {
      const r = await fetch(`${BASE}/api/users/me/experiences`, {
        credentials: 'include',
      });
      if (!r.ok) throw new Error();
      return r.json();
    },
    staleTime: 30_000,
  });

  /* ---------- regroupements ---------- */
  const { draft, pending, validated, rejected } = useMemo(() => {
    const g = { draft: [] as Experience[], pending: [] as Experience[], validated: [] as Experience[], rejected: [] as Experience[] };
    exps.forEach((e) => {
      if      (e.status === 'draft')      g.draft.push(e);
      else if (e.status === 'submitted')  g.pending.push(e);
      else if (e.status === 'validated')  g.validated.push(e);
      else                                g.rejected.push(e);
    });
    return g;
  }, [exps]);

  /* ---------- util ---------- */
  const statCard = (label: string, value: number, color: string) => (
    <Card>
      <CardHeader><CardTitle>{label}</CardTitle></CardHeader>
      <CardContent>
        <p className={`text-4xl font-semibold ${color}`}>{isLoading ? '…' : value}</p>
      </CardContent>
    </Card>
  );

  const renderTable = (list: Experience[]) =>
    list.length ? (
      <div className="space-y-4">
        {list.map((e) => (
          <Card key={e._id} className="hover:shadow transition-shadow">
            <CardContent className="p-4 flex justify-between items-center">
              {/* infos -------------------------------------------------- */}
              <div>
                <h3 className="font-medium">{e.title}</h3>
                {e.company && <p className="text-sm text-gray-500">{e.company}</p>}
                {(e.startDate || e.endDate) && (
                  <p className="text-xs text-gray-400">
                    {prettyDate(e.startDate)} – {prettyDate(e.endDate) || '…'}
                  </p>
                )}
              </div>

              {/* actions + statut ------------------------------------- */}
              <div className="flex items-center gap-4">
                {statusIcon[e.status]}

                {/* ✏️ modifier – uniquement brouillon OU soumis -------- */}
                {(e.status === 'draft' || e.status === 'submitted') && (
                  <Button
                    size="icon"
                    variant="ghost"
                    title="Modifier"
                    onClick={() => navigate(`/experiences/${e._id}/edit`)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                )}

                {/* 🔗 partager --------------------------------------- */}
                <Button
                  size="icon"
                  variant="ghost"
                  title="Copier le lien de validation"
                  onClick={() => {
                    const url = `${window.location.origin}/validate/${e._id}`;
                    navigator.clipboard.writeText(url);
                  }}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    ) : (
      <p className="py-6 text-center text-gray-500">Aucune expérience.</p>
    );

  /* ---------- rendu ---------- */
  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 pt-24">
        {/* header ---------------------------------------------------- */}
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            Bonjour, <span className="text-highlight">{user?.firstName}</span>
          </h1>
          <Button asChild className="gap-2 bg-highlight hover:bg-darkpurple">
            <Link to="/experiences/new">
              <Plus className="h-5 w-5" /> Ajouter une expérience
            </Link>
          </Button>
        </header>

        {/* stats ----------------------------------------------------- */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          {statCard('Brouillons' , draft.length    , 'text-gray-500' )}
          {statCard('En attente' , pending.length  , 'text-orange-500')}
          {statCard('Validées'   , validated.length, 'text-green-600')}
          {statCard('Refusées'   , rejected.length , 'text-red-600' )}
        </div>

        {/* listes ---------------------------------------------------- */}
        {isError ? (
          <p className="text-red-600 text-center">Erreur de chargement.</p>
        ) : (
          <Tabs defaultValue="draft">
            <TabsList className="mb-6">
              <TabsTrigger value="draft"     className="flex-1">Brouillons</TabsTrigger>
              <TabsTrigger value="pending"   className="flex-1">En&nbsp;attente</TabsTrigger>
              <TabsTrigger value="validated" className="flex-1">Validées</TabsTrigger>
              <TabsTrigger value="rejected"  className="flex-1">Refusées</TabsTrigger>
            </TabsList>

            <TabsContent value="draft">{renderTable(draft)}</TabsContent>
            <TabsContent value="pending">{renderTable(pending)}</TabsContent>
            <TabsContent value="validated">{renderTable(validated)}</TabsContent>
            <TabsContent value="rejected">{renderTable(rejected)}</TabsContent>
          </Tabs>
        )}
      </div>
    </Layout>
  );
}
