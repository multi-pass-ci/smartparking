import { Router } from 'express';
import { guardarCajon, registrarCupo } from '../controllers/iot.controller.js';

const router = Router();

router.post('/cajones', guardarCajon);
router.post('/cupos', registrarCupo);

export default router;
