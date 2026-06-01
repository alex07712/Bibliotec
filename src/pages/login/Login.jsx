import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import DatosBD from '../../services/ApiDatos';

export const Login = () => {
  const [nomuser, setNomuser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();          // Evita recargar la página
    setError('');               // Limpia errores anteriores
    setLoading(true);           // Activa el estado de carga

    try {
      const usuario = await DatosBD.login({ nomuser, password });
      login(usuario);
      navigate('/home');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md border border-gray-100">

        {/* Logo y título */}
        <div className="text-center mb-10">
          <img src="/log_bibliotec.png" alt="BIBLIOTEC Logo" className="mx-auto h-16 w-auto mb-2" />
          <h1 className="text-5xl font-extrabold tracking-tighter">
            <span className="text-blue-600">BIBLIO</span>
            <span className="text-gray-900">TEC</span>
          </h1>
          <p className="text-gray-500 mt-3 text-sm">Campus de Los Ríos</p>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Formulario de inicio de sesión */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="nomuser">
              Nombre de usuario
            </label>
            <input
              id="nomuser"
              type="text"
              required
              value={nomuser}
              onChange={(e) => setNomuser(e.target.value)}
              placeholder="correo / nombre de usuario"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition duration-150"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="contraseña aqui"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition duration-150"
            />
          </div>

          {/* Muestra error si existe */}
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
              {error}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Iniciando...' : 'Iniciar Sesión'}
            </button>
          </div>
        </form>

        {/* Pie de página */}
        <div className="mt-10 text-center text-xs text-gray-400">
          <p>Sistema de Gestión Bibliotecaria</p>
        </div>
      </div>
    </div>
  );
};