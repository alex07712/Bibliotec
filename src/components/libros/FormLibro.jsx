import { useFormik } from "formik";
import { useState } from "react";
import ApiDatos from "../../services/ApiDatos";
import Swal from "sweetalert2";
import { Camera } from "lucide-react";
import { initialValues, validationSchema } from "./FormLibro.form";

export function FormLibro({ datos, closeModal, refreshTable }) {
  const [preview, setPreview] = useState(datos?.imagen || "");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(datos),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        let imagenUrl = datos?.imagen || "";

        if (file) {
          setUploading(true);
          imagenUrl = await ApiDatos.subirImagen(file);
          setUploading(false);
        }

        const libroData = { ...values, imagen: imagenUrl };

        if (datos) {
          await ApiDatos.actualizarLibro(datos._id, libroData);
        } else {
          await ApiDatos.createLibro(libroData);
        }

        refreshTable();
        closeModal();
        Swal.fire("Éxito", "Libro guardado con exito", "success");
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "No se pudo guardar el libro", "error");
        setUploading(false);
      }
    },
  });

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">

      {/* Título */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Título</label>
        <input
          type="text"
          name="titulo"
          value={formik.values.titulo}
          onChange={formik.handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {formik.errors.titulo && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.titulo}</p>
        )}
      </div>


      {/* Autor */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Autor</label>
        <input
          type="text"
          name="autor"
          value={formik.values.autor}
          onChange={formik.handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        {formik.errors.autor && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.autor}</p>
        )}
      </div>

      {/* Categoría */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Categoría</label>
        <input
          type="text"
          name="categoria"
          value={formik.values.categoria}
          onChange={formik.handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        {formik.errors.categoria && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.categoria}</p>
        )}
      </div>

      {/* Stock */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Stock</label>
        <input
          type="number"
          name="stock"
          min="0"
          step="1"
          value={formik.values.stock}
          onChange={formik.handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        {formik.errors.stock && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.stock}</p>
        )}
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          name="descripcion"
          value={formik.values.descripcion}
          onChange={formik.handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
          rows="3"
        />
      </div>

      {/* Subida de imagen con botón estilo header (crema) e ícono Camera */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Imagen del libro</label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => document.getElementById("fileInput").click()}
            className="px-4 py-2 bg-amber-50 border border-amber-300 text-amber-800 rounded-lg hover:bg-amber-100 transition-colors text-sm font-medium flex items-center gap-2"
          >
            <Camera size={18} />
            Seleccionar imagen
          </button>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          {file && <span className="text-xs text-gray-500">{file.name}</span>}
        </div>
        {preview && (
          <img
            src={preview}
            alt="Vista previa"
            className="h-32 mt-2 object-cover rounded-lg border"
          />
        )}
      </div>

      {/* Botón submit */}
      <button
        type="submit"
        disabled={uploading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto"
      >
        {uploading ? "Subiendo imagen..." : datos ? "Guardar cambios" : "Crear libro"}
      </button>
    </form>
  );
}
