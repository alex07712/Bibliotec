import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Inicializar estado desde localStorage
  const [user, setUser] = useState(() => {
    const storedRol = localStorage.getItem('userRol');
    const storedName = localStorage.getItem('userName');
    const storedImg = localStorage.getItem('userImg');
    const storedId = localStorage.getItem('userId');
    if (storedRol) {
      return {
        id: storedId,
        nombre: storedName,
        rol: storedRol,
        imagen: storedImg || '',
      };
    }
    return null;
  });

  //funcion login
  const login = (userData) => {
    const newUser = {
      id: userData.id,
      nombre: userData.nombre,
      rol: userData.rol,
      imagen: userData.imagen || '',
    };
    setUser(newUser);
    localStorage.setItem('userRol', newUser.rol);
    localStorage.setItem('userName', newUser.nombre);
    localStorage.setItem('userImg', newUser.imagen);
    localStorage.setItem('userId', newUser.id);
    localStorage.setItem('isLogged', 'true');
  };

  // Cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem('userRol');
    localStorage.removeItem('userName');
    localStorage.removeItem('userImg');
    localStorage.removeItem('userId');
    localStorage.removeItem('isLogged');
  };

  // Actualizar solo el avatar
  const updateAvatar = (url) => {
    if (user) {
      const updatedUser = { ...user, imagen: url };
      setUser(updatedUser);
      localStorage.setItem('userImg', url);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateAvatar }}>
      {children}
    </AuthContext.Provider>
  );
}