
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Parrainage from "./pages/Parrainage";
import QuiSommesNous from "./pages/QuiSommesNous";
import CreerProfil from "./pages/CreerProfil";
import Profil from "./pages/Profil";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import Login from "./pages/login";

const queryClient = new QueryClient();

// Component to trigger initial animations
const ScrollRevealInitializer = () => {
  useEffect(() => {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      const firstSection = document.querySelector('.reveal-on-scroll');
      if (firstSection) {
        firstSection.classList.add('revealed');
        
        // Also reveal first set of feature cards if any
        const featureCards = firstSection.querySelectorAll('.feature-card');
        if (featureCards.length > 0) {
          featureCards.forEach((card, index) => {
            (card as HTMLElement).style.transitionDelay = `${index * 100}ms`;
            card.classList.add('revealed');
          });
        }
      }
    }, 100);
  }, []);
  
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollRevealInitializer />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/parrainage" element={<Parrainage />} />
          <Route path="/qui-sommes-nous" element={<QuiSommesNous />} />
          <Route path="/creer" element={<CreerProfil />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
