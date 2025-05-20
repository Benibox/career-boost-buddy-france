import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function AddExperience() {
  const { user } = useAuth();          // contient _id
  const navigate = useNavigate();
  const qc = useQueryClient();
  const BASE = import.meta.env.VITE_BACKEND_URL || '';

  /* ------ état local ------ */
  const [title,       setTitle]       = useState('');
  const [company,     setCompany]     = useState('');
  const [startDate,   setStartDate]   = useState<Date | undefined>();
  const [endDate,     setEndDate]     = useState<Date | undefined>();
  const [location,    setLocation]    = useState('');
  const [shortDesc,   setShortDesc]   = useState('');

  /* ------ mutation ------ */
  const createMut = useMutation({
    mutationFn: async () => {
      const payload = {
        title,
        company,
        location,
        shortDesc,
        startDate: startDate?.toISOString(),
        endDate:   endDate?.toISOString(),
      };

      const res = await fetch(
        `${BASE}/api/users/${user?._id}/experiences`,
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const msg = (await res.json())?.message || 'Erreur serveur';
        throw new Error(msg);
      }
    },
    onSuccess: () => {
      /* rafraîchit la liste sur le dashboard */
      qc.invalidateQueries({ queryKey: ['experiences'] });
      navigate('/dashboard');
    },
  });

  /* ------ submit ------ */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    createMut.mutate();
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 pt-24 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Renseigner une <span className="text-highlight">expérience</span>
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white border border-gray-200 shadow-sm rounded-lg p-8"
        >
          {/* Titre */}
          <div>
            <Label htmlFor="title">Titre du poste</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Entreprise */}
          <div>
            <Label htmlFor="company">Entreprise</Label>
            <Input
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          {/* Localisation */}
          <div>
            <Label htmlFor="location">Localisation</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            {/* début */}
            <div>
              <Label>Date de début</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      'w-full flex justify-between items-center text-left',
                      !startDate && 'text-muted-foreground'
                    )}
                  >
                    <span>
                      {startDate
                        ? startDate.toLocaleDateString()
                        : 'Sélectionnez'}
                    </span>
                    <CalendarIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-auto">
                  <Calendar mode="single" selected={startDate} onSelect={setStartDate} />
                </PopoverContent>
              </Popover>
            </div>
            {/* fin */}
            <div>
              <Label>Date de fin</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      'w-full flex justify-between items-center text-left',
                      !endDate && 'text-muted-foreground'
                    )}
                  >
                    <span>
                      {endDate ? endDate.toLocaleDateString() : 'Sélectionnez'}
                    </span>
                    <CalendarIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-auto">
                  <Calendar mode="single" selected={endDate} onSelect={setEndDate} />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Description courte */}
          <div>
            <Label htmlFor="short">Description courte</Label>
            <Textarea
              id="short"
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={createMut.isLoading}
            className="w-full bg-highlight hover:bg-darkpurple"
          >
            Enregistrer l&apos;expérience
          </Button>
        </form>
      </div>
    </Layout>
  );
}
