const Libro = require("../models/libro.model");

class LibroController {

  // GET todos los libros
  static obtenerLibros = async (req, res) => {
    try {
      const libros = await Libro.find();
      res.status(200).json(libros);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener libros", error });
    }
  };

  // GET un libro por ID
  static obtenerLibroPorId = async (req, res) => {
    try {
      const libro = await Libro.findById(req.params.id);
      if (!libro) return res.status(404).json({ message: "Libro no encontrado" });
      res.status(200).json(libro);
    } catch (error) {
      res.status(500).json({ message: "Error al buscar libro", error });
    }
  };

  // POST crear libro
  static crearLibro = async (req, res) => {
    try {
      const nuevoLibro = await Libro.create(req.body);
      res.status(201).json(nuevoLibro);
    } catch (error) {
      res.status(400).json({ message: "Error al crear libro", error });
    }
  };

  // PUT actualizar libro
  static actualizarLibro = async (req, res) => {
    try {
      const libro = await Libro.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!libro) return res.status(404).json({ message: "Libro no encontrado" });
      res.status(200).json(libro);
    } catch (error) {
      res.status(400).json({ message: "Error al actualizar libro", error });
    }
  };

  // DELETE eliminar libro
  static eliminarLibro = async (req, res) => {
    try {
      const libro = await Libro.findByIdAndDelete(req.params.id);
      if (!libro) return res.status(404).json({ message: "Libro no encontrado" });
      res.status(200).json({ message: "Libro eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar libro", error });
    }
  };
}

module.exports = LibroController;