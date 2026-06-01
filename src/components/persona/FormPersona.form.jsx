import * as YUP from "yup";

export function InitialValues(datos) {
  return {
    nombre: datos?.nombre || "",
    telefono: datos?.telefono || "",
    correo: datos?.correo || "",
    nomuser: datos?.nomuser || "",
    password: datos?.password || "",
    rol: datos?.rol || "usuario",
  };
}

export function ValidationSchema() {
    return YUP.object({
    nombre:YUP.string().required("No puede ir vacío"),
    telefono:YUP.number().required("El telefono es requerido"),
    correo:YUP.string().email().required("No tiene formato de correo"),
    nomuser:YUP.string(),
    password: YUP.string().min(6, "Mínimo 6 caracteres").required("La contraseña es obligatoria"),
    rol: YUP.string().oneOf(["admin", "usuario"]),
  });
}
