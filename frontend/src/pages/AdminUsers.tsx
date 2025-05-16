import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { UserInfo } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
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

export default function AdminUsers() {
  const qc = useQueryClient();

  /* ---------- fetch ---------- */
  const { data: users, isLoading } = useQuery<UserInfo[]>({
    queryKey: ['users'],
    queryFn: () =>
      axios.get('/api/users', { withCredentials: true }).then((r) => r.data),
  });

  /* ---------- création ---------- */
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
  }>();

  const createMut = useMutation({
    mutationFn: (payload: any) =>
      axios.post('/api/users', payload, { withCredentials: true }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] });
      reset();
    },
  });

  /* ---------- suppression ---------- */
  const deleteMut = useMutation({
    mutationFn: (id: string) =>
      axios.delete(`/api/users/${id}`, { withCredentials: true }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });

  if (isLoading) return <p>Chargement…</p>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Utilisateurs</h1>

      {/* ------- Formulaire création ------- */}
      <form
        onSubmit={handleSubmit((d) => createMut.mutate(d))}
        className="grid gap-4 md:grid-cols-5"
      >
        <Input placeholder="Prénom" {...register('firstName', { required: true })} />
        <Input placeholder="Nom" {...register('lastName', { required: true })} />
        <Input placeholder="Email" type="email" {...register('email', { required: true })} />
        <Input placeholder="Mot de passe" type="password" {...register('password', { required: true })} />
        <select {...register('role')} className="border rounded px-2 py-1">
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
        <Button disabled={isSubmitting} className="md:col-span-5 w-fit">
          Créer
        </Button>
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
          {users?.map((u) => (
            <TableRow key={u.id}>
              <TableCell>
                {u.firstName} {u.lastName}
              </TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.role}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteMut.mutate(u.id)}
                  disabled={deleteMut.isPending}
                >
                  Supprimer
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
