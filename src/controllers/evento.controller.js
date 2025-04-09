import {
    crearEvento,
    obtenerEventos,
    actualizarEvento,
    eliminarEvento
  } from '../models/evento.model.js';

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


  // PUT /eventos/:id → Actualizar evento
  export const editarEvento = async (req, res) => {
    try {
      const filasAfectadas = await actualizarEvento(req.params.id, req.body);
      if (filasAfectadas === 0) {
        return res.status(404).json({ error: 'Evento no encontrado' });
      }
      res.json({ message: 'Evento actualizado correctamente' });
    } catch (error) {
      console.error('❌ Error al actualizar evento:', error.message, error);
      res.status(500).json({ error: 'Error al actualizar el evento' });
    }
  };
  
  // DELETE /eventos/:id → Eliminar evento
  export const borrarEvento = async (req, res) => {
    try {
      const filasAfectadas = await eliminarEvento(req.params.id);
      if (filasAfectadas === 0) {
        return res.status(404).json({ error: 'Evento no encontrado' });
      }
      res.json({ message: 'Evento eliminado correctamente' });
    } catch (error) {
      console.error('❌ Error al eliminar evento:', error.message, error);
      res.status(500).json({ error: 'Error al eliminar el evento' });
    }
  };
  