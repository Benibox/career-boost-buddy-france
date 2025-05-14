
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  useScrollReveal(); // Use the scroll reveal hook
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
