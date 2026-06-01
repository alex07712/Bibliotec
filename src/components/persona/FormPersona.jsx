import { useFormik } from "formik";
import { InitialValues, ValidationSchema } from "./FormPersona.form";
import ApiDatos from "../../services/ApiDatos";
import Swal from "sweetalert2";
import { Search } from "lucide-react"; // <-- ¡CORREGIDO! Cambiamos Camera por Search
import { useState } from "react";

export function FormPersona({ datos, closeModal, refreshTable }) {


  const formik = useFormik({
    initialValues: InitialValues(datos),
    validationSchema: ValidationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (datos) {
          await ApiDatos.updatePersona(datos._id, formValue);
        } else {
          await ApiDatos.postDatos(formValue);
        }

        refreshTable();
        closeModal();

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: datos
            ? "Datos actualizados correctamente"
            : "Datos guardados correctamente",
          showConfirmButton: false,
          timer: 1500,
        });

        formik.resetForm();
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron guardar los datos",
        });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4" noValidate>

      {/* NOMBRE COMPLETO - campo obligatorio */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nombre completo
        </label>
        <input
          type="text"
          name="nombre"
          value={formik.values.nombre}
          onChange={formik.handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {formik.errors.nombre && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.nombre}</p>
        )}
      </div>

      {/* TELÉFONO - número, obligatorio (modelo default 9342222) */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Teléfono
        </label>
        <input
          type="number"
          name="telefono"
          value={formik.values.telefono}
          onChange={formik.handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        {formik.errors.telefono && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.telefono}</p>
        )}
      </div>

      {/* CORREO ELECTRÓNICO - formato email, único en BD */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Correo electrónico
        </label>
        <input
          type="email"
          name="correo"
          value={formik.values.correo}
          onChange={formik.handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        {formik.errors.correo && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.correo}</p>
        )}
      </div>

      {/* NOMBRE DE USUARIO (nomuser) - para inicio de sesión */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nombre de usuario
        </label>
        <input
          type="text"
          name="nomuser"
          value={formik.values.nomuser}
          onChange={formik.handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
      </div>

      {/* CONTRASEÑA - mínimo 6 caracteres, obligatoria */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        {formik.errors.password && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
        )}
      </div>

      {/* ROL - administrador o usuario normal */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Rol</label>
        <select
          name="rol"
          value={formik.values.rol}
          onChange={formik.handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 bg-white"
        >
          <option value="usuario">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
      </div>

      {/* BOTÓN ENVIAR */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        {datos ? "Guardar cambios" : "Crear usuario"}
      </button>
    </form>
  );
}