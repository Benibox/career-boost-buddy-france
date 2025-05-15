import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

export default function AddExperience() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO : appeler votre API POST /api/experiences
    // p.ex. api.post('/api/experiences', { title, company, startDate, endDate, description })
    // puis navigate('/experiences')
    console.log({ title, company, startDate, endDate, description });
    navigate("/experiences"); 
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 pt-24 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Ajouter une <span className="text-highlight">expérience</span>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-gray-200 shadow-sm rounded-lg p-8">
          {/* Intitulé */}
          <div>
            <Label htmlFor="title">Intitulé du poste</Label>
            <Input
              id="title"
              placeholder="Ex. Développeur Front-end"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Entreprise */}
          <div>
            <Label htmlFor="company">Entreprise</Label>
            <Input
              id="company"
              placeholder="Ex. Acme Corp"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          {/* Période */}
          <div className="grid grid-cols-2 gap-4">
            {/* Date de début */}
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
                    <span>
                      {startDate
                        ? startDate.toLocaleDateString()
                        : "Sélectionnez une date"}
                    </span>
                    <CalendarIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-auto">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
            {/* Date de fin */}
            <div>
              <Label>Date de fin</Label>
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
                    <span>
                      {endDate
                        ? endDate.toLocaleDateString()
                        : "Sélectionnez une date"}
                    </span>
                    <CalendarIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-auto">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Description */}
          <div>
            <Label>Descriptif des missions</Label>
            <Textarea
              placeholder="Décrivez vos responsabilités et réalisations"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full bg-highlight hover:bg-darkpurple">
            Enregistrer et inviter mon ancien employeur
          </Button>
        </form>
      </div>
    </Layout>
  );
}
