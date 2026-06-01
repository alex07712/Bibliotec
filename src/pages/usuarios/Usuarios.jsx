import { Trash, Edit, X, Users, Activity, Clock, Search } from "lucide-react";
import { useState, useEffect } from "react";
import ApiDatos from "../../services/ApiDatos";
import Swal from "sweetalert2";
import { FormPersona } from "../../components/persona/FormPersona";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

export function Usuarios() {
  const [datos, setDatos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  // Estado para saber qué persona estamos editando
  const [personaEdit, setPersonaEdit] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const handleOpen = () => setIsOpen(!isOpen);

  const handleNuevo = () => {
    setPersonaEdit(null);
    setIsOpen(true);
  };

  const handleEdit = (persona) => {
    setPersonaEdit(persona);
    setIsOpen(true);
  };

  const datosBd = async () => {
    try {
      const res = await ApiDatos.getDatos();
      setDatos(res.data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  const eliminarDatos = async (id) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar este dato?",
      text: "Se borrará permanentemente de la base de datos",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await ApiDatos.deletePersona(id);
          datosBd(); // Refrescar tabla
          Swal.fire("¡Eliminado!", "El registro ha sido borrado.", "success");
        } catch (error) {
          Swal.fire("Error", "No se pudo eliminar el registro.", "error");
        }
      }
    });
  };

  useEffect(() => {
    datosBd();
  }, []);

  const datosFiltrados = datos.filter((item) => {
    const texto = busqueda.toLowerCase();
    return (
      item.nombre?.toLowerCase().includes(texto) ||
      item.correo?.toLowerCase().includes(texto) ||
      item.telefono?.toLowerCase().includes(texto)
    );
  });

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Resumen de Actividad</h1>
        <p className="text-slate-500 text-sm">Monitorea los estudiantes visitados semanalmente.</p>
      </div>

      {/* Tabla de Personas */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50">
          <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
            <h2 className="font-bold text-slate-800">Listado de Personal</h2>
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscar personal..."
                  className="w-full md:w-72 rounded-xl border border-slate-200 py-2 pl-10 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <button
                type="button"
                onClick={handleNuevo} // Cambiado para asegurar que el form sea nuevo
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-2xl font-bold text-xs transition-colors"
              >
                Registrar Nuevo
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto overflow-y-auto max-h-96">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-400 text-[11px] uppercase tracking-widest font-bold">
              <tr>
                <th className="px-6 py-4">Nombres</th>
                <th className="px-6 py-4">Correo</th>
                <th className="px-6 py-4">Teléfono</th>
                <th className="px-6 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {datosFiltrados.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-700">{item.nombre}</td>
                  <td className="px-6 py-4 text-slate-500 text-sm">{item.correo}</td>
                  <td className="px-6 py-4">
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold">
                      {item.telefono}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      {/* BOTÓN EDITAR */}
                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                        className="bg-blue-100 text-blue-600 hover:bg-blue-200 p-2 rounded-xl transition-colors"
                        title="Editar"
                      >
                        <Edit size={18} />
                      </button>
                      
                      {/* BOTÓN ELIMINAR */}
                      <button
                        type="button"
                        onClick={() => eliminarDatos(item._id)}
                        className="bg-slate-700 text-white hover:bg-red-600 p-2 rounded-xl transition-colors"
                        title="Eliminar"
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

      {/* MODAL (DIALOG) */}
      <Dialog open={isOpen} onClose={handleOpen} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30 transition-opacity" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg w-full bg-white p-10 rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">
                {personaEdit ? "Editar Registro" : "Registrar Nuevo"}
              </h2>
              <button onClick={handleOpen} className="text-gray-400 hover:text-gray-600 p-1">
                <X size={24} />
              </button>
            </div>
            
            {/* Formulario con props de control y datos */}
            <FormPersona 
              closeModal={handleOpen} 
              refreshTable={datosBd} 
              datos={personaEdit} 
            />
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}