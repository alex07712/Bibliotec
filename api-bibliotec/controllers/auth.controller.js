const Persona = require("../models/personas.model");

exports.login = async (req, res) => {
  try {
    const { nomuser, password } = req.body;
    // Buscar usuario por nombre de usuario Y contraseña (Temporal, luego usaremos bcrypt)
    const usuario = await Persona.findOne({$or: [ {nomuser: nomuser}, {correo: nomuser}], password:password});
    
    if (!usuario) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Devolvemos solo los datos necesarios para el frontend
    res.status(200).json({
      id: usuario._id,
      nombre: usuario.nombre,
      nomuser: usuario.nomuser,
      rol: usuario.rol // <--- ESTO ES CLAVE PARA EL LAYOUT
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};