import Cajon from '../models/cajon.model.js';
import Cupo from '../models/cupo.model.js';
import { pool } from '../config/db.js'; // Agregamos conexión MySQL

// Guardar cajón (MongoDB)
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

// Registrar cupo (MongoDB)
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

// Actualizar código escaneado por lector (MySQL)
export const actualizarLector = async (req, res) => {
  const { codigo } = req.body;

  if (!codigo) {
    return res.status(400).json({ error: 'El campo "codigo" es requerido' });
  }

  const ahoraHora = new Date().toLocaleTimeString('en-GB', { hour12: false }); // HH:MM:SS
  const ahoraFecha = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  try {
    const [result] = await pool.execute(
      'UPDATE lector SET codigo = ?, hora_salida = ?, fecha = ? WHERE id = 1',
      [codigo, ahoraHora, ahoraFecha]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Registro no encontrado en la tabla lector' });
    }

    res.json({
      message: 'Registro actualizado correctamente',
      codigo,
      hora_salida: ahoraHora,
      fecha: ahoraFecha
    });
  } catch (error) {
    console.error('Error al actualizar el lector:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
