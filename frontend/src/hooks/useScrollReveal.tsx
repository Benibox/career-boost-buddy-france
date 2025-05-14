
import { useEffect, useRef } from "react";

export function useScrollReveal() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Add reveal class when element is 20% in view
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            
            // If there are feature cards inside, add staggered reveal
            const featureCards = entry.target.querySelectorAll(".feature-card");
            if (featureCards.length > 0) {
              featureCards.forEach((card, index) => {
                (card as HTMLElement).style.transitionDelay = `${index * 100}ms`;
              });
            }
            
            // Unobserve after revealing to prevent re-animation
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of element is visible
      }
    );

    // Find and observe all sections with reveal-on-scroll class
    const sections = document.querySelectorAll(".reveal-on-scroll");
    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });

    // Cleanup
    return () => {
      if (observerRef.current) {
        sections.forEach((section) => {
          observerRef.current?.unobserve(section);
        });
        observerRef.current = null;
      }
    };
  }, []);

  return null;
}
