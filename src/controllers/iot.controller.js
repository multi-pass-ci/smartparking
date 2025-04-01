import Cajon from '../models/cajon.model.js';
import Cupo from '../models/cupo.model.js';

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

export const registrarCupo = async (req, res) => {
  try {
    const nuevoCupo = new Cupo(req.body);
    await nuevoCupo.save();
    res.status(201).json({ message: 'Registro de cupo guardado correctamente' });
  } catch (error) {
    console.error('Error al guardar cupo:', error);
    res.status(500).json({ error: 'Error al guardar el registro de cupo' });
  }
};
