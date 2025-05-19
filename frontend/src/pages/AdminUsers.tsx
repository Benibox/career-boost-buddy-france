// frontend/src/pages/AdminUsers.tsx  (mise à jour sans axios, corrections clés)
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { User } from '../contexts/AuthContext'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Layout from '@/components/layout/Layout'

export default function AdminUsers() {
  const qc = useQueryClient()

  /* ---------- fetch ---------- */
  const { data: users = [], isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('/api/users', { credentials: 'include' })
      return res.ok ? res.json() : []
    },
  })

  /* ---------- création ---------- */
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<{
    firstName: string
    lastName: string
    email: string
    password: string
    role: 'candidate' | 'employer' | 'admin'
  }>()

  const createMut = useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch('/api/users', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Erreur création')
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] })
      reset()
    },
  })

  /* ---------- suppression ---------- */
  const deleteMut = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      if (!res.ok) throw new Error('Erreur suppression')
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  })

  if (isLoading) return <p>Chargement…</p>

  return (
    <Layout>
      <div className="p-6 space-y-8">
        <h1 className="text-2xl font-bold">Utilisateurs</h1>

        {/* ------- Formulaire création ------- */}
        <form
          onSubmit={handleSubmit((data) => createMut.mutate(data))}
          className="grid gap-4 md:grid-cols-6"
        >
          <Input placeholder="Prénom" {...register('firstName', { required: true })} />
          <Input placeholder="Nom" {...register('lastName', { required: true })} />
          <Input placeholder="Email" type="email" {...register('email', { required: true })} />
          <Input placeholder="Mot de passe" type="password" {...register('password', { required: true })} />
          <select {...register('role')} className="border rounded px-2 py-1">
            <option value="candidate">candidate</option>
            <option value="employer">employer</option>
            <option value="admin">admin</option>
          </select>
          <Button disabled={isSubmitting} className="md:col-span-6 w-fit">
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
            {users.map((u) => (
              <TableRow key={u._id}>
                <TableCell>
                  {u.firstName} {u.lastName}
                </TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteMut.mutate(u._id)}
                    disabled={deleteMut.isLoading}
                  >
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  )
}
