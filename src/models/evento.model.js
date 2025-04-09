import { pool } from '../config/db.js';

// Insertar un nuevo evento
export const crearEvento = async (evento) => {
  const { nombre, invitados, fecha, latitude, longitude } = evento;
  const [result] = await pool.execute(  // ← aquí va pool ✅
    `INSERT INTO eventos (nombre, invitados, fecha, latitude, longitude)
     VALUES (?, ?, ?, ?, ?)`,
    [nombre, invitados, fecha, latitude, longitude]
  );
  return result.insertId;
};

// Obtener todos los eventos
export const obtenerEventos = async () => {
  const [rows] = await pool.execute('SELECT * FROM eventos ORDER BY fecha DESC');  // ← aquí también
  return rows;
};
