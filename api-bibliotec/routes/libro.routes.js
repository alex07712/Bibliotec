const express = require("express");
const LibroController = require("../controllers/libro.controller");

const api = express.Router();

api.get("/libros",          LibroController.obtenerLibros);
api.get("/libros/:id",      LibroController.obtenerLibroPorId);
api.post("/libros/create",  LibroController.crearLibro);
api.put("/libros/:id",      LibroController.actualizarLibro);
api.delete("/libros/:id",   LibroController.eliminarLibro);

module.exports = api;