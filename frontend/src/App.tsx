import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

/* pages */
import Index from "@/pages/Index";
import Parrainage from "@/pages/Parrainage";
import QuiSommesNous from "@/pages/QuiSommesNous";
import CreerProfil from "@/pages/CreerProfil";
import Login from "@/pages/login";
import Onboarding from "@/pages/Onboarding";
import AddExperience from "@/pages/AddExperience";
import Profil from "@/pages/Profil";
import NotFound from "@/pages/NotFound";
import AdminUsers from "@/pages/AdminUsers";
import Dashboard from "@/pages/Dashboard"; // ← nouvel import

/* context & guards */
import { AuthProvider } from "@/contexts/AuthContext";
import PrivateRoute from "@/contexts/PrivateRoute";
import AdminRoute from "@/components/route/AdminRoute";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* ─── Publiques ─── */}
              <Route path="/"                element={<Index />} />
              <Route path="/parrainage"      element={<Parrainage />} />
              <Route path="/qui-sommes-nous" element={<QuiSommesNous />} />
              <Route path="/creer"           element={<CreerProfil />} />
              <Route path="/login"           element={<Login />} />

              {/* ─── Onboarding ─── */}
              <Route path="/welcome" element={<Onboarding />} />

              {/* ─── Utilisateurs protégés ─── */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/experiences/new"
                element={
                  <PrivateRoute>
                    <AddExperience />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profil"
                element={
                  <PrivateRoute>
                    <Profil />
                  </PrivateRoute>
                }
              />

              {/* ─── Admin ─── */}
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <AdminUsers />
                  </AdminRoute>
                }
              />

              {/* ─── 404 ─── */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
