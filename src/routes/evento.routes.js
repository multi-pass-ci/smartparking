import { Router } from 'express';
import {
  registrarEvento,
  listarEventos
} from '../controllers/evento.controller.js';

const router = Router();

router.post('/eventos', registrarEvento);   // Crear evento
router.get('/eventos', listarEventos);      // Ver todos

export default router;
