import { pool } from '../config/db.js';

// Insertar un nuevo evento
export const crearEvento = async (evento) => {
  const { nombre, invitados, fecha, latitude, longitude } = evento;
  const [result] = await db.execute(
    `INSERT INTO eventos (nombre, invitados, fecha, latitude, longitude)
     VALUES (?, ?, ?, ?, ?)`,
    [nombre, invitados, fecha, latitude, longitude]
  );
  return result.insertId;
};

// Obtener todos los eventos
export const obtenerEventos = async () => {
  const [rows] = await db.execute('SELECT * FROM eventos ORDER BY fecha DESC');
  return rows;
};
