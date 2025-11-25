import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Loading } from "../components/Loading";

export const PrivateRoute = () => {
const [isAuthenticated, setIsAuthenticated] = useState(null); // null = cargando

  useEffect(() => {
    // Preguntamos al perfil si estamos logueados
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/profile", {
          method: "GET",
          credentials: "include", // La clave del éxito
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.log("Error verificando auth", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // Mientras verifica, mostramos cargando
  if (isAuthenticated === null) return <Loading />;

  // Si no está autenticado, chau, al login
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
