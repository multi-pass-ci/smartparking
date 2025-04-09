import { crearEvento, obtenerEventos } from '../models/evento.model.js';

// POST /eventos → Crear nuevo evento
export const registrarEvento = async (req, res) => {
  try {
    const id = await crearEvento(req.body);
    res.status(201).json({ message: 'Evento creado correctamente', id });
  } catch (error) {
    console.error('❌ Error al crear evento:', error);
    res.status(500).json({ error: 'Error al crear el evento' });
  }
};

// GET /eventos → Listar todos los eventos
export const listarEventos = async (req, res) => {
  try {
    const eventos = await obtenerEventos();
    res.status(200).json(eventos);
  } catch (error) {
    console.error('❌ Error al obtener eventos:', error);
    res.status(500).json({ error: 'Error al obtener los eventos' });
  }
};
