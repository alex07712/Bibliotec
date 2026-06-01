// src/pages/catalogo/Catalogo.jsx
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import DatosBD from '../../services/ApiDatos';
import Swal from 'sweetalert2';
import { BookAlert, Search } from 'lucide-react';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

export function Catalogo() {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const { user } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState('');

  const cargarLibros = async () => {
    try {
      const data = await DatosBD.getLibros();
      setLibros(data);
    } catch (err) {
      console.error(err);
      setError('No se pudieron cargar los libros');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarLibros();
  }, []);

  const librosFiltrados = libros.filter((libro) => {
    const texto = busqueda.toLowerCase();
    return (
      libro.titulo?.toLowerCase().includes(texto) ||
      libro.autor?.toLowerCase().includes(texto) ||
      libro.categoria?.toLowerCase().includes(texto)
    );
  });

  const openDescriptionModal = (descripcion) => {
    setSelectedDescription(descripcion || 'Sin descripción disponible');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDescription('');
  };

  const handlePrestar = async (libroId) => {
    if (!user) {
      Swal.fire('Error', 'Debes iniciar sesión', 'error');
      return;
    }
    const fechaDevolucion = new Date();
    fechaDevolucion.setDate(fechaDevolucion.getDate() + 7);
    try {
      await DatosBD.crearPrestamo({
        libroId,
        fechaDevolucionEstimada: fechaDevolucion.toISOString(),
      });
      cargarLibros();
      Swal.fire('¡Préstamo exitoso!', 'Tienes 7 días para devolver el libro', 'success');
    } catch (error) {
      console.error(error);
      Swal.fire('Error', error.response?.data?.message || 'No se pudo realizar el préstamo', 'error');
    }
  };

  if (loading) return <div className="p-8 text-center">Cargando catálogo...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-bold">Catálogo de Libros</h2>
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar libro..."
            className="w-full md:w-80 rounded-xl border border-slate-200 py-2 pl-10 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {librosFiltrados.map((libro) => (
          <div
            key={libro._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col"
          >
            {/* Contenedor de la imagen con posición relativa */}
            <div className="relative aspect-[2/3] bg-gray-200 flex items-center justify-center overflow-hidden rounded-t-xl">
              {libro.imagen ? (
                <img src={libro.imagen} alt={libro.titulo} className="h-full w-full object-cover" />
              ) : (
                <span className="text-gray-400">Sin portada</span>
              )}
              {/* Ícono BookAlert en esquina superior derecha */}
              <button
                onClick={() => openDescriptionModal(libro.descripcion)}
                className="absolute top-2 right-2 z-10 bg-black/50 backdrop-blur-sm rounded-full p-1.5 transition hover:bg-black/70 focus:outline-none"
                aria-label="Ver descripción"
              >
                <BookAlert size={30} className="text-white" />
              </button>
            </div>

            {/* Información del libro */}
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-bold text-lg truncate">{libro.titulo}</h3>
              <p className="text-gray-600 text-sm">{libro.autor}</p>
              <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full self-start">
                {libro.categoria}
              </span>
              <p className={`mt-3 text-sm font-semibold ${(libro.stock ?? 0) > 0 ? 'text-green-700' : 'text-red-600'}`}>
                Stock: {libro.stock ?? 0}
              </p>
              <button
                onClick={() => handlePrestar(libro._id)}
                disabled={(libro.stock ?? 0) <= 0}
                className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
              >
                {(libro.stock ?? 0) > 0 ? 'Solicitar préstamo' : 'Sin stock'}
              </button>
            </div>
          </div>
        ))}
      </div>
      {librosFiltrados.length === 0 && (
        <p className="text-gray-500 text-center mt-10">No hay libros registrados aún.</p>
      )}

      {/* Modal de Headless UI para la descripción */}
      <Dialog open={isModalOpen} as="div" className="relative z-50 focus:outline-none" onClose={closeModal}>
        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="text-lg font-semibold text-gray-900">
                Descripción del libro
              </DialogTitle>
              <p className="mt-2 text-sm text-gray-600 text-justify">{selectedDescription}</p>
              <div className="mt-6">
                <Button
                  onClick={closeModal}
                  className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Cerrar
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
