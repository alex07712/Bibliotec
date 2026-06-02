// src/components/menu/Header.jsx
import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User, Menu, Camera } from "lucide-react";
import Swal from "sweetalert2";
import ApiDatos from "../../services/ApiDatos";
import { AuthContext } from "../../context/AuthContext";

export function Header({ userName, toggleSidebar }) {
  const navigate = useNavigate();
  const { user, logout, updateAvatar } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const userImg = user?.imagen || "";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleChangeAvatar = () => {
    setShowDropdown(false);
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const userId = user?.id;
      if (!userId) {
        Swal.fire("Error", "No se pudo identificar al usuario", "error");
        return;
      }

      try {
        const response = await ApiDatos.subirAvatar(userId, file);
        updateAvatar(response.url);
        Swal.fire("Éxito", "Foto de perfil actualizada", "success");
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "No se pudo subir la imagen", "error");
      }
    };
    input.click();
  };

  return (
    <header className="h-18 bg-slate-800 border-b border-slate-700 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-30 shadow-lg">
      {/* Botón de menú (solo visible en móvil) */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 text-slate-300 lg:hidden hover:bg-slate-700 rounded-lg transition-colors"
        >
          <Menu size={35} />
        </button>
      </div>

      {/* Área derecha: bienvenida + avatar */}
      <div className="flex items-center gap-3 lg:gap-6">
        <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
          <div className="text-right xs:block">
            <p className="text-sm font-semibold text-slate-100">
              Bienvenido: <span className="text-amber-400">{userName}</span>
            </p>
          </div>

          <div className="relative">
            {userImg ? (
              <img
                src={userImg}
                alt="Perfil"
                className="w-10 h-10 rounded-full object-cover border-2 border-amber-500 cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              />
            ) : (
              <div
                className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600 cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <User size={26} className="text-slate-300" />
              </div>
            )}

            {showDropdown && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50"
                onClick={() => setShowDropdown(false)}
              >
                <button
                  onClick={handleChangeAvatar}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <Camera size={30} className="text-amber-600" />
                  Cambiar foto de perfil
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={30} className="text-red-500" />
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
