import Cajon from '../models/cajon.model.js';
import Cupo from '../models/cupo.model.js';
import { pool } from '../config/db.js'; // Conexión a MySQL

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

// Actualizar código escaneado por lector (MySQL) con hora de Querétaro
export const actualizarLector = async (req, res) => {
  const { codigo } = req.body;

  if (!codigo) {
    return res.status(400).json({ error: 'El campo "codigo" es requerido' });
  }

  // Zona horaria de Querétaro (UTC-6)
  const opciones = { timeZone: 'America/Mexico_City', hour12: false };
  const ahora = new Date();
  const ahoraHora = ahora.toLocaleTimeString('en-GB', opciones); // HH:mm:ss
  const ahoraFecha = ahora.toLocaleDateString('en-CA', { timeZone: 'America/Mexico_City' }); // YYYY-MM-DD

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


//leer codigo de barras
export const obtenerCodigoLector = async (req, res) => {
  try {
    // 1. Obtener el código y hora_salida del lector
    const [rows] = await pool.query('SELECT * FROM lector WHERE id = 1');
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No hay código registrado' });
    }

    const { codigo, hora_salida, fecha } = rows[0];

    if (!codigo || !hora_salida || !fecha) {
      return res.status(400).json({ message: 'Falta código, fecha o hora_salida' });
    }

    // 2. Actualizar salida en registros si aún no está
    await pool.query(
      `UPDATE registros SET salida = ? WHERE cb = ? AND salida IS NULL`,
      [hora_salida, codigo]
    );

    // 3. Recuperar el registro actualizado (ya con el pago calculado por el TRIGGER)
    const [registro] = await pool.query(
      `SELECT * FROM registros WHERE cb = ?`,
      [codigo]
    );

    if (registro.length === 0) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }

    // 4. Enviar el registro completo, incluyendo el monto a pagar
    res.json(registro[0]);

  } catch (err) {
    console.error('Error procesando código lector:', err);
    res.status(500).json({ error: 'Error al obtener información del lector' });
  }
};

