import { pool } from '../config/db.js';

// Obtener un evento
export const obtenerEventoPorId = async (id) => {
    const [rows] = await pool.execute('SELECT * FROM eventos WHERE id = ?', [id]);
    return rows[0]; // Devuelve un solo objeto
  };

// Obtener todos los eventos
export const obtenerEventos = async () => {
  const [rows] = await pool.execute('SELECT * FROM eventos ORDER BY fecha DESC');  // ← aquí también
  return rows;
};

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

// Actualizar un evento
export const actualizarEvento = async (id, datos) => {
    const { nombre, invitados, fecha, latitude, longitude } = datos;
    const [result] = await pool.execute(
      `UPDATE eventos SET nombre = ?, invitados = ?, fecha = ?, latitude = ?, longitude = ? WHERE id = ?`,
      [nombre, invitados, fecha, latitude, longitude, id]
    );
    return result.affectedRows;
  };
  
  // Eliminar un evento
  export const eliminarEvento = async (id) => {
    const [result] = await pool.execute('DELETE FROM eventos WHERE id = ?', [id]);
    return result.affectedRows;
  };