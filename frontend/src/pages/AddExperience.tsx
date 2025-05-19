import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon, FileText } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
// import api from '@/lib/api' // à créer

export default function AddExperience() {
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [description, setDescription] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", jobTitle);
    formData.append("company", company);
    formData.append("startDate", startDate?.toISOString() || "");
    formData.append("endDate", endDate?.toISOString() || "");
    formData.append("description", description);
    if (cvFile) formData.append("cv", cvFile);

    try {
      // await api.post("/api/experiences", formData, { headers: { "Content-Type": "multipart/form-data" } });
      console.log("payload", Object.fromEntries(formData));
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
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
          {/* Nom du poste */}
          <div>
            <Label htmlFor="jobTitle">Nom de poste</Label>
            <Input
              id="jobTitle"
              placeholder="Ex. Développeur Front‑end"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
          </div>

          {/* Nom de la boîte */}
          <div>
            <Label htmlFor="company">Nom de la boîte</Label>
            <Input
              id="company"
              placeholder="Ex. Acme Corp"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>

          {/* Période */}
          <div className="grid grid-cols-2 gap-4">
            {/* Début */}
            <div>
              <Label>Date de début</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "w-full flex justify-between items-center text-left",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <span>{startDate ? startDate.toLocaleDateString() : "Sélectionnez"}</span>
                    <CalendarIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-auto">
                  <Calendar mode="single" selected={startDate} onSelect={setStartDate} />
                </PopoverContent>
              </Popover>
            </div>

            {/* Fin */}
            <div>
              <Label>Date de fin (ou actuelle)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "w-full flex justify-between items-center text-left",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <span>{endDate ? endDate.toLocaleDateString() : "Sélectionnez"}</span>
                    <CalendarIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-auto">
                  <Calendar mode="single" selected={endDate} onSelect={setEndDate} />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Description (optionnelle) */}
          <div>
            <Label htmlFor="description">Description (facultatif)</Label>
            <Textarea
              id="description"
              placeholder="Qu'avez‑vous réalisé ?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* CV (fichier) */}
          <div>
            <Label htmlFor="cv" className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> CV (facultatif)
            </Label>
            <Input
              id="cv"
              type="file"
              accept="application/pdf,image/*"
              onChange={(e) => setCvFile(e.target.files?.[0] || null)}
            />
            {cvFile && <p className="mt-1 text-sm text-gray-500">{cvFile.name}</p>}
          </div>

          <Button type="submit" className="w-full bg-highlight hover:bg-darkpurple">
            Enregistrer l'expérience
          </Button>
        </form>
      </div>
    </Layout>
  );
}