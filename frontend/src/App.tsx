// frontend/src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Parrainage from "./pages/Parrainage";
import QuiSommesNous from "./pages/QuiSommesNous";
import CreerProfil from "./pages/CreerProfil";
import Login from "./pages/login";
import Onboarding from "./pages/Onboarding";
import AddExperience from "./pages/AddExperience";
import Profil from "./pages/Profil";
import NotFound from "./pages/NotFound";

// Nouveaux imports
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./contexts/PrivateRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* AuthProvider entoure tout pour que le contexte soit disponible */}
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* pages publiques */}
            <Route path="/" element={<Index />} />
            <Route path="/parrainage" element={<Parrainage />} />
            <Route path="/qui-sommes-nous" element={<QuiSommesNous />} />
            <Route path="/creer" element={<CreerProfil />} />
            <Route path="/login" element={<Login />} />

            {/* onboarding (accessible après inscription) */}
            <Route path="/welcome" element={<Onboarding />} />

            {/* ajout d'une expérience (protégé) */}
            <Route
              path="/experiences/new"
              element={
                <PrivateRoute>
                  <AddExperience />
                </PrivateRoute>
              }
            />

            {/* profil utilisateur (protégé) */}
            <Route
              path="/profil"
              element={
                <PrivateRoute>
                  <Profil />
                </PrivateRoute>
              }
            />

            {/* fallback 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
