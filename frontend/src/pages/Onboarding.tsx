// frontend/src/pages/Onboarding.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const Onboarding = () => {
  const [firstName, setFirstName] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("userFirstName");
    if (storedName) {
      setFirstName(storedName);
    }
  }, []);

  const handleStart = () => {
    navigate("/experiences/new");
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 pt-24 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Bienvenue{firstName ? `, ${firstName}` : ""} 🎉
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Prêt·e à ajouter votre première expérience ?
        </p>
        <Button onClick={handleStart}>
          Ajouter une expérience
        </Button>
      </div>
    </Layout>
  );
};

export default Onboarding;
