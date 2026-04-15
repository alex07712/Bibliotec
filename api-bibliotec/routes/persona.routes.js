const express=require("express");
const PersonaController=require("../controllers/persona.controller");

//definimos las rutas
const api=express.Router();

//estas son las peticiones
api.post("/persona/create", PersonaController.createPersona);
api.get("/persona/buscar", PersonaController.obtenerDatos)


module.exports=api;

