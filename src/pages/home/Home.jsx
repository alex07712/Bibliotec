import React, { useState, useEffect } from "react";
import ApiDatos from "../../services/ApiDatos";
import { Carrusel } from "../../components/ui/Carrusel";

export function Home() {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarLibros = async () => {
      try {
        const data = await ApiDatos.getLibros();
        setLibros(data);
      } catch (error) {
        console.error("Error al cargar libros:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarLibros();
  }, []);

  if (loading) return <div className="p-8 text-center">Cargando...</div>;
  if (!libros.length) return <div className="p-8 text-center">No hay libros disponibles.</div>;

  const destacados = libros.slice(0, 9);
  const novedades = libros.slice(9, 18);
  const populares = libros.slice(18, 27);

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Libros Destacados</h2>
        <Carrusel libros={destacados} />
      </div>

      {novedades.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Novedades</h2>
          <Carrusel libros={novedades} />
        </div>
      )}

      {populares.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Más Populares</h2>
          <Carrusel libros={populares} />
        </div>
      )}
    </div>
  );
}
