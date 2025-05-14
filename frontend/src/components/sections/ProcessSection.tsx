
import { User, Users, ShieldCheck, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Track scroll progress for the progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("process-section");
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Calculate progress through section
        const scrollPosition = scrollY + windowHeight - sectionTop;
        const progress = Math.min(100, Math.max(0, (scrollPosition / sectionHeight) * 100));
        setScrollProgress(progress);
        
        // Update active step based on scroll position
        const stepProgress = Math.min(3, Math.floor((progress / 100) * 4));
        setActiveStep(stepProgress);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const steps = [
    {
      icon: <User className="h-8 w-8 text-highlight" />,
      title: "Créez votre profil",
      description: "Créez votre profil en 60 s et valorisez vos expériences.",
      step: "01",
      badgeRight: true
    },
    {
      icon: <Users className="h-8 w-8 text-highlight" />,
      title: "Invitez un parrain",
      description: "Invitez un parrain via un lien unique.",
      step: "02",
      badgeRight: false
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-highlight" />,
      title: "Vérification d'identité",
      description: "Nous vérifions rigoureusement l'identité de chaque parrain.",
      step: "03",
      badgeRight: true
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-highlight" />,
      title: "Validation sécurisée",
      description: "Seules les personnes autorisées peuvent valider votre profil.",
      step: "04",
      badgeRight: false
    },
  ];

  return (
    <section id="process-section" className="py-16 bg-gray-50 reveal-on-scroll relative">
      {/* Sticky progress bar */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 h-48 w-2 bg-gray-200 rounded-full z-10 hidden lg:block">
        <div className="h-full w-full flex flex-col justify-between items-center">
          {[0, 1, 2, 3].map((step) => (
            <div 
              key={step} 
              className={`h-5 w-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                step <= activeStep ? "bg-highlight" : "bg-gray-300"
              }`}
            >
              <span className={`text-xs font-bold ${
                step <= activeStep ? "text-white" : "text-gray-500"
              }`}>
                {step + 1}
              </span>
            </div>
          ))}
          
          <div 
            className="absolute top-0 bottom-0 w-1 bg-highlight rounded-full origin-top" 
            style={{ height: `${scrollProgress}%` }}
          />
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <h2 className="section-title">
          Comment <span className="highlight-text">ça marche</span>
        </h2>
        <p className="section-subtitle">
          Un processus simple et sécurisé pour valoriser vos expériences
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all feature-card hover:-translate-y-1 hover:border-highlight group"
            >
              <div 
                className={`absolute -top-3 ${step.badgeRight ? '-right-3' : '-left-3'} bg-highlight text-white text-lg font-bold h-10 w-10 rounded-full flex items-center justify-center`}
              >
                {step.step}
              </div>
              <div className="bg-lightpurple p-4 rounded-full flex items-center justify-center w-16 h-16 mb-4 group-hover:bg-highlight/20 transition-colors">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 relative group-hover:text-highlight transition-colors">
                {step.title}
                <span className="block h-0.5 w-0 group-hover:w-1/2 bg-highlight transition-all duration-300"></span>
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
