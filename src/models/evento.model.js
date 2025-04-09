const db = require('../../db');

const obtenerEventos = async () => {
  const [rows] = await db.query('SELECT * FROM eventos');
  return rows;
};

const insertarEvento = async ({ nombre, invitados, fecha, latitude, longitude }) => {
  const query = `
    INSERT INTO eventos (nombre, invitados, fecha, latitude, longitude)
    VALUES (?, ?, ?, ?, ?)
  `;
  const [result] = await db.query(query, [nombre, invitados, fecha, latitude, longitude]);
  return result.insertId;
};

module.exports = {
  obtenerEventos,
  insertarEvento
};
