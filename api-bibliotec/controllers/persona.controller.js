const Persona = require("../models/personas.model");

class PersonaController {
  static createPersona = async (req, res) => {
    try {
      const datos = req.body;
      const newPerson = await Persona.create(datos);
      res.status(201).json(newPerson);
    } catch (error) {
      return console.log(error.error);
      //return res.status(400).send({message:"Error de conexion, cambiate de carrera"})
    }
  };

  static obtenerDatos=async(req, res)=>{
    try{
        const buscarPersonas=await Persona.find();
        res.status(200).json(buscarPersonas);
    } catch (error) {
        return console.log(error.error);
    }
}
}

module.exports = PersonaController;
