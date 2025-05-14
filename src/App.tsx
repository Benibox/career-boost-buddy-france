
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Parrainage from "./pages/Parrainage";
import QuiSommesNous from "./pages/QuiSommesNous";
import CreerProfil from "./pages/CreerProfil";
import ValiderProfil from "./pages/ValiderProfil";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/parrainage" element={<Parrainage />} />
          <Route path="/qui-sommes-nous" element={<QuiSommesNous />} />
          <Route path="/creer" element={<CreerProfil />} />
          <Route path="/valider" element={<ValiderProfil />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
