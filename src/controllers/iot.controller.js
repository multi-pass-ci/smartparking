import Cajon from '../models/cajon.model.js';

export const guardarCajon = async (req, res) => {
  try {
    const nuevoCajon = new Cajon(req.body);
    await nuevoCajon.save();
    res.status(201).json({ message: 'Datos guardados exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al guardar en la base de datos' });
  }
};
