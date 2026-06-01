import { useEffect, useState } from "react";
import ApiDatos from "../../services/ApiDatos";
import Swal from "sweetalert2";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { FormLibro } from "../../components/libros/FormLibro";
import { Edit, Search, Trash, X } from "lucide-react";

export function Gestion() {
  const [libros, setLibros] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [libroEdit, setLibroEdit] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const cargarLibros = async () => {
    try {
      const data = await ApiDatos.getLibros();
      setLibros(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al cargar libros", error);
    }
  };

  const eliminarLibro = async (id) => {
    Swal.fire({
      title: "¿Eliminar libro?",
      text: "No se podrá recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await ApiDatos.eliminarLibro(id);
          cargarLibros();
          Swal.fire("Eliminado", "El libro ha sido eliminado.", "success");
        } catch (error) {
          Swal.fire("Error", "No se pudo eliminar", "error");
        }
      }
    });
  };

  const handleEdit = (libro) => {
    setLibroEdit(libro);
    setIsOpen(true);
  };

  const handleNuevo = () => {
    setLibroEdit(null);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setLibroEdit(null);
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

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Gestión de Libros</h1>
        <p className="text-slate-500">Administra el catálogo de libros.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-6">
          <h2 className="font-bold text-slate-800">Listado de Libros</h2>
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar libro..."
                className="w-full md:w-72 rounded-xl border border-slate-200 py-2 pl-10 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <button
              onClick={handleNuevo}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700"
            >
              + Nuevo Libro
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3">Imagen</th>
                <th className="px-6 py-3">Título</th>
                <th className="px-6 py-3">Autor</th>
                <th className="px-6 py-3">Categoría</th>
                <th className="px-6 py-3">Stock</th>
                <th className="px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {librosFiltrados.map((libro) => (
                <tr key={libro._id} className="hover:bg-slate-50">
                  <td className="px-6 py-3">
                    {libro.imagen ? (
                      <img
                        src={libro.imagen}
                        alt={libro.titulo}
                        className="h-12 w-12 object-cover rounded-md"
                      />
                    ) : (
                      <span className="text-gray-400 text-xs">Sin portada</span>
                    )}
                  </td>
                  <td className="px-6 py-3 font-medium">{libro.titulo}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{libro.autor}</td>
                  <td className="px-6 py-3">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                      {libro.categoria}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm font-semibold text-slate-700">{libro.stock ?? 0}</td>
                  <td className="px-6 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(libro)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => eliminarLibro(libro._id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="max-w-lg w-full bg-white p-6 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {libroEdit ? "Editar Libro" : "Nuevo Libro"}
              </h2>
              <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <FormLibro
              datos={libroEdit}
              closeModal={handleClose}
              refreshTable={cargarLibros}
            />
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
