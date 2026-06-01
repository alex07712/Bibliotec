import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { Home, Gestion, Prestamos, NotFound, Login, Catalogo, Usuarios } from "../pages";
import { AppLayout } from "../layouts";
import { AuthContext } from "../context/AuthContext";

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
}

export function Rutas() {
  const { user } = useContext(AuthContext);
  const userRole = user?.rol || "usuario";

  const loadLayout = (Page) => (
    <PrivateRoute>
      <AppLayout>
        <Page />
      </AppLayout>
    </PrivateRoute>
  );


  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={user ? <Navigate to="/catalogo" replace /> : <Navigate to="/login" replace />} />

      {/* Rutas compartidas */}
      <Route path="/home" element={loadLayout(Home)} />
      <Route path="/catalogo" element={loadLayout(Catalogo)} />
      <Route path="/prestamos" element={loadLayout(Prestamos)} />

      {/* Rutas solo para admin */}
      <Route
        path="/gestion"
        element={
          userRole === "admin" ? (
            <PrivateRoute>
              <AppLayout>
                <Gestion />
              </AppLayout>
            </PrivateRoute>
          ) : (
            <Navigate to="/home" replace />
          )
        }
      />
      <Route
        path="/usuarios"
        element={
          userRole === "admin" ? (
            <PrivateRoute>
              <AppLayout>
                <Usuarios />
              </AppLayout>
            </PrivateRoute>
          ) : (
            <Navigate to="/home" replace />
          )
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Rutas;