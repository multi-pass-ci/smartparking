const Evento = require('../models/evento.model');

const getEventos = async (req, res) => {
  try {
    const eventos = await Evento.obtenerEventos();
    res.json(eventos);
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

const crearEvento = async (req, res) => {
  const { nombre, invitados, fecha, latitude, longitude } = req.body;

  if (!nombre || !fecha) {
    return res.status(400).json({ mensaje: 'Nombre y fecha son requeridos' });
  }

  try {
    const insertId = await Evento.insertarEvento({ nombre, invitados, fecha, latitude, longitude });
    res.status(201).json({ mensaje: 'Evento creado', id: insertId });
  } catch (error) {
    console.error('Error al crear evento:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

module.exports = {
  getEventos,
  crearEvento
};
