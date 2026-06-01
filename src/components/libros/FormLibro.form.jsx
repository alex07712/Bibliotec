import * as Yup from "yup";

export function initialValues(datos) {
  return {
    titulo: datos?.titulo || "",
    autor: datos?.autor || "",
    categoria: datos?.categoria || "",
    descripcion: datos?.descripcion || "",
    stock: datos?.stock ?? 0,
  };
}

export function validationSchema() {
  return Yup.object({
    titulo: Yup.string().required("El título es obligatorio"),
    autor: Yup.string().required("El autor es obligatorio"),
    categoria: Yup.string().required("La categoría es obligatoria"),
    descripcion: Yup.string().optional(),
    stock: Yup.number()
      .typeError("El stock debe ser un numero")
      .min(0, "El stock no puede ser negativo")
      .integer("El stock debe ser un numero entero")
      .required("El stock es obligatorio"),
  });
}
