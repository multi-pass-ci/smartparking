import { Router } from 'express';
import {
    registrarEvento,
    listarEventos,
    editarEvento,
    borrarEvento
  } from '../controllers/evento.controller.js';

const router = Router();

router.post('/eventos', registrarEvento);   // Crear evento
router.get('/eventos', listarEventos);      // Ver todos
router.put('/eventos/:id', editarEvento);      // Editar
router.delete('/eventos/:id', borrarEvento);   // Eliminar

export default router;
