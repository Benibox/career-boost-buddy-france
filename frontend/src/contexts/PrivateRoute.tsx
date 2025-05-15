import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";

export default function PrivateRoute({ children }: { children: React.ReactElement }) {
  const { isAuthenticated, loading } = useContext(AuthContext);
  if (loading) {
    // Affiche un loader sinon ça bloque tout
    return <div className="p-8 text-center text-lg">Chargement…</div>;
  }
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
