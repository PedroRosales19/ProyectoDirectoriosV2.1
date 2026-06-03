const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },

    telefono: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },

    direccion: {
      type: String,
    },

    categoria: {
      type: String,
      default: "Amigos",
    },

    favorito: {
      type: Boolean,
      default: false,
    },

    foto: {
      type: String,
      default: "",
},

    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Contact",
  contactSchema
);