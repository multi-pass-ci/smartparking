import { Router } from 'express';
import {
  registrarEvento,
  listarEventos,
  buscarEventoPorId,
  editarEvento,
  borrarEvento
} from '../controllers/evento.controller.js';

const router = Router();

router.post('/eventos', registrarEvento);
router.get('/eventos', listarEventos);
router.get('/eventos/:id', buscarEventoPorId);
router.put('/eventos/:id', editarEvento);
router.delete('/eventos/:id', borrarEvento);

export default router;
