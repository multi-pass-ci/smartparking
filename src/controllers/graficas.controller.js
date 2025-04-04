import { getCupoPorDiaMes, getIngresosSemanas, getUtilizacionCajones } from '../models/graficas.model.js';

export const cuposGrafica = async (req, res) => {
  try {
    const data = await getCupoPorDiaMes();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener cupos por mes y día' });
  }
};

export const ingresosGrafica = async (req, res) => {
  try {
    const data = await getIngresosSemanas();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ingresos semanales' });
  }
};

export const utilizacionGrafica = async (req, res) => {
  try {
    const data = await getUtilizacionCajones();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener uso de cajones' });
  }
};
