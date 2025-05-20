import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { User } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type NewUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'candidate' | 'employer' | 'admin';
};

export default function AdminUsers() {
  const qc = useQueryClient();
  const BASE = import.meta.env.VITE_BACKEND_URL || '';

  /* ---------- fetch ---------- */
  const { data: users = [], isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch(`${BASE}/api/users`, { credentials: 'include' });
      return res.ok ? res.json() : [];
    },
  });

  /* ---------- création ---------- */
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<NewUser>();

  const createMut = useMutation({
    mutationFn: async (payload: NewUser) => {
      const res = await fetch(`${BASE}/api/users`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
    },
    onSuccess: () => {
      reset();
      qc.invalidateQueries({ queryKey: ['users'] });
    },
  });

  /* ---------- update ---------- */
  const [editId, setEditId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<Partial<User>>({});

  const updateMut = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<User> }) => {
      const res = await fetch(`${BASE}/api/users/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
    },
    onSuccess: () => {
      setEditId(null);
      qc.invalidateQueries({ queryKey: ['users'] });
    },
  });

  /* ---------- suppression ---------- */
  const deleteMut = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${BASE}/api/users/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });

  if (isLoading) return <Layout>Chargement…</Layout>;

  return (
    <Layout>
      <div className="p-8 space-y-10">
        <h1 className="text-3xl font-bold">Administration : utilisateurs</h1>

        {/* ------- Formulaire création ------- */}
        <form
          onSubmit={handleSubmit((d) => createMut.mutate(d))}
          className="grid gap-4 md:grid-cols-6 items-end"
        >
          <Input {...register('firstName', { required: true })} placeholder="Prénom" />
          <Input {...register('lastName', { required: true })} placeholder="Nom" />
          <Input {...register('email', { required: true })} placeholder="Email" type="email" />
          <Input {...register('password', { required: true })} placeholder="Mot de passe" type="password" />
          <select {...register('role')} className="border rounded px-2 py-1">
            <option value="candidate">candidate</option>
            <option value="employer">employer</option>
            <option value="admin">admin</option>
          </select>
          <Button disabled={isSubmitting}>Créer</Button>
        </form>

        {/* ------- Tableau users ------- */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u._id}>
                <TableCell>
                  {editId === u._id ? (
                    <Input
                      defaultValue={`${u.firstName} ${u.lastName}`}
                      onChange={(e) =>
                        setEditValue((v) => ({ ...v, fullName: e.target.value }))
                      }
                    />
                  ) : (
                    `${u.firstName} ${u.lastName}`
                  )}
                </TableCell>
                <TableCell>
                  {editId === u._id ? (
                    <Input
                      defaultValue={u.email}
                      onChange={(e) =>
                        setEditValue((v) => ({ ...v, email: e.target.value }))
                      }
                    />
                  ) : (
                    u.email
                  )}
                </TableCell>
                <TableCell>
                  {editId === u._id ? (
                    <select
                      defaultValue={u.role}
                      onChange={(e) =>
                        setEditValue((v) => ({ ...v, role: e.target.value }))
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="candidate">candidate</option>
                      <option value="employer">employer</option>
                      <option value="admin">admin</option>
                    </select>
                  ) : (
                    u.role
                  )}
                </TableCell>
                <TableCell className="space-x-2">
                  {editId === u._id ? (
                    <>
                      <Button
                        size="sm"
                        onClick={() =>
                          updateMut.mutate({ id: u._id, data: editValue })
                        }
                        disabled={updateMut.isLoading}
                      >
                        Sauver
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditId(null)}
                      >
                        Annuler
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setEditId(u._id);
                          setEditValue({});
                        }}
                      >
                        Éditer
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteMut.mutate(u._id)}
                        disabled={deleteMut.isLoading}
                      >
                        Supprimer
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
}
