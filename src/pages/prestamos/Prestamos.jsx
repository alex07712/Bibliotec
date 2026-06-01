import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ApiDatos from '../../services/ApiDatos';
import Swal from 'sweetalert2';
import { Clock, CheckCircle, AlertTriangle, Search } from 'lucide-react';

export function Prestamos() {
  const { user } = useContext(AuthContext);
  const [prestamos, setPrestamos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    if (user?.id) {
      cargarPrestamos();
    } else {
      setLoading(false);
    }
  }, [user]);

  const cargarPrestamos = async () => {
    try {
      const data = user?.rol === 'admin'
        ? await ApiDatos.getAllPrestamos()
        : await ApiDatos.misPrestamos(user.id);
      setPrestamos(data);
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudieron cargar los préstamos', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDevolver = async (prestamoId) => {
    Swal.fire({
      title: '¿Devolver libro?',
      text: 'Confirma la devolución',
      icon: 'question',
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await ApiDatos.devolverLibro(prestamoId);
          Swal.fire('Devuelto', 'El libro ha sido devuelto', 'success');
          cargarPrestamos();
        } catch (error) {
          Swal.fire('Error', 'No se pudo registrar la devolución', 'error');
        }
      }
    });
  };

  const calcularTiempoRestante = (fechaEstimada) => {
    const ahora = new Date();
    const devolucion = new Date(fechaEstimada);
    const diff = devolucion - ahora;
    if (diff <= 0) return 'Vencido';
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff % (86400000)) / 3600000);
    return `${dias} días y ${horas} horas`;
  };

  const prestamosFiltrados = prestamos.filter((prestamo) => {
    const texto = busqueda.toLowerCase();
    const libro = prestamo.libro || {};
    const usuario = prestamo.usuario || {};
    return (
      libro.titulo?.toLowerCase().includes(texto) ||
      libro.autor?.toLowerCase().includes(texto) ||
      libro.categoria?.toLowerCase().includes(texto) ||
      usuario.nombre?.toLowerCase().includes(texto) ||
      usuario.nomuser?.toLowerCase().includes(texto) ||
      usuario.correo?.toLowerCase().includes(texto)
    );
  });

  if (loading) return <div className="p-8 text-center">Cargando tus préstamos...</div>;

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-bold">{user?.rol === 'admin' ? 'Préstamos de Usuarios' : 'Mis Préstamos'}</h2>
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar libro prestado..."
            className="w-full md:w-80 rounded-xl border border-slate-200 py-2 pl-10 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>
      {prestamosFiltrados.length === 0 ? (
        <p className="text-gray-500">
          {busqueda
            ? 'No hay préstamos que coincidan con la búsqueda'
            : user?.rol === 'admin'
              ? 'No hay préstamos registrados'
              : 'No tienes préstamos activos'}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prestamosFiltrados.map((prestamo) => (
            <div key={prestamo._id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4">
                <h3 className="font-bold text-lg">{prestamo.libro?.titulo || 'Libro no encontrado'}</h3>
                <p className="text-gray-600 text-sm">{prestamo.libro?.autor || ''}</p>
                <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  {prestamo.libro?.categoria || ''}
                </span>
                {user?.rol === 'admin' && (
                  <div className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
                    <p><strong>Usuario:</strong> {prestamo.usuario?.nombre || prestamo.usuario?.nomuser || 'Usuario no encontrado'}</p>
                    {prestamo.usuario?.correo && <p><strong>Correo:</strong> {prestamo.usuario.correo}</p>}
                  </div>
                )}
                <div className="mt-4 space-y-1 text-sm">
                  <p><strong>Fecha préstamo:</strong> {new Date(prestamo.fechaPrestamo).toLocaleDateString()}</p>
                  <p><strong>Devolver antes de:</strong> {new Date(prestamo.fechaDevolucionEstimada).toLocaleDateString()}</p>
                  <p className={`font-semibold ${prestamo.estado === 'vencido' ? 'text-red-600' : 'text-amber-600'}`}>
                    <Clock size={16} className="inline mr-1" />
                    Tiempo restante: {calcularTiempoRestante(prestamo.fechaDevolucionEstimada)}
                  </p>
                </div>
                {prestamo.estado === 'activo' && user?.rol === 'admin' && (
                  <button
                    onClick={() => handleDevolver(prestamo._id)}
                    className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-700"
                  >
                    Devolver libro
                  </button>
                )}
                {prestamo.estado === 'devuelto' && (
                  <p className="mt-4 text-green-600 text-sm text-center">
                    <CheckCircle size={16} className="inline mr-1" />
                    Devuelto el {new Date(prestamo.fechaDevolucionReal).toLocaleDateString()}
                  </p>
                )}
                {prestamo.estado === 'vencido' && (
                  <p className="mt-4 text-red-600 text-sm text-center">
                    <AlertTriangle size={16} className="inline mr-1" />
                    Préstamo vencido
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
