import { Router } from 'express';
import {
  guardarCajon,
  registrarCupo,
  actualizarLector,
  obtenerCodigoLector
} from '../controllers/iot.controller.js';

const router = Router();

router.post('/cajones', guardarCajon);
router.post('/cupos', registrarCupo);
router.post('/lector', actualizarLector);
router.get('/lector/codigo', obtenerCodigoLector);

export default router;
