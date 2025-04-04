import { Router } from 'express';
import {
  guardarCajon,
  registrarCupo,
  actualizarLector
} from '../controllers/iot.controller.js';

const router = Router();

router.post('/cajones', guardarCajon);
router.post('/cupos', registrarCupo);
router.post('/lector', actualizarLector);

export default router;
