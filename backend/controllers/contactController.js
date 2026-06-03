const Contact = require("../models/Contact");

// Crear contacto
const createContact = async (req, res) => {
  try {
    const {
      nombre,
      telefono,
      email,
      direccion,
      categoria,
      favorito,
    } = req.body;

    const contacto = await Contact.create({
      nombre,
      telefono,
      email,
      direccion,
      categoria,
      favorito,
      foto: req.file ? req.file.filename : "",
      usuario: req.user.id,
    });

    res.status(201).json(contacto);

  } catch (error) {
    res.status(500).json({
      mensaje: error.message,
    });
  }
};

// Obtener contactos
const getContacts = async (req, res) => {
  try {

   const contactos = await Contact.find({
  usuario: req.user.id,
}).populate("usuario", "nombre email");

    res.json(contactos);

  } catch (error) {
    res.status(500).json({
      mensaje: error.message,
    });
  }
};

// Actualizar contacto
const updateContact = async (req, res) => {
  try {

    const contacto = await Contact.findById(
      req.params.id
    );

    if (!contacto) {
      return res.status(404).json({
        mensaje: "Contacto no encontrado",
      });
    }

    const datosActualizados = {
      ...req.body,
    };

    if (req.file) {
      datosActualizados.foto =
        req.file.filename;
    }

    const contactoActualizado =
      await Contact.findByIdAndUpdate(
        req.params.id,
        datosActualizados,
        {
          new: true,
        }
      );

    res.json(contactoActualizado);

  } catch (error) {
    res.status(500).json({
      mensaje: error.message,
    });
  }
};

// Eliminar contacto
const deleteContact = async (req, res) => {
  try {

    const contacto = await Contact.findById(
      req.params.id
    );

    if (!contacto) {
      return res.status(404).json({
        mensaje: "Contacto no encontrado",
      });
    }

    await Contact.findByIdAndDelete(
      req.params.id
    );

    res.json({
      mensaje: "Contacto eliminado",
    });

  } catch (error) {
    res.status(500).json({
      mensaje: error.message,
    });
  }
};

module.exports = {
  createContact,
  getContacts,
  updateContact,
  deleteContact,
};