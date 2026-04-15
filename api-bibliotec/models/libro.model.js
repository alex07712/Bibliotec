const mongoose = require("mongoose");

const LibroSchema = mongoose.Schema(
  {
    titulo:      { type: String, required: true, trim: true },
    autor:       { type: String, required: true, trim: true },
    categoria:   { type: String, required: true },
    descripcion: { type: String },
    imagen:      { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("libro", LibroSchema);