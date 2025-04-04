import { pool } from '../config/db.js';

export const getCupoPorDiaMes = async () => {
  const [rows] = await pool.query('SELECT * FROM vista_cupos_mes_dia');
  return rows;
};

export const getIngresosSemanas = async () => {
  const [rows] = await pool.query('SELECT * FROM vista_ingresos_vs_anterior');
  return rows;
};

export const getUtilizacionCajones = async () => {
  const [rows] = await pool.query('SELECT * FROM vista_utilizacion_cajon');
  return rows;
};